# Project Chimera — Asset QA Report

Date: 2026-07-31
Scope: the media and voiceover layers, and the conflicts the app had to resolve to use them.

---

## 1. What shipped

`public/assets/` is the delivery tree. `_source/` holds untouched masters and is not served.

| Group | Count | State |
|---|---:|---|
| Video, 1920×1080 H.264 faststart | 13 | delivered |
| Plates, 1920×1080 PNG | 17 | delivered |
| Segment fallback frames | 17 | delivered |
| Page reference mockups `P01–P20` | 20 | delivered, renamed |
| Voiceover lines | 26 | delivered |
| Transcripts | 26 | delivered |
| Ambience, SFX, captions | 0 | deferred by request |

Source clips were 1276×720; Kling generations are 1280×720. All are lanczos-upscaled to the
1920×1080 stage. Delivered plates P01–P08 are pixel-exact freeze frames of their own clips, so the
"switch invisibly to its matching plate" step in master §1.5 is a true match rather than an approximation.

---

## 2. Defects found in the existing footage

### 2.1 The A/B/C/D segment convention does not hold — blocking

Bible §4 defines a fixed reaction convention:

| Segment | Time | Adebayo | Chidi | Folake |
|---|---:|---|---|---|
| A | 0–3s | neutral | focus | reading |
| B | 3–5s | reading / call | watching | looks up |
| C | 5–8s | approval | strain | concern |
| D | 8–10s | withheld response | relief | approval |

What the footage actually contains:

- **V01 Adebayo** — downward gaze from 0–8s, lifts to camera only at ~8–10s. There is **no approval beat
  anywhere in the clip**. Segment A is not neutral direct-address, and segment C is not approval.
- **V02 Chidi** — checks his watch 0–5s, direct address ~5–8s, and genuinely smiles/relaxes 8–10s.
  Segment D reads as relief correctly; A/B read as "waiting", not "focus".
- **V03 Folake** — reads a folder throughout, looking up briefly around 3–5s. Segments C and D are
  near-identical; there is no distinct concern-vs-approval contrast.

Consequences for specific pages:
- Page 05 wants V01 segment A as "Adebayo neutral" → she is looking down, not addressing the player.
- Page 06 strong feedback wants V01 segment C as approval → not present. **This is why V13 was generated.**
- Page 12 wants V03 segment D as approval → indistinguishable from segment C.

Recommendation: treat the segment table as a target, not a description of the current footage, and
re-time it per clip against the delivered `plates/segments/*.png` frames before wiring the media engine.

### 2.2 Character identity drift

Folake's face differs noticeably between V03, V05 and V06. Adebayo's differs between V01 and V05.
This is generation drift across separate clips and cannot be fixed by editing. It is tolerable at the
cut lengths the script uses, but it breaks the bible §12 continuity rule if any two of those clips are
shown back to back.

### 2.3 V09 was missing entirely

The register lists nine existing videos. Only eight exist. `V09a_Abuja_establishing_3shot_SOUND_10s.mp4`
was never produced, which blocks Page 01 (first 3.5s) and the Page 15 montage. It has now been generated.

---

## 3. New media generated

Kling 3.0 `std` (720p) for video, Nano Banana Pro 2k for images, per instruction.

| Asset | Why | Identity lock |
|---|---|---|
| `P15_ChimeraRoom_empty_daylight.png` | **Mandatory.** Replaces the banned night plate. Blocks pages 16, 17, 20. | rebuilt from the night plate's own geometry |
| `P16_Apex_University_exterior_daylight.png` | Crisis context / parallax | — |
| `P18_Executive_room_daylight.png` | Page 18 needs daylight; P08 is an evening plate | P08 reference |
| `P09_Abuja_establishing_morning.png` | Fallback plate + start frame for V09 | — |
| `P17_Student_room_phone_daylight.png` | Fallback plate + start frame for V10 | — |
| `V09a_Abuja_establishing_3shot_SOUND_10s.mp4` | Missing from the register | from P09 |
| `V10_student_phone_aftermath_5s.mp4` | Bible §6 Priority A | from P17 |
| `V11_Adebayo_VC_call_6s.mp4` | Bible §6 Priority A | P01 Adebayo start frame |
| `V12_board_absorbs_recommendation_8s.mp4` | Bible §6 Priority A | P08 exec room start frame |
| `V13_Adebayo_approval_5s.mp4` | **Not in the brief.** Fills the approval gap in §2.1 that Page 06 and the Page 15 montage both depend on. | P01 Adebayo start frame |

Notes:
- Both pure text-to-video jobs failed on submission. Every image-to-video job succeeded. The working
  pipeline is **Nano Banana Pro still → Kling `start_image`**, which also yields the fallback plate the
  spec wants for every clip. Use that pattern for any further video.
- `V12` drifts across its 8 seconds — three faces change perceptibly. Cut it to ~3s in the montage rather
  than holding the full clip.
- The first `P16` attempt returned South Asian architecture and non-Nigerian students; it was regenerated
  with explicit West African material cues (laterite, ochre render, rust roofing, Ankara, mango trees).
- No generated asset contains UI text, metrics, defect data, UAT letters or readable signage, per master §14.

---

## 4. Mockup-vs-spec conflicts

The master prompt (§21) states it wins over any mockup. These are the places that matters.

| Page | Mockup shows | Master requires |
|---|---|---|
| 11 | Steps named Compliance Lead / Product Owner / Security Lead / QA-UAT Lead / Business Sponsor, over a boardroom presentation | C=UAT Test Completion, A=Defect Resolution, D=QA Sign-Off, B=Pilot University Sign-Off, E=CTO Final Approval, over `P12_UAT` |
| 14 | GO LIVE / DELAY LAUNCH / PARTIAL LAUNCH | Full Launch / Phased Launch / Delay Launch |
| 16 | Compact 5-row record card with FINISH / EXPORT | Five-section **scrolling** debrief: 6 start/end metrics, time breakdown, 7 accordion rows, 8 reflection questions, export + redo |
| 19 | Rocket mission-control room, launch pad, non-Nigerian operators | `P06_RED_BOARD`, daylight and quiet. Master §1.1 explicitly forbids "science-fiction command centre" |
| 20 | Breaking-news TV panel, non-Nigerian cast | "No breaking-news spectacle is required" |
| 03 | Character is not Chidi as specified | Chidi: early 30s, navy shirt, ID lanyard |
| all | Brand mark differs per page — lion, gryphon, hexagon, compass | One lockup |

Pages 19 and 20 are the serious ones: both break the locked visual direction, not just details.

---

## 5. Voiceover

**26 lines delivered** (not 22 — the earlier count missed the three page 16 band variants).
Adebayo 14, Chidi 6, Folake 5, student 1. WAV 44.1 kHz / 16-bit mono, normalised to −16 LUFS.
Casting, per-line settings and durations are in `public/assets/manifests/audio_manifest.json`.

Voices were chosen from the ElevenLabs library on **written metadata**, matched to the bible §3
direction notes. They were **not auditioned by ear**. Confirm before locking; one alternate per role
is recorded in the manifest.

### 5.1 The media timing tables do not fit the script — needs a decision

Master §15 publishes a "UI appears" time per page. Measured against the actual VO, **12 of 14 windows
are too short**. The tables were written before the audio existed.

| Page | VO length | Published window | Over by |
|---|---:|---:|---:|
| P02 | 14.81s | 6.2s | **+8.6s** |
| P03 | 11.47s | 3.7s | **+7.8s** |
| P10 | 18.43s | 12.7s | +5.7s |
| P09 | 6.46s | 2.2s | +4.3s |
| P13 | 7.01s | 2.8s | +4.2s |
| P12 | 6.73s | 3.2s | +3.5s |
| P06 | 5.20s | 2.6s | +2.6s |
| P04 | 4.92s | 2.5s | +2.4s |
| P07 | 10.26s | 8.5s | +1.8s |
| P05 | 4.41s | 3.2s | +1.2s |
| P01 | 3.81s / 6.50s | 3.5s / 6.0s | +0.3s / +0.5s |
| P11, P14 | — | — | fits as published |

Recommended: **do not re-time the media.** Master §17 already states "Media does not gate interaction",
so reveal the UI on the published schedule and let the VO finish underneath. Only P02, P03 and P10 are
big enough to need a per-page call — P02 in particular is a single five-clause sentence naming all five
systems, which cannot be said in 6.2 seconds at Adebayo's specified 0.94× pacing.

---

## 6. Naming compliance audit

Verified by script against the manifests printed in the source documents.

| Check | Source | Result |
|---|---|---|
| 12 video filenames | master §7 `VIDEO` | **12/12 exact** |
| 14 plate filenames | master §7 `PLATE` | **14/14 exact** |
| VO filename convention | bible §7 | **matches** (`CHM_VO_P01_ADB_01.wav`, `..._phone.wav`) |
| Transcript convention | bible §7 | **matches** (`CHM_TR_P01_ADB_01.txt`) |
| Folder tree | bible §7 | **matches** |
| `P14_..._late_night.png` excluded | master §1.6 | **correct**, source-only |

### 6.1 Corrected

`captions/` was created at `assets/captions/`. Master §8 places it inside `audio/`. Moved to
`assets/audio/captions/`; it was empty so nothing was lost. All manifest caption paths updated.

### 6.2 Deliberate divergences, recorded in the manifests

**VO folder layout — the two documents contradict each other.**

- Bible §7: `audio/vo/<character>/CHM_VO_P01_ADB_01.wav`
- Master §8: `audio/vo/P01_ADB_01.wav` — flat, and no `CHM_VO_` prefix

Bible §7 was followed, because it is self-describing and carries the asset ID. This is not a deviation
from a single source of truth — there isn't one for this path. **Needs a decision.** Switching is a
rename, no regeneration. `audio_manifest.json` now stores full public paths, so code that reads paths
from the manifest is unaffected either way.

**Plate IDs P01–P08: `DRV` not `EX`.** Bible §4 registers these as `CHM-PLT-EX-001…008`, i.e. existing
assets — but no such files were ever delivered (§2.3). They are derived here from their own clips, and
`DRV` is the schema's own code for that. Both IDs are now carried: `assetId` (DRV, accurate) and
`documentAssetId` (EX, as printed), so a lookup by either resolves.

**Four assets have no ID in either document** — `V13`, `P09`, `P17`, `P18`. Numbered in sequence,
flagged `NEW`, rationale recorded per entry.

### 6.3 Pre-existing inconsistency in the source documents

Bible §9 defines the schema as `CHM-[TYPE]-[STATUS]-[NUMBER]`, but §5 and §7 actually use
`CHM-VO-<PAGE>-<SPEAKER>-<NUM>` for voice and transcripts — which has no status field. The delivered
files follow the document's *actual usage*, not its stated schema. Flagging so it is not mistaken for
an error introduced here.

---

## 7. Outstanding

All twenty pages are built. The mockup conflicts in §4 were all resolved in the master prompt's
favour under its section 21, and each resolution is commented at the top of the page that makes it.
The VO overruns in §5.1 were resolved by revealing UI on the published schedule and letting the
voiceover finish underneath, as section 17 allows.

Still open:

1. **Audition the four voices** and confirm or swap (§5). A swap regenerates into identical
   filenames, so nothing downstream changes.
2. **Re-time the segment map** against the delivered segment frames (§2.1). The A/B/C/D emotional
   convention still does not describe the footage; pages currently use the segments that read
   correctly rather than the ones the table names.
3. **Pick the brand mark.** Four different marks appear across the mockups; `ProjectChimeraMark` is
   a neutral placeholder.
4. Remaining audio: 5 ambience beds, 9 SFX, 20 VTT caption files — deferred by request.
5. Optional: `P19_Five_systems_daylight_office_safe_left.png` if the Page 02 left panel covers a face.
6. **Video quality — see §8.3.** Every clip is `std` 720p upscaled to 1080p, and lost bitrate in the
   re-encode. Re-encoding from `_source/` at CRF 16–18 is free; switching to `pro` costs +17%.
7. **Playback stalls between cues — see §8.5.** Open bug, affects every page.

---

## 8. Page 10 recut, and the video quality problem

### 8.1 The verified generation pipeline

Three approaches were tested against one another. Only one holds identity:

| Approach | Result |
|---|---|
| Nano Banana Pro + character Element → still | **Identity holds.** Wide, over-the-shoulder and close-up of Adebayo all read as the same woman. |
| Element passed to Kling 3.0 video | **Fails.** Two tests returned a bearded man and a white woman. The Element carried wardrobe — burgundy blazer, cream blouse — but not the face. `kling_element_ids` was populated on both jobs, so it was applied and simply did not govern identity. |
| Still → Kling `start_image` | **Identity holds** through motion, including a head turn. |

So every clip must be driven from its own still. The working order is
**Nano Banana Pro + Element → still → Kling `start_image` → clip**, and the cut
is assembled by the media engine rather than by the model.

Kling's `multi_shots` / `multi_prompt` parameters are **not reachable** through
this MCP. They are accepted and echoed on submit, then stripped — the stored
job shows `multi_shots: false, multi_prompt: []`. Kling will still cut within a
single clip if the prompt describes shots in prose, but that path forfeits
identity control and is not worth taking.

### 8.2 Canonical Elements

| Name | id | Built from |
|---|---|---|
| `adebayo-cto` | `93ac470c-2b87-4e10-b1f2-7e426a8d3ee7` | P01 Adebayo plate |
| `apex-student` | `ad97a750-934f-4cdf-b7c7-bb3389454e5f` | Nano Banana hostel-room still |
| `folake-qa` | `986513bf-b547-4605-b2cc-b9a2164b2c31` | P03 Folake QA plate |

Each was built from a single reference image. Elements accept several, so
feeding 4–5 frames per character should tighten identity further.

### 8.3 Every clip is std 720p, upscaled — and lost bitrate doing it

**All nine generated clips used `mode: "std"`, which outputs 1280×720.** Never
`pro`, never `4k`. They were then lanczos-upscaled to the 1920×1080 stage.

The upscale added no detail, and the CRF-20 re-encode discarded real data:

| Clip | As generated | As delivered |
|---|---:|---:|
| V09 Abuja | 1284×716 @ 10,311 kb/s | 1920×1080 @ 4,641 kb/s |
| V21 student close | 1284×716 @ 4,334 kb/s | 1920×1080 @ 2,381 kb/s |
| V22 Adebayo VC call | 1284×716 @ 4,319 kb/s | 1920×1080 @ 2,267 kb/s |

Bitrate fell in **every** file. What ships is effectively fake 1080p at around
half the source data rate, and it will read softer than the raw Kling output.

`std` was chosen because the original instruction said "Kling 3.0 at 720p". That
was taken literally and never revisited once the look moved cinematic, which is
exactly where softness costs most.

Cost of the alternatives, preflighted on a 5s clip:

| Mode | Credits | vs std |
|---|---:|---|
| `std` | 7.50 | — |
| `pro` | **8.75** | +17% |
| `4k` | 30.00 | 4× |

`pro` is 1.25 credits more per 5s clip. Native 1080p for all nine existing clips
would have cost about 11 extra credits in total.

**Recommended:** re-encode from `_source/` at CRF 16–18 to stop the compression
loss (free, originals retained), and use `pro` for everything from here.
Regenerating the nine existing clips natively is roughly 90 credits.

### 8.4 Page 10 coverage

Wide on the hostel room → close on her face → silent insert of the phone →
Adebayo on the VC call → Folake. The player meets her before they meet the
problem. Voiceover uses `useVoice` offsets so the student speaks over her own
two shots, the insert plays silent, and Adebayo and Folake speak on their own.

### 8.5 Open bug — playback stalls between cues

After the audio gate opens, `MediaSequence` advances through cuts but stalls
mid-clip: the video element reports `paused: true` at ~0.9s with
`readyState: 4`. Cuts happen; playback does not run through. Found, not
diagnosed. Affects every page, not just page 10.
