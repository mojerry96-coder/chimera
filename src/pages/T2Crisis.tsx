import { useMemo, useState } from "react";
import { ArrowRight, Phone, Users, EyeSlash, Check, Warning } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton } from "@/components/controls";
import { MediaSequence, type MediaCue } from "@/media/MediaSequence";
import { VIDEO, PLATE, heldFrame } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";
import { CRISIS } from "@/config/missionData";

const CHOICE_ICON = { A: Phone, B: Users, C: EyeSlash } as const;

/**
 * PAGE 10 — Duplicate-payment crisis.  Route /t2-crisis
 *
 * The page where defect prioritisation becomes a person. Bible section 12 —
 * always Apex University, always a duplicate debit, always ₦50,000, always
 * public once the student posts receipts.
 *
 * Section 10 page 10 — the repeated charges are live UI, never baked into
 * video. They are rendered from CRISIS data below.
 *
 * Section 17 — this is the one place in the whole simulation that uses
 * aria-live="assertive". Everything else announces politely.
 */
export default function T2Crisis() {
  const { go } = useSceneNav("t2-crisis");
  const patch = useSim((s) => s.patch);
  const [uiReady, setUiReady] = useState(false);
  const [choice, setChoice] = useState<"A" | "B" | "C" | null>(null);

  /**
   * Recut coverage. The original four cues gave the emotional centre of the
   * film a vibrating phone, a pair of disembodied hands and two reaction
   * shots — no face, no place, and no time to register any of it.
   *
   * This is a scene instead: establish where she is, hold on her face long
   * enough for her to become a person, land on the object, and only then cut
   * to the professionals discussing her. The order is deliberate — the player
   * meets her before they meet the problem.
   */
  const cues = useMemo<MediaCue[]>(
    () => [
      {
        src: VIDEO.V20_STUDENT_WIDE,
        poster: heldFrame("V20"),
        alt: "A student alone in her hostel room, late afternoon, lowering her phone."
      },
      {
        src: VIDEO.V21_STUDENT_CLOSE,
        poster: heldFrame("V21"),
        alt: "Her face, lit by one hard slat of light. She is not crying."
      },
      {
        poster: PLATE.P22_PHONE_INSERT,
        hold: 2.5,
        alt: "Her phone lying blank on a scarred wooden desk, her hand resting beside it."
      },
      {
        src: VIDEO.V22_ADEBAYO_VC,
        poster: heldFrame("V22"),
        alt: "Dr Adebayo at the window, taking the Vice-Chancellor's call."
      },
      {
        src: VIDEO.V23_FOLAKE_CONCERN,
        poster: heldFrame("V23"),
        alt: "Folake in the QA room, looking directly at you."
      }
    ],
    []
  );

  /**
   * Cue points against the recut, which runs
   *   0.0   V20 wide          5.0s
   *   5.0   V21 close         5.0s
   *  10.1   phone insert      2.5s   — deliberately silent
   *  12.6   V22 Adebayo       6.0s
   *  18.6   V23 Folake        5.0s
   *
   * The student's 9.6s line covers her own two shots. The insert plays in
   * silence so the object lands on its own. Adebayo and Folake then speak on
   * their own shots rather than over hers.
   */
  useVoice(useMemo(() => [VO.P10_STU_01, VO.P10_ADB_01, VO.P10_FOL_01], []), {
    offsets: [0, 12.8, 18.9]
  });

  const confirm = () => {
    if (!choice) return;
    // Choice C is the ethical failure and routes straight to page 20 via the
    // store's failure check — it is not a metric threshold.
    const effects = {
      A: { pilotConfidence: 74, launchReadiness: 70 },
      B: { pilotConfidence: 42, launchReadiness: 60 },
      C: { pilotConfidence: 12, launchReadiness: 44 }
    }[choice];

    patch({ crisisChoice: choice, crisisTriggered: true, ...effects }, "Crisis response");
    if (choice !== "C") go("t3");
  };

  return (
    <PageShell
      pageNumber="10"
      media={<MediaSequence cues={cues} onComplete={() => setUiReady(true)} />}
    >
      {uiReady && (
        <>
          <Box x={0} y={0} w={1110} h={1080} z={10} className="bg-[rgba(23,25,24,.95)]" />

          <Box x={72} y={162} w={360} h={20} z={20}>
            <span className="label text-[var(--danger)]">Incident · {CRISIS.ticketId}</span>
          </Box>

          {/* Three lines at the 112px display-xl measure 282px against the
              specified 240px box and would collide with the situation line at
              y=506. display-lg gives 232px and sits inside the box. */}
          <Box x={72} y={230} w={900} h={240} z={20}>
            <h1 className="display-lg text-[var(--paper)]">
              A STUDENT
              <br />
              WAS CHARGED
              <br />
              <span className="text-[var(--accent)]">TWICE</span>
            </h1>
          </Box>

          {/* Live UI, never baked into the plate. */}
          <Box x={74} y={506} w={800} h={38} z={20}>
            <div
              role="alert"
              aria-live="assertive"
              className="flex items-center gap-14"
            >
              <Warning size={22} className="text-[var(--danger)]" />
              <p className="body-lg text-[var(--paper-soft)]">
                A duplicate {CRISIS.amountLabel} charge at {CRISIS.university} is now public.
              </p>
            </div>
          </Box>

          {/* Choice cards are 294x196 with a 24px gap. Only the selected card
              takes the accent — section 10 forbids three coloured cards. */}
          <Box x={72} y={628} w={930} h={196} z={20}>
            <div className="flex h-full gap-24">
              {CRISIS.choices.map((c) => {
                const Icon = CHOICE_ICON[c.id];
                const on = choice === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setChoice(c.id)}
                    aria-pressed={on}
                    className={`relative flex h-full w-[294px] flex-col justify-between rounded-[var(--radius-card)] border p-24 text-left transition-colors ${
                      on
                        ? "border-[var(--accent)] bg-[var(--surface-raised)]"
                        : "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-raised)]"
                    }`}
                  >
                    {on && (
                      <span className="absolute right-18 top-18 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[var(--accent)]">
                        <Check size={15} weight="bold" className="text-[var(--bg-deep)]" />
                      </span>
                    )}
                    <Icon size={30} className={on ? "text-[var(--accent)]" : "text-[var(--text-muted)]"} />
                    <div>
                      <p className="font-manrope text-[19px] font-semibold text-[var(--paper)]">
                        {c.title}
                      </p>
                      <p className="body mt-8 text-[var(--text-muted)]">{c.detail}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Box>

          {choice && (
            <Box x={72} y={856} w={540} h={66} z={20}>
              <PrimaryButton onClick={confirm}>
                Confirm Response <ArrowRight size={18} />
              </PrimaryButton>
            </Box>
          )}
        </>
      )}
    </PageShell>
  );
}
