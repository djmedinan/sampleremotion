import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export type SubtitleWord = { t: string; s: number; e: number; key: boolean; end?: boolean };
export type SubtitleGroup = { words: readonly SubtitleWord[]; from: number; to: number };

// Fixed house style: white #FFFFFF, thick black #000000 stroke, neon-yellow #FFFF00 key words,
// extra-bold sans-serif, centred in the lower third, 2-3 words at a time, each word pops in as it is spoken.
const WHITE = "#FFFFFF";
const BLACK = "#000000";
const NEON = "#FFFF00";

export const AnimatedSubtitles: React.FC<{
  groups: readonly SubtitleGroup[];
  bottom?: number; // px from the bottom edge (keeps captions above the app UI)
  fontSize?: number;
}> = ({ groups, bottom = 430, fontSize = 112 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const g = groups.find((x) => t >= x.from && t < x.to);
  if (!g) return null;
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: bottom }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 28px",
          maxWidth: 980,
          textAlign: "center",
          fontFamily: "Inter, 'Arial Black', Arial, sans-serif",
          fontWeight: 900,
          fontSize,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          WebkitTextStroke: `${Math.round(fontSize * 0.134)}px ${BLACK}`,
          paintOrder: "stroke fill",
          strokeLinejoin: "round",
        }}
      >
        {g.words.map((w, i) => {
          const shown = t >= w.s - 0.01;
          // quick scale-in; key words overshoot a little more for emphasis
          const pop = interpolate(t - w.s, [0, 0.07, 0.14], [0.78, w.key ? 1.12 : 1.04, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <span
              key={i}
              style={{
                visibility: shown ? "visible" : "hidden",
                color: w.key ? NEON : WHITE,
                transform: `scale(${pop})`,
                display: "inline-block",
              }}
            >
              {w.t}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
