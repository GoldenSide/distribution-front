<!---*
* @description   海报测试
* @fileName index.vue
* @author 叶金龙
* @date 2021/08/25 10:49:35
*--->
<template>
  <div ref="qrcode"></div>
  <br />
  <br />
  <br />
  <button @click.native="download">下载海报</button>
</template>

<script lang="ts">
import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  Extension,
} from "qr-code-styling";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
  ref,
} from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({});
    const options = {
      width: 300,
      height: 300,
      type: "svg" as DrawType,
      data: "https://www-test.xshoppy.com/register?distribution=85be56",
      image: "/favicon.ico",
      margin: 10,
      qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: "Byte" as Mode,
        errorCorrectionLevel: "H" as ErrorCorrectionLevel,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.2,
        margin: 2,
        crossOrigin: "anonymous",
      },
      dotsOptions: {
        color: "#41b583",
        gradient: {
          type: "linear", // 'radial'
          rotation: 0,
          colorStops: [
            // { offset: 0, color: "#8688B2" },
            // { offset: 1, color: "#77779C" },
            { offset: 0, color: "#26249a" },
            { offset: 1, color: "#26249a" },
          ],
        },
        type: "classy" as DotType,
      },
      backgroundOptions: {
        color: "#ffffff",
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
        // },
      },
      cornersSquareOptions: {
        color: "#000",
        width: 50,
        height: 50,
        // type: "extra-rounded" as CornerSquareType,
        type: "dot" as CornerSquareType,
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
        // },
      },
      cornersDotOptions: {
        color: "#000",
        type: "dot" as CornerDotType,
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
        // },
      },
    };
    let codeInstance = new QRCodeStyling(options);
    // let qrcode = ref(null);
    onMounted(() => {
      // codeInstance.append(qrcode.value);
      codeInstance._getElement().then((res) => {
        let canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 333;
        let context = canvas.getContext("2d");
        let buffer_img = new Image();
        buffer_img.src = "./girl.jpg";
        buffer_img.onload = function () {
          context.drawImage(buffer_img, 0, 0, 500, 333, 0, 0, 500, 333);
          context.drawImage(res, 0, 0, 300, 300, 380, 200, 100, 100);
          let img = document.getElementById("sss");
          img.setAttribute("src", canvas.toDataURL("image/png"));
        };
      });
    });
    let download = () => {
      codeInstance.download({
        extension: "png",
      });
    };
    return {
      // qrcode,
      download,
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang="scss"></style>
