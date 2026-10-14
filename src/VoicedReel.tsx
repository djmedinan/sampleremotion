import { AbsoluteFill, Audio, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { baseScale, Captions, ReelData } from "./ReelTemplate";

export type Motion = "zoomIn" | "panLeft" | "panRight" | "still";
export type Clip = { id: string; from: number; to: number; motion?: Motion }; // public/clips/<id>.mp4, seconds on the timeline
export type VoicedReelProps = {
  data: ReelData;
  audio: string; // file in public/
  clips: Clip[];
  toggles: { at: number; scale: number }[];
  clipsDir?: string; // folder inside public/, default "clips"
  fade?: number; // seconds of soft cross-dissolve into each clip (0 = hard cuts)
  zoomEase?: number; // frames the 100%/115% toggles take (default 4 = snappy; 15 = calm)
};

// Slow camera move over the life of one clip. Pans run at a small base zoom so the edges never show.
const Move: React.FC<{ motion: Motion; frames: number; children: React.ReactNode }> = ({ motion, frames, children }) => {
  const f = useCurrentFrame();
  const p = Math.min(1, f / Math.max(1, frames));
  let t = "none";
  if (motion === "zoomIn") t = `scale(${1 + 0.07 * p})`;
  if (motion === "panLeft") t = `scale(1.06) translateX(${22 - 44 * p}px)`;
  if (motion === "panRight") t = `scale(1.06) translateX(${-22 + 44 * p}px)`;
  return <AbsoluteFill style={{ transform: t }}>{children}</AbsoluteFill>;
};

const FadeIn: React.FC<{ frames: number; children: React.ReactNode }> = ({ frames, children }) => {
  const f = useCurrentFrame();
  const opacity = frames > 0 ? interpolate(f, [0, frames], [0, 1], { extrapolateRight: "clamp" }) : 1;
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const VoicedReel: React.FC<VoicedReelProps> = ({ data, audio, clips, toggles, clipsDir = "clips", fade = 0, zoomEase = 4 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = baseScale(frame / fps, fps, toggles, zoomEase);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Audio src={staticFile(audio)} />
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 40%" }}>
        {clips.map((c, i) => (
          // each clip dissolves in over the previous one, which keeps playing underneath for the fade
          <Sequence key={c.id} from={Math.round(c.from * fps)} durationInFrames={Math.round((c.to - c.from + fade) * fps)} layout="none">
            <FadeIn frames={i === 0 ? 0 : Math.round(fade * fps)}>
              <Move motion={c.motion ?? "still"} frames={Math.round((c.to - c.from + fade) * fps)}>
                <OffthreadVideo src={staticFile(`${clipsDir}/${c.id}.mp4`)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Move>
            </FadeIn>
          </Sequence>
        ))}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0) 45%)" }} />
      <Captions data={data} />
    </AbsoluteFill>
  );
};
