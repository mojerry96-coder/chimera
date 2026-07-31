import { useEffect, useRef, useState, type ReactNode } from "react";
import { STAGE_W, STAGE_H } from "./stage";

/**
 * Scrolling variant of the fixed stage.
 *
 * Master section 10 page 16 — the debrief is the only page allowed to scroll.
 * Everything else uses FixedStage and never moves.
 *
 * Width and scale behave exactly as FixedStage so the composition matches the
 * rest of the film, but the stage may be taller than 1080 and the viewport
 * scrolls it. The background plate is fixed behind the scrolling content
 * rather than scrolling with it, so the room stays put while the record moves.
 */
export function ScrollStage({ media, children }: { media?: ReactNode; children: ReactNode }) {
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(STAGE_H);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
      if (innerRef.current) setHeight(innerRef.current.offsetHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    if (innerRef.current) ro.observe(innerRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-[var(--bg)]">
      {media && <div className="fixed inset-0 z-0">{media}</div>}

      {/* Spacer carries the scaled height so the scrollbar is honest. */}
      <div style={{ position: "relative", height: height * scale, zIndex: 1 }}>
        <div
          ref={innerRef}
          style={{
            position: "absolute",
            width: STAGE_W,
            left: "50%",
            marginLeft: -STAGE_W / 2,
            transform: `scale(${scale})`,
            transformOrigin: "top center"
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
