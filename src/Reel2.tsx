import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CAPTIONS, CUTS, SEGMENTS, TOTAL_SECONDS } from "./reel2-data";

export const REEL2_FPS = 30;
export const REEL2_DURATION = Math.ceil(TOTAL_SECONDS * REEL2_FPS);

const SRC = staticFile("no_puedo_up.mp4"); // 2354x1920, pre-upscaled by scripts/upscale.sh
const FOCUS_X = "55.5%"; // puts the speaker's face at the horizontal centre of the 1080px crop
const ZOOM_ORIGIN = "50% 30%"; // face sits in the upper third, clear of the app UI
const YELLOW = "#F6FF00";
const KEN_BURNS_SECONDS = 3;

// Scale schedule: punch-in on second 1, then toggles snapped to jump cuts every ~3.5 s.
const ZOOM_TOGGLES: { at: number; scale: number }[] = [
  { at: 0, scale: 1.15 },
  { at: 1.69, scale: 1.0 },
  { at: 5.65, scale: 1.15 },
  { at: 9.19, scale: 1.0 },
];

const baseScale = (t: number, fps: number): number => {
  let prev = ZOOM_TOGGLES[0].scale;
  for (let i = 0; i < ZOOM_TOGGLES.length; i++) {
    const { at, scale } = ZOOM_TOGGLES[i];
    if (t >= at) {
      const k = (t - at) * fps;
      const from = i === 0 ? 1.0 : prev;
      return interpolate(k, [0, i === 0 ? 5 : 4], [from, scale], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      });
    }
    prev = scale;
  }
  return 1;
};

const Footage: React.FC = () => {
  const { fps } = useVideoConfig();
  let offset = 0;
  return (
    <>
      {SEGMENTS.map(([start, end], i) => {
        const from = Math.round(offset * fps);
        const duration = Math.max(1, Math.round((end - start) * fps));
        offset += end - start;
        return (
          <Sequence key={i} from={from} durationInFrames={duration} layout="none">
            <OffthreadVideo
              src={SRC}
              startFrom={Math.round(start * fps)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: `${FOCUS_X} 50%`,
              }}
            />
          </Sequence>
        );
      })}
    </>
  );
};

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cap = CAPTIONS.find((c) => t >= c.from && t < c.to);
  if (!cap) return null;
  return (
    <AbsoluteFill
      style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 430 }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 28px",
          maxWidth: 980,
          textAlign: "center",
          fontFamily: "Inter, 'Arial Black', Arial, sans-serif",
          fontWeight: 900,
          fontSize: 112,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          WebkitTextStroke: "15px #000",
          paintOrder: "stroke fill",
          strokeLinejoin: "round",
        }}
      >
        {cap.words.map((w, i) => {
          const shown = t >= w.s - 0.01;
          const pop = interpolate(t - w.s, [0, 0.1], [0.8, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <span
              key={i}
              style={{
                visibility: shown ? "visible" : "hidden",
                color: w.key ? YELLOW : "#fff",
                transform: `scale(${pop})`,
                display: "inline-block",
              }}
            >
              {w.t}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// High-contrast pulse + bouncing arrow aimed at the like/share rail on the right of the app UI.
const CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const start = durationInFrames - KEN_BURNS_SECONDS * fps;
  if (frame < start) return null;
  const k = frame - start;
  const appear = interpolate(k, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const pulse = (k % 24) / 24;
  const bounce = Math.sin((k / fps) * Math.PI * 4) * 22;
  const tx = 930;
  const ty = 1180;
  return (
    <AbsoluteFill style={{ opacity: appear }}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        {[0, 0.5].map((d) => {
          const p = (pulse + d) % 1;
          return (
            <circle
              key={d}
              cx={tx}
              cy={ty}
              r={60 + p * 110}
              fill="none"
              stroke={YELLOW}
              strokeWidth={14 * (1 - p) + 2}
              opacity={1 - p}
            />
          );
        })}
        <circle cx={tx} cy={ty} r={52} fill={YELLOW} stroke="#000" strokeWidth={10} />
        <g transform={`translate(${bounce}, 0)`}>
          <path
            d={`M ${tx - 300} ${ty - 40} H ${tx - 160} V ${ty - 90} L ${tx - 80} ${ty} L ${tx - 160} ${ty + 90} V ${ty + 40} H ${tx - 300} Z`}
            fill={YELLOW}
            stroke="#000"
            strokeWidth={14}
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const Reel2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const kbStart = durationInFrames - KEN_BURNS_SECONDS * fps;
  const kb = interpolate(frame, [kbStart, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });
  const scale = frame < kbStart ? baseScale(t, fps) : 1 + 0.3 * kb;
  // cut markers (CUTS) are used by the scale schedule above; keep referenced for easy tuning
  void CUTS;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: ZOOM_ORIGIN }}>
        <Footage />
      </AbsoluteFill>
      <Captions />
      <CallToAction />
    </AbsoluteFill>
  );
};
