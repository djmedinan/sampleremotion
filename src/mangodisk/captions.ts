// Palabras con tiempos (s) medidos sobre la narración real (faster-whisper, ver scripts/mangodisk_voice.py).
// `at` = inicio de cada frase de voz en el reel (ver AUDIO.voice en config.ts).
// Los textos son los del guion; solo se toman los tiempos del reconocimiento.
import { AUDIO } from "./config";

type W = [string, number, number]; // [texto, inicio, fin] relativo a la frase
const S1: W[] = [["TU", 0, 0.12], ["DISCO", 0.12, 0.32], ["ESTÁ", 0.32, 0.6], ["LLENO", 0.6, 0.92], ["Y", 0.92, 1.02], ["NO", 1.02, 1.14], ["SABES", 1.14, 1.36], ["QUÉ", 1.36, 1.56], ["OCUPA", 1.56, 1.98], ["TANTO", 1.98, 2.22], ["ESPACIO", 2.22, 2.5]];
const S2: W[] = [["PRUEBA", 0, 0.2], ["MANGODISK", 0.2, 0.88], ["ES", 0.88, 1.3], ["GRATIS", 1.3, 1.86], ["DE", 1.86, 2.12], ["CÓDIGO", 2.12, 2.42], ["ABIERTO", 2.42, 2.9], ["Y", 2.9, 3.26], ["ESCANEA", 3.26, 3.68], ["RÁPIDO", 3.68, 3.98], ["PARA", 3.98, 4.28], ["ENCONTRAR", 4.28, 4.66], ["ARCHIVOS", 4.66, 5.14], ["GIGANTES", 5.14, 5.74], ["DUPLICADOS", 5.74, 6.7], ["Y", 6.7, 6.8], ["CACHÉS", 6.8, 7.12], ["ESCONDIDAS", 7.12, 7.66]];
const S3: W[] = [["TE", 0, 0.1], ["MUESTRA", 0.1, 0.48], ["QUÉ", 0.48, 0.64], ["OCUPA", 0.64, 1.12], ["ESPACIO", 1.12, 1.56], ["Y", 1.56, 1.98], ["TÚ", 1.98, 2.1], ["DECIDES", 2.1, 2.4], ["QUÉ", 2.4, 2.76], ["BORRAR", 2.76, 3.18], ["¡GUÁRDALO!", 3.32, 3.66]];

export type CapWord = { t: string; s: number; e: number; key: boolean };
export type CapGroup = { words: CapWord[]; from: number; to: number };

// Agrupación por sentido: [inicio, fin] índices (inclusive) + índices de palabras clave.
const GROUPS: { words: W[]; at: number; groups: [number, number][]; keys: number[]; text?: Record<number, string> }[] = [
  { words: S1, at: AUDIO.voice[0].at, groups: [[0, 3], [4, 7], [8, 10]], keys: [1, 3, 10], text: { 0: "¿TU" } },
  { words: S2, at: AUDIO.voice[1].at, groups: [[0, 1], [2, 3], [4, 6], [7, 9], [10, 11], [12, 13], [14, 14], [15, 17]], keys: [1, 3, 5, 6, 9, 13, 14, 16] },
  { words: S3, at: AUDIO.voice[2].at, groups: [[0, 1], [2, 4], [5, 7], [8, 9], [10, 10]], keys: [4, 7, 10] },
];

const out: CapGroup[] = [];
for (const blk of GROUPS) {
  blk.groups.forEach(([a, b], gi) => {
    const words = blk.words.slice(a, b + 1).map(([t, s, e], i) => ({
      t: blk.text?.[a + i] ?? t, s: blk.at + s, e: blk.at + e, key: blk.keys.includes(a + i),
    }));
    if (blk === GROUPS[0] && b === 10) words[words.length - 1].t = "ESPACIO?"; // cierra la pregunta
    const next = blk.groups[gi + 1];
    const from = words[0].s - 0.04;
    const to = next ? blk.at + blk.words[next[0]][1] - 0.04 : words[words.length - 1].e + 0.35;
    out.push({ words, from, to });
  });
}
// El último de la frase 1 y 2 no debe invadir el inicio de la siguiente frase.
export const CAPTIONS: CapGroup[] = out.map((g, i) => ({ ...g, to: Math.min(g.to, out[i + 1]?.from ?? 15) }));
