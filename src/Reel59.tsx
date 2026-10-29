import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel59-data";

export const REEL59_FPS = 30;
export const REEL59_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL59_FPS);

export const Reel59: React.FC = () => (
  <ReelTemplate
    data={data}
    src="quejarte_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.4,scale:1.0},{at:6.8,scale:1.15},{at:10.2,scale:1.0}]}
  />
);
