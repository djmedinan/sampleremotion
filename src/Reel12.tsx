import { VoicedReel } from "./VoicedReel";
import * as data from "./reel12-data";

export const REEL12_FPS = 30;
export const REEL12_DURATION = 48 * REEL12_FPS; // voice 46.2 s + a 1.8 s music tail

// Voice + soft instrumental ("Deep Meditation" by Alejandro Magaña, Mixkit free license) are pre-mixed in public/voice/finanzas_mix.mp3.
// Pixabay stock clips (free for commercial use, no attribution required), soft dissolves, slow camera moves.
export const Reel12: React.FC = () => (
  <VoicedReel
    data={data}
    audio="voice/finanzas_mix.mp3"
    clipsDir="clips4"
    fade={0.6}
    zoomEase={15}
    clips={[
      { id: "332390", from: 0, to: 1.1, motion: "zoomIn" }, // Señor,
      { id: "293782", from: 1.1, to: 2.7, motion: "panRight" }, // bendice mis finanzas
      { id: "345853", from: 2.7, to: 4.6, motion: "still" }, // prepara mis manos
      { id: "368623", from: 4.6, to: 7.3, motion: "panLeft" }, // administrar la bendición
      { id: "362961", from: 7.3, to: 9.2, motion: "zoomIn" }, // Dame ojos
      { id: "293817", from: 9.2, to: 11.4, motion: "panRight" }, // reconocer oportunidades
      { id: "357743", from: 11.4, to: 14.5, motion: "still" }, // disciplina para guardar
      { id: "362822", from: 14.5, to: 16.0, motion: "panLeft" }, // sabiduría
      { id: "215757", from: 16.0, to: 18.4, motion: "zoomIn" }, // no comprar solo porque puedo
      { id: "202753", from: 18.4, to: 19.9, motion: "panRight" }, // valentía
      { id: "337745", from: 19.9, to: 23.2, motion: "still" }, // invertir… crecer
      { id: "326237", from: 23.2, to: 25.9, motion: "panLeft" }, // humildad, aprender
      { id: "205216", from: 25.9, to: 28.6, motion: "zoomIn" }, // Bendice el trabajo
      { id: "187832", from: 28.6, to: 30.5, motion: "panRight" }, // de mis manos
      { id: "236633", from: 30.5, to: 33.2, motion: "still" }, // que mis ingresos aumenten
      { id: "237643", from: 33.2, to: 35.2, motion: "panLeft" }, // de manera honesta
      { id: "241923", from: 35.2, to: 38.0, motion: "zoomIn" }, // pero sobre todo
      { id: "365646", from: 38.0, to: 40.4, motion: "panRight" }, // aquello que tanto he pedido
      { id: "340637", from: 40.4, to: 43.3, motion: "still" }, // una persona preparada
      { id: "254007", from: 43.3, to: 44.9, motion: "panLeft" }, // para cuidarlo
      { id: "365625", from: 44.9, to: 46.2, motion: "zoomIn" }, // Amén
      { id: "199106", from: 46.2, to: 48.0, motion: "panRight" }, // cierre
    ]}
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 4.24, scale: 1.0 },
      { at: 7.74, scale: 1.15 },
      { at: 11.44, scale: 1.0 },
      { at: 14.52, scale: 1.15 },
      { at: 18.4, scale: 1.0 },
      { at: 21.74, scale: 1.15 },
      { at: 25.24, scale: 1.0 },
      { at: 29.28, scale: 1.15 },
      { at: 32.78, scale: 1.0 },
      { at: 36.28, scale: 1.15 },
      { at: 39.78, scale: 1.0 },
      { at: 43.48, scale: 1.15 },
    ]}
  />
);
