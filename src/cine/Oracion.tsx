import { AbsoluteFill, Audio, Easing, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedSubtitles } from "../raul/AnimatedSubtitles";
import { CAPTIONS } from "./oracion-caps";

export const ORACION_FPS = 30;
export const ORACION_SECONDS = 95.7;
export const ORACION_DURATION = Math.round(ORACION_SECONDS * ORACION_FPS);

type K = { t: number; s: number; x: number; y: number }; // time (s), scale, pan px (before clamping)

// One photograph, one continuous camera. Each emotional block gets its own move; every keyframe starts where the
// previous one ended so the path never jumps. Strongest push-in is reserved for the climax of faith (~82-87 s).
const PATH: K[] = [
  { t: 0.4, s: 1.15, x: 0, y: 0 },            // hook: fast 100% -> 115% (handled separately), then decelerate
  { t: 2.9, s: 1.18, x: 0, y: -10 },          // opening / date
  { t: 6.0, s: 1.25, x: 0, y: -20 },          // vulnerability: slow zoom in toward the face
  { t: 11.0, s: 1.15, x: 10, y: 20 },         // tired heart: slow zoom out
  { t: 13.5, s: 1.15, x: 30, y: 30 },
  { t: 18.3, s: 1.15, x: -40, y: 30 },        // doubt: minimal horizontal pan
  { t: 23.1, s: 1.16, x: -40, y: 60 },        // closed doors: slow vertical pan down
  { t: 29.3, s: 1.13, x: -10, y: 70 },        // tiredness
  { t: 36.0, s: 1.22, x: 0, y: -60 },         // hope: progressive zoom in, pan up
  { t: 44.9, s: 1.2, x: 40, y: -40 },         // petition: gentle pan right
  { t: 52.3, s: 1.18, x: -30, y: -20 },
  { t: 60.4, s: 1.27, x: 0, y: -30 },         // perseverance: firm zoom in
  { t: 68.7, s: 1.2, x: 20, y: 0 },           // patience: ease back
  { t: 75.6, s: 1.25, x: 0, y: -20 },
  { t: 81.7, s: 1.3, x: 0, y: -40 },
  { t: 87.4, s: 1.36, x: 0, y: -60 },         // climax of faith: strongest push-in
  { t: 91.5, s: 1.22, x: 0, y: -10 },         // closing: calm pull-back
  { t: 95.7, s: 1.12, x: 0, y: 10 },
];

const ease = Easing.inOut(Easing.sin);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export const Oracion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  let s: number, x: number, y: number;
  if (t < PATH[0].t) {
    // speed ramp: fast, decelerating 100% -> 115% in the first 0.4 s
    const p = Easing.out(Easing.cubic)(t / PATH[0].t);
    s = 1 + 0.15 * p; x = 0; y = 0;
  } else {
    let i = 0;
    while (i < PATH.length - 2 && t >= PATH[i + 1].t) i++;
    const a = PATH[i], b = PATH[i + 1];
    const p = ease(clamp((t - a.t) / (b.t - a.t), 0, 1));
    s = a.s + (b.s - a.s) * p; x = a.x + (b.x - a.x) * p; y = a.y + (b.y - a.y) * p;
  }
  // keep the frame covered: transform origin is the face area (50% / 30%)
  x = clamp(x, -(s - 1) * 540, (s - 1) * 540);
  y = clamp(y, -(s - 1) * 1344, (s - 1) * 576);
  const bright = 1 + 0.05 * Math.max(0, 1 - Math.abs(t - 0.2) / 0.5); // tiny lift on the first word
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Audio src={staticFile("voice/oracion_mix.mp3")} />
      <Img
        src={staticFile("oracion/img.jpg")}
        style={{ width: "100%", height: "100%", objectFit: "cover", transformOrigin: "50% 30%", transform: `translate(${x}px, ${y}px) scale(${s})`, filter: `brightness(${bright})` }}
      />
      <AbsoluteFill style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0) 40%)" }} />
      <AnimatedSubtitles groups={CAPTIONS as any} />
    </AbsoluteFill>
  );
};
