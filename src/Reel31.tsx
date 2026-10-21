import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel31-data";

export const REEL31_FPS = 30;
export const REEL31_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL31_FPS);

export const Reel31: React.FC = () => (
  <ReelTemplate
    data={data}
    src="resultados_up.mp4"
    focusX="59%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:2.68,scale:1.0},{at:6.22,scale:1.15},{at:9.38,scale:1.0}]}
  />
);
