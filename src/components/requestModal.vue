<!---*
* @description  咨询弹窗
* @fileName requestModal.vue
* @author 叶金龙
* @date 2021/08/12 18:36:02
*--->
<template>
  <teleport to=".dialog">
    <div
      :class="[{ pc: !isMobile, mobile: isMobile }, 'dialog_mask']"
      v-if="anwserVisible"
    ></div>
    <div
      :class="[{ pc: !isMobile, mobile: isMobile }, 'dialogBox']"
      v-if="anwserVisible"
    >
      <div class="top">
        <span>
          {{ title }}
        </span>
        <svg-icon icon-class="close" @click.native="simpleClose" />
      </div>
      <div class="content">
        <div class="imgBox">
          <img :src="'./img/request.png'" />
        </div>
        <div class="title">合作咨询：贺小姐</div>
        <div class="notice">扫码添加微信好友并备注来意</div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  inject,
  SetupContext,
} from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {
    anwserVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "提示",
      required: true,
    },
  },
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({});
    let simpleClose = () => {
      ctx.emit("update:anwserVisible", false);
    };
    return {
      simpleClose,
      isMobile: inject("isMobile"),
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang="scss">
.pc.dialogBox,
.mobile.dialogBox {
  .content {
    padding: 32px;
    .imgBox {
      width: 148px;
      height: 148px;
      margin: 0 auto;
      border: 1px solid #cccccc;
      border-radius: 4px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 14px;
      line-height: 20px;
      color: #202d40;
      margin-top: 16px;
    }
    .notice {
      font-size: 12px;
      line-height: 20px;
      color: #909499;
      margin-top: 4px;
    }
  }
}
.mobile.dialogBox {
  .content {
  }
}
</style>
