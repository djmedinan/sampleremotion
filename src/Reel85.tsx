import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel85-data";

export const REEL85_FPS = 30;
export const REEL85_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL85_FPS);

export const Reel85: React.FC = () => (
  <ReelTemplate
    data={data}
    src="mal_up.mp4"
    focusX="57%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
