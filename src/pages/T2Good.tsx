import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { TextAction } from "@/components/controls";
import { MediaSequence, type MediaCue } from "@/media/MediaSequence";
import { VIDEO, SEGMENT, segmentPlate } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useSceneNav } from "@/lib/useSceneNav";

/**
 * PAGE 09 — Trust holds.  Route /t2-good
 *
 * Relief, but temporary. Section 10 page 09 forbids an allocation dashboard,
 * readiness metrics or four outcome cards — one small panel and Continue.
 *
 * Sound rule from the bible: the urgency pulse drops out completely here. Room
 * tone only. There is no music bed yet, so nothing to duck; when ambience
 * lands, this page is the one that must go quiet.
 */
export default function T2Good() {
  const { go } = useSceneNav("t2-good");
  const [uiReady, setUiReady] = useState(false);

  const cues = useMemo<MediaCue[]>(
    () => [
      {
        src: VIDEO.V02_CHIDI,
        poster: segmentPlate("V02", "D"),
        start: SEGMENT.D.in,
        end: SEGMENT.D.out,
        alt: "Chidi, visibly relieved."
      }
    ],
    []
  );

  useVoice(useMemo(() => [VO.P09_CHI_01, VO.P09_CHI_02], []));

  return (
    <PageShell
      pageNumber="09"
      media={
        <MediaSequence cues={cues} onComplete={() => setTimeout(() => setUiReady(true), 200)} />
      }
    >
      {uiReady && (
        <Box x={72} y={692} w={620} h={254} z={20}>
          <div className="relative h-full w-full rounded-[var(--radius-major)] border border-[var(--line)] bg-[rgba(23,25,24,.94)] shadow-[var(--shadow-panel)]">
            <div className="absolute left-40 top-46">
              <CheckCircle size={56} className="text-[var(--success)]" />
            </div>

            <div className="absolute left-120 top-36">
              <p className="label text-[var(--accent)]">Outcome</p>
              <h2 className="heading-lg mt-12 text-[var(--paper)]">TRUST HOLDS</h2>
              <p className="body mt-14 w-[380px] text-[var(--paper-soft)]">
                The critical payment issue is contained.
              </p>
              <div className="mt-18">
                <TextAction onClick={() => go("t3")}>
                  Continue <ArrowRight size={18} />
                </TextAction>
              </div>
            </div>
          </div>
        </Box>
      )}
    </PageShell>
  );
}
