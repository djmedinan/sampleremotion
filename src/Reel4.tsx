import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { baseScale, Captions } from "./ReelTemplate";
import * as data from "./reel4-data";

export const REEL4_FPS = 30;
export const REEL4_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL4_FPS);

// Pixabay stock clips (free for commercial use, no attribution required), one per beat of the script.
const CLIPS = [
  { id: "160975", from: 0, to: 3 }, // "Hoy no tienes ganas" - man alone in fog
  { id: "217105", from: 3, to: 5 }, // "todo te dice que pares" - rain on the window
  { id: "202753", from: 5, to: 7 }, // "volver a intentarlo" - walking toward sunrise
  { id: "378252", from: 7, to: 9 }, // "nadie ve los días" - struggling up the snow
  { id: "358452", from: 9, to: 11 }, // "te cambian" - mountaineer
  { id: "236633", from: 11, to: 12.8 }, // "un paso más" - climbing steps
  { id: "153821", from: 12.8, to: 15 }, // "mañana te vas a agradecer" - sunrise summit
];
// Punch-in on second 1, then 100% / 115% toggles on the clip cuts.
const TOGGLES = [
  { at: 0, scale: 1.15 },
  { at: 3, scale: 1.0 },
  { at: 7, scale: 1.15 },
  { at: 11, scale: 1.0 },
];

export const Reel4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = baseScale(frame / fps, fps, TOGGLES);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 40%" }}>
        {CLIPS.map((c) => (
          <Sequence key={c.id} from={Math.round(c.from * fps)} durationInFrames={Math.round((c.to - c.from) * fps)} layout="none">
            <OffthreadVideo src={staticFile(`clips/${c.id}.mp4`)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
        ))}
      </AbsoluteFill>
      {/* soft shade so white captions stay readable on bright skies */}
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0) 45%)" }} />
      <Captions data={data} />
    </AbsoluteFill>
  );
};
