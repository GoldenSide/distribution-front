<!---*
* @description  创建渠道
* @fileName createLink.vue
* @author 叶金龙
* @date 2021/08/13 14:02:19
*--->
<template>
  <teleport to=".dialog">
    <div
      :class="[{ pc: !isMobile, mobile: isMobile }, 'dialog_mask']"
      v-if="createVisible"
    ></div>
    <div
      :class="[{ pc: !isMobile, mobile: isMobile }, 'dialogBox']"
      v-if="createVisible"
    >
      <div class="top">
        <span>
          {{ title }}
        </span>
        <svg-icon icon-class="close" @click.native="simpleClose" />
      </div>
      <div :class="[{ pc: !isMobile, mobile: isMobile }, 'content']">
        <div class="formBox">
          <div class="create">
            <div class="input_line">
              <input
                type="text"
                maxlength="8"
                name="chanel_name"
                v-model="form.name"
                autocomplete="off"
                placeholder="请输入渠道名称"
              />
              <p class="tip-error">{{ errorObj.nameError }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <slot>
          <button class="plain" @click="simpleClose">取 消</button>
          <button
            :class="['primary', { disabled: btnDis }]"
            :disabled="btnDis"
            @click="submit"
          >
            生 成
          </button>
        </slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  SetupContext,
  inject,
  ref,
  watchEffect,
} from "vue";
import { createChanel } from "@/api/custData";
import { useField, useForm } from "vee-validate";
import { simpleSchema } from "@/utils/validate";
import tools from "@/utils/comFn";
interface Data {
  name: string;
}

export default defineComponent({
  name: "",
  props: {
    createVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "提示",
    },
    showCode: {
      type: Function,
      default() {
        return () => {
          return false;
        };
      },
    },
  },
  components: {},
  setup(props, ctx: SetupContext) {
    useForm({
      validationSchema: simpleSchema,
    });
    const chanel_name = useField("chanel_name");
    const form: Data = reactive<Data>({
      name: chanel_name.value,
    });
    const errorObj = reactive({
      nameError: chanel_name.errorMessage,
    });
    let simpleClose = () => {
      ctx.emit("update:createVisible", false);
    };
    let cb = () => {
      createChanel(form).then((res: any) => {
        simpleClose();
        let { channel_url } = res.data;
        props.showCode({ channel_url, name: form.name }, "生成");
      });
    };
    let submit = tools.debounce(cb, 1000);
    let btnDis = ref(true);
    watchEffect(() => {
      btnDis.value = errorObj.nameError || !form.name;
    });
    return {
      simpleClose,
      submit,
      form,
      errorObj,
      btnDis,
      isMobile: inject("isMobile"),
    };
  },
});
</script>

<style scoped lang="scss">
.pc.content,
.mobile.content {
  .formBox {
    padding: 20px;
    .input_line {
      border: 1px solid #dcdee5;
      height: 40px;
      border-radius: 4px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      padding: 6px;
      box-sizing: border-box;
      position: relative;
      input {
        flex: 1;
        flex-shrink: 0;
        border: none;
        height: 100%;
        padding-left: 6px;
        background-color: transparent !important;
      }
      p.tip-error {
        text-align: left;
        font-size: 12px;
        color: #d72c0d;
        position: absolute;
        bottom: -20px;
      }
    }
  }
}
</style>
