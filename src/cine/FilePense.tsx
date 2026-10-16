import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedSubtitles } from "../raul/AnimatedSubtitles";
import { CAPTIONS } from "./filepense-caps";
import { SHOTS, TOTAL_SECONDS } from "./filepense-shots";
import { DustParticles } from "./DustParticles";
import { LightLayers } from "./LightLayers";
import { Shot, ShotView } from "./PhotoShot";

export const FILEPENSE_FPS = 30;
export const FILEPENSE_DURATION = Math.round(TOTAL_SECONDS * FILEPENSE_FPS);

const shots = SHOTS as unknown as readonly (Shot & { dust: number; rays: number })[];

const FadeIn: React.FC<{ frames: number; children: React.ReactNode }> = ({ frames, children }) => {
  const f = useCurrentFrame();
  const o = frames > 0 ? interpolate(f, [0, frames], [0, 1], { extrapolateRight: "clamp" }) : 1;
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

// Dust visibility follows the scene (softer over faces and dark shots), eased across each cut.
const dustAt = (t: number) => {
  const times: number[] = [];
  const vals: number[] = [];
  shots.forEach((s) => { times.push(s.from + 0.35, s.to - 0.35); vals.push(s.dust, s.dust); });
  return interpolate(t, times, vals, { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
};

// Photo-led cinematic piece: animated stills (~75%) cut with short video shots, warm light, dust motes and word-by-word captions.
export const FilePense: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cur = shots.find((s) => t >= s.from && t < s.to) ?? shots[shots.length - 1];
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Audio src={staticFile("voice/filepense_mix.mp3")} />
      {shots.map((s, i) => {
        const fade = i === 0 ? 0 : Math.round((s.fade ?? 0) * fps);
        const dur = Math.round((s.to - s.from) * fps) + (i < shots.length - 1 ? Math.round((shots[i + 1].fade ?? 0) * fps) : 0);
        return (
          <Sequence key={`${s.id}-${s.from}`} from={Math.round(s.from * fps)} durationInFrames={Math.max(1, dur)}>
            <FadeIn frames={fade}>
              <ShotView shot={{ ...s, to: s.to, fade: s.fade }} hook={i === 0} />
            </FadeIn>
          </Sequence>
        );
      })}
      <LightLayers rays={cur.rays} />
      <DustParticles intensity={dustAt} />
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(0,0,0,0.42), rgba(0,0,0,0) 42%)" }} />
      <AnimatedSubtitles groups={CAPTIONS as any} />
    </AbsoluteFill>
  );
};
