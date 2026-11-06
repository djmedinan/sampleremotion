import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel81-data";

export const REEL81_FPS = 30;
export const REEL81_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL81_FPS);

export const Reel81: React.FC = () => (
  <ReelTemplate
    data={data}
    src="nino_up.mp4"
    focusX="57%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
