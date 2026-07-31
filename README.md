# Project Chimera — The Last Test Before Launch

A 25–30 minute cinematic simulation for final-year computing students. The player is the Lead
Integration Architect brought into a failing pre-launch programme with 48 hours before a Go/No-Go
board meeting.

It is built as a **state-driven film**, not twenty dashboards: media plays, one prompt appears, only
the required control appears, the decision is captured, interaction is replaced by feedback,
variables move, the story routes on.

---

## Running it

```bash
npm install
npm run dev
```

`npm run build` · `npm run typecheck`

## Source of truth

Two documents govern this build, and where a generated mockup conflicts with them the master prompt
wins (its section 21):

- `project_chimera_page_by_page_replication_master_prompt.md` — layout, tokens, media timing, routes
- `project_chimera_story_asset_bible_v1 (1).md` — story, characters, script, asset register

**`ASSET_QA.md` is required reading before touching a page.** It records every place the delivered
media diverges from what the documents assume, and every conflict still awaiting a decision.

## Layout

```
src/
  lib/stage.tsx          FixedStage + Box — the 1920x1080 coordinate system
  media/assets.ts        video + plate manifest, segment table
  media/MediaSequence    the media engine: play, hold, switch to plate, skip
  media/voice.ts         26 voiceover lines with measured durations
  state/simStore.ts      SimState, failure checks, outcome band, metric toasts
  components/            PageShell, brand, controls, countdown
  pages/                 one file per route
public/assets/           13 clips, 17 plates, 26 VO lines, 2 manifests
public/references/       the 20 page mockups, P01–P20
```

`_source/` holds the generation masters (208 MB of 5504×3072 stills and pre-transcode clips). It is
git-ignored — the 1920×1080 delivery copies in `public/assets` are canonical.

## Decisions baked in

**Tailwind spacing is 1:1 with pixels** (`--spacing: 1px`). The master prompt's blueprints mix
`h-[64px]` with `gap-16`, `px-28` and `mt-6`. Under Tailwind's default scale `gap-16` is 64px, which
would break the brand lockup and put 24px between an 18px title and its 9px subtitle in a 54px box.
The blueprints mean raw pixels, so every one of them is now correct exactly as written.

**Media never gates interaction.** Section 17 says so explicitly, and it matters: measured against
the section 15 timing table, 12 of 14 media windows are shorter than the voiceover they must carry.
Pages reveal UI on the published schedule and let audio finish underneath rather than re-timing the
film. See `ASSET_QA.md` section 5.1.

**Plates hold the final image, not the first.** On reduced motion, a failed load, or a rejected
autoplay, `MediaSequence` falls back to the *last* cue's plate — the "final held image" the placement
manifest specifies — not the plate of whichever cue it stopped on.

**The brand mark is a placeholder.** The mockups show four different marks across the twenty pages
(lion, gryphon, hexagon, compass) and neither document specifies one. `ProjectChimeraMark` is a
neutral stand-in; swapping it changes nothing else.

## State of the build

| | |
|---|---|
| Media | complete — 13 clips, 17 plates, 17 segment frames |
| Voiceover | complete — 26 lines, −16 LUFS, transcripts included |
| Routes | all 20 exist and are walkable |
| Page 01 | built |
| Pages 02–20 | scaffolded |

Five pages are additionally blocked on a decision, flagged in-app on the stub and listed in
`ASSET_QA.md` section 7.

## Known advisory

`npm audit` reports a high-severity react-router advisory (RSC Mode CSRF Bypass, GHSA-qwww-vcr4-c8h2).
It affects every published 7.x from 7.12 onward and has no fixed release. **It does not apply here** —
this is a pure client-side SPA with no RSC, no server actions and no loaders; the only router APIs
used are `BrowserRouter`, `Routes`, `Route`, `Navigate` and `useNavigate`. Recheck when a patched
version ships rather than downgrading seven minor versions to silence it.
