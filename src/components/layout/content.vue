<!---*
* @description 内容展示区域
* @fileName content.vue
* @author 叶金龙
* @date 2021/08/11 13:56:28
*--->
<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({});
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang="scss"></style>
