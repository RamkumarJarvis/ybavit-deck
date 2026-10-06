#!/usr/bin/env node
// Builds ybavit/index.html (the deck) and ybavit/spec.html (the build spec and film briefs) from js/content.js,
// then writes publish copies to ybavit/.artifact/ with the document skeleton removed from the deck page.
// It also refuses to build when an AI film slot has no brief or a client-facing string carries a proof placeholder.
//   node ybavit/tools/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as C from '../js/content.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { SERVICES, svc, svcId, SLOTS, TRIMS, VENUES, CRAFTS, MATRIX, CHAPTERS, PRESETS, TILES, DISCIPLINES } = C;

// ---------------------------------------------------------------- checks the honesty rules depend on
const problems = [];
for (const [id, s] of Object.entries(SLOTS)) {
  if (s.origin === 'ai' && !(s.brief && s.brief.length > 40)) problems.push(`${id}: AI slot without a brief`);
  if (!['ai', 'ybavit', 'code'].includes(s.origin)) problems.push(`${id}: unknown origin`);
}
for (const [t, src] of Object.entries(TRIMS)) if (!SLOTS[src]) problems.push(`${t}: trim of a missing slot ${src}`);
if (SERVICES.length !== 35) problems.push(`expected 35 services, found ${SERVICES.length}`);
const beatCount = CHAPTERS.reduce((n, c) => n + c.beats.length, 0);
if (beatCount !== 48) problems.push(`expected 48 presenter beats, found ${beatCount}`);
if (problems.length) { console.error('Build refused:\n  ' + problems.join('\n  ')); process.exit(1); }

// ---------------------------------------------------------------- helpers
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// [placeholders] become Draft-only spans, so the Client view never shows them
const txt = (s) => esc(s).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>');
const two = (n) => String(n).padStart(2, '0');
const ext = (url, label) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`;
const tags = (list) => list.length ? `<ul class="tags" aria-label="Tools and techniques">${list.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : '';
const firstSentence = (s) => (s.match(/^[^.]*\./) || [s])[0];
// the page shows no service codes or chapter numbers: codes stay in the content file as internal references
const uncode = (s) => s.replace(/^[\d.+ ]+(·\s*)?/, '').trim() || s;
const PHASE_CHIP = { '10.1': 'Story', '10.2': 'Pre-vis', '04': 'Holographic', '05': 'CGI & VFX', '07': 'Visual content', '08': 'Spatial audio', '09': 'XR', '06': 'Show control', '06.3': 'CMS' };

function film(id, o = {}) {
  const src = TRIMS[id] || id;
  const s = SLOTS[src];
  if (!s) throw new Error('no slot ' + id);
  const m = o.m ? ` data-slot-m="${o.m}"` : '';
  const style = o.objPos ? ` style="--obj:${o.objPos}"` : '';
  const kind = s.origin === 'ybavit' ? 'Made by YBAVIT, not generated' : s.origin === 'code' ? 'Built in code' : 'AI film slot';
  return `<figure class="film${o.cls ? ' ' + o.cls : ''}" data-slot="${id}"${m}${style}>
  <div class="film-media" aria-hidden="true"></div>
  <figcaption class="sr-only">${esc(firstSentence(s.brief))}</figcaption>
  <span class="badge mono"><span class="draft-only">${esc(C.STUDY_LABEL)}</span><span class="client-only">Illustrative study · drawn in code</span></span>
  <span class="slot-tag mono draft-only">${id}${TRIMS[id] ? ' · trim of ' + src + (id.startsWith('V01') ? ' · 4:5' : ' · 640×360') : ' · ' + esc(s.ratio.split(' · ')[0]) + ' · ' + kind}</span>
</figure>`;
}
const chapNo = () => ''; // no chapter numbers on the page
const proofSlot = (what) => `<div class="proof-slot draft-only" role="note"><span class="mono">[PROOF SLOT: ${esc(what)}; hidden for clients while empty]</span></div>`;
const context = (c, label = 'Context · not YBAVIT projects') => `<p class="context"><span class="mono">${label}:</span> ${esc(c.text)} <span class="src mono">(${ext(c.url, c.src)})</span></p>`;

// ---------------------------------------------------------------- chapters
const H = {};

H.cover = () => `
<section class="ch t1 cover" id="cover" data-n="0" aria-labelledby="h-cover">
  ${film('V00-HERO', { m: 'V00-HERO-M', cls: 'film-bleed', eager: true })}
  <div class="scrim scrim-t1" aria-hidden="true"></div>
  ${chapNo(0)}
  <div class="opener-text frame">
    <div class="ot">
      <p class="eyebrow mono plate">YBAVIT · Immersive content services · 2026</p>
      <h1 id="h-cover" class="hero">We make spaces that perform.</h1>
      <p class="lead">Content, software and show control for experience centres, museums and public installations, in India, the Gulf and wherever the venue is.</p>
      <p class="draft-only mono prepared">Prepared for <span class="ph">[Client name]</span> · <span class="ph">[Month 2026]</span></p>
      <p class="cue mono"><span class="read-cue">Scroll to walk through</span><span class="present-cue">Press → to begin</span></p>
    </div>
  </div>
</section>`;

H.promise = () => `
<section class="ch t3 promise" id="promise" data-n="1" aria-labelledby="h-promise">
  <div class="frame">
    <div class="ch-head">
      <p class="eyebrow mono">What we do</p>
      <h2 id="h-promise" class="display">Ten disciplines, one team, from first storyboard to show day.</h2>
      <p class="body measure">We write the story, build the content and wire the room. That covers 3D and holographic content, projection mapping, interactive software, spatial audio and the show control that makes it run at the press of one button.</p>
    </div>
    <ol class="trip" role="list">
      ${[['V01-A', 'WHERE', 'Experience Centres.', 'Briefing rooms that sell the vision.', 'cxc', '04'],
         ['V01-B', 'WHERE', 'Museums & Heritage.', 'Collections that come back to life.', 'museums', '05'],
         ['V01-C', 'WHERE', 'Art & Installations.', 'Public spaces that react to people.', 'installations', '06']].map(([slot, label, title, line, to, n], i) => `
      <li class="trip-card" style="--i:${i}">
        <div class="card45">
          ${film(slot, { cls: 'film-card' })}
          <div class="scrim scrim-card" aria-hidden="true"></div>
          <div class="card-text"><p class="mono label">${label}</p><h3 class="h3">${title}</h3><p class="body">${line}</p></div>
        </div>
        <a class="jump mono" href="#${to}">See ${title.replace('.', '')}</a>
      </li>`).join('')}
    </ol>
  </div>
</section>`;

H['why-now'] = () => {
  const def = PRESETS[0].tiles;
  return `
<section class="ch why" id="why-now" data-n="2" aria-labelledby="h-why">
  <div class="band-wrap">
    ${film('V02-BAND', { cls: 'film-band' })}
    <div class="scrim scrim-t1" aria-hidden="true"></div>
    ${chapNo(2)}
    <div class="band-text frame"><div class="ot">
      <p class="eyebrow mono plate">Why now</p>
      <h2 id="h-why" class="display">India and the Gulf are building places to be experienced.</h2>
    </div></div>
  </div>
  <div class="frame why-body">
    <p class="mono caption-ai"><span class="draft-only">Band: ${esc(C.STUDY_LABEL)}</span><span class="client-only">Band: illustrative study · not a real venue</span></p>
    <ul class="tiles" role="list" aria-label="Market signals">
      ${Object.entries(TILES).map(([k, t]) => `
      <li class="tile" data-tile="${k}"${def.includes(k) ? '' : ' hidden'}>
        <p class="fig display">${esc(t.fig)}</p>
        <p class="body">${esc(t.label)}</p>
        <p class="src mono">${t.notOurs ? '<span class="not-ours">Not YBAVIT projects</span> · ' : ''}${ext(t.url, t.src)}</p>
      </li>`).join('')}
    </ul>
    <div class="beliefs">
      <p class="eyebrow mono">What we believe</p>
      <ol class="belief-row" role="list">
        <li><h3 class="h3">Story before screens.</h3><p class="body">Hardware changes every few years. A strong narrative and well-built content outlive it.</p></li>
        <li><h3 class="h3">See it before you build it.</h3><p class="body">Every space we make is pre-visualised in a digital twin first, so decisions are made on screen, not on site.</p></li>
        <li><h3 class="h3">Built to be run, not just opened.</h3><p class="body">Show control, a simple CMS and a content-refresh plan keep a space alive long after launch day.</p></li>
      </ol>
    </div>
  </div>
</section>`;
};

H.offer = () => {
  const tile = (d) => `
      <li class="otile" data-disc="${d.code}" data-band="${d.band}">
        <a href="#${d.to}" class="otile-link">
          <span class="otile-media" aria-hidden="true">${film(C.PREVIEW_OF[d.code], { cls: 'film-preview' })}</span>
          <span class="otile-top mono"><span>${SERVICES.filter(s => s.code.startsWith(d.code + '.')).length} services</span></span>
          <span class="otile-name h3">${esc(d.name)}</span>
          <span class="otile-line body">${esc(d.line)}</span>
        </a>
      </li>`;
  const by = (b) => DISCIPLINES.filter(d => d.band === b);
  return `
<section class="ch t4 offer" id="offer" data-n="3" aria-labelledby="h-offer">
  <div class="frame">
    <div class="ch-head">
      <p class="eyebrow mono">The offer</p>
      <h2 id="h-offer" class="display">Plan it. Make it. Run it.</h2>
      <p class="lead measure">Three venue types, five crafts and the two disciplines that bracket every project, with all 35 services on one map.</p>
    </div>
    <div class="omap">
      <div class="oband oband-plan"><p class="mono band-label">PLAN</p><ul role="list">${by('PLAN').map(tile).join('')}</ul></div>
      <div class="oband-mid">
        <div class="oband oband-where"><p class="mono band-label">WHERE</p><ul role="list">${by('WHERE').map(tile).join('')}</ul></div>
        <div class="oband oband-what"><p class="mono band-label">WHAT</p><ul role="list">${by('WHAT').map(tile).join('')}</ul></div>
      </div>
      <div class="oband oband-run"><p class="mono band-label">RUN</p><ul role="list">${by('RUN').map(tile).join('')}</ul></div>
    </div>
    <p class="mono foot">Tap any discipline to jump to it · Full index: use the ☰ Index button</p>
  </div>
</section>`;
};

function venue(nKey) {
  const v = VENUES[nKey];
  const ch = CHAPTERS.find(c => c.venue === nKey);
  const steps = v.steps.map((s, i) => {
    const sv = svc(s.code);
    return `
      <li class="step" id="s-${s.code.replace('.', '-')}" data-step="${i}">
        <div class="step-in">
          <h3 class="h3" id="${svcId(s.code)}">${esc(sv.name)}</h3>
          <p class="body${s.code === '01.3' ? ' line-013' : ''}">${esc(sv.line)}</p>
          ${s.code === '01.3' ? `<p class="body line-013r" hidden>${esc(sv.lineRealEstate)}</p>` : ''}
          ${tags(sv.tags)}
          <div class="step-fig">${film(s.slot)}</div>
        </div>
      </li>`;
  }).join('');
  const plates = v.steps.map((s, i) => `<div class="fig-layer" data-layer="${i}">${film(s.slot)}${s.slotRealEstate ? `<div class="re-swap" hidden>${film(s.slotRealEstate)}</div>` : ''}</div>`).join('');
  const mosaic = `<div class="fig-layer" data-layer="4"><ul class="mosaic" role="list">${v.steps.map(s => `<li>${film(s.slot, { cls: 'film-tile' })}</li>`).join('')}</ul></div>`;
  return `
<section class="ch venue" id="${v.anchor}" data-n="${ch.n}" data-venue="${nKey}" aria-labelledby="h-${v.anchor}">
  <div class="opener">
    ${film(v.opener, { m: v.openerM, cls: 'film-bleed', objPos: v.objPos })}
    <div class="scrim scrim-radial" aria-hidden="true"></div>
    ${chapNo(ch.n)}
    <div class="opener-text frame"><div class="ot">
      <p class="eyebrow mono plate">${esc(v.eyebrow)}</p>
      <h2 id="h-${v.anchor}" class="display">${esc(v.headline)}</h2>
      <p class="lead">${esc(v.subhead)}</p>
      <p class="cue mono read-cue">Scroll</p>
    </div></div>
  </div>
  <div class="t2 frame">
    <ol class="steps" role="list">${steps}
      <li class="step outcome" data-step="4">
        <div class="step-in">
          <p class="mono code">Outcome</p>
          <h3 class="h3">${esc(v.outcome.title)}</h3>
          <p class="body">${esc(v.outcome.body)}</p>
          <div class="step-fig">${mosaic.replace('fig-layer', 'fig-inline')}</div>
        </div>
      </li>
    </ol>
    <div class="figure" data-active="0" aria-hidden="true">
      <div class="figure-frame">${plates}${mosaic}</div>
    </div>
  </div>
  <div class="summary frame" aria-hidden="true">
    <div class="summary-in">
      <p class="eyebrow mono">${esc(DISCIPLINES.find(d => d.code === v.disc).full)}</p>
      <h3 class="display">${esc(v.summaryTitle)}</h3>
      <ul role="list">${v.steps.map(s => `<li><span class="h3">${esc(svc(s.code).name)}</span><span class="body">${esc(svc(s.code).short)}</span></li>`).join('')}</ul>
    </div>
  </div>
  <div class="frame ch-foot">
    <div class="ctx">${context(v.context)}${v.contextRealEstate ? `<div class="re-ctx" hidden>${context(v.contextRealEstate)}</div>` : ''}</div>
    ${proofSlot(v.proof)}
    <a class="next-link mono" href="#${v.cta.to}" data-default-to="${v.cta.to}" data-default-text="${esc(v.cta.text)}"${v.ctaRealEstate ? ` data-re-to="${v.ctaRealEstate.to}" data-re-text="${esc(v.ctaRealEstate.text)}"` : ''}>${esc(v.cta.text)} <span aria-hidden="true">→</span></a>
  </div>
</section>`;
}
H.cxc = () => venue(4); H.museums = () => venue(5); H.installations = () => venue(6);

H.crafts = () => {
  const cell = (codes) => codes.length ? codes.map(c => {
    const dag = c.endsWith('†'); const code = c.replace('†', '');
    return `<a class="mcode" href="#${svcId(code)}">${esc(svc(code).name)}${dag ? '<span class="dag draft-only" title="Judgement call: YBAVIT confirms or strikes">†</span>' : ''}</a>`;
  }).join(' ') : '<span aria-label="No typical service">—</span>';
  const table = `
    <div class="matrix-wrap" role="region" aria-label="Venue by craft matrix" tabindex="0">
    <table class="matrix">
      <caption class="sr-only">Which craft services each venue typically uses</caption>
      <thead><tr><th scope="col" class="mono corner">Venue ↓ · Craft →</th>${MATRIX.cols.map(c => {
        const list = SERVICES.filter(s => s.code.startsWith(c.code + '.'));
        return `<th scope="col"><a href="#${c.to}" class="mhead"><span class="mh-name">${esc(c.name)}</span><span class="mono mh-count">${list.length} services · Open craft ↓</span></a><span class="legend">${list.map(s => `<span>${esc(s.name)}</span>`).join('')}</span></th>`;
      }).join('')}</tr></thead>
      <tbody>${MATRIX.rows.map(r => `<tr data-row="${r.n}"><th scope="row"><a href="#${r.to}">${esc(r.name)}</a></th>${MATRIX.cols.map(c => `<td>${cell(r.cells[c.code] || [])}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
  const acc = `
    <div class="macc">
      <button type="button" class="btn-line mono" id="expandAll" aria-expanded="false">Expand all</button>
      ${MATRIX.cols.map(c => `
      <details class="macc-item"><summary><span class="h3">${esc(c.name)}</span> <span class="mono">${SERVICES.filter(s => s.code.startsWith(c.code + '.')).length}</span></summary>
        <ul role="list">${MATRIX.rows.map(r => `<li data-row="${r.n}"><a href="#${r.to}">${esc(r.name)}</a>: ${cell(r.cells[c.code] || [])}</li>`).join('')}</ul>
        <a class="jump mono" href="#${c.to}">Open craft ↓</a>
      </details>`).join('')}
    </div>`;
  const panels = CRAFTS.map(c => `
  <article class="craft" id="${c.id}" data-craft="${c.id}" aria-labelledby="h-${c.id}">
    <div class="craft-band">
      ${film(c.slot, { cls: 'film-band' })}
      <button type="button" class="pause-film mono" data-pause-film aria-pressed="false">Pause film</button>
    </div>
    <div class="frame craft-body">
      <div class="craft-intro">
        <p class="eyebrow mono">${esc(c.eyebrow)}</p>
        <h3 id="h-${c.id}" class="h2">${esc(c.headline)}</h3>
        <p class="lead">${esc(c.subhead)}${c.subheadSrc ? ` <span class="mono src">(${c.subheadSrc})</span>` : ''}</p>
        <p class="body">${esc(c.body)}</p>
        ${c.listen ? listenCard() : ''}
        ${context(c.context, 'Context · not a YBAVIT project')}
        <p class="mono used">Used in</p>
        <p class="chips">${c.usedIn.map(([to, name, codes]) => `<a class="chip venue-chip" href="#${to}">${esc(name)}</a>`).join('')}</p>
        ${(c.draft || []).map(d => `<p class="draft-note draft-only">${txt(d)}</p>`).join('')}
      </div>
      <ol class="services" role="list">${c.services.map(code => {
        const s = svc(code);
        return `<li class="svc" id="${svcId(code)}"><div class="svc-text"><h4 class="h3">${esc(s.name)}</h4><p class="body">${esc(s.line)}</p></div>${tags(s.tags)}</li>`;
      }).join('')}</ol>
      <p class="craft-nav mono"><a href="#crafts">Back to matrix ↑</a>${c.next ? ` · <a href="#previs">Next: see it before you build it →</a>` : ''}</p>
    </div>
  </article>`).join('');
  return `
<section class="ch crafts" id="crafts" data-n="7" aria-labelledby="h-crafts">
  <div class="frame">
    <div class="ch-head crafts-head">
      <div>
        <p class="eyebrow mono">What we make</p>
        <h2 id="h-crafts" class="display">The workshop behind every venue.</h2>
        <p class="lead measure">Five crafts, seventeen services. Find your venue’s row, or open a craft.</p>
      </div>
      <p class="mono vf-mirror" aria-live="polite">Viewing for: <span data-vf-label>Everyone</span></p>
    </div>
    <p class="pband mono"><a href="#previs">Experience Strategy & Pre-Visualization (Pre-vis): every project starts here <span aria-hidden="true">→</span></a></p>
    ${table}
    ${acc}
    <p class="pband mono"><a href="#show-control">Show Control & Media Integration: every project lands here <span aria-hidden="true">→</span></a></p>
  </div>
  ${panels}
</section>`;
};

function listenCard() {
  return `
        <div class="listen draft-only" role="group" aria-label="Spatial audio demo">
          <p class="mono">A07-08 · Real binaural recording by YBAVIT · not AI-generated</p>
          <p class="body">Best with headphones. Sounds will move around your head.</p>
          <p class="ph-card mono">[A07-08: the 30–45 s recording is not made yet. Until it exists this card is removed for clients; stock or AI audio never stands in. Transcript required, written by YBAVIT from the final mix.]</p>
        </div>`;
}

H.previs = () => {
  const P = C.PREVIS_STEPS;
  const fig = (s, i) => {
    let inner;
    if (s.slot === 'signoff') inner = `<div class="signoff"><p class="mono">Sign-off · before production starts</p><ul role="list">${C.SIGNOFFS.map((x, j) => `<li style="--j:${j}"><span class="tick" aria-hidden="true"></span>${x}</li>`).join('')}</ul></div>`;
    else if (s.slot === 'S08-1') inner = `<div class="board"><p class="mono board-cap">Visitor walk structure · diagram drawn in code</p><ol role="list">${['Arrival', 'Threshold', 'Reveal', 'Interaction', 'Finale', 'Exit'].map((x, j) => `<li style="--j:${j}"><span class="mono">F${j + 1}</span><canvas class="board-c" data-frame="${j}" width="160" height="90"></canvas><span class="mono">${x}</span></li>`).join('')}</ol></div><div class="proof-slot draft-only in-fig"><span class="mono">[S08-1: YBAVIT’s own storyboard frames replace this diagram]</span></div>`;
    else inner = film(s.slot, { cls: s.overlay ? 'film-hold' : '' }) + (s.overlay ? sightlines() : '');
    return `<div class="fig-layer" data-layer="${i}">${inner}</div>`;
  };
  return `
<section class="ch previs" id="previs" data-n="8" aria-labelledby="h-previs">
  <div class="frame">
    <div class="ch-head">
      <p class="eyebrow mono">Experience Strategy & Pre-Visualization (Pre-vis)</p>
      <h2 id="h-previs" class="display">See it before you build it.</h2>
      <p class="lead measure">Every film in this deck is a concept visualisation. For your venue we build the real thing: a digital twin you can walk through and sign off before anything is installed.</p>
      <p class="re-flag mono" hidden>Flagged for real-estate sales galleries: this is where an off-plan buyer sees the finished space.</p>
    </div>
  </div>
  <div class="t2 frame">
    <ol class="steps" role="list">${P.map((s, i) => `
      <li class="step" data-step="${i}"${s.svc ? ` id="${svcId(s.svc)}"` : ''}>
        <div class="step-in">
          <p class="mono code"><span class="chip">${esc(uncode(s.code))}</span></p>
          <h3 class="h3">${esc(s.title)}</h3>
          <p class="body">${esc(s.body)}</p>
          ${tags(s.tags || [])}
          ${i === 4 ? `<p><a class="next-link mono" href="#next">Start with a paid pre-vis sprint <span aria-hidden="true">→</span></a></p>` : ''}
          <div class="step-fig">${fig(s, i).replace('fig-layer', 'fig-inline')}</div>
        </div>
      </li>`).join('')}
    </ol>
    <div class="figure" data-active="0" aria-hidden="true">
      <div class="figure-frame">${P.map(fig).join('')}</div>
      <p class="figure-cap mono">${P.map((s, i) => `<span data-cap="${i}">${esc(s.caption)}</span>`).join('')}</p>
    </div>
  </div>
</section>`;
};

function sightlines() {
  // three viewers on the floor of a 16:9 frame (viewBox 1600×900), cones toward the wall, distance rings, eye-height line
  const viewers = [[420, 760], [800, 800], [1180, 760]];
  return `<svg class="sightlines" viewBox="0 0 1600 900" aria-hidden="true" focusable="false">
    <line class="eye" x1="0" y1="430" x2="1600" y2="430"/><text class="ann" x="24" y="420">EYE HEIGHT 1.6 m</text>
    ${viewers.map(([x, y], i) => `<g style="--k:${i}"><path class="cone" d="M${x} ${y} L${x - 260 + i * 60} 240 L${x + 200 + i * 40} 240 Z"/><ellipse class="ring" cx="${x}" cy="${y}" rx="70" ry="18"/><ellipse class="ring r2" cx="${x}" cy="${y}" rx="150" ry="38"/><circle class="viewer" cx="${x}" cy="${y}" r="9"/></g>`).join('')}
    <text class="ann" x="24" y="880">ILLUSTRATIVE ANNOTATION</text>
  </svg>`;
}

H['show-control'] = () => {
  const steps = [
    { code: '', title: 'One timeline for the whole room.', body: 'Screens, lights, sound and effects each run on separate equipment. We write the one timeline that tells all of them what to do, to the frame.' },
    ...['06.1', '06.2', '06.3', '06.4'].map(code => ({ code: svc(code).name, title: svc(code).title, body: svc(code).line, tags: svc(code).tags, id: svcId(code) })),
  ];
  return `
<section class="ch showc" id="show-control" data-n="9" aria-labelledby="h-showc">
  <div class="frame">
    <div class="ch-head">
      <p class="eyebrow mono">Show Control & Media Integration</p>
      <h2 id="h-showc" class="display">One button, every cue.</h2>
      <p class="lead measure">The operational core that bonds content, software, and physical AV hardware into a synchronized, single-button or automated experience. <span class="mono src">(PDF)</span></p>
    </div>
  </div>
  <div class="t7 frame">
    <ol class="steps" role="list">${steps.map((s, i) => `
      <li class="step" data-step="${i}"${s.id ? ` id="${s.id}"` : ''}>
        <div class="step-in">
          ${s.code ? `<p class="mono code"><span class="chip">${esc(s.code)}</span></p>` : ''}
          <h3 class="h3">${esc(s.title)}</h3>
          <p class="body">${esc(s.body)}</p>
          ${tags(s.tags || [])}
        </div>
      </li>`).join('')}
    </ol>
    <div class="tl-wrap">
      <div class="tl" id="timeline" data-state="0">
        <div class="tl-bar">
          <button type="button" class="btn-accent mono" id="tlRun" aria-pressed="false">▶ Run the cues</button>
          <button type="button" class="btn-line mono" id="tlTable" aria-expanded="false" aria-controls="tlTableWrap">Read as table</button>
          <span class="mono tl-chip sync" hidden>SYNC LOCKED</span>
          <span class="mono tl-go" aria-hidden="true">GO</span>
        </div>
        <div class="tl-stage" aria-hidden="true"><!-- drawn by js/timeline.js --></div>
        <ol class="cue-strip" role="list" aria-label="Cue list">${C.CUES.cues.map((q, i) => `
          <li class="cue-card"><button type="button" class="cue-btn" data-cue="${i}"><span class="mono">${tc(q.t)}</span><span class="h3">${esc(q.name)}</span><span class="mono lanes">${q.lanes.map(l => C.CUES.lanes.find(x => x.id === l).name).join(' · ')}</span></button></li>`).join('')}
        </ol>
        <p class="mono strip-nav"><button type="button" class="btn-line" data-strip="-1" aria-label="Previous cue">←</button><span class="strip-count">1/${C.CUES.cues.length}</span><button type="button" class="btn-line" data-strip="1" aria-label="Next cue">→</button></p>
        <div class="tl-table" id="tlTableWrap" hidden>
          <table><caption class="mono">Illustrative cue sheet</caption><thead><tr><th scope="col">Timecode</th><th scope="col">Name</th><th scope="col">Fires</th></tr></thead>
          <tbody>${C.CUES.cues.map(q => `<tr><td class="mono">${tc(q.t)}</td><td>${esc(q.name)}</td><td>${q.lanes.map(l => C.CUES.lanes.find(x => x.id === l).name).join(', ')}</td></tr>`).join('')}</tbody></table>
        </div>
        <div class="tl-warp">${film('V09-WARP')}</div>
        <div class="tl-cms" aria-hidden="true"><p class="mono">CMS · your staff</p><ul role="list"><li>Change slides</li><li>Update signage</li><li>Edit schedule</li></ul></div>
        <div class="tl-io" aria-hidden="true"><ul role="list">${['LIDAR', 'DMX', 'MIDI', 'OSC', 'SERIAL', 'CRESTRON/AMX'].map(p => `<li class="mono">${p}</li>`).join('')}</ul><span class="mono node">Render node</span></div>
      </div>
      <p class="mono tl-cap">Illustrative cue sheet · drawn in code, not generated</p>
      <p class="context"><span class="mono">Not a YBAVIT project:</span> Eurovision 2014 ran 37 songs from nine synchronised media servers, with custom OSC plug-ins driving the timeline <span class="src mono">(${ext('https://www.disguise.one/en/insights/case-studies/eurovision-song-contest-2014', 'Disguise')})</span>.</p>
    </div>
  </div>
</section>`;
};
function tc(sec) { return `00:00:${two(Math.floor(sec))}:${two(Math.round((sec % 1) * 25))}`; }

H.process = () => `
<section class="ch process" id="process" data-n="10" aria-labelledby="h-process">
  <div class="frame">
    <div class="ch-head">
      <p class="eyebrow mono">How we work together</p>
      <h2 id="h-process" class="display">One team, start to finish.</h2>
      <p class="lead measure">Five steps on every project, and what you hold at the end of each.</p>
    </div>
    <ol class="phases" role="list">${C.PHASES.map((p, i) => `
      <li class="phase" style="--i:${i}">
        <h3 class="h3">${p.name}</h3>
        <p class="mono plabel">${esc(p.label.split(' · ').slice(1).join(' · '))}</p>
        ${p.chips.length ? `<p class="chips">${p.chips.map(c => `<span class="chip mono">${PHASE_CHIP[c]}</span>`).join('')}</p>` : ''}
        <ul role="list">${p.items.map(x => `<li${(p.pulse || []).includes(x) ? ' class="key"' : ''}>${esc(x)}</li>`).join('')}</ul>
      </li>`).join('')}
    </ol>
    <p class="mono note">Durations are indicative, not a quote. Every project is scoped in Discover.</p>
    <ol class="cards" role="list">${C.CARDS.map((c, i) => `
      <li class="ecard${c.lead ? ' lead-card' : ''}" style="--i:${i}">
        <h3 class="h3">${esc(c.title)}</h3>
        <p class="body">${esc(c.body)}</p>
        <p class="mono draft-only">${txt(c.draft)}</p>
        ${c.link ? `<a class="next-link mono" href="#${c.link.to}">${esc(c.link.text)} <span aria-hidden="true">→</span></a>` : ''}
      </li>`).join('')}
    </ol>
    <p class="mono note">You keep source files, code and pixel maps at handover. <span class="ph">[CONFIRM WITH YBAVIT]</span></p>
  </div>
</section>`;

H.proof = () => `
<section class="ch proof" id="proof" data-n="11" aria-labelledby="h-proof">
  <div class="frame">
    <div class="ch-head">
      <p class="eyebrow mono">Proof & people</p>
      <h2 id="h-proof" class="display">Judge us on what you can check.</h2>
      <p class="lead measure">Concepts are labelled as concepts. Everything below is real and says where it comes from.</p>
    </div>
    <div class="proof-top">
      <div class="reel draft-only">
        ${film('V11-REEL', { cls: 'film-reel' })}
        <p class="mono reel-play">▶ Play reel · 1:00 · sound on · captions <span class="ph">[reel not cut yet]</span></p>
        <p class="mono reel-note">Contains AI concept visualisations, each labelled on screen.</p>
      </div>
      <ul class="lead-slots" role="list">
        <li class="proof-slot draft-only"><span class="mono">[PROOF SLOT: lead 1 · chosen by the buyer preset · kind: previs or process]</span></li>
        <li class="proof-slot draft-only"><span class="mono">[PROOF SLOT: lead 2 · kind: capability (the A07-08 binaural demo once recorded)]</span></li>
        <li class="proof-slot draft-only"><span class="mono">[PROOF SLOT: lead 3 · kind: quote, named person with written consent]</span></li>
        <li class="pcard fallback"><p class="mono">Demonstration</p><h3 class="h3">The show-control cue sheet.</h3><p class="body">An illustrative show timeline drawn in code: the same structure we deliver for every venue.</p><a class="next-link mono" href="#show-control">Open the cue sheet</a></li>
        <li class="pcard fallback"><p class="mono">Invitation</p><h3 class="h3">See our pre-vis process on your floor plan.</h3><p class="body">Send a plan or a few photos and we walk you through how your venue would be modelled and checked.</p><a class="next-link mono" href="#next">Start the conversation</a></li>
      </ul>
    </div>
    <div class="draft-only">
      <h3 class="mono kinds-h">Proof kinds this wall accepts</h3>
      <ul class="kinds" role="list">${C.PROOF_KINDS.map(([k, d]) => `<li><span class="chip mono">${k}</span> ${esc(d)}</li>`).join('')}</ul>
      <h3 class="mono kinds-h">The team</h3>
      <ul class="people" role="list">${C.PEOPLE.map(p => `<li class="person"><span class="mono mono-gram" aria-hidden="true">—</span><p class="ph">[TEAM: ${esc(p)}]</p><p class="mono">Name, role on this project, two prior credits (with permission), real photo</p></li>`).join('')}</ul>
    </div>
  </div>
</section>`;

H.next = () => `
<section class="ch t10 next" id="next" data-n="12" aria-labelledby="h-next">
  ${film('V12-CLOSE', { m: 'V12-CLOSE-M', cls: 'film-bleed' })}
  <div class="scrim scrim-t10" aria-hidden="true"></div>
  ${chapNo(12)}
  <div class="opener-text frame"><div class="ot">
    <p class="eyebrow mono plate">Next step</p>
    <h2 id="h-next" class="h2">See your venue before anyone builds it.</h2>
    <p class="lead">Send a floor plan or a few photos. One paid sprint returns the script, the storyboard and a digital twin you can walk through.</p>
    <p class="cta-row"><a class="btn-accent cta" href="mailto:info@ybavit.com?subject=Pre-vis%20sprint">Scope your pre-vis sprint</a></p>
    <p class="mono micro">Starts with a 30-minute venue walkthrough call<span class="ph"> with [CONTACT: name, role]</span>.</p>
    <p class="contact"><span class="ph">[CONTACT: name] · </span><span class="email" id="email">info@ybavit.com</span> <button type="button" class="btn-line mono copy" data-copy="info@ybavit.com">Copy address</button><span class="ph"> · +91 [PHONE]</span> · Mon–Sat 10:00–19:00 IST</p>
    <p class="mono disclosure">${esc(C.DISCLOSURE)}</p>
    <p class="mono draft-only micro">Leave-behind PDF: <span class="ph">[built from this content file later]</span></p>
  </div></div>
</section>`;

// ---------------------------------------------------------------- page chrome
const order = CHAPTERS.map(c => c.anchor);
const rail = CHAPTERS.map(c => `<li><a href="#${c.anchor}" data-rail="${c.anchor}" aria-label="${esc(c.title)}"><span class="tick" aria-hidden="true"></span></a></li>`).join('');
const presetOptions = PRESETS.map(p => `<option value="${p.id}">${esc(p.label)}</option>`).join('');

const indexDialog = `
<dialog class="index" id="indexDlg" aria-labelledby="indexTitle">
  <div class="dlg-head"><h2 id="indexTitle" class="h3">Index</h2><button type="button" class="btn-line mono" data-close>Close</button></div>
  <div class="index-grid">
    <nav aria-label="Chapters"><p class="mono">Chapters</p><ol role="list" class="index-ch">${CHAPTERS.map(c => `<li><a href="#${c.anchor}" data-close>${esc(c.title)}</a></li>`).join('')}${CRAFTS.map(c => `<li class="sub"><a href="#${c.id}" data-close>${esc(c.headline)}</a></li>`).join('')}</ol></nav>
    <nav aria-label="All 35 services"><p class="mono">All 35 services</p>
      ${DISCIPLINES.slice().sort((a, b) => a.code.localeCompare(b.code)).map(d => `<div class="index-disc"><p class="h-disc">${esc(d.full)}</p><ul role="list">${SERVICES.filter(s => s.code.startsWith(d.code + '.')).map(s => `<li><a href="#${svcId(s.code)}" data-close>${esc(s.name)}</a></li>`).join('')}</ul></div>`).join('')}
    </nav>
    <div class="index-set">
      <p class="mono">Viewing for</p>
      <label class="sr-only" for="viewFor2">Viewing for</label>
      <select id="viewFor2" data-viewfor>${presetOptions}</select>
      <p class="mono">View</p>
      <div class="seg" role="radiogroup" aria-label="View">
        <label><input type="radio" name="view" value="draft" id="viewDraft" checked> Draft (placeholders, film slots, spec)</label>
        <label><input type="radio" name="view" value="client" id="viewClient"> Client (what a buyer sees)</label>
      </div>
      <p class="mono">Build documents</p>
      <p><a href="spec.html" target="_blank" rel="noopener">Spec: purpose, copy, layout and interaction for every chapter</a></p>
      <p><a href="spec.html#films" target="_blank" rel="noopener">Film slots and Higgsfield briefs</a></p>
      <p class="mono">Present mode keys</p>
      <p class="body small">→ / Page Down / Space next · ← / Page Up back · B or . blank · O index · S notes · F fullscreen · E expand · H timer · 0–9 chapter</p>
    </div>
  </div>
</dialog>`;

const specDialog = `
<dialog class="specd" id="specDlg" aria-labelledby="specTitle">
  <div class="dlg-head"><h2 id="specTitle" class="h3">Spec · <span id="specName">Cover</span></h2><button type="button" class="btn-line mono" data-close>Close</button></div>
  ${CHAPTERS.map(c => `<section data-spec="${c.anchor}" hidden>${specBlocks(c, true)}</section>`).join('')}
  <p class="mono"><a href="spec.html" target="_blank" rel="noopener">Open the full spec</a></p>
</dialog>`;

const presentDialog = `
<dialog class="presentd" id="presentDlg" aria-labelledby="presentTitle">
  <div class="dlg-head"><h2 id="presentTitle" class="h3">Present</h2><button type="button" class="btn-line mono" data-close>Cancel</button></div>
  <p class="body">Present mode steps the deck one beat at a time for a meeting-room screen or an LED wall: 48 beats, about 17:30, or less with condensed chapters.</p>
  <label class="field"><span class="mono">Viewing for</span><select id="presentFor" data-viewfor>${presetOptions}</select></label>
  <label class="check"><input type="checkbox" id="presentShort"> Short craft explorer (two beats, 0:45)</label>
  <p class="body small">Starting goes fullscreen and keeps the screen awake where the browser allows. Keys: → next, ← back, B blank, O index, S notes, F fullscreen, E expand a condensed chapter, H timer, Esc twice to leave.</p>
  <p><button type="button" class="btn-accent mono" id="presentGo">Start presenting</button></p>
</dialog>`;

function specBlocks(c, compact) {
  const copy = copyOf(c);
  const sec = (h, body) => `<div class="spec-block"><h3 class="mono">${h}</h3>${body}</div>`;
  const list = (arr) => `<ul role="list">${arr.map(x => `<li>${txt(x)}</li>`).join('')}</ul>`;
  const beats = `<ol class="beats" role="list">${c.beats.map((b, i) => `<li><span class="mono">B${i + 1} · ${b.sec}s</span> ${esc(b.label)}<span class="note"> · ${esc(b.note)}</span></li>`).join('')}</ol>`;
  return `
  <p class="mono spec-meta">${two(c.n)} · #${c.anchor} · ${c.template} · ${c.beats.length} beat${c.beats.length > 1 ? 's' : ''} · ${c.live} live</p>
  ${sec('Purpose', `<p class="body">${txt(c.spec.purpose)}</p>`)}
  ${sec('On-page copy', list(copy))}
  ${sec('Layout and alignment', list(c.spec.layout))}
  ${sec('Interaction and scroll', list(c.spec.interaction) + (compact ? '' : `<p class="mono">Presenter beats</p>${beats}`))}`;
}

function copyOf(c) {
  const v = c.venue && VENUES[c.venue];
  if (v) return [
    `Eyebrow: ${v.eyebrow}`, `Headline: ${v.headline}`, `Subhead: ${v.subhead}`,
    ...v.steps.map(s => `${s.code} ${svc(s.code).name} · ${svc(s.code).tags.join(' · ')}: ${svc(s.code).line}`),
    `Outcome: ${v.outcome.title} ${v.outcome.body} Chips ${v.steps[0].code}–${v.steps[3].code} link back to each step.`,
    `Condensed summary: ${v.summaryTitle}: ${v.steps.map(s => `${s.code} ${svc(s.code).name}: ${svc(s.code).short}`).join(' · ')}`,
    `CTA: ${v.cta.text} → #${v.cta.to}${v.ctaRealEstate ? ` (real-estate view: ${v.ctaRealEstate.text} → #${v.ctaRealEstate.to}; 01.3 body becomes: ${svc('01.3').lineRealEstate})` : ''}`,
    `Context line · not YBAVIT projects: ${v.context.text} (${v.context.src})`,
    `[PROOF SLOT: ${v.proof}; hidden for clients while empty]`,
  ];
  const map = {
    cover: ['Eyebrow: YBAVIT · Immersive content services · 2026', 'Headline: We make spaces that perform.', 'Subhead: Content, software and show control for experience centres, museums and public installations, in India, the Gulf and wherever the venue is.', 'Personalised line (preset links): Prepared for [Client name] · [Month 2026]', 'Scroll cue: “Scroll to walk through” (Read) / “Press → to begin” (Present)', `Badge on every AI film: ${C.AI_BADGE}`],
    promise: ['Eyebrow: 01 · What we do', 'Headline: Ten disciplines, one team, from first storyboard to show day.', 'Body: We write the story, build the content and wire the room. That covers 3D and holographic content, projection mapping, interactive software, spatial audio and the show control that makes it run at the press of one button.', 'WHERE 01 Experience Centres. Briefing rooms that sell the vision.', 'WHERE 02 Museums & Heritage. Collections that come back to life.', 'WHERE 03 Art & Installations. Public spaces that react to people.', 'Microcopy under each panel: See chapter 04 / 05 / 06'],
    'why-now': ['Eyebrow: 02 · Why now', 'Headline: India and the Gulf are building places to be experienced.', 'Band caption: Concept visualisation · AI-generated · not a real venue', ...Object.values(TILES).map(t => `Tile: ${t.fig} · ${t.label} · ${t.src}${t.notOurs ? ' · Not YBAVIT projects' : ''}`), 'What we believe: 01 Story before screens. 02 See it before you build it. 03 Built to be run, not just opened.'],
    offer: ['Eyebrow: 03 · The offer', 'Headline: Plan it. Make it. Run it.', 'Subhead: Three venue types, five crafts and the two disciplines that bracket every project, with all 35 services on one map.', 'Band labels: PLAN · WHERE · WHAT · RUN', ...DISCIPLINES.map(d => `${d.code} ${d.name} · ${SERVICES.filter(s => s.code.startsWith(d.code + '.')).length} · ${d.line}`), 'Footer: Tap any discipline to jump to it · Full index: use the ☰ Index button'],
    crafts: ['Eyebrow: 07 · What we make', 'Headline: The workshop behind every venue.', 'Subhead: Five crafts, seventeen services. Find your venue’s row, or open a craft.', 'Top band: 10 · Experience Strategy & Pre-Visualization (Pre-vis): every project starts here → 08', 'Bottom band: 06 · Show Control & Media Integration: every project lands here → 09', 'Column headers: Open craft ↓; empty cells “—” (No typical service)', ...CRAFTS.map(c => `07${c.letter}: ${c.eyebrow} · ${c.headline} · ${c.subhead} · ${c.body} · services ${c.services.join(', ')}`), '07d listen card: Best with headphones. Sounds will move around your head. · Play the 0:40 demo / Pause · Real binaural recording by YBAVIT · not AI-generated · starts quietly · Read transcript'],
    previs: ['Eyebrow: 08 · Discipline 10 · Experience Strategy & Pre-Visualization (Pre-vis)', 'Headline: See it before you build it.', 'Subhead: Every film in this deck is a concept visualisation. For your venue we build the real thing: a digital twin you can walk through and sign off before anything is installed.', ...C.PREVIS_STEPS.map(s => `${s.code} · ${s.title} ${s.body}`), 'Step 5 link: Start with a paid pre-vis sprint → 12', 'Caption under the figure names the slot and its status, e.g. S08-1 · Storyboard · made by YBAVIT; V08-4 · AI illustration · not a YBAVIT project'],
    'show-control': ['Eyebrow: 09 · Discipline 06 · Show Control & Media Integration', 'Headline: One button, every cue.', 'Subhead (PDF): The operational core that bonds content, software, and physical AV hardware into a synchronized, single-button or automated experience.', 'Intro: Screens, lights, sound and effects each run on separate equipment. We write the one timeline that tells all of them what to do, to the frame.', ...['06.1', '06.2', '06.3', '06.4'].map(code => `${code} ${svc(code).name} · ${svc(code).title} ${svc(code).line}`), 'Controls: ▶ Run the cues / Pause · Read as table', 'Caption: Illustrative cue sheet · drawn in code, not generated', 'Scale line: Not a YBAVIT project: Eurovision 2014 ran 37 songs from nine synchronised media servers (Disguise)'],
    process: ['Eyebrow: 10 · How we work together', 'Headline: One team, start to finish.', 'Subhead: Five steps on every project, and what you hold at the end of each.', ...C.PHASES.map(p => `${p.label}${p.chips.length ? ' · ' + p.chips.join(' ') : ''}: ${p.items.join(', ')}`), 'Note: Durations are indicative, not a quote. Every project is scoped in Discover.', ...C.CARDS.map(c => `${c.title} ${c.body} ${c.draft}`), 'Under the strip: You keep source files, code and pixel maps at handover. [CONFIRM WITH YBAVIT]'],
    proof: ['Eyebrow: 11 · Proof & people', 'Headline: Judge us on what you can check.', 'Subhead: Concepts are labelled as concepts. Everything below is real and says where it comes from.', ...C.PROOF_KINDS.map(([k, d]) => `Proof kind ${k}: ${d}`), 'Fallback cards: the cue sheet in chapter 09 (demonstration); See our pre-vis process on your floor plan (invitation)', 'People cards: [TEAM: creative director] [TEAM: pre-vis and real-time lead] [TEAM: show-control and integration lead] [TEAM: producer]', 'Reel: ▶ Play reel · 1:00 · sound on · captions · Contains AI concept visualisations, each labelled on screen.'],
    next: ['Eyebrow: 12 · Next step', 'Headline: See your venue before anyone builds it.', 'Subhead: Send a floor plan or a few photos. One paid sprint returns the script, the storyboard and a digital twin you can walk through.', 'CTA: Scope your pre-vis sprint (calendar booking later, mailto fallback now)', 'Microcopy: Starts with a 30-minute venue walkthrough call with [CONTACT: name, role].', 'Contact: [CONTACT: name] · info@ybavit.com · +91 [PHONE] · Mon–Sat 10:00–19:00 IST', `Disclosure: ${C.DISCLOSURE}`, 'Secondary: Download the leave-behind (PDF) [not built yet]'],
  };
  return map[c.anchor] || [];
}

const deckBody = `
<a class="skip" href="#main">Skip to the deck</a>
<header class="hdr" id="hdr">
  <div class="hdr-l">
    <span class="wordmark" aria-label="YBAVIT">YBAVIT</span>
    <button type="button" class="btn-ghost mono" id="pauseBtn" aria-pressed="false"><span class="pi" aria-hidden="true"></span><span class="pl">Pause motion</span></button>
  </div>
  <nav class="rail" aria-label="Chapters">
    <ol role="list">${rail}</ol>
    <span class="rail-now mono" aria-live="off"><span id="railName">Cover</span></span>
  </nav>
  <div class="hdr-r">
    <label class="vf"><span class="mono">Viewing for</span><select id="viewFor" data-viewfor>${presetOptions}</select></label>
    <button type="button" class="btn-ghost mono draft-only" id="specBtn" aria-haspopup="dialog">Spec</button>
    <button type="button" class="btn-ghost mono" id="presentBtn" aria-haspopup="dialog">Present</button>
    <button type="button" class="btn-ghost mono" id="indexBtn" aria-haspopup="dialog"><span aria-hidden="true">☰</span> Index</button>
  </div>
</header>
<main id="main">
${order.map(a => H[a]()).join('\n')}
</main>
<footer class="foot-disc">
  <div class="frame">
    <p class="mono">About the films in this deck</p>
    <p class="body measure">${txt(C.DISCLOSURE_LONG)}</p>
    <p class="mono legal">© 2026 Yottabyte Technology <span class="ph">[confirm the legal name shown with YBAVIT]</span> · <a href="spec.html" class="draft-only">Build spec</a></p>
  </div>
</footer>
${indexDialog}
${specDialog}
${presentDialog}
<div class="hud mono" id="hud" hidden><span id="hudBeat"></span><span id="hudClock">00:00</span><span id="hudNext"></span><span id="hudFs"></span></div>
<aside class="notes-panel" id="notesPanel" hidden aria-label="Presenter notes"><p class="mono" id="npHead"></p><p class="body" id="npNote"></p><p class="mono" id="npNext"></p></aside>
<div class="blank" id="blank" hidden></div>
<p class="sr-only" id="live" aria-live="polite"></p>
<script type="module" src="js/deck.js"></script>`;

const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..800&family=IBM+Plex+Mono:wght@400;500&display=swap">`;
const head = (title, css) => `<title>${title}</title>
<meta name="description" content="YBAVIT immersive content services: a venue walkthrough in thirteen chapters.">
<meta name="robots" content="noindex">
${fonts}
<link rel="stylesheet" href="${css}">`;

const deckPage = `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${head('YBAVIT Venue Walkthrough', 'css/deck.css')}
</head>
<body class="draft">
${deckBody}
</body>
</html>
`;

// ---------------------------------------------------------------- spec page
const slotRows = (ids) => ids.map(id => { const s = SLOTS[id]; return `<tr><th scope="row" class="mono">${id}${s.optional ? ' (optional)' : ''}</th><td class="mono">${s.cls}</td><td>${esc(s.ratio)}</td><td>${esc(s.len)}</td><td>${esc(s.mobile || '—')}</td><td>${s.origin === 'ai' ? 'AI atom' : s.origin === 'ybavit' ? '<b>Made by YBAVIT, not AI</b>' : 'Code'}</td><td>${esc(s.brief)}</td></tr>`; }).join('');
const slotsFor = (c) => {
  if (c.venue) { const v = VENUES[c.venue]; return [v.opener, v.openerM, ...v.steps.map(s => s.slot), ...v.steps.filter(s => s.slotRealEstate).map(s => s.slotRealEstate)]; }
  return ({ cover: ['V00-HERO', 'V00-HERO-M'], 'why-now': ['V02-BAND'], crafts: CRAFTS.map(c => c.slot), previs: ['S08-1', 'V08-2', 'V08-4'], 'show-control': ['V09-WARP'], proof: ['V11-REEL'], next: ['V12-CLOSE', 'V12-CLOSE-M'] })[c.anchor] || [];
};
const trimNote = { promise: 'V01-A / V01-B / V01-C: 4:5 trims (720×900, 4–6 s) cut from V04-0, V05-0 and V06-0. No new generation.', offer: 'P01–P10: 3–5 s, 640×360 preview trims of each discipline’s source film. No new generation.', process: 'Phase strip: built in code, no video.', 'show-control': 'Cue timeline: built in code (SVG).' };
const slotTable = (ids) => ids.length ? `<div class="tw"><table class="slots"><thead><tr><th scope="col">Slot</th><th scope="col">Class</th><th scope="col">Ratio · delivery</th><th scope="col">Length · loop</th><th scope="col">Mobile</th><th scope="col">Made by</th><th scope="col">Creative brief</th></tr></thead><tbody>${slotRows(ids)}</tbody></table></div>` : '';

const specPage = `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${head('YBAVIT Deck Spec', 'css/spec.css')}
</head>
<body>
<main class="spec">
  <header class="spec-hero">
    <p class="mono">YBAVIT · venue walkthrough · build spec</p>
    <h1>Thirteen chapters, four blocks each.</h1>
    <p class="lead">For every chapter: Purpose, On-page copy, Layout and alignment, and Interaction and scroll, then the film slots it needs. Generated from the same content file as the deck, so the two never disagree.</p>
    <p class="mono"><a href="index.html">Open the deck</a> · <a href="#films">Film slots and briefs</a> · <a href="#services">All 35 services</a> · <a href="#presets">Buyer presets</a> · <a href="#system">Design system</a></p>
  </header>
  <nav class="toc" aria-label="Chapters"><ol role="list">${CHAPTERS.map(c => `<li><a href="#spec-${c.anchor}"><span class="mono">${two(c.n)}</span> ${esc(c.title)}</a></li>`).join('')}</ol></nav>
  ${CHAPTERS.map(c => `
  <section class="spec-ch" id="spec-${c.anchor}">
    <h2><span class="mono">${two(c.n)}</span> ${esc(c.title)}</h2>
    ${specBlocks(c, false)}
    ${c.anchor === 'crafts' ? CRAFTS.map(k => `<div class="spec-sub"><h3><span class="mono">07${k.letter}</span> ${esc(k.headline)} <span class="mono">#${k.id}</span></h3>
      <div class="spec-block"><h3 class="mono">Purpose</h3><p class="body">${esc(k.purpose)}</p></div>
      <div class="spec-block"><h3 class="mono">On-page copy</h3><ul role="list"><li>Eyebrow: ${esc(k.eyebrow)}</li><li>Headline: ${esc(k.headline)}</li><li>Subhead: ${esc(k.subhead)}</li><li>Body: ${esc(k.body)}</li><li>Context · not a YBAVIT project: ${esc(k.context.text)} (${esc(k.context.src)})</li>${k.services.map(code => `<li>${code} ${esc(svc(code).name)}: ${esc(svc(code).line)} <span class="mono">${svc(code).tags.join(' · ')}</span></li>`).join('')}${(k.draft || []).map(d => `<li>${txt(d)}</li>`).join('')}</ul></div>
      <div class="spec-block"><h3 class="mono">Layout and alignment</h3><ul role="list">${k.layout.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
      <div class="spec-block"><h3 class="mono">Interaction and scroll</h3><ul role="list">${k.interaction.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
    </div>`).join('') : ''}
    <div class="spec-block"><h3 class="mono">Video and visual slots</h3>${trimNote[c.anchor] ? `<p class="body">${esc(trimNote[c.anchor])}</p>` : ''}${slotTable(slotsFor(c))}${!slotsFor(c).length && !trimNote[c.anchor] ? '<p class="body">None.</p>' : ''}</div>
  </section>`).join('')}

  <section class="spec-ch" id="films">
    <h2><span class="mono">F</span> Film slots for Higgsfield</h2>
    <p class="body">Every atom: 8 s at 24 fps from a 16:9 1080p master (the 9:16 ones native portrait), silent, first frame = last frame, locked camera, no text or logos. Paste the shared style block into every prompt, then the slot’s brief. Name each file after its slot (for example <span class="mono">media/films/V04-1.mp4</span>) and list it in <span class="mono">js/films.js</span>; the deck swaps the code-drawn study for the film and adds the AI badge on its own.</p>
    <div class="spec-block"><h3 class="mono">Shared style block</h3><p class="body style-block">${esc(C.STYLE_BLOCK)}</p></div>
    <div class="spec-block"><h3 class="mono">Never</h3><ul role="list"><li>Real landmarks, real venues, deities, sacred objects, identifiable artefacts, artworks or people.</li><li>Readable text, numerals, logos, brand marks, software screens.</li><li>More than three flashes per second (WCAG 2.3.1).</li><li>An AI clip captioned with a client, venue or year.</li></ul></div>
    ${slotTable(Object.keys(SLOTS))}
    <p class="body">Counts: 26 AI atoms (27 with V04-3R), 5 native 9:16 variants, 13 trims and previews made with no extra generation, 3 real assets (A07-08, S08-1, and V08-4 when captured), 2 code-built visuals and 1 reel.</p>
  </section>

  <section class="spec-ch" id="services">
    <h2><span class="mono">S</span> All 35 services and where they appear</h2>
    <div class="tw"><table><thead><tr><th scope="col">Code</th><th scope="col">Name (PDF, verbatim)</th><th scope="col">Explanation</th><th scope="col">Labels</th></tr></thead>
    <tbody>${SERVICES.map(s => `<tr><th scope="row" class="mono">${s.code}</th><td>${esc(s.name)}</td><td>${esc(s.line)}</td><td class="mono">${s.tags.map(esc).join(' · ')}</td></tr>`).join('')}</tbody></table></div>
  </section>

  <section class="spec-ch" id="presets">
    <h2><span class="mono">P</span> Buyer presets (“Viewing for”)</h2>
    <p class="body">No entry gate. The filter reorders the venue chapters, picks chapter 02’s four tiles, lights matrix rows and dims venue tiles; it never hides content. A link ending in <span class="mono">#p-museum</span> (or cxc, festival, brand, realestate) opens with that preset. In Present mode, less relevant venue chapters are condensed to an opener and a summary beat that still lists all four services.</p>
    <div class="tw"><table><thead><tr><th scope="col">Preset</th><th scope="col">Viewing for</th><th scope="col">Venue order</th><th scope="col">Chapter 02 tiles</th><th scope="col">Condensed in Present</th><th scope="col">Lead craft</th></tr></thead>
    <tbody>${PRESETS.map(p => `<tr><th scope="row" class="mono">${p.id}</th><td>${esc(p.label)}</td><td class="mono">${p.craftsFirst ? '07 after 03, then ' : ''}${p.order.map(n => two(n)).join(' → ')}</td><td>${p.tiles.map(t => TILES[t].fig).join(' · ')}</td><td class="mono">${p.condense.map(two).join(', ') || 'none'}</td><td class="mono">#${p.lead}</td></tr>`).join('')}</tbody></table></div>
  </section>

  <section class="spec-ch" id="system">
    <h2><span class="mono">D</span> Design system</h2>
    <div class="spec-block"><h3 class="mono">Design read</h3><p class="body">A film-first credentials deck for enterprise, museum, festival and real-estate buyers in India and the Gulf, in the visual language of a venue before doors open: blue-black blackout, bone-white type like projection on stone, and one tungsten accent. Dial ENERGY 3 / RHYTHM 3 / MOTION 2: the motion budget goes to film, the interface stays calm, and scrolling is never hijacked.</p></div>
    <div class="spec-block"><h3 class="mono">Reasons</h3><ul role="list">
      <li>Colour: films carry the colour, so the interface is one dark neutral with a blue bias (#07090D), a warm bone text (#ECE6DA) and one tungsten accent (#F2B35B) for the active chapter, the playhead, focus and the primary call to action. Spike-tape pink (#FF4FA3) marks Draft-only placeholders, the way stage crews mark positions. [Placeholder until YBAVIT confirms its brand colour.]</li>
      <li>Type: Archivo for display and body, using its width axis so headlines run wide like venue signage while body text stays normal; IBM Plex Mono for codes, timecode, tool names and sources, because those are engineering data.</li>
      <li>Layout: a 4/8/12-column grid whose outer margin, clamp(1rem, 5vw, 8rem), equals the broadcast 5% graphics-safe inset, so text over film never sits where a projector or LED processor crops.</li>
      <li>Identity motif: graphics-safe corner marks and mono cue codes on every film frame, the chapter rail drawn as a cue list.</li>
      <li>Theme: dark only, by choice: the deck plays in dark rooms and on LED walls, and the films need a dark ground.</li>
      <li>Motion: native scroll; 150–250 ms reveals, CSS-sticky figures, crossfades; no scrolljacking, no per-letter text, nothing pulsing forever.</li></ul></div>
  </section>
</main>
</body>
</html>
`;

// ---------------------------------------------------------------- write
fs.writeFileSync(path.join(root, 'index.html'), deckPage);
fs.writeFileSync(path.join(root, 'spec.html'), specPage);
// publish copy: the host wraps the page in its own skeleton, so drop ours from the deck page only
const art = path.join(root, '.artifact');
fs.mkdirSync(art, { recursive: true });
const stripped = deckPage.replace(/^<!doctype html>\n<html[^>]*>\n<head>\n<meta charset="utf-8">\n<meta name="viewport"[^>]*>\n/, '').replace('</head>\n<body class="draft">\n', '<script>document.body.classList.add(\'draft\')</script>\n').replace(/<\/body>\n<\/html>\n$/, '');
fs.writeFileSync(path.join(art, 'index.html'), stripped);
// client-facing check: placeholders must all sit inside Draft-only markup
const clientText = deckPage.replace(/<(span|p) class="ph">[^<]*<\/\1>/g, '').replace(/class="[^"]*draft-only[^"]*"[^>]*>[\s\S]*?<\/(p|div|span|li|ul|button|a)>/g, '');
const leaks = (clientText.match(/\[(PROOF SLOT|TEAM|CONTACT|PRICE|CONFIRM)[^\]]*\]/g) || []);
console.log(`Built index.html (${(deckPage.length / 1024).toFixed(0)} KB), spec.html (${(specPage.length / 1024).toFixed(0)} KB); ${SERVICES.length} services, ${beatCount} beats, ${Object.keys(SLOTS).length} film slots.${leaks.length ? '\nPlaceholder text outside Draft-only markup: ' + leaks.join(', ') : ''}`);
