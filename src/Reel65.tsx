import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel65-data";

export const REEL65_FPS = 30;
export const REEL65_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL65_FPS);

export const Reel65: React.FC = () => (
  <ReelTemplate
    data={data}
    src="suficiente_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:6.6,scale:1.15},{at:9.7,scale:1.0}]}
  />
);
