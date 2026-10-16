#!/usr/bin/env python3
"""Search Pixabay for each shot query and save candidate thumbnails + metadata.
usage: PIXABAY_KEY=... pix_search.py queries.json outdir   (key only via env var; never stored)
queries.json: [{"n":1,"kind":"photo","q":"tired woman"}, ...]"""
import json, os, sys, urllib.request, urllib.parse
key = os.environ["PIXABAY_KEY"]
Q = json.load(open(sys.argv[1])); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=40).read()
res = {}
for q in Q:
    base = "https://pixabay.com/api/" + ("videos/" if q["kind"] == "video" else "")
    p = {"key": key, "q": q["q"], "per_page": 8, "safesearch": "true", "lang": "en"}
    if q["kind"] == "photo": p.update(image_type="photo", orientation="vertical", min_height=1280, editors_choice="true")
    try:
        d = json.loads(get(base + "?" + urllib.parse.urlencode(p)))
        if d["totalHits"] < 4 and q["kind"] == "photo":
            p.pop("editors_choice"); d = json.loads(get(base + "?" + urllib.parse.urlencode(p)))
    except Exception as e:
        print("ERR", q, e); continue
    hits = d["hits"][:6]
    res[q["n"]] = []
    for h in hits:
        if q["kind"] == "photo": th = h["webformatURL"].replace("_640", "_340"); big = h["largeImageURL"]
        else:
            v = h["videos"]; th = (v.get("tiny") or v["small"]).get("thumbnail") or f"https://i.vimeocdn.com/video/{h['picture_id']}_295x166.jpg"; big = (v.get("large") or v["medium"])["url"]
        res[q["n"]].append({"id": h["id"], "thumb": th, "big": big, "tags": h["tags"], "w": h.get("imageWidth"), "h": h.get("imageHeight")})
    print(q["n"], q["q"], len(hits))
json.dump(res, open(os.path.join(out, "cands.json"), "w"), ensure_ascii=False)
