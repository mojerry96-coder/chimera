import { ArrowRight } from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton } from "@/components/controls";
import { Plate } from "@/media/MediaSequence";
import { useSceneNav } from "@/lib/useSceneNav";
import { PAGE_OF, type Route } from "@/routes";

/**
 * Scaffold placeholder.
 *
 * Every route exists and carries its correct background plate, page number and
 * forward link, so the whole 20-page spine is walkable now. Each page is
 * replaced in turn with its real composition from master prompt section 10.
 *
 * This is deliberately not styled to look finished — it should read as
 * unbuilt at a glance.
 */
export function Stub({
  route,
  title,
  plate,
  blockedOn
}: {
  route: Route;
  title: string;
  plate: string;
  blockedOn?: string;
}) {
  const { go } = useSceneNav(route);

  return (
    <PageShell pageNumber={PAGE_OF[route]} media={<Plate src={plate} filter="under-ui" />}>
      <Box x={0} y={0} w={1920} h={1080} z={5} className="bg-[rgba(23,25,24,.72)]" />

      <Box x={160} y={380} w={1200} h={120} z={20}>
        <p className="label text-[var(--accent)]">Page {PAGE_OF[route]} · not built</p>
        <h1 className="display-lg mt-18 text-[var(--paper)]">{title}</h1>
      </Box>

      <Box x={162} y={560} w={900} h={80} z={20}>
        <p className="body-lg text-[var(--text-muted)]">
          Route <code className="text-[var(--paper-soft)]">/{route}</code> · compare against{" "}
          <code className="text-[var(--paper-soft)]">
            /references/project-chimera/P{PAGE_OF[route]}.png
          </code>
        </p>
        {blockedOn && (
          <p className="body mt-14 text-[var(--warning)]">Blocked on a decision: {blockedOn}</p>
        )}
      </Box>

      <Box x={160} y={720} w={318} h={64} z={20}>
        <PrimaryButton onClick={() => go()}>
          Continue <ArrowRight size={20} />
        </PrimaryButton>
      </Box>
    </PageShell>
  );
}
