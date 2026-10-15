import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, sec } from "../config";

const Icon: React.FC<{ kind?: string; color: string }> = ({ kind, color }) => {
  if (!kind) return null;
  const common = { width: 44, height: 44, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "check") return <svg {...common}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
  if (kind === "scan") return <svg {...common}><path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M4 12h16" /></svg>;
  return <svg {...common}><path d="M7 4h10v16l-5-3.5L7 20z" /></svg>;
};

/** Etiqueta flotante tipo interfaz: cristal oscuro, borde y resplandor discretos. */
export const Chip: React.FC<{ from: number; to: number; text: string; color: string; icon?: string; size?: number }> = ({ from, to, text, color, icon, size = 52 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - sec(from), fps, config: { damping: 13, stiffness: 190, mass: 0.7 } });
  const out = interpolate(frame, [sec(to) - 5, sec(to)], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  if (frame < sec(from) || frame >= sec(to)) return null;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 34px",
        borderRadius: 999,
        background: "linear-gradient(180deg, rgba(20,34,64,.92), rgba(10,20,42,.92))",
        border: `2.5px solid ${color}`,
        boxShadow: `0 0 34px ${color}55, inset 0 0 18px ${color}22, 0 14px 34px rgba(0,0,0,.45)`,
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: 1,
        color: COLORS.white,
        opacity: Math.min(1, p) * out,
        scale: String(interpolate(p, [0, 1], [0.6, 1]) * interpolate(out, [0, 1], [0.92, 1])),
        translate: `0 ${interpolate(p, [0, 1], [30, 0])}px`,
        whiteSpace: "nowrap",
      }}
    >
      <Icon kind={icon} color={color} />
      {text}
    </div>
  );
};
