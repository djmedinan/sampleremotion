import { AbsoluteFill, Audio, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { baseScale } from "../ReelTemplate";
import { AnimatedSubtitles } from "./AnimatedSubtitles";
import { ARoll } from "./ARoll";
import { BRoll } from "./BRoll";
import { CtaArrow } from "./CtaArrow";
import { AROLL_FOCUS, CAPTIONS, SCENES, SEGMENTS, TOGGLES, TOTAL_SECONDS } from "./raul-data";

export const RAUL_FPS = 30;
export const RAUL_DURATION = Math.ceil(TOTAL_SECONDS * RAUL_FPS);

const KEN_BURNS_SECONDS = 3;
const CTA_AT = 81.0; // seconds on the cut timeline: "guárdalo y sígueme" (from the transcript)

// Timeline: A-roll (Raúl, full-screen crop) underneath; B-roll shots cut in over it on the narration; subtitles always on top.
// Audio is one pre-mixed track: Raúl's voice cut at the same points as the picture + soft instrumental + discreet whooshes.
export const RaulReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const kbStart = durationInFrames - KEN_BURNS_SECONDS * fps;
  const kb = interpolate(frame, [kbStart, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });
  const scale = frame < kbStart ? baseScale(t, fps, TOGGLES as any, 6) : 1 + 0.3 * kb;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Audio src={staticFile("raul/raul_mix.mp3")} />
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 30%" }}>
        <ARoll src="raul/aroll_up.mp4" segments={SEGMENTS} focus={AROLL_FOCUS} />
      </AbsoluteFill>
      <BRoll scenes={SCENES as any} />
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 40%)" }} />
      <AnimatedSubtitles groups={CAPTIONS as any} />
      <CtaArrow from={CTA_AT} />
    </AbsoluteFill>
  );
};
