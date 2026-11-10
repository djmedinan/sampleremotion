"""Locución del Reel Templario con Piper (es_MX-claude-high) + tiempos por palabra.

Uso: python scripts/templario_voice.py <ruta_modelo.onnx>
Genera public/templario/audio/voice.wav (44.1 kHz mono) y src/templario/words.json.
El guion NO se modifica: sólo se pronuncia "6" como "seis" y "eltemple.cl" como
"el temple punto ce ele" (únicamente en el audio; en pantalla se muestra el texto original).
"""
import json, sys, wave
import numpy as np
from piper import PiperVoice, SynthesisConfig

SR_OUT = 44100
TOTAL = 15.0
# (id, texto TTS, [(palabra en pantalla, nº de palabras TTS)], inicio_voz, fin_voz)
CLIPS = [
    ("A", "Si no sabes cuál vino elegir, parte por este pack y problema resuelto.",
     "Si no sabes cuál vino elegir, parte por este pack y problema resuelto.", 0.12, 3.85),
    ("B", "El Pack Legado Templario reúne seis botellas de La Orden del Temple para que pruebes distintos estilos sin comprar a ciegas.",
     "El Pack Legado Templario reúne 6 botellas de La Orden del Temple para que pruebes distintos estilos sin comprar a ciegas.", 4.08, 9.85),
    ("C1", "Es la forma más simple de descubrir cuál es tu favorito.",
     "Es la forma más simple de descubrir cuál es tu favorito.", 10.12, 12.55),
    ("C2", "Está disponible en el temple punto ce ele.",
     "Está disponible en eltemple.cl.", 12.78, 14.85),
]

def synth(voice, text, L):
    cfg = SynthesisConfig(length_scale=L)
    audio, ph = [], []
    for ch in voice.synthesize(text, cfg, include_alignments=True):
        audio.append(ch.audio_float_array)
        ph.extend(ch.phoneme_alignments)
    return np.concatenate(audio), ph

def words_from(ph, sr, n_tts_words):
    """Agrupa fonemas en palabras (el fonema ' ' separa palabras)."""
    t, cur, words = 0, None, []
    for a in ph:
        n = a.num_samples; p = a.phoneme
        if p == " ":
            if cur: words.append(cur); cur = None
        else:
            if cur is None: cur = [t, t + n]
            else: cur[1] = t + n
        t += n
    if cur: words.append(cur)
    return [(s / sr, e / sr) for s, e in words]

def main(model):
    voice = PiperVoice.load(model, include_alignments=True)
    sr = voice.config.sample_rate
    out = np.zeros(int(TOTAL * SR_OUT), dtype=np.float32)
    all_words = []
    for cid, tts, disp, t0, t1 in CLIPS:
        target = t1 - t0
        lo, hi, best = 0.55, 1.1, None
        for _ in range(9):
            L = (lo + hi) / 2
            a, ph = synth(voice, tts, L)
            w = words_from(ph, sr, 0)
            dur = w[-1][1] - w[0][0]
            if dur > target: hi = L
            else: lo = L
            best = (L, a, ph, w)
        L, a, ph, w = best
        dur = w[-1][1] - w[0][0]
        # ajuste fino con tempo si quedó algo largo
        tempo = max(1.0, dur / target)
        print(cid, "L=%.3f" % L, "dur=%.2f" % dur, "target=%.2f" % target, "tempo=%.3f" % tempo)
        # remuestrea a 44.1k y aplica tempo con interpolación lineal (pequeño: <=1.1)
        n_out = int(len(a) / sr * SR_OUT / tempo)
        x_old = np.linspace(0, len(a) - 1, len(a))
        x_new = np.linspace(0, len(a) - 1, n_out)
        a2 = np.interp(x_new, x_old, a).astype(np.float32)
        w = [(s / tempo, e / tempo) for s, e in w]
        off = t0 - w[0][0]
        i0 = int(round(off * SR_OUT))
        seg = a2
        # fundido corto de entrada/salida
        f = int(0.01 * SR_OUT); seg = seg.copy(); seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
        s0 = max(i0, 0); cut = s0 - i0
        out[s0:s0 + len(seg) - cut] += seg[cut:cut + (len(out) - s0)][: len(out) - s0]
        # mapa a palabras en pantalla
        dw = disp.split()
        tw = tts.split()
        # emparejamiento: C2 junta 'el temple punto ce ele' -> 'eltemple.cl.'
        mapping = []
        i = 0
        for d in dw:
            n = 5 if d.startswith("eltemple") else 1
            mapping.append((d, i, i + n - 1)); i += n
        assert i == len(w), (cid, i, len(w), tw)
        for d, a_i, b_i in mapping:
            all_words.append({"clip": cid, "word": d, "start": round(off + w[a_i][0], 3), "end": round(off + w[b_i][1], 3)})
    peak = np.abs(out).max()
    out = out / peak * 0.89
    pcm = (out * 32767).astype(np.int16)
    with wave.open("public/templario/audio/voice.wav", "wb") as wv:
        wv.setnchannels(1); wv.setsampwidth(2); wv.setframerate(SR_OUT); wv.writeframes(pcm.tobytes())
    json.dump(all_words, open("src/templario/words.json", "w"), ensure_ascii=False, indent=1)
    print("ok", len(all_words), "palabras")

main(sys.argv[1])
