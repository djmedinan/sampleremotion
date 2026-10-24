import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { SubtitleGroup } from "../raul/AnimatedSubtitles";

// Soft, warm caption style: white ExtraBold sans-serif (Montserrat when available, Inter otherwise), dark outline,
// only the most emotional words in soft gold (#D9A441). Natural blocks of 3-5 words (max two lines) fade in gently
// as they are spoken; no bounce.
const WHITE = "#FFFFFF";
const OUTLINE = "#15100A";
const GOLD = "#D9A441";

export const GoldSubtitles: React.FC<{ groups: readonly SubtitleGroup[]; bottom?: number; fontSize?: number }> = ({
  groups,
  bottom = 440,
  fontSize = 84,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const g = groups.find((x) => t >= x.from && t < x.to);
  if (!g) return null;
  const k = interpolate(t - g.from, [0, 0.18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: bottom }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 22px",
          maxWidth: 940,
          textAlign: "center",
          fontFamily: "Montserrat, Inter, 'Liberation Sans', Arial, sans-serif",
          fontWeight: 800,
          fontSize,
          lineHeight: 1.14,
          letterSpacing: "-0.01em",
          WebkitTextStroke: `${Math.round(fontSize * 0.11)}px ${OUTLINE}`,
          paintOrder: "stroke fill",
          strokeLinejoin: "round",
          opacity: k,
          transform: `translateY(${(1 - k) * 14}px)`,
        }}
      >
        {g.words.map((w, i) => (
          <span key={i} style={{ visibility: t >= w.s - 0.01 ? "visible" : "hidden", color: w.key ? GOLD : WHITE, display: "inline-block" }}>
            {w.t}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
