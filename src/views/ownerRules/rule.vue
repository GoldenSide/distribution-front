<!---*
* @description  返佣规则
* @fileName rule.vue
* @author 叶金龙
* @date 2021/08/13 17:39:39
*--->
<template>
  <div :class="[{ pc: !isMobile, mobile: isMobile }, 'rules-container']">
    <div class="content">
      <div class="back">
        <svg-icon
          icon-class="arrow-left"
          color="#8792A4"
          @click="backFn"
        ></svg-icon>
      </div>
      <div class="article">
        <div class="title">XShoppy分销活动奖励规则</div>
        <p class="date">生效日期:2021年08月31日</p>
        <p class="para first">
          XShoppy分销活动奖励规则构成您与XShoppy签署的《分销合作协议》的补充协议，与《分销合作协议》不可分割且具有同等法律效力，若本规则存在未详尽事项则以《分销合作协议》或其他补充协议约定为准。
        </p>
        <p class="para">
          <span class="blod">一、XShoppy推荐有礼活动:</span>
          推荐新客户购买XShoppy店铺产品，可获得现金奖励；被推荐新客户在XShoppy完成注册后7天内可限时享受以¥299/月/店铺的优惠价格购买店铺的资格。
        </p>
        <p class="para">
          <span class="blod">二、推广路径：</span
          >分销商通过PC端XShoppy官网和移动端XShoppy微信公众号入口进行注册，获取专属邀请链接和海报，分销商通过分享链接邀请新客户，被邀请客户自动与分销商建立关联。
        </p>
        <p class="para">
          <span class="blod">三、推荐行为必须符合以下条件：</span> <br />
          （1）新客户通过分销商专属邀请链接或海报注册成功；<br />
          （2）分销商邀请的客户必须为新客户，不属于已注册客户或已参加活动的客户；<br />
          （3）奖励仅限新客户购买店铺首月租金套餐奖励，店铺续费无奖励。<br />
        </p>
        <p class="para">
          <span class="blod"> 四、奖励档位： </span>
        </p>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>一档</th>
              <th>二挡</th>
              <th>三挡</th>
              <th>四挡</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>累计有效推荐店铺(个)</td>
              <td>1-6</td>
              <td>7-15</td>
              <td>16-50</td>
              <td>50以上</td>
            </tr>
            <tr>
              <td>奖励金额(单位：人民币元)</td>
              <td>50</td>
              <td>70</td>
              <td>100</td>
              <td>150</td>
            </tr>
          </tbody>
        </table>
        <p class="para">
          <span class="blod"> 五、奖励结算：</span>
          分销商可登录XShoppy分销活动页面查看统计数据及有效推荐产生的奖励数据，系统将在每个自然月的1号生成上一自然月的产生的有效奖励的账单，XShoppy将在账单出具后的10个工作日内向分销商结算奖励金额。
        </p>
        <p class="para">
          <span class="blod"> 六、退款订单：</span>
          若被推荐客户发生退款，分销商需向XShoppy退回相应的奖励。如果退款发生在结算前，则在奖励账单中扣除相应的奖励金额；如果退款发生在结算完成后，则在分销商次月及之后的奖励账单中扣除或由分销商退回XShoppy指定账户。
        </p>
        <p class="para">
          <span class="blod"> 七、系统判定：</span>
          若被推荐客户与分销商被系统判定为同一个人，则被推荐客户的订单不能计为有效推荐，例如：手机号、邮箱、设备、IP等信息被判断为同一人。
        </p>
        <p class="para">
          <span class="blod"> 八、解释权：</span>
          活动规则的最终解释权在法律规定及允许的范围内归XShoppy所有
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, SetupContext, inject } from "vue";
import { useRouter } from "vue-router";
interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({});
    let router = useRouter();
    let backFn = () => {
      router.go(-1);
    };
    return {
      backFn,
      isMobile: inject("isMobile"),
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang="scss">
.pc.rules-container,
.mobile.rules-container {
  background-color: #fff;
  padding-top: 32px;
  .content {
    margin: 0px auto;
    width: 1200px;
    .back {
      text-align: left;
      .svg-icon {
        width: 15px;
        height: 30px;
        cursor: pointer;
      }
    }
    .article {
      .title {
        font-size: 24px;
        font-weight: 600;
        line-height: 30px;
        margin-bottom: 32px;
      }
      .date {
        text-align: right;
        font-size: 14px;
        margin-bottom: 24px;
      }
      .para {
        text-align: justify;
        letter-spacing: 1px;
        color: #000000;
        line-height: 20px;
        font-size: 14px;
        margin-bottom: 24px;
        &.first {
          text-indent: 2em;
        }
        .blod {
          font-weight: bold;
          color: #000;
        }
      }
      table {
        width: 100%;

        margin-bottom: 24px;
        margin-top: -24px;
        tr {
          font-size: 12px;
          text-align: left;
          td,
          th {
            width: 20%;
            padding: 16px;
            border: 1px solid #dcdee5;
          }
          th {
            font-weight: 600;
            height: 36px;
          }
          td {
            padding: 16px;
          }
        }
      }
    }
  }
}
.pc.rules-container {
  padding-bottom: 30px;
}
.mobile.rules-container {
  background-color: #fff;
  padding-top: 32px;
  .content {
    width: 100%;
    padding: 24px 20px;
    box-sizing: border-box;
  }
}
</style>
