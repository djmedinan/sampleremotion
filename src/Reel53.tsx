import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel53-data";

export const REEL53_FPS = 30;
export const REEL53_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL53_FPS);

export const Reel53: React.FC = () => (
  <ReelTemplate
    data={data}
    src="fe2_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.3,scale:1.0},{at:6.9,scale:1.15},{at:10.3,scale:1.0}]}
  />
);
