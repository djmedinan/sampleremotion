import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { AnimatedSubtitles } from "../raul/AnimatedSubtitles";
import { CAPTIONS } from "./salmo-caps";
import { SHOTS, TOTAL_SECONDS } from "./salmo-shots";
import { Shot, ShotView } from "./PhotoShot";

export const SALMO_FPS = 30;
export const SALMO_DURATION = Math.round(TOTAL_SECONDS * SALMO_FPS);

const shots = SHOTS as unknown as readonly Shot[];

const FadeIn: React.FC<{ frames: number; children: React.ReactNode }> = ({ frames, children }) => {
  const f = useCurrentFrame();
  const o = frames > 0 ? interpolate(f, [0, frames], [0, 1], { extrapolateRight: "clamp" }) : 1;
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

// Fixed title block in the upper third (below the Reels / TikTok / Shorts top safe area), present for the whole video.
const Title: React.FC = () => (
  <AbsoluteFill style={{ alignItems: "center", paddingTop: 300, pointerEvents: "none" }}>
    <div
      style={{
        fontFamily: "Inter, 'Arial Black', Arial, sans-serif",
        fontWeight: 900,
        fontSize: 138,
        letterSpacing: "0.02em",
        color: "#FFFFFF",
        WebkitTextStroke: "18px #000000",
        paintOrder: "stroke fill",
        strokeLinejoin: "round",
        lineHeight: 1,
        textAlign: "center",
      }}
    >
      SALMO 91
    </div>
    <div
      style={{
        marginTop: 26,
        maxWidth: 920,
        fontFamily: "Georgia, 'Liberation Serif', 'DejaVu Serif', serif",
        fontStyle: "italic",
        fontWeight: 700,
        fontSize: 62,
        lineHeight: 1.18,
        color: "#FFFFFF",
        WebkitTextStroke: "11px #000000",
        paintOrder: "stroke fill",
        strokeLinejoin: "round",
        textAlign: "center",
      }}
    >
      Protección divina en tiempos de prueba.
    </div>
  </AbsoluteFill>
);

// Birds-in-the-forest piece: animated stills (~70%) cut with short video shots, natural light only (no particles),
// word-by-word captions in the lower third and a fixed title in the upper third.
export const Salmo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Audio src={staticFile("voice/salmo_mix.mp3")} />
    {shots.map((s, i) => {
      const fps = SALMO_FPS;
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
    <AbsoluteFill style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.38), rgba(0,0,0,0) 34%), linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0) 40%)" }} />
    <Title />
    <AnimatedSubtitles groups={CAPTIONS as any} />
  </AbsoluteFill>
);
