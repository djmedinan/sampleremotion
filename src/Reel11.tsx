import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel11-data";

export const REEL11_FPS = 30;
export const REEL11_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL11_FPS);

export const Reel11: React.FC = () => (
  <ReelTemplate
    data={data}
    src="este_mes_up.mp4"
    focusX="58%"
    zoomOrigin="50% 30%"
    toggles={[
      { at: 0, scale: 1.15 },
      { at: 3.88, scale: 1.0 }, // "hacerlo"
      { at: 7.0, scale: 1.15 }, // "este mes no puedo"
      { at: 10.12, scale: 1.0 }, // "aclara"
    ]}
  />
);
