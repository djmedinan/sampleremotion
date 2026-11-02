import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel69-data";

export const REEL69_FPS = 30;
export const REEL69_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL69_FPS);

export const Reel69: React.FC = () => (
  <ReelTemplate
    data={data}
    src="diez_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.4,scale:1.0},{at:6.6,scale:1.15},{at:9.9,scale:1.0}]}
  />
);
