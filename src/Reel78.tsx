import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel78-data";

export const REEL78_FPS = 30;
export const REEL78_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL78_FPS);

export const Reel78: React.FC = () => (
  <ReelTemplate
    data={data}
    src="esti_up.mp4"
    focusX="57%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
