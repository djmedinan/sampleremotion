import { AbsoluteFill, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

// A-roll: the horizontal source (image area only, watermark excluded) pre-upscaled to 2356x1920 by scripts/build_raul.py's ffmpeg step.
// Crop-to-fill: the video covers the whole 1080x1920 canvas, and the crop window follows the speaker's face (objectPosition keyframes).
export const ARoll: React.FC<{
  src: string;
  segments: readonly (readonly number[])[]; // source-second ranges kept after the jump cuts
  focus: readonly (readonly number[])[]; // [time, objectPosition x%] keyframes on the cut timeline
}> = ({ src, segments, focus }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const px = interpolate(t, focus.map((f) => f[0]), focus.map((f) => f[1]), {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  let offset = 0;
  return (
    <AbsoluteFill>
      {segments.map(([a, b], i) => {
        const from = Math.round(offset * fps);
        const dur = Math.max(1, Math.round((b - a) * fps));
        offset += b - a;
        return (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <OffthreadVideo
              src={staticFile(src)}
              startFrom={Math.round(a * fps)}
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: `${px}% 50%` }}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
