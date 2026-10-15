import { VoicedReel } from "./VoicedReel";
import * as data from "./reel13-data";

export const REEL13_FPS = 30;
export const REEL13_DURATION = Math.round(48.5 * REEL13_FPS); // voice 46.8 s + a 1.7 s music tail

// Voice + soft instrumental ("Valley Sunset" by Alejandro Magaña, Mixkit free license) are pre-mixed in public/voice/cien_mil_mix.mp3.
// Pixabay stock clips (free for commercial use, no attribution required); landscape ones are centre-cropped to 9:16.
export const Reel13: React.FC = () => (
  <VoicedReel
    data={data}
    audio="voice/cien_mil_mix.mp3"
    clipsDir="clips5"
    fade={0.6}
    zoomEase={15}
    clips={[
      { id: "343700", from: 0, to: 1.7, motion: "zoomIn" }, // Si mañana recibieras
      { id: "153458", from: 1.7, to: 3.8, motion: "panRight" }, // 100.000 dólares extra
      { id: "209854", from: 3.8, to: 5.8, motion: "still" }, // ¿cuánto te quedaría?
      { id: "73847", from: 5.8, to: 7.1, motion: "panLeft" }, // una semana después
      { id: "75702", from: 7.1, to: 8.9, motion: "zoomIn" }, // pedimos más
      { id: "340637", from: 8.9, to: 10.4, motion: "panRight" }, // provisión
      { id: "326954", from: 10.4, to: 12.4, motion: "still" }, // cuando llega
      { id: "208082", from: 12.4, to: 14.2, motion: "panLeft" }, // gastamos primero
      { id: "357743", from: 14.2, to: 15.9, motion: "zoomIn" }, // pensamos después
      { id: "153460", from: 15.9, to: 17.9, motion: "panRight" }, // Antes de tocar esos 100.000
      { id: "368623", from: 17.9, to: 20.0, motion: "still" }, // qué parte va a una necesidad
      { id: "98141", from: 20.0, to: 22.2, motion: "panLeft" }, // qué parte guardas
      { id: "199106", from: 22.2, to: 24.4, motion: "zoomIn" }, // qué parte puedes disfrutar
      { id: "362822", from: 24.4, to: 26.6, motion: "panRight" }, // Proverbios 21:5
      { id: "298813", from: 26.6, to: 29.8, motion: "still" }, // planificación diligente produce
      { id: "241923", from: 29.8, to: 31.7, motion: "panLeft" }, // mejores resultados
      { id: "136854", from: 31.7, to: 33.4, motion: "zoomIn" }, // actuar con apuro
      { id: "215757", from: 33.4, to: 35.4, motion: "panRight" }, // hoy no harás solamente
      { id: "349355", from: 35.4, to: 37.7, motion: "still" }, // Dios, dame más
      { id: "293817", from: 37.7, to: 38.9, motion: "panLeft" }, // Ahora también
      { id: "326237", from: 38.9, to: 40.7, motion: "zoomIn" }, // Dios, enséñame qué hacer
      { id: "59139", from: 40.7, to: 42.6, motion: "panRight" }, // lo que llegue
      { id: "93550", from: 42.6, to: 44.6, motion: "still" }, // Guárdalo para la próxima vez
      { id: "46922", from: 44.6, to: 46.8, motion: "panLeft" }, // que recibas dinero extra
      { id: "293782", from: 46.8, to: 48.5, motion: "zoomIn" }, // cierre
    ]}
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.5, scale: 1.0 },
      { at: 7.0, scale: 1.15 },
      { at: 11.22, scale: 1.0 },
      { at: 14.72, scale: 1.15 },
      { at: 18.22, scale: 1.0 },
      { at: 21.64, scale: 1.15 },
      { at: 25.32, scale: 1.0 },
      { at: 28.82, scale: 1.15 },
      { at: 32.16, scale: 1.0 },
      { at: 35.42, scale: 1.15 },
      { at: 38.92, scale: 1.0 },
      { at: 42.62, scale: 1.15 },
    ]}
  />
);
