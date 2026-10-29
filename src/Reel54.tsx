import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel54-data";

export const REEL54_FPS = 30;
export const REEL54_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL54_FPS);

export const Reel54: React.FC = () => (
  <ReelTemplate
    data={data}
    src="jodido_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.6,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
