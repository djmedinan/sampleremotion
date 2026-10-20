import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel29-data";

export const REEL29_FPS = 30;
export const REEL29_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL29_FPS);

export const Reel29: React.FC = () => (
  <ReelTemplate
    data={data}
    src="suerte_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:4.24,scale:1.0},{at:8.18,scale:1.15},{at:10.8,scale:1.0}]}
  />
);
