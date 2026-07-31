/**
 * Fixed simulation data. The bible section 1 states this is locked: the approved
 * 20-page flow, fixed task logic, fixed defect data, fixed crisis branch, fixed
 * UAT order C→A→D→B→E, three launch recommendations and four failure outcomes.
 *
 * Nothing here is generated or inferred. Do not vary it per playthrough.
 */

export const SYSTEMS = [
  { id: "aurora", name: "Aurora", role: "LMS" },
  { id: "nairagate", name: "NairaGate", role: "Payments" },
  { id: "verifyme", name: "VerifyMe", role: "Identity" },
  { id: "scorevault", name: "ScoreVault", role: "Results" },
  { id: "watchtower", name: "WatchTower", role: "Monitoring" }
] as const;

export type Severity = "Critical" | "High" | "Medium";

export const DEFECTS = [
  { id: "d07", code: "D-07", title: "Payment double-charge", severity: "Critical" as Severity },
  { id: "d12", code: "D-12", title: "WatchTower recording", severity: "High" as Severity },
  { id: "d19", code: "D-19", title: "Slow dashboard load", severity: "Medium" as Severity },
  { id: "d23", code: "D-23", title: "Results export failure", severity: "High" as Severity }
] as const;

export type DefectId = (typeof DEFECTS)[number]["id"];

/**
 * Reference screenshot state only. The simulation accepts any distribution
 * totalling exactly 100 — master section 10, page 08.
 */
export const REFERENCE_ALLOCATION = { d07: 30, d12: 25, d19: 20, d23: 25 };

/** The one correct sign-off order. Bible section 12 — always C→A→D→B→E. */
export const UAT_ORDER = ["C", "A", "D", "B", "E"] as const;

export const UAT_STEPS = {
  C: "UAT Test Completion",
  A: "Defect Resolution",
  D: "QA Sign-Off",
  B: "Pilot University Sign-Off",
  E: "CTO Final Approval"
} as const;

/** Always Apex University, always a duplicate debit, always ₦50,000, always public. */
export const CRISIS = {
  university: "Apex University",
  amount: 50000,
  amountLabel: "₦50,000",
  ticketId: "CHM-24718",
  choices: [
    { id: "A" as const, title: "Call the student", detail: "Refund and apologise." },
    { id: "B" as const, title: "Blame the vendor", detail: "Escalate externally." },
    { id: "C" as const, title: "Ignore it", detail: "Continue elsewhere." }
  ]
} as const;

export const JUSTIFICATION_CRITERIA = [
  "Scalability",
  "Maintainability",
  "Integration",
  "Cost"
] as const;
