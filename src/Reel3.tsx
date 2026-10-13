import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel3-data";

export const REEL3_FPS = 30;
export const REEL3_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL3_FPS);

export const Reel3: React.FC = () => (
  <ReelTemplate
    data={data}
    src="desastre_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.19, scale: 1.0 },
      { at: 6.03, scale: 1.15 },
      { at: 9.31, scale: 1.0 },
    ]}
  />
);
