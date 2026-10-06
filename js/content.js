// One content file for the YBAVIT venue walkthrough. The build (tools/build.mjs) turns it into index.html and
// spec.html; the page scripts read it for beats, presets and film slots. Copy follows the research brief;
// [square brackets] are placeholders YBAVIT must fill or confirm, and they show only in the Draft view.

export const AI_BADGE = 'Concept visualisation · AI-generated';
export const STUDY_LABEL = 'Study drawn in code · film to come';

export const DISCLOSURE = 'Films marked “Concept visualisation · AI-generated” are AI-made illustrations of proposed experiences in generic venues. They are not footage of completed or commissioned YBAVIT projects, and final design, scale, brightness and viewing conditions will differ. Real project footage is labelled with client, venue and year.';

export const DISCLOSURE_CLIENT = 'Films marked “Concept visualisation · AI-generated” illustrate the kinds of experiences YBAVIT designs. They are not footage of completed projects, and real installations will differ in design, scale and viewing conditions. Market figures describe other organisations’ work, and their sources are cited.';

export const DISCLOSURE_LONG = 'Clips marked “Concept visualisation · AI-generated” were made with generative AI video tools to illustrate the kinds of experiences YBAVIT designs. They are not footage of completed or commissioned projects and show no client’s venue. Real installations will differ in design, scale, brightness, sound and viewing conditions. Storyboards, the spatial-audio demo and pre-vis captures are made by our team [confirm per asset], and the show-control timeline is an illustrative diagram. Real project footage is labelled with client, venue and year. Market figures describe other organisations’ work, and their sources are cited.';

// ---------------------------------------------------------------- disciplines and the 35 services

export const DISCIPLINES = [
  { code: '10', band: 'PLAN',  name: 'Experience Strategy & Pre-Visualization', full: 'Experience Strategy & Pre-Visualization (Pre-vis)', line: 'Story, storyboards and a digital twin of your venue.', to: 'previs' },
  { code: '01', band: 'WHERE', name: 'Executive & Client Experience Centres', full: 'Executive & Client Experience Centres (CXCs)', line: 'Briefing spaces that demonstrate authority and drive enterprise sales.', to: 'cxc' },
  { code: '02', band: 'WHERE', name: 'Museum & Heritage Experiences', full: 'Museum & Heritage Experiences', line: 'Narrative-first installations that educate and preserve.', to: 'museums' },
  { code: '03', band: 'WHERE', name: 'Interactive Art & Digital Installations', full: 'Interactive Art & Digital Installations', line: 'Sensory work for festivals, galleries and public space.', to: 'installations' },
  { code: '04', band: 'WHAT',  name: '3D Holographic & Hologram Content', full: '3D Holographic & Hologram Content Services', line: 'Depth illusions without glasses: Pepper’s Ghost, holo-mesh, POV fans.', to: 'craft-holographic' },
  { code: '05', band: 'WHAT',  name: '3D, CGI, Animation & VFX', full: '3D, CGI, Animation & VFX', line: 'Anamorphic illusions, simulations and virtual production.', to: 'craft-cgi' },
  { code: '07', band: 'WHAT',  name: 'Visual Content & Creative Direction', full: 'Visual Content & Creative Direction', line: 'Motion graphics, projection mapping, generative stage content.', to: 'craft-visual' },
  { code: '08', band: 'WHAT',  name: 'Spatial & Immersive Audio', full: 'Spatial & Immersive Audio Production', line: 'Sound that moves through the room and stays in its zone.', to: 'craft-audio' },
  { code: '09', band: 'WHAT',  name: 'Extended Reality (XR) & Interactive Content', full: 'Extended Reality (XR) & Interactive Content', line: 'AR, VR, touch walls and interactive floors.', to: 'craft-xr' },
  { code: '06', band: 'RUN',   name: 'Show Control & Media Integration', full: 'Show Control & Media Integration', line: 'One button runs video, light, sound and effects in sync.', to: 'show-control' },
];

// name: the PDF's sub-service name, verbatim. line: the one-line explanation. tags: mono tool or technique labels.
export const SERVICES = [
  { code: '01.1', name: 'Interactive Executive Keynote Environments', tags: ['UNREAL', 'NOTCH'], line: 'Presentation decks driven by real-time spatial engines react to the speaker’s touch, gesture or tablet. The stage follows the conversation, not the slide order.', short: 'stages that react to you' },
  { code: '01.2', name: 'Real-Time Enterprise Data & KPI Dashboards', tags: ['LIVE DATA'], line: 'Custom-coded feeds turn raw operational data, logistics metrics or cloud analytics into 3D data clouds and interactive walls. Visitors touch the numbers instead of reading them.', short: 'live data as 3D walls' },
  { code: '01.3', name: 'Interactive Product Configurators', tags: ['REAL-TIME 3D'], line: 'High-resolution 3D lets high-net-worth clients customise industrial designs, vehicles, real-estate builds or hardware options in real time.', lineRealEstate: 'Buyers customise a real-estate build, from finishes and materials to options, in high-resolution real-time 3D before it exists.', short: 'products customised in real time' },
  { code: '01.4', name: 'Brand Milestone Timelines & Story Tunnels', tags: ['WRAPPED LED'], line: 'Multi-screen or wrapped-LED sequences take visitors on a guided walk through your origins, milestones and future roadmap.', short: 'your history as a walk' },

  { code: '02.1', name: 'Historical Re-enactments & Volumetric Video', tags: ['VOLUMETRIC CAPTURE'], line: 'Living actors or digitised historical records become volumetric 3D people for an immersive “teleport” back in time. They are staged with optical illusions such as Pepper’s Ghost, not as free-floating holograms.', short: 'real people, staged life-size' },
  { code: '02.2', name: 'Artifact Augmentation & Digital Twins', tags: ['PHOTOGRAMMETRY'], line: 'High-definition 3D scans (photogrammetry) and interactive graphics superimpose missing fragments, original paint or internal structures over the physical artifact, leaving the object itself untouched.', short: 'scans that restore fragments and paint' },
  { code: '02.3', name: '360° Living History Theatres', tags: ['MULTI-PROJECTION', 'AMBIENT AUDIO'], line: 'Wrap-around multi-projection and localised ambient audio surround the audience with historic battles, atmospheric shifts or extinct ecosystems.', short: 'wraparound projection and sound' },
  { code: '02.4', name: 'Gamified Educational Touchpoints', tags: ['TOUCH TABLE', 'HANDHELD'], line: 'Custom apps for touch tables and handheld guides turn the collection into quizzes, scavenger hunts and deep dives into the archive.', short: 'learning games on tables and handhelds' },

  { code: '03.1', name: 'Generative & Reactive Visuals', tags: ['TOUCHDESIGNER', 'LIVE DATA'], line: 'Algorithmic visuals respond live to the room’s ambient noise, crowd temperature or live weather data, so the work is never the same twice.', short: 'visuals driven by sound, crowd and weather' },
  { code: '03.2', name: 'Body & Motion-Tracked Canvas', tags: ['LIDAR', 'INFRARED'], line: 'Visuals mapped to LiDAR or infrared tracking ripple, move or shatter as people walk past or touch the wall.', short: 'walls that react as you move' },
  { code: '03.3', name: 'Bio-Metric Interactive Installations', tags: ['HEART RATE', 'EEG', 'HAND TRACKING'], line: 'Visual and audio streams sync directly with visitors’ heart rates, brainwaves (via EEG sensors) or hand movements tracked in mid-air.', short: 'light and sound synced to heartbeats' },
  { code: '03.4', name: 'Kinetic Sculpture Sync Content', tags: ['MOTORS', 'LIGHTING CUES'], line: 'Software syncs motors, mechanical ceiling LED balls and robotic arms with matching visuals and spatial lighting cues.', short: 'moving sculpture locked to light and video' },

  { code: '04.1', name: 'Spatial 3D Asset Creation', tags: ['photo-realistic 3D assets', 'multi-perspective depth viewing'], line: 'Photoreal products, avatars and logos that hold up from several viewing angles.' },
  { code: '04.2', name: 'Optical Illusion & Pepper’s Ghost Content', tags: ['Pepper’s Ghost', 'holographic mesh', 'transparent OLED'], line: 'Scenes set on true black, which reads as transparent, and aligned to the viewer’s eye line so they float in glass, mesh or a see-through screen.' },
  { code: '04.3', name: 'Holographic Human Digital Twins & “Beam-In” Content', tags: ['full-body 3D capture', 'volumetric video', 'real-time streaming'], line: 'A person captured in 3D, then played back or streamed live into one of those displays. The figure appears life-size from the front of a dark stage, not as a figure you can walk around.' },
  { code: '04.4', name: 'POV Fan Array & Volumetric Matrix Content', tags: ['POV LED fan arrays', 'volumetric LED matrix cubes'], line: 'Animation for LED blades that spin fast enough to draw one floating image, and for LED cubes that draw in 3D.' },
  { code: '04.5', name: 'Holographic Interactive Systems', tags: ['hand tracking', 'depth cameras', 'gesture tracking'], line: 'Sensors built into the display let visitors rotate or explode a 3D model in mid-air.' },

  { code: '05.1', name: 'Anamorphic 3D Illusions', tags: ['flat LED', 'L-shaped corner LED'], line: 'Forced-perspective animation that seems to burst out of flat or corner LED screens for passers-by standing at one spot.' },
  { code: '05.2', name: 'High-Poly 3D Asset Modeling & Texturing', tags: ['Maya', 'Cinema 4D', 'Blender'], line: 'Photoreal models of places, vehicles, fluids and rigged characters.' },
  { code: '05.3', name: 'High-Impact Particle & Dynamics Simulations', tags: ['SideFX Houdini'], line: 'Smoke, fire, fluids, shattering glass and light rays for a show’s biggest moments.' },
  { code: '05.4', name: 'Real-Time Virtual Production Environments', tags: ['Unreal Engine 5', 'Unity'], line: 'Virtual worlds that run live on LED volumes, green-screen stages and hybrid events.' },

  { code: '06.1', name: 'Show Control Scripting & Timeline Orchestration', tags: ['LTC', 'MTC', 'MEDIALON', 'QLAB', 'TOUCHOSC'], title: 'One clock for everything.', line: 'Master timecode scripts lock video servers, moving lights, spatial audio and physical effects such as fog and hydraulics into frame sync.' },
  { code: '06.2', name: 'Media Server Programming & Spatial Warping', tags: ['DISGUISE', 'PIXERA', 'GREEN HIPPO'], title: 'Bend the picture, not the building.', line: 'We encode, slice and map high-bitrate media so graphics land pixel-perfect on curved walls, 3D architecture and non-standard LED layouts.' },
  { code: '06.3', name: 'Custom CMS & Venue Automation', tags: [], title: 'Your team holds the keys.', line: 'Your staff can change slides, update signage and schedule the venue’s automatic opening and closing sequences without technical help.' },
  { code: '06.4', name: 'Sensor & Hardware Communication Protocols', tags: ['LIDAR', 'DMX', 'MIDI', 'OSC', 'SERIAL', 'CRESTRON/AMX'], title: 'The room can listen.', line: 'Middleware carries signals from sensors, lighting rigs and building automation into the computers that render the visuals in real time.' },

  { code: '07.1', name: '3D Motion Graphics', tags: ['ultra-wide screen ratios', 'curved LED volumes'], line: '3D animation rendered to the true size and shape of ultra-wide, curved or irregular screens.' },
  { code: '07.2', name: 'Architectural Projection Mapping', tags: ['building facades', 'interior surfaces', 'product models'], line: 'Content warped to a facade, an interior or a product model such as a launch car, so light lands only where it should.' },
  { code: '07.3', name: 'Generative Stage Content', tags: ['Notch', 'TouchDesigner'], line: 'Live visuals that react on the fly to performers, audio tempo or lighting feeds.' },

  { code: '08.1', name: '3D/Spatial Soundscapes', tags: ['L-Acoustics L-ISA', 'd&b Soundscape', 'Dolby Atmos'], line: 'Multi-channel compositions that place each sound as an object and move it around the audience.' },
  { code: '08.2', name: 'Audio-Visual Synchronization', tags: ['custom scoring', 'sound effects', 'voiceover timing'], line: 'Score, effects and voiceover timed to the frame with visual cues, holographic reveals and pyrotechnics.' },
  { code: '08.3', name: 'Zone-Based Directional Audio', tags: ['directional speakers', 'sound showers'], line: 'Directional speakers give neighbouring zones separate streams that don’t bleed into each other.' },

  { code: '09.1', name: 'Augmented & Virtual Reality (AR/VR)', tags: ['mobile AR triggers', 'WebAR', 'location-based VR'], line: 'Phone AR triggers, browser-based AR and location-based VR headsets that take visitors deeper into the story.' },
  { code: '09.2', name: 'Touch & Kinetic Display UX', tags: ['multi-touch walls', 'interactive floors', 'air-gesture stations'], line: 'Interface design for multi-touch walls, interactive floors and touchless air-gesture stations.' },

  { code: '10.1', name: 'Show Narrative & Storyboarding', tags: [], line: 'We script the narrative arc and the visitor’s route through the space, then storyboard it frame by frame.' },
  { code: '10.2', name: '3D Digital Twin Pre-vis', tags: ['DISGUISE', 'UNREAL ENGINE'], line: 'A full 3D replica of your venue plays the real media on its virtual screens.' },
];
export const svc = (code) => SERVICES.find(s => s.code === code);
export const svcId = (code) => 'svc-' + code.replace('.', '-');

// ---------------------------------------------------------------- market tiles (chapter 02)

export const TILES = {
  YYB:     { fig: '1.54 lakh m²', label: 'Yuge Yugeen Bharat, billed as the world’s largest museum, now being built in Delhi’s North and South Blocks', src: 'PIB, 29 Jun 2024', url: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2029510', notOurs: true },
  ART:     { fig: '4.79 lakh', label: 'Artefacts digitised across 8 national museums, raw material for digital twins', src: 'PIB, 3 Aug 2026', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2293811&reg=48&lang=2' },
  LIVE:    { fig: '+44%', label: 'Growth in India’s organised live events in 2025, as spending shifts to ticketed experiences', src: 'FICCI-EY, Mar 2026', url: 'https://www.ey.com/en_in/newsroom/2026/03/india-s-media-and-entertainment-sector-grew-9-percent-to-inr-2-point-78-trillion-in-2025-driven-by-digital-and-live-experiences-ficci-ey-report' },
  GCC:     { fig: '2,117', label: 'Global Capability Centres in India, each a potential client experience centre', src: 'Zinnov–Nasscom, 2026', url: 'https://zinnov.com/centers-of-excellence/zinnov-nasscom-india-gcc-landscape-2026-report/' },
  MOTF:    { fig: '~5M', label: 'Visitors to Dubai’s Museum of the Future in its first four years', src: 'Dubai Media Office, 22 Feb 2026', url: 'https://mediaoffice.ae/en/news/2026/february/22-02/museum-of-the-future', notOurs: true },
  NOOR:    { fig: '7M+', label: 'Visitors to Noor Riyadh 2025, a city-wide light-art festival', src: 'Arab News, Dec 2025', url: 'https://www.arabnews.com/node/2625283/saudi-arabia', notOurs: true },
  GIGA:    { fig: 'US$196bn', label: 'Saudi giga-project contracts awarded, with an US$808bn pipeline', src: 'Knight Frank via The National, 6 Oct 2025', url: 'https://www.thenationalnews.com/business/2025/10/06/contract-value-of-saudi-giga-projects-jumps-20-to-196-billion/', notOurs: true },
  EXPO:    { fig: '40M', label: 'Visitors expected at Expo 2030 Riyadh', src: 'Saudipedia', url: 'https://saudipedia.com/en/riyadh-expo-2030', notOurs: true, verify: true },
  OFFPLAN: { fig: '≈70%', label: 'Share of Dubai residential sales made off-plan, before the building exists (Nov 2025)', src: 'Khaleej Times, 11 Dec 2025', url: 'https://www.khaleejtimes.com/business/off-plan-sales-dominate-as-dubai-realty-charges-into-2026' },
};

// ---------------------------------------------------------------- buyer presets ("Viewing for")

export const PRESETS = [
  { id: 'default',    label: 'Everyone',                          order: [4, 5, 6], tiles: ['YYB', 'LIVE', 'MOTF', 'NOOR'],   condense: [],     rows: [],     lead: 'craft-holographic' },
  { id: 'cxc',        label: 'Experience centres',                order: [4, 5, 6], tiles: ['GCC', 'LIVE', 'MOTF', 'GIGA'],   condense: [6],    rows: [1],    lead: 'craft-holographic' },
  { id: 'museum',     label: 'Museums, heritage & public bodies', order: [5, 4, 6], tiles: ['YYB', 'ART', 'MOTF', 'EXPO'],    condense: [4, 6], rows: [2],    lead: 'craft-audio' },
  { id: 'festival',   label: 'Festivals & public art',            order: [6, 5, 4], tiles: ['NOOR', 'LIVE', 'EXPO', 'MOTF'],   condense: [4],    rows: [3],    lead: 'craft-visual' },
  { id: 'brand',      label: 'Brands & launches',                 order: [6, 4, 5], tiles: ['LIVE', 'NOOR', 'MOTF', 'EXPO'],   condense: [5],    rows: [1, 3], lead: 'craft-cgi', craftsFirst: true },
  { id: 'realestate', label: 'Real-estate sales galleries',       order: [4, 6, 5], tiles: ['OFFPLAN', 'GIGA', 'EXPO', 'GCC'], condense: [5, 6], rows: [1],    lead: 'craft-cgi', swap013: true, flagPrevis: true },
];

// ---------------------------------------------------------------- film slots
// origin 'ai': an AI atom to generate (Higgsfield); its badge is required and checked by the build.
// origin 'ybavit': must be made by YBAVIT, never generated. origin 'code': drawn in code here.
// motif + pal drive the stand-in study drawn in code until a film file is listed in js/films.js.

export const STYLE_BLOCK = 'Deep blacks, one cool accent, 35 mm lens, soft haze, no faces in focus, no readable text, no logos, locked or very slow camera, first frame matches last frame, lower-left third kept darker for copy.';

export const SLOTS = {
  'V00-HERO':   { cls: 'H', origin: 'ai', ratio: '16:9 · 1920×1080', len: '8 s seamless loop', mobile: 'V00-HERO-M', motif: 'wall', pal: ['#7fd8ff', '#f2b35b', '#ffffff'], brief: 'A dark architectural experience space at night: a curved LED wall, a reflective floor and a low glass plinth. Content blooms across the wall, spills onto the floor and rises as a soft shape above the plinth. Slow push-in, locked horizon, deep blacks with one cool accent. Keep the lower-left third darker as copy space, and match the first and last frames. Avoid people, readable text, logos and lens flares.' },
  'V00-HERO-M': { cls: 'H', origin: 'ai', ratio: '9:16 · 720×1280', len: '8 s loop', motif: 'wall', pal: ['#7fd8ff', '#f2b35b', '#ffffff'], portrait: true, brief: 'The same space generated natively in portrait: a vertical slice of the curved wall with the plinth in the lower half. Keep the bottom 40% calm and dark for the headline.' },
  'V02-BAND':   { cls: 'B', origin: 'ai', ratio: '21:9 centre-crop of a 16:9 atom · 1920×823', len: '8 s loop', mobile: '16:9 960×540', motif: 'arches', pal: ['#f2b35b', '#c86bff', '#5fd0ff'], brief: 'Dusk, wide and slightly high angle: crowds drift through a large outdoor light installation, with luminous arches, projected ground patterns and a facade glowing in the distance. Keep all action in the central horizontal band so the 21:9 crop loses nothing. Slow lateral dolly; start and end on the same composition. Avoid recognisable real landmarks, flags, faces in focus and readable signage.' },

  'V04-0':  { cls: 'H', origin: 'ai', ratio: '16:9 · 1920×1080', len: '8 s seamless', mobile: 'V04-0-M', motif: 'wall', pal: ['#ffffff', '#f2b35b', '#ffd9a0'], figures: 3, brief: 'Dark executive briefing centre: silhouettes stand before a floor-to-ceiling wraparound LED wall whose white-and-amber light ribbons drift, spill onto a polished floor and return to their start. Locked eye-level wide, subject in the right two-thirds, lower-left third dark. Avoid readable screens, charts, logos and faces; seconds 1–5 also feed V01-A and P01.' },
  'V04-0-M': { cls: 'H', origin: 'ai', ratio: '9:16 · 720×1280', len: '8 s loop', motif: 'wall', pal: ['#ffffff', '#f2b35b', '#ffd9a0'], figures: 2, portrait: true, brief: 'V04-0 generated natively in portrait, subject in the upper two-thirds, lower third free for text.' },
  'V04-1':  { cls: 'S', origin: 'ai', ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'stage', pal: ['#9fd0ff', '#ffffff', '#f2b35b'], brief: 'A silhouetted presenter, back three-quarters to camera, raises an open hand, and the LED stage backdrop morphs from abstract landscape to exploded mechanical form and back. Front-row eye level, cool neutral light, LED spill on the stage. Avoid faces, readable slides, UI and cuts.' },
  'V04-2':  { cls: 'S', origin: 'ai', ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'cloud', pal: ['#3fe0d0', '#ffffff', '#3fe0d0'], brief: 'A cloud of luminous points on a curved interactive wall regroups into clusters at a hand’s touch, then drifts back to its opening state. Shoulder height in a dim room, teal and white on near-black. Avoid numerals, labels, chart axes and maps.' },
  'V04-3':  { cls: 'S', origin: 'ai', ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'turn', pal: ['#4a4f58', '#c27a4a', '#4a4f58'], brief: 'An unbadged generic vehicle or machine sways through 30° on a large display as a soft-focus visitor taps a tablet, shifting its finish graphite → copper → graphite. Eye level, warm key light, glossy reflections. Avoid badges, recognisable models, readable UI and malformed hands.' },
  'V04-3R': { cls: 'S', origin: 'ai', optional: true, ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'turn', pal: ['#b08a5a', '#6b4a32', '#b08a5a'], room: true, brief: 'Same framing in a dim sales gallery: a real-time apartment interior switches from oak and linen to walnut and stone and back at a buyer’s tap. Warm practical light, abstract window view. Avoid recognisable towers, skylines and developer marks; without this clip, the real-estate view keeps V04-3 with the override copy.' },
  'V04-4':  { cls: 'S', origin: 'ai', ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'tunnel', pal: ['#3a6dff', '#f2b35b', '#9fc0ff'], brief: 'LED-wrapped corridor in one-point perspective: abstract milestone markers (light rings, nodes on one line) flow toward camera past two standing silhouettes in an exactly repeating cycle. Deep blue with warm accents. Avoid dates, numerals, text, and walking figures, which break the loop.' },

  'V05-0':  { cls: 'H', origin: 'ai', ratio: '16:9 · 1920×1080', len: '8 s seamless', mobile: 'V05-0-M', motif: 'statue', pal: ['#d99a3a', '#2f5fd0', '#e8c46a'], brief: 'Night gallery: a generic weathered stone figure under one spotlight as projected light paints back ochre, lapis and gold pigment, then fades to bare stone, closing the loop. Three-quarter view, statue right of centre, lower-left third dark, warm spot against cool ambient light. Avoid labels, logos and visitors; seconds 1–5 also feed V01-B and P02.' },
  'V05-0-M': { cls: 'H', origin: 'ai', ratio: '9:16 · 720×1280', len: '8 s loop', motif: 'statue', pal: ['#d99a3a', '#2f5fd0', '#e8c46a'], portrait: true, brief: 'V05-0 generated natively in portrait, statue in the upper two-thirds, lower third free for text.' },
  'V05-1':  { cls: 'S', origin: 'ai', ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'ghost', pal: ['#bfe3ff', '#f2b35b', '#ffffff'], brief: 'In a dark alcove, a life-size figure in generic period dress resolves from drifting particles on an angled glass panel, looks up, then dissolves. Head-on at visitor eye level, faint panel edge visible and no spill on the glass, because the illusion needs darkness and a fixed sightline. Avoid free-floating 360° holograms, daylight and real likenesses.' },
  'V05-2':  { cls: 'S', origin: 'ai', ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'statue', pal: ['#c9b8a0', '#d04a3a', '#ffffff'], scan: true, brief: 'A thin white scan line sweeps a broken sculpture fragment on a plinth, then projected light fills in the missing arm and original paint before receding. Three-quarter view under practical gallery light. Avoid making the restoration look solid, and avoid text.' },
  'V05-3':  { cls: 'S', origin: 'ai', ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'theatre', pal: ['#f2b35b', '#5f8fb0', '#ffe0b0'], brief: 'A circular theatre wrapped in seamless projection of a generic ancient city at dawn or a prehistoric forest, with mist and birds drifting in a cycle and eight to ten silhouettes at the centre. Wide from the rear wall, projector light on floor and shoulders. Avoid recognisable monuments, battle violence and lens flare.' },
  'V05-4':  { cls: 'S', origin: 'ai', ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'table', pal: ['#7fd8ff', '#f2b35b', '#ffffff'], brief: 'Top-down close-up of two pairs of hands on a dark multi-touch table, where illegible archive cards and map fragments slide, expand and settle back into the opening layout. Cool table glow, warm room spill, shallow focus. Avoid faces, legible text, UI chrome and malformed fingers.' },

  'V06-0':  { cls: 'H', origin: 'ai', ratio: '16:9 · 1920×1080', len: '8 s seamless', mobile: 'V06-0-M', motif: 'field', pal: ['#2fe0c8', '#f2b35b', '#2fe0c8'], brief: 'A dark room whose floor and walls carry a projected teal-and-amber particle field; one silhouetted visitor crosses the right two-thirds as the particles part and close behind, with the first and last frames showing the empty room. Locked wide at eye level, lower-left third dark. Avoid flower or calligraphy motifs and faces; seconds 1–5 also feed V01-C and P03.' },
  'V06-0-M': { cls: 'H', origin: 'ai', ratio: '9:16 · 720×1280', len: '8 s loop', motif: 'field', pal: ['#2fe0c8', '#f2b35b', '#2fe0c8'], portrait: true, brief: 'V06-0 generated natively in portrait, visitor path in the upper two-thirds, lower third free for text.' },
  'V06-1':  { cls: 'S', origin: 'ai', ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'cells', pal: ['#5cff9d', '#a06bff', '#5cff9d'], brief: 'Organic, cell-like generative forms swell and pulse across a large wall at dusk in front of small audience silhouettes, with a pulse period that divides 8 s exactly. Locked wide, bioluminescent green and violet. Avoid text, weather icons, numerals and strobing.' },
  'V06-2':  { cls: 'S', origin: 'ai', ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'field', pal: ['#e6f0ff', '#7fa8d8', '#e6f0ff'], shards: true, brief: 'A visitor walks the length of a projection wall as ripples and glass-like shards bloom from their outline, follow them and heal behind; the wall is empty in the first and last frames. Side-on wide with small depth sensors on the ceiling truss, cool white on charcoal. Avoid tracking suits, markers and a broken body outline.' },
  'V06-3':  { cls: 'S', origin: 'ai', ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'pulse', pal: ['#ff3b3b', '#ffd6b0', '#ff7a5a'], brief: 'A hand rests on a softly lit sensor pedestal as suspended strands of LED points pulse outward in a slow heartbeat, about once a second with soft attack and decay, eight beats per loop. Locked mid-shot in a dark room, deep red to warm white. Avoid ECG traces, numbers, medical devices and rows of bare bulbs.' },
  'V06-4':  { cls: 'S', origin: 'ai', ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'spheres', pal: ['#ffe8c0', '#5fe0ff', '#ffe8c0'], brief: 'A ceiling grid of glowing spheres on thin vertical cables rises and falls in a slow 4 s wave, two cycles per loop, with colour following the crest. Locked low-angle wide, warm white to cyan. Avoid crossing cables and jitter; models still fail at physics, so render this one in-house if the cables misbehave.' },

  'V07-04': { cls: 'B', origin: 'ai', ratio: '21:9 · 1920×823', len: '8 s seamless', mobile: '16:9 · 960×540', motif: 'ghost', pal: ['#e8f4ff', '#f2b35b', '#ffffff'], object: true, brief: 'Seen at eye level from the front seats, an unbranded product form fades up as a reflection in a faintly visible angled glass plane above a low black stage. It turns once and fades back to the empty first frame, with the camera locked off and the object in the middle half of the frame. True-black surround, a cool-white key and an amber rim on the object only, with no spill on the glass; avoid walk-around holograms, daylight, faces, text and logos.' },
  'V07-05': { cls: 'B', origin: 'ai', ratio: '21:9 · 1920×823', len: '8 s seamless', mobile: '16:9 · 960×540', motif: 'corner', pal: ['#29e0ff', '#ff3fb4', '#ffffff'], brief: 'A blank L-shaped LED screen wraps the corner of a generic dark building at night, filmed locked-off at eye level from the anamorphic sweet spot across the street. A glossy abstract fluid wave swells past the screen edges and draws back, ending on the empty frame it began with. Cyan and magenta on dark masonry, with the corner centred; avoid signage, landmarks, people, cars and text.' },
  'V07-07': { cls: 'B', origin: 'ai', ratio: '21:9 · 1920×823', len: '8 s seamless', mobile: '16:9 · 960×540', motif: 'facade', pal: ['#8fb4ff', '#f2b35b', '#d9c7a8'], brief: 'A locked-off wide shot from a plaza of a generic classical facade at night (not a real landmark). Projected light traces the windows and cornices as the facade seems to fold open in panels, then settles back to its first frame. Warm stone under cool projected tones, with light on the facade only; avoid flares, spill into the sky, faces and signage.' },
  'V07-08': { cls: 'B', origin: 'ai', ratio: '21:9 · 1920×823', len: '8 s seamless', mobile: '16:9 · 960×540', motif: 'orbits', pal: ['#f2b35b', '#3b5bd0', '#ffd08a'], brief: 'A dark circular room ringed by speaker arrays at ear height, with three or four seated listeners silhouetted small at its centre. Soft amber orbs orbit at head height through blue-black, and one completes its circle in 8 s to close the loop; the camera is slightly elevated and locked off, keeping heads and orbits in the middle half of the frame. Avoid faces, waveform graphics, cables and text.' },
  'V07-09': { cls: 'B', origin: 'ai', ratio: '21:9 · 1920×823', len: '8 s seamless', mobile: '16:9 · 960×540', motif: 'floor', pal: ['#2fd8c8', '#9ff0e8', '#2fd8c8'], brief: 'High three-quarter view of a dim gallery floor. A visitor, seen only from the shins down, walks slowly across as projected shallow water parts around each step and settles behind; they enter and leave within 8 s, so the first and last frames show the calm, empty floor. Teal caustics on the floor only, with the path in the middle half of the frame; avoid faces, shoe logos and ripples that lag the steps.' },

  'S08-1':  { cls: 'S', origin: 'ybavit', ratio: '16:9 contact sheet · 6–8 frames at 1280×720', len: 'static', mobile: '2-column grid', motif: 'storyboard', pal: ['#d9d4ca', '#8a8a8a', '#f2b35b'], brief: 'YBAVIT’s own storyboard of a generic visitor walk (arrival, threshold, reveal, interaction, finale, exit). Greyscale frames with frame numbers and movement arrows; no client names or real venues. Not AI: drawn by the team.' },
  'V08-2':  { cls: 'S', origin: 'ai', preferReal: true, ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540', motif: 'greybox', pal: ['#9aa0a8', '#f2b35b', '#7fd8ff'], brief: 'First choice is a real capture of a grey-box twin, made in-house in Disguise or Unreal; it carries no AI badge. AI fallback: an untextured grey-box hall in flat, neutral light, with a curved LED wall and two projection surfaces playing bright abstracts. Translucent sightline cones fan out from three small mannequins while the camera makes a slow lateral arc at 3 m and returns to its first frame; avoid software UI, logos, readable text and photoreal people.' },
  'V08-4':  { cls: 'S', origin: 'ai', preferReal: true, ratio: '16:9 · 1280×720 split view', len: '≤8 s loop', mobile: '960×540', motif: 'split', pal: ['#9aa0a8', '#f2b35b', '#7fd8ff'], brief: 'First choice is a real pair: YBAVIT’s render next to on-site footage shot from the same camera position, labelled “Pre-vis render / On site · [Client], [Venue], [Year]”. AI fallback: one gallery wall at eye height, locked off and split vertically into grey-box (left) and finished projection (right). The same slow light change plays on both halves so the loop closes; avoid recognisable architecture, signage and people.' },
  'V09-WARP': { cls: 'S', origin: 'ai', ratio: '16:9 · 1280×720', len: '8 s loop', mobile: '960×540 inline', motif: 'warp', pal: ['#f2b35b', '#7fd8ff', '#ffffff'], brief: 'A dark room with a large curved white wall, seen three-quarters on from eye height. A projected calibration grid, bowed and doubled where the wall curves, eases into register; a smooth colour field then locks to the wall’s edges, with faint beam haze from an off-frame truss. Locked-off camera; the motion runs misaligned → aligned → misaligned so the first and last frames match. Avoid numbers, software UI, logos and people.' },
  'V11-REEL': { cls: 'R', origin: 'ai', reel: true, ratio: '16:9 · HLS 360p–1080p, plus a 1080p MP4', len: '60 s, up to 90 s once real footage exists · no loop', mobile: 'same stream', motif: 'wall', pal: ['#f2b35b', '#7fd8ff', '#ffffff'], brief: 'Atoms cut to licensed music in venue order (centres, museums, art, crafts, pre-vis, show control), with sound cues captioned and an end card carrying the CTA. Burn the labels into the video inside the 5% safe area: “Concept visualisation · AI-generated” on every AI shot and “Project footage · [Client], [Venue], [Year]” on real footage. No more than three flashes per second, no client logos and no imitation software screens.' },
  'V12-CLOSE':   { cls: 'H', origin: 'ai', ratio: '16:9 · 1920×1080', len: '8 s loop', mobile: 'V12-CLOSE-M', motif: 'wall', pal: ['#f2b35b', '#4a5fa0', '#ffcf8a'], dusk: true, brief: 'The V00-HERO space after the show, generated with V00-HERO’s first frame as reference. The curved LED wall settles into a slow, low-contrast dusk gradient with a faint ember of the earlier bloom. The camera, on-axis at eye height, drifts back for 4 s and eases forward again so the first and last frames match; keep the lower half of the frame in deep shadow as space for the text, and avoid people, text, logos, lens flares and fast motion.' },
  'V12-CLOSE-M': { cls: 'H', origin: 'ai', ratio: '9:16 · 720×1280', len: '8 s loop', motif: 'wall', pal: ['#f2b35b', '#4a5fa0', '#ffcf8a'], dusk: true, portrait: true, brief: 'V12-CLOSE generated natively in portrait; keep the lower half in deep shadow for the text.' },
};
// Trims and previews are cut from atoms with no new generation.
export const TRIMS = {
  'V01-A': 'V04-0', 'V01-B': 'V05-0', 'V01-C': 'V06-0',
  P01: 'V04-0', P02: 'V05-0', P03: 'V06-0', P04: 'V07-04', P05: 'V07-05', P06: 'V09-WARP', P07: 'V07-07', P08: 'V07-08', P09: 'V07-09', P10: 'V08-2',
};
export const PREVIEW_OF = { '01': 'P01', '02': 'P02', '03': 'P03', '04': 'P04', '05': 'P05', '06': 'P06', '07': 'P07', '08': 'P08', '09': 'P09', '10': 'P10' };

// ---------------------------------------------------------------- venue chapters 04-06

const venueLayout = (n, objPos) => [
  `Desktop (12 col): opener is min-height 100svh with the film full-bleed, “${n}” top-left and the badge bottom-right on plates. Text block cols 1–7, bottom inset max(5svh, safe-area + 1rem): eyebrow in mono label, headline in --text-display with text-wrap: balance, subhead in --text-lead held to cols 1–5.`,
  'T2 below: steps in cols 1–5, each min-height 75svh with content centred, plus padding-bottom 20svh after the outcome. Figure in cols 6–12, position: sticky at header + margin, aspect-ratio 16/9, code chip top-left, badge bottom-right. Inactive steps use the muted text colour; the active step uses full text and a 2px accent rule.',
  'Tablet (8 col): opener text cols 1–6; portrait viewports (max-aspect-ratio 3/4) load the 9:16 opener. Steps cols 1–4 at 60svh, figure cols 5–8.',
  'Mobile (4 col): the 9:16 opener with text across cols 1–4. The figure sticks full-width at 16:9 under the header; 55svh steps scroll beneath it with scroll-margin-top equal to header plus figure.',
  'Text over video: only the opener carries text, over the radial scrim (0.80 → 0.62 → 0.45 → clear) anchored lower-left; the eyebrow gets its own 0.55 plate.',
  'Spacing: --space-section before the steps and after the outcome, --space-stack between headline and subhead, --space-xs between code and title.',
].concat(objPos ? [objPos] : []);
const venueInteraction = (ids, hash, per) => [
  'Read mode: native scroll, no JS pinning, scrubbing or snapping. The opener’s eyebrow, headline and subhead reveal once (opacity plus a 24px rise, 0.06 s stagger).',
  `Steps: an IntersectionObserver band across mid-viewport marks one step aria-current="step" (on phones the band sits below the sticky figure and is set in px from window.innerHeight). Each change crossfades the figure in 240 ms, swaps the code chip and reverses on scroll-up. Only one figure plays at a time. Step ids ${ids}; the hash becomes ${hash} once half the chapter is visible.`,
  'Reduced motion or Pause motion: studies and films show as stills; the figure stops sticking and each step shows its own still inline.',
  `Present mode: six beats, cuts and dissolves only. Opener, then one beat per service with only the active step’s text, then the outcome mosaic; ${per} each. Condensed presets show the opener plus one summary beat that lists all four services; E expands to the full six beats.`,
];

export const VENUES = {
  4: {
    anchor: 'cxc', disc: '01', eyebrow: 'Executive & Client Experience Centres (CXCs)',
    headline: 'Your business story, told live.',
    subhead: 'Stand in it: data regroups at a touch, the product changes on request, and your history unrolls as you walk.',
    opener: 'V04-0', openerM: 'V04-0-M',
    steps: [
      { code: '01.1', slot: 'V04-1', note: 'C-suite visitors want story and immersion (Actis).' },
      { code: '01.2', slot: 'V04-2', note: 'Finance visitors want dashboards and ROI views (Actis). Context, not YBAVIT projects: command centres run in all 100 Smart Cities (PIB, 2026).' },
      { code: '01.3', slot: 'V04-3', slotRealEstate: 'V04-3R', note: 'Engineers want hands-on demos (Actis). In the real-estate view: ≈70% of Dubai residential sales were off-plan in Nov 2025 (Khaleej Times).' },
      { code: '01.4', slot: 'V04-4', note: 'No sourced outcome data exists for story tunnels; sell the walk and its refresh plan.' },
    ],
    outcome: { title: 'A story for every visitor, run from one button.', body: 'The same room plays vision to the C-suite, a demo to engineers and live numbers to finance. Show control and a CMS your own staff update keep it running after handover.', note: 'Raise reliability before they do; never quote the unverified ABPM deal-uplift figures.' },
    openerNote: 'Ask who visits and what a good briefing outcome is; linger on the matching step.',
    summaryTitle: 'The whole centre, in four services',
    cta: { text: 'See how one button runs it', to: 'show-control' },
    ctaRealEstate: { text: 'See it before you build it', to: 'previs' },
    context: { text: 'Infosys’s Chennai Experience Centre (2017) pairs self-guided display pods with an immersive briefing room.', src: 'WorldArchitecture', url: 'https://worldarchitecture.org/architecture-news/efvzh/futuristic-workplace-infosys-experience-centre-chennai-by-narsi-associates.html' },
    contextRealEstate: { text: 'DSR’s “The World”, a 478-residence Hyderabad project, has a ~25,000 sq ft experience centre with a multisensory theatre.', src: 'Design Pataki, 2025', url: 'https://www.designpataki.com/dp-cult/the-worlds-immersive-preview-of-luxury-living-in-hyderabad-2/' },
    proof: 'cxc-lead · delivered centre or client quote',
    seconds: 20,
    spec: {
      purpose: 'Show, one sub-service per step, how YBAVIT content lets a centre “demonstrate brand authority, drive enterprise sales, and tell business stories dynamically” (PDF). The buyer owns a CXC or executive briefing centre, often inside one of India’s 2,117 Global Capability Centres. They measure meeting outcomes, uptime and which demos visitors explored, value a story tailored to each visitor’s role, and object first to reliability, then to proving ROI.',
      layout: venueLayout('04'),
      interaction: venueInteraction('s-01-1 to s-01-4', '#cxc', '0:20'),
    },
  },
  5: {
    anchor: 'museums', disc: '02', eyebrow: 'Museum & Heritage Experiences',
    headline: 'Bringing history to life.',
    subhead: 'Stand in it: a broken statue regains its colour and a lost city closes around you.',
    opener: 'V05-0', openerM: 'V05-0-M',
    steps: [
      { code: '02.1', slot: 'V05-1', note: 'Context, not YBAVIT projects: USC Shoah Foundation’s Dimensions in Testimony answers visitors’ questions with recorded testimony.' },
      { code: '02.2', slot: 'V05-2', note: 'India has digitised 4,78,971 artefacts in eight national museums (PIB, 2026); offer to start from the client’s scans.' },
      { code: '02.3', slot: 'V05-3', note: 'Context, not YBAVIT projects: Bhuj’s Smritivan memorial, which has a 360° earthquake theatre, won the Prix Versailles 2024 World Title for interiors. Dim the room if possible; the wraparound reads best large.' },
      { code: '02.4', slot: 'V05-4', note: 'Point to the ArtLens context line: visitor research is the proof museums ask for.' },
    ],
    outcome: { title: 'See it, test it, then build it.', body: 'Every gallery starts as a script and visitor journey and a 3D digital twin of your rooms, so curators approve media, sightlines and flow before anything is fabricated.', note: 'Answer money and risk with a paid pre-vis sprint. Context, not YBAVIT projects: the Science Museum Group tested four prototypes with 32 families.' },
    openerNote: 'Ask what visitors miss today; the baseline is about 27 seconds per artwork (UT Austin).',
    summaryTitle: 'The whole museum offer, in four services',
    cta: { text: 'See it before you build it', to: 'previs' },
    context: { text: 'Visitors who spent 5–10 minutes in Cleveland’s ArtLens went on to explore the galleries for 30–60 minutes.', src: 'Cleveland Museum of Art, 2026', url: 'https://www.clevelandart.org/about/press/cleveland-museum-art-announces-artlens-reimagined-opening-july-23-2026' },
    proof: 'museum-lead · heritage project or visitor-research result',
    seconds: 20, objPos: '60% 50%',
    spec: {
      purpose: 'Show that YBAVIT’s “narrative-first digital content” (PDF) brings history to life without risking the collection or the budget. Directors value education and trust, and measure visitors, dwell time, learning and repeat or out-of-town visits. They object on money, the primary constraint for 76% (Ithaka S+R, 2025), and on risk, since 56% of UK cultural organisations avoid change without “overwhelming proof” (Museums Association, 2025). The headline is YBAVIT’s own Industries-page wording, so site and deck agree.',
      layout: venueLayout('05', 'Difference from 04: the statue sits right of centre, so the film uses object-position 60% 50% on 4:3 viewports.'),
      interaction: venueInteraction('s-02-1 to s-02-4', '#museums', '0:20'),
    },
  },
  6: {
    anchor: 'installations', disc: '03', eyebrow: 'Interactive Art & Digital Installations',
    headline: 'The room responds to you.',
    subhead: 'Stand in it: the light follows your steps, your heartbeat sets the tempo, the ceiling breathes above you.',
    opener: 'V06-0', openerM: 'V06-0-M',
    steps: [
      { code: '03.1', slot: 'V06-1', note: 'This is the repeat-visit answer: the piece changes nightly without new production.' },
      { code: '03.2', slot: 'V06-2', note: 'Context, not YBAVIT projects: Rain Room stops the rain around each visitor and has been permanent in Sharjah since 2018.' },
      { code: '03.3', slot: 'V06-3', note: 'Context, not YBAVIT projects: Lozano-Hemmer’s Pulse Room flashes bulbs to visitors’ heartbeats.' },
      { code: '03.4', slot: 'V06-4', note: 'Context, not YBAVIT projects: Kinetic Rain at Changi took two years to develop; set timelines early.' },
    ],
    outcome: { title: 'Made to be revisited, not just visited.', body: 'Visuals generated live from sound, weather, bodies and data keep the work changing through a festival season or a permanent run. Every site is modelled in 3D first, so commissioners approve what crowds will see before anything is rigged.', note: 'Lead with the 3D site model as the document for permission and safety reviews.' },
    openerNote: 'Ask whether this is a season or a permanent work; the answer sets the refresh plan.',
    summaryTitle: 'The whole installation offer, in four services',
    cta: { text: 'Explore the crafts behind it', to: 'crafts' },
    context: { text: 'teamLab Planets, Tokyo, drew 2,412,495 visitors in 2023.', src: 'Business Wire, 2024', url: 'https://www.businesswire.com/news/home/20240709556561/en/teamLab-Planets-TOKYO-Recognized-by-GUINNESS-WORLD-RECORDS-as-the-most-visited-museum-single-art-group-in-the-world.-A-Massive-Athletics-Forest-to-Newly-Open-in-Early-2025' },
    proof: 'art-lead · installation or festival work with attendance',
    seconds: 15, objPos: '65% 50%',
    spec: {
      purpose: 'Show that YBAVIT’s “artistic, sensory-focused content” for public installations, light festivals, digital art galleries and permanent pop-ups (PDF) earns repeat visits, not a single look. Commissioners measure attendance, awards, hotel occupancy and out-of-town share, and value city image and tourism. They object to permissions, which about 80% of Indian event organisers find difficult, and to novelty that wears off. Vendor names from the PDF (Ultraleap, OptiTrack, Kinect) are kept out of tags until their status is confirmed.',
      layout: venueLayout('06', 'Difference from 04: the passer-by stays out of the lower-left text box at every crop, with object-position 65% 50% on 4:3 viewports.'),
      interaction: venueInteraction('s-03-1 to s-03-4', '#installations', '0:15'),
    },
  },
};

// ---------------------------------------------------------------- craft panels 07a-07e

export const MATRIX = {
  rows: [
    { n: 1, code: '01', name: 'Experience Centres', to: 'cxc', cells: { '04': ['04.1', '04.2†', '04.3', '04.4†', '04.5†'], '05': ['05.1†', '05.2', '05.4'], '07': ['07.1', '07.2†', '07.3'], '08': ['08.2†', '08.3†'], '09': ['09.1†', '09.2'] } },
    { n: 2, code: '02', name: 'Museums & Heritage', to: 'museums', cells: { '04': ['04.1†', '04.2†', '04.3', '04.5†'], '05': ['05.2†', '05.3†'], '07': ['07.1', '07.2†'], '08': ['08.1', '08.2†', '08.3'], '09': ['09.1', '09.2'] } },
    { n: 3, code: '03', name: 'Art & Installations', to: 'installations', cells: { '04': ['04.3†', '04.4†'], '05': ['05.1†', '05.3†'], '07': ['07.2†', '07.3'], '08': ['08.1†', '08.2'], '09': ['09.2'] } },
  ],
  cols: [
    { code: '04', name: 'Holographic', to: 'craft-holographic' },
    { code: '05', name: 'CGI & VFX', to: 'craft-cgi' },
    { code: '07', name: 'Visual content', to: 'craft-visual' },
    { code: '08', name: 'Spatial audio', to: 'craft-audio' },
    { code: '09', name: 'XR & interactive', to: 'craft-xr' },
  ],
};

const craftLayout = [
  'Desktop (12 col): a 21:9 film band runs full-bleed; below it the intro (eyebrow, headline, subhead, body, context, “Used in” chips) sits in cols 1–4 and the services list in cols 5–12: code in col 5, name and explanation in cols 6–10 (≤65ch), labels in cols 11–12. Below 1280px the labels move under the explanation.',
  'Tablet (8 col): code in col 1, text in cols 2–8; intro stacks above.',
  'Mobile (4 col): band at 16:9, everything stacks, labels wrap under each explanation.',
  'Text over video: no copy sits on the band. The badge and Pause film button sit bottom-right inside the safe inset on 0.55 plates.',
  'Spacing: --space-stack below the band, --space-section between panels, hairlines between services. Labels keep the PDF’s casing.',
];
const craftInteraction = (beat, sec) => [
  'Read mode: the band plays muted only while at least half of it is visible; with reduced motion or the global pause it shows a still. Services are always-visible text with their own anchors (#svc-04-2 and so on). “Used in” chips link to the venue chapters.',
  `Present mode: beat ${beat} of 6 (${sec}). The band is capped at 50svh and the services flow into two columns so the panel fits one screen. Dissolves between panels.`,
];

export const CRAFTS = [
  { id: 'craft-holographic', code: '04', letter: 'a', eyebrow: '3D Holographic & Hologram Content Services', headline: 'Presence without glasses.', subhead: 'Spatially aware visual assets built specifically to give the optical illusion of depth without requiring 3D glasses.', subheadSrc: 'PDF',
    body: 'Each effect is an optical technique: a reflection in angled glass, light on fine mesh, a see-through screen, spinning LED blades or an LED lattice. We fix the viewing zone and the room light before we design.',
    context: { text: 'India Gate’s 2022 Netaji “hologram” was a 30,000-lumen 4K projector on a 90%-transparent screen.', src: 'The Week', url: 'https://www.theweek.in/news/india/2022/01/23/pm-modi-unveils-subhas-chandra-boses-hologram-statue-at-india-gate.html' },
    usedIn: [['cxc', 'Experience Centres', '04.1–04.5'], ['museums', 'Museums & Heritage', '04.1, 04.2, 04.3, 04.5'], ['installations', 'Art & Installations', '04.3, 04.4']],
    services: ['04.1', '04.2', '04.3', '04.4', '04.5'], slot: 'V07-04', beat: 2, seconds: 30,
    note: 'Name the technique and where to stand. Pepper’s Ghost fails off-axis and when light spills onto the glass.',
    draft: ['[OPEN QUESTION: Has YBAVIT delivered a live beam-in? If not, 04.3 stays a stated capability, never visualised as a delivered one.]', 'Guardrail: the PDF’s “leap motion sensors” (04.5) appear as hand tracking; 04.3 names no capsule vendor and makes no latency claim.'],
    purpose: 'Pair each service with the optics behind it, so “is that a real hologram?” gets a straight answer. Famous stage holograms were Pepper’s Ghost illusions often wrongly described as holographic.' },
  { id: 'craft-cgi', code: '05', letter: 'b', eyebrow: '3D, CGI, Animation & VFX', headline: 'Pictures that break the frame.', subhead: 'High-end pre-rendered and real-time visual creation pipelines that form the graphical meat of any large-scale spectacle.', subheadSrc: 'PDF',
    body: 'Pre-rendered when every frame must be perfect; real-time when content must answer a cue.',
    context: { text: 'Nike’s 2022 Air Max Day 3D billboard in Shinjuku drew “tens of millions of views within 48 hours”.', src: 'The Drum', url: 'https://www.thedrum.com/news/worlds-best-ooh-ads-ever-7-nike-redefines-spectacle-with-3d-illusion' },
    usedIn: [['cxc', 'Experience Centres', '05.1, 05.2, 05.4'], ['museums', 'Museums & Heritage', '05.2, 05.3'], ['installations', 'Art & Installations', '05.1, 05.3']],
    services: ['05.1', '05.2', '05.3', '05.4'], slot: 'V07-05', beat: 3, seconds: 20,
    note: 'Anamorphic works from one spot, so we pick the screen and the spot first. In India, allow a 20–30-day minimum (afaqs).',
    purpose: 'Show the pipeline behind most of the deck’s pixels, from street illusions to live virtual worlds.' },
  { id: 'craft-visual', code: '07', letter: 'c', eyebrow: 'Visual Content & Creative Direction', headline: 'Architecture that breathes.', subhead: 'Content made for one surface looks wrong on any other, so we measure first.',
    body: 'Motion graphics shaped to ultra-wide and curved LED, projection warped to facades and objects, and stage visuals that react live.',
    context: { text: 'Noor Riyadh 2025 drew 7M+ visitors and set a Guinness record for the “largest artificial intelligence–powered projection mapping on a building”.', src: 'Arab News', url: 'https://www.arabnews.com/node/2625283/saudi-arabia' },
    usedIn: [['cxc', 'Experience Centres', '07.1, 07.2, 07.3'], ['museums', 'Museums & Heritage', '07.1, 07.2'], ['installations', 'Art & Installations', '07.2, 07.3']],
    services: ['07.1', '07.2', '07.3'], slot: 'V07-07', beat: 4, seconds: 20,
    note: 'Mapping is content cut to a measured surface; chapter 09 shows how it is warped and run.',
    draft: ['[COPY CHECK: The PDF gives disciplines 07–09 no summary line. The subheads and body copy for 07c–07e are drafted from their sub-service text, for YBAVIT’s approval.]'],
    purpose: 'Show content cut to a measured surface: wide and curved screens, buildings, objects and live stages.' },
  { id: 'craft-audio', code: '08', letter: 'd', eyebrow: 'Spatial & Immersive Audio Production', headline: 'Sound you can locate.', subhead: 'Sound that moves through the room, cues that land on the frame, zones that keep each story to itself.',
    body: 'Put on headphones and hear it.',
    context: { text: 'Sound at Zayed National Museum runs from single-speaker soundscapes to 130 speakers at the base of its fins.', src: 'Squint/Opera', url: 'https://www.squintopera.com/work/zayed-national-museum/' },
    usedIn: [['cxc', 'Experience Centres', '08.2, 08.3'], ['museums', 'Museums & Heritage', '08.1, 08.2, 08.3'], ['installations', 'Art & Installations', '08.1, 08.2']],
    services: ['08.1', '08.2', '08.3'], slot: 'V07-08', beat: 5, seconds: 30, listen: true,
    note: 'Never on room speakers: binaural only works on headphones. Hand over a pair or the QR code.',
    purpose: 'Let buyers hear spatial audio rather than read about it. A07-08 is proof YBAVIT made itself, not generated; if it isn’t ready the listen card is removed, and stock or AI audio never stands in.' },
  { id: 'craft-xr', code: '09', letter: 'e', eyebrow: 'Extended Reality (XR) & Interactive Content', headline: 'Every visitor gets their own version.', subhead: 'AR and VR for deeper stories, plus walls, floors and gesture stations that answer whoever stands in front of them.',
    body: 'Built on swappable hardware, so the experience outlives any one sensor.',
    context: { text: 'Cleveland Museum of Art visitors who spent 5–10 minutes in ArtLens went on to explore the galleries for 30–60 minutes.', src: 'CMA', url: 'https://www.clevelandart.org/about/press/cleveland-museum-art-announces-artlens-reimagined-opening-july-23-2026' },
    usedIn: [['cxc', 'Experience Centres', '09.1, 09.2'], ['museums', 'Museums & Heritage', '09.1, 09.2'], ['installations', 'Art & Installations', '09.2']],
    services: ['09.1', '09.2'], slot: 'V07-09', beat: 6, seconds: 20, next: true,
    note: 'Each visitor makes their own version, on hardware we can replace.',
    draft: ['Guardrail: WebAR is built and described generically, because 8th Wall’s hosted platform closed on 28 Feb 2026.'],
    purpose: 'Show interaction designed as software: every visitor shapes their own version, on hardware that can be replaced.' },
];
CRAFTS.forEach(c => { c.layout = craftLayout; c.interaction = craftInteraction(c.beat, `0:${c.seconds}`); });

// ---------------------------------------------------------------- chapter 08-12 data

export const PREVIS_STEPS = [
  { code: '10.1 Show Narrative & Storyboarding', title: 'Write the walk first.', body: 'We script the narrative arc and the visitor’s route through the space, then storyboard it frame by frame.', slot: 'S08-1', caption: 'S08-1 · Storyboard · made by YBAVIT', clientCaption: 'Storyboard: the visitor’s walk, frame by frame', note: 'Our team drew these frames. Nothing here is generated.', svc: '10.1' },
  { code: '10.2 3D Digital Twin Pre-vis', title: 'Build the room before the room.', body: 'A full 3D replica of your venue plays the real media on its virtual screens.', tags: ['DISGUISE', 'UNREAL ENGINE'], slot: 'V08-2', caption: 'V08-2 · Grey-box twin', clientCaption: 'Grey-box digital twin of the venue', note: 'Every film so far was a concept. Pre-vis does the same for your real venue.', svc: '10.2' },
  { code: '10.2 · Sightlines & playback', title: 'Check every seat.', body: 'We test sightlines, camera angles and media playback from every standing and seated position.', slot: 'V08-2', overlay: true, caption: 'V08-2 · Hold frame · Illustrative annotation', clientCaption: 'Sightline check · illustrative annotation', note: 'Ask where their VIPs will stand. That’s where the first sightline cone goes.' },
  { code: '10.2 · Pre-vis vs finished', title: 'Hold us to the render.', body: 'The twin and the finished room should match. Compare them here.', slot: 'V08-4', caption: 'V08-4 · AI illustration · not a YBAVIT project', clientCaption: 'Pre-vis beside the finished room · illustration, not a YBAVIT project', note: 'If this comparison is AI-generated, say so before they ask.' },
  { code: '10.1 + 10.2 · Sign-off', title: 'Approve before you invest.', body: 'You sign off the script, storyboard and twin walkthrough before production starts, then approve final looks as test frames on the real surface.', slot: 'signoff', caption: 'Sign-off card · built in code', clientCaption: 'What you approve before production', note: 'Who signs off the twin on your side? Bring them to the kickoff.' },
];
export const SIGNOFFS = ['Script', 'Storyboard', 'Twin walkthrough', 'Sightline study', 'Content inventory'];

export const CUES = {
  fps: 25, length: 60,
  lanes: [
    { id: 'video', name: 'Screens', label: 'VIDEO' },
    { id: 'light', name: 'Lights', label: 'LIGHTING · DMX' },
    { id: 'audio', name: 'Sound', label: 'AUDIO' },
    { id: 'fx', name: 'Effects', label: 'FOG · HYDRAULICS' },
    { id: 'sensor', name: 'Sensors', label: 'LIDAR · OSC' },
  ],
  cues: [
    { q: 'Q1', name: 'Doors open', t: 2, lanes: ['video', 'light', 'audio'] },
    { q: 'Q2', name: 'House to half', t: 9, lanes: ['light', 'audio'] },
    { q: 'Q3', name: 'Hero reveal', t: 18, lanes: ['video', 'light', 'audio', 'fx'] },
    { q: 'Q4', name: 'Sound sweep', t: 28, lanes: ['audio', 'light'] },
    { q: 'Q5', name: 'Fog rise', t: 36, lanes: ['fx', 'light'] },
    { q: 'Q6', name: 'Finale', t: 46, lanes: ['video', 'light', 'audio', 'fx'] },
    { q: 'Q7', name: 'Visitor in zone', t: 54, lanes: ['sensor', 'video', 'audio'] },
  ],
  // blocks: [lane, start, end, kind, label]; kinds: clip, ramp (fade), trig (diamond)
  blocks: [
    ['video', 0, 18, 'clip', 'Pre-show loop'], ['video', 18, 46, 'clip', 'Hero film'], ['video', 46, 60, 'clip', 'Finale'],
    ['light', 2, 9, 'ramp', 'House 100 → 50'], ['light', 9, 18, 'clip', 'Half'], ['light', 18, 24, 'ramp', 'Reveal'], ['light', 28, 46, 'clip', 'Moving lights'], ['light', 46, 52, 'ramp', 'Finale'],
    ['audio', 2, 18, 'clip', 'Ambience'], ['audio', 18, 28, 'clip', 'Score'], ['audio', 28, 46, 'clip', 'Object sweep'], ['audio', 46, 60, 'clip', 'Finale mix'],
    ['fx', 18, 18, 'trig', 'Haze'], ['fx', 36, 36, 'trig', 'Fog'], ['fx', 46, 46, 'trig', 'Hydraulics'],
    ['sensor', 54, 54, 'trig', 'Zone 2'],
  ],
};

export const PHASES = [
  { name: 'Discover', label: 'DISCOVER · ≈2–4 WKS', chips: [], items: ['Workshop notes', 'Audience profiles', 'Venue audit', 'Success metrics', 'Budget range', 'Risk register'] },
  { name: 'Design', label: 'DESIGN · ≈7–14 WKS', chips: ['10.1', '10.2'], items: ['Script and journey map', 'Storyboards', 'Digital twin', 'Pre-vis renders and walkthroughs', 'Sightline study'] },
  { name: 'Develop', label: 'DEVELOP · ≈10–30 WKS', chips: ['04', '05', '07', '08', '09'], items: ['Technical rider (power, rigging, network, control)', 'Content specs and pixel maps', 'Cue sheet and timecode plan', 'Prototypes', 'Production', 'Test frames approved on the real surface'], pulse: ['Technical rider (power, rigging, network, control)'] },
  { name: 'Deploy', label: 'DEPLOY · ≈1–6 WKS ON SITE', chips: ['06'], items: ['Installation', 'Warping and blending', 'Timecode lock', 'Acceptance tests', 'Operator training', 'As-built documentation', 'Source and configuration files', 'CMS handover'], pulse: ['As-built documentation'] },
  { name: 'Support', label: 'SUPPORT · DEFECTS PERIOD, THEN ANNUAL', chips: ['06.3'], items: ['Defect fixes', 'Preventive maintenance', 'Remote monitoring', 'Scheduled content refresh'] },
];
export const CARDS = [
  { title: 'Pre-vis sprint (paid).', body: 'Discover and Design for one space: script, storyboard, twin walkthrough, sightline study and a costed build plan.', draft: 'From [PRICE] · [CONFIRM: client keeps the twin]', link: { text: 'Start here', to: 'next' }, lead: true },
  { title: 'Fixed-scope project.', body: 'Content only, or design-and-build with integration partners. One scope, one price, sign-off at every phase.', draft: 'From [PRICE]' },
  { title: 'Care & refresh.', body: 'Either an annual maintenance contract after the defects period, or content-as-a-service: scheduled seasonal content drops with CMS access.', draft: '[PRICE]' },
];

export const PROOF_KINDS = [
  ['process', 'Storyboards, journey maps, cue sheets, technical riders (shared with permission).'],
  ['previs', 'A real venue twin, or a render beside its on-site capture.'],
  ['capability', 'The 07d binaural audio demo, recorded show-control or media-server sessions, prototypes.'],
  ['quote', 'From a named person, with title and written consent.'],
  ['partner', 'Real platform certifications, or collaborators credited by role.'],
  ['credential', 'ISO or CMMI certificates.'],
  ['metric', 'From YBAVIT’s own delivered work only, with its source.'],
];
export const PEOPLE = ['creative director', 'pre-vis and real-time lead', 'show-control and integration lead', 'producer'];

// ---------------------------------------------------------------- chapters: beats, notes and the four spec blocks

const T1 = (n, colsTxt) => [
  `Desktop (12 col): film full-bleed at 100svh. The text block spans cols ${colsTxt}, bottom-anchored at the outer margin. The chapter number “${n}” sits top-left at the margin in mono; the badge sits bottom-right.`,
];

export const CHAPTERS = [
  { n: 0, anchor: 'cover', title: 'Cover', template: 'T1', live: '0:15',
    beats: [{ sec: 15, label: 'Cover', note: 'Everything you’ll see today is pre-visualisation. That’s exactly how we’ll show you your own venue before anything is built.' }],
    spec: {
      purpose: 'Set the tone in one look. The opening is a film rather than a title slide, and the visitor should understand “immersive content studio” before reading a word. With 74% of viewing time in the first two screenfuls (NN/g), chapters 00 and 01 carry the whole proposition.',
      layout: [...T1('00', '1–7'), 'Order: eyebrow, headline in --text-hero, subhead in --text-lead (max 40ch). Headline to subhead gap --space-stack; eyebrow to headline 0.75em.', 'Tablet: text spans cols 1–6. Mobile: text spans cols 1–4, headline balanced over two lines, the 9:16 film (V00-HERO-M) fills the screen and the text block rises by env(safe-area-inset-bottom).', 'Scrim: a bottom gradient of 72% → 0% over the lower 65% plus a left gradient of 35% → 0% over 55%, about 54% black behind the letters on the brightest frame.'],
      interaction: ['Read mode: the headline reveals on load (600 ms, emphasized-decelerate, rising 24px; no letter-by-letter animation). The scroll cue fades in after 1.2 s. The film plays muted and looped and pauses off-screen or when Pause motion is on.', 'Present mode: a single beat. The click that starts Present mode also requests fullscreen and a screen wake lock and attaches the key map.'],
    } },
  { n: 1, anchor: 'promise', title: 'Promise', template: 'T3', live: '0:45',
    beats: [{ sec: 20, label: 'One sentence', note: 'One sentence: we design, make and run immersive content.' }, { sec: 25, label: 'Three venues', note: 'Three kinds of venue; we’ll walk through each.' }],
    spec: {
      purpose: 'State the offer in one sentence and show that it spans three venue types, so a reader who stops here still knows what YBAVIT sells.',
      layout: ['Desktop: headline cols 1–8 in --text-display, left-aligned, body cols 1–6 beneath. The triptych spans cols 1–4, 5–8 and 9–12: each panel is a 4:5 card holding a muted loop, with label and title lower-left inside the card over a small scrim.', 'Tablet: headline cols 1–8; the triptych becomes a horizontal scroll-snap row, each card 6 of 8 cols wide.', 'Mobile: panels stack full-width at 4:5 with --space-stack between them.', 'Spacing: --space-section above and below the chapter.'],
      interaction: ['Read mode: cards fade up in sequence, 150 ms apart (scroll-driven, CSS only). On desktop a card’s loop plays on hover or focus; on touch devices only the card at least 60% in view plays, one at a time.', 'Present mode: beat 1 headline and body; beat 2 all three cards play together.'],
    } },
  { n: 2, anchor: 'why-now', title: 'The shift', template: 'T3 + band', live: '1:15',
    beats: [{ sec: 40, label: 'Market tiles', note: 'Pick the two tiles closest to the client’s world.' }, { sec: 35, label: 'What we believe', note: 'These three beliefs are why the next chapters look the way they do.' }],
    spec: {
      purpose: 'Show that demand is real and local, then state what YBAVIT believes. Market figures describe other people’s projects and are labelled as such. Four tiles and three beliefs are the limit, because “why now” is the section readers skim fastest. Syndicated “immersive market” forecasts are not headlined: three of them disagree by up to 6×.',
      layout: ['Desktop: the film band runs full-bleed at 21:9 with the headline lower-left in cols 1–8 over the scrim. Below it, four tiles in cols 1–3, 4–6, 7–9, 10–12: figure in --text-display, label in --text-body (max 28ch), source in --text-label, top-aligned on a shared baseline. The beliefs follow in cols 1–4, 5–8, 9–12 as text panels with a numbered mono label and a 1px accent top rule.', 'Tablet: band at 16:9 with the headline in cols 1–6; tiles 2×2; beliefs as a scroll-snap row.', 'Mobile: band at 16:9 with the headline below it; tiles stack 1-up as rows (figure left, label right); beliefs stack.', 'Spacing: --space-section before the band; --space-stack between band, tiles and beliefs.'],
      interaction: ['Read mode: figures never count up. Tiles fade in on entry. Each source link opens in a new tab. The “Viewing for” filter picks which four tiles show.', 'Present mode: beat 1 band, headline and the preset’s four tiles; beat 2 the beliefs, with the band dimmed to 30%.'],
    } },
  { n: 3, anchor: 'offer', title: 'Offer at a glance', template: 'T4', live: '1:00',
    beats: [{ sec: 20, label: 'Plan', note: 'Everything starts with a plan (10).' }, { sec: 25, label: 'Where and what', note: 'Where we work, and what we make.' }, { sec: 15, label: 'Run', note: 'And it all runs from one control system (6).' }],
    spec: {
      purpose: 'One screen that shows all 10 disciplines and how they fit together. It doubles as the deck’s navigation: every tile jumps to its chapter.',
      layout: ['Desktop (fits one screen at 1440×900 and up): headline and subhead top, cols 1–8. The map: the PLAN tile in cols 1–2 runs the full height of the two middle rows; the WHERE row (three tiles) in a nested 3-up grid across cols 3–10 with the WHAT row (five tiles) in a nested 5-up grid beneath; the RUN tile in cols 11–12, also full height. Hairline arrows run Plan → Where/What → Run. In each tile: code and count top-left in mono, name in --text-h3 (max 3 lines), one-liner in --text-body at 72%; all left-aligned.', 'Tablet: four full-width bands in order (Plan, Where 3-up, What 3 + 2, Run) with the arrows turned vertical.', 'Mobile: one list in Plan → Where → What → Run order; each row shows code, name and count, with a link to its chapter. Targets at least 44px.', 'Spacing: tile padding clamp(1rem, 0.5rem + 1vw, 1.5rem); gap equals the gutter.'],
      interaction: ['Read mode: hovering or focusing a tile wakes its preview study behind the text at 60% brightness; never all ten at once. Clicking a tile goes to its chapter. The “Viewing for” filter dims venue tiles outside the preset to 40% without hiding them.', 'Present mode: three beats light Plan, then Where + What, then Run. Number keys 1–9 (0 for 10) jump to a discipline’s chapter.', 'Change from the brief: Read mode attaches no single-character shortcuts (WCAG 2.1.4), so the footer points to the ☰ index rather than “press I”.'],
    } },
  { n: 4, anchor: 'cxc', title: 'Experience Centres', template: 'T1 + T2', live: '2:00', venue: 4 },
  { n: 5, anchor: 'museums', title: 'Museums & Heritage', template: 'T1 + T2', live: '2:00', venue: 5 },
  { n: 6, anchor: 'installations', title: 'Art & Installations', template: 'T1 + T2', live: '1:30', venue: 6 },
  { n: 7, anchor: 'crafts', title: 'Craft explorer', template: 'T5 + T6 ×5', live: '2:30',
    beats: [{ sec: 30, label: 'Matrix', note: 'Find your row: these are the crafts your venue uses. The next five beats open each one.' }, ...CRAFTS.map(c => ({ sec: c.seconds, label: `07${c.letter} ${c.headline}`, note: c.note, craft: c.id }))],
    spec: {
      purpose: 'Buyers find their venue’s row, see the craft services it uses and open any craft. All 17 craft services (04.1–09.2) are spelled out in visible text, one level down, so nothing depends on interaction. This is the deck’s one reader-driven explorer.',
      layout: ['Desktop (12 col): header cols 1–7. The Plan and Run bands span cols 1–12 above and below the grid. Row labels in cols 1–2 (code, venue, link to its chapter); craft columns take two cols each from 3–4 to 11–12, each header showing code, name, service count and an “Open craft ↓” link. Code chips in mono with targets of at least 24px (44px preferred).', 'Tablet (8 col): row labels stay sticky in cols 1–2 on an opaque surface; craft columns scroll horizontally with scroll-snap.', 'Mobile (4 col): five craft accordions, each listing the venues it serves with their codes; several can be open at once, with “Expand all”.', 'Text over video: none; the grid sits on solid surface. Spacing: --space-section around, --space-stack above the grid, 0.75rem cell padding.', 'Matrix logic: an unmarked code is linked to its venue by the PDF’s own wording; a † marks a judgement call that YBAVIT confirms or strikes before launch. Daggers show only in the Draft view.'],
      interaction: ['Read mode: native scroll over a real <table> with <th scope>. Codes jump to their service anchors; column headers jump to the panels. “Viewing for” lights the matching row and dims the rest (Brands lights rows 01 and 03; Real estate lights row 01).', 'Present mode: six beats, 2:30: matrix with the preset’s row lit (0:30), then 07a (0:30), 07b (0:20), 07c (0:20), 07d (0:30, the 0:40 headphone demo extra), 07e (0:20). The short run is two beats: the matrix at legend density, then the preset’s lead panel.'],
    } },
  { n: 8, anchor: 'previs', title: 'See it before you build it', template: 'T2', live: '1:30',
    beats: PREVIS_STEPS.map((s, i) => ({ sec: 18, label: s.title, note: s.note, step: i })),
    spec: {
      purpose: 'Present discipline 10 as the deck’s honest bridge: the films so far show generic venues, and pre-vis shows the buyer’s real venue so it can be checked and signed off before money is committed.',
      layout: ['Desktop (12 col): steps in cols 1–5, each about 75svh tall with a measure of 65ch or less. The sticky 16:9 figure spans cols 6–12 (top = header + margin), with a mono caption beneath naming the current slot and its status.', 'Tablet (8 col): steps cols 1–4, sticky figure cols 5–8.', 'Mobile (4 col): the figure sticks full width at 16:9 under the header; steps scroll beneath it on solid surface and never cover it.', 'Text over video: none. The badge sits bottom-right on a 0.55 plate. Spacing: --space-section around; half of --space-stack between code label, title and body.'],
      interaction: ['Read mode: native scroll; an IntersectionObserver crossfades the figure in 240 ms as each step enters, and reverses on scroll-up. Step 3 holds V08-2 on a frame and draws an SVG sightline overlay (cones, eye-height line, distance rings) captioned “Illustrative annotation”. Step 4 is a pre-vis proof slot: a real before/after pair would get a draggable divider (role="slider"); the AI fallback is a static split.', 'Present mode: five beats. 1 the storyboard sheet; 2 a 400 ms crossfade to the twin; 3 the hold frame with cones drawing in over 400 ms; 4 the comparison with its badge and caption from the first frame; 5 the sign-off card, five approvals ticking in at a 60 ms stagger.'],
    } },
  { n: 9, anchor: 'show-control', title: 'One button, every cue', template: 'T7', live: '1:15',
    beats: [
      { sec: 15, label: 'Timeline', note: 'Nothing you’ve seen so far works without this.' },
      { sec: 15, label: 'GO', note: 'Watch the playhead: every lane fires on the same frame.' },
      { sec: 15, label: 'Warp', note: 'Curved wall? We bend the image to fit it.' },
      { sec: 15, label: 'Day schedule', note: 'This is what your staff touch every day: buttons and a schedule.' },
      { sec: 15, label: 'Sensors', note: 'A visitor stepping into a zone is just another cue.' },
    ],
    spec: {
      purpose: 'Make discipline 06, the least visible and most reliability-critical discipline, readable for buyers who will never open a cue list. Plain-English names first, engineering labels second.',
      layout: ['Desktop (12 col): steps in cols 1–4; the timeline spans cols 5–12, sticky at header + margin. SVG lanes under HTML labels; the x-scale is recomputed with a ResizeObserver so text never shrinks below its type token. It draws an HH:MM:SS:FF ruler labelled LTC with an MTC chip (an illustrative 60 s show at 25 fps, major ticks every 10 s), five lanes (Screens VIDEO, Lights LIGHTING · DMX, Sound AUDIO, Effects FOG · HYDRAULICS, Sensors LIDAR · OSC), clips as blocks, fades as ramps, triggers as diamonds, seven cue hairlines (Q1 Doors open … Q7 Visitor in zone) and a 2px accent playhead with a timecode chip. V09-WARP is a 16:9 inset during the 06.2 step.', 'Tablet (8 col): text above; the timeline runs full width with the inset inline beneath.', 'Mobile (4 col): text above; the timeline becomes a scroll-snapping strip of cue cards (about 85% wide) with arrows and a “3/7” counter; each card shows timecode, cue name and the lanes it fires.', 'Text over video: none. Lanes are told apart by label and hatching, never by colour alone; the one accent marks the playhead and active cue. Ruler 40px, lanes 56px (44px tablet), label column 9rem, cue hit areas at least 44px.'],
      interaction: ['Read mode: steps scroll natively; as each enters, the timeline jumps to that step’s state. “Run the cues” plays a 15 s sweep (the 60 s show at 4×) with a Pause toggle (WCAG 2.2.2); cue pulses stay under three flashes per second. Every cue is a focusable button. “Read as table” shows the same cue sheet as a <table>. With reduced motion the playhead steps cue to cue.', 'Present mode: 1 ruler and lanes draw in, playhead waits at 00:00:00:00 beside a GO hint; 2 Next is GO, the playhead sweeps 15 s with a SYNC LOCKED chip; 3 jump to Q3 Hero reveal, the video lane splits into four output slices and the warp inset plays; 4 the ruler rescales to a 06:00–24:00 day with Open sequence 09:30 and Close sequence 19:00 beside a CMS card; 5 input pills wire into a render node and a sensor event drops Q7 at the playhead.'],
    } },
  { n: 10, anchor: 'process', title: 'How we work together', template: 'T8', live: '1:30',
    beats: [{ sec: 30, label: 'Phases', note: 'These are the same five words as on our website, so nothing you read later contradicts this.' }, { sec: 30, label: 'Deliverables', note: 'Everything under Deploy and Support is a contract deliverable, not a favour.' }, { sec: 30, label: 'Engagements', note: 'Start with the sprint. It’s small and paid, and it answers the risk question before anything else.' }],
    spec: {
      purpose: 'Answer “what do we get, when, and how do we pay?” using the phase names YBAVIT already publishes (Discover · Design · Develop · Deploy · Support). Support gets equal billing, and handover items follow standard AV practice.',
      layout: ['Desktop (12 col): five phases in an equal nested repeat(5, minmax(0, 1fr)) grid across cols 1–12. Each column: phase name (--text-h3), mono duration and discipline chips, then the deliverables. A 2px rule joins the headers. Three engagement cards below at cols 1–4, 5–8, 9–12, equal height, card 1 outlined in the accent.', 'Tablet (8 col): phases scroll-snap horizontally, each about 5 of 8 columns wide, the next one peeking in. Cards stack.', 'Mobile (4 col): a vertical stepper with a numbered rail. Every list stays open. Cards stack.', 'Text over video: none. Solid surface makes this the deck’s quiet reading room. Spacing: --space-section around; --space-stack between strip and cards.'],
      interaction: ['Read mode: all content is visible on load. On first view, items fade up over 150–250 ms at a 60 ms stagger, gated by @supports (animation-timeline: view()) and prefers-reduced-motion: no-preference.', 'Present mode: 1 phase headers and durations draw in left to right at 80 ms as the joining rule fills; 2 deliverables fade in and chips light, “Technical rider” and “As-built documentation” pulse once; 3 the strip collapses to its headers over 400 ms and the cards rise, card 1 outlined.'],
    } },
  { n: 11, anchor: 'proof', title: 'Proof & people', template: 'T9', live: '1:30',
    beats: [{ sec: 60, label: 'Reel', note: 'Sound on. AI shots are badged; real footage names client and year.' }, { sec: 30, label: 'Proof and team', note: 'These are the people you would work with every day.' }],
    spec: {
      purpose: 'Put checkable evidence where buyers expect case studies, without inventing any. YBAVIT has no published projects, so its proof is what it has made, what it can demonstrate, and who will vouch for it. Every proof slot is typed: placeholder (Draft view only), fallback (an honest stand-in, or nothing) or real (source, permission and verification date required).',
      layout: ['Desktop (12 col): the reel spans cols 1–8 at 16:9; the three lead proof slots chosen by the preset stack in cols 9–12, matching the player’s height. Below: remaining proof cards 3-up and people cards 4-up.', 'Tablet (8 col): reel full width; everything else 2-up. Mobile: everything 1-up; people photos at 4:5.', 'Text over video: poster only; the play control sits lower-left on a 0.55 plate. Card padding --space-stack; a mono source line anchors the bottom edge of each card.'],
      interaction: ['Read mode: the reel is click-to-play with sound and captions (once it exists). Cards are static; fallbacks read as finished content, never as “coming soon”. The Client view removes every placeholder and reflows the grid.', 'Present mode: 1 the reel plays with sound (the click that started Present mode has unlocked audio), Next fades it out over 400 ms; 2 the reel dims to 40% and the proof grid and people cards appear at a 60 ms stagger.'],
    } },
  { n: 12, anchor: 'next', title: 'Next step', template: 'T10', live: '0:30',
    beats: [{ sec: 30, label: 'Next step', note: 'Ask for the call before you leave the room.' }],
    spec: {
      purpose: 'Ask for one step: scope a paid pre-vis sprint, starting with a 30-minute venue walkthrough call. A scoping call keeps the studio in control of the next step and answers the demand for “overwhelming proof” with the buyer’s own venue.',
      layout: ['Desktop (12 col): as T1. The film runs full-bleed at 100svh. The text block spans cols 1–7, bottom-anchored: eyebrow, headline (--text-h2, smaller so the six-part block fits inside the scrim), subhead, CTA (accent fill, at least 44px), contact line, disclosure (--text-label). Chapter number top-left, badge bottom-right.', 'Tablet: text block cols 1–6. Mobile: cols 1–4 over the 9:16 film; the disclosure moves to a solid band under the film.', 'Scrim: the vertical gradient runs from 0.80 at the bottom to 0.62 at 55% of the height and 0 by 85%, with the left gradient on top. Body text stays in the bottom ≈58%, the headline in the bottom ≈64%.', 'Spacing: block padding-bottom max(5svh, safe-area + 1rem); --space-stack before the CTA and half that between the other items.'],
      interaction: ['Read mode: the film loops muted while in view, with Pause motion. The CTA is a plain mailto link that works without JavaScript, with the address shown as selectable text and a Copy button, because email links don’t open for every viewer.', 'Present mode: one beat. The text staggers in over 600 ms and the email address is shown large for the room. Next does nothing here; the notes say “End · O for index”.'],
    } },
];

// venue chapters take their beats and spec from VENUES
CHAPTERS.forEach(ch => {
  if (!ch.venue) return;
  const v = VENUES[ch.venue];
  ch.beats = [
    { sec: v.seconds, label: 'Opener', note: v.openerNote },
    ...v.steps.map((s, i) => ({ sec: v.seconds, label: s.code + ' ' + svc(s.code).name, note: s.note, step: i })),
    { sec: v.seconds, label: 'Outcome', note: v.outcome.note, step: 4 },
  ];
  ch.condensed = [
    { sec: 15, label: 'Opener', note: v.openerNote },
    { sec: 20, label: 'Summary', note: 'Name all four. E expands this chapter to its full six beats.', summary: true },
  ];
  ch.spec = v.spec;
});

export const chapterBy = (anchor) => CHAPTERS.find(c => c.anchor === anchor);

// What each film shows, for screen readers. The briefs above are production notes and never reach the page.
const ALT = {
  'V00-HERO': 'A dark experience space where light blooms across a curved LED wall and over a reflective floor.',
  'V02-BAND': 'Crowds at dusk walking through a large outdoor light installation of glowing arches.',
  'V04-0': 'Visitors standing before a floor-to-ceiling LED wall of drifting white and amber light in a briefing centre.',
  'V04-1': 'A presenter raises a hand and the LED stage behind changes from a landscape to an exploded product view.',
  'V04-2': 'A cloud of points on an interactive wall regroups into clusters at a touch.',
  'V04-3': 'A product on a large display turns and changes finish as a visitor taps a tablet.',
  'V04-3R': 'An apartment interior on a sales-gallery screen switches between two sets of finishes.',
  'V04-4': 'An LED-wrapped corridor where rings of light flow past two visitors.',
  'V05-0': 'A spotlit stone statue in a night gallery as projected light restores its original colours.',
  'V05-1': 'A life-size figure forms from light on an angled glass panel in a dark alcove, then fades.',
  'V05-2': 'A scan line sweeps a broken sculpture and light fills in its missing arm and paint.',
  'V05-3': 'A circular theatre wrapped in a projected ancient city at dawn, with visitors at the centre.',
  'V05-4': 'Hands on a touch table moving archive cards and map fragments.',
  'V06-0': 'A visitor walks through a dark room and a field of light particles parts around them.',
  'V06-1': 'Glowing cell-like forms swell and pulse across a large wall in front of a small audience.',
  'V06-2': 'Ripples and glass-like shards follow a visitor walking along a projection wall.',
  'V06-3': 'Strands of light pulse like a heartbeat around a hand resting on a sensor pedestal.',
  'V06-4': 'A ceiling grid of glowing spheres rises and falls in a slow wave.',
  'V07-04': 'A product form appears as a reflection in angled glass above a dark stage, turns once and fades.',
  'V07-05': 'A glossy shape seems to burst out of an L-shaped LED screen on the corner of a building.',
  'V07-07': 'Projected light traces a classical facade at night as its panels seem to fold open.',
  'V07-08': 'Soft orbs of light circle seated listeners in a dark room ringed with speakers.',
  'V07-09': 'Projected water on a gallery floor parts around a visitor’s steps.',
  'S08-1': 'A storyboard of a visitor’s walk: arrival, threshold, reveal, interaction, finale and exit.',
  'V08-2': 'A grey-box model of a hall with a curved LED wall, two screens and three small figures.',
  'V08-4': 'One gallery wall split in two: the pre-vis model on the left, the finished projection on the right.',
  'V09-WARP': 'A projected grid bends into register on a curved white wall, then a colour field locks to its edges.',
  'V11-REEL': 'A one-minute reel of the concept films, in venue order.',
  'V12-CLOSE': 'The opening space after the show, its LED wall settled into a calm dusk gradient.',
};
for (const [id, a] of Object.entries(ALT)) { SLOTS[id].alt = a; if (SLOTS[id + '-M']) SLOTS[id + '-M'].alt = a; }
