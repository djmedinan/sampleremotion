"""Música instrumental + efectos sutiles del Reel Templario (síntesis propia, sin muestras con licencia).

Uso: python scripts/templario_audio.py   (requiere numpy y scipy)
Lee src/templario/words.json y public/templario/audio/voice.wav; escribe music.wav y sfx.wav
(estéreo, 44.1 kHz, 15 s). La música se atenúa automáticamente (sidechain) bajo la voz.
"""
import json, wave
import numpy as np
from scipy.signal import butter, lfilter

SR = 44100; DUR = 15.0; N = int(SR * DUR)
rng = np.random.default_rng(7)
t = np.arange(N) / SR
words = json.load(open("src/templario/words.json"))

def lp(x, f, o=2): b, a = butter(o, f / (SR / 2), "low"); return lfilter(b, a, x)
def hp(x, f, o=2): b, a = butter(o, f / (SR / 2), "high"); return lfilter(b, a, x)
def bp(x, f0, f1, o=2): b, a = butter(o, [f0 / (SR / 2), f1 / (SR / 2)], "band"); return lfilter(b, a, x)
def put(buf, x, at, pan=0.0):
    i = int(at * SR); n = min(len(x), buf.shape[1] - i)
    if n <= 0: return
    l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    buf[0, i:i + n] += x[:n] * l * 1.414; buf[1, i:i + n] += x[:n] * r * 1.414

# ---------------------------------------------------------------- música
music = np.zeros((2, N))
BPM = 100.0; beat = 60 / BPM
def midi(m): return 440 * 2 ** ((m - 69) / 12)
chords = [(0, [45, 52, 57, 60, 64]), (2.4, [41, 48, 57, 60, 65]), (4.8, [36, 48, 55, 60, 64]), (7.2, [43, 50, 55, 59, 62]),
          (9.6, [45, 52, 57, 60, 64]), (12.0, [41, 48, 57, 60, 65])]
for k, (st, notes) in enumerate(chords):
    en = chords[k + 1][0] if k + 1 < len(chords) else DUR
    ln = int((en - st + 1.2) * SR)
    tt = np.arange(ln) / SR
    pad = np.zeros(ln)
    for m in notes:
        for dt in (-0.12, 0.0, 0.12):
            f = midi(m) * 2 ** (dt / 12)
            pad += 0.5 * (2 * ((tt * f) % 1) - 1) + 0.5 * np.sin(2 * np.pi * f * tt)
    pad = lp(pad, 1500) / (len(notes) * 3)
    e = np.minimum(1, tt / 0.7) * np.minimum(1, (ln / SR - tt) / 1.0)
    put(music, pad * e * 0.55, st, 0.0)

def pluck(f, d=0.5):
    n = int(d * SR); tt = np.arange(n) / SR
    x = np.sin(2 * np.pi * f * tt) + 0.4 * np.sin(4 * np.pi * f * tt) * np.exp(-tt * 12) + 0.2 * np.sin(6 * np.pi * f * tt) * np.exp(-tt * 20)
    return x * np.exp(-tt * 7) * np.minimum(1, tt / 0.004)

arp_sets = [[69, 72, 76, 81], [65, 69, 72, 77], [60, 64, 67, 72], [67, 71, 74, 79]]
step = beat / 2
tm, i = 0.0, 0
while tm < DUR - 0.3:
    bar = min(int(tm // 2.4), 5)
    chord = arp_sets[bar % 4]
    # energía: rápido 0–10 s, escaso 10–15 s
    if tm < 10 or (i % 4 == 0):
        vol = 0.20 if tm < 4 else 0.15
        if tm >= 10: vol = 0.12
        put(music, pluck(midi(chord[i % 4 if tm < 10 else (i // 4) % 4])) * vol, tm, pan=-0.3 + 0.6 * ((i % 2)))
    tm += step; i += 1

def kick():
    n = int(0.35 * SR); tt = np.arange(n) / SR
    f = 48 + 90 * np.exp(-tt * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 9)
def hat():
    n = int(0.05 * SR); return hp(rng.standard_normal(n), 6500) * np.exp(-np.linspace(0, 9, n))
tm, i = 0.0, 0
while tm < DUR:
    if tm < 10:
        if i % 2 == 0: put(music, kick() * (0.55 if tm < 4 else 0.4), tm)
        put(music, hat() * (0.10 if tm < 4 else 0.06), tm + beat / 2 if False else tm + beat / 4)
    elif tm < 14.4 and i % 4 == 0:
        put(music, kick() * 0.25, tm)
    tm += beat; i += 1
# campanas suaves en la zona "deseo"
for tb, m in [(10.0, 81), (11.2, 76), (12.4, 72), (13.6, 76)]:
    n = int(2.2 * SR); tt = np.arange(n) / SR
    bell = (np.sin(2 * np.pi * midi(m) * tt) + 0.3 * np.sin(2 * np.pi * midi(m) * 2.76 * tt) * np.exp(-tt * 3)) * np.exp(-tt * 1.6)
    put(music, bell * 0.10, tb, 0.2)
music = lp(music, 9000, 1)
# sidechain: la música baja bajo la voz
with wave.open("public/templario/audio/voice.wav") as w:
    v = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
v = np.pad(v, (0, max(0, N - len(v))))[:N]
venv_ = lp(np.abs(v), 6, 1); venv_ = np.clip(venv_ / (venv_.max() * 0.45), 0, 1)
duck = 1 - 0.62 * venv_
music *= duck
# nivel base y fundido final
music *= 0.6
music *= np.minimum(1, (DUR - t) / 0.5) * np.minimum(1, t / 0.15)

# ---------------------------------------------------------------- efectos
sfx = np.zeros((2, N))
def whoosh(at, d, f0, f1, pan0=-0.8, pan1=0.8, vol=0.5):
    n = int(d * SR); x = rng.standard_normal(n)
    out = np.zeros(n); seg = 12
    for s in range(seg):
        a, b = s * n // seg, (s + 1) * n // seg
        fc = f0 * (f1 / f0) ** (s / (seg - 1))
        out[a:b] = bp(x, fc * 0.7, min(fc * 1.5, SR / 2 - 100))[a:b]
    e = np.sin(np.pi * np.linspace(0, 1, n)) ** 2
    out = out * e
    out /= np.abs(out).max() + 1e-9
    l = np.linspace(pan0, pan1, n)
    l_g = np.cos((l + 1) * np.pi / 4) * 1.414; r_g = np.sin((l + 1) * np.pi / 4) * 1.414
    i = int(at * SR)
    sfx[0, i:i + n] += out * l_g * vol; sfx[1, i:i + n] += out * r_g * vol
def thud(at, vol=0.5, f=60, d=0.45, click=True):
    n = int(d * SR); tt = np.arange(n) / SR
    fr = f * 0.7 + f * 1.3 * np.exp(-tt * 24)
    x = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-tt * (3.2 / d))
    if click:
        c = int(0.05 * SR); x[:c] += hp(rng.standard_normal(c), 1500) * np.exp(-np.linspace(0, 8, c)) * 0.5
    put(sfx, x * vol, at)
def tick(at, vol=0.2):
    n = int(0.07 * SR); x = bp(rng.standard_normal(n), 1800, 6000) * np.exp(-np.linspace(0, 8, n)); put(sfx, x * vol, at)
def swell(at, d, vol=0.3):
    n = int(d * SR); x = rng.standard_normal(n); out = np.zeros(n); seg = 14
    for s in range(seg):
        a, b = s * n // seg, (s + 1) * n // seg
        fc = 500 * (6 ** (s / (seg - 1))); out[a:b] = bp(x, fc * 0.6, min(fc * 1.6, SR / 2 - 100))[a:b]
    out = out / (np.abs(out).max() + 1e-9) * (np.linspace(0, 1, n) ** 2.2)
    put(sfx, out * vol, at)
def shimmer(at, vol=0.15):
    for k, m in enumerate([88, 93, 96]):
        n = int(1.0 * SR); tt = np.arange(n) / SR
        put(sfx, np.sin(2 * np.pi * midi(m) * tt) * np.exp(-tt * 4) * vol, at + k * 0.07, 0.3 * (k - 1))

W = lambda i: words[i]["start"]
whoosh(3.74, 0.42, 250, 6500, -0.9, 0.9, 0.55)      # whoosh supermercado → Temple
thud(3.98, 0.5, 52, 0.55)                            # golpe oscuro del flash
for ts_ in (1.43, 2.73): tick(ts_, 0.22); whoosh(ts_ - 0.1, 0.16, 800, 4000, -0.5, 0.5, 0.12)  # cortes del hook
for ts_ in (5.65, 7.95): tick(ts_, 0.16)             # cortes de la web
thud(W(18) - 0.05, 0.55, 66, 0.5)                    # impact "6 BOTELLAS"
thud(W(28) - 0.05, 0.22, 74, 0.25, False)            # impacts suaves de conceptos
thud(W(30) - 0.05, 0.22, 74, 0.25, False)
swell(9.15, 0.85, 0.28)                              # transición sonora suave hacia el hero
thud(10.02, 0.35, 46, 1.0, False)                    # asentamiento del hero
tick(W(40) - 0.05, 0.10); tick(W(43) - 0.05, 0.10)   # DESCUBRE / TU FAVORITO
shimmer(13.43, 0.15)                                 # swap al CTA final
sfx *= 0.6

def write(path, a):
    a = np.clip(a, -1, 1); pcm = (a.T * 32767).astype(np.int16)
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
write("public/templario/audio/music.wav", music)
write("public/templario/audio/sfx.wav", sfx)
print("music peak %.2f  sfx peak %.2f" % (np.abs(music).max(), np.abs(sfx).max()))
