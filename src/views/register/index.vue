<!---*
* @description 
* @fileName index.vue
* @author 叶金龙
* @date 2021/08/13 19:57:29
*--->
<template>
  <div :class="[{ pc: !isMobile, mobile: isMobile }, 'register-container']">
    <div class="register">
      <div class="back">
        <svg-icon
          icon-class="arrow-left"
          color="#8792A4"
          @click="backFn"
        ></svg-icon>
      </div>
      <div class="title">申请成为分销商</div>
      <div class="formComnine">
        <div class="form_line">
          <div class="select">
            <div class="input_line">
              <input
                type="text"
                placeholder="选择类型"
                :value="val"
                readonly
                @focus="inputFocus"
                @blur="inputBlur"
              />
              <svg-icon icon-class="dropdown" :class="focus ? 'up' : ''" />
            </div>
            <div class="option" v-show="focus">
              <ul>
                <li
                  :class="{ active: optionIndex == index }"
                  @click="getvalue(index, item)"
                  v-for="(item, index) in tableData"
                  :key="index"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="form_line">
          <input
            maxlength="20"
            v-model.trim="formData.name"
            type="text"
            name="name"
            :placeholder="`请输入${val}名称`"
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
          />
          <p class="tip-error Js-companyName-error">
            {{ errorObj.nameError }}
          </p>
        </div>
        <div class="code_line">
          <div class="form_line">
            <span class="areaCode"> +86 </span>
            <input
              maxlength="11"
              name="phone"
              type="text"
              v-model.trim="formData.phone"
              placeholder="请填写手机号"
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
            />
            <p class="tip-error">{{ errorObj.phoneError }}</p>
          </div>
          <button
            :class="[
              {
                dis: haveSend,
                notSend: !formData.phone || errorObj.phoneError,
              },
              'simple',
            ]"
            @click="sendCode"
            :disabled="haveSend"
          >
            {{
              isfirst ? "发送验证码" : haveSend ? time + "秒后重试" : "重新发送"
            }}
          </button>
        </div>
        <div class="form_line">
          <input
            maxlength="6"
            v-model.trim="formData.sms_code"
            type="text"
            name="sms_code"
            placeholder="请输入验证码"
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
          />
          <p class="tip-error">{{ errorObj.sms_codeError }}</p>
        </div>
        <div class="form_line">
          <input
            maxlength="16"
            v-model.trim="formData.pwd"
            name="pwd"
            :type="firstOpen ? 'text' : 'password'"
            placeholder="请输入6~16位数密码"
            autocorrect="off"
            autocapitalize="off"
            autocomplete="new-password"
          />
          <svg-icon
            :icon-class="firstOpen ? 'openeye' : 'closeeye'"
            color="#8792A4"
            @click="firstOpen = !firstOpen"
          ></svg-icon>
          <p class="tip-error">{{ errorObj.pwdError }}</p>
        </div>
        <div class="form_line">
          <input
            maxlength="16"
            class=""
            v-model.trim="formData.samepwd"
            :type="secondOpen ? 'text' : 'password'"
            placeholder="请再次确认密码"
            autocorrect="off"
            autocapitalize="off"
            autocomplete="new-password"
            @change="samePwdChange"
          />
          <svg-icon
            :icon-class="secondOpen ? 'openeye' : 'closeeye'"
            color="#8792A4"
            @click="secondOpen = !secondOpen"
          ></svg-icon>
          <p class="tip-error">{{ samePwdChange() }}</p>
        </div>
      </div>
      <div class="footer">
        <div class="left">
          <input type="checkbox" @click="checkChange" />
          <span>我已阅读并同意</span>
          <span class="link" @click="toRules">《XShoppy分销活动奖励规则》</span>
          <span class="link" @click="toAgreement">《分销合作协议》</span>
        </div>
        <button
          :class="['primary', { disabled: btnDis }]"
          :disabled="btnDis"
          @click.native="submit"
        >
          提交申请
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  inject,
  ref,
  watchEffect,
} from "vue";
import { useField, useForm } from "vee-validate";
import { simpleSchema } from "@/utils/validate";
import { sendCodeApi, registerAct } from "@/api/login";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import tools from "@/utils/comFn";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({});
    useForm({
      validationSchema: simpleSchema,
    });
    const name = useField("name");
    const phone = useField("phone");
    const pwd = useField("pwd");
    const type = useField("type");
    const sms_code = useField("sms_code");
    const errorObj = reactive({
      nameError: name.errorMessage,
      phoneError: phone.errorMessage,
      pwdError: pwd.errorMessage,
      typeError: type.errorMessage,
      sms_codeError: sms_code.errorMessage,
    });

    let formData = reactive({
      name: name.value,
      phone: phone.value,
      pwd: pwd.value,
      type: type.value,
      sms_code: sms_code.value,
      samepwd: "",
    });
    formData.type = "2";
    let isfirst = ref(true);
    let haveSend = ref(false);
    let time = ref(60);

    const codeCb = () => {
      if (errorObj.phoneError || !formData.phone) {
        return;
      }
      haveSend.value = true;
      let timer = setInterval(() => {
        isfirst.value = false;
        if (time.value == 0) {
          clearInterval(timer);
          haveSend.value = false;
          time.value = 60;
        } else {
          time.value -= 1;
        }
      }, 1000);
      sendCodeApi({ phone: formData.phone }).then(() => {});
    };
    const sendCode = tools.debounce(codeCb, 1000);
    let tableData = reactive([
      {
        name: "个人",
        value: "1",
      },
      {
        name: "企业",
        value: "2",
      },
    ]);

    let optionIndex = ref(1);
    let val = ref("企业");
    const getvalue = (index: number, item: any) => {
      if (optionIndex.value == index) return;
      optionIndex.value = index;
      formData.type = item.value;
      val.value = item.name;
      formData.name = "";
    };

    let store = useStore();
    let router = useRouter();
    const cb = () => {
      registerAct(formData).then((res: any) => {
        store.dispatch("user/loginLeft", formData).then((res) => {
          ElMessage({
            message: "注册成功",
            type: "success",
            duration: 3 * 1000,
          });
          router.push({ path: "/index" });
        });
      });
    };
    const submit = tools.debounce(cb, 1000);
    let notCheck = ref(true);
    let samePwdChange = () => {
      return !formData.pwd && formData.samepwd
        ? "请先输入密码再确认"
        : formData.pwd !== formData.samepwd && formData.samepwd
        ? "两次输入的密码不相同"
        : "";
    };
    const checkChange = (e) => {
      notCheck.value = !e.target.checked;
    };
    let btnDis = ref(false);
    watchEffect(() => {
      let haveNovalue = Object.keys(formData).some((v) => {
        return !Boolean(formData[v]);
      });
      let noValid =
        Boolean(samePwdChange()) ||
        Object.keys(errorObj).some((v) => {
          return Boolean(errorObj[v]);
        });
      let bool = haveNovalue || notCheck.value || (!haveNovalue && noValid);
      btnDis.value = bool;
    });
    let firstOpen = ref(false);
    let secondOpen = ref(false);
    let focus = ref(false);
    let inputFocus = () => {
      setTimeout(() => {
        focus.value = true;
      }, 100);
    };
    let inputBlur = () => {
      setTimeout(() => {
        focus.value = false;
      }, 150);
    };
    let toRules = () => {
      router.push({ path: "/ownerRules" });
    };
    let toAgreement = () => {
      router.push({ path: "/agreement" });
    };
    let backFn = () => {
      router.go(-1);
    };

    return {
      formData,
      isfirst,
      haveSend,
      sendCode,
      time,
      tableData,
      getvalue,
      optionIndex,
      val,
      checkChange,
      firstOpen,
      secondOpen,
      errorObj,
      samePwdChange,
      btnDis,
      submit,
      focus,
      inputFocus,
      inputBlur,
      toRules,
      toAgreement,
      backFn,
      isMobile: inject("isMobile"),
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang="scss">
.pc.register-container {
  box-sizing: border-box;
  padding-top: 103px;
  padding-bottom: 47px;
  .register {
    width: 700px;
    background-color: #fff;
    margin: 0 auto;
    padding-top: 40px;
    .back {
      text-align: left;
      padding-left: 46px;
      .svg-icon {
        width: 15px;
        height: 30px;
        cursor: pointer;
      }
    }
    .title {
      color: #202d40;
      font-size: 24px;
      line-height: 30px;
      padding: 20px 0 14px;
    }
    .formComnine {
      padding: 46px 46px 12px;
      .code_line {
        display: flex;
        justify-content: space-between;
        .form_line {
          flex: 1;
          display: flex;
          position: relative;
          span {
            display: inline-block;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 12px;
            font-size: 14px;
            border-right: 1px solid #ebeef4;
          }

          p.tip-error {
            position: absolute;
            bottom: -20px;
          }
        }
        button {
          flex-basis: 128px;
          margin-left: 12px;
          &.dis {
            cursor: not-allowed;
            color: #909499;
            border: 1px solid #dcdee5;
          }
          &.notSend {
            @extend .dis;
            background: #f5f7fa;
          }
        }
      }
      .form_line {
        background: #ffffff;
        border: 1px solid #dcdee5;
        box-sizing: border-box;
        border-radius: 4px;
        margin-bottom: 28px;
        height: 40px;
        position: relative;

        .select {
          width: 100%;
          height: 100%;
          border: none;
          position: relative;
          .input_line {
            height: 100%;
            .up {
              transform: rotate(180deg);
              transition: all 0.3s ease-in-out;
            }
          }
          .option {
            z-index: 1000;
            width: 100%;
            position: absolute;
            border: 1px solid #e4e7ed;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
            box-sizing: border-box;
            margin: 5px 0;
            ul {
              padding: 8px 0;
              li {
                height: 36px;
                line-height: 36px;
                text-align: left;
                z-index: 1000;
                padding: 0 8px;
                font-size: 14px;
                &:hover {
                  cursor: pointer;
                  background-color: #f5f7fa;
                }
                &.active {
                  color: #442bde;
                  font-weight: 700;
                }
              }
            }
          }
        }

        input {
          width: 100%;
          height: 100%;
          border: none;
          padding: 0 4px;
          vertical-align: top;
        }
        p.tip-error {
          text-align: left;
          font-size: 12px;
          color: #d72c0d;
          position: absolute;
          bottom: -21px;
        }
        .svg-icon {
          width: 30px;
          height: 30px;
          position: absolute;
          right: 0;
          top: 4px;
          cursor: pointer;
        }
      }
    }
    .footer {
      display: flex;
      height: 80px;
      padding: 0 46px;
      justify-content: space-between;
      align-items: center;
      box-shadow: inset 0px 1px 0px #e4e5e7;
      .left {
        font-size: 14px;
        line-height: 20px;
        input {
          vertical-align: top;
          margin-right: 8px;
          display: inline-block;
          width: 14px;
          height: 14px;
        }
        span {
          vertical-align: top;
          &.link {
            color: #442bde;
            cursor: pointer;
          }
        }
      }
      button {
        &.disabled {
          cursor: not-allowed;
          background: rgba(68, 43, 222, 0.3);
        }
      }
    }
  }
}
.mobile.register-container {
  padding-top: 44px;
  background: #fff;
  .register {
    .back {
      text-align: left;
      padding-left: 20px;
      height: 30px;
      .svg-icon {
        width: 15px;
        height: 100%;
        cursor: pointer;
      }
    }
    .title {
      margin-top: 16px;
      color: #202d40;
      font-size: 24px;
    }
  }
  .formComnine {
    margin-top: 20px;
    padding: 20px;
    .code_line {
      display: flex;
      justify-content: space-between;
      .form_line {
        flex: 1;
        display: flex;
        span {
          display: inline-block;
          height: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 12px;
          font-size: 12px;
          border-right: 1px solid #ebeef4;
        }
        p.tip-error {
          position: absolute;
          bottom: -21px;
        }
      }
      button {
        flex-basis: 128px;
        margin-left: 12px;
        &.dis {
          cursor: not-allowed;
          color: #909499;
          border: 1px solid #dcdee5;
        }
        &.notSend {
          @extend .dis;
          background: #f5f7fa;
        }
      }
    }
    .form_line {
      border: 1px solid #dcdee5;
      box-sizing: border-box;
      border-radius: 4px;
      margin-bottom: 28px;
      height: 40px;
      position: relative;
      .select {
        width: 100%;
        height: 100%;
        border: none;
        position: relative;
        .input_line {
          height: 100%;
          .up {
            transform: rotate(180deg);
            transition: all 0.3s ease-in-out;
          }
        }
        .option {
          width: 100%;
          z-index: 1000;
          position: absolute;
          border: 1px solid #e4e7ed;
          border-radius: 4px;
          background-color: #fff;
          box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
          box-sizing: border-box;
          margin: 5px 0;
          ul {
            padding: 8px 0;
            li {
              height: 36px;
              line-height: 36px;
              text-align: left;
              z-index: 1000;
              padding: 0 8px;
              font-size: 14px;
              &:hover {
                cursor: pointer;
                background-color: #f5f7fa;
              }
              &.active {
                color: #442bde;
                font-weight: 700;
              }
            }
          }
        }
      }

      input {
        width: 100%;
        height: 100%;
        border: none;
        padding: 0 4px;
        vertical-align: top;
      }
      p.tip-error {
        text-align: left;
        font-size: 12px;
        color: #d72c0d;
      }

      .svg-icon {
        width: 30px;
        height: 30px;
        position: absolute;
        right: 0;
        top: 4px;
        cursor: pointer;
      }
    }
  }
  .footer {
    align-items: center;
    box-shadow: inset 0px 1px 0px #e4e5e7;
    padding: 4px 0 10px;
    width: 100%;
    .left {
      font-size: 14px;
      line-height: 20px;
      text-align: left;
      padding: 20px;
      input {
        vertical-align: top;
        margin-right: 8px;
        display: inline-block;
        width: 14px;
        height: 14px;
      }
      span {
        vertical-align: top;
        &.link {
          color: #442bde;
          cursor: pointer;
        }
      }
    }
    button {
      &.disabled {
        cursor: not-allowed;
        background: rgba(68, 43, 222, 0.3);
      }
    }
  }
}
</style>
