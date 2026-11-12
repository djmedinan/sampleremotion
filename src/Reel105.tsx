import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel105-data";

export const REEL105_FPS = 30;
export const REEL105_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL105_FPS);

export const Reel105: React.FC = () => (
  <ReelTemplate
    data={data}
    src="titulo_up.mp4"
    focusX="58%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
