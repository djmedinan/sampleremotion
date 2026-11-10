import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel94-data";

export const REEL94_FPS = 30;
export const REEL94_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL94_FPS);

export const Reel94: React.FC = () => (
  <ReelTemplate
    data={data}
    src="masjoven_up.mp4"
    focusX="57%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
