import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSim } from "@/state/simStore";
import { NEXT, type Route } from "@/routes";

/**
 * Scene navigation with failure interception.
 *
 * Section 12 requires failure checks after every mutation. Rather than make
 * each page remember to test, any pending failure raised by the store is
 * intercepted here and routes to pages 17-20 regardless of where the player
 * was heading.
 */
export function useSceneNav(current: Route) {
  const navigate = useNavigate();
  const pendingFailure = useSim((s) => s.pendingFailure);
  const patch = useSim((s) => s.patch);

  useEffect(() => {
    patch({ currentScene: current });
  }, [current, patch]);

  useEffect(() => {
    if (pendingFailure) navigate(`/${pendingFailure}`, { replace: true });
  }, [pendingFailure, navigate]);

  const go = useCallback(
    (to?: Route) => {
      const target = to ?? NEXT[current];
      if (target) navigate(`/${target}`);
    },
    [current, navigate]
  );

  return { go };
}
