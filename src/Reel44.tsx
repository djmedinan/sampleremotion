import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel44-data";

export const REEL44_FPS = 30;
export const REEL44_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL44_FPS);

export const Reel44: React.FC = () => (
  <ReelTemplate
    data={data}
    src="dinerot_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:4.68,scale:1.0},{at:7.54,scale:1.15},{at:10.88,scale:1.0}]}
  />
);
