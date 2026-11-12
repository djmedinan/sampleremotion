# Reel Pack Legado Templario (1080×1920 · 30 fps · 15 s)

Composición Remotion: `TemplarioReel` (`src/templario/`).

```bash
npm run dev                                   # preview
npx remotion render TemplarioReel out/templario_reel.mp4 --codec=h264 --crf=16
```

## Análisis de recursos
| Recurso | Datos | Uso |
|---|---|---|
| Supermercado | 1080×1920, 30 fps, 35,3 s | Persona en 0–8 s, 27–28 s y 32 s; texto rojo quemado arriba (≈0–20 %). Se usan 3 cortes sin personas (10,5 s · 22,4 s · 33,5 s) y se recorta `crop=1080:1480:0:440`. |
| Web eltemple.cl | 1920×1200, 60 fps, 31,9 s | Viewport útil `crop=1896:942:0:186` (sin pestañas, URL, favoritos, barra de tareas ni scrollbar). Tramos: colección 12,0 s · foto ampliada 28,0 s · producto 17,7 s (precio $93,400 real de la grabación). |
| Foto del pack | 1008×1792 (9:16 exacto) | Hero con push-in 100→113 %, parallax sutil por 2 capas, glow dorado y viñeta. |

## Estructura
`SupermarketScene` · `WebsiteScene` · `PackHeroScene` · `DynamicCaptions` · `FinalCTA` · `TemploReel` (montaje, flash, audio) · `theme.ts` (paleta, easing, tiempos) · `Fonts.tsx` (fuentes locales, sin red).

## Audio (reproducible)
- `scripts/templario_voice.py <modelo es_MX-claude-high.onnx>`: locución Piper + tiempos por palabra → `public/templario/audio/voice.wav` y `src/templario/words.json`.
- `scripts/templario_audio.py`: música instrumental y SFX sintetizados (whoosh, impacts, swell al hero), con sidechain bajo la voz.
- La voz es TTS provisional. Para usar la tuya: reemplaza `voice.wav` y ajusta los tiempos en `words.json` (los subtítulos leen de ahí).

## Reel "Todo lo bueno empieza con V" (`VinoV`)
Solo textos animados sobre el metraje original (816×1104, 24 fps, 10,04 s, audio intacto). Raleway 300, «Vino» y «Ve al Temple» en 500.
`npx remotion render VinoV exports/vino_v_reel.mp4 --crf=12`. Código: `src/vinoV/VinoVReel.tsx`.
El ☝️ es la imagen Twemoji `261d.svg` (© Twitter/Twemoji, CC-BY 4.0), porque Chrome no renderiza fuentes de emoji SVG.

### v2 (`VinoV2`)
Mismo metraje; texto blanco #FFFFFF centrado al 43 % de la altura, ancho máx. 85 %, interlineado 1,2, sombra `0 2px 8px rgba(0,0,0,.85), 0 0 20px rgba(0,0,0,.45)` y degradado radial negro muy sutil. Emoji 👇 = Twemoji `1f447.svg` (CC-BY 4.0). Salida: `exports/vino_v2_reel.mp4`.

## Subtítulos `Vino30Lucas`
Video 848×1072, 24 fps, audio intacto. Transcripción con Whisper (`small`) → `src/subs/vino30lucas.words.json` (tiempos por palabra; revisar el texto si se cambia el video). Bloques de ≤3 palabras, palabra activa en dorado, desplazados a la izquierda para no tapar la etiqueta de la botella. `npx remotion render Vino30Lucas exports/vino30lucas_subs.mp4 --crf=12`.
