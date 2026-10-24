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
import { Reel16, REEL16_DURATION, REEL16_FPS } from "./Reel16";
import { Reel24, REEL24_DURATION, REEL24_FPS } from "./Reel24";
import { Reel25, REEL25_DURATION, REEL25_FPS } from "./Reel25";
import { Reel26, REEL26_DURATION, REEL26_FPS } from "./Reel26";
import { Oracion, ORACION_DURATION, ORACION_FPS } from "./cine/Oracion";
import { Oracion2, ORACION2_DURATION, ORACION2_FPS } from "./cine/Oracion2";
import { Reel27, REEL27_DURATION, REEL27_FPS } from "./Reel27";
import { Reel28, REEL28_DURATION, REEL28_FPS } from "./Reel28";
import { Reel29, REEL29_DURATION, REEL29_FPS } from "./Reel29";
import { Reel30, REEL30_DURATION, REEL30_FPS } from "./Reel30";
import { Reel31, REEL31_DURATION, REEL31_FPS } from "./Reel31";
import { Reel32, REEL32_DURATION, REEL32_FPS } from "./Reel32";
import { Salmo, SALMO_DURATION, SALMO_FPS } from "./cine/Salmo";
import { Reel33, REEL33_DURATION, REEL33_FPS } from "./Reel33";
import { Provision, PROVISION_DURATION, PROVISION_FPS } from "./cine/Provision";
import { Reel34, REEL34_DURATION, REEL34_FPS } from "./Reel34";
import { Reel35, REEL35_DURATION, REEL35_FPS } from "./Reel35";
import { Reel36, REEL36_DURATION, REEL36_FPS } from "./Reel36";
import { Intento, INTENTO_DURATION, INTENTO_FPS } from "./cine/Intento";
import { Reel37, REEL37_DURATION, REEL37_FPS } from "./Reel37";
import { Despierta, DESPIERTA_DURATION, DESPIERTA_FPS } from "./cine/Despierta";
import { Repaso, REPASO_DURATION, REPASO_FPS } from "./cine/Repaso";
import { Pensar, PENSAR_DURATION, PENSAR_FPS } from "./cine/Pensar";
import { FilePense, FILEPENSE_DURATION, FILEPENSE_FPS } from "./cine/FilePense";
import { Reel18, REEL18_DURATION, REEL18_FPS } from "./Reel18";
import { Reel19, REEL19_DURATION, REEL19_FPS } from "./Reel19";
import { Reel20, REEL20_DURATION, REEL20_FPS } from "./Reel20";
import { Reel21, REEL21_DURATION, REEL21_FPS } from "./Reel21";
import { Reel22, REEL22_DURATION, REEL22_FPS } from "./Reel22";
import { Reel23, REEL23_DURATION, REEL23_FPS } from "./Reel23";
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
      <Composition
        id="Reel16"
        component={Reel16}
        durationInFrames={REEL16_DURATION}
        fps={REEL16_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="FilePense"
        component={FilePense}
        durationInFrames={FILEPENSE_DURATION}
        fps={FILEPENSE_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel18"
        component={Reel18}
        durationInFrames={REEL18_DURATION}
        fps={REEL18_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel19"
        component={Reel19}
        durationInFrames={REEL19_DURATION}
        fps={REEL19_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel20"
        component={Reel20}
        durationInFrames={REEL20_DURATION}
        fps={REEL20_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel21"
        component={Reel21}
        durationInFrames={REEL21_DURATION}
        fps={REEL21_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel22"
        component={Reel22}
        durationInFrames={REEL22_DURATION}
        fps={REEL22_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel23"
        component={Reel23}
        durationInFrames={REEL23_DURATION}
        fps={REEL23_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Pensar"
        component={Pensar}
        durationInFrames={PENSAR_DURATION}
        fps={PENSAR_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Repaso"
        component={Repaso}
        durationInFrames={REPASO_DURATION}
        fps={REPASO_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel24"
        component={Reel24}
        durationInFrames={REEL24_DURATION}
        fps={REEL24_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel25"
        component={Reel25}
        durationInFrames={REEL25_DURATION}
        fps={REEL25_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel26"
        component={Reel26}
        durationInFrames={REEL26_DURATION}
        fps={REEL26_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Oracion"
        component={Oracion}
        durationInFrames={ORACION_DURATION}
        fps={ORACION_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Oracion2"
        component={Oracion2}
        durationInFrames={ORACION2_DURATION}
        fps={ORACION2_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel27"
        component={Reel27}
        durationInFrames={REEL27_DURATION}
        fps={REEL27_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel28"
        component={Reel28}
        durationInFrames={REEL28_DURATION}
        fps={REEL28_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel29"
        component={Reel29}
        durationInFrames={REEL29_DURATION}
        fps={REEL29_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel30"
        component={Reel30}
        durationInFrames={REEL30_DURATION}
        fps={REEL30_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel31"
        component={Reel31}
        durationInFrames={REEL31_DURATION}
        fps={REEL31_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel32"
        component={Reel32}
        durationInFrames={REEL32_DURATION}
        fps={REEL32_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Salmo"
        component={Salmo}
        durationInFrames={SALMO_DURATION}
        fps={SALMO_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel33"
        component={Reel33}
        durationInFrames={REEL33_DURATION}
        fps={REEL33_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Provision"
        component={Provision}
        durationInFrames={PROVISION_DURATION}
        fps={PROVISION_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel34"
        component={Reel34}
        durationInFrames={REEL34_DURATION}
        fps={REEL34_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel35"
        component={Reel35}
        durationInFrames={REEL35_DURATION}
        fps={REEL35_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel36"
        component={Reel36}
        durationInFrames={REEL36_DURATION}
        fps={REEL36_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Intento"
        component={Intento}
        durationInFrames={INTENTO_DURATION}
        fps={INTENTO_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Reel37"
        component={Reel37}
        durationInFrames={REEL37_DURATION}
        fps={REEL37_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Despierta"
        component={Despierta}
        durationInFrames={DESPIERTA_DURATION}
        fps={DESPIERTA_FPS}
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
