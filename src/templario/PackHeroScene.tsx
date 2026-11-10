import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { C, easeInOut, ramp } from "./theme";

/**
 * BLOQUE 3 · 10–15 s · HERO SHOT.
 * La foto (1008×1792 = 9:16 exacto) se anima SIN deformar el producto:
 *  - push-in 100 % → 113 % con deriva vertical mínima
 *  - parallax muy sutil: capa "fondo" y capa "pack" (misma foto, recorte con máscara suave) a distinta escala
 *  - glow dorado cálido, viñeta y sombra inferior para el texto
 * scene-local 0 = 9.8 s globales
 */
const DUR = 156;
// región de la caja dentro de la foto (fracciones del lienzo)
const BOX = { x0: 0.02, x1: 0.98, y0: 0.215, y1: 0.715 };

export const PackHeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const p = ramp(frame, 6, DUR - 1, 0, 1, easeInOut);
  const scale = 1 + 0.13 * p;
  const drift = -430 * (scale - 1); // sube un poco el conjunto, sin dejar bordes al descubierto
  const fade = ramp(frame, 0, 16, 0, 1);
  const glow = 0.85 + 0.15 * Math.sin(frame / 14);
  const packExtra = 1 + 0.022 * p; // parallax: el pack se acerca ligeramente más que el fondo
  const packShift = -8 * p;
  const mask = `linear-gradient(90deg, transparent 0, #000 4%, #000 96%, transparent 100%)`;
  const maskV = `linear-gradient(180deg, transparent 0, #000 5%, #000 95%, transparent 100%)`;
  const BX = BOX.x0 * 1080, BY = BOX.y0 * 1920, BW = (BOX.x1 - BOX.x0) * 1080, BH = (BOX.y1 - BOX.y0) * 1920;
  const cx = ((BOX.x0 + BOX.x1) / 2) * 1080;
  const cy = ((BOX.y0 + BOX.y1) / 2) * 1920;
  return (
    <AbsoluteFill style={{ backgroundColor: C.black, opacity: fade }}>
      <AbsoluteFill style={{ transform: `translateY(${drift}px) scale(${scale})`, transformOrigin: "50% 50%" }}>
        {/* fondo */}
        <Img
          src={staticFile("templario/img/pack.jpg")}
          style={{ position: "absolute", inset: 0, width: 1080, height: 1920, filter: "brightness(.9) contrast(1.04)" }}
        />
        {/* glow dorado detrás del pack */}
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse 62% 30% at ${cx}px ${cy + 70}px, rgba(255,184,96,${0.36 * glow}) 0%, rgba(255,160,70,${0.12 * glow}) 45%, rgba(0,0,0,0) 75%)`,
            mixBlendMode: "screen",
          }}
        />
        {/* capa pack (parallax sutil): recorte rectangular con bordes difuminados */}
        <div
          style={{
            position: "absolute",
            left: BX,
            top: BY,
            width: BW,
            height: BH,
            overflow: "hidden",
            transformOrigin: `${cx - BX}px ${cy - BY}px`,
            transform: `translateY(${packShift}px) scale(${packExtra})`,
            WebkitMaskImage: `${mask}, ${maskV}`,
            WebkitMaskComposite: "source-in",
            maskImage: `${mask}, ${maskV}`,
            maskComposite: "intersect",
          }}
        >
          <Img
            src={staticFile("templario/img/pack.jpg")}
            style={{ position: "absolute", left: -BX, top: -BY, width: 1080, height: 1920, maxWidth: "none" }}
          />
        </div>
      </AbsoluteFill>
      {/* luz y contraste locales */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 38% at 50% 52%, rgba(255,205,130,${0.1 * glow}) 0%, rgba(0,0,0,0) 70%)`,
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 52%, rgba(6,3,4,.62) 100%), linear-gradient(180deg, rgba(6,3,4,.5) 0%, rgba(6,3,4,0) 20%, rgba(6,3,4,0) 62%, rgba(6,3,4,.6) 76%, rgba(6,3,4,.78) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
