# Reel MangoDisk (15 s, 1080×1920, 30 fps)

Composición: `MangoDiskReel` — código en `src/mangodisk/`.

## Comandos
```bash
npm run dev                                   # previsualizar (Remotion Studio → MangoDiskReel)
npx remotion render src/index.ts MangoDiskReel out/mangodisk-reel.mp4 --codec=h264 --crf=18
python3 scripts/mangodisk_audio.py            # regenera música y SFX sintéticos (numpy + ffmpeg)
```

## Estructura
- `config.ts`: colores, textos, tiempos, cámara, resaltados, etiquetas, audio, rutas de recursos.
- `captions.ts`: palabras y tiempos de la narración (subtítulos).
- `components/`: Background, HookScene, ShotStage, Chip, Headline, Subtitles, EndCard.

## Recursos
- Capturas: `public/mangodisk/shots/` — oficiales del repositorio de MangoDisk (GPLv3, https://github.com/harry0703/MangoDisk). Son de macOS; se recortó la barra inferior con "Delete Permanently".
- Para usar grabaciones reales: en `SHOTS` (config.ts) cambia `src` a un PNG/MP4 propio (`kind: "video"`), o ponlo en `null` para ver el espacio de reemplazo.
- El gráfico del hook (barra casi llena) es ilustrativo y está rotulado como tal; no es una captura de Windows.
- Narración: voz local Piper `es_MX-ald-medium` (scripts/mangodisk_voice.py; tiempos con scripts/mangodisk_words.py). Para otra voz, sustituye `public/mangodisk/audio/s1-s3.mp3` y ajusta `AUDIO.voice` y `captions.ts`.
- Música y efectos: sintetizados, originales, sin copyright.
