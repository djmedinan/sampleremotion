import { AbsoluteFill, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, easeIn, easeInOut, ramp } from "./theme";

/**
 * BLOQUE 1 · 0–4 s · CAOS.
 * Fragmentos del supermercado seleccionados SIN personas (ver docs/templario-reel.md):
 *  - super_a: góndola "VINOS" (src 10.5 s)   - super_b: estantería en desplazamiento (src 22.4 s)
 *  - super_c: botellas rojas muy cercanas (src 33.5 s)
 * Los clips ya vienen recortados 1080×1480 (se elimina el texto rojo quemado de arriba).
 */
const CUTS = [
  { src: "templario/video/super_a.mp4", from: 0, dur: 44, rate: 1.1, z0: 1.05, z1: 1.15, x0: -50, x1: 50 },
  { src: "templario/video/super_b.mp4", from: 44, dur: 40, rate: 1.1, z0: 1.15, z1: 1.05, x0: 70, x1: -50 },
  { src: "templario/video/super_c.mp4", from: 84, dur: 42, rate: 1.08, z0: 1.05, z1: 1.16, x0: -30, x1: 40 },
];
const COVER = 1920 / 1480; // el clip 1080×1480 cubre el alto del lienzo

const Cut: React.FC<(typeof CUTS)[number]> = ({ src, dur, rate, z0, z1, x0, x1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = ramp(frame, 0, dur, 0, 1, (t) => t); // zoom lineal "handheld"; el punch lo da el spring
  const punch = spring({ frame, fps, config: { damping: 11, stiffness: 190, mass: 0.6 }, durationInFrames: 14 });
  const zoom = (z0 + (z1 - z0) * p) * (1 + 0.1 * (1 - punch));
  const tx = x0 + (x1 - x0) * ramp(frame, 0, dur, 0, 1, easeInOut);
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: C.black }}>
      <OffthreadVideo
        src={staticFile(src)}
        playbackRate={rate}
        style={{
          position: "absolute",
          left: (1080 - 1080 * COVER) / 2,
          top: 0,
          width: 1080 * COVER,
          height: 1920,
          transform: `translateX(${tx}px) scale(${zoom})`,
          transformOrigin: "50% 50%",
        }}
      />
    </AbsoluteFill>
  );
};

const HookTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const IN = spring({ frame, fps, config: { damping: 12, stiffness: 160, mass: 0.7 }, durationInFrames: 16 });
  const bar = spring({ frame: frame - 12, fps, config: { damping: 16, stiffness: 140 }, durationInFrames: 18 });
  const out = ramp(frame, 66, 76, 1, 0, easeIn);
  const lift = ramp(frame, 66, 76, 0, -30, easeIn);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 360,
        textAlign: "center",
        opacity: Math.min(1, IN * 1.4) * out,
        transform: `translateY(${lift + (1 - IN) * 40}px) scale(${0.86 + 0.14 * IN})`,
        fontFamily: FONT.display,
        textTransform: "uppercase",
        lineHeight: 1.02,
      }}
    >
      <div style={{ fontSize: 150, color: C.cream, textShadow: "0 6px 0 rgba(0,0,0,.55), 0 0 40px rgba(0,0,0,.6)" }}>
        ¿NO SABES
      </div>
      <div style={{ position: "relative", display: "inline-block", marginTop: 6 }}>
        <div
          style={{
            position: "absolute",
            inset: "6px -26px 0 -26px",
            background: `linear-gradient(100deg, ${C.burgundy}, ${C.burgundyDeep})`,
            border: `4px solid ${C.gold}`,
            transformOrigin: "0 50%",
            transform: `scaleX(${bar})`,
            boxShadow: "0 12px 40px rgba(0,0,0,.55)",
          }}
        />
        <div style={{ position: "relative", fontSize: 150, color: C.gold, textShadow: "0 5px 0 rgba(0,0,0,.5)" }}>
          CUÁL ELEGIR?
        </div>
      </div>
    </div>
  );
};

export const SupermarketScene: React.FC = () => {
  const frame = useCurrentFrame();
  // whip de salida (3.83 s → 4.17 s): desplazamiento + desenfoque de movimiento
  const w = ramp(frame, 112, 125, 0, 1, easeIn);
  return (
    <AbsoluteFill style={{ backgroundColor: C.black }}>
      <AbsoluteFill
        style={{
          transform: `translateX(${-420 * w}px) scale(${1 + 0.22 * w})`,
          filter: `blur(${28 * w}px) saturate(${1 + 0.2 * w})`,
        }}
      >
        {CUTS.map((c, i) => (
          <Sequence key={i} from={c.from} durationInFrames={c.dur + (i === CUTS.length - 1 ? 8 : 0)} layout="none">
            <Cut {...c} />
          </Sequence>
        ))}
        {/* grade cálido + viñeta para unificar con el universo Temple */}
        <AbsoluteFill style={{ background: "rgba(40,8,18,.22)", mixBlendMode: "multiply" }} />
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,.6) 100%), linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,0) 30%)",
          }}
        />
        <HookTitle />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
