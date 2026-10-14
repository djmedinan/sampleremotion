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
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
