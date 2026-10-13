import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel2-data";

export const REEL2_FPS = 30;
export const REEL2_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL2_FPS);

export const Reel2: React.FC = () => (
  <ReelTemplate
    data={data}
    src="no_puedo_up.mp4"
    focusX="55.5%"
    zoomOrigin="50% 30%"
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 1.69, scale: 1.0 },
      { at: 5.65, scale: 1.15 },
      { at: 9.19, scale: 1.0 },
    ]}
  />
);
