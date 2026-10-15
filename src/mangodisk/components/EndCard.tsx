import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND, COLORS, END, FONT, sec } from "../config";

const ease = Easing.bezier(0.22, 1, 0.36, 1);

/** Cierre: logo + nombre, CTA animado, marca discreta y pequeño impacto final. */
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const a = interpolate(t, [END.from, END.from + 0.25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const logo = spring({ frame: frame - sec(END.from + 0.05), fps, config: { damping: 12, stiffness: 150 } });
  const cta = spring({ frame: frame - sec(14.15), fps, config: { damping: 10, stiffness: 170, mass: 0.8 } });
  const impact = interpolate(t, [14.3, 14.38, 14.7], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = 0.5 + 0.5 * Math.sin(Math.max(0, t - 14.5) * 8);
  const brand = interpolate(t, [14.4, 14.7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (t < END.from) return null;
  return (
    <AbsoluteFill style={{ opacity: a, fontFamily: FONT, background: `radial-gradient(900px 700px at 50% 42%, ${COLORS.bg}f2 40%, ${COLORS.bg}cc 100%)` }}>
      <AbsoluteFill style={{ background: `radial-gradient(500px 500px at 50% 42%, ${COLORS.cyan}${Math.round(impact * 60).toString(16).padStart(2, "0")}, transparent 70%)` }} />
      <div style={{ position: "absolute", top: 400, left: 0, right: 0, textAlign: "center", scale: String(interpolate(logo, [0, 1], [0.5, 1]) + impact * 0.04), opacity: logo }}>
        <Img src={staticFile(BRAND.logo)} style={{ width: 280, height: 280, filter: `drop-shadow(0 0 40px ${COLORS.blue}99)` }} />
        <div style={{ fontSize: 128, fontWeight: 900, letterSpacing: -4, color: COLORS.white, lineHeight: 1.05 }}>
          {BRAND.programParts[0]}
          <span style={{ color: COLORS.blue, textShadow: `0 0 40px ${COLORS.blue}aa` }}>{BRAND.programParts[1]}</span>
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, color: COLORS.gray, marginTop: 8 }}>{END.tagline}</div>
      </div>

      <div style={{ position: "absolute", top: 1010, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: Math.min(1, cta), scale: String(interpolate(cta, [0, 1], [0.6, 1])) }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 22, padding: "26px 54px", borderRadius: 999, background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.cyan})`, boxShadow: `0 0 ${40 + pulse * 40}px ${COLORS.cyan}88, 0 20px 50px rgba(0,0,0,.5)`, color: "#04101F", fontSize: 62, fontWeight: 900, letterSpacing: 1 }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="#04101F"><path d="M6 3h12a1 1 0 011 1v17l-7-4.5L5 21V4a1 1 0 011-1z" /></svg>
          {END.cta}
        </div>
      </div>

      <div style={{ position: "absolute", top: 262, left: 0, right: 0, textAlign: "center", opacity: brand * 0.9, fontSize: 34, fontWeight: 700, letterSpacing: 4, color: COLORS.gray, textTransform: "uppercase" }}>
        {BRAND.channel}
      </div>
      <div style={{ position: "absolute", top: 1520, left: 0, right: 0, textAlign: "center", opacity: brand * 0.7, fontSize: 26, color: COLORS.gray }}>{END.credit}</div>
    </AbsoluteFill>
  );
};
