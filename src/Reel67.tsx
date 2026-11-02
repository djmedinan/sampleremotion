import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel67-data";

export const REEL67_FPS = 30;
export const REEL67_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL67_FPS);

export const Reel67: React.FC = () => (
  <ReelTemplate
    data={data}
    src="cumple_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.6,scale:1.0},{at:7.0,scale:1.15},{at:10.4,scale:1.0}]}
  />
);
