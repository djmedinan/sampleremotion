import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

// Warm sun-ray wash that drifts at its own speed (gives the stills depth against the photo's own camera move),
// plus a light haze at the bottom and a soft vignette. Everything stays low-opacity.
export const LightLayers: React.FC<{ rays: number }> = ({ rays }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const drift = Math.sin(t * 0.18) * 60;
  return (
    <>
      <AbsoluteFill
        style={{
          mixBlendMode: "screen",
          opacity: 0.16 * rays,
          background: "linear-gradient(115deg, rgba(255,226,170,0) 20%, rgba(255,226,170,0.9) 38%, rgba(255,226,170,0) 52%, rgba(255,226,170,0.6) 66%, rgba(255,226,170,0) 80%)",
          transform: `translateX(${drift}px) scale(1.3)`,
        }}
      />
      <AbsoluteFill style={{ opacity: 0.1 * rays, background: "linear-gradient(to top, rgba(255,244,225,0.9), rgba(255,244,225,0) 38%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.38) 100%)" }} />
    </>
  );
};
