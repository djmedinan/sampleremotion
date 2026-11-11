import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel99-data";

export const REEL99_FPS = 30;
export const REEL99_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL99_FPS);

export const Reel99: React.FC = () => (
  <ReelTemplate
    data={data}
    src="caro_up.mp4"
    focusX="58%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
