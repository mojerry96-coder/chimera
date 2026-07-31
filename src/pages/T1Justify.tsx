import { useMemo, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton, TextAction } from "@/components/controls";
import { Plate } from "@/media/MediaSequence";
import { PLATE } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useReveal } from "@/lib/useReveal";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";
import { JUSTIFICATION_CRITERIA } from "@/config/missionData";

/**
 * Quality is judged on whether the player engaged the trade-offs, not on
 * length or keyword bingo. A criterion counts as addressed when it is named
 * and accompanied by enough surrounding reasoning to be an argument.
 */
function assess(text: string) {
  const t = text.toLowerCase();
  const words = t.split(/\s+/).filter(Boolean).length;

  const synonyms: Record<string, string[]> = {
    Scalability: ["scal", "load", "throughput", "grow", "capacity", "concurrent"],
    Maintainability: ["maintain", "readab", "modular", "test", "debug", "onboard", "couple"],
    Integration: ["integrat", "interoper", "api", "contract", "boundar", "connect"],
    Cost: ["cost", "budget", "spend", "cheap", "expensive", "licen", "resource"]
  };

  const covered = JUSTIFICATION_CRITERIA.filter((c) =>
    synonyms[c].some((s) => t.includes(s))
  );

  // A trade-off argument weighs something against something else.
  const weighsTradeoffs = /\b(trade[- ]?off|however|but |whereas|instead of|rather than|at the cost|in exchange|versus|vs\.?)\b/.test(t);

  const strong = covered.length >= 3 && words >= 60 && weighsTradeoffs;
  return { covered, words, weighsTradeoffs, quality: strong ? ("strong" as const) : ("weak" as const) };
}

/**
 * PAGE 06 — Architecture justification.  Route /t1-justify
 *
 * Reveals whether the player understands trade-offs or only recognises shapes.
 *
 * The weak branch is deliberately silent — section 10 page 06 specifies no
 * spoken reprimand, only Adebayo reading and withholding approval. The silence
 * carries the failure. Only the strong branch speaks.
 */
export default function T1Justify() {
  const { go } = useSceneNav("t1-justify");
  const patch = useSim((s) => s.patch);
  const spendTime = useSim((s) => s.spendTime);
  const attempts = useSim((s) => s.justificationAttempts);
  const saved = useSim((s) => s.justificationText);

  const [text, setText] = useState(saved);
  const r = useReveal([2.6]);

  useVoice(useMemo(() => [VO.P06_ADB_01], []));

  const model = useMemo(() => assess(text), [text]);
  const canSubmit = text.trim().length > 0;

  const submit = () => {
    patch(
      {
        justificationText: text,
        justificationQuality: model.quality,
        justificationAttempts: attempts + 1,
        pilotConfidence: model.quality === "strong" ? 68 : 54
      },
      model.quality === "strong" ? "Justification accepted" : "Justification noted"
    );
    if (attempts > 0) spendTime(2, "Justification rewrite");
    go("t2-intro");
  };

  return (
    <PageShell
      pageNumber="06"
      media={<Plate src={PLATE.P10_ARCHITECTURE} alt="The architecture workstation." filter="under-ui" />}
    >
      {r.at(1) && (
        <>
          <Box x={226} y={64} w={1468} h={952} z={10} className="flat-panel" />

          <Box x={290} y={102} w={420} h={34} z={20}>
            <span className="label text-[var(--accent)]">Project Chimera · 06</span>
          </Box>

          <Box x={290} y={150} w={1160} h={88} z={20}>
            <h1 className="display-lg text-[var(--paper)]">
              ARCHITECTURE <span className="text-[var(--accent)]">JUSTIFICATION</span>
            </h1>
          </Box>

          {/* Four criteria, 318px wide with a 22px gap. */}
          <Box x={290} y={266} w={1340} h={64} z={20}>
            <div className="flex h-full gap-22">
              {JUSTIFICATION_CRITERIA.map((c) => {
                const done = model.covered.includes(c);
                return (
                  <div
                    key={c}
                    className={`flex h-full w-[318px] items-center gap-12 rounded-[var(--radius-control)] border px-20 transition-colors ${
                      done
                        ? "border-[var(--accent)] bg-[var(--surface-raised)]"
                        : "border-[var(--line)] bg-[var(--surface)]"
                    }`}
                  >
                    <span className={done ? "text-[var(--accent)]" : "text-[var(--text-faint)]"}>
                      {done ? "✓" : "○"}
                    </span>
                    <span
                      className={`font-manrope text-[13px] font-semibold uppercase tracking-[0.1em] ${
                        done ? "text-[var(--paper)]" : "text-[var(--text-muted)]"
                      }`}
                    >
                      {c}
                    </span>
                  </div>
                );
              })}
            </div>
          </Box>

          {/* Section 10 page 06 — no character count in the live interface. */}
          <Box x={290} y={350} w={1340} h={490} z={20}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-label="Why is this architecture right for Chimera?"
              placeholder="Why is this architecture right for Chimera — not why it is fashionable?"
              className="h-full w-full resize-none rounded-[var(--radius-card)] border border-[var(--line)] bg-[var(--bg-deep)] p-28 text-[17px] leading-[1.65] text-[var(--paper)] outline-none placeholder:text-[var(--text-faint)] focus:border-[var(--line-strong)]"
              style={{ fontFamily: '"Manrope", sans-serif' }}
            />
          </Box>

          <Box x={1170} y={866} w={130} h={56} z={20}>
            <TextAction onClick={() => setText("")}>Clear</TextAction>
          </Box>

          <Box x={1320} y={866} w={310} h={56} z={20}>
            <PrimaryButton onClick={submit} disabled={!canSubmit}>
              Submit <ArrowRight size={18} />
            </PrimaryButton>
          </Box>
        </>
      )}
    </PageShell>
  );
}
