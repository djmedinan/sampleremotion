import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export type BRollScene = { id: string; from: number; to: number; motion: "zoomIn" | "panLeft" | "panRight" | "still"; note?: string };

// Slow camera move over one shot. Pans run at a small base zoom so the edges never show.
const Move: React.FC<{ motion: BRollScene["motion"]; frames: number; children: React.ReactNode }> = ({ motion, frames, children }) => {
  const f = useCurrentFrame();
  const p = Math.min(1, f / Math.max(1, frames));
  let tf = "none";
  if (motion === "zoomIn") tf = `scale(${1.02 + 0.08 * p})`;
  if (motion === "panLeft") tf = `scale(1.07) translateX(${24 - 48 * p}px)`;
  if (motion === "panRight") tf = `scale(1.07) translateX(${-24 + 48 * p}px)`;
  return <AbsoluteFill style={{ transform: tf }}>{children}</AbsoluteFill>;
};

// B-roll shots land on direct cuts (no dissolves), over the unbroken voice track.
export const BRoll: React.FC<{ scenes: readonly BRollScene[]; dir?: string }> = ({ scenes, dir = "broll" }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {scenes.map((s) => {
        const frames = Math.max(1, Math.round((s.to - s.from) * fps));
        return (
          <Sequence key={`${s.id}-${s.from}`} from={Math.round(s.from * fps)} durationInFrames={frames}>
            <Move motion={s.motion} frames={frames}>
              <OffthreadVideo src={staticFile(`${dir}/${s.id}.mp4`)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Move>
          </Sequence>
        );
      })}
    </>
  );
};
