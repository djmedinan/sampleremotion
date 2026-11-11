import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel100-data";

export const REEL100_FPS = 30;
export const REEL100_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL100_FPS);

export const Reel100: React.FC = () => (
  <ReelTemplate
    data={data}
    src="alumno_up.mp4"
    focusX="58%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
