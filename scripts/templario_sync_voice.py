"""Ajusta una locución externa (p. ej. ElevenLabs) al ritmo de los textos del Reel Templario.

Cada frase de la locución se acelera (time-stretch con atempo, mismo tono) para caer entre los
instantes en que el video muestra su texto (src/templario/words.json). Las pausas se comprimen.
Uso: python scripts/templario_sync_voice.py voz.mp3 video.mp4 salida.mp4
El video se copia sin recodificar; su audio original se descarta.
"""
import subprocess, sys

# (inicio_voz, fin_voz, inicio_video, fin_video) en segundos
CHUNKS = [
    (0.00, 1.66, 0.12, 1.84),    # Si no sabes cuál vino elegir,
    (1.80, 4.14, 1.92, 3.77),    # parte por este pack y problema resuelto.
    (4.64, 8.92, 4.06, 7.29),    # El Pack Legado Templario reúne 6 botellas de La Orden del Temple
    (9.36, 12.36, 7.32, 9.85),   # para que pruebes distintos estilos sin comprar a ciegas.
    (13.00, 16.40, 10.10, 12.60),  # Es la forma más simple de descubrir cuál es tu favorito.
    (16.80, 19.78, 12.74, 14.97),  # Está disponible en eltemple.cl.
]
MIN_RATE = 1.15  # no se ralentiza la voz
TOTAL = 15.0

voice, video, out = sys.argv[1:4]
inputs, filters, labels = ["-i", voice], [], []
for i, (a0, a1, v0, v1) in enumerate(CHUNKS):
    rate = max((a1 - a0) / (v1 - v0), MIN_RATE)
    dur = (a1 - a0) / rate
    print(f"frase {i + 1}: x{rate:.2f}  video {v0:.2f}–{v0 + dur:.2f}s")
    delay = int(v0 * 1000)
    filters.append(
        f"[0:a]atrim={a0}:{a1},asetpts=PTS-STARTPTS,atempo={rate:.4f},"
        f"afade=t=in:d=0.01,afade=t=out:st={max(dur - 0.015, 0):.3f}:d=0.015,"
        f"adelay={delay}|{delay}[c{i}]"
    )
    labels.append(f"[c{i}]")
filters.append("".join(labels) + f"amix=inputs={len(CHUNKS)}:normalize=0,apad=whole_dur={TOTAL},atrim=0:{TOTAL}[a]")
cmd = ["ffmpeg", "-v", "error", "-y", "-i", voice, "-i", video, "-filter_complex", ";".join(filters),
       "-map", "1:v:0", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
       "-t", str(TOTAL), "-movflags", "+faststart", out]
subprocess.run(cmd, check=True)
