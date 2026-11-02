import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel68-data";

export const REEL68_FPS = 30;
export const REEL68_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL68_FPS);

export const Reel68: React.FC = () => (
  <ReelTemplate
    data={data}
    src="trampa_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:6.9,scale:1.15},{at:10.3,scale:1.0}]}
  />
);
