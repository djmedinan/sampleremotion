import { AbsoluteFill, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, easeInOut, easeOut, ramp } from "./theme";

/**
 * BLOQUE 2 · 4–10 s · DESCUBRIMIENTO.
 * Los clips web_* ya son SOLO el viewport de eltemple.cl (1896×942): sin pestañas, barra de
 * direcciones, favoritos, escritorio, barra de tareas ni scrollbar. Aquí se hace la "cámara virtual":
 * una ventana 9:16 (ancho W, centro cx/cy en px del clip) que se mueve y hace zoom.
 */
const SRC_W = 1896;
const SRC_H = 942;

type Cam = { W: number; cx: number; cy?: number };
type Shot = {
  src: string;
  from: number; // frame local de la escena
  dur: number;
  trim: number; // frames del clip a saltar
  a: Cam;
  b: Cam;
  y0?: number; // sólo si la ventana es más ancha que 530 px (el viewport no alcanza el alto 9:16)
  ease?: (t: number) => number;
  pan?: number; // duración del movimiento de cámara (fotogramas); por defecto = dur
};

// local 0 = 3.9 s globales
const SHOTS: Shot[] = [
  // 4.0–5.65 s · colección: push-in hacia la tarjeta del Pack Legado Templario
  { src: "templario/video/web_a.mp4", from: 0, dur: 52, trim: 9, a: { W: 529, cx: 948 }, b: { W: 440, cx: 950, cy: 620 } },
  // 5.65–7.95 s · foto ampliada del pack: se ven las 6 botellas (ventana ancha + relleno oscuro)
  { src: "templario/video/web_b.mp4", from: 52, dur: 69, trim: 4, a: { W: 900, cx: 950 }, b: { W: 760, cx: 950 }, y0: 150 },
  // 7.95–10.25 s · página de producto: de la foto al nombre y al precio ($93.400)
  { src: "templario/video/web_c.mp4", from: 121, dur: 75, pan: 56, trim: 12, a: { W: 529, cx: 395 }, b: { W: 480, cx: 1228, cy: 520 }, ease: easeInOut },
];

const Shot: React.FC<{ s: Shot }> = ({ s }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = s.ease ?? easeOut;
  const p = ramp(frame, 0, s.pan ?? s.dur, 0, 1, ease);
  const W = s.a.W + (s.b.W - s.a.W) * p;
  const cx = s.a.cx + (s.b.cx - s.a.cx) * p;
  const cyA = s.a.cy ?? SRC_H / 2;
  const cyB = s.b.cy ?? SRC_H / 2;
  const cy = cyA + (cyB - cyA) * p;
  const sc = 1080 / W;
  const needFill = W * (16 / 9) > SRC_H + 0.5;
  const vw = SRC_W * sc;
  const vh = SRC_H * sc;
  const left = 540 - cx * sc;
  let top = needFill ? (s.y0 ?? (1920 - vh) / 2) : 960 - cy * sc;
  if (!needFill) top = Math.min(0, Math.max(1920 - vh, top));
  // punch de entrada (corte seco con un pequeño golpe de zoom)
  const punch = spring({ frame, fps, config: { damping: 14, stiffness: 200, mass: 0.6 }, durationInFrames: 12 });
  const k = 1 + 0.06 * (1 - punch);
  const maskFill = needFill
    ? "linear-gradient(180deg, transparent 0, #000 7%, #000 93%, transparent 100%)"
    : undefined;
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: needFill ? "linear-gradient(180deg,#0f0d0c 0%,#1b1a18 50%,#0f0d0c 100%)" : C.black,
        transform: `scale(${k})`,
      }}
    >
      <OffthreadVideo
        src={staticFile(s.src)}
        startFrom={s.trim}
        style={{
          position: "absolute",
          left,
          top,
          width: vw,
          height: vh,
          maxWidth: "none",
          WebkitMaskImage: maskFill,
          maskImage: maskFill,
        }}
      />
    </AbsoluteFill>
  );
};

export const WebsiteScene: React.FC = () => {
  const frame = useCurrentFrame();
  // zoom-through de entrada desde el flash (primeros 14 fotogramas)
  const inP = ramp(frame, 0, 14, 0, 1, easeOut);
  const sc = 1.38 - 0.38 * inP;
  const blur = 20 * (1 - inP);
  const tx = 140 * (1 - inP);
  // salida suave hacia el hero (se funde bajo la foto)
  const out = ramp(frame, 176, 196, 0, 1, easeInOut);
  return (
    <AbsoluteFill style={{ backgroundColor: C.black }}>
      <AbsoluteFill
        style={{
          transform: `translateX(${tx}px) scale(${sc * (1 + 0.05 * out)})`,
          filter: `blur(${blur}px) brightness(${1 - 0.45 * out})`,
        }}
      >
        {SHOTS.map((s, i) => (
          <Sequence key={i} from={s.from} durationInFrames={s.dur + (i === SHOTS.length - 1 ? 30 : 0)} layout="none">
            <Shot s={s} />
          </Sequence>
        ))}
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(8,4,6,.55) 0%, rgba(8,4,6,0) 16%, rgba(8,4,6,0) 55%, rgba(8,4,6,.82) 82%, rgba(8,4,6,.9) 100%)",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
