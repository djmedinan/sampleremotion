import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel86-data";

export const REEL86_FPS = 30;
export const REEL86_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL86_FPS);

export const Reel86: React.FC = () => (
  <ReelTemplate
    data={data}
    src="falta_up.mp4"
    focusX="57%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
