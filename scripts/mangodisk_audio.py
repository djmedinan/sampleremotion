#!/usr/bin/env python3
"""Genera música original (sin copyright) y efectos de sonido sintéticos para el reel MangoDisk.
Uso: python3 scripts/mangodisk_audio.py   (requiere numpy y ffmpeg)
Salida: public/mangodisk/audio/{music,sfx_*}.mp3
La narración (s1/s2/s3.wav) se genera aparte con Piper (ver docs/mangodisk-reel.md).
"""
import subprocess, wave, os
import numpy as np

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "mangodisk", "audio")
os.makedirs(OUT, exist_ok=True)
t_ = lambda d: np.arange(int(SR * d)) / SR


def save(name, x):
    x = np.clip(x, -1, 1)
    p = os.path.join(OUT, name + ".wav")
    with wave.open(p, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", p, "-b:a", "192k", p[:-4] + ".mp3"], check=True)
    os.remove(p)


def env(n, a=0.005, r=0.1):
    e = np.ones(n); na, nr = int(a * SR), int(r * SR)
    e[:na] = np.linspace(0, 1, na); e[-nr:] *= np.linspace(1, 0, nr)
    return e


def lowpass_noise(d, f0, f1):
    n = np.random.default_rng(1).standard_normal(int(SR * d))
    out = np.zeros_like(n); y = 0.0
    fs = np.linspace(f0, f1, len(n))
    for i, v in enumerate(n):
        a = 1 - np.exp(-2 * np.pi * fs[i] / SR)
        y += a * (v - y); out[i] = y
    return out / (np.abs(out).max() + 1e-9)


def whoosh(d=0.5, up=True):
    n = lowpass_noise(d, 300, 5000) if up else lowpass_noise(d, 5000, 300)
    x = n * np.sin(np.linspace(0, np.pi, len(n))) ** 1.5
    return x * 0.6


def pop(f=880, d=0.18):
    t = t_(d)
    return (np.sin(2 * np.pi * f * t * (1 + 0.5 * np.exp(-t * 40))) * np.exp(-t * 22)) * 0.7


def blip(d=0.25):
    t = t_(d)
    return (np.sin(2 * np.pi * 1320 * t) + 0.5 * np.sin(2 * np.pi * 1980 * t)) * np.exp(-t * 14) * 0.4


def ding(d=0.7):
    t = t_(d)
    return (np.sin(2 * np.pi * 1046 * t) + 0.4 * np.sin(2 * np.pi * 1568 * t)) * np.exp(-t * 6) * 0.5


def tick(d=0.08):
    t = t_(d); return np.sin(2 * np.pi * 1800 * t) * np.exp(-t * 60) * 0.6


def scan(d=1.3):
    t = t_(d); f = 400 + 2600 * (t / d) ** 2
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sign(np.sin(ph)) * 0.18 * np.sin(np.pi * t / d) + 0.25 * np.sin(ph) * np.sin(np.pi * t / d)


def impact(d=0.9):
    t = t_(d)
    sub = np.sin(2 * np.pi * (55 * np.exp(-t * 3) + 35) * t) * np.exp(-t * 4)
    nz = lowpass_noise(d, 3000, 400) * np.exp(-t * 14) * 0.5
    return (sub + nz) * 0.9


for name, x in dict(whoosh_up=whoosh(0.5, True), whoosh_down=whoosh(0.45, False), pop=pop(), pop_hi=pop(1175),
                    blip=blip(), ding=ding(), tick=tick(), scan=scan(), impact=impact()).items():
    save("sfx_" + name, x)

# --- música: 15 s, 108 BPM, La menor, pad + pulso + arpegio suave ---
D = 15.0; t = t_(D); bpm = 108; beat = 60 / bpm
chords = [(220.0, 261.6, 329.6), (174.6, 220.0, 261.6), (261.6, 329.6, 392.0), (196.0, 246.9, 293.7)]
m = np.zeros(len(t))
bar = beat * 4
for i, c in enumerate(chords * 4):
    s, e = int(i * bar * SR), min(int((i + 1) * bar * SR), len(t))
    if s >= len(t): break
    seg = t[s:e] - t[s]
    pad = sum(np.sin(2 * np.pi * f * seg) + 0.5 * np.sin(2 * np.pi * f * 2.003 * seg) for f in c) / 6
    m[s:e] += pad * 0.22 * env(e - s, 0.4, 0.4)
    m[s:e] += np.sin(2 * np.pi * (c[0] / 2) * seg) * 0.22 * env(e - s, 0.05, 0.3)
    for k in range(8):  # arpegio 1/8
        a = s + int(k * beat / 2 * SR); L = int(0.28 * SR)
        if a + L > len(t): break
        f = c[k % 3] * 2
        tt = np.arange(L) / SR
        m[a:a + L] += np.sin(2 * np.pi * f * tt) * np.exp(-tt * 9) * 0.10
for k in range(int(D / beat)):  # pulso suave tipo bombo
    a = int(k * beat * SR); L = int(0.25 * SR)
    if a + L > len(t): break
    tt = np.arange(L) / SR
    m[a:a + L] += np.sin(2 * np.pi * (48 + 60 * np.exp(-tt * 30)) * tt) * np.exp(-tt * 9) * 0.28
m *= np.minimum(1, t / 0.8) * np.minimum(1, (D - t) / 1.0)
m /= np.abs(m).max()
save("music", m * 0.9)
print("ok")
