
# Project Chimera — Exact Page-by-Page Replication & Media Placement Master Prompt

## Purpose of this file

Use this document as the single implementation brief for Claude, Lovable, or any React developer rebuilding **Project Chimera: The Last Test Before Launch**.

The goal is to remove guesswork. The build team should not need to invent:

- page structure,
- element placement,
- font choice,
- colour choice,
- media placement,
- when videos play,
- which UI state appears,
- which page uses images instead of video,
- which assets still need to be generated,
- or how the pages connect.

This file defines all **20 simulation pages**, the exact 1920×1080 composition, media timing, final-state UI, interaction behaviour, filenames, and asset IDs.

---

# 1. Non-negotiable implementation rules

## 1.1 Visual direction

The approved visual reference is the dark editorial fintech composition supplied by the client: near-black page, modular flat surfaces, white typography, restrained warm bronze/gold imagery, thin borders, small pill controls, large asymmetric editorial type, and generous negative space.

The simulation must feel:

- adult,
- premium,
- cinematic,
- technical,
- grounded,
- Nigerian,
- editorial rather than dashboard-heavy,
- image/video-led rather than text-led.

It must **not** feel:

- childish,
- colourful,
- like a school LMS,
- like a generic SaaS dashboard,
- like a science-fiction command centre,
- like a page made from many equal cards,
- or like a slideshow placed inside a browser.

## 1.2 Full-page media

Every cinematic page uses media across the **entire 1920×1080 page**.

Do not place the main image inside a small rectangle.

Do not add a large empty border around the entire page.

The background image or video always uses:

```css
.media-fill {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

UI is layered over the media using **flat solid or translucent surfaces**. Do not use gradients.

## 1.3 Final-state visual references

When creating static mockups or generated page images, show the **final usable state**, not:

- loading,
- card entrance,
- tutorial state,
- empty state,
- processing,
- transition,
- or partially completed interactions.

Examples:

- Architecture Design shows a complete graph and all currently valid tools.
- Engineer Allocation shows all four allocations and a total of exactly 100.
- UAT Workflow shows all five slots filled in the correct order.
- Crisis shows one response selected and the confirm action available.

The actual coded experience may reveal the UI progressively, but the static page reference must show the final state.

## 1.4 Progressive UI

The coded simulation reveals only what the player needs at that moment.

The page lifecycle is:

```text
MEDIA PLAYS
    ↓
MEDIA HOLDS OR SWITCHES TO ITS PLATE
    ↓
ONE PROMPT APPEARS
    ↓
ONLY REQUIRED CONTROLS APPEAR
    ↓
PLAYER ACTS
    ↓
INTERACTION IS REPLACED BY FEEDBACK
    ↓
VARIABLE CHANGES APPEAR CONTEXTUALLY
    ↓
NEXT PAGE
```

Do not keep permanent navigation, a profile avatar, notification bell, network icon, user initials, location, date, system-status footer, or an always-visible metrics rail.

## 1.5 Video first, UI afterward

For pages with a video:

1. Play the video first.
2. Do not cover the main performance with the task UI.
3. After the clip completes, freeze the final frame or switch invisibly to its matching plate.
4. Reveal the final UI state.
5. Allow skipping after 2 seconds.
6. Never loop the video.
7. Clips must be 10 seconds or shorter.
8. On reduced motion or failed loading, show the plate immediately and reveal the UI after 150ms.

## 1.6 Daylight only

Do not use night-time images.

The existing plate `P14_ChimeraRoom_empty_late_night.png` is not approved for final use.

Generate a daylight replacement:

```text
CHM-PLT-NEW-015
P15_ChimeraRoom_empty_daylight.png
```

Use bright overcast daylight, morning, midday, late afternoon, or balanced interior light. Failure pages can be subdued, but they must still be daytime.

## 1.7 Flat colours only

Do not use CSS gradients, gradient buttons, glowing borders, neon effects, or colour washes.

Allowed:

- flat opaque panels,
- flat translucent panels,
- subtle blur only if needed,
- brightness/saturation filters on media,
- thin borders,
- restrained shadows.

## 1.8 Fonts

Use only:

```css
font-family: "Afacad", sans-serif;   /* titles, page headings, large numbers */
font-family: "Manrope", sans-serif;  /* body, buttons, labels, captions, UI */
```

Import:

```tsx
import "@fontsource/afacad/400.css";
import "@fontsource/afacad/500.css";
import "@fontsource/afacad/600.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
```

Do not use serif or italic typography.

## 1.9 Icons

Use only Phosphor Icons.

```tsx
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  X,
  Clock,
  Timer,
  Globe,
  CurrencyCircleDollar,
  Fingerprint,
  Database,
  Broadcast,
  TreeStructure,
  Link,
  Cursor,
  ArrowsOutCardinal,
  Trash,
  ArrowCounterClockwise,
  ShieldCheck,
  User,
  Users,
  Folder,
  Cube,
  Bug,
  Warning,
  Phone,
  ArrowUpRight,
  EyeSlash,
  ClipboardText,
  UserCheck,
  SealCheck,
  RocketLaunch,
  Steps,
  Hourglass,
  DownloadSimple,
  RotateCcw,
  Info,
  SpeakerHigh,
  SpeakerSlash
} from "@phosphor-icons/react";
```

Default weight: `regular`.  
Selected state: `medium`.  
Do not assign a different colour to every icon.

---

# 2. Exact design tokens

```css
:root {
  /* Reference-derived neutral system */
  --bg: #171918;
  --bg-deep: #141615;
  --surface: #202221;
  --surface-raised: #2E302E;
  --surface-soft: #36322F;

  --paper: #F4F2EC;
  --paper-soft: #DED9D2;
  --text-muted: #B8B2AA;
  --text-faint: #827B74;

  --accent: #C39A70;
  --accent-light: #D5B38E;
  --accent-dark: #8C6545;

  --line: rgba(244, 242, 236, 0.16);
  --line-strong: rgba(244, 242, 236, 0.32);

  --success: #78917A;
  --warning: #C39A70;
  --danger: #A76A61;

  --shadow-panel: 0 28px 80px rgba(0, 0, 0, 0.24);

  --radius-control: 8px;
  --radius-card: 18px;
  --radius-major: 26px;
  --radius-pill: 999px;
}
```

## Colour usage ratio

- 68% near-black / charcoal
- 20% realistic media
- 8% paper / white text
- 4% bronze accent and semantic colour

Do not introduce blue, purple, cyan, lime, or multiple brand accents.

---

# 3. Typography tokens

```css
.display-xl {
  font-family: "Afacad", sans-serif;
  font-size: 112px;
  line-height: 0.84;
  font-weight: 500;
  letter-spacing: -0.045em;
}

.display-lg {
  font-family: "Afacad", sans-serif;
  font-size: 88px;
  line-height: 0.88;
  font-weight: 500;
  letter-spacing: -0.04em;
}

.display-md {
  font-family: "Afacad", sans-serif;
  font-size: 64px;
  line-height: 0.92;
  font-weight: 500;
  letter-spacing: -0.03em;
}

.heading-lg {
  font-family: "Afacad", sans-serif;
  font-size: 44px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.heading-md {
  font-family: "Afacad", sans-serif;
  font-size: 30px;
  line-height: 1.1;
  font-weight: 500;
}

.body-lg {
  font-family: "Manrope", sans-serif;
  font-size: 18px;
  line-height: 1.55;
  font-weight: 400;
}

.body {
  font-family: "Manrope", sans-serif;
  font-size: 15px;
  line-height: 1.55;
  font-weight: 400;
}

.label {
  font-family: "Manrope", sans-serif;
  font-size: 11px;
  line-height: 1;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.button-label {
  font-family: "Manrope", sans-serif;
  font-size: 13px;
  line-height: 1;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.metric-lg {
  font-family: "Afacad", sans-serif;
  font-size: 72px;
  line-height: 0.9;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
}
```

---

# 4. Exact 1920×1080 stage

The primary design size is 1920×1080.  
1366×768 scales proportionally without reflow.

Use a fixed coordinate stage so every UI element remains in the exact intended position.

```tsx
import { useEffect, useState } from "react";

export function FixedStage({
  children
}: {
  children: React.ReactNode;
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      setScale(
        Math.min(
          window.innerWidth / 1920,
          window.innerHeight / 1080
        )
      );
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[var(--bg)]">
      <div
        style={{
          position: "absolute",
          width: 1920,
          height: 1080,
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center"
        }}
      >
        {children}
      </div>
    </div>
  );
}
```

Use a helper for exact coordinates:

```tsx
type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  z?: number;
  className?: string;
  children?: React.ReactNode;
};

export function Box({
  x,
  y,
  w,
  h,
  z = 1,
  className = "",
  children
}: BoxProps) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        zIndex: z
      }}
    >
      {children}
    </div>
  );
}
```

---

# 5. Shared page shell

```tsx
type PageShellProps = {
  media: React.ReactNode;
  children: React.ReactNode;
  pageNumber: string;
  showBrand?: boolean;
};

export function PageShell({
  media,
  children,
  pageNumber,
  showBrand = true
}: PageShellProps) {
  return (
    <FixedStage>
      <div className="absolute inset-0 bg-[var(--bg)]">
        {media}
      </div>

      {showBrand && (
        <Box x={64} y={52} w={390} h={54} z={30}>
          <ProjectChimeraBrand />
        </Box>
      )}

      <Box x={1810} y={54} w={54} h={32} z={30}>
        <span className="label text-[var(--accent)]">
          {pageNumber}
        </span>
      </Box>

      {children}
    </FixedStage>
  );
}
```

## Brand lockup

```tsx
function ProjectChimeraBrand() {
  return (
    <div className="flex items-center gap-16">
      <ProjectChimeraMark className="h-[42px] w-[42px] text-[var(--accent)]" />

      <div>
        <div className="font-manrope text-[18px] font-semibold uppercase tracking-[0.16em] text-[var(--paper)]">
          Project Chimera
        </div>

        <div className="mt-6 font-manrope text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
          Serious Simulation Platform
        </div>
      </div>
    </div>
  );
}
```

---

# 6. Shared controls

## Primary button

```tsx
function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="
        inline-flex h-[64px] items-center justify-between gap-24
        rounded-[var(--radius-control)]
        bg-[var(--accent)] px-28
        font-manrope text-[13px] font-semibold uppercase
        tracking-[0.12em] text-[var(--bg-deep)]
        transition-colors duration-150
        hover:bg-[var(--accent-light)]
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-4 focus-visible:outline-[var(--paper)]
      "
    >
      {children}
    </button>
  );
}
```

## Secondary button

```tsx
function SecondaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="
        inline-flex h-[64px] items-center justify-center gap-18
        rounded-[var(--radius-control)]
        border border-[var(--line-strong)]
        bg-[var(--surface)] px-28
        font-manrope text-[13px] font-semibold uppercase
        tracking-[0.12em] text-[var(--paper)]
        transition-colors duration-150
        hover:bg-[var(--surface-raised)]
      "
    >
      {children}
    </button>
  );
}
```

## Flat panel

```css
.flat-panel {
  border: 1px solid var(--line);
  border-radius: var(--radius-major);
  background: rgba(23, 25, 24, 0.94);
  box-shadow: var(--shadow-panel);
}
```

No gradient is permitted inside `.flat-panel`.

---

# 7. Media engine

## Asset manifest

```ts
export const VIDEO = {
  V01_ADEBAYO:  "/assets/video/V01_Adebayo_performance_arc_10s.mp4",
  V02_CHIDI:    "/assets/video/V02_Chidi_performance_arc_10s.mp4",
  V03_FOLAKE:   "/assets/video/V03_Folake_performance_arc_10s.mp4",
  V04_DOOR:     "/assets/video/V04_POV_door_opening_5s.mp4",
  V05_CAST:     "/assets/video/V05_ChimeraRoom_cast_reveal_6s.mp4",
  V06_FOLDER:   "/assets/video/V06_Folake_places_defect_folder_6s.mp4",
  V07_PHONE:    "/assets/video/V07_Phone_vibrates_crisis_5s.mp4",
  V08_EXEC:     "/assets/video/V08_Executive_three_shot_8s.mp4",
  V09_ABUJA:    "/assets/video/V09a_Abuja_establishing_3shot_SOUND_10s.mp4",

  /* New optional story assets */
  V10_PHONE_AFTERMATH: "/assets/video/V10_student_phone_aftermath_5s.mp4",
  V11_VC_CALL:         "/assets/video/V11_Adebayo_VC_call_6s.mp4",
  V12_BOARD_REACTION:  "/assets/video/V12_board_absorbs_recommendation_8s.mp4"
} as const;

export const PLATE = {
  P01_ADEBAYO:       "/assets/plates/P01_Adebayo_project_table_morning.png",
  P02_CHIDI:         "/assets/plates/P02_Chidi_project_table_afternoon.png",
  P03_FOLAKE:        "/assets/plates/P03_Folake_QA_room.png",
  P04_DOOR:          "/assets/plates/P04_POV_glass_door.png",
  P05_ROOM:          "/assets/plates/P05_ChimeraRoom_wide_three_characters.png",
  P06_RED_BOARD:     "/assets/plates/P06_ChimeraRoom_red_board_midday.png",
  P07_PHONE:         "/assets/plates/P07_Phone_insert_dark_screen.png",
  P08_EXEC:          "/assets/plates/P08_Executive_room_three_shot_evening.png",
  P10_ARCHITECTURE:  "/assets/plates/P10_UI_workstation_OTS_architecture_canvas.png",
  P11_ALLOCATION:    "/assets/plates/P11_UI_project_table_OTS_sliders.png",
  P12_UAT:           "/assets/plates/P12_UI_QA_table_workflow_cards.png",
  P13_CORRIDOR:      "/assets/plates/P13_Corridor_early_evening.png",

  /* Mandatory daylight replacement */
  P15_EMPTY_DAY:     "/assets/plates/P15_ChimeraRoom_empty_daylight.png",

  /* Optional context plate */
  P16_APEX_EXT:      "/assets/plates/P16_Apex_University_exterior_daylight.png"
} as const;
```

## Character clip segments

```ts
export const SEGMENT = {
  A: { in: 0.0, out: 3.0 },
  B: { in: 3.0, out: 5.0 },
  C: { in: 5.0, out: 8.0 },
  D: { in: 8.0, out: 10.0 }
} as const;
```

## Media sequence component

```tsx
type MediaCue = {
  src: string;
  poster: string;
  start?: number;
  end?: number;
  duration?: number;
  alt: string;
};

function MediaSequence({
  cues,
  onComplete
}: {
  cues: MediaCue[];
  onComplete: () => void;
}) {
  // Play each cue once.
  // Seek to cue.start when provided.
  // Stop at cue.end when provided.
  // Allow skip after 2 seconds.
  // After final cue, hold last frame or replace with poster.
  // Never loop.
  return null;
}
```

## Media styling

```css
.media-image,
.media-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-normal {
  filter: brightness(0.94) contrast(0.98) saturate(0.88);
}

.media-under-ui {
  filter: brightness(0.70) contrast(0.98) saturate(0.82);
}

.media-subdued {
  filter: brightness(0.84) contrast(0.92) saturate(0.70);
}
```

Do not use a gradient scrim. Use a solid UI panel for contrast.

---

# 8. Voice, captions and audio folders

```text
/public/assets/audio/
  vo/
    P01_ADB_01.wav
    P01_ADB_02.wav
    P02_ADB_01.wav
    P02_ADB_02.wav
    P03_CHI_01.wav
    ...
  ambience/
    office_morning.wav
    office_afternoon.wav
    qa_room.wav
    corridor_daylight.wav
    boardroom_daylight.wav
  sfx/
    door_handle.wav
    door_seal.wav
    folder_place.wav
    phone_vibration.wav
    transaction_alert.wav
    slider_tick.wav
    workflow_connect.wav
    decision_confirm.wav
    evidence_row.wav
  captions/
    P01.vtt
    P02.vtt
    ...
```

Use ElevenLabs for dialogue. Export every line separately.

---

# 9. Page route order

```ts
export const ROUTES = [
  "intro-01",
  "intro-02",
  "intro-03",
  "t1",
  "t1-confirm",
  "t1-justify",
  "t2-intro",
  "t2",
  "t2-good",
  "t2-crisis",
  "t3",
  "t3-resolve",
  "pre-final",
  "final",
  "outcome",
  "debrief",
  "failure-time",
  "failure-confidence",
  "failure-readiness",
  "failure-crisis"
] as const;
```

---

# 10. Page-by-page replication

All coordinates below are for the fixed 1920×1080 stage.



## PAGE 01 — Mission introduction

**Route:** `/intro-01`  
**Final state:** Mission headline, live 48-hour window, Begin Mission, Review Brief.  
**Background:** full-page media.  
**Primary assets:** `V09_ABUJA`, `V04_DOOR`, `V05_CAST`, fallback `P05_ROOM`.

### Media timing

| Time | Media | Audio |
|---:|---|---|
| 0.0–3.5s | `V09_ABUJA`, first establishing shot | existing city sound + Adebayo line 1 |
| 3.5–8.5s | `V04_DOOR` | door handle, seal, room tone |
| 8.5–14.5s | `V05_CAST` | Adebayo line 2 |
| 14.5s | freeze final frame or switch to `P05_ROOM` | low room tone |
| 14.7s | reveal final UI | no extra sting |

### Voice script

> “Project Chimera goes before the launch board in forty-eight hours.”

> “Five systems. Three pilot universities. You are the lead architect. Every decision follows us into that room.”

### Exact layout

| Element | x | y | w | h | Style |
|---|---:|---:|---:|---:|---|
| Flat left surface | 0 | 0 | 940 | 1080 | `rgba(23,25,24,.95)` |
| Brand | 64 | 52 | 390 | 54 | shared brand |
| Page marker | 64 | 994 | 180 | 28 | `01 · INTRO` |
| Headline | 72 | 210 | 800 | 270 | Afacad 112/0.84 |
| Supporting line | 74 | 510 | 620 | 36 | Manrope 18 |
| Mission label | 74 | 636 | 280 | 18 | label, accent |
| Countdown | 72 | 678 | 600 | 104 | Afacad 72 |
| Time sublabels | 72 | 790 | 600 | 18 | Manrope 10 |
| Begin button | 72 | 858 | 318 | 64 | primary |
| Review brief | 424 | 858 | 214 | 64 | text action |

### Headline

```text
THE LAST TEST
BEFORE LAUNCH
```

`LAUNCH` uses `--accent`. All other words use `--paper`.

### JSX blueprint

```tsx
<PageShell
  pageNumber="01"
  media={<MissionIntroMedia />}
>
  <Box x={0} y={0} w={940} h={1080} z={10}
       className="bg-[rgba(23,25,24,.95)]" />

  <Box x={72} y={210} w={800} h={270} z={20}>
    <h1 className="display-xl text-[var(--paper)]">
      THE LAST TEST
      <br />
      BEFORE <span className="text-[var(--accent)]">LAUNCH</span>
    </h1>
  </Box>

  <Box x={74} y={510} w={620} h={36} z={20}>
    <p className="body-lg text-[var(--paper-soft)]">
      Lead the final pre-launch simulation.
    </p>
  </Box>

  <Box x={74} y={636} w={280} h={18} z={20}>
    <p className="label text-[var(--accent)]">Mission window</p>
  </Box>

  <Box x={72} y={678} w={600} h={104} z={20}>
    <Countdown hours={48} minutes={0} seconds={0} />
  </Box>

  <Box x={72} y={858} w={318} h={64} z={20}>
    <PrimaryButton>
      Begin Mission <ArrowRight size={20} />
    </PrimaryButton>
  </Box>

  <Box x={424} y={858} w={214} h={64} z={20}>
    <TextAction>Review Brief</TextAction>
  </Box>
</PageShell>
```

### Asset generation

No new image is required. Use the existing cinematic sequence.


## PAGE 02 — Five systems, one platform

**Route:** `/intro-02`  
**Final state:** five compact system identifiers and Continue.  
**Primary plate:** `P05_ROOM` or `P02_CHIDI`.  
**Do not use large product cards.**

### Media timing

- 0.0–2.0s: full room or Chidi plate with a 2% digital push.
- 2.0s: Adebayo voice begins.
- 2.4s: title appears.
- 3.0–6.0s: system identifiers reveal one at a time.
- 6.2s: Continue appears.

### Voice script

> “Aurora teaches. NairaGate collects. VerifyMe proves identity. ScoreVault protects results. WatchTower sees what the room cannot.”

> “One failure can pull down the rest.”

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Left flat surface | 0 | 0 | 980 | 1080 |
| Title | 72 | 210 | 820 | 230 |
| Supporting copy | 74 | 470 | 560 | 70 |
| Card row | 72 | 706 | 860 | 142 |
| Continue action | 72 | 908 | 190 | 54 |

System cards are exactly `156×142px`, gap `20px`.

Card content:

```text
[ICON 26px]
Aurora
LMS
```

### Card positions

| System | x | y |
|---|---:|---:|
| Aurora | 72 | 706 |
| NairaGate | 248 | 706 |
| VerifyMe | 424 | 706 |
| ScoreVault | 600 | 706 |
| WatchTower | 776 | 706 |

### JSX blueprint

```tsx
<Box x={0} y={0} w={980} h={1080}
     className="bg-[rgba(23,25,24,.94)]" />

<Box x={72} y={210} w={820} h={230}>
  <h1 className="display-xl text-[var(--paper)]">
    FIVE SYSTEMS.
    <br />
    <span className="text-[var(--accent)]">ONE PLATFORM.</span>
  </h1>
</Box>

<Box x={72} y={706} w={860} h={142}>
  <div className="grid grid-cols-5 gap-[20px]">
    {systems.map(system => (
      <SystemIdentifier key={system.id} {...system} />
    ))}
  </div>
</Box>
```

### System identifier styling

```css
.system-identifier {
  width: 156px;
  height: 142px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface);
}
```

### Asset generation

No new media is required unless the existing room plate places a face under the left panel. If needed, generate:

```text
CHM-HG-NEW-008
P17_Five_systems_daylight_office_safe_left.png
```

The generated office must be realistic, Nigerian, daylight, with the important character and workstation on the right half.


## PAGE 03 — Forty-eight hours, one decision

**Route:** `/intro-03`  
**Primary media:** `V02_CHIDI`, segment C, 5.0–8.0s.  
**Fallback:** `P02_CHIDI`.

### Media timing

- 0.0–3.0s page time: play Chidi segment C.
- Voice line begins at 0.25s.
- At 3.0s, hold final frame.
- At 3.2s, reveal UI.
- Continue appears at 3.7s.

### Voice script

> “The defects arrived this morning. The universities are still waiting.”

> “Forty-eight hours sounds like time—until your first wrong decision costs four.”

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Left surface | 0 | 0 | 930 | 1080 |
| Small task marker | 72 | 152 | 360 | 24 |
| Title | 72 | 240 | 780 | 230 |
| Supporting line | 74 | 512 | 650 | 38 |
| Countdown panel | 72 | 628 | 620 | 166 |
| Continue button | 72 | 850 | 340 | 64 |

### Title

```text
48 HOURS.
ONE DECISION.
```

`ONE DECISION.` uses the accent colour.

### Countdown

Show only the mission clock. Do not show confidence, readiness, backlog, architecture, or justification.


## PAGE 04 — Architecture Design

**Route:** `/t1`  
**Final state:** complete graph; Select, Connect, Move, Delete, Reset and Submit are available.  
**Primary plate:** `P10_ARCHITECTURE`.  
**Narrative video:** none during interaction.

This is a UI-dominant page. The main architecture interface fills the page. The office plate remains visible at the outer edges.

### Optional voice before UI

> “Build something we can defend, not just something that connects.”

Play over the plate for 2.5 seconds. Then reveal the interface.

### Main panel

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Main UI panel | 52 | 42 | 1816 | 996 |
| Header label | 104 | 78 | 300 | 22 |
| Title | 104 | 116 | 760 | 88 |
| Tool dock | 980 | 90 | 560 | 64 |
| Submit button | 1560 | 90 | 250 | 64 |
| Canvas | 104 | 232 | 1706 | 742 |
| Minimap | 1572 | 810 | 184 | 120 |
| Zoom controls | 1770 | 810 | 40 | 120 |

### Canvas

```css
.architecture-canvas {
  border: 1px solid var(--line);
  border-radius: 18px;
  background-color: #1B1D1C;
  background-image: radial-gradient(
    circle,
    rgba(244,242,236,.10) 0.8px,
    transparent 0.9px
  );
  background-size: 20px 20px;
}
```

**Exception:** The dot pattern is a repeating texture, not a colour gradient. It is allowed.

### Node layout inside canvas

Canvas coordinates are relative to `x=104, y=232`.

| Node | x | y | w | h |
|---|---:|---:|---:|---:|
| Web Client | 82 | 98 | 180 | 78 |
| API Gateway | 360 | 98 | 200 | 78 |
| User Service | 660 | 98 | 210 | 78 |
| Project Service | 970 | 98 | 220 | 78 |
| Simulation Service | 1290 | 98 | 238 | 78 |
| Auth Service | 360 | 344 | 200 | 78 |
| PostgreSQL | 700 | 454 | 190 | 78 |
| Redis Cache | 930 | 454 | 190 | 78 |
| Queue | 1160 | 454 | 190 | 78 |
| Event Bus | 1390 | 454 | 190 | 78 |

Use directed edges exactly as the current graph state requires.

### Tools

```text
Select | Connect | Move | Delete | Reset
```

Use icons and short labels only.

### Submission visibility

`Submit Design` exists only when the graph passes the minimum structural guards.

### React structure

```tsx
<PageShell pageNumber="04" media={<Plate src={PLATE.P10_ARCHITECTURE} />}>
  <Box x={52} y={42} w={1816} h={996}
       className="flat-panel" />

  <Box x={104} y={116} w={760} h={88}>
    <h1 className="display-lg">
      ARCHITECTURE <span className="text-[var(--accent)]">DESIGN</span>
    </h1>
  </Box>

  <Box x={980} y={90} w={560} h={64}>
    <ArchitectureToolDock />
  </Box>

  <Box x={1560} y={90} w={250} h={64}>
    <PrimaryButton>Submit Design <ArrowRight /></PrimaryButton>
  </Box>

  <Box x={104} y={232} w={1706} h={742}>
    <ExistingArchitectureCanvas />
  </Box>
</PageShell>
```

### Asset generation

Use the existing plate. If the monitor-safe area is insufficient, generate `CHM-HG-NEW-005`.


## PAGE 05 — Architecture Confirmation

**Route:** `/t1-confirm`  
**Final state:** completed architecture preview, Redesign, Confirm Architecture.  
**Background:** `P10_ARCHITECTURE`.  
**Reaction:** `V01_ADEBAYO`, segment A, shown before UI or in a small optional inset.

### Voice script

> “A diagram is easy to admire. Is this the architecture you are prepared to defend?”

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Main panel | 286 | 102 | 1348 | 868 |
| Brand/page label | 350 | 144 | 500 | 28 |
| Title | 350 | 206 | 1220 | 82 |
| Question | 350 | 304 | 1220 | 32 |
| Architecture preview | 350 | 368 | 1220 | 310 |
| Supporting line | 510 | 720 | 900 | 54 |
| Redesign | 526 | 814 | 350 | 64 |
| Confirm | 902 | 814 | 420 | 64 |

### Architecture preview

Show the selected pattern using five large category nodes:

```text
Users → Access Gateway → Application Services → Data Services → External Services
```

The preview is read-only.

### UI rule

No component tray, node handles, tool dock, metrics, or help control.


## PAGE 06 — Architecture Justification

**Route:** `/t1-justify`  
**Final state:** all four criteria visible, completed writing field, Clear, Submit Justification.  
**Background:** `P10_ARCHITECTURE`.

### Video / voice timing

- 0.0–2.5s: plate or Adebayo segment A.
- Play:
  > “Tell me why this architecture is right for Chimera—not why it is fashionable.”
- 2.6s: reveal the completed justification UI.

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Main panel | 226 | 64 | 1468 | 952 |
| Small brand | 290 | 102 | 420 | 34 |
| Title | 290 | 150 | 1160 | 88 |
| Criteria row | 290 | 266 | 1340 | 64 |
| Writing field | 290 | 350 | 1340 | 490 |
| Clear action | 1170 | 866 | 130 | 56 |
| Submit button | 1320 | 866 | 310 | 56 |

Criteria widths: `318px`, gap `22px`.

### Criteria

- Scalability
- Maintainability
- Integration
- Cost

### Text field

- Manrope 17px.
- Line-height 1.65.
- Maximum 5 visible paragraphs.
- No character count in the live interface.
- The static visual reference may show completed text.
- No long guidance paragraph outside the field.

### Strong feedback

Play `V01_ADEBAYO`, segment C.

> “Good. You have considered the trade-offs.”

### Weak feedback

Play `V01_ADEBAYO`, segment D alone. No spoken reprimand.


## PAGE 07 — Defect Board Reveal

**Route:** `/t2-intro`  
**Final state:** all four defects reviewed; Allocate Engineers available.  
**Media:** `V06_FOLDER`, then `V02_CHIDI` segment A, then `P06_RED_BOARD`.

### Media timing

| Time | Cue |
|---:|---|
| 0.0–6.0s | folder placement video |
| 6.0–8.5s | Chidi segment A |
| 8.5s | switch to red-board plate |
| 8.7s | reveal final UI |

### Voice

> “Four engineers. Four defects. We cannot treat every problem as equal.”

> “D-07 is taking money twice. From real students.”

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Main left panel | 54 | 70 | 1048 | 936 |
| Title | 108 | 166 | 820 | 100 |
| Supporting line | 108 | 286 | 760 | 34 |
| Defect list | 108 | 364 | 890 | 456 |
| Allocate button | 108 | 864 | 890 | 64 |

### Defect rows

Each row: `890×102px`, gap `16px`.

| ID | Short title | Severity |
|---|---|---|
| D-07 | Payment double-charge | Critical |
| D-12 | WatchTower recording | High |
| D-19 | Slow dashboard load | Medium |
| D-23 | Results export failure | High |

Each row contains:

- 28px Phosphor icon,
- defect ID,
- one-line title,
- severity pill,
- no paragraph.

Full details open only when the learner selects a row.


## PAGE 08 — Engineer Allocation

**Route:** `/t2`  
**Final state:** all values set, total 100/100, Submit Allocation visible.  
**Background:** `P11_ALLOCATION`.

### Voice

> “Not every defect is equal. But every defect has a person on the other side.”

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Main panel | 84 | 62 | 1518 | 956 |
| Header | 132 | 118 | 1320 | 120 |
| Slider rows | 132 | 290 | 1374 | 500 |
| Total panel | 132 | 824 | 1374 | 126 |
| Submit button | 1080 | 850 | 390 | 74 |

Slider row: `1374×112px`, gap `16px`.

### Final visual values

```ts
{
  d07: 30,
  d12: 25,
  d19: 20,
  d23: 25
}
```

These values are the reference screenshot state only. The coded simulation must allow any distribution that totals exactly 100.

### Slider row structure

- defect ID: 160px
- slider track: 760px
- numeric value: 160px
- short issue label: optional 220px
- no engineer names
- no long defect descriptions

### Interaction

- Arrow: ±1
- Shift + Arrow: ±10
- Home: 0
- End: remaining points
- Submit does not exist until total is 100


## PAGE 09 — Trust Holds

**Route:** `/t2-good`  
**Final state:** small success panel and Continue.  
**Media:** `V02_CHIDI`, segment D.  
**Fallback:** `P02_CHIDI`.

### Voice

> “The payment defect is contained. That buys us trust.”

> “Do not spend it carelessly.”

### Media timing

- 0.0–2.0s: Chidi relief segment.
- 2.0s: hold final frame.
- 2.2s: show panel.
- No music; room tone only.

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Result panel | 72 | 692 | 620 | 254 |
| Status icon | 112 | 738 | 56 | 56 |
| Label | 192 | 728 | 280 | 18 |
| Headline | 192 | 758 | 380 | 50 |
| Supporting line | 192 | 816 | 380 | 50 |
| Continue | 192 | 872 | 240 | 54 |

### Content

```text
TRUST HOLDS

The critical payment issue is contained.
```

Do not show an allocation dashboard, readiness metrics, or four outcome cards.


## PAGE 10 — Duplicate-Payment Crisis

**Route:** `/t2-crisis`  
**Final state:** one response selected, Confirm Response visible.  
**Media:** `V07_PHONE`, `P07_PHONE`, Adebayo segment B, Folake segment C.  
**Optional new media:** `V10_PHONE_AFTERMATH`, `V11_VC_CALL`.

### Voice sequence

> “Hello… I was charged twice. Fifty thousand naira. I posted the receipts because nobody answered.”

> “The Vice-Chancellor is on the line. What are you telling her?”

> “Before you choose, remember: the system failed. The student did not.”

### Timing

| Time | Cue |
|---:|---|
| 0.0–5.0s | phone vibration video |
| 5.0–7.5s | live duplicate transaction UI over `P07_PHONE` |
| 7.5–9.5s | Adebayo segment B |
| 9.5–12.5s | Folake segment C |
| 12.7s | reveal decision interface |

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Left decision panel | 0 | 0 | 1110 | 1080 |
| Brand | 64 | 52 | 390 | 54 |
| Crisis label | 72 | 162 | 360 | 20 |
| Headline | 72 | 230 | 900 | 240 |
| Situation line | 74 | 506 | 800 | 38 |
| Choices | 72 | 628 | 930 | 196 |
| Confirm | 72 | 856 | 540 | 66 |

Choice cards: `294×196px`, gap `24px`.

### Choice labels

1. **Call the student**  
   Refund and apologise.

2. **Blame the vendor**  
   Escalate externally.

3. **Ignore it**  
   Continue elsewhere.

The static reference shows option 1 selected.

### Semantic colour

Only the selected border and check use `--accent`.  
Do not use three differently coloured cards.


## PAGE 11 — UAT Sign-Off Workflow

**Route:** `/t3`  
**Final state:** five cards placed in the correct sequence; Submit Workflow visible.  
**Media:** `V04_DOOR`, `V03_FOLAKE` segment A, then `P12_UAT`.

### Voice

> “A sign-off is not a formality. The order is the evidence.”

### Correct order

```text
C → A → D → B → E
```

| Code | Step |
|---|---|
| C | UAT Test Completion |
| A | Defect Resolution |
| D | QA Sign-Off |
| B | Pilot University Sign-Off |
| E | CTO Final Approval |

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Left panel | 50 | 70 | 1030 | 930 |
| Title | 110 | 176 | 850 | 110 |
| Sequence cards | 110 | 438 | 860 | 184 |
| Confirmation row | 110 | 670 | 860 | 88 |
| Submit button | 110 | 814 | 860 | 66 |

Cards: `152×184px`, gap `25px`.

Each card shows:

- small check,
- large letter,
- two-line step name.

No top navigation, profile, metrics, or extra instructional text.


## PAGE 12 — UAT Resolution

**Route:** `/t3-resolve`  
**Final state:** approved sequence and Continue.  
**Media:** `P12_UAT` with a 3-second 2% digital push; `V03_FOLAKE` segment D.

### Voice

> “Now the evidence can move. QA signs. The universities accept. Adebayo authorises.”

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Main panel | 362 | 112 | 1196 | 830 |
| Title | 424 | 184 | 1000 | 120 |
| Approved status | 424 | 334 | 480 | 40 |
| Sequence row | 424 | 424 | 1000 | 128 |
| Summary | 424 | 594 | 1000 | 164 |
| Continue | 728 | 796 | 390 | 60 |

No full metrics dashboard.

Summary contains only:

- Sequence valid
- Sign-off ready
- Next step available


## PAGE 13 — Evidence Summary

**Route:** `/pre-final`  
**Final state:** one evidence ledger and `Go in`.  
**Media:** `P13_CORRIDOR` with subtle 2.5D parallax.  
**Do not use a gradient.**

### Voice

> “The board will not ask whether the work was difficult.”

> “They will ask whether the evidence supports your decision.”

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Evidence panel | 920 | 94 | 880 | 892 |
| Title | 974 | 166 | 720 | 82 |
| Ledger | 974 | 286 | 720 | 516 |
| Go in button | 1280 | 850 | 414 | 64 |

### Ledger rows

Each row: `720×54px`, 1px bottom rule.

```text
ARCHITECTURE       Layered / Valid
JUSTIFICATION      Strong
D-07               Fixed
CRISIS             Resolved
UAT WORKFLOW       Approved
TIME               {timeRemaining} hours
TRUST              {pilotConfidence}%
READINESS          {launchReadiness}%
```

Show only rows that apply.

No metric cards. No charts.


## PAGE 14 — Final Recommendation

**Route:** `/final`  
**Final state:** one recommendation selected and Confirm Recommendation visible.  
**Media:** `V04_DOOR`, `V08_EXEC`, fallback `P08_EXEC`.

### Voice

> “Give me your recommendation. And the evidence behind it.”

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Main panel | 310 | 94 | 1300 | 894 |
| Title | 382 | 170 | 1100 | 86 |
| Supporting line | 382 | 274 | 900 | 58 |
| Decision cards | 382 | 390 | 1156 | 290 |
| Rationale line | 382 | 718 | 1156 | 44 |
| Review evidence | 742 | 822 | 260 | 60 |
| Confirm | 1032 | 822 | 414 | 60 |

Decision cards: `370×290px`, gap `24px`.

Options:

- Full Launch
- Phased Launch
- Delay Launch

The static visual reference may show `Phased Launch` selected. The application must support all three equally.

### Evidence shown on this page

Only:

- time remaining,
- pilot confidence,
- launch readiness.

Do not repeat architecture, backlog and justification here.


## PAGE 15 — Outcome Montage

**Route:** `/outcome`  
**Media first:** no UI during montage.  
**Final state:** compact end card and View Debrief.

### Excellent / good montage

1. `V08_EXEC` — 0–3s.
2. `V01_ADEBAYO` segment C — 3–6s.
3. `V02_CHIDI` segment D — 6–8s.
4. `P13_CORRIDOR` daylight grade — 8–10s.
5. `V09_ABUJA` — 10–13s.

### Developing montage

Use Adebayo segment D, Chidi segment C, neutral corridor, shortened Abuja.

### Poor montage

Short executive reaction, withheld response, Chidi strain, daylight empty room.

### Final card layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Outcome card | 72 | 660 | 620 | 290 |
| Label | 116 | 706 | 220 | 18 |
| Headline | 116 | 748 | 500 | 58 |
| Summary | 116 | 818 | 500 | 50 |
| View Debrief | 116 | 882 | 280 | 54 |

Example excellent state:

```text
LAUNCH APPROVED

The evidence supported a responsible launch.
```

No scores, stars, confetti, fireworks, or celebration animation.


## PAGE 16 — Decision Record / Debrief

**Route:** `/debrief`  
**Background:** mandatory new daylight plate `P15_EMPTY_DAY`.  
**This is the only page allowed to scroll.**

### Voice closing lines

Excellent / good:

> “You did not chase certainty. You built enough evidence to make a responsible decision.”

Developing:

> “You reached the room, but your evidence arrived damaged. Review where pressure changed your judgement.”

Poor:

> “The outcome began long before the final decision. Trace it back to the first compromise.”

### First viewport layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Main panel | 830 | 40 | 1030 | 1000 |
| Title | 884 | 104 | 860 | 86 |
| Six metrics | 884 | 220 | 860 | 264 |
| Time management | 884 | 520 | 420 | 220 |
| Outcome | 1324 | 520 | 420 | 220 |
| Continue down cue | 1580 | 920 | 164 | 40 |

### Six metric cards

Grid: 3 columns × 2 rows.  
Each card: `274×118px`, gap `18px`.

Metrics:

- Time
- Confidence
- Readiness
- Backlog
- Architecture
- Justification

Each shows start, end and change.

### Scroll sections

#### Section 2 — What consumed time

- Architecture redesign
- Justification rewrite
- Workflow correction
- Crisis management

#### Section 3 — What your choices meant

Accordion rows:

- Architecture
- Justification
- Defect triage
- Crisis
- Workflow
- Time
- Launch decision

#### Section 4 — Reflection

Show one question at a time. Eight total.

#### Section 5 — Actions

- Export Report
- Redo Simulation

### Daylight asset requirement

Generate:

```text
CHM-PLT-NEW-015
P15_ChimeraRoom_empty_daylight.png
```

Prompt intent:

> Realistic modern Nigerian executive project room, empty, full daylight through large windows, warm wood, charcoal furniture, no people, no night lighting, no holograms, wide 16:9, large clean UI-safe area on the right, cinematic but grounded.


## PAGE 17 — Failure: Time Expired

**Route:** `/failure-time`  
**Background:** `P15_EMPTY_DAY`.  
**Final state:** failure explanation, Review Decisions, Redo Simulation.

### Audio

- office air-conditioning,
- distant chair movement,
- no alarm,
- no dialogue.

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Main panel | 390 | 146 | 1140 | 744 |
| Headline | 514 | 246 | 900 | 84 |
| Final time | 610 | 366 | 700 | 126 |
| Explanation | 560 | 530 | 800 | 74 |
| Cause rows | 642 | 638 | 636 | 84 |
| Review | 610 | 756 | 330 | 62 |
| Redo | 964 | 756 | 330 | 62 |

Headline:

```text
TIME EXPIRED
```

No red full-page alarm.


## PAGE 18 — Failure: Confidence Collapsed

**Route:** `/failure-confidence`  
**Background:** `P08_EXEC` regraded to subdued daylight, or a new daylight boardroom plate.  
**Do not show exaggerated distressed acting.**

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Main panel | 486 | 126 | 1010 | 780 |
| Headline | 540 | 246 | 900 | 160 |
| Explanation | 540 | 436 | 700 | 72 |
| Confidence value | 1168 | 510 | 220 | 150 |
| Consequence rows | 540 | 542 | 560 | 136 |
| Review | 540 | 748 | 330 | 62 |
| Redo | 892 | 748 | 330 | 62 |

Headline:

```text
PILOT CONFIDENCE
COLLAPSED
```

Show text and value together so colour is not the only signal.


## PAGE 19 — Failure: Readiness Critical

**Route:** `/failure-readiness`  
**Background:** `P06_RED_BOARD`, daylight and quiet.

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Main panel | 340 | 118 | 1240 | 810 |
| Headline | 448 | 236 | 1020 | 100 |
| Warning icon | 448 | 386 | 260 | 260 |
| Risk list | 760 | 378 | 650 | 230 |
| Readiness value | 448 | 690 | 960 | 108 |
| Review | 790 | 830 | 360 | 62 |

Headline:

```text
LAUNCH READINESS
CRITICAL
```

Risk list:

- unresolved technical risk,
- incomplete validation,
- launch not recommended.

No alarm pulse.


## PAGE 20 — Failure: Crisis Mismanaged

**Route:** `/failure-crisis`  
**Background:** `P15_EMPTY_DAY`, or `P16_APEX_EXT` plus an empty project room.  
**Initial state:** four-second daylight room hold with no UI.

### Audio

1. distant phone vibration,
2. muted notification,
3. four seconds of room tone,
4. failure panel appears in silence.

### Exact layout

| Element | x | y | w | h |
|---|---:|---:|---:|---:|
| Main panel | 470 | 82 | 960 | 916 |
| Header | 530 | 160 | 840 | 120 |
| Explanation | 530 | 318 | 760 | 94 |
| Consequences | 530 | 474 | 760 | 286 |
| Review | 530 | 822 | 350 | 62 |
| Redo | 904 | 822 | 350 | 62 |

Headline:

```text
CRISIS MISMANAGED
PILOT COLLAPSED
```

Consequence rows:

- Public trust down
- Financial impact escalating
- Response ineffective

No breaking-news spectacle is required. The failure should feel professional and ethically serious.


# 11. Contextual variable updates

Do not add a permanent status rail.

Only show variable changes after a decision.

```tsx
type MetricDelta = {
  label: string;
  before: string;
  after: string;
};

function MetricToast({
  cause,
  deltas
}: {
  cause: string;
  deltas: MetricDelta[];
}) {
  return (
    <aside
      role="status"
      aria-live="polite"
      className="
        fixed right-[56px] top-[52px] z-50
        w-[340px] rounded-[16px]
        border border-[var(--line)]
        bg-[var(--surface)] p-[22px]
        shadow-[var(--shadow-panel)]
      "
    >
      <p className="label text-[var(--accent)]">{cause}</p>

      <div className="mt-16 divide-y divide-[var(--line)]">
        {deltas.map(delta => (
          <div
            key={delta.label}
            className="flex items-center justify-between py-12"
          >
            <span className="body text-[var(--text-muted)]">
              {delta.label}
            </span>

            <span className="body font-medium text-[var(--paper)]">
              {delta.before} → {delta.after}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
```

Timing:

- enter 220ms,
- hold 2200ms,
- exit 180ms,
- queue multiple updates,
- show only changed variables.

---

# 12. Simulation state

```ts
interface SimState {
  timeRemaining: number;
  pilotConfidence: number;
  launchReadiness: number;
  defectBacklog: number;

  architectureValidity: "none" | "valid" | "invalid";
  justificationQuality: "none" | "strong" | "weak";

  architectureAttempts: number;
  justificationAttempts: number;
  workflowAttempts: number;

  crisisTriggered: boolean;
  crisisChoice: "A" | "B" | "C" | null;

  patternDesigned:
    | "monolithic"
    | "layered"
    | "microservices"
    | null;

  justificationText: string;

  allocation: {
    d07: number;
    d12: number;
    d19: number;
    d23: number;
  } | null;

  workflowSequence: string[] | null;
  finalDecision: "full" | "phased" | "delay" | null;

  timeSpentByTask: Record<string, number>;
  currentScene: string;
}
```

Initial values:

```ts
const INITIAL_STATE = {
  timeRemaining: 48,
  pilotConfidence: 60,
  launchReadiness: 65,
  defectBacklog: 4,
  architectureValidity: "none",
  justificationQuality: "none",
  architectureAttempts: 0,
  justificationAttempts: 0,
  workflowAttempts: 0,
  crisisTriggered: false,
  crisisChoice: null,
  patternDesigned: null,
  justificationText: "",
  allocation: null,
  workflowSequence: null,
  finalDecision: null,
  timeSpentByTask: {},
  currentScene: "intro-01"
};
```

Run failure checks after every mutation.

---

# 13. Asset ID and filename system

```text
CHM-[TYPE]-[STATUS]-[NUMBER]
```

Types:

- CHR — character
- VID — video
- PLT — still plate
- SH — shot
- HG — Higgsfield generation
- VO — voice
- TR — transcript
- AMB — ambience
- SFX — sound effect
- UI — UI state
- CAP — caption
- MAN — manifest

Status:

- EX — existing
- NEW — new generation required
- DRV — derived crop, grade or parallax
- ALT — alternate

---

# 14. Asset production checklist

## Existing media to place immediately

- 9 videos in `/assets/video/`
- 13 approved daylight/afternoon plates in `/assets/plates/`
- Do not use `P14_ChimeraRoom_empty_late_night.png`

## Mandatory new generation

1. `P15_ChimeraRoom_empty_daylight.png`

## Recommended new generation

2. `V10_student_phone_aftermath_5s.mp4`
3. `V11_Adebayo_VC_call_6s.mp4`
4. `V12_board_absorbs_recommendation_8s.mp4`
5. `P16_Apex_University_exterior_daylight.png`

## Generate only media, never baked UI

Higgsfield should generate:

- people,
- offices,
- phone inserts,
- boardroom reactions,
- architecture-safe workstation plates,
- realistic daylight environments.

Higgsfield must not generate:

- final button text,
- charts,
- sliders,
- system labels,
- defect data,
- UAT letters,
- exact metrics,
- or assessed interface content.

All UI text and controls must be real HTML/React.

---

# 15. Media placement manifest

| Page | Media before UI | Final held image | UI appears |
|---|---|---|---:|
| 01 | Abuja → door → cast | P05_ROOM | 14.7s |
| 02 | P05/P02 2.5D push | same plate | 2.4s |
| 03 | V02 segment C | final Chidi frame | 3.2s |
| 04 | optional P10 hold | P10 | 2.6s |
| 05 | V01 segment A | P10 | 3.2s |
| 06 | Adebayo line over P10 | P10 | 2.6s |
| 07 | folder → Chidi → red board | P06 | 8.7s |
| 08 | P11 | P11 | 0.2s |
| 09 | V02 segment D | final Chidi frame | 2.2s |
| 10 | phone → transaction UI → reactions | P07 / office plate | 12.7s |
| 11 | door → Folake → QA plate | P12 | 6.2s |
| 12 | P12 push → Folake D | P12 | 3.2s |
| 13 | P13 parallax | P13 | 2.8s |
| 14 | door → executive | P08 | 8.2s |
| 15 | montage | final montage frame | 13.2s |
| 16 | P15 daylight empty room | P15 | 2.5s |
| 17 | P15 | P15 | 0.2s |
| 18 | P08 daylight grade | P08 | 0.2s |
| 19 | P06 daylight | P06 | 0.2s |
| 20 | P15 hold | P15 | 4.0s |

---

# 16. Reference image packaging

Create this folder before handing the build to Claude:

```text
/public/references/project-chimera/
  P01.png
  P02.png
  P03.png
  P04.png
  P05.png
  P06.png
  P07.png
  P08.png
  P09.png
  P10.png
  P11.png
  P12.png
  P13.png
  P14.png
  P15.png
  P16.png
  P17.png
  P18.png
  P19.png
  P20.png
```

Each image must be a separate 16:9 file.

Never combine multiple page references into a grid.

Claude must compare each route to its matching single-page reference.

---

# 17. Accessibility

- All buttons have visible 2px Paper focus rings.
- All drag interactions have click and keyboard alternatives.
- Sliders support arrow keys.
- UAT cards support Enter, Delete and position selectors.
- Captions are toggleable.
- Videos have poster fallbacks.
- Media does not gate interaction.
- Reduced motion replaces videos with plates.
- Minimum target size is 44×44px.
- Text remains readable at 200% zoom.
- Semantic states use icons and words, not colour alone.
- `aria-live="polite"` announces variable changes.
- `aria-live="assertive"` is used only for the Page 10 crisis interruption.

---

# 18. Motion

Allowed:

- opacity,
- 8–14px vertical reveal,
- 2–3% slow image push,
- controlled card replacement,
- flat cross-fade between media and plate.

Not allowed:

- bounce,
- overshoot,
- pulsing buttons,
- floating cards,
- looping character footage,
- repeated zooms,
- glow,
- page-wide parallax during interaction.

```ts
export const MOTION = {
  fast: 0.14,
  base: 0.24,
  scene: 0.42,
  cinematic: 0.60,
  easeOut: [0.16, 1, 0.3, 1]
};
```

---

# 19. Responsive behaviour

## 1920×1080 and 1366×768

Use the exact fixed stage and proportional scaling.

## Tablet landscape

Use the same visual composition, cropped around the centre where necessary. Keep UI panels fully visible.

## Mobile

Use a separate linear presentation:

- media on top,
- interaction below,
- no precision drag required,
- same scoring,
- same content,
- same asset order.

The 1920×1080 fixed-stage page is the authoritative design.

---

# 20. Final QA checklist

Before handoff, verify:

- all 20 routes exist,
- every reference page is a separate image,
- no page references are combined in a grid,
- all media fills the page,
- UI uses Afacad and Manrope only,
- no gradients exist,
- no night imagery exists,
- `P14_ChimeraRoom_empty_late_night.png` is not used,
- videos play before UI,
- video clips do not loop,
- every video can be skipped after 2 seconds,
- UI shows the final usable state in mockups,
- Page 02 cards are compact,
- Page 04 remains a real interactive graph,
- Page 08 totals exactly 100 before submit appears,
- Page 09 is Trust Holds, not an allocation dashboard,
- Page 10 uses the fixed ₦50,000 crisis,
- Page 11 uses C → A → D → B → E,
- Page 13 is a ledger, not a dashboard,
- Page 14 presents three neutral recommendations,
- Page 15 has no UI during the montage,
- Page 16 is the only scrolling page,
- Pages 17–20 remain professional, daylight and restrained,
- all assessed text is real HTML, not baked into generated imagery,
- all character identity, wardrobe and office geography remain consistent.

---

# 21. Final instruction to Claude

Build Project Chimera as a **state-driven cinematic simulation**, not as twenty unrelated dashboards.

For every route:

1. load the matching full-page media,
2. play the assigned clip or hold the assigned plate,
3. reveal the final required UI only after the media beat,
4. keep text minimal,
5. preserve all existing task logic,
6. replace interaction with feedback,
7. show only relevant variable changes,
8. route to the next story beat,
9. use the matching separate page reference,
10. never invent additional chrome, colours, cards, copy, or media.

When a requirement in a generated mockup conflicts with this master document, this master document is the source of truth.
