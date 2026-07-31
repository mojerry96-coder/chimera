/**
 * Voiceover index.
 *
 * Paths follow the bible section 7 convention (per-character folders, full
 * asset-ID filenames). The master prompt section 8 shows a flat layout with no
 * CHM_VO_ prefix — the two documents disagree and this is unresolved. Because
 * every path is read from here rather than reconstructed, switching convention
 * is a rename plus an edit to this file. See ASSET_QA.md section 6.2.
 *
 * Durations are measured from the delivered files.
 */

export type Speaker = "adebayo" | "chidi" | "folake" | "student";

export type VoiceLine = {
  id: string;
  page: string;
  speaker: Speaker;
  src: string;
  seconds: number;
  text: string;
};

const vo = (
  id: string,
  page: string,
  speaker: Speaker,
  file: string,
  seconds: number,
  text: string
): VoiceLine => ({ id, page, speaker, src: `/assets/audio/vo/${speaker}/${file}`, seconds, text });

export const VO = {
  P01_ADB_01: vo("CHM-VO-P01-ADB-01", "P01", "adebayo", "CHM_VO_P01_ADB_01.wav", 3.81,
    "Project Chimera goes before the launch board in forty-eight hours."),
  P01_ADB_02: vo("CHM-VO-P01-ADB-02", "P01", "adebayo", "CHM_VO_P01_ADB_02.wav", 6.5,
    "Five systems. Three pilot universities. You are the lead architect. Every decision follows us into that room."),
  P02_ADB_01: vo("CHM-VO-P02-ADB-01", "P02", "adebayo", "CHM_VO_P02_ADB_01.wav", 12.45,
    "Aurora teaches. NairaGate collects. VerifyMe proves identity. ScoreVault protects results. WatchTower sees what the room cannot."),
  P02_ADB_02: vo("CHM-VO-P02-ADB-02", "P02", "adebayo", "CHM_VO_P02_ADB_02.wav", 2.37,
    "One failure can pull down the rest."),
  P03_CHI_01: vo("CHM-VO-P03-CHI-01", "P03", "chidi", "CHM_VO_P03_CHI_01.wav", 5.53,
    "The defects arrived this morning. The universities are still waiting."),
  P03_CHI_02: vo("CHM-VO-P03-CHI-02", "P03", "chidi", "CHM_VO_P03_CHI_02.wav", 5.94,
    "Forty-eight hours sounds like time—until your first wrong decision costs four."),
  P04_CHI_01: vo("CHM-VO-P04-CHI-01", "P04", "chidi", "CHM_VO_P04_CHI_01.wav", 4.92,
    "Build something we can defend, not just something that connects."),
  P05_ADB_01: vo("CHM-VO-P05-ADB-01", "P05", "adebayo", "CHM_VO_P05_ADB_01.wav", 4.41,
    "A diagram is easy to admire. Is this the architecture you are prepared to defend?"),
  P06_ADB_01: vo("CHM-VO-P06-ADB-01", "P06", "adebayo", "CHM_VO_P06_ADB_01.wav", 5.2,
    "Tell me why this architecture is right for Chimera—not why it is fashionable."),
  P06_ADB_02: vo("CHM-VO-P06-ADB-02", "P06", "adebayo", "CHM_VO_P06_ADB_02.wav", 2.51,
    "Good. You have considered the trade-offs."),
  P07_CHI_01: vo("CHM-VO-P07-CHI-01", "P07", "chidi", "CHM_VO_P07_CHI_01.wav", 6.32,
    "Four engineers. Four defects. We cannot treat every problem as equal."),
  P07_FOL_01: vo("CHM-VO-P07-FOL-01", "P07", "folake", "CHM_VO_P07_FOL_01.wav", 3.95,
    "D-07 is taking money twice. From real students."),
  P08_FOL_01: vo("CHM-VO-P08-FOL-01", "P08", "folake", "CHM_VO_P08_FOL_01.wav", 4.78,
    "Not every defect is equal. But every defect has a person on the other side."),
  P09_CHI_01: vo("CHM-VO-P09-CHI-01", "P09", "chidi", "CHM_VO_P09_CHI_01.wav", 4.74,
    "The payment defect is contained. That buys us trust."),
  P09_CHI_02: vo("CHM-VO-P09-CHI-02", "P09", "chidi", "CHM_VO_P09_CHI_02.wav", 1.72,
    "Do not spend it carelessly."),
  P10_STU_01: vo("CHM-VO-P10-STU-01", "P10", "student", "CHM_VO_P10_STU_01_phone.wav", 9.6,
    "Hello… I was charged twice. Fifty thousand naira. I posted the receipts because nobody answered."),
  P10_ADB_01: vo("CHM-VO-P10-ADB-01", "P10", "adebayo", "CHM_VO_P10_ADB_01.wav", 3.34,
    "The Vice-Chancellor is on the line. What are you telling her?"),
  P10_FOL_01: vo("CHM-VO-P10-FOL-01", "P10", "folake", "CHM_VO_P10_FOL_01.wav", 5.48,
    "Before you choose, remember: the system failed. The student did not."),
  P11_FOL_01: vo("CHM-VO-P11-FOL-01", "P11", "folake", "CHM_VO_P11_FOL_01.wav", 3.67,
    "A sign-off is not a formality. The order is the evidence."),
  P12_FOL_01: vo("CHM-VO-P12-FOL-01", "P12", "folake", "CHM_VO_P12_FOL_01.wav", 6.73,
    "Now the evidence can move. QA signs. The universities accept. Adebayo authorises."),
  P13_ADB_01: vo("CHM-VO-P13-ADB-01", "P13", "adebayo", "CHM_VO_P13_ADB_01.wav", 3.99,
    "The board will not ask whether the work was difficult."),
  P13_ADB_02: vo("CHM-VO-P13-ADB-02", "P13", "adebayo", "CHM_VO_P13_ADB_02.wav", 3.02,
    "They will ask whether the evidence supports your decision."),
  P14_ADB_01: vo("CHM-VO-P14-ADB-01", "P14", "adebayo", "CHM_VO_P14_ADB_01.wav", 3.25,
    "Give me your recommendation. And the evidence behind it."),
  P16_ADB_EX: vo("CHM-VO-P16-ADB-EX", "P16", "adebayo", "CHM_VO_P16_ADB_EX.wav", 5.25,
    "You did not chase certainty. You built enough evidence to make a responsible decision."),
  P16_ADB_DEV: vo("CHM-VO-P16-ADB-DEV", "P16", "adebayo", "CHM_VO_P16_ADB_DEV.wav", 6.46,
    "You reached the room, but your evidence arrived damaged. Review where pressure changed your judgement."),
  P16_ADB_POOR: vo("CHM-VO-P16-ADB-POOR", "P16", "adebayo", "CHM_VO_P16_ADB_POOR.wav", 5.57,
    "The outcome began long before the final decision. Trace it back to the first compromise.")
} as const;

export type VoiceKey = keyof typeof VO;
