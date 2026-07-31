import { useMemo, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton } from "@/components/controls";
import { Countdown, TimeSublabels } from "@/components/Countdown";
import { MediaSequence, type MediaCue } from "@/media/MediaSequence";
import { VIDEO, SEGMENT, segmentPlate } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";

/**
 * PAGE 03 — Forty-eight hours, one decision.  Route /intro-03
 *
 * Turns the countdown from decoration into pressure. Master section 10 page 03
 * is emphatic that only the mission clock appears — no confidence, readiness,
 * backlog, architecture or justification.
 *
 * Media is V02 segment C. Note that the bible's segment table calls C "strain"
 * for Chidi; in the delivered footage C is where he stops checking his watch
 * and addresses camera, which serves this beat better than the table implies.
 * See ASSET_QA.md section 2.1.
 */
export default function Intro03() {
  const { go } = useSceneNav("intro-03");
  const timeRemaining = useSim((s) => s.timeRemaining);
  const [uiReady, setUiReady] = useState(false);

  const cues = useMemo<MediaCue[]>(
    () => [
      {
        src: VIDEO.V02_CHIDI,
        poster: segmentPlate("V02", "C"),
        start: SEGMENT.C.in,
        end: SEGMENT.C.out,
        alt: "Chidi at the project table, addressing you directly."
      }
    ],
    []
  );

  const lines = useMemo(() => [VO.P03_CHI_01, VO.P03_CHI_02], []);
  useVoice(lines);

  return (
    <PageShell
      pageNumber="03"
      media={
        <MediaSequence cues={cues} onComplete={() => setTimeout(() => setUiReady(true), 200)} />
      }
    >
      {uiReady && (
        <>
          <Box x={0} y={0} w={930} h={1080} z={10} className="bg-[rgba(23,25,24,.95)]" />

          <Box x={72} y={152} w={360} h={24} z={20}>
            <span className="label text-[var(--accent)]">Project Chimera · 03</span>
          </Box>

          <Box x={72} y={240} w={780} h={230} z={20}>
            <h1 className="display-xl text-[var(--paper)]">
              48 HOURS.
              <br />
              <span className="text-[var(--accent)]">ONE DECISION.</span>
            </h1>
          </Box>

          <Box x={74} y={512} w={650} h={38} z={20}>
            <p className="body-lg text-[var(--paper-soft)]">
              The Go / No-Go meeting will not wait.
            </p>
          </Box>

          {/* Mission clock only. Nothing else is permitted on this page. */}
          <Box x={72} y={628} w={620} h={166} z={20}>
            <div className="flex h-full w-full flex-col justify-center rounded-[var(--radius-card)] border border-[var(--line)] px-32">
              <Countdown hours={timeRemaining} size={64} />
              <div className="mt-16">
                <TimeSublabels />
              </div>
            </div>
          </Box>

          <Box x={72} y={850} w={340} h={64} z={20}>
            <PrimaryButton onClick={() => go()}>
              Continue <ArrowRight size={20} />
            </PrimaryButton>
          </Box>
        </>
      )}
    </PageShell>
  );
}
