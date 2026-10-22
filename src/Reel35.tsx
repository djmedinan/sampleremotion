import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel35-data";

export const REEL35_FPS = 30;
export const REEL35_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL35_FPS);

export const Reel35: React.FC = () => (
  <ReelTemplate
    data={data}
    src="callerlo_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.08,scale:1.0},{at:6.3,scale:1.15},{at:9.1,scale:1.0}]}
  />
);
