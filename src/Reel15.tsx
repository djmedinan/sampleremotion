import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel15-data";

export const REEL15_FPS = 30;
export const REEL15_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL15_FPS);

export const Reel15: React.FC = () => (
  <ReelTemplate
    data={data}
    src="reel3_src_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.56, scale: 1.0 }, // "necesitaban"
      { at: 7.16, scale: 1.15 }, // "compras algo, te sientes vacío"
      { at: 10.4, scale: 1.0 }, // "impulso"
    ]}
  />
);
