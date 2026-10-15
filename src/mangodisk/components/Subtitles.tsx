import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTIONS } from "../captions";
import { COLORS, FONT, SAFE, sec, WIDTH } from "../config";

const CAP_TOP = 1320; // zona segura: entre 250 (arriba) y 1500 (abajo, UI de Reels)
const CAP_H = 180;

const strokeShadow = `0 4px 18px rgba(0,0,0,.65)`;

/** Subtítulos cinéticos: cada palabra entra con escala+opacidad en su instante de voz. Máx. 2 líneas. */
export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const g = CAPTIONS.find((c) => frame >= sec(c.from) && frame < sec(c.to));
  if (!g) return null;
  const outP = interpolate(frame, [sec(g.to) - 3, sec(g.to)], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const inP = interpolate(frame, [sec(g.from), sec(g.from) + 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: SAFE.side,
          width: WIDTH - SAFE.side * 2 - SAFE.rightExtra,
          top: CAP_TOP,
          height: CAP_H,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          alignContent: "center",
          columnGap: 34,
          rowGap: 0,
          textAlign: "center",
          opacity: outP * inP,
          translate: `0 ${(1 - inP) * 14}px`,
        }}
      >
        {g.words.map((w, i) => {
          const p = spring({ frame: frame - sec(w.s), fps, config: { damping: 14, stiffness: 220, mass: 0.6 } });
          const seen = frame >= sec(w.s) - 1;
          const active = frame >= sec(w.s) && frame < sec(w.e);
          return (
            <span
              key={i}
              style={{
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: 72,
                lineHeight: 1.05,
                letterSpacing: -1,
                color: w.key ? COLORS.cyan : COLORS.white,
                opacity: seen ? interpolate(p, [0, 1], [0, 1]) : 0,
                scale: String(seen ? interpolate(p, [0, 1], [0.7, active ? 1.08 : 1]) : 0.7),
                WebkitTextStroke: "10px #050A16",
                paintOrder: "stroke fill",
                textShadow: w.key ? `0 0 28px ${COLORS.cyan}88, ${strokeShadow}` : strokeShadow,
                display: "inline-block",
              }}
            >
              {w.t}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
