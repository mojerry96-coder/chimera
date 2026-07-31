import { useMemo, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton } from "@/components/controls";
import { Plate } from "@/media/MediaSequence";
import { PLATE } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useReveal } from "@/lib/useReveal";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";
import { DEFECTS, type DefectId } from "@/config/missionData";

type Alloc = Record<DefectId, number>;
const ZERO: Alloc = { d07: 0, d12: 0, d19: 0, d23: 0 };

/**
 * PAGE 08 — Engineer allocation.  Route /t2
 *
 * Makes scarcity visible: the player cannot fix everything equally.
 *
 * Section 10 page 08 — Submit does not exist until the total is exactly 100.
 * Keyboard is a first-class path, not an afterthought: arrows step 1,
 * shift+arrows step 10, Home zeroes, End claims whatever is unassigned.
 */
export default function T2Allocate() {
  const { go } = useSceneNav("t2");
  const patch = useSim((s) => s.patch);
  const spendTime = useSim((s) => s.spendTime);

  const [alloc, setAlloc] = useState<Alloc>(ZERO);
  const r = useReveal([0.2]);

  useVoice(useMemo(() => [VO.P08_FOL_01], []));

  const total = Object.values(alloc).reduce((a, b) => a + b, 0);
  const remaining = 100 - total;
  const complete = total === 100;

  const setOne = (id: DefectId, v: number) => {
    const others = total - alloc[id];
    setAlloc({ ...alloc, [id]: Math.max(0, Math.min(100 - others, Math.round(v))) });
  };

  const onKey = (e: React.KeyboardEvent, id: DefectId) => {
    const step = e.shiftKey ? 10 : 1;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); setOne(id, alloc[id] + step); }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); setOne(id, alloc[id] - step); }
    if (e.key === "Home") { e.preventDefault(); setOne(id, 0); }
    if (e.key === "End") { e.preventDefault(); setOne(id, alloc[id] + remaining); }
  };

  const submit = () => {
    // D-07 is the payment double-charge. Under-resourcing it is what triggers
    // the crisis branch — bible section 5 page 10.
    const d07Share = alloc.d07;
    const contained = d07Share >= 30;

    patch(
      {
        allocation: alloc,
        defectBacklog: contained ? 3 : 4,
        launchReadiness: contained ? 72 : 58,
        pilotConfidence: contained ? 66 : 48,
        crisisTriggered: !contained
      },
      "Allocation submitted"
    );
    spendTime(4, "Defect triage");
    go(contained ? "t2-good" : "t2-crisis");
  };

  return (
    <PageShell
      pageNumber="08"
      media={<Plate src={PLATE.P11_ALLOCATION} alt="The project table." filter="under-ui" />}
    >
      {r.at(1) && (
        <>
          <Box x={84} y={62} w={1518} h={956} z={10} className="flat-panel" />

          <Box x={132} y={118} w={1320} h={120} z={20}>
            <span className="label text-[var(--accent)]">Task 2 · Triage</span>
            <h1 className="display-md mt-14 text-[var(--paper)]">
              ENGINEER <span className="text-[var(--accent)]">ALLOCATION</span>
            </h1>
          </Box>

          {/* Rows are 1374x112 with a 16px gap. No engineer names, no long copy. */}
          <Box x={132} y={290} w={1374} h={500} z={20}>
            <div className="flex h-full flex-col gap-16">
              {DEFECTS.map((d) => (
                <div
                  key={d.id}
                  className="flex h-[112px] shrink-0 items-center gap-24 rounded-[var(--radius-card)] border border-[var(--line)] bg-[var(--surface)] px-28"
                >
                  <span className="w-[160px] shrink-0 font-manrope text-[17px] font-semibold text-[var(--paper)]">
                    {d.code}
                  </span>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={alloc[d.id]}
                    onChange={(e) => setOne(d.id, Number(e.target.value))}
                    onKeyDown={(e) => onKey(e, d.id)}
                    aria-label={`${d.code} ${d.title}, percent of engineering effort`}
                    aria-valuetext={`${alloc[d.id]} percent`}
                    className="h-[6px] w-[760px] shrink-0 cursor-pointer appearance-none rounded-full bg-[var(--surface-raised)] accent-[var(--accent)]"
                  />

                  <span className="w-[160px] shrink-0 text-right font-afacad text-[40px] tabular-nums text-[var(--paper)]"
                        style={{ fontFamily: '"Afacad", sans-serif' }}>
                    {alloc[d.id]}
                  </span>

                  <span className="w-[220px] shrink-0 font-manrope text-[13px] text-[var(--text-muted)]">
                    {d.title}
                  </span>
                </div>
              ))}
            </div>
          </Box>

          <Box x={132} y={824} w={1374} h={126} z={20}>
            <div className="flex h-full items-center justify-between rounded-[var(--radius-card)] border border-[var(--line)] bg-[var(--surface)] px-36">
              <div>
                <p className="label text-[var(--text-muted)]">Total allocated</p>
                <p
                  className="mt-10 text-[44px] tabular-nums"
                  style={{ fontFamily: '"Afacad", sans-serif' }}
                >
                  <span className={complete ? "text-[var(--success)]" : "text-[var(--paper)]"}>
                    {total}
                  </span>
                  <span className="text-[var(--text-faint)]"> / 100</span>
                </p>
              </div>
              <p className="body text-[var(--text-muted)]">
                {complete ? "Allocation complete." : `${remaining} points unassigned.`}
              </p>
            </div>
          </Box>

          {complete && (
            <Box x={1080} y={850} w={390} h={74} z={30}>
              <PrimaryButton onClick={submit}>
                Submit Allocation <ArrowRight size={18} />
              </PrimaryButton>
            </Box>
          )}
        </>
      )}
    </PageShell>
  );
}
