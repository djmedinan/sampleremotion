import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel106-data";

export const REEL106_FPS = 30;
export const REEL106_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL106_FPS);

export const Reel106: React.FC = () => (
  <ReelTemplate
    data={data}
    src="mistico_up.mp4"
    focusX="58%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
