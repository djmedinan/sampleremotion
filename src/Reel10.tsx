import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel10-data";

export const REEL10_FPS = 30;
export const REEL10_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL10_FPS);

export const Reel10: React.FC = () => (
  <ReelTemplate
    data={data}
    src="sueldo_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.88, scale: 1.0 }, // "presupuesto"
      { at: 7.3, scale: 1.15 }, // "rescatas"
      { at: 10.68, scale: 1.0 }, // "dejar de ayudar"
    ]}
  />
);
