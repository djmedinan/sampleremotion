import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel109-data";

export const REEL109_FPS = 30;
export const REEL109_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL109_FPS);

export const Reel109: React.FC = () => (
  <ReelTemplate
    data={data}
    src="pfail_up.mp4"
    focusX="58%"
    zoomOrigin="50% 30%"
    headline={{ text: "🚩 No cualquiera merece acceso a tu vida.", hi: "acceso a tu vida." }}
    toggles={[{at:0,scale:1.15},{at:3.25,scale:1.0},{at:6.79,scale:1.15},{at:9.87,scale:1.0}]}
  />
);
