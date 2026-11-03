import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel72-data";

export const REEL72_FPS = 30;
export const REEL72_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL72_FPS);

export const Reel72: React.FC = () => (
  <ReelTemplate
    data={data}
    src="suertes_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.4,scale:1.0},{at:6.8,scale:1.15},{at:10.2,scale:1.0}]}
  />
);
