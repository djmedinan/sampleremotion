import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel82-data";

export const REEL82_FPS = 30;
export const REEL82_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL82_FPS);

export const Reel82: React.FC = () => (
  <ReelTemplate
    data={data}
    src="grosero_up.mp4"
    focusX="57%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
