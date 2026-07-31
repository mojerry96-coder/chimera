import type { SimState } from "@/state/simStore";

/**
 * Master section 10 page 16, section 4 — eight reflection questions, shown one
 * at a time.
 *
 * These are reflection prompts, not quiz items: none has a right answer, and
 * each points at a moment the player actually lived rather than at theory.
 */
export const REFLECTION_QUESTIONS = [
  "You had forty-eight hours. Which decision did you make fastest, and would you still make it that fast?",
  "Your architecture had to be defensible, not just connected. Which trade-off would you struggle to defend to the board?",
  "You allocated four engineers across four defects. What did you decide was acceptable to leave broken?",
  "A student lost ₦50,000 and said nobody answered. At what point in your run did that become a technical problem rather than a human one?",
  "The sign-off order is the evidence. Did you treat it as process, or as protection for someone?",
  "Where in the run did pressure change your judgement rather than your pace?",
  "If the board had asked for one piece of evidence you did not have, what would it have been?",
  "You made a launch recommendation. If it goes wrong in month two, which of your earlier decisions will be the cause?"
] as const;

/** Section 3 — what your choices meant. Seven rows, derived from the run. */
export function choiceInsights(s: SimState) {
  const alloc = s.allocation;
  const d07 = alloc?.d07 ?? 0;

  return [
    {
      key: "Architecture",
      summary:
        s.architectureValidity === "valid"
          ? `You built a ${s.patternDesigned ?? "connected"} design that held together structurally.`
          : "Your architecture did not hold together structurally.",
      detail:
        s.architectureValidity === "valid"
          ? "Traffic reached services through an ingress point and services reached their data. Nothing bypassed a boundary. That is the baseline a board can be asked to trust — it is not the same as it being the right design."
          : "Something was disconnected or a client reached a datastore directly. A diagram that cannot carry a request cannot carry a launch."
    },
    {
      key: "Justification",
      summary:
        s.justificationQuality === "strong"
          ? "You argued the trade-offs rather than describing the shape."
          : "Your justification described the architecture more than it defended it.",
      detail:
        s.justificationQuality === "strong"
          ? "You named what the design costs as well as what it buys. That is what Adebayo was listening for — she never asked whether it was fashionable."
          : "Naming the criteria is not the same as weighing them. The question was why this architecture is right for Chimera, and a defence needs something given up in exchange for something gained."
    },
    {
      key: "Defect triage",
      summary: alloc
        ? `You put ${d07}% of the effort on D-07, the payment double-charge.`
        : "You never allocated engineers.",
      detail: alloc
        ? d07 >= 30
          ? "D-07 was taking money twice from real students. You resourced it enough to contain it, which is why the crisis stayed a defect instead of becoming a person."
          : "D-07 was taking money twice from real students. Under-resourcing it is what let the duplicate charge reach the public before you reached the student."
        : "Scarcity was the whole point of the task. Not choosing is still a distribution."
    },
    {
      key: "Crisis",
      summary:
        s.crisisChoice === "A"
          ? "You called the student, refunded and apologised."
          : s.crisisChoice === "B"
            ? "You escalated to the vendor."
            : s.crisisChoice === "C"
              ? "You continued elsewhere."
              : "The crisis never reached you.",
      detail:
        s.crisisChoice === "A"
          ? "Folake's line was that the system failed and the student did not. Contacting her first cost time and bought back the trust the incident had spent."
          : s.crisisChoice === "B"
            ? "The gateway may well have been at fault. But the Vice-Chancellor asked what you were telling her, and a vendor name is not an answer to a student who is out ₦50,000."
            : s.crisisChoice === "C"
              ? "The receipts were already public. Silence did not make the incident smaller; it confirmed it."
              : "Containing D-07 early is what kept this from arriving."
    },
    {
      key: "Workflow",
      summary: s.workflowSequence
        ? s.workflowAttempts <= 1
          ? "You got the sign-off order right first time."
          : `You corrected the sign-off order across ${s.workflowAttempts} attempts.`
        : "You never completed the sign-off workflow.",
      detail:
        "The order is C → A → D → B → E. Testing completes, defects resolve, QA signs, the universities accept, and only then does the CTO authorise. Every rearrangement is someone signing for something they have not seen."
    },
    {
      key: "Time",
      summary: `You finished with ${s.timeRemaining} of your 48 hours.`,
      detail:
        Object.keys(s.timeSpentByTask).length > 0
          ? `Time went to: ${Object.entries(s.timeSpentByTask)
              .sort((a, b) => b[1] - a[1])
              .map(([k, v]) => `${k} (${v}h)`)
              .join(", ")}. Rework is the most expensive thing on that list, and it is the only one you could have avoided.`
          : "No task consumed time in this run."
    },
    {
      key: "Launch decision",
      summary: s.finalDecision
        ? `You recommended a ${s.finalDecision} launch.`
        : "You never reached the recommendation.",
      detail:
        "No option was correct. The board was never grading the choice — it was grading whether the evidence you brought could support whichever choice you made."
    }
  ];
}

/** Section 2 — what consumed time. The four named categories, always shown. */
export const TIME_CATEGORIES = [
  "Architecture redesign",
  "Justification rewrite",
  "Workflow correction",
  "Crisis management"
] as const;
