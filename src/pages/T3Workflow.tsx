import { useMemo, useState } from "react";
import { ArrowRight, Check, Warning } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton } from "@/components/controls";
import { MediaSequence, type MediaCue } from "@/media/MediaSequence";
import { VIDEO, PLATE, SEGMENT, segmentPlate } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";
import { UAT_ORDER, UAT_STEPS } from "@/config/missionData";

type Code = keyof typeof UAT_STEPS;

/** A deliberately wrong opening order. The player reorders; nothing starts empty. */
const START: Code[] = ["A", "B", "C", "D", "E"];

/**
 * PAGE 11 — UAT sign-off workflow.  Route /t3
 *
 * Tests whether the player respects evidence order under pressure. The correct
 * sequence is locked by bible section 12 and never varies: C → A → D → B → E.
 *
 * The mockup for this page names the steps Compliance Lead / Product Owner /
 * Security Lead / QA-UAT Lead / Business Sponsor. That is a different taxonomy
 * from the one both source documents lock, so per master section 21 the master
 * wins and those names are not used.
 *
 * Section 17 — drag is not the only path. Cards are buttons: Enter or Space
 * picks one up, a second card swaps with it, number keys 1-5 send the held card
 * to that position, Escape drops it. No pointer precision is required.
 */
export default function T3Workflow() {
  const { go } = useSceneNav("t3");
  const patch = useSim((s) => s.patch);
  const spendTime = useSim((s) => s.spendTime);
  const attempts = useSim((s) => s.workflowAttempts);

  const [order, setOrder] = useState<Code[]>(START);
  const [held, setHeld] = useState<number | null>(null);
  const [rejected, setRejected] = useState(false);
  const [uiReady, setUiReady] = useState(false);

  const cues = useMemo<MediaCue[]>(
    () => [
      { src: VIDEO.V04_DOOR, poster: PLATE.P04_DOOR, alt: "Entering the QA room." },
      {
        src: VIDEO.V03_FOLAKE,
        poster: segmentPlate("V03", "A"),
        start: SEGMENT.A.in,
        end: SEGMENT.A.out,
        alt: "Folake reading the sign-off folder."
      },
      { poster: PLATE.P12_UAT, hold: 0.2, alt: "The QA table.", filter: "under-ui" }
    ],
    []
  );

  useVoice(useMemo(() => [VO.P11_FOL_01], []));

  const swap = (i: number, j: number) => {
    setOrder((o) => {
      const next = [...o];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setRejected(false);
  };

  const onCard = (i: number) => {
    if (held === null) setHeld(i);
    else if (held === i) setHeld(null);
    else {
      swap(held, i);
      setHeld(null);
    }
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "Escape") return setHeld(null);
    if (e.key === "Delete" || e.key === "Backspace") return setHeld(null);
    const n = Number(e.key);
    if (held !== null && n >= 1 && n <= 5) {
      e.preventDefault();
      swap(held, n - 1);
      setHeld(null);
    }
    if (e.key === "ArrowLeft" && i > 0) { e.preventDefault(); swap(i, i - 1); }
    if (e.key === "ArrowRight" && i < 4) { e.preventDefault(); swap(i, i + 1); }
  };

  const correct = order.every((c, i) => c === UAT_ORDER[i]);

  const submit = () => {
    if (!correct) {
      // Wrong order costs time and confidence, and the player stays here.
      setRejected(true);
      patch({ workflowAttempts: attempts + 1 }, "Workflow rejected");
      spendTime(2, "Workflow correction");
      return;
    }
    patch(
      { workflowSequence: order, workflowAttempts: attempts + 1, launchReadiness: 80 },
      "Workflow approved"
    );
    go("t3-resolve");
  };

  return (
    <PageShell
      pageNumber="11"
      media={<MediaSequence cues={cues} onComplete={() => setUiReady(true)} />}
    >
      {uiReady && (
        <>
          <Box x={50} y={70} w={1030} h={930} z={10} className="flat-panel" />

          <Box x={110} y={176} w={850} h={110} z={20}>
            <h1 className="display-md text-[var(--paper)]">
              UAT <span className="text-[var(--accent)]">SIGN-OFF</span>
              <br />
              WORKFLOW
            </h1>
          </Box>

          <Box x={110} y={330} w={860} h={70} z={20}>
            <p className="body-lg text-[var(--paper-soft)]">
              Place the approval steps in the order the evidence must move.
            </p>
            <p className="body mt-8 text-[var(--text-faint)]">
              Select a card, then select another to swap. Keys 1–5 move a held card.
            </p>
          </Box>

          {/* Cards are 152x184 with a 25px gap: 5x152 + 4x25 = 860. */}
          <Box x={110} y={438} w={860} h={184} z={20}>
            <ol className="flex h-full gap-25" role="list">
              {order.map((code, i) => {
                const isHeld = held === i;
                const inPlace = code === UAT_ORDER[i];
                return (
                  <li key={code} className="contents">
                    <button
                      onClick={() => onCard(i)}
                      onKeyDown={(e) => onKey(e, i)}
                      aria-label={`Position ${i + 1}: ${UAT_STEPS[code]}${isHeld ? ", held" : ""}`}
                      aria-pressed={isHeld}
                      className={`flex h-[184px] w-[152px] flex-col items-center justify-between rounded-[var(--radius-card)] border p-16 transition-colors ${
                        isHeld
                          ? "border-[var(--accent)] bg-[var(--surface-raised)]"
                          : "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-raised)]"
                      }`}
                    >
                      <Check
                        size={16}
                        className={inPlace ? "text-[var(--success)]" : "text-[var(--text-faint)]"}
                      />
                      <span
                        className="text-[46px] text-[var(--accent)]"
                        style={{ fontFamily: '"Afacad", sans-serif', lineHeight: 1 }}
                      >
                        {code}
                      </span>
                      <span className="text-center font-manrope text-[11px] leading-[1.3] text-[var(--text-muted)]">
                        {UAT_STEPS[code]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Box>

          <Box x={110} y={670} w={860} h={88} z={20}>
            <div
              className={`flex h-full items-center gap-16 rounded-[var(--radius-card)] border px-28 ${
                rejected ? "border-[var(--danger)]" : "border-[var(--line)]"
              }`}
              aria-live="polite"
            >
              {rejected ? (
                <>
                  <Warning size={24} className="text-[var(--danger)]" />
                  <span className="body text-[var(--paper-soft)]">
                    That sequence cannot carry the evidence. A sign-off is not a formality.
                  </span>
                </>
              ) : (
                <>
                  <Check size={24} className={correct ? "text-[var(--success)]" : "text-[var(--text-faint)]"} />
                  <span className="body text-[var(--text-muted)]">
                    {correct
                      ? "Sequence ready to submit."
                      : "Current sequence: " + order.join(" → ")}
                  </span>
                </>
              )}
            </div>
          </Box>

          <Box x={110} y={814} w={860} h={66} z={20}>
            <PrimaryButton onClick={submit}>
              Submit Workflow <ArrowRight size={18} />
            </PrimaryButton>
          </Box>
        </>
      )}
    </PageShell>
  );
}
