import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Easing,
  OffthreadVideo,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

/**
 * "Todo lo bueno empieza con V" v2 · 816×1104 · 24 fps · 10 s · texto al 43 % de la altura
 * El metraje original va intacto (misma resolución, fps y audio): solo se superponen textos.
 * Raleway Light 300, blanco, centrado; «Vino» y «Ve al Temple» en Medium 500.
 */
export const VINOV2_FPS = 24;
export const VINOV2_DURATION = 241; // 10,04 s: duración exacta del video original
export const VINOV2_W = 816;
export const VINOV2_H = 1104;

type Part = { t: string; strong?: boolean; emoji?: boolean };
type Block = { from: number; to: number; lines: Part[][] };

// Tiempos en segundos (0:00–2:00 = 0–2 s; 5:50 = 5,5 s; 7:50 = 7,5 s)
const BLOCKS: Block[] = [
  { from: 0, to: 2, lines: [[{ t: "Fíjate que todo lo bueno" }], [{ t: "empieza con “V”" }]] },
  { from: 2, to: 4, lines: [[{ t: "Vida, Viajes, Velas y " }, { t: "Vino", strong: true }]] },
  { from: 4, to: 5.5, lines: [[{ t: "¿Vienes? ¿Voy? ¿Vamos?" }]] },
  { from: 5.5, to: 7.5, lines: [[{ t: "¿Ya tienes tu botella" }], [{ t: "para el viernes?" }]] },
  {
    from: 7.5,
    to: 10,
    lines: [[{ t: "¿No? " }, { t: "Ve al Temple", strong: true }, { t: " " }, { t: "", emoji: true }]],
  },
];

const FACES: [string, string, string][] = [
  ["V2Raleway", "vinoV/fonts/raleway-latin-300-normal.woff2", "300"],
  ["V2Raleway", "vinoV/fonts/raleway-latin-500-normal.woff2", "500"],
];

const useFonts = () => {
  const [handle] = useState(() => delayRender("vinov2-fonts"));
  useEffect(() => {
    Promise.all(
      FACES.map(async ([family, path, weight]) => {
        const face = new FontFace(family, `url(${staticFile(path)})`, { weight });
        await face.load();
        document.fonts.add(face);
      }),
    )
      .catch((e) => console.error("font load", e))
      .finally(() => continueRender(handle));
  }, [handle]);
};

const ease = Easing.bezier(0.25, 0.1, 0.25, 1);
const easeIn = Easing.bezier(0.4, 0, 0.7, 1);

const TextBlock: React.FC<{ b: Block }> = ({ b }) => {
  const frame = useCurrentFrame();
  const f0 = Math.round(b.from * VINOV2_FPS);
  const f1 = Math.round(b.to * VINOV2_FPS);
  const dur = f1 - f0;
  const inLen = Math.min(14, Math.round(dur * 0.28)); // ~0,6 s
  const outLen = Math.min(11, Math.round(dur * 0.22)); // ~0,45 s
  const inP = interpolate(frame, [f0, f0 + inLen], [0, 1], { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const outP = interpolate(frame, [f1 - outLen, f1], [0, 1], { easing: easeIn, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = inP * (1 - outP);
  // desplazamiento vertical mínimo: sube 14 px al entrar y 8 px más al salir
  const ty = (1 - inP) * 14 - outP * 8;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 475,
        transform: `translateY(calc(-50% + ${ty}px))`,
        maxWidth: VINOV2_W * 0.85,
        margin: "0 auto",
        opacity,
        textAlign: "center",
        color: "#FFFFFF",
        fontFamily: "V2Raleway, sans-serif",
        fontSize: 50,
        lineHeight: 1.2,
        letterSpacing: 0.4,
        textShadow: "0 2px 8px rgba(0,0,0,0.85), 0 0 20px rgba(0,0,0,0.45)",
      }}
    >
      {b.lines.map((line, i) => (
        <div key={i} style={{ whiteSpace: "pre" }}>
          {line.map((p, j) => (
            p.emoji ? (
              // 👇 como imagen (Twemoji, CC-BY 4.0): Chrome no renderiza fuentes de emoji SVG
              <img
                key={j}
                src={staticFile("vinoV/emoji/1f447.svg")}
                style={{ height: "1.02em", width: "1.02em", verticalAlign: "-0.14em", filter: "drop-shadow(0 2px 6px rgba(0,0,0,.6))" }}
              />
            ) : (
              <span key={j} style={{ fontWeight: p.strong ? 500 : 300 }}>
                {p.t}
              </span>
            )
          ))}
        </div>
      ))}
    </div>
  );
};

const SoftScrim: React.FC = () => {
  const frame = useCurrentFrame();
  // degradado radial muy sutil (sin bordes) detrás del bloque de texto; entra y sale con el video
  const o = interpolate(frame, [0, 14, VINOV2_DURATION - 16, VINOV2_DURATION - 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        width: VINOV2_W,
        top: 475 - 190,
        height: 380,
        opacity: o,
        background:
          "radial-gradient(ellipse 62% 50% at 50% 50%, rgba(0,0,0,.36) 0%, rgba(0,0,0,.2) 50%, rgba(0,0,0,0) 100%)",
      }}
    />
  );
};

export const VinoV2Reel: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo
        src={staticFile("vinoV/botella.mp4")}
        style={{ width: VINOV2_W, height: VINOV2_H }}
      />
      <SoftScrim />
      {BLOCKS.map((b, i) => (
        <TextBlock key={i} b={b} />
      ))}
    </AbsoluteFill>
  );
};
