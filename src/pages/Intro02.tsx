import { useMemo } from "react";
import {
  ArrowRight,
  Globe,
  CurrencyCircleDollar,
  Fingerprint,
  Database,
  Broadcast
} from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { TextAction } from "@/components/controls";
import { Plate } from "@/media/MediaSequence";
import { PLATE } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useReveal } from "@/lib/useReveal";
import { useSceneNav } from "@/lib/useSceneNav";
import { SYSTEMS } from "@/config/missionData";

const ICONS = [Globe, CurrencyCircleDollar, Fingerprint, Database, Broadcast];

/**
 * PAGE 02 — Five systems, one platform.  Route /intro-02
 *
 * Explains the dependency chain; it does not market the product. Master
 * section 10 page 02 is explicit: compact icon-label identifiers, never large
 * product cards.
 *
 * Timing note. The published schedule reveals Continue at 6.2s, but the two
 * scripted lines run 14.8s — the single largest overrun in the film, and not
 * fixable by pacing since line one names all five systems in one breath. Per
 * section 17 the UI arrives on schedule and Adebayo finishes underneath.
 */
export default function Intro02() {
  const { go } = useSceneNav("intro-02");
  // 2.4s title · 3.0-6.0s identifiers one at a time · 6.2s Continue
  const r = useReveal([2.4, 3.0, 3.6, 4.2, 4.8, 5.4, 6.2]);

  const lines = useMemo(() => [VO.P02_ADB_01, VO.P02_ADB_02], []);
  useVoice(lines);

  return (
    <PageShell
      pageNumber="02"
      media={<Plate src={PLATE.P05_ROOM} alt="The Chimera project room." filter="under-ui" push />}
    >
      <Box x={0} y={0} w={980} h={1080} z={10} className="bg-[rgba(23,25,24,.94)]" />

      {r.at(1) && (
        <>
          <Box x={72} y={210} w={820} h={230} z={20}>
            <h1 className="display-xl text-[var(--paper)]">
              FIVE SYSTEMS.
              <br />
              <span className="text-[var(--accent)]">ONE PLATFORM.</span>
            </h1>
          </Box>

          <Box x={74} y={470} w={560} h={70} z={20}>
            <p className="body-lg text-[var(--paper-soft)]">
              Five mission-critical systems.
              <br />
              One connected launch.
            </p>
          </Box>
        </>
      )}

      {/* Identifiers reveal one at a time, 156x142 with a 20px gap. */}
      {SYSTEMS.map((s, i) => {
        const Icon = ICONS[i];
        return (
          r.at(2 + i) && (
            <Box key={s.id} x={72 + i * 176} y={706} w={156} h={142} z={20}>
              <div className="flex h-full w-full flex-col justify-between rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-20">
                <Icon size={26} className="text-[var(--accent)]" />
                <div>
                  <div className="font-manrope text-[17px] font-semibold text-[var(--paper)]">
                    {s.name}
                  </div>
                  <div className="mt-4 font-manrope text-[12px] text-[var(--text-muted)]">
                    {s.role}
                  </div>
                </div>
              </div>
            </Box>
          )
        );
      })}

      {r.at(7) && (
        <Box x={72} y={908} w={190} h={54} z={20}>
          <TextAction onClick={() => go()}>
            Continue <ArrowRight size={18} />
          </TextAction>
        </Box>
      )}
    </PageShell>
  );
}
