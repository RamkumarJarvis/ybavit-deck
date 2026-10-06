# YBAVIT venue walkthrough

YBAVIT's content-services deck as one page that plays two ways: **Read** (native scroll, for the shared link) and **Present** (one beat per click or clicker press, for meeting rooms and LED walls). Thirteen chapters, 48 presenter beats, all 35 services in visible text. Built from the research brief; nothing outside this folder was changed.

Live site: https://ybavit-deck.vercel.app (personal Vercel project `ybavit-deck`, team ramkumarjarvis). Source: https://github.com/RamkumarJarvis/ybavit-deck (personal account, SSH host `github.com`). Every push to `main` redeploys.

Claude artifact copy (private until shared): https://claude.ai/artifact/6pWqV4VeLyuuWyEbZkotJ6

## Files

- `js/content.js`: every word on the page, the 35 services, film slots and briefs, buyer presets, presenter notes, and the four spec blocks (Purpose, On-page copy, Layout and alignment, Interaction and scroll) for each chapter. Edit copy here.
- `tools/build.mjs`: turns the content file into `index.html` (the deck) and `spec.html` (the build spec and film briefs), plus the publish copy in `.artifact/`. It refuses to build if an AI film slot has no brief, the services are not 35 or the beats are not 48.
- `js/deck.js` Read mode · `js/present.js` Present mode · `js/timeline.js` the chapter 09 cue timeline · `js/plates.js` the studies drawn in code · `js/films.js` the film list · `notes.html` the presenter notes window.

## Build and run

```bash
node ybavit/tools/build.mjs
```

macOS blocks the local server from reading the Desktop folder, so it serves a copy. Copy, then start the "ybavit" entry in `.claude/launch.json` (port 5180):

```bash
rsync -a --delete --exclude .artifact ybavit/ /private/tmp/claude-501/-Users-apple-Desktop-Presentation-website/73958cb2-8f13-48fa-a731-68bcd4ef098e/scratchpad/ybavit-site/
```

## Deploy

This folder is its own Git repo (origin = the personal GitHub). After editing: `node tools/build.mjs`, then commit and `git push`; Vercel builds nothing and serves the files as they are.

## Adding the Higgsfield films

1. Generate each slot from `spec.html#films`: paste the shared style block, then the slot's brief. 8 s, 16:9 1080p (the `-M` slots native 9:16), first frame = last frame, no text or logos.
2. Encode with the commands in the research brief and save as `media/films/<SLOT>.mp4`.
3. Add a line to `js/films.js`, for example `'V04-1': 'media/films/V04-1.mp4',`, then publish again with the film in `files`.

The deck swaps the study for the film and shows "Concept visualisation · AI-generated" on its own. Trims (V01-A/B/C, P01–P10) fall back to their source film. S08-1 (storyboard), A07-08 (binaural audio) and the team photos must be made by YBAVIT, never generated.

## Views and presets

- Index (☰) → View: **Draft** shows placeholders in pink, film-slot labels and the Spec button; **Client** hides all of them.
- Viewing for: Everyone, Experience centres, Museums, Festivals, Brands, Real estate. Reorders venue chapters, picks chapter 02's tiles, lights matrix rows. A link ending `#p-museum` opens with that preset.

## Delivery gate (6 Oct 2026)

Design read: a film-first credentials deck for enterprise, museum, festival and real-estate buyers in India and the Gulf, in the language of a venue before doors open. Dial ENERGY 3 / RHYTHM 3 / MOTION 2 (research forbids scroll choreography, so motion goes to film).

- PASS, no invented proof: every figure carries its source; market tiles say "Not YBAVIT projects"; proof, team, contact and prices are Draft-only placeholders; the Client view shows none (checked).
- PASS, AI labelling: studies are labelled "Study drawn in code"; the AI badge appears only when a film file is listed.
- PASS, no em dashes in page copy; placeholders bracketed and pink.
- PASS, one accent (tungsten) for the active chapter, playhead, focus and primary CTA; reasons for colour, type, layout and motif in `spec.html#system`.
- PASS, function: 1440×900 and 390×844, no console errors, no horizontal overflow; Present mode stepped through all 48 beats in order with no errors; under the host's security rules no blocked loads and both fonts load; presets and Client view checked.
- Known limits: the published link cannot install offline or open a second window for notes for most viewers (notes then show on the same screen with S); the query-string features of the brief (`?p=`, `?stage=`) use bare `#p-<preset>` links instead; analytics only dispatch `deck:event` for a future tracker; no leave-behind PDF or QR yet.
