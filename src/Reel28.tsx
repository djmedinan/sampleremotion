import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel28-data";

export const REEL28_FPS = 30;
export const REEL28_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL28_FPS);

export const Reel28: React.FC = () => (
  <ReelTemplate
    data={data}
    src="todavia_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.34,scale:1.0},{at:6.9,scale:1.15},{at:10.14,scale:1.0}]}
  />
);
