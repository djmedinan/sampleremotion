import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel40-data";

export const REEL40_FPS = 30;
export const REEL40_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL40_FPS);

export const Reel40: React.FC = () => (
  <ReelTemplate
    data={data}
    src="quieto_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.9,scale:1.0},{at:7.4,scale:1.15}]}
  />
);
