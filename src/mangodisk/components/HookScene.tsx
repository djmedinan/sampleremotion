import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT, HOOK, sec } from "../config";

const ease = Easing.bezier(0.22, 1, 0.36, 1);

const DiskIcon: React.FC = () => (
  <svg width="86" height="86" viewBox="0 0 64 64" fill="none" stroke={COLORS.cyan} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="14" width="52" height="36" rx="8" />
    <path d="M6 38h52" />
    <circle cx="16" cy="44" r="2.2" fill={COLORS.cyan} />
    <circle cx="24" cy="44" r="2.2" fill={COLORS.cyan} />
  </svg>
);

/** Escena 1 (HOOK): barra de almacenamiento ilustrativa casi llena + zoom rápido + titular cinético. */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const out = interpolate(t, [HOOK.to - 0.3, HOOK.to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const panelIn = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 150 } });
  // Barra: llena hasta casi el final con un tirón rápido y un último tramo lento.
  const fill = interpolate(t, [0.2, 1.0, 2.2], [0, 0.82, 0.94], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  // Zoom rápido al indicador (0.85–1.3 s) y regreso (2.3–2.8 s)
  const zoom = interpolate(t, [0.85, 1.25, 2.3, 2.8], [1, 1.3, 1.3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const shake = t > 1.9 && t < 2.5 ? Math.sin(t * 90) * 4 * (1 - (t - 1.9) / 0.6) : 0;
  const chipP = spring({ frame: frame - sec(1.7), fps, config: { damping: 11, stiffness: 200 } });
  const pulse = 0.5 + 0.5 * Math.sin(t * 10);
  const lines = [
    { a: "¿QUÉ LLENA", b: "" },
    { a: "TU ", b: "DISCO?" },
  ];
  return (
    <AbsoluteFill style={{ opacity: out, scale: String(interpolate(out, [0, 1], [1.12, 1])), fontFamily: FONT }}>
      <div style={{ position: "absolute", top: 290, left: 0, right: 0, textAlign: "center" }}>
        {lines.map((l, i) => {
          const p = spring({ frame: frame - 2 - i * 5, fps, config: { damping: 14, stiffness: 150, mass: 0.8 } });
          const hp = spring({ frame: frame - sec(0.12) - 2, fps, config: { damping: 10, stiffness: 180 } });
          return (
            <div key={i} style={{ overflow: "hidden", height: 150 }}>
              <div style={{ fontSize: 136, fontWeight: 900, lineHeight: 1.1, letterSpacing: -4, color: COLORS.white, translate: `0 ${(1 - p) * 160}px`, textShadow: "0 6px 26px rgba(0,0,0,.5)" }}>
                {l.a}
                {l.b && (
                  <span style={{ color: COLORS.blue, textShadow: `0 0 ${30 + pulse * 30}px ${COLORS.blue}cc`, display: "inline-block", scale: String(interpolate(hp, [0, 1], [1.25, 1])) }}>{l.b}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute", left: 90, right: 90, top: 700, padding: "44px 48px 48px", borderRadius: 40,
          background: "linear-gradient(180deg, rgba(20,34,64,.95), rgba(10,20,42,.95))",
          border: `2px solid ${COLORS.blue}77`, boxShadow: `0 0 80px ${COLORS.blue}33, 0 30px 70px rgba(0,0,0,.5)`,
          opacity: panelIn, scale: String(interpolate(panelIn, [0, 1], [0.85, 1]) * zoom), transformOrigin: "88% 62%",
          translate: `${shake}px ${interpolate(panelIn, [0, 1], [90, 0])}px`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 34 }}>
          <DiskIcon />
          <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.white }}>{HOOK.panelTitle}</div>
          <div style={{ marginLeft: "auto", opacity: chipP, scale: String(interpolate(chipP, [0, 1], [0.5, 1])), padding: "10px 26px", borderRadius: 999, border: `2.5px solid ${COLORS.cyan}`, color: COLORS.cyan, fontWeight: 900, fontSize: 36, letterSpacing: 1, boxShadow: `0 0 ${20 + pulse * 20}px ${COLORS.cyan}66` }}>
            {HOOK.chip}
          </div>
        </div>
        <div style={{ height: 64, borderRadius: 32, background: "#0A1226", border: `2px solid ${COLORS.blue}33`, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, borderRadius: 32, background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.cyan})`, boxShadow: `0 0 36px ${COLORS.cyan}88` }} />
        </div>
        <div style={{ marginTop: 26, display: "flex", justifyContent: "space-between", fontSize: 34, color: COLORS.gray, fontWeight: 600 }}>
          <span>Espacio usado</span>
          <span>{HOOK.disclaimer}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
