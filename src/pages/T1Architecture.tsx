import { useCallback, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Cursor,
  Link as LinkIcon,
  ArrowsOutCardinal,
  Trash,
  ArrowCounterClockwise,
  Globe,
  ShieldCheck,
  User,
  Folder,
  Cube,
  Database,
  Broadcast
} from "@phosphor-icons/react";
import { PageShell } from "@/components/PageShell";
import { Box } from "@/lib/stage";
import { PrimaryButton } from "@/components/controls";
import { Plate } from "@/media/MediaSequence";
import { PLATE } from "@/media/assets";
import { VO } from "@/media/voice";
import { useVoice } from "@/media/useVoice";
import { useReveal } from "@/lib/useReveal";
import { useSceneNav } from "@/lib/useSceneNav";
import { useSim } from "@/state/simStore";

const CANVAS = { x: 104, y: 232, w: 1706, h: 742 };

type Kind = "client" | "edge" | "service" | "data";
type Node = { id: string; label: string; sub: string; x: number; y: number; w: number; h: number; kind: Kind };

/** Node layout from master section 10 page 04, relative to the canvas origin. */
const INITIAL_NODES: Node[] = [
  { id: "web", label: "Web Client", sub: "Frontend", x: 82, y: 98, w: 180, h: 78, kind: "client" },
  { id: "gw", label: "API Gateway", sub: "Ingress", x: 360, y: 98, w: 200, h: 78, kind: "edge" },
  { id: "user", label: "User Service", sub: "Users & Profiles", x: 660, y: 98, w: 210, h: 78, kind: "service" },
  { id: "proj", label: "Project Service", sub: "Projects & Data", x: 970, y: 98, w: 220, h: 78, kind: "service" },
  { id: "sim", label: "Simulation Service", sub: "Simulations", x: 1290, y: 98, w: 238, h: 78, kind: "service" },
  { id: "auth", label: "Auth Service", sub: "Authentication", x: 360, y: 344, w: 200, h: 78, kind: "service" },
  { id: "pg", label: "PostgreSQL", sub: "Primary DB", x: 700, y: 454, w: 190, h: 78, kind: "data" },
  { id: "redis", label: "Redis Cache", sub: "Cache", x: 930, y: 454, w: 190, h: 78, kind: "data" },
  { id: "queue", label: "Queue", sub: "Job Queue", x: 1160, y: 454, w: 190, h: 78, kind: "data" },
  { id: "bus", label: "Event Bus", sub: "Event Bus", x: 1390, y: 454, w: 190, h: 78, kind: "data" }
];

const INITIAL_EDGES: [string, string][] = [
  ["web", "gw"],
  ["gw", "user"],
  ["gw", "auth"],
  ["user", "proj"],
  ["proj", "sim"],
  ["user", "pg"],
  ["proj", "redis"],
  ["sim", "queue"],
  ["sim", "bus"]
];

const ICON: Record<string, typeof Globe> = {
  web: Globe, gw: Cube, user: User, proj: Folder, sim: Cube,
  auth: ShieldCheck, pg: Database, redis: Database, queue: Broadcast, bus: Broadcast
};

type Tool = "select" | "connect" | "move" | "delete";
const TOOLS: { id: Tool | "reset"; label: string; Icon: typeof Cursor }[] = [
  { id: "select", label: "Select", Icon: Cursor },
  { id: "connect", label: "Connect", Icon: LinkIcon },
  { id: "move", label: "Move", Icon: ArrowsOutCardinal },
  { id: "delete", label: "Delete", Icon: Trash },
  { id: "reset", label: "Reset", Icon: ArrowCounterClockwise }
];

/**
 * Minimum structural guard. Section 10 page 04 — Submit Design exists only when
 * the graph passes it. The player is free to design badly; they are not free to
 * submit something disconnected.
 */
function evaluate(nodes: Node[], edges: [string, string][]) {
  const has = (id: string) => nodes.some((n) => n.id === id);
  const linked = (a: string, b: string) => edges.some(([f, t]) => f === a && t === b);
  const kindOf = (id: string) => nodes.find((n) => n.id === id)?.kind;

  const clientToEdge = edges.some(([f, t]) => kindOf(f) === "client" && kindOf(t) === "edge");
  const edgeToService = edges.some(([f, t]) => kindOf(f) === "edge" && kindOf(t) === "service");
  const serviceToData = edges.some(([f, t]) => kindOf(f) === "service" && kindOf(t) === "data");
  const clientDirectToData = edges.some(([f, t]) => kindOf(f) === "client" && kindOf(t) === "data");

  const valid = clientToEdge && edgeToService && serviceToData && !clientDirectToData;

  const serviceCount = nodes.filter((n) => n.kind === "service").length;
  const asyncBackbone = has("bus") && edges.some(([, t]) => t === "bus");

  const pattern: "monolithic" | "layered" | "microservices" =
    clientDirectToData || serviceCount <= 1
      ? "monolithic"
      : serviceCount >= 3 && asyncBackbone
        ? "microservices"
        : "layered";

  return {
    valid,
    pattern,
    reasons: [
      { ok: clientToEdge, text: "Client reaches an ingress point" },
      { ok: edgeToService, text: "Ingress reaches application services" },
      { ok: serviceToData, text: "Services reach data services" },
      { ok: !clientDirectToData, text: "No client talks to a datastore directly" }
    ],
    linked
  };
}

/**
 * PAGE 04 — Architecture Design.  Route /t1
 *
 * The player's first proof of technical judgement, and the one page that is
 * UI-dominant rather than media-led. The office plate stays visible at the
 * outer edges; no narrative video plays during construction.
 */
export default function T1Architecture() {
  const { go } = useSceneNav("t1");
  const patch = useSim((s) => s.patch);
  const spendTime = useSim((s) => s.spendTime);
  const attempts = useSim((s) => s.architectureAttempts);

  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<[string, string][]>(INITIAL_EDGES);
  const [tool, setTool] = useState<Tool>("select");
  const [selected, setSelected] = useState<string | null>(null);
  const [pendingLink, setPendingLink] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; ox: number; oy: number } | null>(null);

  const r = useReveal([2.6]);
  const lines = useMemo(() => [VO.P04_CHI_01], []);
  useVoice(lines);

  const model = useMemo(() => evaluate(nodes, edges), [nodes, edges]);

  const nodeById = useCallback((id: string) => nodes.find((n) => n.id === id), [nodes]);

  /** Pointer deltas arrive in screen px; the stage is scaled, so normalise. */
  const scale = () => (canvasRef.current?.getBoundingClientRect().width ?? CANVAS.w) / CANVAS.w;

  const onNodePointerDown = (e: React.PointerEvent, id: string) => {
    if (tool === "move") {
      const n = nodeById(id);
      if (!n) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = { id, ox: e.clientX / scale() - n.x, oy: e.clientY / scale() - n.y };
    }
  };

  const onNodePointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const nx = e.clientX / scale() - d.ox;
    const ny = e.clientY / scale() - d.oy;
    setNodes((ns) =>
      ns.map((n) =>
        n.id === d.id
          ? {
              ...n,
              x: Math.max(0, Math.min(CANVAS.w - n.w, nx)),
              y: Math.max(0, Math.min(CANVAS.h - n.h, ny))
            }
          : n
      )
    );
  };

  const onNodeClick = (id: string) => {
    if (tool === "select") setSelected(id === selected ? null : id);
    if (tool === "delete") {
      setNodes((ns) => ns.filter((n) => n.id !== id));
      setEdges((es) => es.filter(([f, t]) => f !== id && t !== id));
      setSelected(null);
    }
    if (tool === "connect") {
      if (!pendingLink) setPendingLink(id);
      else if (pendingLink === id) setPendingLink(null);
      else {
        setEdges((es) =>
          es.some(([f, t]) => f === pendingLink && t === id) ? es : [...es, [pendingLink, id]]
        );
        setPendingLink(null);
      }
    }
  };

  const reset = () => {
    setNodes(INITIAL_NODES);
    setEdges(INITIAL_EDGES);
    setSelected(null);
    setPendingLink(null);
  };

  const submit = () => {
    patch(
      {
        architectureValidity: model.valid ? "valid" : "invalid",
        patternDesigned: model.pattern,
        architectureAttempts: attempts + 1
      },
      "Architecture submitted"
    );
    // A redesign costs time; the first pass does not.
    if (attempts > 0) spendTime(2, "Architecture redesign");
    go("t1-confirm");
  };

  const anchor = (n: Node) => ({ cx: n.x + n.w / 2, cy: n.y + n.h / 2 });

  return (
    <PageShell
      pageNumber="04"
      media={<Plate src={PLATE.P10_ARCHITECTURE} alt="Workstation in the project room." filter="under-ui" />}
    >
      {r.at(1) && (
        <>
          <Box x={52} y={42} w={1816} h={996} z={10} className="flat-panel" />

          <Box x={104} y={78} w={300} h={22} z={20}>
            <span className="label text-[var(--accent)]">Task 1 · Design</span>
          </Box>

          {/* At the specified 88px this title measures 761px against the
              specified 760px box, so it wraps and clips by one pixel. The panel
              has clear space to the tool dock at x=980, so it is held on one
              line rather than shrinking the type off-spec. */}
          <Box x={104} y={116} w={760} h={88} z={20}>
            <h1 className="display-lg whitespace-nowrap text-[var(--paper)]">
              ARCHITECTURE <span className="text-[var(--accent)]">DESIGN</span>
            </h1>
          </Box>

          {/* Tool dock */}
          <Box x={980} y={90} w={560} h={64} z={20}>
            <div className="flex h-full items-center gap-10">
              {TOOLS.map(({ id, label, Icon }) => {
                const active = id === tool;
                return (
                  <button
                    key={id}
                    onClick={() => (id === "reset" ? reset() : (setTool(id as Tool), setPendingLink(null)))}
                    aria-pressed={id === "reset" ? undefined : active}
                    className={`flex h-[64px] min-w-[100px] flex-col items-center justify-center gap-6 rounded-[var(--radius-control)] border transition-colors ${
                      active
                        ? "border-[var(--accent)] bg-[var(--surface-raised)] text-[var(--accent)]"
                        : "border-[var(--line)] bg-[var(--surface)] text-[var(--text-muted)] hover:bg-[var(--surface-raised)]"
                    }`}
                  >
                    <Icon size={20} weight={active ? "bold" : "regular"} />
                    <span className="font-manrope text-[10px] font-semibold uppercase tracking-[0.14em]">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Box>

          {/* Section 10 page 04 — Submit exists only once the guards pass. */}
          {model.valid && (
            <Box x={1560} y={90} w={250} h={64} z={20}>
              <PrimaryButton onClick={submit}>
                Submit <ArrowRight size={18} />
              </PrimaryButton>
            </Box>
          )}

          <Box x={CANVAS.x} y={CANVAS.y} w={CANVAS.w} h={CANVAS.h} z={20}>
            <div ref={canvasRef} className="architecture-canvas relative h-full w-full overflow-hidden">
              <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`}>
                <defs>
                  <marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                    <path d="M0,0 L9,4.5 L0,9 z" fill="var(--line-strong)" />
                  </marker>
                </defs>
                {edges.map(([f, t]) => {
                  const a = nodeById(f);
                  const b = nodeById(t);
                  if (!a || !b) return null;
                  const p = anchor(a);
                  const q = anchor(b);
                  return (
                    <line
                      key={`${f}-${t}`}
                      x1={p.cx} y1={p.cy} x2={q.cx} y2={q.cy}
                      stroke="var(--line-strong)" strokeWidth={1.5} markerEnd="url(#ah)"
                    />
                  );
                })}
              </svg>

              {nodes.map((n) => {
                const Icon = ICON[n.id] ?? Cube;
                const isSel = selected === n.id;
                const isPend = pendingLink === n.id;
                return (
                  <button
                    key={n.id}
                    onPointerDown={(e) => onNodePointerDown(e, n.id)}
                    onPointerMove={onNodePointerMove}
                    onPointerUp={() => (drag.current = null)}
                    onClick={() => onNodeClick(n.id)}
                    style={{ position: "absolute", left: n.x, top: n.y, width: n.w, height: n.h }}
                    className={`flex items-center gap-14 rounded-[var(--radius-card)] border px-18 text-left transition-colors ${
                      isPend
                        ? "border-[var(--accent)] bg-[var(--surface-raised)]"
                        : isSel
                          ? "border-[var(--accent)] bg-[var(--surface)]"
                          : "border-[var(--line-strong)] bg-[var(--surface)] hover:bg-[var(--surface-raised)]"
                    } ${tool === "move" ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}`}
                  >
                    <Icon size={22} className="shrink-0 text-[var(--accent)]" />
                    <span className="min-w-0">
                      <span className="block truncate font-manrope text-[15px] font-semibold text-[var(--paper)]">
                        {n.label}
                      </span>
                      <span className="block truncate font-manrope text-[11px] text-[var(--text-muted)]">
                        {n.sub}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Box>

          {/* Structural readout. Section 17 — words and icons, never colour alone. */}
          <Box x={104} y={992} w={1400} h={30} z={20}>
            <div className="flex items-center gap-24">
              {model.reasons.map((c) => (
                <span
                  key={c.text}
                  className={`font-manrope text-[12px] ${c.ok ? "text-[var(--success)]" : "text-[var(--text-faint)]"}`}
                >
                  {c.ok ? "✓" : "○"} {c.text}
                </span>
              ))}
            </div>
          </Box>
        </>
      )}
    </PageShell>
  );
}
