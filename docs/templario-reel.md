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
