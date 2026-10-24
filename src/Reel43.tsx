import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel43-data";

export const REEL43_FPS = 30;
export const REEL43_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL43_FPS);

export const Reel43: React.FC = () => (
  <ReelTemplate
    data={data}
    src="correcto_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.9,scale:1.0},{at:7.4,scale:1.15}]}
  />
);
