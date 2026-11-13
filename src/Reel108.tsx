import { ReelTemplate } from "./ReelTemplate";
import * as data from "./reel106-data";

export const REEL108_FPS = 30;
export const REEL108_DURATION = Math.ceil(data.TOTAL_SECONDS * REEL108_FPS);

export const Reel108: React.FC = () => (
  <ReelTemplate
    data={data}
    src="mistico_up.mp4"
    focusX="58%"
    zoomOrigin="50% 30%"
    headline={{ text: "👀 4 señales de que tienes un aura poderosa", hi: "aura poderosa" }}
    toggles={[{at:0,scale:1.15},{at:3.5,scale:1.0},{at:7.0,scale:1.15},{at:10.5,scale:1.0}]}
  />
);
