<!---*
* @description 头部公共资源
* @fileName header.vue
* @author 叶金龙
* @date 2021/08/11 16:00:59
*--->
<template>
  <div :class="[{ pc: !isMobile, mobile: isMobile }, 'topHeader']">
    <div class="container">
      <div class="header-wrap">
        <svg-icon icon-class="logo" color="#fff" @click.native="toIndex" />
        <div class="btnbox">
          <button
            class="simple"
            @click.native="loginAct"
            v-if="!(isMobile || haveLogin)"
          >
            分销商登录
          </button>
          <button
            class="media"
            @click.native="toRegister"
            v-if="!(isMobile || haveLogin || path == '/register')"
          >
            成为分销商
          </button>
        </div>
        <div class="dropdown" v-if="haveLogin" @click.stop="toDrop" id="sysOps">
          <span class="dropdown-link">
            <span class="username">{{ userInfo.name }}</span>
            <svg-icon icon-class="dropdown" color="#000"> </svg-icon>
          </span>
          <div :class="['dropdown-list', { pc: !isMobile }]" v-if="isShow">
            <div class="dropdown-item" @click="quit">退出</div>
          </div>
        </div>
      </div>
    </div>
    <loginModal
      v-model:loginVisible="loginVisible"
      :title="'账户登录'"
      v-if="loginVisible"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  SetupContext,
  inject,
  watchEffect,
  onMounted,
} from "vue";
import loginModal from "@/components/login.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: { loginModal },
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({});
    let router = useRouter();
    let loginVisible = ref(false);
    let isShow = ref(false);
    let loginAct = () => {
      loginVisible.value = true;
      isShow.value = false;
    };
    const store = useStore();
    let quit = () => {
      isShow.value = false;

      store.dispatch("user/logoutAct").then((res) => {
        if (res) {
          router.push({ path: "/advertising" });
        }
      });
    };
    let userInfo = ref({
      month_channel_payment_num: 0,
      month_channel_reg_num: 0,
      month_payment_num: 0,
      month_reg_num: 0,
      name: "xxx",
      phone: "",
      self_chanel_url: "",
      total_channel_payment_num: 0,
      total_channel_reg_num: 0,
      total_payment_num: 0,
      total_reg_num: 0,
    });
    let haveLogin = ref(false);
    let path = ref("");
    watchEffect(() => {
      userInfo.value = store.getters.userInfo;
      haveLogin.value = store.getters.haveLogin;
      path.value = router.currentRoute.value.fullPath;
    });
    let toDrop = () => {
      isShow.value = !isShow.value;
    };

    onMounted(() => {
      document.addEventListener("click", (e) => {
        e.cancelBubble = true;
        if (e.target.id == "sysOps") {
          isShow.value = !isShow.value;
        } else {
          isShow.value = false;
        }
      });
    });
    let toRegister = () => {
      router.push({
        path: "/register",
      });
    };
    let toIndex = () => {
      let url = import.meta.env.VITE_INDEX_URL as string;
      window.open(url, "_blank");
    };
    return {
      ...toRefs(data),
      loginVisible,
      userInfo,
      haveLogin,
      isShow,
      quit,
      toDrop,
      toRegister,
      path,
      toIndex,
      isMobile: inject("isMobile"),
      loginAct,
    };
  },
});
</script>

<style scoped lang="scss">
.pc.topHeader {
  background-color: #fff;
  border-bottom: 1px solid #e2e2e2;
  .container {
    width: 1200px;
    margin: 0 auto;
    .header-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      .svg-icon {
        cursor: pointer;
      }
      .btnbox {
        .simple {
          height: 32px;
          margin-right: 8px;
        }
      }
      .dropdown {
        position: relative;
        .dropdown-link {
          cursor: pointer;
          span {
            font-size: 14px;
            font-weight: 700;
          }
          .svg-icon {
            width: 20px;
            height: 20px;
            vertical-align: middle;
          }
        }
        .dropdown-list {
          position: absolute;
          right: -10px;
          top: 30px;
          background-color: #fff;
          box-shadow: 0 2px 12px 0 rgb(0 0 0 / 30%);
          padding: 8px 12px;
          border-radius: 4px;
          z-index: 100000000;
          .dropdown-item {
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
    .svg-icon {
      width: 180px;
      height: 30px;
    }
  }
}

.mobile.topHeader {
  width: 100%;
  background-color: #fff;
  height: 44px;
  border-bottom: 1px solid #e2e2e2;
  .container {
    height: 100%;
    .header-wrap {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .dropdown {
        position: relative;
        margin-right: 10px;
        .dropdown-link {
          cursor: pointer;
          span {
            font-size: 14px;
            font-weight: 700;
            vertical-align: middle;
          }
          .svg-icon {
            width: 20px;
            height: 20px;
            vertical-align: middle;
          }
        }
        .dropdown-list {
          position: absolute;
          right: 10px;
          top: 40px;
          width: 70px;
          background-color: #fff;
          box-shadow: 0 2px 12px 0 rgb(0 0 0 / 30%);
          padding: 8px 12px;
          border-radius: 4px;
          z-index: 100000000;
          .dropdown-item {
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
      .svg-icon {
        width: 120px;
        height: 19.02px;
        margin-left: 12px;
      }
    }
  }
}
</style>
