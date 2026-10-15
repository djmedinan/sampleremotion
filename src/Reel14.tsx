import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel14-data";

export const REEL14_FPS = 30;
export const REEL14_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL14_FPS);

export const Reel14: React.FC = () => (
  <ReelTemplate
    data={data}
    src="reel2_src_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.65, scale: 1.0 }, // "provisión"
      { at: 7.46, scale: 1.15 }, // "Señor"
      { at: 10.7, scale: 1.0 }, // "necesitas orden"
    ]}
  />
);
