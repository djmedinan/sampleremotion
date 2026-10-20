import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel27-data";

export const REEL27_FPS = 30;
export const REEL27_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL27_FPS);

export const Reel27: React.FC = () => (
  <ReelTemplate
    data={data}
    src="decir_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.6,scale:1.0},{at:6.64,scale:1.15},{at:9.62,scale:1.0}]}
  />
);
