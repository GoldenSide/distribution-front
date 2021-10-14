<!---*
* @description 
* @fileName qrcode.vue
* @author 叶金龙
* @date 2021/08/23 10:37:39
*--->
<template>
    <div :class="[{ pc: !isMobile, mobile: isMobile }, 'poster-box']">
        <div class="poster-img"><img :src="'./img/poster-er.jpg'" /></div>
        <button class="primary download" @click="imageToCanvas()">下载海报</button>
        <canvas id="myCanvas" width="750" height="1334" style="display: none"></canvas>
        <canvas id="er_canvas" width="140" height="140" style="display: none"></canvas>
    </div>
</template>

<script lang="ts">
// import QRCodeVue3 from "qrcode-vue3";
import QRcode from "qrcode"
import { imageToCanvas } from "@/utils/downLoad";
import { defineComponent, reactive, toRefs, SetupContext, inject } from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {
    chanel: {
      required: true,
      type: Object,
    },
    sizeObj: {
      required: true,
      default() {
        return {
          width: 140,
          height: 140,
        };
      },
    },
  },
  components: {  },
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({});

    
    let imageToCanvas = () => {
        var qr_code = ""
        var er_canvas = document.getElementById("er_canvas")
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        QRcode.toCanvas(er_canvas, "https://www-test.xshoppy.com/register?distribution=85be56", error=>{
            if(error) {
                console.log("生成海报失败!")
            }
        })
        qr_code = er_canvas.toDataURL();

        
        
        var img = new Image()
        img.src = "./img/poster.jpg"
        //图片加载完后，将其显示在canvas中
        img.onload = function(){
            context.drawImage(this, 0, 0)

            var qr_img = new Image()
            qr_img.src = qr_code
            qr_img.onload = function(){
                context.drawImage(this, 488, 1048, 140, 140)
                var logo_img = new Image()
                logo_img.src = "./img/logo.png"
                logo_img.onload = function(){
                    context.drawImage(this, 544, 1104, 28, 28)
                    // var dom = document.createElement("a");
                    // dom.href = canvas.toDataURL("image/png");
                    // dom.download = new Date().getTime() + ".png";
                    // dom.click();

                }
            }
        }
        

    }
    
    return {
      ...toRefs(data),
      imageToCanvas,
      isMobile: inject("isMobile"),
    };
  },
});
</script>

<style scoped lang="scss">
.pc.poster-box, 
.mobile.poster-box {
    width: 140px;
    height: 140px;
    img {
        max-height: 140px;
    }
}

</style>
