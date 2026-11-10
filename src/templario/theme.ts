import { Easing, interpolate } from "remotion";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION = 450; // 15 s

/** Paleta: negro, borgoña, dorado, crema (La Orden del Temple). */
export const C = {
  black: "#0B0809",
  ink: "#140A0D",
  burgundy: "#7A1530",
  burgundyDeep: "#45091A",
  gold: "#E2B75A",
  goldSoft: "#C79F4A",
  cream: "#F6ECD4",
};

export const FONT = {
  display: "TplAnton, Impact, sans-serif",
  sans: "TplMontserrat, Inter, sans-serif",
  serif: "TplCormorant, Georgia, serif",
};

export const sec = (s: number) => Math.round(s * FPS);

/** Zona segura Instagram Reels (px sobre 1080×1920). */
export const SAFE = { top: 250, bottom: 1560, left: 70, right: 950 };

export const easeOut = Easing.bezier(0.16, 0.84, 0.28, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.55, 0, 0.9, 0.45);

export const ramp = (
  frame: number,
  from: number,
  to: number,
  a: number,
  b: number,
  easing: (t: number) => number = easeOut,
) =>
  interpolate(frame, [from, to], [a, b], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Línea de tiempo global (segundos). */
export const T = {
  hookEnd: 4.0,
  siteFrom: 3.9,
  siteTo: 10.45,
  heroFrom: 9.8,
  ctaFrom: 12.65,
  ctaSwap: 13.45,
};
