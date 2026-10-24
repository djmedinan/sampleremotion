import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { Captions } from "./ReelTemplate";
import * as data from "./reel42-data";

export const REEL42_FPS = 30;
export const REEL42_DURATION = 450; // full length of the source clip (15 s): no cuts, no zoom, only captions added

// Source clip untouched (original timing and audio), scaled to fill 1080x1920, with the house caption style on top.
export const Reel42: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <OffthreadVideo src={staticFile("dias_up.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%" }} />
    <Captions data={data} />
  </AbsoluteFill>
);
