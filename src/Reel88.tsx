import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel88-data";

export const REEL88_FPS = 30;
export const REEL88_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL88_FPS);

export const Reel88: React.FC = () => (
  <ReelTemplate
    data={data}
    src="yo_up.mp4"
    focusX="57%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
