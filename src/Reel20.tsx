import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel20-data";

export const REEL20_FPS = 30;
export const REEL20_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL20_FPS);

export const Reel20: React.FC = () => (
  <ReelTemplate
    data={data}
    src="encierra_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.84, scale: 1.0 },
      { at: 7.44, scale: 1.15 },
      { at: 9.94, scale: 1.0 },
    ]}
  />
);
