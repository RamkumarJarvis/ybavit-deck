// The show-control cue timeline for chapter 09, drawn in code (SVG lanes under HTML labels).
// An illustrative 60 s show at 25 fps: five lanes, seven cues, one playhead. States follow the chapter's steps:
// 1 intro, 2 one clock (06.1), 3 warp (06.2), 4 the venue's day (06.3), 5 sensors (06.4).
import { CUES } from './content.js';

const NS = 'http://www.w3.org/2000/svg';
const two = (n) => String(Math.floor(n)).padStart(2, '0');
const tc = (s) => `00:00:${two(s)}:${two((s % 1) * CUES.fps)}`;
const hm = (h) => `${two(h)}:${two((h % 1) * 60)}`;
const el = (tag, attrs = {}, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent?.appendChild(e); return e; };

export function createTimeline(root) {
  if (!root) return { setState() {}, run() {}, stop() {} };
  const stage = root.querySelector('.tl-stage');
  const runBtn = root.querySelector('#tlRun');
  const chip = root.querySelector('.tl-chip');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const LABEL = 144, RULER = 40, TOP = 52, LANE = () => (innerWidth < 1024 ? 44 : 56);
  let W = 0, state = 1, t = 0, raf = 0, timer = 0, running = false, svg, labels, play, tcChip, x;
  const blocks = [], cueLines = [], cueBtns = [];

  function draw() {
    W = stage.clientWidth; if (!W) return;
    const L = LANE(); const H = TOP + RULER + CUES.lanes.length * L + 8;
    stage.style.height = H + 'px';
    stage.replaceChildren();
    blocks.length = cueLines.length = cueBtns.length = 0;
    const x0 = LABEL + 12, x1 = W - 8;
    const day = state === 4;
    const span = day ? [6, 24] : [0, CUES.length];
    x = (v) => x0 + (v - span[0]) / (span[1] - span[0]) * (x1 - x0);
    svg = el('svg', { class: 'tl-svg', width: W, height: H, viewBox: `0 0 ${W} ${H}` }, stage);
    const defs = el('defs', {}, svg);
    const pat = el('pattern', { id: 'hatch', width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    el('rect', { width: 6, height: 6, fill: 'rgba(236,230,218,.04)' }, pat);
    el('line', { x1: 0, y1: 0, x2: 0, y2: 6, stroke: 'rgba(236,230,218,.35)', 'stroke-width': 1.5 }, pat);
    labels = document.createElement('div'); labels.className = 'tl-labels'; stage.appendChild(labels);

    // ruler
    const rl = document.createElement('div'); rl.className = 'tl-ruler-label';
    rl.style.top = TOP + 'px'; rl.innerHTML = day ? 'DAY <b>06:00–24:00</b>' : 'LTC <b>MTC</b> 25 fps';
    labels.appendChild(rl);
    if (day) {
      for (let hr = 6; hr <= 24; hr++) {
        const major = hr % 3 === 0;
        el('line', { class: 'tl-tick' + (major ? ' major' : ''), x1: x(hr), x2: x(hr), y1: TOP + (major ? 18 : 28), y2: TOP + RULER }, svg);
        if (major) el('text', { x: x(hr) + 4, y: TOP + 14 }, svg).textContent = hm(hr);
      }
    } else {
      for (let s = 0; s <= CUES.length; s += 2) {
        const major = s % 10 === 0;
        el('line', { class: 'tl-tick' + (major ? ' major' : ''), x1: x(s), x2: x(s), y1: TOP + (major ? 18 : 30), y2: TOP + RULER }, svg);
        if (major && s < CUES.length) el('text', { x: x(s) + 4, y: TOP + 14 }, svg).textContent = tc(s);
      }
    }
    // lanes
    CUES.lanes.forEach((ln, i) => {
      const y = TOP + RULER + i * L;
      el('rect', { class: 'tl-lane-bg', x: x0, y: y + 2, width: x1 - x0, height: L - 4 }, svg);
      el('line', { class: 'tl-tick', x1: 0, x2: W, y1: y, y2: y }, svg);
      const n = document.createElement('div'); n.className = 'tl-lane-name';
      n.style.top = (y + (L - 34) / 2) + 'px';
      n.innerHTML = day ? (i === 0 ? '<span>Venue</span><span class="mono">SCHEDULE · CMS</span>' : `<span style="opacity:.35">${ln.name}</span>`) : `<span>${ln.name}</span><span class="mono">${ln.label}</span>`;
      labels.appendChild(n);
    });
    const laneY = (id) => TOP + RULER + CUES.lanes.findIndex(l => l.id === id) * L;

    if (day) {
      const y = TOP + RULER;
      const g = el('g', { class: 'tl-day' }, svg);
      // short sequences carry their label on the row below, so no two labels share a line
      [[9.5, 10, 'Open sequence 09:30', 1], [10, 19, 'Show cycles every 30 min', 0], [19, 19.5, 'Close sequence 19:00', 1]].forEach(([a, b, label, below]) => {
        el('rect', { x: x(a), y: y + 8, width: Math.max(6, x(b) - x(a)), height: L - 16 }, g);
        el('text', { x: x(a) + (below ? 0 : 8), y: below ? y + L + 18 : y + L / 2 + 4, fill: '#ece6da' }, g).textContent = label;
      });
      const now = 14;
      play = el('line', { class: 'tl-play', x1: x(now), x2: x(now), y1: TOP + 10, y2: H - 4 }, svg);
      tcChip = document.createElement('span'); tcChip.className = 'tl-tc'; tcChip.style.top = (TOP - 4) + 'px'; tcChip.style.left = x(now) + 'px'; tcChip.textContent = 'now'; labels.appendChild(tcChip);
      return;
    }

    for (const [lane, a, b, kind, label] of CUES.blocks) {
      const y = laneY(lane);
      if (kind === 'trig') {
        const cx = x(a), cy = y + L / 2, r = 8;
        const d = el('path', { class: 'tl-trig', d: `M${cx} ${cy - r} L${cx + r} ${cy} L${cx} ${cy + r} L${cx - r} ${cy} Z` }, svg);
        el('text', { x: cx + 12, y: cy + 4 }, svg).textContent = label;
        blocks.push({ a, b: a + 1.2, node: d, kind });
      } else {
        const r = el(kind === 'ramp' ? 'path' : 'rect', kind === 'ramp'
          ? { class: 'tl-block ramp', d: `M${x(a)} ${y + L - 8} L${x(b)} ${y + 8} L${x(b)} ${y + L - 8} Z` }
          : { class: 'tl-block', x: x(a) + 1, y: y + 8, width: Math.max(2, x(b) - x(a) - 2), height: L - 16, rx: 2 }, svg);
        if (kind !== 'ramp' && x(b) - x(a) > 70) el('text', { x: x(a) + 6, y: y + L / 2 + 4 }, svg).textContent = label;
        blocks.push({ a, b, node: r, kind, lane });
      }
    }
    // output slices for the warp step (06.2): the hero film split into four outputs
    if (state === 3) {
      const g = el('g', { class: 'tl-slices' }, svg); const y = laneY('video');
      for (let i = 0; i < 4; i++) el('rect', { x: x(18) + 1, y: y + 6 + i * (L - 12) / 4, width: x(46) - x(18) - 2, height: (L - 12) / 4 - 2 }, g);
      el('text', { x: x(18) + 8, y: y - 4 }, svg).textContent = 'Hero film · 4 outputs';
    }
    CUES.cues.forEach((q, i) => {
      cueLines.push(el('line', { class: 'tl-cueline', x1: x(q.t), x2: x(q.t), y1: TOP, y2: H - 4 }, svg));
      const b = document.createElement('button'); b.type = 'button'; b.className = 'tl-cue';
      b.style.left = x(q.t) + 'px'; b.style.top = (i % 2 ? 22 : 0) + 'px'; b.textContent = q.name;
      b.setAttribute('aria-label', `${q.name} at ${tc(q.t)}, fires ${q.lanes.join(', ')}`);
      b.addEventListener('click', () => { stop(); jump(q.t, i); });
      labels.appendChild(b); cueBtns.push(b);
    });
    play = el('line', { class: 'tl-play', x1: x(t), x2: x(t), y1: TOP + 10, y2: H - 4 }, svg);
    tcChip = document.createElement('span'); tcChip.className = 'tl-tc'; tcChip.style.top = (TOP - 4) + 'px'; labels.appendChild(tcChip);
    paint();
  }

  function paint() {
    if (!play || state === 4) return;
    play.setAttribute('x1', x(t)); play.setAttribute('x2', x(t));
    tcChip.style.left = x(t) + 'px'; tcChip.textContent = tc(t);
    for (const b of blocks) b.node.classList.toggle('lit', t >= b.a && t < b.b + (b.kind === 'trig' ? 0 : 0));
    CUES.cues.forEach((q, i) => { const on = t >= q.t && t < q.t + 2.5; cueLines[i]?.classList.toggle('on', on); cueBtns[i]?.classList.toggle('on', on); });
  }
  function jump(sec, i) {
    t = sec; paint();
    root.querySelectorAll('.cue-btn').forEach((b, k) => b.classList.toggle('on', k === i));
  }

  function run() {
    if (running) { stop(); return; }
    if (state === 4) setState(2);
    running = true; runBtn.setAttribute('aria-pressed', 'true'); runBtn.textContent = '❚❚ Pause';
    chip.hidden = false;
    if (t >= CUES.length - .1) t = 0;
    if (reduced.matches || document.body.classList.contains('still')) {
      // reduced motion: the playhead steps from cue to cue instead of sweeping
      const next = () => { const q = CUES.cues.find(c => c.t > t + .01); if (!q) { stop(true); return; } jump(q.t, CUES.cues.indexOf(q)); timer = setTimeout(next, 2000); };
      next(); return;
    }
    let last = performance.now();
    const step = (now) => { t = Math.min(CUES.length, t + (now - last) / 1000 * 4); last = now; paint(); if (t >= CUES.length) { stop(true); return; } raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  }
  function stop(done = false) {
    running = false; cancelAnimationFrame(raf); clearTimeout(timer);
    runBtn.setAttribute('aria-pressed', 'false'); runBtn.textContent = '▶ Run the cues';
    if (!done) chip.hidden = state !== 2;
  }
  function setState(n) {
    if (n === state && svg) return;
    stop(); state = n; root.dataset.state = String(n);
    chip.hidden = n !== 2;
    t = n === 1 ? 0 : n === 5 ? 54 : n >= 2 ? 18 : 0;
    draw();
  }

  runBtn.addEventListener('click', () => run());
  const tableBtn = root.querySelector('#tlTable'), table = root.querySelector('#tlTableWrap');
  tableBtn.addEventListener('click', () => { const open = table.hidden; table.hidden = !open; tableBtn.setAttribute('aria-expanded', String(open)); tableBtn.textContent = open ? 'Hide table' : 'Read as table'; });

  // phone cue strip: arrows, counter, tap to mark
  const strip = root.querySelector('.cue-strip'), count = root.querySelector('.strip-count');
  root.querySelectorAll('[data-strip]').forEach(b => b.addEventListener('click', () => { const card = strip.querySelector('.cue-card'); strip.scrollBy({ left: +b.dataset.strip * (card.offsetWidth + 12), behavior: reduced.matches ? 'auto' : 'smooth' }); }));
  strip.addEventListener('scroll', () => { const card = strip.querySelector('.cue-card'); const i = Math.round(strip.scrollLeft / (card.offsetWidth + 12)); count.textContent = `${Math.min(CUES.cues.length, i + 1)}/${CUES.cues.length}`; }, { passive: true });
  strip.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); root.querySelector(`[data-strip="${e.key === 'ArrowRight' ? 1 : -1}"]`).click(); } });
  root.querySelectorAll('.cue-btn').forEach((b, i) => b.addEventListener('click', () => jump(CUES.cues[i].t, i)));

  new ResizeObserver(() => { if (stage.clientWidth !== W) draw(); }).observe(stage);
  root.dataset.state = '1';
  draw();
  return { setState, run, stop, get state() { return state; } };
}
