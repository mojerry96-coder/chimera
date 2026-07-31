import { useMemo, useState } from "react";
import { ArrowRight, Phone, Users, EyeSlash, Check, Warning } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton } from "@/components/controls";
import { MediaSequence, type MediaCue } from "@/media/MediaSequence";
import { VIDEO, PLATE, SEGMENT, segmentPlate } from "@/media/assets";
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

  const cues = useMemo<MediaCue[]>(
    () => [
      { src: VIDEO.V07_PHONE, poster: PLATE.P07_PHONE, alt: "A phone vibrates on a desk." },
      { src: VIDEO.V10_PHONE_AFTERMATH, poster: PLATE.P17_STUDENT_ROOM, alt: "A student lowers her phone to the desk." },
      {
        src: VIDEO.V01_ADEBAYO,
        poster: segmentPlate("V01", "B"),
        start: SEGMENT.B.in,
        end: SEGMENT.B.out,
        alt: "Dr Adebayo takes a call."
      },
      {
        src: VIDEO.V03_FOLAKE,
        poster: segmentPlate("V03", "C"),
        start: SEGMENT.C.in,
        end: SEGMENT.C.out,
        alt: "Folake, concerned."
      }
    ],
    []
  );

  useVoice(useMemo(() => [VO.P10_STU_01, VO.P10_ADB_01, VO.P10_FOL_01], []));

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
