// Present mode: the same page stepped one beat at a time from a keyboard or a wireless clicker.
// Keys are attached only while presenting (WCAG 2.1.4); Read mode never captures a key.
import { CHAPTERS, CRAFTS, chapterBy } from './content.js';

const KEYMAP = {
  ArrowRight: 'NEXT', ArrowDown: 'NEXT', PageDown: 'NEXT', ' ': 'NEXT',
  ArrowLeft: 'PREV', ArrowUp: 'PREV', PageUp: 'PREV',
  Home: 'FIRST', End: 'LAST', b: 'BLANK', B: 'BLANK', '.': 'BLANK',
  o: 'INDEX', O: 'INDEX', s: 'NOTES', S: 'NOTES', f: 'FULLSCREEN', F: 'FULLSCREEN', m: 'MUTE', M: 'MUTE',
  e: 'EXPAND', E: 'EXPAND', h: 'HUD', H: 'HUD', '?': 'HELP', q: 'QUIT', Q: 'QUIT', Escape: 'CLOSE', F5: 'SWALLOW',
};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const two = (n) => String(n).padStart(2, '0');
const VENUE_N = { cxc: 4, museums: 5, installations: 6 };

export function initPresent(api) {
  const { films, timeline, applyPreset, getPreset, orderFor, setCurrent, track } = api;
  const body = document.body;
  const dlg = $('#presentDlg');
  const hud = $('#hud'), notes = $('#notesPanel'), blank = $('#blank'), live = $('#live');
  let deck = [], ci = 0, bi = 0, on = false, short = false, startAt = 0, clock = 0, lock = null, notesWin = null, cursorT = 0, digitT = 0, digitBuf = '';
  const expanded = new Set();
  const chan = 'BroadcastChannel' in window ? new BroadcastChannel('ybavit-deck') : null;

  // the run order for this preset, with condensed chapters reduced to their opener and summary beats
  function build() {
    const p = getPreset();
    deck = orderFor(p).map(anchor => {
      const ch = chapterBy(anchor);
      let beats = ch.beats;
      const condensed = ch.condensed && p.condense.includes(ch.n) && !expanded.has(anchor);
      if (condensed) beats = ch.condensed;
      if (anchor === 'crafts' && short) {
        const lead = CRAFTS.find(c => c.id === p.lead);
        beats = [{ sec: 25, label: 'Matrix, all seventeen named', note: 'All seventeen are here; let’s open the one that matters most to you.' }, { ...ch.beats.find(b => b.craft === lead.id), sec: 20 }];
      }
      return { anchor, ch, beats, condensed };
    });
  }
  const total = () => deck.reduce((n, d) => n + d.beats.length, 0);
  const seq = () => deck.slice(0, ci).reduce((n, d) => n + d.beats.length, 0) + bi + 1;

  function render() {
    const d = deck[ci]; const el = document.getElementById(d.anchor); const b = d.beats[bi];
    $$('main > .ch').forEach(c => c.classList.toggle('live', c === el));
    el.dataset.beat = String(bi + 1);
    delete el.dataset.view; $$('.now', el).forEach(n => n.classList.remove('now'));

    if (VENUE_N[d.anchor]) {
      if (d.condensed) el.dataset.view = bi === 0 ? 'opener' : 'summary';
      else {
        el.dataset.view = bi === 0 ? 'opener' : bi === 5 ? 'outcome' : 'step';
        if (bi > 0) {
          const i = bi - 1; const step = $$('.step', el)[i]; step.classList.add('now');
          const fig = $('.figure', el); fig.dataset.active = String(i);
          const chip = $('.figure-chip .chip', fig); const code = $('.code .chip', step); if (chip) chip.textContent = code && i < 4 ? code.textContent : 'Outcome';
        }
      }
    } else if (d.anchor === 'crafts') {
      el.dataset.view = bi === 0 ? 'matrix' : 'panel';
      if (bi > 0) document.getElementById(b.craft)?.classList.add('now');
    } else if (d.anchor === 'previs') {
      $$('.step', el)[bi].classList.add('now'); $('.figure', el).dataset.active = String(bi);
    } else if (d.anchor === 'show-control') {
      $$('.step', el)[bi].classList.add('now');
      if (bi === 1) { timeline.setState(2); timeline.run(); } else timeline.setState(bi + 1);
    }
    setCurrent(d.anchor);
    films.wake(el);
    history.replaceState(null, '', '#' + d.anchor + (bi ? '.' + (bi + 1) : ''));
    live.textContent = `${two(d.ch.n)} ${d.ch.title}, beat ${bi + 1} of ${d.beats.length}`;
    sync();
    track('beat_reached', { chapter: d.anchor, beat: bi + 1, mode: 'present' });
  }

  function next() {
    if (bi < deck[ci].beats.length - 1) bi++;
    else if (ci < deck.length - 1) { ci++; bi = 0; }
    else return; // the last beat: Next does nothing
    render();
  }
  function prev() {
    if (bi > 0) bi--; else if (ci > 0) { ci--; bi = deck[ci].beats.length - 1; } else return;
    render();
  }
  function goChapter(anchor, beat = 0) { const i = deck.findIndex(d => d.anchor === anchor); if (i < 0) return; ci = i; bi = Math.min(beat, deck[i].beats.length - 1); render(); }

  // ---------------------------------------------------------------- notes, HUD, sync
  function nextLabel() {
    const d = deck[ci];
    if (bi < d.beats.length - 1) return d.beats[bi + 1].label;
    const n = deck[ci + 1]; return n ? `${two(n.ch.n)} ${n.ch.title}` : 'End · O for index';
  }
  function sync() {
    const d = deck[ci], b = d.beats[bi];
    const head = `${two(d.ch.n)} ${d.ch.title} · beat ${bi + 1}/${d.beats.length} · ${seq()}/${total()}${d.condensed ? ' · condensed (E expands)' : ''}`;
    $('#npHead').textContent = head; $('#npNote').textContent = b.note; $('#npNext').textContent = 'Next: ' + nextLabel();
    $('#hudBeat').textContent = `${seq()}/${total()}`; $('#hudNext').textContent = 'Next: ' + nextLabel();
    $('#hudFs').textContent = document.fullscreenElement ? '' : 'Press F for fullscreen';
    chan?.postMessage({ type: 'state', head, note: b.note, next: nextLabel(), elapsed: Date.now() - startAt, target: getPreset().label });
  }
  chan && (chan.onmessage = (e) => {
    const m = e.data || {}; if (!on) return;
    if (m.cmd === 'next') next(); else if (m.cmd === 'prev') prev(); else if (m.cmd === 'hello') sync(); else if (m.cmd === 'goto') goChapter(m.anchor, m.beat || 0);
  });
  function tickClock() {
    const s = Math.floor((Date.now() - startAt) / 1000);
    $('#hudClock').textContent = `${two(Math.floor(s / 60))}:${two(s % 60)}`;
  }
  function toggleNotes() {
    if (notesWin && !notesWin.closed) { notesWin.focus(); return; }
    try { notesWin = window.open('notes.html', 'ybavit-notes', 'width=960,height=640'); } catch { notesWin = null; }
    if (!notesWin) notes.hidden = !notes.hidden; // the host refused a second window: notes show on this screen
    else setTimeout(sync, 600);
  }

  // ---------------------------------------------------------------- screen: fullscreen, wake lock, cursor
  const fullscreen = () => document.documentElement.requestFullscreen?.({ navigationUI: 'hide' }).catch(() => {});
  async function wake() { try { lock = await navigator.wakeLock?.request('screen'); } catch { lock = null; } }
  document.addEventListener('visibilitychange', () => { if (on && document.visibilityState === 'visible') wake(); });
  document.addEventListener('fullscreenchange', () => { if (on) sync(); });
  const moved = () => { body.classList.remove('hide-cursor'); clearTimeout(cursorT); cursorT = setTimeout(() => on && body.classList.add('hide-cursor'), 5000); };

  // ---------------------------------------------------------------- keys
  function onKey(e) {
    if (!on || e.ctrlKey || e.metaKey || e.altKey) return;
    if ($('#indexDlg').open && e.key !== 'Escape') return; // the index takes the keyboard while it is open
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault(); digitBuf += e.key; clearTimeout(digitT);
      // chapters 10-12: "1" waits 400 ms for a second digit
      const go = () => { const n = +digitBuf; digitBuf = ''; const ch = CHAPTERS.find(c => c.n === n); if (ch) goChapter(ch.anchor); };
      if (digitBuf === '1') digitT = setTimeout(go, 400); else go();
      return;
    }
    const act = KEYMAP[e.key] || (e.key === ' ' && e.shiftKey ? 'PREV' : null);
    if (!act) return;
    e.preventDefault();
    if (e.key === ' ' && e.shiftKey) { prev(); return; }
    switch (act) {
      case 'NEXT': if (!blank.hidden) blank.hidden = true; else next(); break;
      case 'PREV': if (!blank.hidden) blank.hidden = true; else prev(); break;
      case 'FIRST': ci = 0; bi = 0; render(); break;
      case 'LAST': ci = deck.length - 1; bi = 0; render(); break;
      case 'BLANK': blank.hidden = !blank.hidden; break;
      case 'INDEX': case 'HELP': api.openIndex(); break;
      case 'NOTES': toggleNotes(); break;
      case 'FULLSCREEN': document.fullscreenElement ? document.exitFullscreen() : fullscreen(); break;
      case 'HUD': hud.hidden = !hud.hidden; break;
      case 'EXPAND': { const d = deck[ci]; if (d.condensed) { expanded.add(d.anchor); const a = d.anchor; build(); goChapter(a, 0); } break; }
      case 'MUTE': $$('video').forEach(v => { v.muted = true; }); break;
      case 'QUIT': stop(); break;
      case 'CLOSE': if (!blank.hidden) blank.hidden = true; else if (!notes.hidden) notes.hidden = true; else if (!document.fullscreenElement) stop(); break;
    }
  }
  // index links jump to their chapter while presenting
  $('#indexDlg').addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]'); if (!a || !on) return;
    e.preventDefault(); $('#indexDlg').close();
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id); const ch = target?.closest('main > .ch'); if (!ch) return;
    const d = deck.find(x => x.anchor === ch.id);
    let beat = 0;
    if (ch.id === 'crafts' && target.matches('.craft, .craft *')) { const cid = target.closest('.craft').id; beat = Math.max(0, d.beats.findIndex(b => b.craft === cid)); }
    if (VENUE_N[ch.id] && target.closest('.step')) { if (d.condensed) { expanded.add(ch.id); build(); } beat = +target.closest('.step').dataset.step + 1; }
    goChapter(ch.id, beat);
  });

  // ---------------------------------------------------------------- start and stop
  function start() {
    applyPreset($('#presentFor').value);
    short = $('#presentShort').checked;
    expanded.clear(); build();
    // resume where the reader is, so a reload or a mid-deck start keeps its place
    const [a, k] = location.hash.slice(1).split('.');
    const i = deck.findIndex(d => d.anchor === a);
    ci = i >= 0 ? i : 0; bi = i >= 0 && k ? Math.min(+k - 1, deck[ci].beats.length - 1) : 0;
    on = true; body.classList.add('present'); startAt = Date.now();
    clock = setInterval(tickClock, 1000); tickClock();
    fullscreen(); wake();
    addEventListener('keydown', onKey); addEventListener('pointermove', moved); moved();
    hud.hidden = true;
    render();
    track('present_start', { preset: getPreset().id, short });
  }
  function stop() {
    if (!on) return;
    const anchor = deck[ci].anchor;
    on = false; body.classList.remove('present', 'hide-cursor');
    removeEventListener('keydown', onKey); removeEventListener('pointermove', moved);
    clearInterval(clock); hud.hidden = true; notes.hidden = true; blank.hidden = true;
    $$('main > .ch').forEach(c => { c.classList.remove('live'); delete c.dataset.beat; delete c.dataset.view; });
    $$('.now').forEach(n => n.classList.remove('now'));
    timeline.stop();
    try { lock?.release(); } catch { /* already released */ } lock = null;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    history.replaceState(null, '', '#' + anchor);
    document.getElementById(anchor).scrollIntoView();
    $('#presentBtn').focus();
  }

  $('#presentBtn').addEventListener('click', () => { $('#presentFor').value = getPreset().id; dlg.showModal(); });
  $('#presentGo').addEventListener('click', () => { dlg.close(); start(); });
}
