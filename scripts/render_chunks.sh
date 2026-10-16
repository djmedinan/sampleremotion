#!/bin/sh
# Resumable render: splits a composition into N frame ranges, renders each (skipping finished ones), then muxes the audio.
# usage: render_chunks.sh <CompositionId> <totalFrames> <chunks> <audio.mp3> <out.mp4>
ID=$1; TOTAL=$2; N=$3; AUDIO=$4; OUT=$5
B=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
DIR=out/chunks_$ID; mkdir -p "$DIR"
SIZE=$(( (TOTAL + N - 1) / N ))
i=0; : > "$DIR/list.txt"
while [ $i -lt $N ]; do
  S=$(( i * SIZE )); E=$(( S + SIZE - 1 )); [ $E -ge $TOTAL ] && E=$(( TOTAL - 1 ))
  F="$DIR/part_$i.mp4"
  if [ ! -e "$F.done" ]; then
    npx remotion render "$ID" "$F" --frames=$S-$E --muted --browser-executable=$B --chrome-mode=headless-shell --gl=swangle --crf=25 --concurrency=4 && touch "$F.done" || exit 1
  fi
  echo "file 'part_$i.mp4'" >> "$DIR/list.txt"
  i=$(( i + 1 ))
done
ffmpeg -y -loglevel error -f concat -safe 0 -i "$DIR/list.txt" -i "$AUDIO" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest "$OUT"
echo finished
