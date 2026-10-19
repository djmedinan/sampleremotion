import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel24-data";

export const REEL24_FPS = 30;
export const REEL24_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL24_FPS);

export const Reel24: React.FC = () => (
  <ReelTemplate
    data={data}
    src="verdad1_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:4.06,scale:1.0},{at:7.6,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
