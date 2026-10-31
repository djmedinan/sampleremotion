import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTIONS } from "./inimes-caps";
import { SHOTS, TOTAL_SECONDS } from "./inimes-shots";
import { GoldSubtitles } from "./GoldSubtitles";
import { Shot, ShotView } from "./PhotoShot";

export const INIMES_FPS = 30;
export const INIMES_DURATION = Math.round(TOTAL_SECONDS * INIMES_FPS);

const shots = SHOTS as unknown as readonly Shot[];

const FadeIn: React.FC<{ frames: number; children: React.ReactNode }> = ({ frames, children }) => {
  const f = useCurrentFrame();
  const o = frames > 0 ? interpolate(f, [0, frames], [0, 1], { extrapolateRight: "clamp" }) : 1;
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

// Human, warm, natural piece: real photographs with gentle camera moves, a couple of short video shots, soft gold captions.
// No particles, no speed ramp, no decorative effects.
export const Inimes: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Audio src={staticFile("voice/inimes_mix.mp3")} />
      {shots.map((s, i) => {
        const fade = i === 0 ? 0 : Math.round((s.fade ?? 0) * fps);
        const dur = Math.round((s.to - s.from) * fps) + (i < shots.length - 1 ? Math.round((shots[i + 1].fade ?? 0) * fps) : 0);
        return (
          <Sequence key={`${s.id}-${s.from}`} from={Math.round(s.from * fps)} durationInFrames={Math.max(1, dur)}>
            <FadeIn frames={fade}>
              <ShotView shot={{ ...s, to: s.to, fade: s.fade }} />
            </FadeIn>
          </Sequence>
        );
      })}
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(0,0,0,0.42), rgba(0,0,0,0) 42%)" }} />
      <GoldSubtitles groups={CAPTIONS as any} />
    </AbsoluteFill>
  );
};
