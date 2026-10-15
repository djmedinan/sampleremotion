import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const NEON = "#FFFF00";

// High-contrast pulse + bouncing arrow aimed at the like / save / follow rail on the right of the app UI.
export const CtaArrow: React.FC<{ from: number; x?: number; y?: number }> = ({ from, x = 930, y = 1180 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = Math.round(from * fps);
  if (frame < start) return null;
  const k = frame - start;
  const appear = interpolate(k, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const pulse = (k % 24) / 24;
  const bounce = Math.sin((k / fps) * Math.PI * 4) * 22;
  return (
    <AbsoluteFill style={{ opacity: appear }}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        {[0, 0.5].map((d) => {
          const p = (pulse + d) % 1;
          return <circle key={d} cx={x} cy={y} r={60 + p * 110} fill="none" stroke={NEON} strokeWidth={14 * (1 - p) + 2} opacity={1 - p} />;
        })}
        <circle cx={x} cy={y} r={52} fill={NEON} stroke="#000" strokeWidth={10} />
        <g transform={`translate(${bounce}, 0)`}>
          <path
            d={`M ${x - 300} ${y - 40} H ${x - 160} V ${y - 90} L ${x - 80} ${y} L ${x - 160} ${y + 90} V ${y + 40} H ${x - 300} Z`}
            fill={NEON}
            stroke="#000"
            strokeWidth={14}
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
