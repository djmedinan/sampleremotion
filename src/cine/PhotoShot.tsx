import { AbsoluteFill, Easing, Img, interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export type ShotMotion = "push" | "pull" | "panLeft" | "panRight" | "drift" | "rise";
export type Shot = {
  kind: "photo" | "video";
  id: string;
  from: number;
  to: number;
  motion: ShotMotion;
  amp?: number; // 1 = normal; > 1 for emotionally important lines
  fade?: number; // seconds of dissolve into this shot; 0 = clean cut
  note?: string;
};

const ease = Easing.inOut(Easing.cubic);

// A photograph moved like a real camera: eased push / pull / lateral pan, with a slow secondary drift on the other axis
// so no two shots repeat the same path. The pre-upscaled photo (1440x2160) leaves room to move without showing edges.
export const ShotView: React.FC<{ shot: Shot; hook?: boolean }> = ({ shot, hook }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const frames = Math.max(1, Math.round((shot.to - shot.from + (shot.fade ?? 0)) * fps));
  const p = ease(Math.min(1, f / frames));
  const a = shot.amp ?? 1;
  let scale = 1.12, tx = 0, ty = 0;
  switch (shot.motion) {
    case "push": scale = 1.06 + 0.1 * a * p; ty = -14 * a * p; break;
    case "pull": scale = 1.06 + 0.1 * a * (1 - p); tx = 10 * a * p; break;
    case "panLeft": scale = 1.12 + 0.02 * a * p; tx = (30 - 60 * p) * a; ty = 8 * a * p; break;
    case "panRight": scale = 1.12 + 0.02 * a * p; tx = (-30 + 60 * p) * a; ty = -8 * a * p; break;
    case "drift": scale = 1.09 + 0.05 * a * p; tx = 16 * a * Math.sin(p * Math.PI); ty = -26 * a * p; break;
    case "rise": scale = 1.1 + 0.04 * a * p; ty = (34 - 68 * p) * a; break;
  }
  if (hook) {
    // speed ramp: 100% -> 115% in the first 0.4 s (fast, decelerating), then a slow elegant creep
    const fast = interpolate(f, [0, 12], [1.0, 1.15], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
    const slow = interpolate(f, [12, frames], [0, 0.045], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
    scale = (fast + slow) * 1.04;
    tx = 0; ty = -10 * p;
  }
  const bright = hook ? 1 + 0.12 * Math.max(0, 1 - Math.abs(f - 6) / 14) : 1; // tiny ambient lift on the first word
  const style: React.CSSProperties = { transform: `translate(${tx}px, ${ty}px) scale(${scale})`, filter: `brightness(${bright}) contrast(1.04) saturate(1.04)`, width: "100%", height: "100%", objectFit: "cover" };
  return (
    <AbsoluteFill>
      {shot.kind === "photo" ? (
        <Img src={staticFile(`photos/${shot.id}.jpg`)} style={style} />
      ) : (
        <OffthreadVideo src={staticFile(`clips8/${shot.id}.mp4`)} muted style={style} />
      )}
    </AbsoluteFill>
  );
};
