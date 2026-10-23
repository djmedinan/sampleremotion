import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedSubtitles } from "../raul/AnimatedSubtitles";
import { CAPTIONS } from "./intento-caps";
import { SHOTS, TOTAL_SECONDS } from "./intento-shots";
import { Shot, ShotView } from "./PhotoShot";

export const INTENTO_FPS = 30;
export const INTENTO_DURATION = Math.round(TOTAL_SECONDS * INTENTO_FPS);

const shots = SHOTS as unknown as readonly (Shot & { dust: number; rays: number })[];

const FadeIn: React.FC<{ frames: number; children: React.ReactNode }> = ({ frames, children }) => {
  const f = useCurrentFrame();
  const o = frames > 0 ? interpolate(f, [0, frames], [0, 1], { extrapolateRight: "clamp" }) : 1;
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

// Photo-led cinematic piece: animated stills (~75%) cut with short video shots, natural light only (no particles) and word-by-word captions.
export const Intento: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Audio src={staticFile("voice/intento_mix.mp3")} />
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
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(0,0,0,0.42), rgba(0,0,0,0) 42%)" }} />
      <AnimatedSubtitles groups={CAPTIONS as any} />
    </AbsoluteFill>
  );
};
