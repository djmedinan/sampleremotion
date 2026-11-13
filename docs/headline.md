# Headline en videos de productividad

Regla del usuario (desde Reel107): en los videos de productividad (el hombre) se agrega un headline de apertura.

- Estilo: texto blanco en negrita y mayúsculas sobre cajas negras redondeadas, una por línea, con emoji al inicio.
- Posición: entre la cara y la banda de subtítulos (`top` ≈ 945 px), para no tapar la boca ni los subtítulos.
- Duración: aparece a los 0,2 s y desaparece a los 3,8 s, con fundido de entrada y salida.
- Una palabra o frase del headline va resaltada en amarillo (`hi`), en consonancia con el contenido.
- El texto del headline lo da el usuario en cada video; si no lo da, hay que proponerlo.

Uso: `headline={{ text: "🚨 Texto del headline.", hi: "frase resaltada." }}` en el componente `ReelNNN` que usa `ReelTemplate`.
