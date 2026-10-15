#!/usr/bin/env python3
"""Build the editable timeline for the Raúl reel: jump cuts, A-roll face tracking, B-roll scenes, captions, zoom schedule and the mixed audio.
usage: build_raul.py <scratch_dir_with_music_and_sfx>
Source times in SCENES are seconds of the ORIGINAL video; they are mapped to the cut timeline here.
"""
import json, subprocess, sys, unicodedata, statistics
S = sys.argv[1]
W = json.load(open("scripts/raul.words.json"))
FACE = json.load(open("scripts/raul.face.json"))
LEAD, TAIL, GAP = 0.05, 0.10, 0.28
KEYS = {"salario","dinero","cuentas","multiplica","decretos","agradece","consagra","miedo","sabiduria","gratitud","disciplina","escasez","impulsividad","fruto","multiplicar","multiplique","provision","gracias","senor","dios","amen","guardalo","sigueme","bendice","inteligencia","panes","peces"}
FIX = {"veras": "verás", "Primero": "Primer", "señor": "Señor", "Actúen": "Actúen"}

def norm(s): return "".join(c for c in unicodedata.normalize("NFD", s.lower()) if c.isalpha() and not unicodedata.combining(c))

# ---- words (with small text fixes)
words = []
for w in W:
    t = w["t"].strip(); base = t.rstrip(".,;:¿?!")
    punct = t[len(base):]
    base = FIX.get(base, base)
    words.append({"t": base + punct, "s": w["s"], "e": w["e"]})

# ---- jump cuts: drop gaps longer than GAP, keep a little air around every phrase
segs, cur = [], None
for w in words:
    if cur and w["s"] - cur[1] <= GAP: cur[1] = w["e"]
    else: cur = [w["s"], w["e"]]; segs.append(cur)
segs = [[max(0, a - LEAD), b + TAIL] for a, b in segs]
for i in range(1, len(segs)):
    segs[i][0] = max(segs[i][0], segs[i-1][1])
offs, t = [], 0.0
for a, b in segs: offs.append(t); t += b - a
TOTAL = t + 0.25

def m(x, snap="next"):
    """source time -> cut-timeline time"""
    for k, ((a, b), o) in enumerate(zip(segs, offs)):
        if a - 1e-6 <= x <= b + 1e-6: return o + x - a
        if x < a: return o if snap == "next" else (offs[k-1] + segs[k-1][1] - segs[k-1][0])
    return TOTAL

# ---- B-roll scenes (source seconds), each tied to what Raúl says at that moment
SCENES = [
 (1.0, 2.5, 380034, "zoomIn", "no te alcanza cada mes"),
 (5.5, 6.7, 87146, "panLeft", "pagar tus cuentas"),
 (7.4, 8.9, 298813, "zoomIn", "se multiplica tu dinero"),
 (16.9, 18.4, 50621, "panRight", "factura o bill"),
 (19.9, 21.2, 7515, "still", "detente unos minutos"),
 (22.4, 24.1, 75702, "zoomIn", "agradece y consagra ese dinero"),
 (25.2, 26.6, 174262, "panLeft", "no desde el miedo"),
 (31.8, 33.8, 362961, "panRight", "todo lo que tengo viene de ti"),
 (34.5, 36.0, 59139, "still", "consagro este dinero"),
 (36.3, 37.8, 368623, "panLeft", "administrarlo correctamente"),
 (38.2, 40.0, 349355, "zoomIn", "repitamos esta oración"),
 (43.3, 44.9, 357743, "zoomIn", "disciplina y administración"),
 (48.2, 50.0, 289712, "panRight", "mentalidad de escasez"),
 (50.4, 52.2, 208082, "still", "desorganización e impulsividad"),
 (64.1, 65.8, 380225, "zoomIn", "fruto de mi trabajo"),
 (66.3, 68.5, 232561, "panRight", "multiplicar los recursos"),
 (70.8, 72.4, 337745, "zoomIn", "que Dios multiplique"),
 (72.6, 73.7, 365625, "still", "Amén"),
 (77.9, 79.2, 340637, "zoomIn", "dar gracias"),
 (83.6, 85.2, 14239, "panLeft", "los panes y los peces"),
 (85.4, 86.5, 332390, "zoomIn", "Jesús dio gracias"),
 (93.6, 95.0, 296971, "panRight", "la provisión"),
]
scenes = []
for a, b, cid, mo, note in SCENES:
    fa, fb = m(a), m(b, "prev")
    if fb - fa >= 0.7: scenes.append({"id": str(cid), "from": round(fa, 3), "to": round(fb, 3), "motion": mo, "note": note})
broll_s = sum(s["to"] - s["from"] for s in scenes)

# ---- captions: 2-3 words, word-by-word, keywords in yellow
cw = []
for w in words:
    s, e = m(w["s"] + 0.001), m(min(w["e"], next(b for a, b in segs if a <= w["s"] + 0.001 <= b)), "prev")
    txt = w["t"]; base = txt.rstrip(".,;:¿?!")
    cw.append({"t": base.upper() + ("" if not txt[len(base):] else ""), "s": round(s, 3), "e": round(e, 3), "key": norm(base) in KEYS, "end": bool(txt[len(base):])})
groups, g = [], []
for w in cw:
    g.append(w)
    if len(g) >= 3 or w["end"] or (len(g) == 2 and sum(len(x["t"]) for x in g) > 11): groups.append(g); g = []
if g: groups.append(g)
caps = [{"words": x, "from": x[0]["s"], "to": x[-1]["e"]} for x in groups]
for i in range(len(caps) - 1): caps[i]["to"] = caps[i+1]["from"]
caps[-1]["to"] = TOTAL

# ---- A-roll face tracking -> objectPosition x% (crop window follows the face)
xs = [f[1] for f in FACE]
med = [statistics.median(xs[max(0, i-2):i+3]) for i in range(len(xs))]
sm = [sum(med[max(0, i-3):i+4]) / len(med[max(0, i-3):i+4]) for i in range(len(med))]
focus = []
for i in range(0, len(sm), 2):
    ts = FACE[i][0]
    if any(a <= ts <= b for a, b in segs):
        p = (540 - sm[i] * 2356) / (1080 - 2356) * 100
        focus.append([round(m(ts), 2), round(min(100, max(0, p)), 1)])
# ---- zoom schedule on emphasis words (A-roll), >=3.2 s apart, ends at 100% before the Ken Burns
EMPH = {"salario","decretos","multiplica","dinero","miedo","sabiduría","gratitud","escasez","impulsividad","disciplina","multiplicar","señor","dios","gracias","provisión","importante","guárdalo","sígueme"}
em = [x["s"] for x in cw if norm(x["t"]) in {norm(e) for e in EMPH}]
tog, last, sc = [(0, 1.15)], 0, 1.15
KB = TOTAL - 3
while True:
    c = [t for t in em if 3.2 <= t - last <= 4.6]
    nxt = c[0] if c else last + 3.6
    if nxt >= KB - 1.5: break
    sc = 1.0 if sc > 1 else 1.15
    tog.append((round(nxt, 2), sc)); last = nxt
if tog[-1][1] > 1: tog.append((round(KB - 1.0, 2), 1.0))

# ---- audio: concatenated voice (cut at the same points) + music + discreet whooshes
n = len(segs)
fl = []
for i, (a, b) in enumerate(segs):
    d = b - a
    fl.append(f"[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.008,afade=t=out:st={max(0,d-0.008):.3f}:d=0.008[a{i}]")
fl.append("".join(f"[a{i}]" for i in range(n)) + f"concat=n={n}:v=0:a=1,afftdn=nf=-28,loudnorm=I=-16:TP=-1.5,apad=pad_dur=3[v]")
fl.append(f"[1:a]atrim=0:{TOTAL+1:.2f},asetpts=PTS-STARTPTS,loudnorm=I=-31:TP=-3,afade=t=in:st=0:d=2,afade=t=out:st={TOTAL-3.5:.2f}:d=3.5[m]")
sfx = [(s["from"], 2) for s in scenes if s["note"] in ("no te alcanza cada mes","se multiplica tu dinero","todo lo que tengo viene de ti","fruto de mi trabajo","Amén","los panes y los peces")]
sfx.append((m(100.6), 3))
ins, k = ["-i", "raul_src", "-i", S + "/ra/music324.mp3"], 2
mix = ["[v]", "[m]"]
for t, which in sfx:
    ins += ["-i", S + ("/ra/sfx/1485.mp3" if which == 2 else "/ra/sfx/1491.mp3")]
    fl.append(f"[{k}:a]volume=-21dB,adelay={int(max(0,t-0.05)*1000)}|{int(max(0,t-0.05)*1000)}[s{k}]"); mix.append(f"[s{k}]"); k += 1
fl.append("".join(mix) + f"amix=inputs={len(mix)}:duration=first:normalize=0,atrim=0:{TOTAL:.2f}")
json.dump({"inputs": ins, "filter": ";".join(fl)}, open(S + "/ra/audio_plan.json", "w"))

json.dump(segs, open(S + "/ra/segs.json", "w"))
out = "// Generated by scripts/build_raul.py (seconds on the cut timeline)\n"
out += f"export const SEGMENTS = {json.dumps([[round(a,3),round(b,3)] for a,b in segs])} as const;\n"
out += f"export const AROLL_FOCUS = {json.dumps(focus)} as const;\n"
out += f"export const SCENES = {json.dumps(scenes, ensure_ascii=False)} as const;\n"
out += f"export const CAPTIONS = {json.dumps(caps, ensure_ascii=False)} as const;\n"
out += f"export const TOGGLES = {json.dumps([{'at':a,'scale':b} for a,b in tog])} as const;\n"
out += f"export const TOTAL_SECONDS = {TOTAL:.3f};\n"
open("src/raul/raul-data.ts", "w").write(out)
print(f"segments {n}, cut duration {TOTAL:.1f}s of 105.3s, broll {len(scenes)} shots = {broll_s:.1f}s ({100*broll_s/TOTAL:.0f}%), captions {len(caps)}, toggles {len(tog)}")
