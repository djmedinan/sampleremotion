import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel47-data";

export const REEL47_FPS = 30;
export const REEL47_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL47_FPS);

export const Reel47: React.FC = () => (
  <ReelTemplate
    data={data}
    src="presta_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.78,scale:1.0},{at:7.04,scale:1.15}]}
  />
);
