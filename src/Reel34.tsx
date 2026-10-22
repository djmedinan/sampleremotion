import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel34-data";

export const REEL34_FPS = 30;
export const REEL34_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL34_FPS);

export const Reel34: React.FC = () => (
  <ReelTemplate
    data={data}
    src="tenerfe_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.4,scale:1.0},{at:6.8,scale:1.15},{at:10.1,scale:1.0}]}
  />
);
