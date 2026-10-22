import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel33-data";

export const REEL33_FPS = 30;
export const REEL33_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL33_FPS);

export const Reel33: React.FC = () => (
  <ReelTemplate
    data={data}
    src="etapa_up.mp4"
    focusX="50%"
    zoomOrigin="48% 25%"
    arrow={false}
    toggles={[{at:0,scale:1.15},{at:3.09,scale:1.0},{at:6.33,scale:1.15}]}
  />
);
