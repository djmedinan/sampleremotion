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
export type Word = { t: string; s: number; e: number; key: boolean; end: boolean };
export type Caption = { words: readonly Word[]; from: number; to: number };
export type ReelData = {
  SEGMENTS: readonly (readonly number[])[];
  CAPTIONS: readonly Caption[];
  TOTAL_SECONDS: number;
};
export type ReelProps = {
  src: string; // file in public/, pre-upscaled to 1920px tall by scripts/upscale.sh
  focusX: string; // objectPosition x that centres the speaker's face in the 1080px crop
  zoomOrigin: string; // transform-origin, on the face (upper third, clear of the app UI)
  toggles: { at: number; scale: number }[]; // 115% / 100% schedule, snapped to jump cuts
};

const YELLOW = "#F6FF00";
const KEN_BURNS_SECONDS = 3;

export const baseScale = (t: number, fps: number, ZOOM_TOGGLES: ReelProps["toggles"]): number => {
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

const Footage: React.FC<{ data: ReelData; src: string; focusX: string }> = ({ data, src, focusX }) => {
  const { SEGMENTS } = data;
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
              src={staticFile(src)}
              startFrom={Math.round(start * fps)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: `${focusX} 50%`,
              }}
            />
          </Sequence>
        );
      })}
    </>
  );
};

export const Captions: React.FC<{ data: ReelData }> = ({ data }) => {
  const { CAPTIONS } = data;
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

export const ReelTemplate: React.FC<{ data: ReelData } & ReelProps> = ({ data, src, focusX, zoomOrigin, toggles }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const kbStart = durationInFrames - KEN_BURNS_SECONDS * fps;
  const kb = interpolate(frame, [kbStart, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });
  const scale = frame < kbStart ? baseScale(t, fps, toggles) : 1 + 0.3 * kb;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: zoomOrigin }}>
        <Footage data={data} src={src} focusX={focusX} />
      </AbsoluteFill>
      <Captions data={data} />
      <CallToAction />
    </AbsoluteFill>
  );
};
