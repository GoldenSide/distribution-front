<template>
  <div :class="[{ pc: !isMobile, mobile: isMobile }, 'home-container']">
    <div class="banner" v-if="!isMobile">
      <img :src="'./img/advertising_banner.png'" alt="" />
    </div>
    <div class="content">
      <div class="award">
        <div class="title">奖励规则</div>
        <ul class="lists">
          <li
            class="item"
            :style="{ backgroundColor: item.bgc }"
            v-for="(item, index) in award"
            :key="index"
          >
            <img :src="item.url" alt="" />
            <div class="text">
              <div v-if="index == 3" class="plus">且额外+50元/个</div>
              <div class="num" :style="{ color: item.color }">
                <span class="back">返</span>
                <span class="number">¥{{ item.number }}</span>
                <span class="back">/个</span>
              </div>
              <div class="range">
                {{ item.text }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="process">
        <div class="title">推广流程</div>
        <ul class="processBox">
          <li class="item">
            <div class="iconBox">
              <svg-icon icon-class="apply" color="#fff" />
            </div>
            <div class="text">1.申请成为分销商</div>
          </li>
          <li class="item">
            <img
              :src="isMobile ? './img/oneTriangle.png' : './img/triangle.png'"
              alt=""
            />
          </li>
          <li class="item">
            <div class="iconBox">
              <svg-icon icon-class="promoto" color="#fff" />
            </div>
            <div class="text">2.进行推广</div>
          </li>
          <li class="item">
            <img
              :src="isMobile ? './img/oneTriangle.png' : './img/triangle.png'"
              alt=""
            />
          </li>
          <li class="item">
            <div class="iconBox">
              <svg-icon icon-class="award" color="#fff" />
            </div>
            <div class="text">3.奖励到账</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="apply" v-if="!isMobile">
      <div class="title">加入XSHOPPY推荐奖励计划</div>
      <button @click.native="toRegister">成为分销商</button>
    </div>
    <div class="btn-box" v-if="isMobile">
      <button class="info" @click.native="loginAct">登录分销商</button>
      <button class="primary" @click.native="toRegister">成为分销商</button>
    </div>
  </div>
  <loginModal
    v-model:loginVisible="loginVisible"
    :title="'账户登录'"
    v-if="loginVisible"
  />
</template>
<script lang="ts">
import { ref, reactive, defineComponent, computed, inject } from "vue";
import { useRouter } from "vue-router";
import loginModal from "@/components/login.vue";
export default defineComponent({
  name: "advertiment",
  components: { loginModal },
  setup() {
    const award = reactive([
      {
        url: "./img/copper.png",
        number: 50,
        text: "店铺购买数量1-6个,每个奖励50元现金",
        bgc: "#FFFAF8",
        color: "#965F49",
      },
      {
        url: "./img/silver.png",
        number: 70,
        text: "店铺购买数量7-15个,每个奖励70元现金",
        bgc: "#F5F6FB",
        color: "#535E93",
      },
      {
        url: "./img/golden.png",
        number: 100,
        text: "店铺购买数量16-50个,每个奖励100元现金",
        bgc: "#FEFAF1",
        color: "#9F6F56",
      },

      {
        url: "./img/diamond.png",
        number: 100,
        text: "店铺购买数量超51个，每个奖励100元现金， 且每增加一个额外奖励50元",
        bgc: "#F6F2FF",
        color: "#764A9B",
      },
    ]);
    let router = useRouter();
    let toRegister = () => {
      router.push({
        path: "/register",
      });
    };
    let loginVisible = ref(false);
    let loginAct = () => {
      loginVisible.value = true;
    };
    return {
      award,
      toRegister,
      loginAct,
      loginVisible,
      isMobile: inject("isMobile"),
    };
  },
});
</script>
<style lang="scss">
.pc.home-container {
  background-color: #fff;
  .banner {
    width: 100%;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  .content {
    width: 1200px;
    margin: 0 auto;
    .award {
      .title {
        font-weight: 550;
        font-size: 28px;
        line-height: 42px;
        color: #202223;
        margin: 60px 0 40px;
      }
      .lists {
        display: flex;
        justify-content: space-between;
        .item {
          width: 282px;
          border-radius: 6.96296px;
          position: relative;
          padding-left: 24px;
          img {
            position: absolute;
            right: 0;
            top: 0;
          }
          .text {
            text-align: left;
            margin-top: 60px;
            position: relative;
            .plus {
              position: absolute;
              top: -30px;
              background: #ffffff;
              border-radius: 17px;
              color: #764a9b;
              text-align: center;
              font-size: 12px;
              width: 104px;
              height: 22px;
              line-height: 22px;
            }
            .num {
              .back {
                font-size: 24px;
              }
              .number {
                font-size: 42px;
              }
            }
            .range {
              line-height: 20px;
              color: #909499;
              font-size: 12px;
              margin-top: 16px;
              padding-bottom: 14px;
              width: 230px;
            }
          }
        }
      }
    }
    .process {
      .title {
        font-weight: 550;
        font-size: 28px;
        line-height: 42px;
        color: #202223;
        margin: 60px 0 40px;
      }
      .processBox {
        background: rgba(68, 43, 222, 0.02);
        border-radius: 4px;
        height: 288px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .item {
          flex-basis: 20%;
          flex-shrink: 0;
          .iconBox {
            background-color: #442bde;
            width: 84px;
            height: 84px;
            border-radius: 50px;
            margin: 0 auto 16px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .svg-icon {
              width: 30px;
              height: 32px;
            }
          }
          .text {
            color: #202223;
            font-size: 18px;
          }
          img {
            width: 68px;
            height: auto;
            display: block;
            margin: 0 auto;
          }
        }
      }
    }
  }
  .apply {
    height: 302px;
    background: #442bde;
    padding-top: 95px;
    margin-top: 60px;
    .title {
      color: #fff;
      font-weight: 500;
      font-size: 28px;
      line-height: 42px;
    }
    button {
      height: 40px;
      color: #393590;
      cursor: pointer;
      margin-top: 40px;
    }
  }
}
.mobile.home-container {
  background: url("../img/mobil_bg.png") no-repeat;
  background-size: cover;
  margin-top: 44px;
  .content {
    width: 335px;
    margin: 0 auto;
    padding-top: 285px;
    .award {
      width: 100%;
      background-color: #fff;
      border-radius: 4px;
      padding: 16px;
      .title {
        font-weight: 500;
        font-size: 18px;
        line-height: 20px;
        margin: 4px 0 16px;
        color: #202d40;
      }
      .lists {
        .item {
          border-radius: 4px;
          margin-bottom: 8px;
          display: flex;
          flex-direction: row-reverse;
          justify-content: space-between;
          padding-left: 12px;
          padding-bottom: 12px;
          img {
            width: 60px;
            height: 60px;
            flex-shrink: 0;
          }
          .text {
            position: relative;
            .plus {
              width: 104px;
              border-radius: 60px;
              background-color: #fff;
              font-size: 12px;
              color: #764a9b;
              line-height: 22px;
              height: 22px;
              position: absolute;
              left: 90px;
              top: 14px;
            }
            .num {
              text-align: left;
              .back {
                font-size: 14px;
              }
              .number {
                font-size: 24px;
              }
            }
            .range {
              font-size: 12px;
              color: #909499;
              text-align: left;
            }
          }
        }
      }
    }
    .process {
      width: 100%;
      background-color: #fff;
      border-radius: 4px;
      padding: 16px;
      margin-top: 6px;
      .title {
        font-weight: 500;
        font-size: 18px;
        line-height: 20px;
        margin: 4px 0 16px;
        color: #202d40;
      }
      .processBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item {
          .iconBox {
            width: 48px;
            height: 48px;
            background: #442bde;
            border-radius: 48px;
            margin: 0 auto 16px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .svg-icon {
              width: 20px;
              height: 20px;
            }
          }
          .text {
            color: #202223;
            font-size: 12px;
            line-height: 14px;
          }
        }
      }
    }
  }
  .btn-box {
    width: 100%;
    height: 68px;
    display: flex;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 11px;
  }
}
</style>
