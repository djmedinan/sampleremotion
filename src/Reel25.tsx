import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel25-data";

export const REEL25_FPS = 30;
export const REEL25_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL25_FPS);

export const Reel25: React.FC = () => (
  <ReelTemplate
    data={data}
    src="vive_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.6,scale:1.0},{at:6.54,scale:1.15},{at:9.66,scale:1.0}]}
  />
);
