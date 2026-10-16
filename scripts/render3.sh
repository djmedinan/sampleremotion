cd /home/user/sampleremotion
for n in 22 23; do [ -s out/reel$n.mp4 ] || npx remotion render Reel$n out/reel$n.mp4 --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell --chrome-mode=headless-shell --gl=swangle --crf=25 > out/logs/r$n.log 2>&1; done
