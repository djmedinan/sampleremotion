import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { useTemplarioFonts } from "./Fonts";
import { SupermarketScene } from "./SupermarketScene";
import { WebsiteScene } from "./WebsiteScene";
import { PackHeroScene } from "./PackHeroScene";
import { DynamicCaptions } from "./DynamicCaptions";
import { FinalCTA } from "./FinalCTA";
import { C, DURATION, T, easeOut, ramp, sec } from "./theme";

/**
 * Reel "Pack Legado Templario" · 1080×1920 · 30 fps · 15 s
 *   CAOS (0–4)  →  DESCUBRIMIENTO (4–10)  →  DESEO (10–15)
 */
export const TEMPLARIO_DURATION = DURATION;

const Flash: React.FC<{ at: number }> = ({ at }) => {
  // golpe oscuro muy corto (borgoña/negro) entre supermercado y universo Temple
  return (
    <Sequence from={at - 6} durationInFrames={14} layout="none">
      <FlashInner />
    </Sequence>
  );
};
const FlashInner: React.FC = () => {
  const f = useCurrentFrame();
  const a = f < 6 ? ramp(f, 0, 6, 0, 0.92, easeOut) : ramp(f, 6, 14, 0.92, 0, easeOut);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${C.burgundy} 0%, ${C.black} 70%)`,
        opacity: a,
      }}
    />
  );
};

export const TemploReel: React.FC = () => {
  useTemplarioFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: C.black }}>
      <Sequence from={0} durationInFrames={sec(T.hookEnd) + 6} layout="none">
        <SupermarketScene />
      </Sequence>
      <Sequence from={sec(T.siteFrom)} durationInFrames={sec(T.siteTo - T.siteFrom)} layout="none">
        <WebsiteScene />
      </Sequence>
      <Sequence from={sec(T.heroFrom)} durationInFrames={DURATION - sec(T.heroFrom)} layout="none">
        <PackHeroScene />
      </Sequence>
      <Flash at={sec(T.hookEnd)} />
      <DynamicCaptions />
      <Sequence from={sec(T.ctaFrom)} durationInFrames={DURATION - sec(T.ctaFrom)} layout="none">
        <FinalCTA />
      </Sequence>
      <Audio src={staticFile("templario/audio/music.wav")} volume={1} />
      <Audio src={staticFile("templario/audio/sfx.wav")} volume={1} />
      <Audio src={staticFile("templario/audio/voice.wav")} volume={1} />
    </AbsoluteFill>
  );
};
