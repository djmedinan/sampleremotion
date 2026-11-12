import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel104-data";

export const REEL104_FPS = 30;
export const REEL104_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL104_FPS);

export const Reel104: React.FC = () => (
  <ReelTemplate
    data={data}
    src="lealtad_up.mp4"
    focusX="58%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
