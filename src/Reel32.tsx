import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel32-data";

export const REEL32_FPS = 30;
export const REEL32_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL32_FPS);

export const Reel32: React.FC = () => (
  <ReelTemplate
    data={data}
    src="siempre_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.06,scale:1.0},{at:6.14,scale:1.15},{at:8.84,scale:1.0}]}
  />
);
