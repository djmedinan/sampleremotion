import { Img, OffthreadVideo, interpolate, staticFile, Easing, useCurrentFrame, useVideoConfig } from "remotion";
import { CAMERA, COLORS, FONT, HIGHLIGHTS, SHOTS, type CamKey } from "../config";

export const FRAME = { x: 40, y: 540, w: 1000, h: 640 };

const ease = Easing.bezier(0.22, 1, 0.36, 1);

const Media: React.FC<{ id: string }> = ({ id }) => {
  const shot = SHOTS[id];
  const style: React.CSSProperties = { width: "100%", height: "100%", objectFit: "fill", display: "block" };
  if (!shot.src) {
    return (
      <div style={{ ...style, background: "#101a30", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: FONT, color: COLORS.gray, border: `3px dashed ${COLORS.blue}` }}>
        <div style={{ fontSize: 44, fontWeight: 800, color: COLORS.white }}>ESPACIO DE REEMPLAZO</div>
        <div style={{ fontSize: 30 }}>Coloca captura real en public/mangodisk/shots/</div>
        <div style={{ fontSize: 30, color: COLORS.cyan }}>{shot.label}</div>
      </div>
    );
  }
  return shot.kind === "video" ? <OffthreadVideo src={staticFile(shot.src)} muted style={style} /> : <Img src={staticFile(shot.src)} style={style} />;
};

const FR = FRAME.w / FRAME.h;
const box = (id: string) => {
  const r = SHOTS[id].ratio;
  return r >= FR ? { width: `${(r / FR) * 100}%`, height: "100%" } : { width: "100%", height: `${(FR / r) * 100}%` };
};

type Seg = { shot: string; keys: CamKey[]; from: number; to: number };
const SEGS: Seg[] = (() => {
  const out: Seg[] = [];
  CAMERA.forEach((k, i) => {
    const last = out[out.length - 1];
    if (last && last.shot === k.shot && CAMERA[i - 1].shot === k.shot) { last.keys.push(k); return; }
    if (last) last.to = k.t;
    out.push({ shot: k.shot, keys: [k], from: k.t, to: 99 });
  });
  return out;
})();

const camAt = (seg: Seg, t: number) => {
  let i = 0;
  seg.keys.forEach((k, idx) => { if (t >= k.t) i = idx; });
  const k = seg.keys[i];
  const prev = i === 0 ? { scale: k.scale * 0.93, ox: k.ox, oy: k.oy } : seg.keys[i - 1];
  const p = ease(Math.min(1, Math.max(0, (t - k.t) / (i === 0 ? 0.35 : 0.5))));
  return { scale: prev.scale + (k.scale - prev.scale) * p, ox: prev.ox + (k.ox - prev.ox) * p, oy: prev.oy + (k.oy - prev.oy) * p };
};

/** Marco "ventana" persistente con zoom suave entre capturas reales. */
export const ShotStage: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const enter = interpolate(t, [from, from + 0.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const exit = interpolate(t, [to - 0.25, to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (t < from || t >= to) return null;
  // Barrido de escaneo (solo visual, sin medidas): 6.1–7.4 s
  const scanP = interpolate(t, [6.1, 7.4], [-0.12, 1.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const scanning = t >= 6.1 && t <= 7.4;
  return (
    <div
      style={{
        position: "absolute", left: FRAME.x, top: FRAME.y, width: FRAME.w, height: FRAME.h,
        borderRadius: 30, overflow: "hidden", background: "#120f0d",
        border: `2px solid ${COLORS.blue}88`,
        boxShadow: `0 0 70px ${COLORS.blue}40, 0 30px 70px rgba(0,0,0,.55)`,
        opacity: enter * exit,
        scale: String(interpolate(enter, [0, 1], [0.9, 1]) * interpolate(exit, [0, 1], [0.96, 1])),
        translate: `0 ${interpolate(enter, [0, 1], [120, 0])}px`,
      }}
    >
      {SEGS.map((s, si) => {
        if (t < s.from - 0.01 || t > s.to + 0.35) return null;
        const c = camAt(s, t);
        const fade = interpolate(t, [s.from, s.from + 0.22], [si === 0 ? 1 : 0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={si} style={{ position: "absolute", inset: 0, opacity: fade }}>
            <div style={{ position: "absolute", inset: 0, transformOrigin: `${c.ox}% ${c.oy}%`, scale: String(c.scale) }}>
              <div style={{ position: "absolute", left: 0, top: 0, ...box(s.shot) }}>
              <Media id={s.shot} />
              {HIGHLIGHTS.filter((h) => h.shot === s.shot && t >= h.from && t < h.to).map((h, hi) => {
                const p = interpolate(t, [h.from, h.from + 0.25], [0, 1], { extrapolateRight: "clamp", easing: ease });
                const pulse = 0.6 + 0.4 * Math.sin((t - h.from) * 9);
                return (
                  <div key={hi} style={{ position: "absolute", left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%`, border: `${4 / c.scale + 1.5}px solid ${h.color}`, borderRadius: 12, opacity: p * (0.65 + 0.35 * pulse), boxShadow: `0 0 ${34 / c.scale}px ${h.color}99, inset 0 0 ${24 / c.scale}px ${h.color}22`, scale: String(interpolate(p, [0, 1], [1.06, 1])) }} />
                );
              })}
              </div>
            </div>
          </div>
        );
      })}
      {scanning && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${scanP * 100}%`, width: 220, translate: "-100% 0", background: `linear-gradient(90deg, transparent, ${COLORS.cyan}55 70%, ${COLORS.cyan}cc)`, borderRight: `4px solid ${COLORS.cyan}`, boxShadow: `0 0 50px ${COLORS.cyan}` }} />
      )}
    </div>
  );
};
