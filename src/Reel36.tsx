import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel36-data";

export const REEL36_FPS = 30;
export const REEL36_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL36_FPS);

export const Reel36: React.FC = () => (
  <ReelTemplate
    data={data}
    src="cansancio_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.04,scale:1.0},{at:6.2,scale:1.15},{at:8.9,scale:1.0}]}
  />
);
