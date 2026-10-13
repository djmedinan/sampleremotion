#!/bin/sh
# Pre-upscale a small horizontal source to 1920px tall (Lanczos + light sharpen) so the 9:16 crop stays as sharp as possible.
# usage: scripts/upscale.sh public/in.mp4 public/in_up.mp4
ffmpeg -y -i "$1" -vf "scale=-2:1920:flags=lanczos,unsharp=5:5:0.7:5:5:0.0" \
  -c:v libx264 -crf 21 -preset medium -pix_fmt yuv420p -r 30 -c:a aac -b:a 160k "$2"
