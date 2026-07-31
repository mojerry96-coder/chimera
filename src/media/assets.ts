/**
 * Master prompt section 7 — asset manifest.
 *
 * Filenames are verified against the delivered tree; see ASSET_QA.md section 6.
 * V13, P09, P17 and P18 are additions with no ID in either source document —
 * their rationale is recorded in public/assets/manifests/asset_manifest.json.
 */

export const VIDEO = {
  V01_ADEBAYO: "/assets/video/V01_Adebayo_performance_arc_10s.mp4",
  V02_CHIDI: "/assets/video/V02_Chidi_performance_arc_10s.mp4",
  V03_FOLAKE: "/assets/video/V03_Folake_performance_arc_10s.mp4",
  V04_DOOR: "/assets/video/V04_POV_door_opening_5s.mp4",
  V05_CAST: "/assets/video/V05_ChimeraRoom_cast_reveal_6s.mp4",
  V06_FOLDER: "/assets/video/V06_Folake_places_defect_folder_6s.mp4",
  V07_PHONE: "/assets/video/V07_Phone_vibrates_crisis_5s.mp4",
  V08_EXEC: "/assets/video/V08_Executive_three_shot_8s.mp4",
  V09_ABUJA: "/assets/video/V09a_Abuja_establishing_3shot_SOUND_10s.mp4",
  V10_PHONE_AFTERMATH: "/assets/video/V10_student_phone_aftermath_5s.mp4",
  V11_VC_CALL: "/assets/video/V11_Adebayo_VC_call_6s.mp4",
  V12_BOARD_REACTION: "/assets/video/V12_board_absorbs_recommendation_8s.mp4",
  /** Fills the approval beat V01 does not contain. See ASSET_QA.md 2.1. */
  V13_ADEBAYO_APPROVAL: "/assets/video/V13_Adebayo_approval_5s.mp4"
} as const;

export const PLATE = {
  P01_ADEBAYO: "/assets/plates/P01_Adebayo_project_table_morning.png",
  P02_CHIDI: "/assets/plates/P02_Chidi_project_table_afternoon.png",
  P03_FOLAKE: "/assets/plates/P03_Folake_QA_room.png",
  P04_DOOR: "/assets/plates/P04_POV_glass_door.png",
  P05_ROOM: "/assets/plates/P05_ChimeraRoom_wide_three_characters.png",
  P06_RED_BOARD: "/assets/plates/P06_ChimeraRoom_red_board_midday.png",
  P07_PHONE: "/assets/plates/P07_Phone_insert_dark_screen.png",
  P08_EXEC: "/assets/plates/P08_Executive_room_three_shot_evening.png",
  P09_ABUJA: "/assets/plates/P09_Abuja_establishing_morning.png",
  P10_ARCHITECTURE: "/assets/plates/P10_UI_workstation_OTS_architecture_canvas.png",
  P11_ALLOCATION: "/assets/plates/P11_UI_project_table_OTS_sliders.png",
  P12_UAT: "/assets/plates/P12_UI_QA_table_workflow_cards.png",
  P13_CORRIDOR: "/assets/plates/P13_Corridor_early_evening.png",
  /** Mandatory daylight replacement. P14 night plate is never used. */
  P15_EMPTY_DAY: "/assets/plates/P15_ChimeraRoom_empty_daylight.png",
  P16_APEX_EXT: "/assets/plates/P16_Apex_University_exterior_daylight.png",
  P17_STUDENT_ROOM: "/assets/plates/P17_Student_room_phone_daylight.png",
  /** Page 18 requires daylight; P08 is an evening plate. */
  P18_EXEC_DAY: "/assets/plates/P18_Executive_room_daylight.png"
} as const;

/**
 * Master prompt section 7 — character clip segments.
 *
 * WARNING: this is the convention as published, not a description of the
 * delivered footage. V01 contains no approval beat at segment C; V02's A/B
 * read as "waiting" rather than "focus"; V03's C and D are near-identical.
 * See ASSET_QA.md section 2.1 before relying on the emotional mapping.
 * Per-segment end frames are in /assets/plates/segments/ for verification.
 */
export const SEGMENT = {
  A: { in: 0.0, out: 3.0 },
  B: { in: 3.0, out: 5.0 },
  C: { in: 5.0, out: 8.0 },
  D: { in: 8.0, out: 10.0 }
} as const;

export type SegmentKey = keyof typeof SEGMENT;

/** Frozen end-frame of a segment, for reduced-motion and load-failure paths. */
export function segmentPlate(clip: "V01" | "V02" | "V03", seg: SegmentKey) {
  return `/assets/plates/segments/${clip}_seg${seg}_end.png`;
}
