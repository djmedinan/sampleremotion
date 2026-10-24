import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel39-data";

export const REEL39_FPS = 30;
export const REEL39_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL39_FPS);

export const Reel39: React.FC = () => (
  <ReelTemplate
    data={data}
    src="flojo2_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.46,scale:1.0},{at:6.86,scale:1.15}]}
  />
);
