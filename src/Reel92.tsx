import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel92-data";

export const REEL92_FPS = 30;
export const REEL92_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL92_FPS);

export const Reel92: React.FC = () => (
  <ReelTemplate
    data={data}
    src="felicidad_up.mp4"
    focusX="57%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
