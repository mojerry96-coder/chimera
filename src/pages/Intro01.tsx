import { useMemo, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton, TextAction } from "@/components/controls";
import { Countdown, TimeSublabels } from "@/components/Countdown";
import { MediaSequence, type MediaCue } from "@/media/MediaSequence";
import { VIDEO, PLATE } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";

/**
 * PAGE 01 — Mission introduction.  Route /intro-01
 *
 * Master prompt section 10, page 01. Media timing as published:
 *   0.0-3.5s   V09 Abuja establishing, first shot
 *   3.5-8.5s   V04 POV door
 *   8.5-14.5s  V05 cast reveal
 *   14.5s      hold final frame / switch to P05
 *   14.7s      reveal final UI
 *
 * Voiceover runs 10.3s across two lines against a 14.5s media bed, so it fits
 * here. It does not on most other pages — see ASSET_QA.md section 5.1.
 */
export default function Intro01() {
  const { go } = useSceneNav("intro-01");
  const timeRemaining = useSim((s) => s.timeRemaining);
  const [uiReady, setUiReady] = useState(false);

  const cues = useMemo<MediaCue[]>(
    () => [
      {
        src: VIDEO.V09_ABUJA,
        poster: PLATE.P09_ABUJA,
        end: 3.5,
        alt: "Abuja in early morning light, seen from above."
      },
      {
        src: VIDEO.V04_DOOR,
        poster: PLATE.P04_DOOR,
        alt: "First-person view pushing open a glass door into the project floor."
      },
      {
        src: VIDEO.V05_CAST,
        poster: PLATE.P05_ROOM,
        alt: "Chidi, Dr Adebayo and Folake in the Chimera room, looking toward you."
      }
    ],
    []
  );

  const lines = useMemo(() => [VO.P01_ADB_01, VO.P01_ADB_02], []);
  useVoice(lines);

  return (
    <PageShell
      pageNumber="01"
      media={
        <MediaSequence
          cues={cues}
          // Section 1.5 — reveal 200ms after the media settles.
          onComplete={() => setTimeout(() => setUiReady(true), 200)}
        />
      }
    >
      {uiReady && (
        <>
          {/* Flat left surface. Section 1.7 — flat colour only, no gradient scrim. */}
          <Box x={0} y={0} w={940} h={1080} z={10} className="bg-[rgba(23,25,24,.95)]" />

          <Box x={72} y={210} w={800} h={270} z={20}>
            <h1 className="display-xl text-[var(--paper)]">
              THE LAST TEST
              <br />
              BEFORE <span className="text-[var(--accent)]">LAUNCH</span>
            </h1>
          </Box>

          <Box x={74} y={510} w={620} h={36} z={20}>
            <p className="body-lg text-[var(--paper-soft)]">Lead the final pre-launch simulation.</p>
          </Box>

          <Box x={74} y={636} w={280} h={18} z={20}>
            <p className="label text-[var(--accent)]">Mission window</p>
          </Box>

          <Box x={72} y={678} w={600} h={104} z={20}>
            <Countdown hours={timeRemaining} />
          </Box>

          <Box x={72} y={790} w={600} h={18} z={20}>
            <TimeSublabels />
          </Box>

          <Box x={72} y={858} w={318} h={64} z={20}>
            <PrimaryButton onClick={() => go()}>
              Begin Mission <ArrowRight size={20} />
            </PrimaryButton>
          </Box>

          <Box x={424} y={858} w={214} h={64} z={20}>
            <TextAction>Review Brief</TextAction>
          </Box>

          <Box x={64} y={994} w={180} h={28} z={20}>
            <span className="label text-[var(--text-faint)]">01 · INTRO</span>
          </Box>
        </>
      )}
    </PageShell>
  );
}
