<!---*
* @description 
* @fileName popBtn.vue
* @author 叶金龙
* @date 2021/08/13 16:43:32
*--->
<template>
  <div
    :class="[{ pc: !isMobile, mobile: isMobile }, 'requestBox']"
    @click.native="popOpen"
  >
    <slot>
      <svg-icon icon-class="request" color="#442BDE" v-if="!isMobile" />
      <span>咨</span>
      <span>询</span>
    </slot>
    <slot name="rules"> </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, SetupContext, inject } from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {
    popOpen: {
      type: Function,
      default() {
        return () => false;
      },
    },
  },
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({});
    let popOpen = props.popOpen;
    return {
      popOpen,
      isMobile: inject("isMobile"),
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss">
.pc.requestBox {
  position: fixed;
  right: 0;
  top: 60%;
  z-index: 1000;
  border: 1px solid #4028d0;
  box-sizing: border-box;
  border-radius: 4px 0px 0px 4px;
  width: 36px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  font-weight: 600;
  color: #442bde;
  .svg-icon {
    width: 12px;
    height: 12px;
  }
  span {
    font-size: 14px;
  }
}

.mobile.requestBox {
  position: fixed;
  right: 0;
  top: 10%;
  z-index: 1000;
  box-sizing: border-box;
  background: rgba(52, 57, 93, 0.69);
  border-radius: 30px 0px 0px 30px;
  padding: 2px 8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
  span {
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
