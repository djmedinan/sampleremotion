import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel37-data";

export const REEL37_FPS = 30;
export const REEL37_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL37_FPS);

export const Reel37: React.FC = () => (
  <ReelTemplate
    data={data}
    src="grok_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.74,scale:1.0},{at:7.1,scale:1.15}]}
  />
);
