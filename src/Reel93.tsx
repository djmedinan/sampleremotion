import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel93-data";

export const REEL93_FPS = 30;
export const REEL93_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL93_FPS);

export const Reel93: React.FC = () => (
  <ReelTemplate
    data={data}
    src="tumismo_up.mp4"
    focusX="57%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
