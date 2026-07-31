import { useEffect, useState, type ReactNode, type CSSProperties } from "react";

export const STAGE_W = 1920;
export const STAGE_H = 1080;

/**
 * Master prompt section 4 — the authoritative design size is 1920x1080 and
 * 1366x768 must scale proportionally without reflow. Every UI element keeps
 * its exact intended position by living on a fixed coordinate stage that is
 * scaled as a whole rather than re-laid-out.
 */
export function FixedStage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () =>
      setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[var(--bg)]">
      <div
        style={{
          position: "absolute",
          width: STAGE_W,
          height: STAGE_H,
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center"
        }}
      >
        {children}
      </div>
    </div>
  );
}

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  z?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/** Absolute placement helper. All page coordinates are stage pixels. */
export function Box({ x, y, w, h, z = 1, className = "", style, children }: BoxProps) {
  return (
    <div
      className={className}
      style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z, ...style }}
    >
      {children}
    </div>
  );
}
