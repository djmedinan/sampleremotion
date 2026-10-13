import { VoicedReel } from "./VoicedReel";
import * as data from "./reel6-data";

export const REEL6_FPS = 30;
export const REEL6_DURATION = Math.round(15.5 * REEL6_FPS); // female voice is 15.1 s

// Same stock clips as Reel5; cuts follow the narration of the female voice (es-US-PalomaNeural).
export const Reel6: React.FC = () => (
  <VoicedReel
    data={data}
    audio="voice/no_te_rindas_f.mp3"
    clips={[
      { id: "160975", from: 0, to: 3.0 }, // "Hoy no tienes ganas. Está bien."
      { id: "217105", from: 3.0, to: 4.9 }, // "Pero las ganas no construyen nada"
      { id: "202753", from: 4.9, to: 6.62 }, // "volver a intentarlo, sí"
      { id: "378252", from: 6.62, to: 8.66 }, // "Nadie ve los días en que casi te rindes"
      { id: "358452", from: 8.66, to: 10.64 }, // "pero esos días te cambian"
      { id: "236633", from: 10.64, to: 13.6 }, // "Un paso más. Solo uno."
      { id: "153821", from: 13.6, to: 15.5 }, // "Mañana te lo vas a agradecer."
    ]}
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.0, scale: 1.0 },
      { at: 6.62, scale: 1.15 },
      { at: 10.64, scale: 1.0 },
    ]}
  />
);
