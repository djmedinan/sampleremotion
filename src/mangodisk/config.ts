// ─────────────────────────────────────────────────────────────────────────────
// Plantilla "Reel tecnológico" — TODO lo editable vive aquí (textos, colores,
// tiempos, rutas de recursos). Para otro programa: cambia este archivo y captions.ts.
// Todos los tiempos están en SEGUNDOS absolutos del reel (se convierten con `sec`).
// ─────────────────────────────────────────────────────────────────────────────

export const FPS = 30;
export const DURATION = 450; // 15 s exactos
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const sec = (s: number) => Math.round(s * FPS);

export const COLORS = {
  bg: "#080F1F",
  bgPanel: "#0E1A33",
  blue: "#168BFF",
  cyan: "#00E5FF",
  green: "#31E89D",
  white: "#FFFFFF",
  gray: "#A8B6CC",
};
export const FONT = "Inter, Manrope, 'Helvetica Neue', Arial, sans-serif";

/** Áreas seguras Facebook/Instagram Reels (px): evitar UI de la plataforma. */
export const SAFE = { top: 250, bottom: 420, side: 60, rightExtra: 80 };

export const BRAND = {
  program: "MangoDisk",
  programParts: ["Mango", "Disk"] as const, // [blanco, azul]
  logo: "mangodisk/logo.png",
  channel: "Activa Digital CL",
  repo: "github.com/harry0703/MangoDisk",
  license: "Código abierto · GPLv3",
};

// ── Recursos reemplazables ───────────────────────────────────────────────────
// Para usar un MP4 real: { kind: "video", src: "mangodisk/shots/scan.mp4", ratio: 1.49 }.
// Si `src` es null se muestra un espacio de reemplazo claramente marcado.
export type Shot = { kind: "image" | "video"; src: string | null; ratio: number; label: string };
export const SHOTS: Record<string, Shot> = {
  deep: { kind: "image", src: "mangodisk/shots/01-deep-cleanup.png", ratio: 2372 / 1590, label: "01-deep-cleanup.png" },
  large: { kind: "image", src: "mangodisk/shots/02-large-file-cleanup-crop.png", ratio: 2372 / 1465, label: "02-large-file-cleanup-crop.png" },
  dupes: { kind: "image", src: "mangodisk/shots/03-duplicate-cleanup-crop.png", ratio: 2372 / 1465, label: "03-duplicate-cleanup-crop.png" },
  space: { kind: "image", src: "mangodisk/shots/05-disk-space.png", ratio: 1834 / 1170, label: "05-disk-space.png" },
};

export const AUDIO = {
  voice: [
    { file: "mangodisk/audio/s1.mp3", at: 0.1 },
    { file: "mangodisk/audio/s2.mp3", at: 3.0 },
    { file: "mangodisk/audio/s3.mp3", at: 11.0 },
  ],
  voiceVolume: 1,
  music: "mangodisk/audio/music.mp3",
  musicVolume: 0.12,
  sfxVolume: 0.5,
  sfx: [
    { t: 0.05, f: "blip", v: 0.8 }, { t: 0.3, f: "whoosh_down", v: 0.6 },
    { t: 0.85, f: "whoosh_up", v: 0.5 }, { t: 2.1, f: "whoosh_down", v: 0.4 },
    { t: 2.78, f: "whoosh_up", v: 0.8 }, { t: 3.05, f: "impact", v: 0.45 },
    { t: 3.2, f: "pop", v: 0.7 }, { t: 4.3, f: "pop", v: 0.8 }, { t: 5.1, f: "pop_hi", v: 0.8 },
    { t: 6.1, f: "scan", v: 0.7 }, { t: 7.35, f: "ding", v: 0.45 },
    { t: 7.5, f: "whoosh_down", v: 0.5 }, { t: 7.6, f: "pop", v: 0.8 },
    { t: 8.65, f: "whoosh_up", v: 0.5 }, { t: 8.75, f: "pop_hi", v: 0.8 },
    { t: 9.7, f: "whoosh_down", v: 0.5 }, { t: 9.8, f: "pop", v: 0.8 },
    { t: 10.85, f: "whoosh_up", v: 0.7 }, { t: 11.0, f: "tick", v: 0.8 },
    { t: 12.9, f: "ding", v: 0.7 }, { t: 13.5, f: "whoosh_up", v: 0.7 },
    { t: 13.65, f: "pop", v: 0.8 }, { t: 14.3, f: "impact", v: 0.9 },
  ],
};

// ── Cámara sobre las capturas (escena 2 y 3) ─────────────────────────────────
// Cada key: desde `t` se muestra `shot` con zoom `scale` hacia el punto (ox, oy) en %.
export type CamKey = { t: number; shot: keyof typeof SHOTS; scale: number; ox: number; oy: number };
export const STAGE = { from: 3.0, to: 13.9 };
export const CAMERA: CamKey[] = [
  { t: 3.0, shot: "deep", scale: 1.0, ox: 50, oy: 50 },
  { t: 4.4, shot: "deep", scale: 1.08, ox: 50, oy: 30 },
  { t: 6.0, shot: "deep", scale: 1.6, ox: 30, oy: 8 }, // escaneo → resultados
  { t: 7.5, shot: "large", scale: 1.0, ox: 50, oy: 50 },
  { t: 7.85, shot: "large", scale: 1.4, ox: 62, oy: 22 }, // archivos grandes
  { t: 8.7, shot: "dupes", scale: 1.0, ox: 50, oy: 50 },
  { t: 8.95, shot: "dupes", scale: 1.35, ox: 45, oy: 20 }, // duplicados
  { t: 9.75, shot: "deep", scale: 1.0, ox: 50, oy: 50 },
  { t: 9.95, shot: "deep", scale: 1.5, ox: 78, oy: 28 }, // cachés
  { t: 11.0, shot: "space", scale: 1.0, ox: 50, oy: 50 },
  { t: 11.4, shot: "space", scale: 1.3, ox: 80, oy: 40 }, // qué ocupa espacio
  { t: 12.9, shot: "deep", scale: 1.0, ox: 50, oy: 50 },
  { t: 13.1, shot: "deep", scale: 1.4, ox: 72, oy: 22 }, // tú decides
];

// Recuadros resaltados sobre la captura (coordenadas en % de la imagen).
export type Highlight = { from: number; to: number; shot: keyof typeof SHOTS; x: number; y: number; w: number; h: number; color: string };
export const HIGHLIGHTS: Highlight[] = [
  { from: 7.0, to: 7.5, shot: "deep", x: 22, y: 7.5, w: 35, h: 6, color: COLORS.cyan },
  { from: 8.0, to: 8.7, shot: "large", x: 26, y: 24.5, w: 60, h: 26, color: COLORS.cyan },
  { from: 9.1, to: 9.75, shot: "dupes", x: 23, y: 20, w: 74, h: 24, color: COLORS.blue },
  { from: 10.2, to: 11.0, shot: "deep", x: 46, y: 19, w: 52, h: 38, color: COLORS.cyan },
  { from: 11.5, to: 12.9, shot: "space", x: 52, y: 17, w: 28, h: 35, color: COLORS.cyan },
  { from: 13.2, to: 13.9, shot: "deep", x: 46, y: 19, w: 30, h: 42, color: COLORS.green },
];

// Etiquetas animadas bajo el marco.
export type Label = { from: number; to: number; text: string; color: string; icon?: "check" | "scan" | "bookmark"; slot?: 0 | 1 | "solo" };
export const LABELS: Label[] = [
  { from: 4.3, to: 6.0, text: "GRATIS", color: COLORS.green, icon: "check", slot: 0 },
  { from: 5.1, to: 6.0, text: "OPEN SOURCE", color: COLORS.cyan, icon: "check", slot: 1 },
  { from: 6.1, to: 7.4, text: "ESCANEO RÁPIDO", color: COLORS.cyan, icon: "scan", slot: "solo" },
  { from: 7.6, to: 8.8, text: "ARCHIVOS GIGANTES", color: COLORS.cyan, slot: "solo" },
  { from: 8.8, to: 9.85, text: "DUPLICADOS", color: COLORS.blue, slot: "solo" },
  { from: 9.8, to: 11.0, text: "CACHÉ", color: COLORS.cyan, slot: "solo" },
  { from: 11.15, to: 12.9, text: "TÚ REVISAS CADA ELEMENTO", color: COLORS.gray, slot: "solo" },
  { from: 13.1, to: 13.9, text: "SELECCIONAS Y REVISAS", color: COLORS.green, icon: "check", slot: "solo" },
];

// Titulares superiores.
export type Headline = { from: number; to: number; lines: { text: string; hl?: boolean }[]; size: number };
export const HEADLINES: Headline[] = [
  { from: 11.0, to: 12.9, size: 88, lines: [{ text: "QUÉ OCUPA " }, { text: "ESPACIO", hl: true }] },
  { from: 12.9, to: 13.9, size: 92, lines: [{ text: "TÚ TIENES" }, { text: "EL CONTROL", hl: true }] },
];

export const HOOK = {
  to: 3.2,
  title: [{ text: "¿QUÉ LLENA" }, { text: "TU ", then: "DISCO?" }] as const,
  panelTitle: "Disco local",
  chip: "CASI LLENO",
  disclaimer: "Gráfico ilustrativo",
};
export const END = {
  from: 13.6,
  cta: "GUARDA ESTE REEL",
  tagline: "Gratis · Código abierto",
  credit: "Capturas: MangoDisk — github.com/harry0703/MangoDisk",
};
