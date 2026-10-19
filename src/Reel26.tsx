import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel26-data";

export const REEL26_FPS = 30;
export const REEL26_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL26_FPS);

export const Reel26: React.FC = () => (
  <ReelTemplate
    data={data}
    src="tratar_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.8,scale:1.0},{at:6.9,scale:1.15},{at:10.1,scale:1.0}]}
  />
);
