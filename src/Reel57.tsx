import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel57-data";

export const REEL57_FPS = 30;
export const REEL57_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL57_FPS);

export const Reel57: React.FC = () => (
  <ReelTemplate
    data={data}
    src="exito_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.6,scale:1.0},{at:7.0,scale:1.15},{at:10.4,scale:1.0}]}
  />
);
