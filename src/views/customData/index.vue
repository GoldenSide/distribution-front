<!---*
* @description 分销商数据展示
* @fileName index.vue
* @author 叶金龙
* @date 2021/08/11 16:14:49
*--->
<template>
  <div :class="[{ pc: !isMobile, mobile: isMobile }, 'data-container']">
    <div class="banner" v-if="!isMobile">
      <img :src="'./img/custom_banner.png'" alt="" />
    </div>
    <div class="content">
      <div class="topSection">
        <ul class="tabs">
          <li
            :class="['item', { active: activeIndex == index }]"
            v-for="(item, index) in tabs"
            :key="index"
            @click.native="toggleTab(index)"
          >
            {{ item.text }}
          </li>
        </ul>
        <div class="bottom_line"></div>
        <ul class="tab-content">
          <li class="item" v-if="activeIndex == 0">
            <div class="notice">
              &nbsp; 邀请人通过你的链接注册并购买，才能获得返现哦~
            </div>
            <div class="linkPanel">
              <div class="panel_line">
                <div id="qrcode" class="qrcode-img">
                  <!-- <qrcode :chanel="codeObj" /> -->
                  <img :src="codeObj?.qr_code" />
                </div>
                <button
                  v-if="!isMobile"
                  class="primary download"
                  @click="
                    downLoadImg(
                      count?.name,
                      'img-qr' + codeObj.id,
                      codeObj?.qr_code
                    )
                  "
                >
                  下载海报
                </button>
                <p v-else class="tips">长按海报保存到手机</p>
                <div class="linkLine" v-if="isMobile">
                  <span class="link">{{ codeObj.self_chanel_url }}</span>
                  <span class="copy" v-copy="codeObj.self_chanel_url"
                    >复制</span
                  >
                </div>
              </div>
              <div class="panel_line" v-if="!isMobile">
                <div class="link_url">{{ codeObj.self_chanel_url }}</div>
                <button class="primary" v-copy="codeObj.self_chanel_url">
                  复制链接
                </button>
              </div>
            </div>
          </li>
          <li class="item" v-if="activeIndex == 1">
            <div class="notice">&nbsp; 注册人数&付费店铺数包含渠道数据</div>
            <div class="toggleRange">
              <span
                :class="{ active: activeSta == 0 }"
                @click.native="toggleSta(0, 'total')"
                >累计</span
              >
              &nbsp; | &nbsp;
              <span
                :class="{ active: activeSta == 1 }"
                @click.native="toggleSta(1, 'month')"
                >当月新增</span
              >
            </div>
            <ul class="panels">
              <li
                class="item"
                v-for="(item, index) in countConfig"
                :key="index"
              >
                <div class="title">
                  <svg-icon :icon-class="item.icon"></svg-icon>
                  <span>{{ item.title }}</span>
                </div>
                <div class="num">
                  {{ count[preStr + item.prop] }}
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="table">
        <div class="topline">
          <div class="left">
            <span> 渠道列表 </span>
            <el-tooltip
              class="item"
              effect="dark"
              content="渠道列表展示您生成的所有渠道"
              placement="bottom"
            >
              <svg-icon icon-class="notice" color="#8792A4"></svg-icon>
            </el-tooltip>
          </div>
          <div class="right" @click.native="create">生成渠道链接</div>
        </div>
        <el-table :data="list" stripe>
          <el-table-column
            v-for="col in columns"
            :prop="col.prop"
            :key="col.prop"
            :label="col.label"
            :width="col.width"
            :align="col.align"
          >
            <template #default="scope" v-if="col.prop == 'channel_url'">
              <div
                :class="{ isLink: col.prop == 'channel_url' }"
                @click="showCode(scope.row, '查看', col.prop)"
              >
                查看链接
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <createLink
      v-model:createVisible="createVisible"
      :title="'生成渠道'"
      :showCode="showCode"
      v-if="createVisible"
    />
    <showLink
      v-model:showLinkVisible="showLinkVisible"
      :title="currentTitle"
      :chanel="chanel"
    />
  </div>
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
  onMounted,
} from "vue";
import createLink from "./component/createLink.vue";
import showLink from "./component/showLink.vue";
import { useStore } from "vuex";
import { custDataList } from "@/api/custData";
import { downLoadImg, imageToCanvas } from "@/utils/downLoad";
import qrcode from "@/components/qrcode.vue";
interface Data {}
export default defineComponent({
  name: "customData",
  props: {},
  components: {
    createLink,
    showLink,
    qrcode,
  },
  method: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({});
    let activeIndex = ref(0);
    let store = useStore();
    const tabs = reactive([
      {
        text: "分享",
      },
      {
        text: "我的成就",
      },
    ]);
    const toggleTab = (index: number) => {
      activeIndex.value = index;
    };
    let columns = reactive([
      { label: "渠道ID", prop: "id", width: "auto", align: "left" },
      { label: "渠道名称", prop: "name", width: "auto", align: "center" },
      {
        label: "链接",
        prop: "channel_url",
        width: "auto",
        align: "right",
      },
    ]);

    let createVisible = ref(false);
    let create = () => {
      createVisible.value = true;
    };
    let showLinkVisible = ref(false);
    let chanel = reactive({
      channel_url: "",
      name: "",
      id: "",
      qr_code: "",
    });
    let currentTitle = ref("");
    let getList = () => {
      custDataList({ page: 1, page_size: 1000 }).then((res: any) => {
        list.value = res.data;
      });
    };
    let showCode = (row: any, title: string, prop: string = "") => {
      imageToCanvas(row.channel_url).then((img) => {
        if (title == "查看" && prop !== "channel_url") return;
        showLinkVisible.value = true;
        currentTitle.value = title;
        chanel.qr_code = img;
        chanel.channel_url = row.channel_url;
        chanel.name = row.name;
        chanel.id = row.id;
        if (title == "生成") {
          getList();
        }
      });
    };
    const countConfig = reactive([
      {
        title: "总注册店铺数",
        icon: "one",
        prop: "_reg_num",
      },
      {
        title: "总付费店铺数",
        icon: "two",
        prop: "_payment_num",
      },
      {
        title: "渠道注册店铺总数",
        icon: "three",
        prop: "_channel_reg_num",
      },
      {
        title: "渠道付费店铺总数",
        icon: "four",
        prop: "_channel_payment_num",
      },
    ]);
    let count = reactive({
      month_channel_payment_num: 0,
      month_channel_reg_num: 0,
      month_payment_num: 0,
      month_reg_num: 0,
      total_channel_payment_num: 0,
      total_channel_reg_num: 0,
      total_payment_num: 0,
      total_reg_num: 0,
    });

    let codeObj = reactive({
      qr_code: "",
      self_chanel_url: "",
    });
    let activeSta = ref(0);
    let preStr = ref("total");
    let toggleSta = (index: number, pre: string) => {
      if (activeSta.value == index) return;
      activeSta.value = index;
      preStr.value = pre;
    };
    let list = ref([]);
    watchEffect(() => {
      count = { ...count, ...store.getters.userInfo };
      codeObj = {
        ...count,
        ...{
          qr_code: store.getters.userInfo.qr_code,
          self_chanel_url: store.getters.userInfo.self_chanel_url,
          channel_url: store.getters.userInfo.self_chanel_url,
          id: store.getters.userInfo.name,
        },
      };
    });

    onMounted(async () => {
      getList();
    });

    return {
      activeIndex,
      tabs,
      toggleTab,
      columns,
      list,
      createVisible,
      create,
      showCode,
      currentTitle,
      showLinkVisible,
      countConfig,
      count,
      activeSta,
      toggleSta,
      preStr,
      codeObj,
      chanel,
      downLoadImg,
      isMobile: inject("isMobile"),
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang="scss">
.pc.data-container {
  background-color: #fff;
  .banner {
    width: 100%;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  .qrcode-img {
    margin: 8px 0;
    height: 148px;
    img {
      max-height: 148px;
    }
  }
  .content {
    width: 1200px;
    margin: 0 auto;
    .tabs {
      margin-top: 60px;
      display: flex;
      justify-content: flex-start;
      .item {
        margin-right: 20px;
        font-size: 28px;
        height: 50px;
        cursor: pointer;
        font-weight: 500;
        color: #909499;
        position: relative;
        &.active {
          color: #442bde;
          &::before {
            background-color: #442bde;
          }
        }
        &::before {
          content: "";
          display: block;
          width: 100%;
          height: 2px;
          position: absolute;
          bottom: -1px;
        }
      }
    }
    .bottom_line {
      background: #e6e6e6;
      height: 1px;
    }
    .tab-content {
      margin-top: 24px;
      background-color: #f9f9fe;
      border-radius: 4px;
      padding: 20px;
      .notice {
        height: 29px;
        background-color: #fff;
        color: #909499;
        font-size: 14px;
        line-height: 29px;
        text-align: left;
      }
      .item {
        .toggleRange {
          text-align: right;
          margin-top: 20px;
          span {
            color: #909499;
            cursor: pointer;
            user-select: none;
            &.active {
              font-weight: 500;
              color: #4231de;
            }
          }
        }
        .panels {
          margin-top: 32px;
          display: flex;
          .item {
            flex: 1;
            text-align: left;
            .title {
              color: #6d7175;

              span {
                line-height: 20px;
                display: inline-block;
                height: 20px;
                vertical-align: top;
                font-size: 14px;
                margin-left: 10px;
              }
              .svg-icon {
                display: inline-block;
                width: 20px;
                height: 20px;
                vertical-align: top;
              }
            }
            .num {
              margin-top: 26px;
              font-weight: 500;
              font-size: 36px;
              line-height: 32px;
              color: #4231de;
            }
          }
        }
        .linkPanel {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;

          .panel_line {
            height: 148px;
            position: relative;
            flex: 1;

            #qrcode {
              width: 148px;
              height: 148px;
              float: left;
            }
            button {
              position: absolute;
              bottom: 10px;
              left: 0;
              &.download {
                left: 168px;
              }
            }
            .link_url {
              text-align: left;
              font-style: normal;
              font-weight: 500;
              font-size: 16px;
              line-height: 22px;
            }
            &:nth-child(1) {
              margin-right: 20px;
              border-right: 1px solid #e2e2e2;
            }
          }
        }
      }
    }
    .table {
      padding-bottom: 60px;
      .topline {
        margin: 64px 0 28px;
        display: flex;
        justify-content: space-between;
        .left {
          color: #202223;
          font-size: 28px;
          font-weight: 500;
          .svg-icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            cursor: pointer;
          }
        }
        .right {
          color: #442bde;
          font-weight: 500;
          font-size: 16px;
          cursor: pointer;
          height: 37px;
          line-height: 37px;
        }
      }
      .isLink {
        color: #442bde;
        cursor: pointer;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float: right;
      }
    }
  }
  .table {
    padding-bottom: 60px;
    .topline {
      margin: 64px 0 28px;
      display: flex;
      justify-content: space-between;
      .left {
        color: #202223;
        font-size: 28px;
        font-weight: 500;
        .svg-icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }
      .right {
        color: #442bde;
        font-weight: 500;
        font-size: 16px;
        cursor: pointer;
        height: 37px;
        line-height: 37px;
      }
    }
    .isLink {
      color: #442bde;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      float: right;
    }
  }
}

.mobile.data-container {
  background: url("../img/mobil_cus_bg.png") #f7f7fa no-repeat;
  background-position: 0 44px;
  background-size: 100% auto;
  padding-top: 44px;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: scroll;
  .qrcode-img {
    margin: 15px 0;
    height: 148px;
    img {
      max-height: 148px;
    }
  }
  .content {
    width: 335px;
    margin: 0px auto;
    padding-top: 122px;
    .topSection {
      background-color: #fff;
      border-radius: 4px;
      padding: 20px;
      .tabs {
        display: flex;
        justify-content: flex-start;
        .item {
          margin-right: 20px;
          font-size: 16px;
          height: 27px;
          cursor: pointer;
          font-weight: 500;
          color: #909499;
          position: relative;
          &.active {
            color: #442bde;
            &::before {
              height: 3px;
              border-radius: 6px;
              background-color: #442bde;
            }
          }
          &::before {
            content: "";
            display: block;
            width: 100%;
            height: 2px;
            position: absolute;
            bottom: -1px;
          }
        }
      }
      .tab-content {
        margin-top: 16px;

        .item {
          .notice {
            height: 29px;
            background: #f9f9f9;
            color: #909499;
            font-size: 12px;
            line-height: 29px;
            text-align: left;
            border-radius: 4px;
          }
          .linkPanel {
            .tips {
              font-size: 12px;
              text-align: center;
              color: #cbcbcb;
            }
            .linkLine {
              width: 100%;
              text-align: center;
              height: 20px;
              line-height: 20px;
              margin-top: 16px;

              img {
                max-height: 148px;
              }

              .link {
                font-size: 14px;
                display: inline-block;
                max-width: 188px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 20px;
                height: 20px;
                vertical-align: bottom;
              }
              .copy {
                font-size: 14px;
                color: #442bde;
                margin-left: 5px;
                line-height: 20px;
                height: 20px;
                display: inline-block;
                vertical-align: bottom;
              }
            }
          }
          .toggleRange {
            text-align: right;
            margin-top: 20px;
            font-size: 14px;
            span {
              color: #909499;
              cursor: pointer;
              user-select: none;

              &.active {
                font-weight: 500;
                color: #4231de;
              }
            }
          }
          .panels {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin-top: -8px;
            .item {
              display: flex;
              flex-direction: column-reverse;
              justify-content: space-between;
              margin-right: 16px;
              margin-top: 24px;
              width: 127px;
              text-align: left;
              .title {
                margin-top: 16px;
                height: 20px;
                span {
                  font-size: 14px;
                  line-height: 20px;
                  margin-left: 8px;
                  vertical-align: top;
                }
                .svg-icon {
                  width: 20px;
                  height: 20px;
                  vertical-align: top;
                }
              }
              .num {
                font-size: 24px;
                color: #442bde;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    .table {
      background-color: #fff;
      margin-top: 8px;
      border-radius: 4px;
      padding: 20px;
      .topline {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 20px;
        margin-bottom: 30px;
        .left {
          height: 20px;
          line-height: 20px;
          span {
            font-size: 16px;
            vertical-align: middle;
          }
          .svg-icon {
            width: 16px;
            height: 16px;
            vertical-align: middle;
          }
        }
        .right {
          color: #442bde;
          font-size: 14px;
          line-height: 20px;
        }
      }
      .isLink {
        color: #442bde;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float: right;
      }
    }
  }
}
</style>
