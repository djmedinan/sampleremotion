import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, sec } from "../config";

/** Tipografía cinética: cada línea sube con máscara y la palabra clave se ilumina. */
export const Headline: React.FC<{ from: number; to: number; lines: { text: string; hl?: boolean }[]; size: number; top: number }> = ({ from, to, lines, size, top }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < sec(from) || frame >= sec(to)) return null;
  const out = interpolate(frame, [sec(to) - 5, sec(to)], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top, textAlign: "center", fontFamily: FONT, opacity: out }}>
      {lines.map((l, i) => {
        const p = spring({ frame: frame - sec(from) - i * 4, fps, config: { damping: 15, stiffness: 160, mass: 0.8 } });
        return (
          <div key={i} style={{ overflow: "hidden", height: size * 1.1 }}>
            <div
              style={{
                fontWeight: 900,
                fontSize: size,
                lineHeight: 1.1,
                letterSpacing: -2,
                color: l.hl ? COLORS.blue : COLORS.white,
                textShadow: l.hl ? `0 0 40px ${COLORS.blue}aa` : "0 4px 20px rgba(0,0,0,.5)",
                translate: `0 ${(1 - p) * size * 1.1}px`,
              }}
            >
              {l.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};
