import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { baseScale, Captions } from "./ReelTemplate";
import * as data from "./reel5-data";

export const REEL5_FPS = 30;
export const REEL5_DURATION = 16 * REEL5_FPS; // voice is 15.7 s

// Pixabay stock clips (free for commercial use, no attribution required). Cuts follow the narration.
const CLIPS = [
  { id: "160975", from: 0, to: 3.14 }, // "Hoy no tienes ganas. Está bien."
  { id: "217105", from: 3.14, to: 5.04 }, // "Pero las ganas no construyen nada"
  { id: "202753", from: 5.04, to: 6.94 }, // "volver a intentarlo, sí"
  { id: "378252", from: 6.94, to: 9.1 }, // "Nadie ve los días en que casi te rindes"
  { id: "358452", from: 9.1, to: 11.08 }, // "pero esos días te cambian"
  { id: "236633", from: 11.08, to: 14.14 }, // "Un paso más. Solo uno."
  { id: "153821", from: 14.14, to: 16 }, // "Mañana te lo vas a agradecer."
];
// Punch-in at the start, then 100% / 115% toggles on the cuts (~3-4 s apart).
const TOGGLES = [
  { at: 0, scale: 1.15 },
  { at: 3.14, scale: 1.0 },
  { at: 6.94, scale: 1.15 },
  { at: 11.08, scale: 1.0 },
];

export const Reel5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = baseScale(frame / fps, fps, TOGGLES);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Audio src={staticFile("voice/no_te_rindas.mp3")} />
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 40%" }}>
        {CLIPS.map((c) => (
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
