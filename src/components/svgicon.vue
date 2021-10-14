<!---*
* @description 
* @fileName svgicon.vue
* @author 叶金龙
* @date 2021/08/11 11:26:55
*--->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, SetupContext, computed } from "vue";
interface Data {}
export default defineComponent({
  name: "",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#889aa4",
    },
  },
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({});
    return {
      ...toRefs(data),
      iconName: computed(() => `#icon-${props.iconClass}`),
      svgClass: computed(() => {
        if (props.className) {
          return `svg-icon ${props.className}`;
        }
        return "svg-icon";
      }),
    };
  },
});
</script>

<style scoped lang="scss"></style>
