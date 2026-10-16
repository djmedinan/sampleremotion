import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel21-data";

export const REEL21_FPS = 30;
export const REEL21_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL21_FPS);

export const Reel21: React.FC = () => (
  <ReelTemplate
    data={data}
    src="definete_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.54,scale:1.0},{at:7.38,scale:1.15},{at:9.76,scale:1.0}]}
  />
);
