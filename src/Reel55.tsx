import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel55-data";

export const REEL55_FPS = 30;
export const REEL55_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL55_FPS);

export const Reel55: React.FC = () => (
  <ReelTemplate
    data={data}
    src="mets_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.3,scale:1.0},{at:6.9,scale:1.15},{at:10.3,scale:1.0}]}
  />
);
