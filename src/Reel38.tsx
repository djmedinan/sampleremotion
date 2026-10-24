import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel38-data";

export const REEL38_FPS = 30;
export const REEL38_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL38_FPS);

export const Reel38: React.FC = () => (
  <ReelTemplate
    data={data}
    src="viviendo_up.mp4"
    focusX="52%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.12,scale:1.0},{at:6.78,scale:1.15}]}
  />
);
