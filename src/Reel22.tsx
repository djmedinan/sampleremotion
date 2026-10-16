import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel22-data";

export const REEL22_FPS = 30;
export const REEL22_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL22_FPS);

export const Reel22: React.FC = () => (
  <ReelTemplate
    data={data}
    src="fallar_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.76,scale:1.0},{at:7.4,scale:1.15},{at:10.76,scale:1.0}]}
  />
);
