import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel23-data";

export const REEL23_FPS = 30;
export const REEL23_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL23_FPS);

export const Reel23: React.FC = () => (
  <ReelTemplate
    data={data}
    src="promesa_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:4.24,scale:1.0},{at:7.98,scale:1.15},{at:11.1,scale:1.0}]}
  />
);
