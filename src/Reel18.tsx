import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel18-data";

export const REEL18_FPS = 30;
export const REEL18_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL18_FPS);

export const Reel18: React.FC = () => (
  <ReelTemplate
    data={data}
    src="flojo_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.6, scale: 1.0 },
      { at: 7.32, scale: 1.15 },
      { at: 10.21, scale: 1.0 },
    ]}
  />
);
