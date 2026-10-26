import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel49-data";

export const REEL49_FPS = 30;
export const REEL49_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL49_FPS);

export const Reel49: React.FC = () => (
  <ReelTemplate
    data={data}
    src="matri_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.88,scale:1.0},{at:7.76,scale:1.15},{at:11.02,scale:1.0}]}
  />
);
