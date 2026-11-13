# Pixashort

Nombre del prompt para reels de oración en 9:16 (1080×1920, 30 fps): fotografías y videos reales de Pixabay
animados con movimientos suaves, subtítulos dorados (#D9A441) de 3–5 palabras, piano discreto bajo la voz,
sin partículas, estética cálida "Dios Primero". Implementación: `src/cine/GoldSubtitles.tsx`, plantillas
`src/cine/Despierta.tsx`, `Pienso.tsx`, `Orado.tsx`; búsqueda de imágenes: `scripts/pix_search.py`
(clave solo por variable de entorno PIXABAY_KEY).

## Música de fondo

Piano de Mixkit "Piano Reflections" (licencia gratuita, uso comercial incluido): https://assets.mixkit.co/music/22/22.mp3
Mezcla: voz `loudnorm=I=-16:TP=-1.5`, música `loudnorm=I=-29:TP=-3` con fundidos de entrada y salida, `amix=inputs=2:normalize=0:duration=first`.
