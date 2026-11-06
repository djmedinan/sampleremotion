import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel80-data";

export const REEL80_FPS = 30;
export const REEL80_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL80_FPS);

export const Reel80: React.FC = () => (
  <ReelTemplate
    data={data}
    src="gen2_up.mp4"
    focusX="57%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
