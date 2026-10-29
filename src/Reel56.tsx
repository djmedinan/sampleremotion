import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel56-data";

export const REEL56_FPS = 30;
export const REEL56_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL56_FPS);

export const Reel56: React.FC = () => (
  <ReelTemplate
    data={data}
    src="trabajo_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.4,scale:1.0},{at:6.8,scale:1.15},{at:10.2,scale:1.0}]}
  />
);
