<!---*
* @description 全部布局文件
* @fileName index.vue
* @author 叶金龙
* @date 2021/08/11 13:52:13
*--->
<template>
  <div :class="[{ pc: !isMobile, mobile: isMobile }, 'dialog']"></div>
  <div class="main">
    <div class="headerBox">
      <tophead />
    </div>
    <div :class="[{ pc: !isMobile }, 'contentBox']">
      <content />
    </div>
  </div>
  <answearModal
    v-model:anwserVisible="anwserVisible"
    :title="'咨询'"
    v-if="anwserVisible"
  />
  <popBtn :popOpen="popOpen">
    <template
      v-if="
        path &&
        path !== '/advertising' &&
        path !== '/register' &&
        path !== '/ownerRules' &&
        path !== '/agreement'
      "
    >
      <svg-icon icon-class="rules" color="#442BDE" v-if="!isMobile" />
      <span>奖</span>
      <span>励</span>
      <span>规</span>
      <span>则</span>
    </template>
  </popBtn>
</template>

<script lang="ts">
import tophead from "./header.vue";
import content from "./content.vue";
import answearModal from "@/components/requestModal.vue";
import popBtn from "@/components/popBtn.vue";
import { useRouter } from "vue-router";

import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  SetupContext,
  inject,
  watchEffect,
} from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: { tophead, content, answearModal, popBtn },
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({});
    let anwserVisible = ref(false);
    const router = useRouter();
    let path = ref("");
    watchEffect(() => {
      path.value = router.currentRoute.value.fullPath;
    });
    let popOpen = () => {
      if (path.value == "/index/customData") {
        router.push({ path: "/ownerRules" });
      } else if (
        path.value == "/advertising" ||
        path.value == "/register" ||
        path.value == "/ownerRules" ||
        path.value == "/agreement"
      ) {
        anwserVisible.value = true;
      } else {
        return;
      }
    };
    return {
      ...toRefs(data),
      anwserVisible,
      popOpen,
      path,
      isMobile: inject("isMobile"),
    };
  },
});
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  .headerBox {
    position: fixed;
    width: 100%;
    z-index: 1000;
    top: 0;
  }
  .pc.contentBox {
    padding-top: 80px;
  }
}
</style>
