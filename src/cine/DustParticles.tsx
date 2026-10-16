import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

// Tiny dust motes lit by warm natural light: three depth layers (size / speed / blur / opacity), slow organic drift.
// Deterministic pseudo-random positions so renders are reproducible. `intensity` (0..1) can change per scene.
const rand = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

type Mote = { x: number; y: number; r: number; depth: number; ph: number; sp: number; op: number };
const MOTES: Mote[] = Array.from({ length: 64 }, (_, i) => {
  const depth = i % 3; // 0 far, 1 mid, 2 near
  return {
    x: rand(i + 1) * 1080,
    y: rand(i + 101) * 1920,
    r: [1.8, 3.1, 5.0][depth] * (0.7 + rand(i + 7) * 0.7),
    depth,
    ph: rand(i + 301) * Math.PI * 2,
    sp: [0.5, 0.8, 1.2][depth] * (0.6 + rand(i + 17) * 0.8),
    op: [0.3, 0.46, 0.68][depth] * (0.6 + rand(i + 29) * 0.6),
  };
});

export const DustParticles: React.FC<{ intensity: (t: number) => number }> = ({ intensity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const k = intensity(t);
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        // fade out toward the caption zone and the very top so faces and subtitles stay clean
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, #000 22%, #000 55%, rgba(0,0,0,0.25) 72%, rgba(0,0,0,0.12) 100%)",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, #000 22%, #000 55%, rgba(0,0,0,0.25) 72%, rgba(0,0,0,0.12) 100%)",
      }}
    >
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ mixBlendMode: "screen" }}>
        <defs>
          {[0, 1, 2].map((d) => (
            <filter key={d} id={`dust-blur-${d}`} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation={[1.4, 0.9, 0.5][d]} />
            </filter>
          ))}
        </defs>
        {MOTES.map((m, i) => {
          const rise = (t * 9 * m.sp * (1 + m.depth * 0.6)) % 2100;
          const y = (((m.y - rise) % 2100) + 2100) % 2100 - 90;
          const x = m.x + Math.sin(t * 0.45 * m.sp + m.ph) * (14 + m.depth * 10) + Math.sin(t * 0.17 + m.ph * 2) * 8;
          const twinkle = 0.65 + 0.35 * Math.sin(t * (0.8 + m.sp) + m.ph);
          const o = m.op * twinkle * k;
          return <circle key={i} cx={x} cy={y} r={m.r} fill="#FFE9C2" opacity={o} filter={`url(#dust-blur-${m.depth})`} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};
