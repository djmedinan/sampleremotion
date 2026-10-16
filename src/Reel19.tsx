import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel19-data";

export const REEL19_FPS = 30;
export const REEL19_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL19_FPS);

export const Reel19: React.FC = () => (
  <ReelTemplate
    data={data}
    src="humor_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.7, scale: 1.0 },
      { at: 7.94, scale: 1.15 },
      { at: 9.61, scale: 1.0 },
    ]}
  />
);
