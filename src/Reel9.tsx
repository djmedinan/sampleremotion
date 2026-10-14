import { VoicedReel } from "./VoicedReel";
import * as data from "./reel9-data";

export const REEL9_FPS = 30;
export const REEL9_DURATION = Math.round(109.3 * REEL9_FPS); // the prayer audio is 109.3 s

// Pixabay stock clips (free for commercial use, no attribution required): one per phrase, soft dissolves,
// motion alternating between slow push-in, small side drifts and steady shots.
export const Reel9: React.FC = () => (
  <VoicedReel
    data={data}
    audio="voice/oracion_2.mp3"
    clipsDir="clips3"
    fade={0.6}
    zoomEase={15}
    clips={[
      { id: "178472", from: 0, to: 2.4, motion: "zoomIn" }, // hija
      { id: "204326", from: 2.4, to: 5.0, motion: "panRight" }, // ciudad
      { id: "363703", from: 5.0, to: 7.4, motion: "still" }, // trabaja de noche
      { id: "87490", from: 7.4, to: 10.0, motion: "panLeft" }, // viajar
      { id: "370036", from: 10.0, to: 12.2, motion: "zoomIn" }, // faltan horas / llegue
      { id: "209264", from: 12.2, to: 14.0, motion: "panRight" }, // once de la noche
      { id: "375632", from: 14.0, to: 16.0, motion: "still" }, // ¿Le escribes?
      { id: "233390", from: 16.0, to: 17.4, motion: "panLeft" }, // No responde
      { id: "381344", from: 17.4, to: 20.2, motion: "zoomIn" }, // vuelves a mirar el teléfono
      { id: "159300", from: 20.2, to: 22.8, motion: "panRight" }, // otro cinco
      { id: "343704", from: 22.8, to: 25.2, motion: "still" }, // tu mente empieza
      { id: "174262", from: 25.2, to: 27.2, motion: "panLeft" }, // fabricar escenarios
      { id: "342221", from: 27.2, to: 29.6, motion: "zoomIn" }, // algo importante
      { id: "362822", from: 29.6, to: 32.2, motion: "panRight" }, // Salmo 121
      { id: "365646", from: 32.2, to: 35.0, motion: "still" }, // Dios
      { id: "362961", from: 35.0, to: 37.2, motion: "panLeft" }, // como quien guarda
      { id: "187831", from: 37.2, to: 39.4, motion: "zoomIn" }, // protege y acompaña
      { id: "215757", from: 39.4, to: 42.0, motion: "panRight" }, // aplicarlo
      { id: "349355", from: 42.0, to: 44.6, motion: "still" }, // tengo fe
      { id: "359028", from: 44.6, to: 47.4, motion: "panLeft" }, // más sano
      { id: "345853", from: 47.4, to: 50.4, motion: "zoomIn" }, // en nuestras manos
      { id: "375348", from: 50.4, to: 53.0, motion: "panRight" }, // lo que no controlamos
      { id: "199105", from: 53.0, to: 56.0, motion: "still" }, // destruya nuestra paz
      { id: "366164", from: 56.0, to: 58.4, motion: "panLeft" }, // Puedes llamar
      { id: "266987", from: 58.4, to: 61.0, motion: "zoomIn" }, // prudencia
      { id: "273931", from: 61.0, to: 63.0, motion: "panRight" }, // verificar que esté bien
      { id: "205216", from: 63.0, to: 65.4, motion: "still" }, // ayudar
      { id: "136854", from: 65.4, to: 68.0, motion: "panLeft" }, // llega un momento
      { id: "149466", from: 68.0, to: 71.2, motion: "zoomIn" }, // cada kilómetro
      { id: "343705", from: 71.2, to: 73.6, motion: "panRight" }, // puedes decir
      { id: "234918", from: 73.6, to: 76.0, motion: "still" }, // Señor
      { id: "136462", from: 76.0, to: 78.0, motion: "panLeft" }, // físicamente donde está
      { id: "231259", from: 78.0, to: 80.4, motion: "zoomIn" }, // Dale prudencia
      { id: "202753", from: 80.4, to: 83.0, motion: "panRight" }, // protégelo en su camino
      { id: "314429", from: 83.0, to: 86.0, motion: "still" }, // amor en miedo
      { id: "349321", from: 86.0, to: 89.2, motion: "panLeft" }, // Cuídalo… mis brazos
      { id: "365625", from: 89.2, to: 90.7, motion: "zoomIn" }, // Amén
      { id: "283307", from: 90.7, to: 93.0, motion: "panRight" }, // Amar a alguien
      { id: "190460", from: 93.0, to: 96.0, motion: "still" }, // controlar todo
      { id: "241923", from: 96.0, to: 99.0, motion: "panLeft" }, // confiar
      { id: "267849", from: 99.0, to: 102.0, motion: "zoomIn" }, // fuera de nuestra vista
      { id: "343700", from: 102.0, to: 105.0, motion: "panRight" }, // Guarda este reel
      { id: "176198", from: 105.0, to: 109.3, motion: "still" }, // noches lejos de casa
    ]}
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.5, scale: 1.0 },
      { at: 7.0, scale: 1.15 },
      { at: 10.5, scale: 1.0 },
      { at: 14.0, scale: 1.15 },
      { at: 17.5, scale: 1.0 },
      { at: 21.0, scale: 1.15 },
      { at: 24.5, scale: 1.0 },
      { at: 28.0, scale: 1.15 },
      { at: 31.5, scale: 1.0 },
      { at: 34.7, scale: 1.15 },
      { at: 38.24, scale: 1.0 },
      { at: 42.62, scale: 1.15 },
      { at: 46.12, scale: 1.0 },
      { at: 49.62, scale: 1.15 },
      { at: 53.06, scale: 1.0 },
      { at: 56.56, scale: 1.15 },
      { at: 60.06, scale: 1.0 },
      { at: 63.56, scale: 1.15 },
      { at: 67.86, scale: 1.0 },
      { at: 70.9, scale: 1.15 },
      { at: 74.4, scale: 1.0 },
      { at: 78.5, scale: 1.15 },
      { at: 82.0, scale: 1.0 },
      { at: 85.5, scale: 1.15 },
      { at: 89.44, scale: 1.0 },
      { at: 93.22, scale: 1.15 },
      { at: 96.72, scale: 1.0 },
      { at: 100.22, scale: 1.15 },
      { at: 103.72, scale: 1.0 },
      { at: 107.42, scale: 1.15 },
    ]}
  />
);
