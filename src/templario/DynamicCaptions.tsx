import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import words from "./words.json";
import { C, FONT, FPS, easeIn, ramp } from "./theme";

/**
 * Subtítulos sincronizados con la locución (tiempos por palabra en words.json, generados por
 * scripts/templario_voice.py). Un solo bloque a la vez, máx. 2 líneas, zona segura de Reels.
 * - "normal": frase corta con palabras clave en dorado
 * - "concept": concepto grande (6 BOTELLAS · DISTINTOS ESTILOS · SIN COMPRAR A CIEGAS)
 * - "hero": titular final con cada línea sincronizada a su palabra (DESCUBRE / TU FAVORITO)
 * Los índices a/b son posiciones en words.json (el guion no se altera).
 */
type Seg = { t: string; gold?: boolean; size?: number };
type Line = { segs: Seg[]; w?: number };
type Chunk = { a: number; b: number; kind: "normal" | "concept" | "hero"; lines: Line[]; y?: number };

const L = (...segs: Seg[]): Line => ({ segs });
const g = (t: string, size?: number): Seg => ({ t, gold: true, size });
const n = (t: string, size?: number): Seg => ({ t, size });

const CHUNKS: Chunk[] = [
  // BLOQUE 1 (el titular ¿NO SABES CUÁL ELEGIR? cubre "Si no sabes cuál vino elegir,")
  { a: 6, b: 9, kind: "normal", lines: [L(n("parte por este "), g("pack"))] },
  { a: 10, b: 12, kind: "normal", lines: [L(n("y "), g("problema resuelto"))] },
  // BLOQUE 2
  { a: 13, b: 17, kind: "normal", lines: [L(n("El "), g("Pack Legado")), L(g("Templario"), n(" reúne"))] },
  { a: 18, b: 19, kind: "concept", lines: [L(g("6", 200), n(" BOTELLAS", 124))] },
  { a: 20, b: 24, kind: "normal", lines: [L(n("de La Orden del Temple"))] },
  { a: 25, b: 27, kind: "normal", lines: [L(n("para que pruebes"))] },
  { a: 28, b: 29, kind: "concept", lines: [L(n("DISTINTOS", 124)), L(g("ESTILOS", 124))] },
  { a: 30, b: 33, kind: "concept", y: 450, lines: [L(n("SIN COMPRAR", 124)), L(g("A CIEGAS", 124))] },
  // BLOQUE 3
  { a: 34, b: 39, kind: "normal", lines: [L(n("Es la forma más simple de"))] },
  {
    a: 40,
    b: 44,
    kind: "hero",
    lines: [
      { segs: [n("DESCUBRE", 112)], w: 40 },
      { segs: [g("TU FAVORITO", 112)], w: 43 },
    ],
  },
];

const LEAD = 0.05; // aparece apenas antes de la palabra
const TAIL = 0.2;

const ts = (i: number) => words[i].start as number;
const te = (i: number) => words[i].end as number;

export const CAPTION_TIMES = CHUNKS.map((c, i) => {
  const start = ts(c.a) - LEAD;
  const nextStart = i + 1 < CHUNKS.length ? ts(CHUNKS[i + 1].a) - LEAD : 99;
  const end = Math.min(te(c.b) + TAIL, nextStart - 0.02, c.kind === "hero" ? 12.62 : 99);
  return { start, end };
});

const stroke: React.CSSProperties = {
  WebkitTextStroke: "9px rgba(8,4,6,.82)",
  paintOrder: "stroke fill",
  textShadow: "0 8px 26px rgba(0,0,0,.65)",
};

const ChunkView: React.FC<{ c: Chunk; startF: number; endF: number }> = ({ c, startF, endF }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - startF;
  const concept = c.kind !== "normal";
  const pop = spring({
    frame: f,
    fps,
    config: concept ? { damping: 9, stiffness: 210, mass: 0.7 } : { damping: 14, stiffness: 190, mass: 0.6 },
    durationInFrames: concept ? 16 : 12,
  });
  const out = ramp(frame, endF - 5, endF, 1, 0, easeIn);
  const scale = concept ? 1.28 - 0.28 * pop : 0.9 + 0.1 * pop;
  const ty = concept ? 0 : (1 - pop) * 26;
  const yCenter = c.y ?? (c.kind === "hero" ? 1452 : concept ? 1390 : 1440);
  return (
    <div
      style={{
        position: "absolute",
        left: 130,
        width: 820,
        top: yCenter,
        transform: `translateY(-50%) translateY(${ty}px) scale(${scale})`,
        opacity: Math.min(1, pop * 2) * out,
        textAlign: "center",
        lineHeight: concept ? 1.02 : 1.16,
      }}
    >
      {c.lines.map((line, li) => {
        const reveal = line.w !== undefined ? Math.round((ts(line.w) - LEAD) * FPS) - startF : 0;
        const lp = line.w !== undefined ? spring({ frame: f - reveal, fps, config: { damping: 10, stiffness: 200, mass: 0.7 }, durationInFrames: 14 }) : 1;
        return (
          <div
            key={li}
            style={{
              opacity: Math.min(1, lp * 2.2),
              transform: `scale(${1.2 - 0.2 * lp})`,
              whiteSpace: "nowrap",
            }}
          >
            {line.segs.map((s, si) => (
              <span
                key={si}
                style={{
                  ...stroke,
                  fontFamily: concept ? FONT.display : FONT.sans,
                  fontWeight: concept ? 400 : 800,
                  fontSize: s.size ?? (concept ? 124 : 64),
                  color: s.gold ? C.gold : C.cream,
                  letterSpacing: concept ? 1 : 0,
                }}
              >
                {s.t}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export const DynamicCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {CHUNKS.map((c, i) => {
        const startF = Math.round(CAPTION_TIMES[i].start * FPS);
        const endF = Math.round(CAPTION_TIMES[i].end * FPS);
        if (frame < startF || frame > endF) return null;
        return <ChunkView key={i} c={c} startF={startF} endF={endF} />;
      })}
    </AbsoluteFill>
  );
};
