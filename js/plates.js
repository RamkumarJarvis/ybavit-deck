// Studies drawn in code that hold each film slot until its film exists. Each one follows its slot's brief:
// the composition, the palette, a dark lower-left third for copy, and an 8 s loop whose first frame matches its last.
// They are labelled as studies on the page and never carry the AI badge.

const TAU = Math.PI * 2;
const LOOP = 8;

function rng(seed) {
  let a = seed >>> 0;
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
function rgb(hex) { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
const rgba = (hex, a) => { const [r, g, b] = rgb(hex); return `rgba(${r},${g},${b},${a})`; };
const mix = (h1, h2, k) => { const a = rgb(h1), b = rgb(h2); return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
const ease = (x) => 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, Math.max(0, x)));
const wave = (th) => 0.5 - 0.5 * Math.cos(th); // 0 at loop start, 1 mid-loop, 0 at loop end

function glow(ctx, x, y, r, col, a) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0));
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
}
function base(ctx, w, h, top = '#05070a', bottom = '#0a0d12') {
  const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, top); g.addColorStop(1, bottom);
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
}
// keeps the lower-left third dark for the headline, as every brief asks
function copySpace(ctx, w, h, k = .55) {
  const g = ctx.createRadialGradient(0, h, 0, 0, h, Math.max(w, h) * .7);
  g.addColorStop(0, `rgba(0,0,0,${k})`); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
}
function person(ctx, x, y, s, col = '#020304') {
  // a standing silhouette with its feet at (x, y), s = height in px
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.ellipse(x, y - s * .9, s * .075, s * .09, 0, 0, TAU); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x - s * .13, y - s * .78); ctx.quadraticCurveTo(x - s * .16, y - s * .4, x - s * .1, y - s * .42);
  ctx.lineTo(x - s * .08, y); ctx.lineTo(x + s * .08, y); ctx.lineTo(x + s * .1, y - s * .42);
  ctx.quadraticCurveTo(x + s * .16, y - s * .4, x + s * .13, y - s * .78); ctx.closePath(); ctx.fill();
}
function curvedWall(w, h, top, bot, sag) {
  const p = new Path2D(); const cx = w / 2;
  p.moveTo(0, top * h);
  p.quadraticCurveTo(cx, (top + sag) * h * 1.0 + sag * h, w, top * h);
  p.lineTo(w, bot * h);
  p.quadraticCurveTo(cx, (bot - sag) * h - sag * h, 0, bot * h);
  p.closePath(); return p;
}

// ---------------------------------------------------------------- motifs
const M = {};

M.wall = (ctx, w, h, t, pal, o) => {
  const th = TAU * t / LOOP;
  base(ctx, w, h, '#030406', '#07090d');
  const portrait = h > w;
  const top = portrait ? .14 : .1, bot = portrait ? .56 : .6, sag = .045;
  const wall = curvedWall(w, h, top, bot, sag);
  ctx.save(); ctx.clip(wall);
  ctx.fillStyle = o.dusk ? '#0d1020' : '#06080c'; ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';
  if (o.dusk) {
    const g = ctx.createLinearGradient(0, top * h, 0, bot * h);
    g.addColorStop(0, rgba(pal[1], .5)); g.addColorStop(.6, rgba(pal[0], .25 + .05 * Math.sin(th))); g.addColorStop(1, rgba(pal[0], .45));
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    glow(ctx, w * .62, bot * h, w * .25, pal[2], .25 + .08 * Math.sin(th));
  } else {
    const bloom = .4 + .6 * wave(th);
    for (let i = 0; i < 7; i++) {
      const col = pal[i % pal.length];
      const yb = h * (top + .08 + i * (bot - top - .12) / 7);
      ctx.beginPath();
      for (let x = 0; x <= w; x += w / 60) {
        const y = yb + Math.sin(x / w * TAU * (1 + i * .25) + th + i) * h * .025 + Math.sin(x / w * TAU * 3 - th * 2 + i) * h * .008;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = rgba(col, .16 + .2 * bloom); ctx.lineWidth = h * (.012 + .01 * (i % 3)); ctx.stroke();
      ctx.strokeStyle = rgba('#ffffff', .25 * bloom); ctx.lineWidth = 1; ctx.stroke();
    }
    glow(ctx, w * (.55 + .1 * Math.sin(th)), h * (top + bot) / 2, w * .3, pal[0], .18 * bloom);
  }
  ctx.restore();
  // wall edge light
  ctx.strokeStyle = 'rgba(236,230,218,.12)'; ctx.lineWidth = 1; ctx.stroke(wall);
  // reflective floor
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const fy = bot * h;
  const fg = ctx.createLinearGradient(0, fy, 0, h);
  fg.addColorStop(0, rgba(o.dusk ? pal[0] : pal[0], o.dusk ? .14 : .16)); fg.addColorStop(.5, rgba(pal[1], .04)); fg.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = fg; ctx.fillRect(0, fy, w, h - fy);
  for (let i = 0; i < 6; i++) {
    const y = fy + (h - fy) * (i + 1) / 8; ctx.fillStyle = rgba(pal[i % pal.length], .05 * (1 - i / 6));
    ctx.fillRect(w * (.2 + .05 * Math.sin(th + i)), y, w * .6, 2);
  }
  ctx.restore();
  // plinth and the soft shape rising above it (hero)
  if (!o.figures) {
    const px = w * (portrait ? .5 : .66), py = h * (portrait ? .74 : .8), pw = w * (portrait ? .3 : .14);
    ctx.fillStyle = '#0c1016'; ctx.fillRect(px - pw / 2, py, pw, h * .035);
    ctx.fillStyle = 'rgba(236,230,218,.18)'; ctx.fillRect(px - pw / 2, py, pw, 1.5);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const rise = o.dusk ? .15 : wave(th);
    glow(ctx, px, py - h * (.05 + .07 * rise), pw * (.5 + .4 * rise), pal[o.dusk ? 0 : 1], .25 + .3 * rise);
    glow(ctx, px, py - h * .02, pw * .6, pal[0], .15);
    ctx.restore();
  } else {
    const n = o.figures;
    for (let i = 0; i < n; i++) person(ctx, w * (.48 + i * .14 + .02 * (i % 2)), h * (bot + .26 + .02 * (i % 2)), h * (.3 - .02 * i));
  }
  copySpace(ctx, w, h, .6);
};

M.stage = (ctx, w, h, t, pal) => {
  const th = TAU * t / LOOP, k = wave(th);
  base(ctx, w, h);
  const sx = w * .1, sy = h * .08, sw = w * .8, sh = h * .52;
  ctx.fillStyle = '#060a10'; ctx.fillRect(sx, sy, sw, sh);
  ctx.save(); ctx.beginPath(); ctx.rect(sx, sy, sw, sh); ctx.clip(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 5; i++) { // landscape layers
    ctx.beginPath(); ctx.moveTo(sx, sy + sh);
    for (let x = 0; x <= sw; x += sw / 40) ctx.lineTo(sx + x, sy + sh * (.45 + i * .1) + Math.sin(x / sw * TAU * (1 + i * .6) + i) * sh * .06);
    ctx.lineTo(sx + sw, sy + sh); ctx.closePath(); ctx.fillStyle = rgba(pal[0], .08 * (1 - k)); ctx.fill();
  }
  const cx = sx + sw * .5, cy = sy + sh * .5;
  for (let i = 0; i < 7; i++) { // exploded mechanical form
    const off = (i - 3) * sw * .06 * k;
    ctx.strokeStyle = rgba(i % 2 ? pal[1] : pal[2], .5 * k); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(cx + off, cy, sh * (.12 + .02 * (3 - Math.abs(i - 3))), sh * .3, 0, 0, TAU); ctx.stroke();
  }
  ctx.restore();
  ctx.fillStyle = '#0b0f15'; ctx.fillRect(0, sy + sh + h * .1, w, h); // stage deck
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(ctx, w * .5, sy + sh + h * .1, w * .35, pal[0], .12); ctx.restore();
  // presenter, back three-quarters, raising an open hand
  const px = w * .7, py = h * .97, s = h * .5; person(ctx, px, py, s);
  const a = -0.4 - 1.0 * k; ctx.strokeStyle = '#020304'; ctx.lineWidth = s * .05; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(px - s * .1, py - s * .72); ctx.lineTo(px - s * .1 + Math.cos(a + Math.PI) * s * .32, py - s * .72 + Math.sin(a) * s * .32); ctx.stroke();
  copySpace(ctx, w, h, .45);
};

M.cloud = (ctx, w, h, t, pal, o, st) => {
  const th = TAU * t / LOOP, k = ease(wave(th) * 1.4 - .2);
  base(ctx, w, h);
  if (!st.pts) {
    const r = rng(st.seed); st.pts = [];
    const centres = [[.3, .4], [.5, .3], [.68, .45], [.48, .58]];
    for (let i = 0; i < 520; i++) { const c = centres[i % 4]; st.pts.push({ x: r(), y: .1 + r() * .7, cx: c[0] + (r() - .5) * .1, cy: c[1] + (r() - .5) * .12, p: r() * TAU, s: .6 + r() }); }
  }
  ctx.strokeStyle = 'rgba(236,230,218,.08)'; ctx.stroke(curvedWall(w, h, .06, .82, .03));
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const p of st.pts) {
    const x = (p.x + (p.cx - p.x) * k + .01 * Math.sin(th + p.p)) * w;
    const y = (p.y + (p.cy - p.y) * k + .01 * Math.cos(th + p.p)) * h;
    ctx.fillStyle = rgba(p.s > 1.3 ? pal[1] : pal[0], .5 + .3 * k); ctx.fillRect(x, y, p.s * 1.6, p.s * 1.6);
  }
  glow(ctx, w * .5, h * .46, w * .08, pal[1], .35 * k);
  ctx.restore();
  copySpace(ctx, w, h, .4);
};

M.turn = (ctx, w, h, t, pal, o) => {
  const th = TAU * t / LOOP, k = wave(th);
  base(ctx, w, h, '#07090d', '#0d1015');
  if (o.room) { // apartment interior in one-point perspective, finishes swap
    const c = mix(pal[0], pal[1], k);
    const vx = w * .55, vy = h * .45, bw = w * .34, bh = h * .32;
    ctx.fillStyle = mix('#1a1714', '#141210', k); ctx.fillRect(vx - bw / 2, vy - bh / 2, bw, bh);
    ctx.fillStyle = 'rgba(255,220,170,.12)'; ctx.fillRect(vx - bw * .18, vy - bh * .32, bw * .36, bh * .5);
    ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(vx - bw / 2, vy + bh / 2); ctx.lineTo(vx + bw / 2, vy + bh / 2); ctx.lineTo(w, h); ctx.fill();
    ctx.fillStyle = mix('#2a2420', '#3a3a3c', k); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(vx - bw / 2, vy - bh / 2); ctx.lineTo(vx - bw / 2, vy + bh / 2); ctx.lineTo(0, h); ctx.fill();
    ctx.fillStyle = mix('#241f1b', '#2f2f31', k); ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(vx + bw / 2, vy - bh / 2); ctx.lineTo(vx + bw / 2, vy + bh / 2); ctx.lineTo(w, h); ctx.fill();
    ctx.fillStyle = mix('#d8cbb6', '#8d8a86', k); ctx.fillRect(vx - bw * .3, vy + bh * .55, bw * .6, h * .06);
    copySpace(ctx, w, h, .5); return;
  }
  // display frame
  ctx.fillStyle = '#0a0d12'; ctx.fillRect(w * .12, h * .1, w * .76, h * .62);
  ctx.strokeStyle = 'rgba(236,230,218,.1)'; ctx.strokeRect(w * .12, h * .1, w * .76, h * .62);
  const ang = Math.sin(th) * .26; const col = mix(pal[0], pal[1], k);
  ctx.save(); ctx.translate(w * .5, h * .5); ctx.scale(Math.cos(ang), 1); ctx.transform(1, 0, Math.sin(ang) * .25, 1, 0, 0);
  const L = w * .26, H = h * .1;
  ctx.fillStyle = col; ctx.beginPath();
  ctx.moveTo(-L, H); ctx.lineTo(-L, 0); ctx.quadraticCurveTo(-L * .7, -H * 1.1, -L * .2, -H * 1.3); ctx.lineTo(L * .4, -H * 1.3);
  ctx.quadraticCurveTo(L * .85, -H * 1.1, L, 0); ctx.lineTo(L, H); ctx.closePath(); ctx.fill();
  const hl = ctx.createLinearGradient(-L, -H, L, H); hl.addColorStop(0, 'rgba(255,255,255,0)'); hl.addColorStop(.45 + .2 * Math.sin(th), 'rgba(255,255,255,.35)'); hl.addColorStop(.55 + .2 * Math.sin(th), 'rgba(255,255,255,0)');
  ctx.fillStyle = hl; ctx.fill();
  ctx.fillStyle = '#050608'; for (const x of [-L * .6, L * .6]) { ctx.beginPath(); ctx.ellipse(x, H, H * .75, H * .75, 0, 0, TAU); ctx.fill(); }
  ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(ctx, w * .5, h * .62, w * .3, '#ffcf9a', .1); ctx.restore();
  // soft-focus visitor with a tablet
  ctx.globalAlpha = .9; person(ctx, w * .14, h * 1.08, h * .6, '#030405'); ctx.globalAlpha = 1;
  ctx.fillStyle = rgba('#7fd8ff', .35); ctx.fillRect(w * .19, h * .62, w * .05, h * .07);
  copySpace(ctx, w, h, .35);
};

M.tunnel = (ctx, w, h, t, pal) => {
  base(ctx, w, h, '#030510', '#05060d');
  const vx = w * .56, vy = h * .46;
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const n = 9;
  for (let i = 0; i < n; i++) {
    const f = ((i / n + t / LOOP) % 1); const s = Math.pow(f, 2.2);
    const rw = w * (.04 + s * 1.2), rh = h * (.05 + s * 1.3);
    ctx.strokeStyle = rgba(i % 3 === 0 ? pal[1] : pal[0], .15 + .6 * f * (1 - f) * 2); ctx.lineWidth = 1 + s * 6;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(vx - rw / 2, vy - rh / 2, rw, rh, rh * .12) : ctx.rect(vx - rw / 2, vy - rh / 2, rw, rh); ctx.stroke();
    glow(ctx, vx, vy + rh * .32, 4 + s * 26, pal[1], .5 * f);
  }
  ctx.restore();
  person(ctx, w * .36, h * .98, h * .55); person(ctx, w * .78, h * 1.0, h * .58);
  copySpace(ctx, w, h, .5);
};

M.statue = (ctx, w, h, t, pal, o) => {
  const th = TAU * t / LOOP, k = wave(th);
  base(ctx, w, h, '#05070b', '#090b10');
  const sx = w * (h > w ? .5 : .62), sy = h * .86, s = h * .7;
  // spotlight
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const sp = ctx.createLinearGradient(sx, 0, sx, sy); sp.addColorStop(0, 'rgba(255,214,160,.0)'); sp.addColorStop(1, 'rgba(255,214,160,.12)');
  ctx.fillStyle = sp; ctx.beginPath(); ctx.moveTo(sx - w * .02, 0); ctx.lineTo(sx + w * .02, 0); ctx.lineTo(sx + s * .45, sy); ctx.lineTo(sx - s * .45, sy); ctx.fill();
  glow(ctx, sx, sy, s * .5, '#ffd6a0', .12); ctx.restore();
  // plinth and a draped figure in weathered stone, lit from the spot above right
  ctx.fillStyle = '#141518'; ctx.fillRect(sx - s * .2, sy, s * .4, h - sy);
  ctx.fillStyle = 'rgba(236,230,218,.12)'; ctx.fillRect(sx - s * .2, sy, s * .4, 1.5);
  const fig = new Path2D();
  fig.ellipse(sx, sy - s * .88, s * .055, s * .07, 0, 0, TAU);
  fig.moveTo(sx - s * .03, sy - s * .81); fig.lineTo(sx + s * .03, sy - s * .81);
  fig.quadraticCurveTo(sx + s * .14, sy - s * .78, sx + s * .15, sy - s * .7);
  fig.quadraticCurveTo(sx + s * .12, sy - s * .5, sx + s * .1, sy - s * .4);
  fig.quadraticCurveTo(sx + s * .16, sy - s * .2, sx + s * .17, sy);
  fig.lineTo(sx - s * .17, sy);
  fig.quadraticCurveTo(sx - s * .15, sy - s * .22, sx - s * .1, sy - s * .4);
  fig.quadraticCurveTo(sx - s * .13, sy - s * .52, sx - s * .15, sy - s * .7);
  fig.quadraticCurveTo(sx - s * .14, sy - s * .78, sx - s * .03, sy - s * .81);
  const stoneG = ctx.createLinearGradient(sx - s * .2, 0, sx + s * .2, 0);
  stoneG.addColorStop(0, '#2a2824'); stoneG.addColorStop(.55, '#6e675c'); stoneG.addColorStop(1, '#9a9182');
  ctx.fillStyle = stoneG; ctx.fill(fig);
  ctx.save(); ctx.clip(fig);
  // drapery folds
  ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = Math.max(1, s * .006);
  for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.moveTo(sx - s * .12 + i * s * .04, sy - s * .42); ctx.quadraticCurveTo(sx - s * .1 + i * s * .035, sy - s * .2, sx - s * .14 + i * s * .045, sy); ctx.stroke(); }
  if (!o.scan) {
    // pigment returns: lapis garment, ochre drapery, a gold band, then fades back to bare stone
    ctx.globalAlpha = .5 * k;
    ctx.fillStyle = pal[1]; ctx.fillRect(sx - s * .2, sy - s * .8, s * .4, s * .38);
    ctx.fillStyle = pal[0]; ctx.fillRect(sx - s * .2, sy - s * .42, s * .4, s * .42);
    ctx.fillStyle = pal[2]; ctx.fillRect(sx - s * .2, sy - s * .45, s * .4, s * .03); ctx.fillRect(sx - s * .2, sy - s * .955, s * .4, s * .02);
    ctx.globalAlpha = 1;
    const shade = ctx.createLinearGradient(sx - s * .2, 0, sx + s * .2, 0); shade.addColorStop(0, 'rgba(0,0,0,.55)'); shade.addColorStop(.6, 'rgba(0,0,0,0)');
    ctx.fillStyle = shade; ctx.fillRect(sx - s * .2, sy - s, s * .4, s);
  }
  ctx.restore();
  // arm: broken stub, completed by projected light in the scan study
  ctx.fillStyle = '#6e675c'; ctx.beginPath(); ctx.ellipse(sx + s * .17, sy - s * .6, s * .04, s * .06, -.6, 0, TAU); ctx.fill();
  if (o.scan) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = rgba(pal[1], .6 * k); ctx.fillStyle = rgba(pal[1], .18 * k); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(sx + s * .28, sy - s * .48, s * .05, s * .16, -.7, 0, TAU); ctx.fill(); ctx.stroke();
    const lx = (sx - s * .4) + (s * .8) * ((t / LOOP * 2) % 1);
    ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(lx, sy - s, 2, s);
    glow(ctx, lx, sy - s * .5, s * .2, '#ffffff', .12);
    ctx.restore();
  } else {
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(ctx, sx, sy - s * .5, s * .5, pal[2], .12 * k); ctx.restore();
  }
  copySpace(ctx, w, h, .6);
};

M.ghost = (ctx, w, h, t, pal, o, st) => {
  const th = TAU * t / LOOP, k = ease(wave(th) * 1.6 - .3);
  base(ctx, w, h, '#020305', '#040507');
  // angled glass panel, faint edge only
  ctx.strokeStyle = 'rgba(236,230,218,.14)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(w * .28, h * .12); ctx.lineTo(w * .72, h * .12); ctx.lineTo(w * .8, h * .86); ctx.lineTo(w * .2, h * .86); ctx.closePath(); ctx.stroke();
  ctx.fillStyle = '#08090c'; ctx.fillRect(w * .15, h * .86, w * .7, h * .14);
  if (!st.pts) {
    const r = rng(st.seed); st.pts = [];
    for (let i = 0; i < 900; i++) {
      let x, y;
      if (o.object) { const a = r() * TAU, rr = Math.sqrt(r()); x = .5 + Math.cos(a) * .12 * rr; y = .5 + Math.sin(a) * .2 * rr; }
      else { const part = r(); if (part < .12) { const a = r() * TAU, rr = Math.sqrt(r()); x = .5 + Math.cos(a) * .035 * rr; y = .26 + Math.sin(a) * .06 * rr; }
        else { const yy = r(); x = .5 + (r() - .5) * (.1 + yy * .12); y = .34 + yy * .5; } }
      st.pts.push({ x, y, sx: r(), sy: r(), s: .6 + r() * 1.2 });
    }
  }
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const rot = o.object ? Math.sin(th) : 0;
  for (const p of st.pts) {
    let tx = p.x, ty = p.y;
    if (o.object) tx = .5 + (p.x - .5) * Math.cos(rot * Math.PI);
    const x = (p.sx + (tx - p.sx) * k) * w, y = (p.sy + (ty - p.sy) * k) * h;
    const edge = o.object && Math.abs(p.x - .5) > .1;
    ctx.fillStyle = rgba(edge ? pal[1] : pal[0], .25 + .5 * k); ctx.fillRect(x, y, p.s, p.s);
  }
  glow(ctx, w * .5, h * .5, w * .16, pal[0], .18 * k);
  ctx.restore();
  copySpace(ctx, w, h, .4);
};

M.theatre = (ctx, w, h, t, pal, o, st) => {
  const th = TAU * t / LOOP;
  base(ctx, w, h, '#020306', '#06080c');
  const wall = curvedWall(w, h, .08, .66, .06);
  ctx.save(); ctx.clip(wall);
  const sky = ctx.createLinearGradient(0, h * .08, 0, h * .66); sky.addColorStop(0, '#1b2a3d'); sky.addColorStop(.7, rgba(pal[0], .8)); sky.addColorStop(1, '#3a2a1c');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
  glow(ctx, w * .5, h * .58, w * .22, pal[2], .55);
  if (!st.city) { const r = rng(st.seed); st.city = Array.from({ length: 40 }, (_, i) => ({ x: i / 40, w: .015 + r() * .02, h: .04 + r() * .12, dome: r() > .8 })); }
  ctx.fillStyle = '#16131a';
  for (const b of st.city) { ctx.fillRect(b.x * w, h * (.6 - b.h), b.w * w, h * b.h + 10); if (b.dome) { ctx.beginPath(); ctx.ellipse((b.x + b.w / 2) * w, h * (.6 - b.h), b.w * w / 2, b.w * w / 2, 0, Math.PI, 0); ctx.fill(); } }
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 3; i++) { ctx.fillStyle = rgba(pal[1], .08); ctx.fillRect(((t / LOOP + i / 3) % 1) * w * 1.4 - w * .4, h * (.48 + i * .05), w * .5, h * .03); }
  ctx.fillStyle = 'rgba(20,20,26,.9)';
  for (let i = 0; i < 5; i++) { const bx = (((t / LOOP) + i * .17) % 1) * w, by = h * (.2 + .04 * Math.sin(th + i)); ctx.globalCompositeOperation = 'source-over'; ctx.fillRect(bx, by, 6, 1.5); ctx.fillRect(bx + 3, by - 2, 1.5, 2); }
  ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(ctx, w * .5, h * .78, w * .4, pal[0], .1); ctx.restore();
  for (let i = 0; i < 9; i++) person(ctx, w * (.3 + i * .05 + (i % 2) * .01), h * (.98 - (i % 3) * .015), h * (.24 + (i % 3) * .02));
  copySpace(ctx, w, h, .45);
};

M.table = (ctx, w, h, t, pal, o, st) => {
  const th = TAU * t / LOOP, k = wave(th);
  base(ctx, w, h, '#06080b', '#06080b');
  ctx.fillStyle = '#0b0f14'; ctx.fillRect(w * .08, h * .1, w * .84, h * .8);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(ctx, w * .5, h * .5, w * .45, pal[0], .08); ctx.restore();
  if (!st.cards) { const r = rng(st.seed); st.cards = Array.from({ length: 9 }, () => ({ x: .15 + r() * .6, y: .18 + r() * .55, dx: (r() - .5) * .25, dy: (r() - .5) * .2, w: .08 + r() * .07, a: (r() - .5) * .4 })); }
  st.cards.forEach((c, i) => {
    const big = i === 3 ? 1 + 1.2 * k : 1;
    const x = (c.x + c.dx * k) * w, y = (c.y + c.dy * k) * h, cw = c.w * w * big, ch = cw * .65;
    ctx.save(); ctx.translate(x, y); ctx.rotate(c.a * (1 - k));
    ctx.fillStyle = rgba(i % 2 ? pal[0] : '#e8e2d6', .16 + .1 * (i === 3 ? k : 0)); ctx.fillRect(-cw / 2, -ch / 2, cw, ch);
    ctx.strokeStyle = rgba(pal[0], .45); ctx.strokeRect(-cw / 2, -ch / 2, cw, ch);
    ctx.fillStyle = 'rgba(236,230,218,.18)'; for (let l = 0; l < 3; l++) ctx.fillRect(-cw * .4, -ch * .25 + l * ch * .18, cw * (.5 + .2 * ((l + i) % 2)), 2);
    ctx.restore();
  });
  ctx.fillStyle = 'rgba(40,30,26,.95)';
  for (const [x, y, a] of [[.12, .95, -.5], [.3, 1.02, -.2], [.82, .02, 2.6], [.65, -.02, 2.9]]) { ctx.beginPath(); ctx.ellipse(x * w, y * h, w * .05, h * .1, a, 0, TAU); ctx.fill(); }
  copySpace(ctx, w, h, .3);
};

M.field = (ctx, w, h, t, pal, o, st) => {
  const u = t / LOOP;
  base(ctx, w, h, '#030507', '#050709');
  if (!st.pts) { const r = rng(st.seed); st.pts = Array.from({ length: 1400 }, () => ({ x: r(), y: .08 + r() * .9, s: .5 + r() * 1.5, c: r() })); }
  const vis = u > .08 && u < .92; const vx = (.3 + (u - .08) / .84 * .8) * w, vy = h * .62;
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const p of st.pts) {
    let x = p.x * w, y = p.y * h;
    // perspective floor: denser toward the horizon
    if (p.y > .55) { const d = (p.y - .55) / .45; y = h * (.55 + d * d * .45); }
    if (vis) { const dx = x - vx, dy = (y - vy) * 1.6, d = Math.hypot(dx, dy); const r0 = h * .28; if (d < r0) { const f = (1 - d / r0) ** 2 * r0 * .6; x += dx / (d || 1) * f; y += dy / (d || 1) * f * .6; } }
    ctx.fillStyle = rgba(p.c > .82 ? pal[1] : pal[0], .25 + .35 * Math.sin(TAU * u + p.x * 9) ** 2);
    ctx.fillRect(x, y, p.s, p.s);
  }
  if (vis && o.shards) {
    for (let i = 0; i < 12; i++) { const a = i / 12 * TAU + u * 6; ctx.strokeStyle = rgba(pal[0], .4); ctx.beginPath(); ctx.moveTo(vx + Math.cos(a) * h * .12, vy - h * .2 + Math.sin(a) * h * .18); ctx.lineTo(vx + Math.cos(a + .2) * h * .2, vy - h * .2 + Math.sin(a + .2) * h * .26); ctx.lineTo(vx + Math.cos(a - .1) * h * .17, vy - h * .2 + Math.sin(a - .1) * h * .22); ctx.closePath(); ctx.stroke(); }
  }
  ctx.restore();
  if (vis) person(ctx, vx, h * .97, h * .55);
  copySpace(ctx, w, h, .55);
};

M.cells = (ctx, w, h, t, pal, o, st) => {
  const th = TAU * t / LOOP;
  base(ctx, w, h, '#05040a', '#070610');
  if (!st.c) { const r = rng(st.seed); st.c = Array.from({ length: 14 }, () => ({ x: .1 + r() * .8, y: .1 + r() * .55, r: .05 + r() * .09, p: Math.floor(r() * 4) })); }
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const c of st.c) { const k = .6 + .4 * Math.sin(th * 2 + c.p * Math.PI / 2); glow(ctx, c.x * w, c.y * h, c.r * w * (.8 + .5 * k), c.p % 2 ? pal[1] : pal[0], .22 * k); ctx.strokeStyle = rgba(c.p % 2 ? pal[1] : pal[0], .3 * k); ctx.beginPath(); ctx.ellipse(c.x * w, c.y * h, c.r * w * .55 * (.9 + .2 * k), c.r * w * .5, 0, 0, TAU); ctx.stroke(); }
  ctx.restore();
  ctx.fillStyle = '#0a0a10'; ctx.fillRect(0, h * .78, w, h);
  for (let i = 0; i < 12; i++) person(ctx, w * (.25 + i * .06), h * (.97 - (i % 2) * .01), h * .16);
  copySpace(ctx, w, h, .45);
};

M.pulse = (ctx, w, h, t, pal) => {
  const beat = (t % 1); const env = Math.exp(-beat * 5) * (1 - Math.exp(-beat * 40));
  base(ctx, w, h, '#060304', '#080506');
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const cx = w * .55;
  for (let i = 0; i < 26; i++) {
    const x = w * (.12 + i * .032), dist = Math.abs(x - cx) / w;
    const k = Math.max(0, env - dist * 1.6 * (1 - beat));
    for (let j = 0; j < 10; j++) { const y = h * (.06 + j * .055 + .02 * Math.sin(i)); ctx.fillStyle = rgba(mix(pal[0], pal[1], k), .15 + .75 * k); ctx.beginPath(); ctx.arc(x, y, 1.5 + 2 * k, 0, TAU); ctx.fill(); }
    ctx.strokeStyle = 'rgba(236,230,218,.05)'; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h * .62); ctx.stroke();
  }
  glow(ctx, cx, h * .78, w * .12, pal[2], .2 + .3 * env);
  ctx.restore();
  ctx.fillStyle = '#121014'; ctx.fillRect(cx - w * .04, h * .8, w * .08, h * .2);
  ctx.fillStyle = 'rgba(255,200,170,.3)'; ctx.fillRect(cx - w * .04, h * .8, w * .08, 2);
  ctx.fillStyle = '#1c1416'; ctx.beginPath(); ctx.ellipse(cx, h * .79, w * .035, h * .025, 0, 0, TAU); ctx.fill();
  copySpace(ctx, w, h, .45);
};

M.spheres = (ctx, w, h, t, pal) => {
  const th = TAU * t / LOOP;
  base(ctx, w, h, '#05060a', '#08090d');
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let row = 0; row < 6; row++) {
    const depth = row / 5, sc = 1 - depth * .55, y0 = h * (.12 + depth * .08);
    for (let i = 0; i < 16; i++) {
      const x = w * .5 + (i - 7.5) * w * .06 * sc;
      const ph = th * 2 - i * .4 - row * .3; const yy = y0 + h * (.32 + .12 * Math.sin(ph)) * sc;
      const crest = .5 + .5 * Math.sin(ph);
      ctx.strokeStyle = 'rgba(236,230,218,.08)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, yy); ctx.stroke();
      const col = mix(pal[0], pal[1], crest);
      glow(ctx, x, yy, 16 * sc, col, .35); ctx.fillStyle = rgba(col, .9); ctx.beginPath(); ctx.arc(x, yy, 4 * sc + 1, 0, TAU); ctx.fill();
    }
  }
  ctx.restore();
  copySpace(ctx, w, h, .4);
};

M.corner = (ctx, w, h, t, pal) => {
  const th = TAU * t / LOOP, k = wave(th);
  base(ctx, w, h, '#04050a', '#07080c');
  const cx = w * .5, top = h * .14, bot = h * .78;
  const L = [[w * .2, top + h * .06], [cx, top], [cx, bot], [w * .2, bot - h * .04]];
  const R = [[cx, top], [w * .8, top + h * .06], [w * .8, bot - h * .04], [cx, bot]];
  ctx.fillStyle = '#121216'; ctx.fillRect(w * .1, 0, w * .8, h);
  for (const q of [L, R]) { ctx.beginPath(); q.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.fillStyle = '#05070b'; ctx.fill(); ctx.strokeStyle = 'rgba(236,230,218,.15)'; ctx.stroke(); }
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const r = h * (.12 + .3 * k);
  for (let i = 0; i < 18; i++) {
    const a = i / 18 * TAU + th; const rr = r * (1 + .25 * Math.sin(a * 3 + th * 2));
    glow(ctx, cx + Math.cos(a) * rr * .6, h * .46 + Math.sin(a) * rr * .5 - k * h * .05, h * (.08 + .06 * k), i % 2 ? pal[0] : pal[1], .22);
  }
  ctx.restore();
  ctx.fillStyle = '#08080a'; ctx.fillRect(0, h * .86, w, h);
  copySpace(ctx, w, h, .4);
};

M.facade = (ctx, w, h, t, pal) => {
  const th = TAU * t / LOOP, k = wave(th);
  base(ctx, w, h, '#03050a', '#06070a');
  const fx = w * .14, fw = w * .72, fy = h * .14, fh = h * .7;
  ctx.fillStyle = '#2a261f'; ctx.fillRect(fx, fy, fw, fh);
  ctx.fillStyle = '#332e26'; ctx.beginPath(); ctx.moveTo(fx - w * .02, fy); ctx.lineTo(fx + fw / 2, fy - h * .09); ctx.lineTo(fx + fw + w * .02, fy); ctx.fill();
  const cols = 8;
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < cols; i++) {
    const x = fx + fw * (i + .5) / cols; const open = Math.max(0, Math.sin(th - i * .35)) * k;
    ctx.fillStyle = rgba(pal[i % 2], .18 + .45 * open); ctx.fillRect(x - fw * .025, fy + fh * .18, fw * .05, fh * .3);
    ctx.fillRect(x - fw * .025, fy + fh * .58, fw * .05, fh * .28);
    ctx.strokeStyle = rgba(pal[1], .2 + .5 * open); ctx.strokeRect(x - fw / cols / 2 + 4, fy + 6, fw / cols - 8, fh - 12);
  }
  ctx.strokeStyle = rgba(pal[0], .4 + .4 * k); ctx.lineWidth = 2; ctx.strokeRect(fx, fy, fw, fh * (.08 + .92 * k));
  ctx.restore();
  ctx.fillStyle = '#0a0b0e'; ctx.fillRect(0, fy + fh, w, h);
  copySpace(ctx, w, h, .4);
};

M.orbits = (ctx, w, h, t, pal) => {
  const th = TAU * t / LOOP;
  base(ctx, w, h, '#03040b', '#05060e');
  const cx = w * .5, cy = h * .6, rx = w * .34, ry = h * .2;
  ctx.strokeStyle = 'rgba(236,230,218,.1)'; ctx.beginPath(); ctx.ellipse(cx, cy + h * .1, rx * 1.15, ry * 1.15, 0, 0, TAU); ctx.stroke();
  for (let i = 0; i < 14; i++) { const a = i / 14 * TAU; ctx.fillStyle = '#14161e'; ctx.fillRect(cx + Math.cos(a) * rx * 1.15 - 5, cy + Math.sin(a) * ry * 1.15 - 18, 10, 20); }
  for (let i = 0; i < 4; i++) person(ctx, cx + (i - 1.5) * w * .05, cy + h * .14, h * .22);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  const orbs = [[1, 0, 1], [1, 2.1, .85], [2, 4.2, .7]];
  for (const [sp, off, rs] of orbs) { const a = th * sp + off; const x = cx + Math.cos(a) * rx * rs, y = cy - h * .06 + Math.sin(a) * ry * rs; glow(ctx, x, y, h * .09, pal[0], .45); glow(ctx, x, y, h * .02, pal[2], .9); }
  ctx.restore();
  copySpace(ctx, w, h, .45);
};

M.floor = (ctx, w, h, t, pal) => {
  const u = t / LOOP, th = TAU * u;
  base(ctx, w, h, '#03080a', '#040a0c');
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 26; i++) {
    ctx.strokeStyle = rgba(pal[0], .08); ctx.lineWidth = 2; ctx.beginPath();
    for (let x = 0; x <= w; x += w / 50) { const y = h * (i / 26) + Math.sin(x / w * 12 + th + i) * h * .012 + Math.sin(x / w * 5 - th * 2 + i * .7) * h * .01; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke();
  }
  const vis = u > .1 && u < .9; const p = (u - .1) / .8;
  if (vis) {
    for (let s = 0; s < 5; s++) { const sp = p - s * .07; if (sp < 0) continue; const x = w * (.2 + sp * .7), y = h * (.55 + .1 * (s % 2)), age = s * .07; ctx.strokeStyle = rgba(pal[1], .5 * (1 - age * 3)); for (let r = 1; r < 4; r++) { ctx.beginPath(); ctx.ellipse(x, y, h * .04 * r * (1 + age * 4), h * .02 * r * (1 + age * 4), 0, 0, TAU); ctx.stroke(); } }
  }
  ctx.restore();
  if (vis) { const x = w * (.2 + p * .7); ctx.fillStyle = '#020405'; ctx.fillRect(x - h * .05, h * .1, h * .035, h * .45 + Math.sin(th * 4) * h * .02); ctx.fillRect(x + h * .02, h * .12, h * .035, h * .43 - Math.sin(th * 4) * h * .02); }
  copySpace(ctx, w, h, .4);
};

M.greybox = (ctx, w, h, t, pal) => {
  const th = TAU * t / LOOP; const dx = Math.sin(th) * w * .03;
  base(ctx, w, h, '#2c2f34', '#3a3d42');
  const vx = w * .5 + dx, vy = h * .42, bw = w * .56, bh = h * .4;
  ctx.fillStyle = '#4a4e55'; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(vx - bw / 2, vy + bh / 2); ctx.lineTo(vx + bw / 2, vy + bh / 2); ctx.lineTo(w, h); ctx.fill();
  ctx.fillStyle = '#34373c'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(vx - bw / 2, vy - bh / 2); ctx.lineTo(vx - bw / 2, vy + bh / 2); ctx.lineTo(0, h); ctx.fill();
  ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(vx + bw / 2, vy - bh / 2); ctx.lineTo(vx + bw / 2, vy + bh / 2); ctx.lineTo(w, h); ctx.fill();
  ctx.fillStyle = '#3f4248'; ctx.fillRect(vx - bw / 2, vy - bh / 2, bw, bh);
  ctx.strokeStyle = 'rgba(255,255,255,.12)'; for (let i = 1; i < 8; i++) { ctx.beginPath(); ctx.moveTo(vx - bw / 2 + bw * i / 8, vy + bh / 2); ctx.lineTo(w * i / 8 + dx * 1.5 - w * .0, h); ctx.stroke(); }
  // curved LED wall and two projection surfaces with bright abstracts
  const g = ctx.createLinearGradient(vx - bw * .4, 0, vx + bw * .4, 0); g.addColorStop(0, pal[2]); g.addColorStop(.5 + .3 * Math.sin(th), pal[1]); g.addColorStop(1, '#ff6a8a');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(vx - bw * .4, vy - bh * .32); ctx.quadraticCurveTo(vx, vy - bh * .22, vx + bw * .4, vy - bh * .32); ctx.lineTo(vx + bw * .4, vy + bh * .18); ctx.quadraticCurveTo(vx, vy + bh * .26, vx - bw * .4, vy + bh * .18); ctx.fill();
  ctx.fillStyle = rgba(pal[2], .8); ctx.beginPath(); ctx.moveTo(w * .06 + dx * .6, h * .3); ctx.lineTo(w * .2 + dx * .7, h * .36); ctx.lineTo(w * .2 + dx * .7, h * .56); ctx.lineTo(w * .06 + dx * .6, h * .58); ctx.fill();
  ctx.fillStyle = rgba(pal[1], .8); ctx.beginPath(); ctx.moveTo(w * .94 + dx * .6, h * .3); ctx.lineTo(w * .8 + dx * .7, h * .36); ctx.lineTo(w * .8 + dx * .7, h * .56); ctx.lineTo(w * .94 + dx * .6, h * .58); ctx.fill();
  for (const [x, y] of [[.26, .84], [.5, .89], [.74, .84]]) person(ctx, x * w + dx * 1.2, y * h, h * .14, '#8d9198');
};

M.split = (ctx, w, h, t, pal) => {
  const th = TAU * t / LOOP, k = wave(th);
  base(ctx, w, h, '#202227', '#2a2c31');
  const wx = w * .1, wy = h * .14, ww = w * .8, wh = h * .56;
  ctx.fillStyle = '#5a5e66'; ctx.fillRect(wx, wy, ww / 2, wh);
  ctx.strokeStyle = 'rgba(255,255,255,.25)'; for (let i = 0; i <= 8; i++) { ctx.beginPath(); ctx.moveTo(wx + ww / 2 * i / 8, wy); ctx.lineTo(wx + ww / 2 * i / 8, wy + wh); ctx.stroke(); } for (let j = 0; j <= 5; j++) { ctx.beginPath(); ctx.moveTo(wx, wy + wh * j / 5); ctx.lineTo(wx + ww / 2, wy + wh * j / 5); ctx.stroke(); }
  const g = ctx.createLinearGradient(wx + ww / 2, wy, wx + ww, wy + wh); g.addColorStop(0, mix(pal[2], pal[1], k)); g.addColorStop(1, '#ff6a8a');
  ctx.fillStyle = g; ctx.fillRect(wx + ww / 2, wy, ww / 2, wh);
  ctx.fillStyle = `rgba(255,255,255,${.06 + .1 * k})`; ctx.fillRect(wx, wy, ww, wh);
  ctx.fillStyle = '#f2b35b'; ctx.fillRect(wx + ww / 2 - 1, wy - 10, 2, wh + 20);
  ctx.fillStyle = '#16171a'; ctx.fillRect(0, h * .76, w, h);
};

M.warp = (ctx, w, h, t, pal) => {
  const th = TAU * t / LOOP, k = ease(wave(th) * 1.5 - .25); const mis = 1 - k;
  base(ctx, w, h, '#050608', '#08090b');
  const wall = new Path2D(); wall.moveTo(w * .08, h * .14); wall.quadraticCurveTo(w * .5, h * .26, w * .92, h * .1); wall.lineTo(w * .92, h * .84); wall.quadraticCurveTo(w * .5, h * .72, w * .08, h * .8); wall.closePath();
  ctx.fillStyle = '#d9d7d2'; ctx.fill(wall); ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fill(wall);
  ctx.save(); ctx.clip(wall); ctx.globalCompositeOperation = 'lighter';
  const fieldA = k * k; const g = ctx.createLinearGradient(w * .08, 0, w * .92, 0); g.addColorStop(0, rgba(pal[1], .7 * fieldA)); g.addColorStop(1, rgba(pal[0], .7 * fieldA)); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  ctx.lineWidth = 1.5;
  for (let pass = 0; pass < (mis > .05 ? 2 : 1); pass++) {
    const off = pass * mis * w * .02;
    ctx.strokeStyle = rgba(pass ? pal[1] : '#ffffff', .55 * (1 - fieldA * .6));
    for (let i = 0; i <= 12; i++) { const u = i / 12; ctx.beginPath(); for (let j = 0; j <= 20; j++) { const v = j / 20; const x = w * (.08 + .84 * u) + off + Math.sin(v * Math.PI) * mis * w * .03 * (u - .5); const y = h * (.14 + .66 * v) + Math.sin(u * Math.PI) * h * .08 * (1 - v * .3); j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
    for (let j = 0; j <= 8; j++) { const v = j / 8; ctx.beginPath(); for (let i = 0; i <= 24; i++) { const u = i / 24; const x = w * (.08 + .84 * u) + off; const y = h * (.14 + .66 * v) + Math.sin(u * Math.PI) * h * (.08 + mis * .05) * (1 - v * .3) + mis * Math.sin(u * 7) * h * .01; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
  }
  ctx.restore();
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const beam = ctx.createLinearGradient(w * .5, 0, w * .4, h * .5); beam.addColorStop(0, 'rgba(255,255,255,.08)'); beam.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = beam; ctx.beginPath(); ctx.moveTo(w * .48, 0); ctx.lineTo(w * .52, 0); ctx.lineTo(w * .9, h * .5); ctx.lineTo(w * .1, h * .5); ctx.fill(); ctx.restore();
};

M.arches = (ctx, w, h, t, pal, o, st) => {
  const u = t / LOOP, th = TAU * u;
  const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#0d1230'); sky.addColorStop(.55, '#3a2440'); sky.addColorStop(.62, '#1a1420'); sky.addColorStop(1, '#0b0a10');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  glow(ctx, w * .8, h * .5, w * .2, pal[2], .25);
  ctx.fillStyle = rgba(pal[2], .25); ctx.fillRect(w * .7, h * .36, w * .2, h * .2);
  const shift = Math.sin(th) * w * .02;
  for (let i = 0; i < 7; i++) {
    const d = i / 6, sc = 1 - d * .7; const x = w * (.18 + d * .55) + shift * sc; const y = h * (.92 - d * .32);
    ctx.strokeStyle = rgba(pal[i % 3], .7); ctx.lineWidth = 3 * sc + 1;
    ctx.beginPath(); ctx.ellipse(x, y, w * .14 * sc, h * .42 * sc, 0, Math.PI, 0); ctx.stroke();
    glow(ctx, x, y - h * .2 * sc, w * .1 * sc, pal[i % 3], .12);
    ctx.strokeStyle = rgba(pal[(i + 1) % 3], .3); ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(x, y, w * .12 * sc, h * .025 * sc, 0, 0, TAU); ctx.stroke();
  }
  ctx.restore();
  if (!st.crowd) { const r = rng(st.seed); st.crowd = Array.from({ length: 70 }, () => ({ x: r(), y: .7 + r() * .28, s: r(), v: .3 + r() * .7 })); }
  for (const c of st.crowd) { const x = ((c.x + Math.sin(th + c.s * 6) * .01 * c.v) % 1) * w; person(ctx, x, c.y * h, h * (.05 + c.y * .1), '#050508'); }
  copySpace(ctx, w, h, .35);
};

// greyscale line drawings for the visitor-walk structure diagram in chapter 08
export function drawBoardFrame(cv, i) {
  const ctx = cv.getContext('2d'); const w = cv.width, h = cv.height;
  ctx.fillStyle = '#12151a'; ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#8a8a8a'; ctx.fillStyle = '#8a8a8a'; ctx.lineWidth = 1.5;
  const fig = (x, y, s) => { ctx.beginPath(); ctx.arc(x, y - s * .85, s * .1, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y - s * .75); ctx.lineTo(x, y - s * .35); ctx.lineTo(x - s * .12, y); ctx.moveTo(x, y - s * .35); ctx.lineTo(x + s * .12, y); ctx.stroke(); };
  const arrow = (x1, y1, x2, y2) => { ctx.strokeStyle = '#f2b35b'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const a = Math.atan2(y2 - y1, x2 - x1); ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 7 * Math.cos(a - .5), y2 - 7 * Math.sin(a - .5)); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 7 * Math.cos(a + .5), y2 - 7 * Math.sin(a + .5)); ctx.stroke(); ctx.strokeStyle = '#8a8a8a'; };
  ctx.beginPath(); ctx.moveTo(0, h * .78); ctx.lineTo(w, h * .78); ctx.stroke();
  if (i === 0) { ctx.strokeRect(w * .1, h * .2, w * .18, h * .58); fig(w * .45, h * .78, h * .5); arrow(w * .55, h * .5, w * .8, h * .5); }
  if (i === 1) { ctx.beginPath(); ctx.ellipse(w * .5, h * .78, w * .2, h * .6, 0, Math.PI, 0); ctx.stroke(); fig(w * .5, h * .78, h * .45); arrow(w * .3, h * .9, w * .48, h * .9); }
  if (i === 2) { ctx.strokeRect(w * .15, h * .12, w * .7, h * .5); for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.moveTo(w * .5, h * .37); ctx.lineTo(w * (.18 + k * .11), h * .14); ctx.stroke(); } fig(w * .5, h * .95, h * .3); }
  if (i === 3) { ctx.strokeRect(w * .5, h * .2, w * .3, h * .45); fig(w * .3, h * .78, h * .55); ctx.beginPath(); ctx.moveTo(w * .3, h * .5); ctx.lineTo(w * .48, h * .42); ctx.stroke(); ctx.beginPath(); ctx.arc(w * .55, h * .42, 6, 0, TAU); ctx.stroke(); }
  if (i === 4) { for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; ctx.beginPath(); ctx.moveTo(w * .5 + Math.cos(a) * 10, h * .38 + Math.sin(a) * 10); ctx.lineTo(w * .5 + Math.cos(a) * h * .3, h * .38 + Math.sin(a) * h * .3); ctx.stroke(); } fig(w * .25, h * .78, h * .3); fig(w * .75, h * .78, h * .3); }
  if (i === 5) { ctx.strokeRect(w * .72, h * .2, w * .18, h * .58); fig(w * .55, h * .78, h * .5); arrow(w * .6, h * .5, w * .7, h * .5); }
}

// ---------------------------------------------------------------- the plate object
export class Plate {
  constructor(host, slotId, slot) {
    this.host = host; this.slot = slot; this.id = slotId;
    this.cv = document.createElement('canvas');
    host.appendChild(this.cv);
    this.ctx = this.cv.getContext('2d', { alpha: false });
    this.state = { seed: hash(slotId) };
    this.cap = host.closest('.film-bleed, .film-band') ? 1600 : 1000;
    this.resize();
  }
  resize() {
    const r = this.host.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const scale = Math.min(dpr, this.cap / r.width);
    const W = Math.max(2, Math.round(r.width * scale)), H = Math.max(2, Math.round(r.height * scale));
    if (W !== this.cv.width || H !== this.cv.height) { this.cv.width = W; this.cv.height = H; this.state.pts = null; this.state.c = null; this.state.cards = null; this.state.city = null; this.state.crowd = null; }
    return true;
  }
  draw(t) {
    const fn = M[this.slot.motif] || M.wall;
    const { width: w, height: h } = this.cv;
    this.ctx.save(); this.ctx.globalCompositeOperation = 'source-over'; this.ctx.globalAlpha = 1;
    fn(this.ctx, w, h, t % LOOP, this.slot.pal, this.slot, this.state);
    this.ctx.restore();
  }
}
