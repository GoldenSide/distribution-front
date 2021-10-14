<!---*
* @description  登录弹窗
* @fileName login.vue
* @author 叶金龙
* @date 2021/08/12 14:14:00
*--->
<template>
  <teleport to=".dialog">
    <div
      :class="[{ pc: !isMobile, mobile: isMobile }, 'dialog_mask']"
      v-if="loginVisible"
    ></div>
    <div
      :class="[{ pc: !isMobile, mobile: isMobile }, 'dialogBox']"
      v-if="loginVisible"
    >
      <div class="top">
        <span>
          {{ title }}
        </span>
        <svg-icon icon-class="close" @click.native="simpleClose" />
      </div>
      <div class="content">
        <ul class="tabs">
          <li
            :class="['tab', { active: activeIndex == index }]"
            v-for="(item, index) in tabs"
            :key="index"
            @click.antive="toggleTab(index)"
          >
            {{ item.text }}
          </li>
        </ul>
        <div class="formBox">
          <div class="loginByPassword" v-if="activeIndex == 0">
            <div class="input_line">
              <span class="append">+86</span>
              <input
                type="text"
                name="phone"
                maxlength="11"
                v-model="loginform.phone"
                autocomplete="soff"
                autocorrect="off"
                placeholder="请输入手机号"
              />
              <div class="ERRINFO">{{ errorObj.phoneError }}</div>
            </div>
            <div class="input_line">
              <input
                name="pwd"
                v-model="loginform.pwd"
                :type="opend ? 'text' : 'password'"
                maxlength="16"
                autocomplete="new-password"
                autocorrect="off"
                placeholder="请输入6~16位密码"
              />
              <svg-icon
                :icon-class="opend ? 'openeye' : 'closeeye'"
                color="#8792A4"
                @click="opend = !opend"
              >
              </svg-icon>
              <div class="ERRINFO">{{ errorObj.passwordError }}</div>
            </div>
          </div>
          <div class="loginBycode" v-if="activeIndex == 1">
            <div class="code_line">
              <div class="input_line">
                <span class="append">+86</span>
                <input
                  type="text"
                  name="phone"
                  maxlength="11"
                  v-model="loginformCode.phone"
                  autocomplete="new-password"
                  autocorrect="off"
                  placeholder="请输入手机号"
                />
                <div class="ERRINFO">{{ errorObj.phoneError }}</div>
              </div>
              <button
                :class="[
                  'simple',
                  'medium',
                  {
                    dis: havesend,
                    notSend: !loginformCode.phone || errorObj.phoneError,
                  },
                ]"
                @click.native="countTime"
                :disabled="havesend"
              >
                {{
                  isfirst
                    ? "发送验证码"
                    : havesend
                    ? time + "秒后重试"
                    : "重新发送"
                }}
              </button>
            </div>
            <div class="input_line">
              <input
                type="text"
                name="sms_code"
                maxlength="6"
                v-model="loginformCode.sms_code"
                autocomplete="new-password"
                autocorrect="off"
                placeholder="请输入验证码"
              />
              <div class="ERRINFO">{{ errorObj.sms_codeError }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <slot>
          <button
            :class="['primary', { disabled: btnDis }]"
            :disabled="btnDis"
            @click="submit"
          >
            登录
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
  toRefs,
  ref,
  inject,
  SetupContext,
  watchEffect,
} from "vue";
import { useField, useForm } from "vee-validate";
import { simpleSchema } from "../utils/validate";
interface Data {}
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { sendCodeApi } from "../api/login";
import tools from "@/utils/comFn";
export default defineComponent({
  name: "login",
  props: {
    loginVisible: {
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
    interface Form {
      pwd: unknown;
      phone: unknown;
    }
    interface codeForm {
      sms_code: unknown;
      phone: unknown;
    }

    useForm({
      validationSchema: simpleSchema,
    });
    const pass = useField("pwd");
    const phone = useField("phone");
    const sms_code = useField("sms_code");
    const loginform: Form = reactive<Form>({
      pwd: pass.value,
      phone: phone.value,
    });
    const loginformCode: codeForm = reactive<codeForm>({
      sms_code: sms_code.value,
      phone: phone.value,
    });
    const errorObj = reactive({
      passwordError: pass.errorMessage,
      phoneError: phone.errorMessage,
      sms_codeError: sms_code.errorMessage,
    });

    let simpleClose = () => {
      ctx.emit("update:loginVisible", false);
    };
    const router = useRouter();
    let store = useStore();
    let activeIndex = ref(0);
    let boolLeft = ref(true);
    let boolRight = ref(true);
    let btnDis = ref(false);
    watchEffect(() => {
      let haveNovalue1 = Object.keys(loginform).some((v) => {
        return !Boolean(loginform[v]);
      });
      let noValid1 = Object.keys(errorObj).some((v) => {
        return Boolean(errorObj[v]) && v != "sms_codeError";
      });
      let haveNovalue2 = Object.keys(loginformCode).some((v) => {
        return !Boolean(loginformCode[v]);
      });
      let noValid2 = Object.keys(errorObj).some((v) => {
        return Boolean(errorObj[v]) && v === "sms_codeError";
      });
      boolLeft.value = haveNovalue1 || (!haveNovalue1 && noValid1);
      boolRight.value = haveNovalue2 || (!haveNovalue2 && noValid2);
      btnDis.value =
        (activeIndex.value == 0 && boolLeft.value) ||
        (activeIndex.value == 1 && boolRight.value);
    });
    let submitPost = () => {
      if (activeIndex.value == 0 && !boolLeft.value) {
        store.dispatch("user/loginLeft", loginform).then((res) => {
          simpleClose();
          router.replace({
            path: "/index",
          });
        });
      } else if (activeIndex.value == 1 && !boolRight.value) {
        store.dispatch("user/loginRight", loginformCode).then((res) => {
          simpleClose();
          router.replace({
            path: "/index",
          });
        });
      }
    };
    let submit = tools.debounce(submitPost, 1000);
    let tabs = reactive([
      {
        text: "密码登录",
      },
      {
        text: "验证码登录",
      },
    ]);

    let toggleTab = (index: number) => {
      activeIndex.value = index;
    };
    let havesend = ref(false);
    let time = ref(60);
    let isfirst = ref(true);
    const codeCb = () => {
      if (errorObj.phoneError || !loginformCode.phone) {
        return;
      }
      havesend.value = true;
      let timer = setInterval(() => {
        isfirst.value = false;
        if (time.value == 0) {
          clearInterval(timer);
          time.value = 60;
          havesend.value = false;
          return;
        } else {
          time.value = time.value - 1;
        }
      }, 1000);
      sendCodeApi({ phone: loginformCode.phone }).then((res) => {});
    };
    const countTime = tools.debounce(codeCb, 1000);
    let opend = ref(false);
    return {
      simpleClose,
      submit,
      tabs,
      activeIndex,
      toggleTab,
      havesend,
      time,
      countTime,
      loginform,
      loginformCode,
      errorObj,
      opend,
      btnDis,
      isfirst,
      isMobile: inject("isMobile"),
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang="scss">
.pc.dialogBox {
  .content {
    .tabs {
      display: flex;
      justify-content: space-between;
      height: 62px;
      .tab {
        flex-basis: 50%;
        flex-grow: 0;
        text-align: center;
        height: 100%;
        line-height: 62px;
        cursor: pointer;
        font-size: 22px;
        border-bottom: 1px solid #e6e6e6;
        &.active {
          font-weight: 550;
          color: #442bde;
        }
      }
    }
    .formBox {
      padding: 20px;
      .loginByPassword,
      .loginBycode {
        .code_line {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 24px;
          .input_line {
            margin-bottom: 0px;
            flex: 1;
          }
          button {
            margin-left: 12px;
            width: 120px;
            &.dis {
              cursor: not-allowed;
              border-color: #e6e6e6;
              color: #a1a1a1;
            }
            &.notSend {
              @extend .dis;
              background: #f5f7fa;
            }
          }
        }
        .input_line {
          border: 1px solid #dcdee5;
          height: 40px;
          border-radius: 4px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          padding: 6px;
          box-sizing: border-box;
          position: relative;
          span.append {
            flex-basis: 40px;
            display: block;
            font-size: 12px;
            line-height: 28px;
            border-right: 1px solid #ebeef4;
          }

          input {
            flex: 1;
            border: none;
            height: 100%;
            padding-left: 6px;
            background-color: transparent !important;
          }
          .svg-icon {
            width: 26px;
            height: 26px;
            cursor: pointer;
          }
          .ERRINFO {
            color: #d72c0d;
            position: absolute;
            bottom: -18px;
            font-size: 12px;
          }
          button {
            position: absolute;
            right: 6px;
            height: 28px;
            background-color: #fff;
            border-radius: 4px;
            border: 1px solid #442bde;
            color: #442bde;
            width: 83px;
          }
        }
      }
    }
  }
  .footer {
    button {
      &.disabled {
        cursor: not-allowed;
        background: rgba(68, 43, 222, 0.3);
      }
    }
  }
}

.mobile.dialogBox {
  .content {
    .tabs {
      display: flex;
      justify-content: space-between;
      height: 62px;
      .tab {
        flex-basis: 50%;
        flex-grow: 0;
        text-align: center;
        height: 100%;
        line-height: 62px;
        cursor: pointer;
        font-size: 22px;
        border-bottom: 1px solid #e6e6e6;
        &.active {
          font-weight: 550;
          color: #442bde;
        }
      }
    }
    .formBox {
      padding: 20px;
      .loginByPassword,
      .loginBycode {
        .code_line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 24px;
          .input_line {
            margin-bottom: 0px;
            width: 150px;
            input {
              width: 60px;
            }
          }
          button {
            margin-left: 12px;

            &.dis {
              cursor: not-allowed;
              border-color: #e6e6e6;
              color: #a1a1a1;
            }
            &.notSend {
              @extend .dis;
              background: #f5f7fa;
            }
          }
        }
      }
      .input_line {
        border: 1px solid #dcdee5;
        height: 40px;
        border-radius: 4px;
        margin-bottom: 24px;
        display: flex;
        justify-content: flex-start;
        padding: 6px;
        box-sizing: border-box;
        position: relative;
        span.append {
          flex-basis: 40px;
          display: block;
          font-size: 12px;
          line-height: 28px;
          border-right: 1px solid #ebeef4;
        }

        input {
          flex: 1;
          border: none;
          height: 100%;
          padding-left: 6px;
          background-color: transparent !important;
        }
        .svg-icon {
          width: 26px;
          height: 26px;
          cursor: pointer;
          position: absolute;
          right: 6px;
        }
        .ERRINFO {
          color: #d72c0d;
          position: absolute;
          bottom: -18px;
          font-size: 12px;
        }

        button {
          position: absolute;
          right: 6px;
          height: 28px;
          background-color: #fff;
          border-radius: 4px;
          border: 1px solid #442bde;
          color: #442bde;
          width: 83px;
        }
      }
    }
  }
  .footer {
    button {
      width: 68px;
    }
  }
}
</style>
