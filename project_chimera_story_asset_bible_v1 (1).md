# Project Chimera — Cinematic Story, Scene Script & Asset Bible v1

## 1. Production intent

**Project Chimera: The Last Test Before Launch** is a 25–30 minute, cinematic, video-led serious simulation for final-year computing students. The player is the **Lead Integration Architect** brought into a failing pre-launch programme with only 48 hours before a Go / No-Go board meeting.

The emotional promise is not “solve some UI tasks.” It is:

> **Make technical decisions under pressure, then watch those decisions become human consequences.**

The player should feel that the architecture, defect triage, UAT process and launch recommendation are all parts of the same story—not four disconnected exercises.

### Locked current visual rules

- Full-viewport, media-led pages.
- Realistic Nigerian people, locations and institutional environments.
- Daylight, morning, afternoon or balanced studio light by default. No night imagery except the deliberately quiet failure/debrief room when narratively required.
- Flat colours only; no gradients.
- **Afacad** for titles, major headings and large display text.
- **Manrope** for UI labels, body copy, buttons, captions, technical information and metrics.
- Progressive UI: only show the information or control needed at that moment.
- Main media must fill the page; UI overlays or integrates with it.
- No persistent profile, notification, location, fake network or system-status chrome.
- Generated clips should be 10 seconds or less.

### Narrative logic preserved from the build script

The production uses the approved 20-page flow, fixed task logic, fixed defect data, fixed crisis branch, fixed UAT order **C → A → D → B → E**, three final launch recommendations, and four failure outcomes.

---

# 2. Core story

## Premise

Project Chimera is a national-scale digital platform connecting five mission-critical education systems across three pilot universities:

1. **Aurora** — Learning Management System
2. **NairaGate** — Payments
3. **VerifyMe** — Identity verification
4. **ScoreVault** — Results and records
5. **WatchTower** — Monitoring and proctoring

The platform goes before the launch board in 48 hours. Critical defects have surfaced. The player must produce a defensible architecture, justify it, triage defects, respond to a public payment crisis, restore UAT integrity, and make the final recommendation.

## Dramatic question

> **Can the player protect the launch without sacrificing the people the system exists to serve?**

## Emotional structure

### Act I — The invitation and the weight
Pages 1–3 establish the institution, the people waiting on the system, and the deadline.

### Act II — Prove your judgement
Pages 4–6 test whether the player can build and defend a coherent architecture.

### Act III — The system becomes personal
Pages 7–10 transform defect allocation into a direct human consequence: a student loses ₦50,000 and trust starts collapsing.

### Act IV — Process under pressure
Pages 11–13 test whether the player respects evidence and sequence rather than rushing toward approval.

### Act V — Own the recommendation
Pages 14–16 force the player to make and live with a launch recommendation based on their own evidence.

### Failure endings
Pages 17–20 show professional consequences without melodrama.

---

# 3. Character bible

## CHM-CHR-ADB-01 — Dr. Amina Adebayo

**Role:** CTO / Executive Sponsor / final authorising authority  
**Existing visual identity:** Nigerian woman, mature, short natural hair, burgundy blazer, composed executive presence.  
**Narrative function:** The standard the player must meet. She never rescues the player and never over-explains. Her silence can be more powerful than a reprimand.

**Voice direction for ElevenLabs**
- Nigerian woman, late 40s to early 50s.
- Standard Nigerian English.
- Calm, low-mid register, precise consonants.
- Never theatrical or “motivational speaker.”
- Controlled warmth only after strong evidence.
- Default pacing: 0.94× natural conversational speed.

**Voice ID placeholder:** `CHM-11L-VOICE-ADB-01`

## CHM-CHR-CHI-01 — Chidi

**Role:** Integration / Operations Lead  
**Existing visual identity:** Nigerian man, early 30s, navy shirt, ID lanyard, technically capable, visibly carrying operational pressure.  
**Narrative function:** He makes the deadline feel real. He is the first character to show strain and the clearest indicator of whether the player’s choices are making the work safer or worse.

**Voice direction for ElevenLabs**
- Nigerian man, early to mid-30s.
- Professional but conversational.
- Slight tiredness under pressure; no exaggerated panic.
- Default pacing: 1.0×.

**Voice ID placeholder:** `CHM-11L-VOICE-CHI-01`

## CHM-CHR-FOL-01 — Folake

**Role:** QA Lead  
**Existing visual identity:** Nigerian woman, late 30s to early 40s, glasses, teal blouse, precise and disciplined.  
**Narrative function:** She represents evidence, process and the people harmed when “small” defects are dismissed.

**Voice direction for ElevenLabs**
- Nigerian woman, late 30s to early 40s.
- Firm, measured, exact.
- Slightly faster than Adebayo, but never rushed.
- Default pacing: 0.98×.

**Voice ID placeholder:** `CHM-11L-VOICE-FOL-01`

## CHM-CHR-PLY-01 — The player

**Role:** Lead Integration Architect  
**Representation:** First-person POV; never show a fixed face.  
**Narrative function:** The player should feel physically present in the room. Use hands, door opening, over-shoulder workstation views and direct eye-line from characters.

## CHM-CHR-STU-01 — Apex University student

**Role:** Human consequence of D-07  
**Representation:** Audio and phone UI only. Do not create a full character unless later required.  
**Voice direction:** Nigerian young adult woman, anxious but controlled, phone-compressed, not crying.

**Voice ID placeholder:** `CHM-11L-VOICE-STU-01`

---

# 4. Existing media register

## Existing video assets

| Asset ID | Filename | Use |
|---|---|---|
| `CHM-VID-EX-001` | `V01_Adebayo_performance_arc_10s.mp4` | Adebayo neutral, reading, approval and withheld-response segments |
| `CHM-VID-EX-002` | `V02_Chidi_performance_arc_10s.mp4` | Chidi focus, watch, strain and relief segments |
| `CHM-VID-EX-003` | `V03_Folake_performance_arc_10s.mp4` | Folake reading, looks-up, concern and approval segments |
| `CHM-VID-EX-004` | `V04_POV_door_opening_5s.mp4` | First-person entry; reused with different colour grades |
| `CHM-VID-EX-005` | `V05_ChimeraRoom_cast_reveal_6s.mp4` | Wide reveal of Chidi, Adebayo and Folake |
| `CHM-VID-EX-006` | `V06_Folake_places_defect_folder_6s.mp4` | Task 2 physical reveal |
| `CHM-VID-EX-007` | `V07_Phone_vibrates_crisis_5s.mp4` | Crisis interruption |
| `CHM-VID-EX-008` | `V08_Executive_three_shot_8s.mp4` | Final boardroom and outcome montage |
| `CHM-VID-EX-009` | `V09a_Abuja_establishing_3shot_SOUND_10s.mp4` | Opening and positive outcome montage |

## Existing plate assets

| Asset ID | Filename | Use |
|---|---|---|
| `CHM-PLT-EX-001` | `P01_Adebayo_project_table_morning.png` | Adebayo close/direct-address state |
| `CHM-PLT-EX-002` | `P02_Chidi_project_table_afternoon.png` | Chidi close/direct-address state |
| `CHM-PLT-EX-003` | `P03_Folake_QA_room.png` | Folake QA state |
| `CHM-PLT-EX-004` | `P04_POV_glass_door.png` | Door fallback / static tier |
| `CHM-PLT-EX-005` | `P05_ChimeraRoom_wide_three_characters.png` | Cast reveal fallback / system overview |
| `CHM-PLT-EX-006` | `P06_ChimeraRoom_red_board_midday.png` | Defect board |
| `CHM-PLT-EX-007` | `P07_Phone_insert_dark_screen.png` | Duplicate-charge UI insert |
| `CHM-PLT-EX-008` | `P08_Executive_room_three_shot_evening.png` | Final decision / confidence failure |
| `CHM-PLT-EX-010` | `P10_UI_workstation_OTS_architecture_canvas.png` | Architecture design, confirm and justify |
| `CHM-PLT-EX-011` | `P11_UI_project_table_OTS_sliders.png` | Engineer allocation |
| `CHM-PLT-EX-012` | `P12_UI_QA_table_workflow_cards.png` | UAT workflow and resolution |
| `CHM-PLT-EX-013` | `P13_Corridor_early_evening.png` | Pre-final parallax and montage |
| `CHM-PLT-EX-014` | `P14_ChimeraRoom_empty_late_night.png` | Debrief and failure endings |

## Existing reaction segment convention

| Segment | Time | Adebayo | Chidi | Folake |
|---|---:|---|---|---|
| A | 0–3s | neutral | focus | reading |
| B | 3–5s | reading / call | watching | looks up |
| C | 5–8s | approval | strain | concern |
| D | 8–10s | withheld response | relief | approval |

---

# 5. Page-by-page cinematic script and shot plan

## PAGE 01 — Mission introduction

**Route:** `intro-01`  
**Narrative purpose:** Put the player physically inside the mission before showing any task UI.  
**Media mode:** Three-shot cinematic sequence.  
**Final UI state:** Headline, 48-hour mission window, Begin Mission, Review Brief.

### Shot sequence

1. `CHM-SH-P01-01` — **Abuja establishing**  
   Asset: `CHM-VID-EX-009`, use first 3–4 seconds.  
   Framing: wide exterior, morning, institutional scale.  
   Audio: city bed, distant traffic, controlled low pulse.

2. `CHM-SH-P01-02` — **Player POV opens glass door**  
   Asset: `CHM-VID-EX-004`, full 5 seconds.  
   Framing: first-person hand, direct movement into the room.  
   Audio: handle, door seal, room tone rising.

3. `CHM-SH-P01-03` — **Cast reveal**  
   Asset: `CHM-VID-EX-005`, full 6 seconds.  
   Framing: Chidi standing, Adebayo centred, Folake seated; all eye-lines toward player.

### Spoken script

`CHM-TR-P01-ADB-01` / `CHM-VO-P01-ADB-01`

> “Project Chimera goes before the launch board in forty-eight hours.”

`CHM-TR-P01-ADB-02` / `CHM-VO-P01-ADB-02`

> “Five systems. Three pilot universities. You are the lead architect. Every decision follows us into that room.”

### Direction

Use Adebayo VO over the establishing and cast reveal. Do not require lip sync. The first interactive UI appears only after the cast reveal holds.

---

## PAGE 02 — Five systems, one platform

**Route:** `intro-02`  
**Narrative purpose:** Explain the dependency chain, not market the product.  
**Media mode:** Full-page plate with controlled 2.5D crop shifts; compact system identifiers appear one at a time.  
**Primary plate:** `CHM-PLT-EX-005` or a daylight crop of `CHM-PLT-EX-002`.

### Camera treatment

- Begin on the room wide.
- Slow 3% digital push toward the workstation/display area.
- Introduce each system as a compact icon-label state, not a large card.

### Spoken script

`CHM-TR-P02-ADB-01` / `CHM-VO-P02-ADB-01`

> “Aurora teaches. NairaGate collects. VerifyMe proves identity. ScoreVault protects results. WatchTower sees what the room cannot.”

`CHM-TR-P02-ADB-02` / `CHM-VO-P02-ADB-02`

> “One failure can pull down the rest.”

### Final UI content

- Aurora — LMS
- NairaGate — Payments
- VerifyMe — Identity
- ScoreVault — Results
- WatchTower — Monitoring

---

## PAGE 03 — Forty-eight hours, one decision

**Route:** `intro-03`  
**Narrative purpose:** Convert the countdown from decoration into pressure.  
**Media mode:** Chidi close performance.  
**Asset:** `CHM-VID-EX-002`, segment C or a 5–8 second crop.

### Shot

`CHM-SH-P03-01` — medium close, Chidi seated, direct eye-line slightly off camera, restrained strain.

### Spoken script

`CHM-TR-P03-CHI-01` / `CHM-VO-P03-CHI-01`

> “The defects arrived this morning. The universities are still waiting.”

`CHM-TR-P03-CHI-02` / `CHM-VO-P03-CHI-02`

> “Forty-eight hours sounds like time—until your first wrong decision costs four.”

### Transition

Freeze on Chidi’s final look, then reveal the Continue control. Do not show unrelated metrics.

---

## PAGE 04 — Architecture design

**Route:** `t1`  
**Narrative purpose:** The player’s first proof of technical judgement.  
**Media mode:** Interactive over-shoulder workstation; no narrative video during construction.  
**Plate:** `CHM-PLT-EX-010`.

### Optional opening line

`CHM-TR-P04-CHI-01` / `CHM-VO-P04-CHI-01`

> “Build something we can defend, not just something that connects.”

### Final-state UI

Show only the architecture canvas and currently available tools. The completed generated design image should represent the final interaction state with Select, Connect, Move, Delete, Reset and Submit visible only because the graph is complete.

### Reaction media

- Valid: `CHM-VID-EX-003`, segment D.
- Invalid: `CHM-VID-EX-002`, segment C.

---

## PAGE 05 — Architecture confirmation

**Route:** `t1-confirm`  
**Narrative purpose:** Force commitment before justification.  
**Media mode:** Completed diagram at centre; small Adebayo reaction inset.  
**Plate:** `CHM-PLT-EX-010`.  
**Reaction:** `CHM-VID-EX-001`, segment A.

### Spoken script

`CHM-TR-P05-ADB-01` / `CHM-VO-P05-ADB-01`

> “A diagram is easy to admire. Is this the architecture you are prepared to defend?”

### Player options

- Confirm architecture.
- Redesign.

---

## PAGE 06 — Architecture justification

**Route:** `t1-justify`  
**Narrative purpose:** Reveal whether the player understands trade-offs or only recognises shapes.  
**Media mode:** Workstation plate with focused writing surface and four criteria.  
**Plate:** `CHM-PLT-EX-010`.

### Spoken script before interaction

`CHM-TR-P06-ADB-01` / `CHM-VO-P06-ADB-01`

> “Tell me why this architecture is right for Chimera—not why it is fashionable.”

### Strong outcome line

`CHM-TR-P06-ADB-02` / `CHM-VO-P06-ADB-02`

> “Good. You have considered the trade-offs.”

### Weak outcome

No spoken reprimand. Use `CHM-VID-EX-001`, segment D, alone. Adebayo reads, looks up briefly, and withholds approval. The silence should carry the failure.

---

## PAGE 07 — Defect board reveal

**Route:** `t2-intro`  
**Narrative purpose:** Shift from architecture theory to live operational consequence.  
**Media mode:** Physical folder reveal, then character reactions, then red board.  
**Assets:** `CHM-VID-EX-006`, `CHM-VID-EX-002` segment A, `CHM-PLT-EX-006`.

### Spoken script — locked from build script

`CHM-TR-P07-CHI-01` / `CHM-VO-P07-CHI-01`

> “Four engineers. Four defects. We cannot treat every problem as equal.”

`CHM-TR-P07-FOL-01` / `CHM-VO-P07-FOL-01`

> “D-07 is taking money twice. From real students.”

### Shot sequence

1. Folder placed on table.
2. Cut to Chidi’s focused reaction.
3. Cut to Folake standing beside red board.
4. Defect UI appears only after the physical folder settles.

---

## PAGE 08 — Engineer allocation

**Route:** `t2`  
**Narrative purpose:** Make scarcity visible. The player cannot fix everything equally.  
**Media mode:** Interactive over-shoulder table.  
**Plate:** `CHM-PLT-EX-011`.

### Optional Folake line

`CHM-TR-P08-FOL-01` / `CHM-VO-P08-FOL-01`

> “Not every defect is equal. But every defect has a person on the other side.”

### Interaction sound

- Slider movement: soft mechanical tick, not gamey.
- Total reaches 100: one subdued confirmation tone.
- Resolution sequence: four separate 500ms outcome cues.

### Final state shown in visual production

- All four allocations visible.
- Total exactly 100.
- Submit Allocation visible.
- No transition or empty-state screenshot.

---

## PAGE 09 — Trust holds

**Route:** `t2-good`  
**Narrative purpose:** Give the player relief, but make it temporary.  
**Media mode:** Chidi relief performance.  
**Asset:** `CHM-VID-EX-002`, segment D.

### Spoken script

`CHM-TR-P09-CHI-01` / `CHM-VO-P09-CHI-01`

> “The payment defect is contained. That buys us trust.”

`CHM-TR-P09-CHI-02` / `CHM-VO-P09-CHI-02`

> “Do not spend it carelessly.”

### Sound rule

The urgency pulse drops out completely here. Room tone only, then a quiet transition into UAT.

---

## PAGE 10 — Duplicate-payment crisis

**Route:** `t2-crisis`  
**Narrative purpose:** Make the player face the human consequence of poor prioritisation.  
**Media mode:** Phone insert, transaction UI, Adebayo call, Folake concern, then decision cards.  
**Assets:** `CHM-VID-EX-007`, `CHM-PLT-EX-007`, `CHM-VID-EX-001` segment B, `CHM-VID-EX-003` segment C.

### Phone/audio sequence

`CHM-TR-P10-STU-01` / `CHM-VO-P10-STU-01`

> “Hello… I was charged twice. Fifty thousand naira. I posted the receipts because nobody answered.”

Apply light phone-band compression and a small room echo. Do not make the student hysterical.

`CHM-TR-P10-ADB-01` / `CHM-VO-P10-ADB-01`

> “The Vice-Chancellor is on the line. What are you telling her?”

`CHM-TR-P10-FOL-01` / `CHM-VO-P10-FOL-01`

> “Before you choose, remember: the system failed. The student did not.”

### Player choices

- Call the student personally, refund and apologise.
- Blame the payment gateway vendor and escalate.
- Ignore it and focus on other defects.

### UI rule

The repeated ₦50,000 charges are live UI, never baked into video.

---

## PAGE 11 — UAT sign-off workflow

**Route:** `t3`  
**Narrative purpose:** Test whether the player respects evidence order under pressure.  
**Media mode:** Cool-graded POV door, Folake performance, interactive QA table.  
**Assets:** `CHM-VID-EX-004`, `CHM-VID-EX-003` segment A, `CHM-PLT-EX-012`.

### Spoken script — locked from build script

`CHM-TR-P11-FOL-01` / `CHM-VO-P11-FOL-01`

> “A sign-off is not a formality. The order is the evidence.”

### Correct order

**C → A → D → B → E**

1. UAT Test Completion
2. Defect Resolution
3. QA Sign-Off
4. Pilot University Sign-Off
5. CTO Final Approval

---

## PAGE 12 — UAT resolution

**Route:** `t3-resolve`  
**Narrative purpose:** Let the correct process visually settle before the final decision.  
**Media mode:** 2× crop and slow push on QA table; Folake approval reaction.  
**Assets:** `CHM-PLT-EX-012`, `CHM-VID-EX-003` segment D.

### Spoken script

`CHM-TR-P12-FOL-01` / `CHM-VO-P12-FOL-01`

> “Now the evidence can move. QA signs. The universities accept. Adebayo authorises.”

### Final state

Show the approved sequence and one Continue action. No metrics dashboard.

---

## PAGE 13 — Evidence summary / corridor pause

**Route:** `pre-final`  
**Narrative purpose:** Give the player one breath before the boardroom and make them confront their own evidence.  
**Media mode:** Slow 2.5D parallax on corridor.  
**Plate:** `CHM-PLT-EX-013`.

### Spoken script

`CHM-TR-P13-ADB-01` / `CHM-VO-P13-ADB-01`

> “The board will not ask whether the work was difficult.”

`CHM-TR-P13-ADB-02` / `CHM-VO-P13-ADB-02`

> “They will ask whether the evidence supports your decision.”

### UI

A single read-only evidence ledger and one button: **Go in.**

---

## PAGE 14 — Final recommendation

**Route:** `final`  
**Narrative purpose:** The player owns a recommendation rather than discovering a hidden correct answer.  
**Media mode:** Warm door entry, match cut into executive three-shot, freeze and reveal options.  
**Assets:** `CHM-VID-EX-004`, `CHM-VID-EX-008`, `CHM-PLT-EX-008`.

### Spoken script — locked from build script

`CHM-TR-P14-ADB-01` / `CHM-VO-P14-ADB-01`

> “Give me your recommendation. And the evidence behind it.”

### Options

- Full Launch
- Phased Launch
- Delay Launch

No option is marked correct or wrong.

---

## PAGE 15 — Outcome montage

**Route:** `outcome`  
**Narrative purpose:** Show consequence, not score.  
**Media mode:** Montage assembled from existing assets; no new media required.

### Excellent / Good sequence

1. `CHM-VID-EX-008` executive room, held warm.
2. `CHM-VID-EX-001` Adebayo approval.
3. `CHM-VID-EX-002` Chidi relief.
4. `CHM-PLT-EX-013` corridor graded to morning.
5. `CHM-VID-EX-009` Abuja morning.

### Developing sequence

Use Adebayo withheld response, Chidi strain, neutral corridor, shortened Abuja.

### Poor sequence

Cut executive reaction short, use withheld/strain reactions, cool corridor, end on empty room.

### Dialogue

No narration. Let music, room tone and reaction shots carry the result.

---

## PAGE 16 — Decision record / debrief

**Route:** `debrief`  
**Narrative purpose:** Turn the player’s route into insight rather than a generic score screen.  
**Media mode:** Empty room with slow push, then analytical UI.  
**Plate:** `CHM-PLT-EX-014`.

### Band-specific closing lines

**Excellent / Good** — `CHM-TR-P16-ADB-EX`

> “You did not chase certainty. You built enough evidence to make a responsible decision.”

**Developing** — `CHM-TR-P16-ADB-DEV`

> “You reached the room, but your evidence arrived damaged. Review where pressure changed your judgement.”

**Poor** — `CHM-TR-P16-ADB-POOR`

> “The outcome began long before the final decision. Trace it back to the first compromise.”

### Required UI content

- Six-variable start/end summary.
- Time used and remaining.
- What consumed time.
- Final outcome band.
- Seven choice insight rows.
- Eight reflection questions.
- Export data.
- Redo Simulation.

---

## PAGE 17 — Failure: time expired

**Route:** `failure-time`  
**Narrative purpose:** Show that repeated indecision is itself a decision.  
**Media mode:** Quiet empty room; no character performance.  
**Plate:** `CHM-PLT-EX-014`, subdued neutral grade.

### Audio

- Air-conditioning hum.
- One distant chair movement.
- No alarm sting.
- No spoken dialogue.

### Headline

**TIME EXPIRED**

---

## PAGE 18 — Failure: confidence collapsed

**Route:** `failure-confidence`  
**Narrative purpose:** Show stakeholder trust as a real launch dependency.  
**Media mode:** Executive room, desaturated; no theatrical reactions.  
**Plate:** `CHM-PLT-EX-008`.

### Audio

Low room tone, muted paper movement, then silence.

### Headline

**PILOT CONFIDENCE COLLAPSED**

---

## PAGE 19 — Failure: readiness critical

**Route:** `failure-readiness`  
**Narrative purpose:** Show that a polished recommendation cannot repair an unsafe system.  
**Media mode:** Red board, cooled and quiet.  
**Plate:** `CHM-PLT-EX-006`.

### Headline

**LAUNCH READINESS CRITICAL**

No alarm animation. The board remains visible behind the evidence table.

---

## PAGE 20 — Failure: crisis mismanaged

**Route:** `failure-crisis`  
**Narrative purpose:** Make the ethical failure land without spectacle.  
**Media mode:** Empty room held for four uncomfortable seconds before UI appears.  
**Plate:** `CHM-PLT-EX-014`.

### Audio sequence

1. Distant phone vibration.
2. A muted notification sound from another room.
3. Four seconds of room tone.
4. Failure panel appears in silence.

### Headline

**CRISIS MISMANAGED — PILOT COLLAPSED**

No spoken dialogue.

---

# 6. New Higgsfield generation requirements

The current asset pack is sufficient to build the complete narrative. New generation is optional and should only fill gaps.

## Priority A — useful additions

| Asset ID | Type | Purpose | Duration |
|---|---|---|---:|
| `CHM-HG-NEW-001` | Insert video | Tight phone screen / social-post aftermath, hands only, realistic Nigerian student environment | 5s |
| `CHM-HG-NEW-002` | Reaction video | Adebayo receives VC call, side-profile medium close, controlled urgency | 6s |
| `CHM-HG-NEW-003` | Reaction video | Boardroom members absorb final recommendation, no celebration, restrained realism | 8s |
| `CHM-HG-NEW-004` | Image plate | Apex University exterior in daylight for crisis context or parallax | still |

## Priority B — only if current plates fail compositionally

| Asset ID | Type | Purpose |
|---|---|---|
| `CHM-HG-NEW-005` | OTS plate | Cleaner architecture workstation with monitor-safe area |
| `CHM-HG-NEW-006` | OTS plate | Cleaner allocation table with UI-safe space |
| `CHM-HG-NEW-007` | OTS plate | Cleaner QA table with five-card safe zone |

Do not generate new characters unless continuity requires it. Existing character media already covers the emotional arc.

---

# 7. Audio and transcript registry

## Folder structure

```text
public/assets/
  video/
  plates/
  audio/
    vo/
      adebayo/
      chidi/
      folake/
      student/
    sfx/
    ambience/
    music/
  transcripts/
  manifests/
```

## Voice file naming

```text
CHM_VO_P01_ADB_01.wav
CHM_VO_P01_ADB_02.wav
CHM_VO_P03_CHI_01.wav
CHM_VO_P07_FOL_01.wav
CHM_VO_P10_STU_01_phone.wav
```

## Transcript naming

```text
CHM_TR_P01_ADB_01.txt
CHM_TR_P01_ADB_02.txt
CHM_TR_P10_STU_01.txt
```

Every spoken asset must have:

- `assetId`
- `page`
- `speaker`
- `verbatimText`
- `voiceId`
- `audioFilename`
- `durationSeconds`
- `captionFilename`
- `status`

---

# 8. Sound asset IDs

| Asset ID | Description |
|---|---|
| `CHM-AMB-001` | Abuja morning exterior |
| `CHM-AMB-002` | Chimera room daytime HVAC and low office movement |
| `CHM-AMB-003` | QA lab room tone |
| `CHM-AMB-004` | Executive room evening tone |
| `CHM-AMB-005` | Empty room quiet failure bed |
| `CHM-SFX-001` | Glass door handle and open |
| `CHM-SFX-002` | Folder placed on table |
| `CHM-SFX-003` | Phone vibration |
| `CHM-SFX-004` | Transaction alert, restrained |
| `CHM-SFX-005` | UI decision confirmation |
| `CHM-SFX-006` | Slider mechanical tick |
| `CHM-SFX-007` | Workflow path connection |
| `CHM-SFX-008` | Evidence ledger row reveal |
| `CHM-SFX-009` | Outcome transition low impact |

Music should never explain emotion the performances already communicate. Use a restrained pulse that can disappear at Page 9 and return at lower intensity in Page 11.

---

# 9. Master asset ID schema

```text
CHM-[TYPE]-[STATUS]-[NUMBER]
```

## Type codes

- `CHR` — character
- `VID` — video
- `PLT` — still plate
- `SH` — shot instance
- `HG` — Higgsfield-generated media
- `VO` — ElevenLabs voiceover
- `TR` — transcript
- `AMB` — ambience
- `SFX` — sound effect
- `MUS` — music cue
- `UI` — page UI state
- `CAP` — caption file
- `MAN` — manifest

## Status codes

- `EX` — existing
- `NEW` — new generation required
- `DRV` — derived crop, grade or parallax from an existing asset
- `ALT` — alternate / fallback

---

# 10. Claude handoff package

## Required files

```text
/project-chimera-handoff/
  01_story_bible.md
  02_scene_manifest.json
  03_asset_manifest.json
  04_dialogue_and_transcripts.csv
  05_audio_manifest.json
  06_media_timing.json
  07_ui_page_map.json
  08_branch_logic.md
  09_lovable_implementation_prompt.md
  assets/
```

## Scene manifest example

```json
{
  "pageId": "P10",
  "route": "t2-crisis",
  "title": "Duplicate-payment crisis",
  "storyPurpose": "Make defect prioritisation become a human consequence.",
  "shots": [
    "CHM-VID-EX-007",
    "CHM-PLT-EX-007",
    "CHM-VID-EX-001:B",
    "CHM-VID-EX-003:C"
  ],
  "voice": [
    "CHM-VO-P10-STU-01",
    "CHM-VO-P10-ADB-01",
    "CHM-VO-P10-FOL-01"
  ],
  "uiState": "CHM-UI-P10-FINAL",
  "interaction": "single-choice-confirm",
  "branches": {
    "A": "t3",
    "B": "t3",
    "C": "failure-crisis"
  }
}
```

## Implementation principle for Claude

Claude should treat the handoff as a **state-driven film**, not a sequence of static dashboard pages:

1. Play or hold media.
2. Reveal one prompt.
3. Reveal only the required control.
4. Capture the decision.
5. Replace interaction with feedback.
6. Apply variable changes.
7. Route to the next story beat.

---

# 11. Production order

1. Lock character voice profiles in ElevenLabs.
2. Export all dialogue as separate WAV files using the asset IDs above.
3. Create matching transcript files.
4. Verify the nine existing videos and fourteen plates against the scene map.
5. Generate only Priority A Higgsfield assets that materially improve the story.
6. Create the JSON/CSV manifests.
7. Hand the full package to Claude for implementation.
8. Run continuity QA: character identity, wardrobe, time of day, room geography, eye-lines, audio levels, captions and branch state.

---

# 12. Continuity rules

- Adebayo remains in burgundy; Chidi remains in navy; Folake remains in teal.
- Do not move the same scene between unrelated offices without a clear door/corridor transition.
- Page 1 is morning, Pages 2–7 progress through midday, Pages 8–12 sit in afternoon, Pages 13–16 move toward evening.
- Night is reserved for the empty-room failure/debrief image only.
- The player remains POV; never suddenly reveal a canonical player face.
- The ₦50,000 incident is always Apex University, always a duplicate debit, always public after the student posts receipts.
- The UAT order is always C → A → D → B → E.
- The final launch option is not inherently correct; the outcome band depends on accumulated evidence.

