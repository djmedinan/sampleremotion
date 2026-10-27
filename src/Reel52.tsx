import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel52-data";

export const REEL52_FPS = 30;
export const REEL52_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL52_FPS);

export const Reel52: React.FC = () => (
  <ReelTemplate
    data={data}
    src="discl_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.24,scale:1.0},{at:6.5,scale:1.15},{at:10.0,scale:1.0}]}
  />
);
