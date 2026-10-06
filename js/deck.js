// Read mode for the YBAVIT venue walkthrough: native scroll, film slots, sticky steps, presets, views and dialogs.
// Present mode lives in present.js and drives the same page beat by beat.
import { SLOTS, TRIMS, PRESETS, chapterBy } from './content.js';
import { FILMS } from './films.js';
import { Plate, drawBoardFrame } from './plates.js';
import { createTimeline } from './timeline.js';
import { initPresent } from './present.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch { /* storage refused: the setting lasts for this page only */ } },
};
const track = (name, detail = {}) => window.dispatchEvent(new CustomEvent('deck:event', { detail: { name, ...detail } }));
const body = document.body;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const portrait = matchMedia('(max-aspect-ratio: 3/4)');
const coarse = matchMedia('(pointer: coarse)');
const narrow = matchMedia('(max-width: 47.99rem)');
const two = (n) => String(n).padStart(2, '0');

// ---------------------------------------------------------------- Draft / Client view
// Client view hides the working details (placeholders, film-slot labels, build notes); one header button and the
// index's View setting switch the whole deck. Client is the default, because the link goes to buyers.
function setView(v) {
  const shown = v === 'draft';
  body.classList.toggle('client', !shown);
  body.classList.toggle('draft', shown);
  $('#viewClient').checked = !shown; $('#viewDraft').checked = shown;
  const b = $('#detailsBtn'); b.setAttribute('aria-pressed', String(shown)); b.textContent = shown ? 'Hide details' : 'Show details';
  if (!shown && $('#specDlg').open) $('#specDlg').close();
  store.set('ybavit-view', v);
  films.refresh();
}
$$('input[name="view"]').forEach(r => r.addEventListener('change', () => setView(r.value)));
$('#detailsBtn').addEventListener('click', () => setView(body.classList.contains('draft') ? 'client' : 'draft'));

// ---------------------------------------------------------------- motion: reduced motion or the global Pause
const motion = {
  paused: store.get('ybavit-paused') === '1' || reduced.matches,
  get allowed() { return !this.paused; },
  set(p) {
    this.paused = p; store.set('ybavit-paused', p ? '1' : '0');
    $('#pauseBtn').setAttribute('aria-pressed', String(p));
    $('#pauseBtn .pl').textContent = p ? 'Motion paused' : 'Pause motion';
    body.classList.toggle('still', p);
    films.refresh(); steps.refresh();
  },
};
$('#pauseBtn').addEventListener('click', () => motion.set(!motion.paused));
reduced.addEventListener('change', () => motion.set(reduced.matches || motion.paused));

// ---------------------------------------------------------------- film slots: a film where one is listed, else a study
const films = (() => {
  const all = new Map(); // figure -> rec
  let raf = 0, last = 0;
  const t0 = performance.now();

  const pick = (fig) => {
    let id = fig.dataset.slot;
    const m = fig.dataset.slotM;
    if (m && portrait.matches && (FILMS[m] || !FILMS[id])) id = m;
    const src = TRIMS[id] || id;
    return { id, src, slot: SLOTS[src], file: FILMS[id] || FILMS[src] || null };
  };
  const hoverOnly = (fig) => fig.classList.contains('film-preview') || fig.classList.contains('film-card');

  function mount(fig) {
    let rec = all.get(fig);
    const want = pick(fig);
    if (rec && rec.id === want.id) return rec;
    const host = fig.querySelector('.film-media');
    host.replaceChildren();
    rec = { fig, ...want, plate: null, video: null, visible: rec?.visible || false, hot: false, own: false };
    rec.plate = new Plate(host, want.id, want.slot);
    rec.plate.draw(2.4);
    if (want.file) {
      const v = document.createElement('video');
      Object.assign(v, { muted: true, loop: !want.slot.reel, playsInline: true, preload: 'none' });
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
      v.src = want.file;
      v.addEventListener('playing', () => { v.classList.add('on'); fig.classList.add('has-film'); });
      v.addEventListener('loadeddata', () => { v.classList.add('on'); fig.classList.add('has-film'); }, { once: true });
      v.addEventListener('error', () => { v.remove(); rec.video = null; fig.classList.remove('has-film'); }, { once: true });
      host.appendChild(v); rec.video = v;
    }
    all.set(fig, rec);
    return rec;
  }
  // a figure inside a stacked figure only counts while its layer is the one showing
  function onStage(rec) {
    const layer = rec.fig.closest('.fig-layer');
    if (layer) { const f = layer.closest('.figure'); if (!f || f.dataset.active !== layer.dataset.layer) return false; }
    if (rec.fig.closest('.step-fig') && !body.classList.contains('still')) return false;
    if (hoverOnly(rec.fig) && !rec.hot) return false;
    if (rec.fig.dataset.paused === '1') return false;
    return rec.visible;
  }
  function tick(now) {
    raf = 0;
    let any = false;
    const t = (now - t0) / 1000;
    const draw = now - last > 33; // about 30 frames a second is enough for a study
    for (const rec of all.values()) {
      const live = onStage(rec) && motion.allowed;
      if (rec.video) {
        if (live && rec.video.paused) rec.video.play().catch(() => {});
        if (!live && !rec.video.paused) rec.video.pause();
        if (rec.video.classList.contains('on')) continue;
      }
      if (live) { any = true; if (draw) rec.plate.draw(t); }
    }
    if (draw) last = now;
    if (any) raf = requestAnimationFrame(tick);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

  const near = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { mount(e.target); near.unobserve(e.target); seen.observe(e.target); } }), { rootMargin: '50% 0px' });
  const seen = new IntersectionObserver((es) => {
    es.forEach(e => { const rec = all.get(e.target); if (rec) { rec.visible = e.isIntersecting; if (rec.plate && e.isIntersecting && !motion.allowed) { rec.plate.resize(); rec.plate.draw(2.4); } } });
    kick();
  }, { threshold: .01 });
  $$('.film').forEach(f => { if (!f.classList.contains('film-preview')) near.observe(f); });

  // previews on the offer map wake on hover or focus only
  $$('.otile-link').forEach(a => {
    const fig = a.querySelector('.film');
    const on = () => { const rec = mount(fig); rec.hot = true; rec.visible = true; rec.plate.resize(); rec.plate.draw(2.4); kick(); track('preview_play', { slot: rec.id }); };
    const off = () => { const rec = all.get(fig); if (rec) rec.hot = false; };
    a.addEventListener('pointerenter', on); a.addEventListener('focus', on);
    a.addEventListener('pointerleave', off); a.addEventListener('blur', off);
  });
  // promise cards: hover or focus on desktop; on touch, the card most in view (at least 60%) plays, one at a time
  const cards = $$('.trip-card');
  cards.forEach(c => {
    const fig = c.querySelector('.film');
    c.addEventListener('pointerenter', () => { if (!coarse.matches) { const r = all.get(fig) || mount(fig); r.hot = true; kick(); } });
    c.addEventListener('pointerleave', () => { if (!coarse.matches) { const r = all.get(fig); if (r) r.hot = false; } });
    c.addEventListener('focusin', () => { const r = all.get(fig) || mount(fig); r.hot = true; kick(); });
    c.addEventListener('focusout', () => { const r = all.get(fig); if (r) r.hot = false; });
  });
  const cardIO = new IntersectionObserver((es) => {
    if (!coarse.matches && !body.classList.contains('present')) return;
    es.forEach(e => { const fig = e.target.querySelector('.film'); const r = all.get(fig) || mount(fig); r.ratio = e.intersectionRatio; });
    let best = null; cards.forEach(c => { const r = all.get(c.querySelector('.film')); if (r && r.ratio >= .6 && (!best || r.ratio > best.ratio)) best = r; });
    cards.forEach(c => { const r = all.get(c.querySelector('.film')); if (r) r.hot = body.classList.contains('present') || r === best; });
    kick();
  }, { threshold: [0, .6, .8, 1] });
  cards.forEach(c => cardIO.observe(c));

  // "Pause film" on the craft bands
  $$('[data-pause-film]').forEach(b => b.addEventListener('click', () => {
    const fig = b.closest('.craft-band').querySelector('.film');
    const p = fig.dataset.paused !== '1'; fig.dataset.paused = p ? '1' : '0';
    b.setAttribute('aria-pressed', String(p)); b.textContent = p ? 'Play film' : 'Pause film'; kick();
  }));

  let rz = 0;
  addEventListener('resize', () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(() => { for (const rec of all.values()) { if (rec.plate.resize()) rec.plate.draw(2.4); } kick(); }); });
  portrait.addEventListener('change', () => { for (const fig of all.keys()) if (fig.dataset.slotM) mount(fig); kick(); });

  return {
    refresh() { for (const rec of all.values()) if (!motion.allowed && rec.plate.resize()) rec.plate.draw(2.4); kick(); },
    wake(root) { $$('.film', root).forEach(f => { const r = mount(f); r.visible = true; r.plate.resize(); r.plate.draw(2.4); if (f.closest('.trip-card')) r.hot = true; }); kick(); },
    kick, mount, all,
  };
})();

// storyboard diagram frames (chapter 08)
$$('.board-c').forEach(cv => drawBoardFrame(cv, +cv.dataset.frame));

// ---------------------------------------------------------------- header, rail, chapter in view
const hdr = $('#hdr');
const onScroll = () => hdr.classList.toggle('solid', scrollY > 80);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

let current = 'cover';
function setCurrent(anchor) {
  if (current === anchor) return;
  current = anchor;
  const ch = chapterBy(anchor);
  $$('.rail a').forEach(a => a.setAttribute('aria-current', String(a.dataset.rail === anchor)));
  $('#railName').textContent = ch.title;
  if (!body.classList.contains('present') && location.hash.slice(1) !== anchor) history.replaceState(null, '', '#' + anchor);
  track('chapter_view', { chapter: anchor });
  if ($('#specDlg').open) showSpec();
}
const chapters = $$('main > .ch');
const chIO = new IntersectionObserver((es) => {
  if (body.classList.contains('present')) return;
  es.forEach(e => { if (e.isIntersecting) setCurrent(e.target.id); });
}, { rootMargin: '-45% 0px -54% 0px' });
chapters.forEach(c => chIO.observe(c));
$$('.rail a')[0].setAttribute('aria-current', 'true');

// ---------------------------------------------------------------- sticky steps (T2 venues and pre-vis, T7 show control)
const timeline = createTimeline($('#timeline'));
const steps = (() => {
  let io = null;
  const groups = $$('.t2, .t7');
  function activate(stepEl) {
    const group = stepEl.closest('.t2, .t7');
    const i = +stepEl.dataset.step;
    $$('.step', group).forEach(s => s.removeAttribute('aria-current'));
    stepEl.setAttribute('aria-current', 'step');
    const fig = $('.figure', group);
    if (fig) {
      fig.dataset.active = String(i);
      const chip = $('.figure-chip .chip', fig);
      const code = $('.code .chip', stepEl);
      if (chip) chip.textContent = code && i < 4 ? code.textContent : 'Outcome';
    }
    if (group.classList.contains('t7')) timeline.setState(i + 1);
    films.kick();
    track('beat_reached', { chapter: group.closest('.ch').id, step: i });
  }
  function build() {
    io?.disconnect();
    // on phones the band sits below the sticky figure, in px, because toolbar changes break vh triggers
    let top, bottom;
    if (narrow.matches) { const figH = innerWidth * 9 / 16; top = 56 + figH + 16; bottom = Math.max(0, innerHeight - top - 60); }
    else { top = Math.round(innerHeight * .45); bottom = Math.round(innerHeight * .45); }
    io = new IntersectionObserver((es) => {
      if (body.classList.contains('present')) return;
      es.forEach(e => { if (e.isIntersecting) activate(e.target); });
    }, { rootMargin: `-${top}px 0px -${bottom}px 0px` });
    groups.forEach(g => $$('.step', g).forEach(s => io.observe(s)));
  }
  build();
  let rz = 0; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(build, 150); });
  groups.forEach(g => { const first = $('.step', g); if (first) first.setAttribute('aria-current', 'step'); });
  return { activate, refresh() { films.kick(); } };
})();

// ---------------------------------------------------------------- "Viewing for" presets
const BASE = ['cover', 'promise', 'why-now', 'offer', 'cxc', 'museums', 'installations', 'crafts', 'previs', 'show-control', 'process', 'proof', 'next'];
const VENUE_ANCHOR = { 4: 'cxc', 5: 'museums', 6: 'installations' };
let preset = PRESETS[0];
function orderFor(p) {
  const venues = p.order.map(n => VENUE_ANCHOR[n]);
  const head = ['cover', 'promise', 'why-now', 'offer'];
  const tail = ['previs', 'show-control', 'process', 'proof', 'next'];
  return p.craftsFirst ? [...head, 'crafts', ...venues, ...tail] : [...head, ...venues, 'crafts', ...tail];
}
function applyPreset(id, { scroll = false } = {}) {
  preset = PRESETS.find(p => p.id === id) || PRESETS[0];
  store.set('ybavit-preset', preset.id);
  $$('[data-viewfor]').forEach(s => { s.value = preset.id; });
  $$('[data-vf-label]').forEach(s => { s.textContent = preset.label; });
  // order: physically reorder the chapters so reading order, focus order and the rail all agree
  const main = $('#main'); const ord = orderFor(preset);
  ord.forEach(a => main.appendChild(document.getElementById(a)));
  const ol = $('.rail ol'); ord.forEach(a => ol.appendChild($(`.rail a[data-rail="${a}"]`).parentElement));
  // chapter 02: four tiles from the sourced set
  $$('.tile').forEach(t => { t.hidden = !preset.tiles.includes(t.dataset.tile); });
  // offer map: dim venue tiles outside the preset (never hide)
  const rows = preset.rows;
  $$('.otile[data-band="WHERE"]').forEach(t => t.classList.toggle('dim', rows.length > 0 && !rows.includes(+t.dataset.disc)));
  // matrix: light the matching rows, dim the rest
  $$('.matrix tbody tr, .macc-item li[data-row]').forEach(r => {
    const n = +r.dataset.row; r.classList.toggle('lit', rows.includes(n)); r.classList.toggle('dim', rows.length > 0 && !rows.includes(n));
  });
  // real-estate: the configurator step speaks to off-plan buyers, and chapter 08 is flagged
  const re = !!preset.swap013;
  $$('.line-013').forEach(e => { e.hidden = re; }); $$('.line-013r').forEach(e => { e.hidden = !re; });
  $$('.re-swap').forEach(e => { e.hidden = !re; });
  $$('.re-ctx').forEach(e => { e.hidden = !re; e.previousElementSibling.hidden = re; });
  $$('.next-link[data-re-to]').forEach(a => { const to = re ? a.dataset.reTo : a.dataset.defaultTo; a.href = '#' + to; a.firstChild.textContent = (re ? a.dataset.reText : a.dataset.defaultText) + ' '; });
  $$('.re-flag').forEach(e => { e.hidden = !preset.flagPrevis; });
  track('filter_change', { preset: preset.id });
  films.kick();
  if (scroll) document.getElementById('cover').scrollIntoView();
}
$$('[data-viewfor]').forEach(s => s.addEventListener('change', () => applyPreset(s.value)));

// ---------------------------------------------------------------- dialogs
function openDlg(d) { if (!d.open) d.showModal(); }
$$('dialog').forEach(d => {
  d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
});
$('#indexBtn').addEventListener('click', () => openDlg($('#indexDlg')));
function showSpec() {
  const a = current;
  $$('#specDlg [data-spec]').forEach(s => { s.hidden = s.dataset.spec !== a; });
  $('#specName').textContent = chapterBy(a).title;
}
$('#specBtn').addEventListener('click', () => { showSpec(); openDlg($('#specDlg')); });

// copy the address (email links don't open for every viewer)
$$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
  const text = b.dataset.copy;
  try { await navigator.clipboard.writeText(text); b.textContent = 'Copied'; }
  catch { const r = document.createRange(); r.selectNodeContents($('#email')); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); b.textContent = 'Selected: press Copy'; }
  setTimeout(() => { b.textContent = 'Copy address'; }, 2400);
}));
$$('.cta').forEach(a => a.addEventListener('click', () => track('cta_click', { to: a.getAttribute('href') })));

// matrix accordions on phones: Expand all / Collapse all
$('#expandAll')?.addEventListener('click', (e) => {
  const open = e.currentTarget.getAttribute('aria-expanded') !== 'true';
  $$('.macc-item').forEach(d => { d.open = open; });
  e.currentTarget.setAttribute('aria-expanded', String(open)); e.currentTarget.textContent = open ? 'Collapse all' : 'Expand all';
});

// ---------------------------------------------------------------- start
setView(store.get('ybavit-view') === 'draft' ? 'draft' : 'client');
motion.set(motion.paused);
const h = location.hash.slice(1);
const fromHash = h.startsWith('p-') ? h.slice(2) : null;
applyPreset(fromHash || store.get('ybavit-preset') || 'default');
if (fromHash) history.replaceState(null, '', '#cover');
else if (h) { const target = document.getElementById(h.split('.')[0]); if (target) requestAnimationFrame(() => target.scrollIntoView()); }

initPresent({ films, steps, timeline, applyPreset, getPreset: () => preset, orderFor, setCurrent, track, motion, openIndex: () => openDlg($('#indexDlg')) });
window.YBAVIT = { films, applyPreset, steps, timeline }; // test hook
