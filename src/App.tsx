import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Intro01 from "./pages/Intro01";
import Intro02 from "./pages/Intro02";
import Intro03 from "./pages/Intro03";
import T1Architecture from "./pages/T1Architecture";
import T1Confirm from "./pages/T1Confirm";
import T1Justify from "./pages/T1Justify";
import T2Intro from "./pages/T2Intro";
import T2Allocate from "./pages/T2Allocate";
import T2Good from "./pages/T2Good";
import T2Crisis from "./pages/T2Crisis";
import T3Resolve from "./pages/T3Resolve";
import PreFinal from "./pages/PreFinal";
import Outcome from "./pages/Outcome";
import FailureTime from "./pages/FailureTime";
import FailureConfidence from "./pages/FailureConfidence";
import T3Workflow from "./pages/T3Workflow";
import Final from "./pages/Final";
import Debrief from "./pages/Debrief";
import FailureReadiness from "./pages/FailureReadiness";
import FailureCrisis from "./pages/FailureCrisis";

/**
 * Master prompt section 9 — all 20 routes.
 *
 * All twenty are built.
 *
 * Where a mockup contradicts the master document the master wins (section 21),
 * most visibly on pages 19 and 20 whose mockups show a rocket mission-control
 * room and a breaking-news broadcast. Neither is used.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/intro-01" replace />} />

        {/* Act I — the invitation and the weight */}
        <Route path="/intro-01" element={<Intro01 />} />
        <Route path="/intro-02" element={<Intro02 />} />
        <Route path="/intro-03" element={<Intro03 />} />

        {/* Act II — prove your judgement */}
        <Route path="/t1" element={<T1Architecture />} />
        <Route path="/t1-confirm" element={<T1Confirm />} />
        <Route path="/t1-justify" element={<T1Justify />} />

        {/* Act III — the system becomes personal */}
        <Route path="/t2-intro" element={<T2Intro />} />
        <Route path="/t2" element={<T2Allocate />} />
        <Route path="/t2-good" element={<T2Good />} />
        <Route path="/t2-crisis" element={<T2Crisis />} />

        {/* Act IV — process under pressure */}
        <Route path="/t3" element={<T3Workflow />} />
        <Route path="/t3-resolve" element={<T3Resolve />} />

        {/* Act V — own the recommendation */}
        <Route path="/pre-final" element={<PreFinal />} />
        <Route path="/final" element={<Final />} />
        <Route path="/outcome" element={<Outcome />} />
        <Route path="/debrief" element={<Debrief />} />

        {/* Failure endings. Daylight and restrained, per section 1.6. */}
        <Route path="/failure-time" element={<FailureTime />} />
        <Route path="/failure-confidence" element={<FailureConfidence />} />
        <Route path="/failure-readiness" element={<FailureReadiness />} />
        <Route path="/failure-crisis" element={<FailureCrisis />} />

        <Route path="*" element={<Navigate to="/intro-01" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
