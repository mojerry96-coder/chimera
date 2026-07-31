import { create } from "zustand";

/** Master prompt section 12 — simulation state. */
export interface SimState {
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

  patternDesigned: "monolithic" | "layered" | "microservices" | null;
  justificationText: string;

  allocation: { d07: number; d12: number; d19: number; d23: number } | null;
  workflowSequence: string[] | null;
  finalDecision: "full" | "phased" | "delay" | null;

  timeSpentByTask: Record<string, number>;
  currentScene: string;
}

export const INITIAL_STATE: SimState = {
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

/** Section 11 — variable changes surface contextually, never as a status rail. */
export type MetricDelta = { label: string; before: string; after: string };
export type ToastPayload = { cause: string; deltas: MetricDelta[] };

export type FailureRoute =
  | "failure-time"
  | "failure-confidence"
  | "failure-readiness"
  | "failure-crisis";

/**
 * Section 12 — run failure checks after every mutation.
 *
 * Order matters. Crisis mismanagement is checked first because it is an
 * ethical failure the player caused directly, and it should not be masked by
 * a metric threshold that the same choice pushed over the edge.
 */
export function checkFailure(s: SimState): FailureRoute | null {
  if (s.crisisChoice === "C") return "failure-crisis";
  if (s.timeRemaining <= 0) return "failure-time";
  if (s.pilotConfidence <= 20) return "failure-confidence";
  if (s.launchReadiness <= 25) return "failure-readiness";
  return null;
}

/** Outcome band for the montage and debrief. No score is ever shown. */
export type Band = "excellent" | "good" | "developing" | "poor";

export function outcomeBand(s: SimState): Band {
  let score = 0;
  if (s.architectureValidity === "valid") score += 2;
  if (s.justificationQuality === "strong") score += 2;
  if (s.crisisChoice === "A") score += 2;
  else if (s.crisisChoice === "B") score += 1;
  if (s.workflowAttempts <= 1) score += 2;
  if (s.pilotConfidence >= 60) score += 1;
  if (s.launchReadiness >= 65) score += 1;
  if (s.timeRemaining >= 12) score += 1;

  if (score >= 10) return "excellent";
  if (score >= 7) return "good";
  if (score >= 4) return "developing";
  return "poor";
}

type Actions = {
  patch: (p: Partial<SimState>, cause?: string) => FailureRoute | null;
  spendTime: (hours: number, task: string) => FailureRoute | null;
  reset: () => void;
  toast: ToastPayload | null;
  clearToast: () => void;
  pendingFailure: FailureRoute | null;
};

const LABELS: Partial<Record<keyof SimState, string>> = {
  timeRemaining: "Time",
  pilotConfidence: "Pilot confidence",
  launchReadiness: "Launch readiness",
  defectBacklog: "Defect backlog"
};

const fmt = (k: keyof SimState, v: unknown) =>
  k === "timeRemaining" ? `${v}h` : k === "defectBacklog" ? String(v) : `${v}%`;

export const useSim = create<SimState & Actions>((set, get) => ({
  ...INITIAL_STATE,
  toast: null,
  pendingFailure: null,

  patch: (p, cause) => {
    const before = get();
    const next = { ...before, ...p };

    // Section 11 — show only variables that actually changed.
    const deltas: MetricDelta[] = (Object.keys(LABELS) as (keyof SimState)[])
      .filter((k) => k in p && before[k] !== next[k])
      .map((k) => ({ label: LABELS[k]!, before: fmt(k, before[k]), after: fmt(k, next[k]) }));

    const failure = checkFailure(next);
    set({
      ...p,
      pendingFailure: failure,
      toast: cause && deltas.length ? { cause, deltas } : get().toast
    });
    return failure;
  },

  spendTime: (hours, task) => {
    const s = get();
    const spent = { ...s.timeSpentByTask, [task]: (s.timeSpentByTask[task] ?? 0) + hours };
    return get().patch(
      { timeRemaining: Math.max(0, s.timeRemaining - hours), timeSpentByTask: spent },
      `${task} · ${hours}h`
    );
  },

  clearToast: () => set({ toast: null }),
  reset: () => set({ ...INITIAL_STATE, toast: null, pendingFailure: null })
}));
