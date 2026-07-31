import { useMemo, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { TextAction } from "@/components/controls";
import { MediaSequence, type MediaCue } from "@/media/MediaSequence";
import { VIDEO, PLATE, SEGMENT, segmentPlate } from "@/media/assets";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim, outcomeBand, type Band } from "@/state/simStore";

const CARD: Record<Band, { label: string; head: string; body: string }> = {
  excellent: {
    label: "Outcome",
    head: "LAUNCH APPROVED",
    body: "The evidence supported a responsible launch."
  },
  good: {
    label: "Outcome",
    head: "LAUNCH APPROVED",
    body: "The evidence held, with reservations noted."
  },
  developing: {
    label: "Outcome",
    head: "CONDITIONAL APPROVAL",
    body: "The board accepted the recommendation but not the evidence behind it."
  },
  poor: {
    label: "Outcome",
    head: "APPROVAL WITHHELD",
    body: "The recommendation outpaced what the evidence could carry."
  }
};

/**
 * PAGE 15 — Outcome montage.  Route /outcome
 *
 * Consequence, not score. Section 10 page 15 — no UI at all during the
 * montage, and no scores, stars, confetti, fireworks or celebration when the
 * end card finally arrives. Music and reaction shots carry the result; there
 * is no narration.
 *
 * The montage is assembled per band from existing assets. V13 supplies the
 * approval beat for the strong bands, which V01 does not contain.
 */
export default function Outcome() {
  const { go } = useSceneNav("outcome");
  const state = useSim();
  const band = useMemo(() => outcomeBand(state), [state]);
  const [uiReady, setUiReady] = useState(false);

  const cues = useMemo<MediaCue[]>(() => {
    const exec: MediaCue = {
      src: VIDEO.V08_EXEC, poster: PLATE.P08_EXEC, end: 3, alt: "The executive room."
    };
    const corridor: MediaCue = {
      src: undefined, poster: PLATE.P13_CORRIDOR, hold: 2, push: true, alt: "The corridor."
    };
    const abuja: MediaCue = {
      src: VIDEO.V09_ABUJA, poster: PLATE.P09_ABUJA, end: 3, alt: "Abuja in the morning."
    };

    if (band === "excellent" || band === "good") {
      return [
        exec,
        { src: VIDEO.V13_ADEBAYO_APPROVAL, poster: PLATE.P01_ADEBAYO, alt: "Dr Adebayo gives a small nod of approval." },
        { src: VIDEO.V02_CHIDI, poster: segmentPlate("V02", "D"), start: SEGMENT.D.in, end: SEGMENT.D.out, alt: "Chidi, relieved." },
        corridor,
        abuja
      ];
    }
    if (band === "developing") {
      return [
        exec,
        { src: VIDEO.V01_ADEBAYO, poster: segmentPlate("V01", "D"), start: SEGMENT.D.in, end: SEGMENT.D.out, alt: "Dr Adebayo withholds a response." },
        { src: VIDEO.V02_CHIDI, poster: segmentPlate("V02", "C"), start: SEGMENT.C.in, end: SEGMENT.C.out, alt: "Chidi under strain." },
        { ...corridor, push: false },
        { ...abuja, end: 2 }
      ];
    }
    return [
      { ...exec, end: 2 },
      { src: VIDEO.V01_ADEBAYO, poster: segmentPlate("V01", "D"), start: SEGMENT.D.in, end: SEGMENT.D.out, alt: "Dr Adebayo withholds a response." },
      { src: VIDEO.V02_CHIDI, poster: segmentPlate("V02", "C"), start: SEGMENT.C.in, end: SEGMENT.C.out, alt: "Chidi under strain." },
      { poster: PLATE.P15_EMPTY_DAY, hold: 3, alt: "The empty project room in daylight.", filter: "subdued" }
    ];
  }, [band]);

  const card = CARD[band];

  return (
    <PageShell
      pageNumber="15"
      showBrand={uiReady}
      media={<MediaSequence cues={cues} onComplete={() => setUiReady(true)} />}
    >
      {uiReady && (
        <Box x={72} y={660} w={620} h={290} z={20}>
          <div className="relative h-full w-full rounded-[var(--radius-major)] border border-[var(--line)] bg-[rgba(23,25,24,.94)] shadow-[var(--shadow-panel)]">
            <div className="absolute left-44 top-46">
              <p className="label text-[var(--accent)]">{card.label}</p>
              <h2 className="heading-lg mt-16 w-[500px] text-[var(--paper)]">{card.head}</h2>
              <p className="body-lg mt-18 w-[500px] text-[var(--paper-soft)]">{card.body}</p>
              <div className="mt-18">
                <TextAction onClick={() => go("debrief")}>
                  View Debrief <ArrowRight size={18} />
                </TextAction>
              </div>
            </div>
          </div>
        </Box>
      )}
    </PageShell>
  );
}
