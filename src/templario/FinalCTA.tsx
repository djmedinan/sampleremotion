import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, easeIn, ramp } from "./theme";

/**
 * CTA final. scene-local 0 = 12.65 s globales.
 *  0–24 f   · PACK LEGADO TEMPLARIO + eltemple.cl   ("Está disponible en…")
 *  24–70 f  · DESCUBRE LOS 6 🍷 + eltemple.cl con subrayado animado (últimos ~1,5 s)
 * No hay botones falsos: sólo texto y subrayado.
 */
const SWAP = 24;

const Glass: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 64 80" style={{ verticalAlign: "-0.1em", marginLeft: 16 }}>
    <defs>
      <linearGradient id="wine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#B21E45" />
        <stop offset="1" stopColor="#4B0A1D" />
      </linearGradient>
    </defs>
    <path d="M12 6h40c1 18-3 33-20 35C15 39 11 24 12 6z" fill="rgba(246,236,212,.16)" stroke={C.cream} strokeWidth="3" strokeLinejoin="round" />
    <path d="M14 22h36c-1 12-6 18-18 19C20 40 15 33 14 22z" fill="url(#wine)" />
    <path d="M32 41v28M20 73c4-4 20-4 24 0" stroke={C.cream} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M18 10c-1 7 0 12 2 16" stroke="rgba(255,255,255,.55)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

export const FinalCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inA = spring({ frame, fps, config: { damping: 14, stiffness: 170, mass: 0.7 }, durationInFrames: 16 });
  const outA = ramp(frame, SWAP - 6, SWAP, 1, 0, easeIn);
  const inB = spring({ frame: frame - SWAP, fps, config: { damping: 11, stiffness: 190, mass: 0.7 }, durationInFrames: 18 });
  const urlIn = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 150 }, durationInFrames: 18 });
  const underline = spring({ frame: frame - SWAP - 6, fps, config: { damping: 18, stiffness: 120 }, durationInFrames: 22 });
  const pulse = 1 + 0.025 * Math.sin(Math.max(0, frame - SWAP - 20) / 5) * ramp(frame, SWAP + 20, SWAP + 30, 0, 1);
  const shadow: React.CSSProperties = {
    WebkitTextStroke: "8px rgba(8,4,6,.85)",
    paintOrder: "stroke fill",
    textShadow: "0 8px 26px rgba(0,0,0,.6)",
  };
  return (
    <AbsoluteFill>
      {/* base oscura suave tras el texto para máxima legibilidad */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 1300,
          height: 330,
          background: "linear-gradient(180deg, rgba(8,4,6,0) 0%, rgba(8,4,6,.62) 38%, rgba(8,4,6,.62) 72%, rgba(8,4,6,0) 100%)",
          opacity: Math.min(1, inA * 1.5),
        }}
      />
      <div style={{ position: "absolute", left: 130, width: 820, top: 1368, textAlign: "center", transform: `scale(${pulse})` }}>
        <div style={{ position: "relative", height: 124 }}>
          {/* A · PACK LEGADO TEMPLARIO */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: Math.min(1, inA * 1.6) * outA,
              transform: `translateY(${(1 - inA) * 30 - (1 - outA) * 22}px)`,
              fontFamily: FONT.display,
              fontSize: 82,
              color: C.cream,
              letterSpacing: 1,
              whiteSpace: "nowrap",
              ...shadow,
            }}
          >
            PACK LEGADO <span style={{ color: C.gold }}>TEMPLARIO</span>
          </div>
          {/* B · DESCUBRE LOS 6 🍷 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: Math.min(1, inB * 2),
              transform: `translateY(${(1 - inB) * 34}px) scale(${1.18 - 0.18 * inB})`,
              fontFamily: FONT.display,
              fontSize: 112,
              color: C.cream,
              whiteSpace: "nowrap",
              ...shadow,
            }}
          >
            DESCUBRE LOS <span style={{ color: C.gold }}>6</span>
            <Glass size={86} />
          </div>
        </div>
        {/* eltemple.cl (constante en ambas fases) */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginTop: 10,
            opacity: Math.min(1, urlIn * 2),
            transform: `translateY(${(1 - urlIn) * 22}px)`,
          }}
        >
          <div
            style={{
              fontFamily: FONT.sans,
              fontWeight: 800,
              fontSize: 74,
              color: C.gold,
              letterSpacing: 1,
              ...shadow,
            }}
          >
            eltemple.cl
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -6,
              height: 7,
              borderRadius: 4,
              background: `linear-gradient(90deg, ${C.goldSoft}, ${C.gold}, ${C.cream})`,
              transformOrigin: "0 50%",
              transform: `scaleX(${underline})`,
              boxShadow: "0 0 18px rgba(226,183,90,.55)",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
