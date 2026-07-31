import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Intro01 from "./pages/Intro01";
import { Stub } from "./pages/Stub";
import { PLATE } from "./media/assets";

/**
 * Master prompt section 9 — all 20 routes.
 *
 * Backgrounds follow the section 15 media placement manifest. Where a mockup
 * contradicts the master document, the master wins (section 21) — most visibly
 * on pages 19 and 20, whose mockups show a rocket mission-control room and a
 * breaking-news broadcast. Neither is used. See ASSET_QA.md section 4.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/intro-01" replace />} />

        <Route path="/intro-01" element={<Intro01 />} />

        <Route
          path="/intro-02"
          element={<Stub route="intro-02" title="FIVE SYSTEMS. ONE PLATFORM." plate={PLATE.P05_ROOM} blockedOn="14.8s of voiceover in a 6.2s window" />}
        />
        <Route
          path="/intro-03"
          element={<Stub route="intro-03" title="48 HOURS. ONE DECISION." plate={PLATE.P02_CHIDI} blockedOn="11.5s of voiceover in a 3.7s window" />}
        />
        <Route path="/t1" element={<Stub route="t1" title="ARCHITECTURE DESIGN" plate={PLATE.P10_ARCHITECTURE} />} />
        <Route path="/t1-confirm" element={<Stub route="t1-confirm" title="ARCHITECTURE CONFIRMATION" plate={PLATE.P10_ARCHITECTURE} />} />
        <Route path="/t1-justify" element={<Stub route="t1-justify" title="ARCHITECTURE JUSTIFICATION" plate={PLATE.P10_ARCHITECTURE} />} />
        <Route path="/t2-intro" element={<Stub route="t2-intro" title="DEFECT BOARD" plate={PLATE.P06_RED_BOARD} />} />
        <Route path="/t2" element={<Stub route="t2" title="ENGINEER ALLOCATION" plate={PLATE.P11_ALLOCATION} />} />
        <Route path="/t2-good" element={<Stub route="t2-good" title="TRUST HOLDS" plate={PLATE.P02_CHIDI} />} />
        <Route path="/t2-crisis" element={<Stub route="t2-crisis" title="A STUDENT WAS CHARGED TWICE" plate={PLATE.P07_PHONE} />} />
        <Route
          path="/t3"
          element={<Stub route="t3" title="UAT SIGN-OFF WORKFLOW" plate={PLATE.P12_UAT} blockedOn="mockup uses different step names than the locked C→A→D→B→E taxonomy" />}
        />
        <Route path="/t3-resolve" element={<Stub route="t3-resolve" title="UAT RESOLUTION" plate={PLATE.P12_UAT} />} />
        <Route path="/pre-final" element={<Stub route="pre-final" title="EVIDENCE SUMMARY" plate={PLATE.P13_CORRIDOR} />} />
        <Route
          path="/final"
          element={<Stub route="final" title="FINAL RECOMMENDATION" plate={PLATE.P08_EXEC} blockedOn="option labels — Full/Phased/Delay vs the mockup's Go Live/Delay/Partial" />}
        />
        <Route path="/outcome" element={<Stub route="outcome" title="OUTCOME" plate={PLATE.P13_CORRIDOR} />} />
        <Route
          path="/debrief"
          element={<Stub route="debrief" title="DECISION RECORD" plate={PLATE.P15_EMPTY_DAY} blockedOn="scope — compact card vs the full 5-section scrolling debrief" />}
        />

        {/* Pages 17-20. Daylight and restrained, per section 1.6. */}
        <Route path="/failure-time" element={<Stub route="failure-time" title="TIME EXPIRED" plate={PLATE.P15_EMPTY_DAY} />} />
        <Route path="/failure-confidence" element={<Stub route="failure-confidence" title="PILOT CONFIDENCE COLLAPSED" plate={PLATE.P18_EXEC_DAY} />} />
        <Route
          path="/failure-readiness"
          element={<Stub route="failure-readiness" title="LAUNCH READINESS CRITICAL" plate={PLATE.P06_RED_BOARD} blockedOn="mockup shows a rocket mission-control room; master requires the red board" />}
        />
        <Route
          path="/failure-crisis"
          element={<Stub route="failure-crisis" title="CRISIS MISMANAGED" plate={PLATE.P15_EMPTY_DAY} blockedOn="mockup shows a breaking-news broadcast; master forbids the spectacle" />}
        />

        <Route path="*" element={<Navigate to="/intro-01" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
