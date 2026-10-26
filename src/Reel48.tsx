import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel48-data";

export const REEL48_FPS = 30;
export const REEL48_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL48_FPS);

export const Reel48: React.FC = () => (
  <ReelTemplate
    data={data}
    src="decir2_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.7,scale:1.0},{at:7.66,scale:1.15},{at:11.68,scale:1.0}]}
  />
);
