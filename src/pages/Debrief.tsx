import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ArrowCounterClockwise,
  DownloadSimple,
  CaretDown
} from "@phosphor-icons/react";
import { ScrollStage } from "@/lib/ScrollStage";
import { Box } from "@/lib/stage";
import { ProjectChimeraBrand } from "@/components/Brand";
import { PrimaryButton, SecondaryButton, TextAction } from "@/components/controls";
import { Plate } from "@/media/MediaSequence";
import { PLATE } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim, INITIAL_STATE, outcomeBand } from "@/state/simStore";
import { REFLECTION_QUESTIONS, choiceInsights, TIME_CATEGORIES } from "@/config/debriefContent";

const BAND_LINE = {
  excellent: "You did not chase certainty. You built enough evidence to make a responsible decision.",
  good: "You did not chase certainty. You built enough evidence to make a responsible decision.",
  developing: "You reached the room, but your evidence arrived damaged. Review where pressure changed your judgement.",
  poor: "The outcome began long before the final decision. Trace it back to the first compromise."
} as const;

/**
 * PAGE 16 — Decision record / debrief.  Route /debrief
 *
 * Turns the player's route into insight rather than a generic score screen.
 * This is the only page in the simulation that scrolls.
 *
 * The mockup for this page is a compact five-row card with Finish and Export.
 * Master section 10 page 16 specifies something substantially larger: six
 * start/end metrics, a time-consumption breakdown, seven accordion insight
 * rows, eight reflection questions shown one at a time, and export plus redo.
 * Master section 21 governs, so the full structure is built.
 */
export default function Debrief() {
  const { go } = useSceneNav("debrief");
  const s = useSim();
  const reset = useSim((st) => st.reset);

  const band = useMemo(() => outcomeBand(s), [s]);
  const insights = useMemo(() => choiceInsights(s), [s]);

  const [open, setOpen] = useState<string | null>("Architecture");
  const [q, setQ] = useState(0);

  useVoice(
    useMemo(
      () => [band === "developing" ? VO.P16_ADB_DEV : band === "poor" ? VO.P16_ADB_POOR : VO.P16_ADB_EX],
      [band]
    )
  );

  /** Six metric cards, each showing start, end and change. */
  const metrics = [
    { k: "Time", from: `${INITIAL_STATE.timeRemaining}h`, to: `${s.timeRemaining}h`, d: s.timeRemaining - INITIAL_STATE.timeRemaining },
    { k: "Confidence", from: `${INITIAL_STATE.pilotConfidence}%`, to: `${s.pilotConfidence}%`, d: s.pilotConfidence - INITIAL_STATE.pilotConfidence },
    { k: "Readiness", from: `${INITIAL_STATE.launchReadiness}%`, to: `${s.launchReadiness}%`, d: s.launchReadiness - INITIAL_STATE.launchReadiness },
    { k: "Backlog", from: `${INITIAL_STATE.defectBacklog}`, to: `${s.defectBacklog}`, d: s.defectBacklog - INITIAL_STATE.defectBacklog },
    { k: "Architecture", from: "none", to: s.architectureValidity, d: 0 },
    { k: "Justification", from: "none", to: s.justificationQuality, d: 0 }
  ];

  const exportReport = () => {
    const report = {
      simulation: "Project Chimera — The Last Test Before Launch",
      completedAt: new Date().toISOString(),
      outcomeBand: band,
      finalDecision: s.finalDecision,
      metrics: metrics.map((m) => ({ metric: m.k, start: m.from, end: m.to })),
      timeSpentByTask: s.timeSpentByTask,
      architecture: { pattern: s.patternDesigned, validity: s.architectureValidity, attempts: s.architectureAttempts },
      justification: { quality: s.justificationQuality, attempts: s.justificationAttempts, text: s.justificationText },
      allocation: s.allocation,
      crisisChoice: s.crisisChoice,
      workflow: { sequence: s.workflowSequence, attempts: s.workflowAttempts },
      insights: insights.map((i) => ({ area: i.key, summary: i.summary }))
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project-chimera-decision-record.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const delta = (d: number) =>
    d === 0 ? null : (
      <span className={d > 0 ? "text-[var(--success)]" : "text-[var(--danger)]"}>
        {d > 0 ? "▲" : "▼"} {Math.abs(d)}
      </span>
    );

  return (
    <ScrollStage
      media={<Plate src={PLATE.P15_EMPTY_DAY} alt="The empty project room in daylight." filter="under-ui" />}
    >
      {/* ---------- First viewport ---------- */}
      <Box x={64} y={52} w={390} h={54} z={30}>
        <ProjectChimeraBrand />
      </Box>
      <Box x={1810} y={54} w={54} h={32} z={30}>
        <span className="label text-[var(--accent)]">16</span>
      </Box>

      <Box x={830} y={40} w={1030} h={1000} z={10} className="flat-panel" />

      <Box x={884} y={104} w={860} h={86} z={20}>
        <span className="label text-[var(--accent)]">Simulation debrief</span>
        <h1 className="heading-lg mt-12 text-[var(--paper)]">DECISION RECORD</h1>
      </Box>

      {/* Six metrics: 3 columns x 2 rows, cards 274x118, gap 18. */}
      <Box x={884} y={220} w={860} h={264} z={20}>
        <div className="grid grid-cols-3 gap-18">
          {metrics.map((m) => (
            <div
              key={m.k}
              className="flex h-[118px] w-[274px] flex-col justify-between rounded-[var(--radius-control)] border border-[var(--line)] bg-[var(--surface)] p-18"
            >
              <span className="label text-[var(--text-muted)]">{m.k}</span>
              <div className="flex items-baseline gap-10">
                <span className="body text-[var(--text-faint)]">{m.from}</span>
                <ArrowRight size={13} className="text-[var(--text-faint)]" />
                <span className="font-manrope text-[20px] font-semibold capitalize text-[var(--paper)]">
                  {m.to}
                </span>
              </div>
              <span className="font-manrope text-[12px]">{delta(m.d) ?? <span className="text-[var(--text-faint)]">—</span>}</span>
            </div>
          ))}
        </div>
      </Box>

      <Box x={884} y={520} w={420} h={220} z={20}>
        <div className="h-full rounded-[var(--radius-card)] border border-[var(--line)] p-24">
          <p className="label text-[var(--text-muted)]">Time used</p>
          <p className="metric-lg mt-14 text-[var(--paper)]">
            {INITIAL_STATE.timeRemaining - s.timeRemaining}h
          </p>
          <p className="body mt-14 text-[var(--text-muted)]">
            of {INITIAL_STATE.timeRemaining} hours, {s.timeRemaining} remaining
          </p>
        </div>
      </Box>

      <Box x={1324} y={520} w={420} h={220} z={20}>
        <div className="h-full rounded-[var(--radius-card)] border border-[var(--line)] p-24">
          <p className="label text-[var(--text-muted)]">Outcome</p>
          <p className="heading-lg mt-14 capitalize text-[var(--paper)]">{band}</p>
          <p className="body mt-14 text-[var(--text-muted)]">
            {s.finalDecision ? `${s.finalDecision} launch recommended` : "No recommendation reached"}
          </p>
        </div>
      </Box>

      <Box x={884} y={800} w={860} h={90} z={20}>
        <p className="body-lg text-[var(--paper-soft)]">“{BAND_LINE[band]}”</p>
      </Box>

      <Box x={1580} y={920} w={164} h={40} z={20}>
        <div className="flex items-center gap-10 text-[var(--text-muted)]">
          <CaretDown size={16} />
          <span className="label">Scroll</span>
        </div>
      </Box>

      {/* ---------- Section 2 — What consumed time ---------- */}
      <Box x={830} y={1140} w={1030} h={360} z={10} className="flat-panel" />
      <Box x={884} y={1196} w={920} h={40} z={20}>
        <h2 className="heading-md text-[var(--paper)]">What consumed time</h2>
      </Box>
      <Box x={884} y={1268} w={920} h={190} z={20}>
        <div className="flex flex-col gap-14">
          {TIME_CATEGORIES.map((c) => {
            const hours = s.timeSpentByTask[c] ?? 0;
            const pct = Math.min(100, (hours / 12) * 100);
            return (
              <div key={c} className="flex items-center gap-20">
                <span className="w-[240px] shrink-0 body text-[var(--text-muted)]">{c}</span>
                <div className="h-[6px] w-[540px] rounded-full bg-[var(--surface-raised)]">
                  <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${pct}%` }} />
                </div>
                <span className="body w-[60px] text-right font-medium text-[var(--paper)]">{hours}h</span>
              </div>
            );
          })}
        </div>
      </Box>

      {/* ---------- Section 3 — What your choices meant ---------- */}
      <Box x={830} y={1560} w={1030} h={760} z={10} className="flat-panel" />
      <Box x={884} y={1616} w={920} h={40} z={20}>
        <h2 className="heading-md text-[var(--paper)]">What your choices meant</h2>
      </Box>
      <Box x={884} y={1688} w={920} h={600} z={20}>
        <div className="flex flex-col">
          {insights.map((row) => {
            const isOpen = open === row.key;
            return (
              <div key={row.key} className="border-b border-[var(--line)]">
                <button
                  onClick={() => setOpen(isOpen ? null : row.key)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between py-18 text-left"
                >
                  <span className="flex items-baseline gap-20">
                    <span className="label w-[160px] shrink-0 text-[var(--accent)]">{row.key}</span>
                    <span className="body text-[var(--paper-soft)]">{row.summary}</span>
                  </span>
                  <CaretDown
                    size={16}
                    className={`shrink-0 text-[var(--text-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <p className="body mb-18 ml-[180px] max-w-[700px] text-[var(--text-muted)]">
                    {row.detail}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Box>

      {/* ---------- Section 4 — Reflection, one question at a time ---------- */}
      <Box x={830} y={2380} w={1030} h={420} z={10} className="flat-panel" />
      <Box x={884} y={2436} w={920} h={40} z={20}>
        <h2 className="heading-md text-[var(--paper)]">Reflection</h2>
      </Box>
      <Box x={884} y={2508} w={920} h={180} z={20}>
        <p className="label text-[var(--accent)]">
          Question {q + 1} of {REFLECTION_QUESTIONS.length}
        </p>
        <p className="body-lg mt-20 text-[var(--paper)]" aria-live="polite">
          {REFLECTION_QUESTIONS[q]}
        </p>
      </Box>
      <Box x={884} y={2700} w={920} h={60} z={20}>
        <div className="flex items-center gap-24">
          <TextAction onClick={() => setQ((n) => Math.max(0, n - 1))} disabled={q === 0}>
            <ArrowLeft size={16} /> Previous
          </TextAction>
          <TextAction
            onClick={() => setQ((n) => Math.min(REFLECTION_QUESTIONS.length - 1, n + 1))}
            disabled={q === REFLECTION_QUESTIONS.length - 1}
          >
            Next <ArrowRight size={16} />
          </TextAction>
        </div>
      </Box>

      {/* ---------- Section 5 — Actions ---------- */}
      <Box x={830} y={2860} w={1030} h={180} z={10} className="flat-panel" />
      <Box x={884} y={2916} w={440} h={68} z={20}>
        <SecondaryButton onClick={exportReport}>
          Export Report <DownloadSimple size={16} />
        </SecondaryButton>
      </Box>
      <Box x={1364} y={2916} w={440} h={68} z={20}>
        <PrimaryButton
          onClick={() => {
            reset();
            go("intro-01");
          }}
        >
          Redo Simulation <ArrowCounterClockwise size={16} />
        </PrimaryButton>
      </Box>

      {/* Bottom breathing room so the last panel is not flush to the fold. */}
      <Box x={0} y={3040} w={1920} h={80} z={1} />
    </ScrollStage>
  );
}
