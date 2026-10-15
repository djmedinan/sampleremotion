import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../config";

/** Fondo persistente: degradado + rejilla tenue + resplandores que derivan lentamente (sin pantallas negras). */
export const Background: React.FC = () => {
  const f = useCurrentFrame();
  const drift = interpolate(f, [0, 450], [0, 1]);
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 900px at ${20 + drift * 40}% ${18 + drift * 10}%, ${COLORS.blue}38, transparent 70%),
                       radial-gradient(800px 800px at ${85 - drift * 35}% ${72 - drift * 12}%, ${COLORS.cyan}22, transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${COLORS.blue}14 1px, transparent 1px), linear-gradient(90deg, ${COLORS.blue}14 1px, transparent 1px)`,
          backgroundSize: "90px 90px",
          backgroundPosition: `0 ${f * 0.6}px`,
          maskImage: "radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%)",
        }}
      />
    </AbsoluteFill>
  );
};
