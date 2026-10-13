import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CAPTIONS, SEGMENTS, TOTAL_SECONDS } from "./reel-data";

export const REEL_FPS = 30;
export const REEL_DURATION = Math.ceil(TOTAL_SECONDS * REEL_FPS);

const KEN_BURNS_SECONDS = 3;
const SRC = staticFile("lengua_larga.mp4");

// The source is 608x496: show it full-width and fill the rest with a blurred copy.
const Footage: React.FC<{ muted?: boolean }> = ({ muted }) => {
  const { fps } = useVideoConfig();
  let offset = 0;
  return (
    <>
      {SEGMENTS.map(([start, end], i) => {
        const from = Math.round(offset * fps);
        const duration = Math.round((end - start) * fps);
        offset += end - start;
        return (
          <Sequence key={i} from={from} durationInFrames={duration} layout="none">
            <OffthreadVideo
              src={SRC}
              startFrom={Math.round(start * fps)}
              muted={muted}
             
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Sequence>
        );
      })}
    </>
  );
};

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cap = CAPTIONS.find((c) => t >= c.from && t < c.to);
  if (!cap) return null;
  const pop = interpolate(t - cap.from, [0, 0.08], [0.85, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 380 }}
    >
      <div
        style={{
          transform: `scale(${pop})`,
          maxWidth: 960,
          textAlign: "center",
          fontFamily: "Impact, 'Arial Black', Arial, sans-serif",
          fontWeight: 900,
          fontSize: 130,
          lineHeight: 1.05,
          color: "#fff",
          WebkitTextStroke: "14px #000",
          paintOrder: "stroke fill",
          textTransform: "uppercase",
        }}
      >
        {cap.text}
      </div>
    </AbsoluteFill>
  );
};

export const Reel: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const kbStart = durationInFrames - KEN_BURNS_SECONDS * REEL_FPS;
  const p = interpolate(frame, [kbStart, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const scale = 1 + 0.35 * p;
  const tx = -40 * p;
  const ty = -60 * p;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* blurred background fill */}
      <AbsoluteFill style={{ filter: "blur(40px) brightness(0.55)", transform: "scale(1.2)" }}>
        <Footage muted />
      </AbsoluteFill>
      {/* foreground video, full width, with Ken Burns at the end */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            width: 1080,
            height: Math.round((1080 * 496) / 608),
            transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
            transformOrigin: "55% 40%",
            position: "relative",
          }}
        >
          <Footage />
        </div>
      </AbsoluteFill>
      <Captions />
    </AbsoluteFill>
  );
};
