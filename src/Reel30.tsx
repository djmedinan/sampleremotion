import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel30-data";

export const REEL30_FPS = 30;
export const REEL30_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL30_FPS);

export const Reel30: React.FC = () => (
  <ReelTemplate
    data={data}
    src="honesto_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:4.66,scale:1.0},{at:7.9,scale:1.15},{at:10.52,scale:1.0}]}
  />
);
