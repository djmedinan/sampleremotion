import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Reel, REEL_DURATION, REEL_FPS } from "./Reel";
import { Reel2, REEL2_DURATION, REEL2_FPS } from "./Reel2";
import { Reel3, REEL3_DURATION, REEL3_FPS } from "./Reel3";
import { Reel4, REEL4_DURATION, REEL4_FPS } from "./Reel4";
import { Reel5, REEL5_DURATION, REEL5_FPS } from "./Reel5";
import { Reel6, REEL6_DURATION, REEL6_FPS } from "./Reel6";
import { Reel7, REEL7_DURATION, REEL7_FPS } from "./Reel7";
import { Reel8, REEL8_DURATION, REEL8_FPS } from "./Reel8";
import { Reel9, REEL9_DURATION, REEL9_FPS } from "./Reel9";
import { Reel10, REEL10_DURATION, REEL10_FPS } from "./Reel10";
import { Reel11, REEL11_DURATION, REEL11_FPS } from "./Reel11";
import { Reel12, REEL12_DURATION, REEL12_FPS } from "./Reel12";
import { Reel13, REEL13_DURATION, REEL13_FPS } from "./Reel13";
import { RaulReel, RAUL_DURATION, RAUL_FPS } from "./raul/RaulReel";
import { Reel14, REEL14_DURATION, REEL14_FPS } from "./Reel14";
import { Reel15, REEL15_DURATION, REEL15_FPS } from "./Reel15";
import { MangoDiskReel } from "./mangodisk/MangoDiskReel";
import { DURATION as MD_DURATION, FPS as MD_FPS, HEIGHT as MD_H, WIDTH as MD_W } from "./mangodisk/config";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="MangoDiskReel" component={MangoDiskReel} durationInFrames={MD_DURATION} fps={MD_FPS} width={MD_W} height={MD_H} />
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={REEL_DURATION}
        fps={REEL_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel2"
        component={Reel2}
        durationInFrames={REEL2_DURATION}
        fps={REEL2_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel3"
        component={Reel3}
        durationInFrames={REEL3_DURATION}
        fps={REEL3_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel4"
        component={Reel4}
        durationInFrames={REEL4_DURATION}
        fps={REEL4_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel5"
        component={Reel5}
        durationInFrames={REEL5_DURATION}
        fps={REEL5_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel6"
        component={Reel6}
        durationInFrames={REEL6_DURATION}
        fps={REEL6_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel7"
        component={Reel7}
        durationInFrames={REEL7_DURATION}
        fps={REEL7_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel8"
        component={Reel8}
        durationInFrames={REEL8_DURATION}
        fps={REEL8_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel9"
        component={Reel9}
        durationInFrames={REEL9_DURATION}
        fps={REEL9_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel10"
        component={Reel10}
        durationInFrames={REEL10_DURATION}
        fps={REEL10_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel11"
        component={Reel11}
        durationInFrames={REEL11_DURATION}
        fps={REEL11_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel12"
        component={Reel12}
        durationInFrames={REEL12_DURATION}
        fps={REEL12_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel13"
        component={Reel13}
        durationInFrames={REEL13_DURATION}
        fps={REEL13_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="RaulReel"
        component={RaulReel}
        durationInFrames={RAUL_DURATION}
        fps={RAUL_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel14"
        component={Reel14}
        durationInFrames={REEL14_DURATION}
        fps={REEL14_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel15"
        component={Reel15}
        durationInFrames={REEL15_DURATION}
        fps={REEL15_FPS}
        width={1080}
        height={1920}
      />
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />

    </>
  );
};
