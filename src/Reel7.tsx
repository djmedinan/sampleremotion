import { VoicedReel } from "./VoicedReel";
import * as data from "./reel7-data";

export const REEL7_FPS = 30;
export const REEL7_DURATION = Math.round(61 * REEL7_FPS); // the prayer audio is 60.9 s

// Pixabay stock clips (free for commercial use, no attribution required), one per phrase, soft dissolves between them.
export const Reel7: React.FC = () => (
  <VoicedReel
    data={data}
    audio="voice/oracion_familia.mp3"
    clipsDir="clips2"
    fade={0.5}
    clips={[
      { id: "332390", from: 0, to: 2.4 }, // Señor,
      { id: "136010", from: 2.4, to: 5.0 }, // protege a mi familia… sabiduría
      { id: "215757", from: 5.0, to: 7.6 }, // decisión importante
      { id: "231259", from: 7.6, to: 10.0 }, // (decisión) camino
      { id: "187832", from: 10.0, to: 12.0 }, // dale claridad
      { id: "217028", from: 12.0, to: 14.0 }, // cuando algo parezca bueno
      { id: "371959", from: 14.0, to: 16.8 }, // pueda terminar haciéndole daño
      { id: "362822", from: 16.8, to: 19.0 }, // dale discernimiento
      { id: "254007", from: 19.0, to: 21.8 }, // nuestros hijos tengan valentía
      { id: "202753", from: 21.8, to: 24.8 }, // alejarse de lo que no está bien
      { id: "368211", from: 24.8, to: 27.4 }, // aun cuando todos los demás
      { id: "289712", from: 27.4, to: 30.0 }, // estén siguiendo ese camino
      { id: "245932", from: 30.0, to: 32.8 }, // mi pareja y yo sepamos pensar
      { id: "301635", from: 32.8, to: 35.8 }, // antes de reaccionar
      { id: "285663", from: 35.8, to: 38.6 }, // dentro de nuestro hogar
      { id: "205216", from: 38.6, to: 41.4 }, // hablarnos con confianza
      { id: "349321", from: 41.4, to: 44.6 }, // pedir ayuda cuando algo nos preocupe
      { id: "154141", from: 44.6, to: 47.2 }, // Señor, no solamente aparta el peligro
      { id: "237643", from: 47.2, to: 49.8 }, // de nuestra familia
      { id: "349355", from: 49.8, to: 52.4 }, // Enséñanos a reconocerlo
      { id: "200257", from: 52.4, to: 55.0 }, // antes de acercarnos a él
      { id: "365625", from: 55.0, to: 56.3 }, // Amén
      { id: "254009", from: 56.3, to: 58.6 }, // Envíala al grupo familiar
      { id: "199106", from: 58.6, to: 61.0 }, // bendición para comenzar el día
    ]}
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.9, scale: 1.0 },
      { at: 8.28, scale: 1.15 },
      { at: 11.78, scale: 1.0 },
      { at: 15.78, scale: 1.15 },
      { at: 19.28, scale: 1.0 },
      { at: 22.78, scale: 1.15 },
      { at: 26.28, scale: 1.0 },
      { at: 29.78, scale: 1.15 },
      { at: 33.28, scale: 1.0 },
      { at: 37.14, scale: 1.15 },
      { at: 40.64, scale: 1.0 },
      { at: 44.14, scale: 1.15 },
      { at: 47.76, scale: 1.0 },
      { at: 51.62, scale: 1.15 },
      { at: 55.12, scale: 1.0 },
      { at: 58.8, scale: 1.15 },
    ]}
  />
);
