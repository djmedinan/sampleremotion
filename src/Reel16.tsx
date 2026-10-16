import { VoicedReel } from "./VoicedReel";
import * as data from "./reel16-data";

export const REEL16_FPS = 30;
export const REEL16_DURATION = 47 * REEL16_FPS; // voice 45.0 s + a 2 s music tail

// Voice + hopeful piano ("Piano Reflections" by Ahjay Stelino, Mixkit free license) are pre-mixed in public/voice/paz_mix.mp3.
// Pixabay stock clips (free for commercial use, no attribution required), soft dissolves, slow camera moves.
export const Reel16: React.FC = () => (
  <VoicedReel
    data={data}
    audio="voice/paz_mix.mp3"
    clipsDir="clips7"
    fade={0.6}
    zoomEase={15}
    clips={[
      { id: "332390", from: 0, to: 1.1, motion: "zoomIn" }, // Señor,
      { id: "359028", from: 1.1, to: 2.9, motion: "panRight" }, // quieta mi mente
      { id: "187832", from: 2.9, to: 4.9, motion: "still" }, // Dame claridad
      { id: "215757", from: 4.9, to: 6.9, motion: "panLeft" }, // distinguir un problema real
      { id: "371959", from: 6.9, to: 8.9, motion: "zoomIn" }, // un miedo imaginado
      { id: "375348", from: 8.9, to: 11.1, motion: "panRight" }, // peleando contra escenarios
      { id: "357743", from: 11.1, to: 13.4, motion: "still" }, // que todavía no ocurrieron
      { id: "136854", from: 13.4, to: 16.2, motion: "panLeft" }, // una decisión
      { id: "362822", from: 16.2, to: 18.0, motion: "zoomIn" }, // dame sabiduría
      { id: "73847", from: 18.0, to: 19.4, motion: "panRight" }, // si necesita tiempo
      { id: "337745", from: 19.4, to: 21.0, motion: "still" }, // dame paciencia
      { id: "190460", from: 21.0, to: 23.8, motion: "panLeft" }, // fuera de mi control
      { id: "343700", from: 23.8, to: 26.8, motion: "zoomIn" }, // el espacio dentro de mí
      { id: "241923", from: 26.8, to: 28.5, motion: "panRight" }, // vivir el día
      { id: "202753", from: 28.5, to: 31.0, motion: "still" }, // el día que tengo delante
      { id: "343704", from: 31.0, to: 34.0, motion: "panLeft" }, // los días que inventa mi preocupación
      { id: "349355", from: 34.0, to: 35.8, motion: "zoomIn" }, // Amén (oración)
      { id: "365625", from: 35.8, to: 37.3, motion: "panRight" }, // Amén
      { id: "293782", from: 37.3, to: 40.0, motion: "still" }, // guárdalo para esas mañanas
      { id: "233390", from: 40.0, to: 42.3, motion: "panLeft" }, // tu cabeza comienza
      { id: "199107", from: 42.3, to: 45.0, motion: "zoomIn" }, // a correr antes que tú
      { id: "199106", from: 45.0, to: 47.0, motion: "panRight" }, // cierre
    ]}
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.1, scale: 1.0 },
      { at: 7.08, scale: 1.15 },
      { at: 10.62, scale: 1.0 },
      { at: 15.08, scale: 1.15 },
      { at: 18.58, scale: 1.0 },
      { at: 22.66, scale: 1.15 },
      { at: 26.16, scale: 1.0 },
      { at: 29.66, scale: 1.15 },
      { at: 33.06, scale: 1.0 },
      { at: 37.3, scale: 1.15 },
      { at: 40.8, scale: 1.0 },
    ]}
  />
);
