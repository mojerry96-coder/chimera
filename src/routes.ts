/** Master prompt section 9 — page route order. */
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

export type Route = (typeof ROUTES)[number];

/** Page number shown in the shell marker, and the reference image to compare against. */
export const PAGE_OF: Record<Route, string> = {
  "intro-01": "01",
  "intro-02": "02",
  "intro-03": "03",
  t1: "04",
  "t1-confirm": "05",
  "t1-justify": "06",
  "t2-intro": "07",
  t2: "08",
  "t2-good": "09",
  "t2-crisis": "10",
  t3: "11",
  "t3-resolve": "12",
  "pre-final": "13",
  final: "14",
  outcome: "15",
  debrief: "16",
  "failure-time": "17",
  "failure-confidence": "18",
  "failure-readiness": "19",
  "failure-crisis": "20"
};

/** The linear story spine. Branches are decided in the pages themselves. */
export const NEXT: Partial<Record<Route, Route>> = {
  "intro-01": "intro-02",
  "intro-02": "intro-03",
  "intro-03": "t1",
  t1: "t1-confirm",
  "t1-confirm": "t1-justify",
  "t1-justify": "t2-intro",
  "t2-intro": "t2",
  "t2-good": "t3",
  "t2-crisis": "t3",
  t3: "t3-resolve",
  "t3-resolve": "pre-final",
  "pre-final": "final",
  final: "outcome",
  outcome: "debrief"
};
