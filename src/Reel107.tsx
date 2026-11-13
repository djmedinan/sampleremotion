import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel107-data";

export const REEL107_FPS = 30;
export const REEL107_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL107_FPS);

export const Reel107: React.FC = () => (
  <ReelTemplate
    data={data}
    src="equipaje_up.mp4"
    focusX="58%"
    zoomOrigin="50% 30%"
    toggles={[{at:0,scale:1.15},{at:3.73,scale:1.0},{at:6.37,scale:1.15},{at:9.77,scale:1.0}]}
    headline={{ text: "🚨 En aeropuertos, no cargues maletas ajenas.", hi: "no cargues maletas ajenas." }}
  />
);
