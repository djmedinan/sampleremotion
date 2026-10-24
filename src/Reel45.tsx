import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel45-data";

export const REEL45_FPS = 30;
export const REEL45_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL45_FPS);

export const Reel45: React.FC = () => (
  <ReelTemplate
    data={data}
    src="gratis_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.9,scale:1.0},{at:7.2,scale:1.15},{at:10.52,scale:1.0}]}
  />
);
