import { useEffect, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";

const FACES: [string, string, string][] = [
  ["TplAnton", "templario/fonts/anton-latin-400-normal.woff2", "400"],
  ["TplMontserrat", "templario/fonts/montserrat-latin-700-normal.woff2", "700"],
  ["TplMontserrat", "templario/fonts/montserrat-latin-800-normal.woff2", "800"],
  ["TplCormorant", "templario/fonts/cormorant-garamond-latin-700-italic.woff2", "700"],
];

/** Carga las fuentes locales (sin red) antes de renderizar el primer fotograma. */
export const useTemplarioFonts = () => {
  const [handle] = useState(() => delayRender("templario-fonts"));
  useEffect(() => {
    Promise.all(
      FACES.map(async ([family, path, weight]) => {
        const face = new FontFace(family, `url(${staticFile(path)})`, {
          weight,
          style: family === "TplCormorant" ? "italic" : "normal",
        });
        await face.load();
        document.fonts.add(face);
      }),
    )
      .catch((e) => console.error("font load", e))
      .finally(() => continueRender(handle));
  }, [handle]);
};
