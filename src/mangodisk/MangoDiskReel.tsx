import { AbsoluteFill, Easing, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig, Audio } from "remotion";
import { AUDIO, BRAND, COLORS, DURATION, FONT, HEADLINES, HOOK, LABELS, sec, STAGE } from "./config";
import { Background } from "./components/Background";
import { Chip } from "./components/Chip";
import { EndCard } from "./components/EndCard";
import { Headline } from "./components/Headline";
import { HookScene } from "./components/HookScene";
import { FRAME, ShotStage } from "./components/ShotStage";
import { Subtitles } from "./components/Subtitles";

export { DURATION as MANGODISK_DURATION };

/** Logo + nombre de la herramienta (escena 2, 3–11 s). */
const BrandHeader: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - sec(from) - 3, fps, config: { damping: 12, stiffness: 140 } });
  const out = interpolate(frame, [sec(to) - 5, sec(to)], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  if (frame < sec(from) || frame >= sec(to)) return null;
  return (
    <div style={{ position: "absolute", top: 290, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 26, fontFamily: FONT, opacity: Math.min(1, p) * out, scale: String(interpolate(p, [0, 1], [0.7, 1])), translate: `0 ${(1 - p) * 40}px` }}>
      <Img src={staticFile(BRAND.logo)} style={{ width: 190, height: 190, filter: `drop-shadow(0 0 30px ${COLORS.blue}88)` }} />
      <div style={{ fontSize: 124, fontWeight: 900, letterSpacing: -4, color: COLORS.white, lineHeight: 1 }}>
        {BRAND.programParts[0]}
        <span style={{ color: COLORS.blue, textShadow: `0 0 36px ${COLORS.blue}aa` }}>{BRAND.programParts[1]}</span>
      </div>
    </div>
  );
};

const LABEL_TOP = FRAME.y + FRAME.h + 22;

export const MangoDiskReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg, fontFamily: FONT }}>
      <Background />

      {/* Audio: música baja, narración y efectos cortos */}
      <Audio src={staticFile(AUDIO.music)} volume={AUDIO.musicVolume} />
      {AUDIO.voice.map((v) => (
        <Sequence key={v.file} from={sec(v.at)} layout="none">
          <Audio src={staticFile(v.file)} volume={AUDIO.voiceVolume} />
        </Sequence>
      ))}
      {AUDIO.sfx.map((s, i) => (
        <Sequence key={i} from={sec(s.t)} layout="none">
          <Audio src={staticFile(`mangodisk/audio/sfx_${s.f}.mp3`)} volume={s.v * AUDIO.sfxVolume} />
        </Sequence>
      ))}

      {/* Escena 1 — Hook */}
      <Sequence durationInFrames={sec(HOOK.to)}>
        <HookScene />
      </Sequence>

      {/* Escenas 2 y 3 — capturas reales con cámara continua */}
      <BrandHeader from={STAGE.from + 0.05} to={11.0} />
      {HEADLINES.map((h, i) => (
        <Headline key={i} {...h} top={300} />
      ))}
      <ShotStage from={STAGE.from} to={STAGE.to} />
      {LABELS.map((l, i) => {
        const solo = l.slot === "solo";
        const style: React.CSSProperties = solo
          ? { left: 0, right: 0, justifyContent: "center" }
          : { left: l.slot === 0 ? 40 : 540, width: l.slot === 0 ? 480 : 500, justifyContent: "center" };
        return (
          <div key={i} style={{ position: "absolute", top: LABEL_TOP, display: "flex", ...style }}>
            <Chip from={l.from} to={l.to} text={l.text} color={l.color} icon={l.icon} size={l.text.length > 18 ? 42 : 52} />
          </div>
        );
      })}

      {/* Cierre */}
      <EndCard />

      {/* Subtítulos dinámicos (siempre al frente) */}
      <Subtitles />
    </AbsoluteFill>
  );
};
