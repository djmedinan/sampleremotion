import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { baseScale, Captions, ReelData } from "./ReelTemplate";

export type Clip = { id: string; from: number; to: number }; // public/clips/<id>.mp4, seconds on the timeline
export type VoicedReelProps = {
  data: ReelData;
  audio: string; // file in public/
  clips: Clip[];
  toggles: { at: number; scale: number }[];
};

export const VoicedReel: React.FC<VoicedReelProps> = ({ data, audio, clips, toggles }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = baseScale(frame / fps, fps, toggles);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Audio src={staticFile(audio)} />
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 40%" }}>
        {clips.map((c) => (
          <Sequence key={c.id} from={Math.round(c.from * fps)} durationInFrames={Math.round((c.to - c.from) * fps)} layout="none">
            <OffthreadVideo src={staticFile(`clips/${c.id}.mp4`)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
        ))}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0) 45%)" }} />
      <Captions data={data} />
    </AbsoluteFill>
  );
};
