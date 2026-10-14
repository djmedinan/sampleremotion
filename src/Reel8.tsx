import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel8-data";

export const REEL8_FPS = 30;
export const REEL8_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL8_FPS);

export const Reel8: React.FC = () => (
  <ReelTemplate
    data={data}
    src="buena_persona_up.mp4"
    focusX="66.6%" // face sits right of centre in the source, so shift the crop window
    zoomOrigin="50% 30%"
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.91, scale: 1.0 },
      { at: 7.31, scale: 1.15 },
      { at: 10.4, scale: 1.0 },
    ]}
  />
);
