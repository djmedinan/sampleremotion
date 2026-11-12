import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import raw from "./vino30lucas.words.json";

/**
 * Subtítulos sincronizados palabra por palabra (transcripción con Whisper, revisada) sobre
 * el video original sin modificar: 848×1072 · 24 fps · 15,04 s, audio intacto.
 */
export const SUBS_FPS = 24;
export const SUBS_DURATION = 361;
export const SUBS_W = 848;
export const SUBS_H = 1072;

type W = { w: string; s: number; e: number };
const words = raw as W[];

const CREAM = "#F6ECD4";
const GOLD = "#E2B75A";
const MAX_LINE = 14; // caracteres por línea
const MAX_CHARS = 28;
const MAX_WORDS = 3;

/** Agrupa palabras en bloques cortos (máx. 2 líneas) cortando en la puntuación. */
const chunks: { ws: W[]; lines: number[][] }[] = (() => {
  const out: W[][] = [];
  let cur: W[] = [];
  const len = (a: W[]) => a.map((x) => x.w).join(" ").length;
  words.forEach((w) => {
    if (cur.length && (cur.length >= MAX_WORDS || len([...cur, w]) > MAX_CHARS)) {
      out.push(cur);
      cur = [];
    }
    cur.push(w);
    if (/[.?!]$/.test(w.w) || (/,$/.test(w.w) && cur.length >= 2)) {
      out.push(cur);
      cur = [];
    }
  });
  if (cur.length) out.push(cur);
  return out.map((ws) => {
    // reparto equilibrado en líneas
    const total = len(ws);
    if (total <= MAX_LINE) return { ws, lines: [ws.map((_, i) => i)] };
    let best = 1;
    let bestDiff = 1e9;
    for (let k = 1; k < ws.length; k++) {
      const a = len(ws.slice(0, k));
      const b = len(ws.slice(k));
      const d = Math.abs(a - b);
      if (d < bestDiff) {
        bestDiff = d;
        best = k;
      }
    }
    return { ws, lines: [ws.slice(0, best).map((_, i) => i), ws.slice(best).map((_, i) => i + best)] };
  });
})();

const useFonts = () => {
  const [handle] = useState(() => delayRender("subs-fonts"));
  useEffect(() => {
    const faces: [string, string][] = [
      ["SubMontserrat", "templario/fonts/montserrat-latin-800-normal.woff2"],
    ];
    Promise.all(
      faces.map(async ([family, path]) => {
        const f = new FontFace(family, `url(${staticFile(path)})`, { weight: "800" });
        await f.load();
        document.fonts.add(f);
      }),
    )
      .catch((e) => console.error(e))
      .finally(() => continueRender(handle));
  }, [handle]);
};

const ChunkView: React.FC<{ i: number; startF: number; endF: number }> = ({ i, startF, endF }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = chunks[i];
  const pop = spring({ frame: frame - startF, fps, config: { damping: 15, stiffness: 190, mass: 0.6 }, durationInFrames: 10 });
  const out = interpolate(frame, [endF - 3, endF], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const t = frame / fps;
  return (
    <div
      style={{
        position: "absolute",
        left: 42, // bloque desplazado a la izquierda: la botella (etiqueta) ocupa siempre el tercio derecho
        width: 480,
        top: SUBS_H * 0.8,
        transform: `translateY(-50%) translateY(${(1 - pop) * 14}px) scale(${0.94 + 0.06 * pop})`,
        opacity: Math.min(1, pop * 2) * out,
        textAlign: "center",
        lineHeight: 1.12,
      }}
    >
      {c.lines.map((idxs, li) => (
        <div key={li} style={{ whiteSpace: "nowrap" }}>
          {idxs.map((wi, k) => {
            const w = c.ws[wi];
            const active = t >= w.s - 0.02 && t < w.e + 0.02;
            return (
              <span
                key={wi}
                style={{
                  fontFamily: "SubMontserrat, Montserrat, sans-serif",
                  fontWeight: 800,
                  fontSize: 48,
                  color: active ? GOLD : CREAM,
                  WebkitTextStroke: "7px rgba(8,4,6,.85)",
                  paintOrder: "stroke fill",
                  textShadow: "0 6px 20px rgba(0,0,0,.55)",
                  display: "inline-block",
                  marginRight: k < idxs.length - 1 ? 12 : 0,
                  transform: `scale(${active ? 1.06 : 1})`,
                  transition: "none",
                }}
              >
                {w.w}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const SubsReel: React.FC = () => {
  useFonts();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo src={staticFile("subs/vino30lucas.mp4")} style={{ width: SUBS_W, height: SUBS_H }} />
      {chunks.map((c, i) => {
        const next = chunks[i + 1];
        const start = Math.round((c.ws[0].s - 0.04) * SUBS_FPS);
        const rawEnd = c.ws[c.ws.length - 1].e + 0.18;
        const end = Math.round((next ? Math.min(rawEnd, next.ws[0].s - 0.04) : rawEnd) * SUBS_FPS);
        if (frame < start || frame > end) return null;
        return <ChunkView key={i} i={i} startF={start} endF={end} />;
      })}
    </AbsoluteFill>
  );
};
