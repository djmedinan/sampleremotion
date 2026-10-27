import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel51-data";

export const REEL51_FPS = 30;
export const REEL51_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL51_FPS);

export const Reel51: React.FC = () => (
  <ReelTemplate
    data={data}
    src="cafe_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.2,scale:1.0},{at:7.4,scale:1.15},{at:10.98,scale:1.0}]}
  />
);
