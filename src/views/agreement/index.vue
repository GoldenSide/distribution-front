<!---*
* @description 
* @fileName index.vue
* @author 叶金龙
* @date 2021/08/27 15:25:09
*--->
<template>
  <div :class="[{ pc: !isMobile, mobile: isMobile }, 'agreement-container']">
    <div class="content">
      <div class="back">
        <svg-icon icon-class="arrow-left" color="#8792A4"  @click="backFn"></svg-icon>
      </div>
      <div class="article">
        <div class="title">分销合作协议</div>
        <p class="date">版本生效日期:2021年08月31日</p>
        <h2>提示条款</h2>
        <p class="para">
          欢迎您与XShoppy共同签署本《分销合作协议》（下称“本协议”）并参与XShoppy分销活动。
        </p>
        <p class="para">
          各条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。
        </p>
        <p class="para">
          <span class="blod">【审慎阅读】</span>
          您在点击确认本协议或参与XShoppy分销活动之前，应当认真阅读本协议。
          <span class="throughLine">
            请您务必审慎阅读、充分理解各条款内容，特别是免除或限制责任、法律适用和争议解决等以粗体下划线格式特别标识的条款，您应重点阅读。如您对本协议有任何疑问，可向XShoppy客服咨询。</span
          >
        </p>
        <p class="para">
          <span class="blod"> 【签约】</span>
          当您点击确认本协议或参与XShoppy分销活动时，即表示您已充分阅读、理解并接受本协议的全部内容，并与XShoppy达成一致。
          <span class="throughLine">
            本协议自您点击确认本协议之时起或参与XShoppy分销活动的行为发生之时起（以时间在先者为准）生效。如果您不同意本协议或其中任何条款约定，您应立即停止参与XShoppy分销活动。
          </span>
        </p>
        <h2>一、定义</h2>
        <p class="para">
          <span class="blod"> 分销商（以下或称“您”）：</span>
          指参与XShoppy分销活动，为为XShoppy推广店铺的单位或个人。
        </p>
        <p class="para">
          <span class="blod"> XShoppy分销活动: </span>
           指您通过从XShoppy创建的专属邀请邀请链接或海报后，通过各种渠道为XShoppy推广店铺，XShoppy根据您的推广效果向您发放现金奖励的活动。
        </p>
        <p class="para">
          <span class="blod"> XShoppy分销活动规则： </span>
          指XShoppy已经发布及后续发布的，与XShoppy分销活动相关的全部规则、规范、解读、公告、通知、实施细则、产品介绍说明、FAQ等内容，发布渠道如XShoppy官网合作推广栏目
          <span class="red"> (https://market.xshoppy.shop/) </span
          >、移动端微信公众号（<span class="red">XShoppy</span
          >）等。本协议中又称“规则”。
        </p>
        <p class="para">
          <span class="blod">客户： </span>
          是指使用XShoppy提供的服务的个人或企业；
        </p>
        <p class="para">
          <span class="blod">店铺：</span>
          是指客户在XShoppy购买的用于运营跨境电商业务的店铺产品。注明，一个客户可以购买多个店铺。
        </p>

        <h2>二、协议范围</h2>
        <h3>2.1 签约主体</h3>
        <p class="para">
          <span class="blod"> 【平等主体】 </span>
          本协议由您与XShoppy共同缔结，本协议对您与XShoppy均具有合同效力。
        </p>
        <p class="para"><span class="blod">【主体信息】 </span></p>
        <p class="para">
          （一） 本协议内的您指分销商，即您项下的权利义务均适用于分销商。
        </p>
        <p class="para">
          （二） 本协议内的XShoppy，即XShoppy分销活动的组织者，指深圳市赛凌科技有限公司。
        </p>
        <p class="para">
          （三）
          <span class="throughLine"
            > XShoppy分销系统服务提供者可能会因为业务调整等而发生变更，变更后的服务提供者与您共同履行本协议并向您提供服务，服务提供者的变更不会影响您本协议项下的权益。</span
          >
        </p>
        <h3>2.2 补充协议</h3>
        <p class="para">
          由于互联网高速发展，本协议列明的条款并不能完整罗列并覆盖您与XShoppy的所有权利与义务，现有的约定也不能保证完全符合未来发展的需求。因此，<span
            class="throughLine"
            >XShoppy分销活动所在网站内各种形态里的法律声明、隐私权政策及规则均为本协议的补充协议，与本协议不可分割且具有同等法律效力。如您参与XShoppy分销活动，视为您同意上述补充协议。</span
          >
        </p>

        <h2>三、开通与参与</h2>
        <h3>3.1 资格</h3>
        <p class="para">
          您确认，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力。<span
            class="throughLine"
            >若您不具备前述与您行为相适应的民事行为能力，则您及您的监护人应依照法律规定承担因此而导致的一切后果。</span
          >
        </p>
        <h3>3.2 分销商准入</h3>
        <p class="para">
          为构建更加健康和谐的合作秩序，您参与XShoppy分销活动的，应符合XShoppy分销活动的分销商准入标准并根据网站指示完成您账户注册和认证等准入流程。
        </p>
        <p class="para">
          在参与XShoppy分销活动时，您应当按系统页面的提示准确完整的提供您的信息（包括您的联系电话、电子邮件地址等）。如有变更，应及时提供最新、真实、完整的信息，以便XShoppy或其他用户与您联系。您了解并同意，您有义务保持您提供信息的真实性及有效性。如XShoppy按您提供的信息与您联系未果、您未按XShoppy要求及时提供信息、您提供的信息存在明显不实的，XShoppy将按规则进行处理，同时您应承担因此对您自身、他人及XShoppy造成的全部损失与不利后果。
        </p>

        <h3>3.3 账户安全规范</h3>
        <p class="para">
          <span class="blod">【账户安全保管义务】</span>
          您的账户为您自行设置并由您保管，XShoppy任何时候均不会主动要求您提供账户。因此，建议您务必保管好账户，并确保您在每个上网时段结束时退出登录并以正确步骤离开XShoppy分销活动。
        </p>
        <p class="para">
          <span class="blod"
            >账户因您主动泄露或遭受他人攻击、诈骗等行为导致的损失及后果，依据法律规定各自承担风险及责任。</span
          >
        </p>
        <p class="para">
          <span class="blod">【账户行为责任自负】</span
          >除XShoppy存在过错外，您应对您账户项下的所有行为结果（包括但不限于在线签署各类协议、创建推广计划、获取推广代码进行推广等）负责。
        </p>
        <p class="para">
          <span class="blod">【日常维护须知】</span
          >如发现任何未经授权参与您账户登录XShoppy分销活动或其他可能导致您账户遭窃、遗失的情况，建议您立即通知XShoppy，并授权XShoppy将该信息同步给XShoppy关联公司。您理解XShoppy对您的任何请求采取行动均需要合理时间，除XShoppy存在过错或法律强制性规定外，XShoppy对在采取行动前已经产生的后果不承担任何责任。
        </p>
        <h2>四、XShoppy分销活动服务及规范</h2>
        <h3>4.1 服务概况</h3>
        <p class="para">
          <span class="blod">【服务概况】</span>
          通过XShoppy分销活动可实现的功能包括但不限于如下，具体可登录XShoppy分销活动页面浏览（下述功能可能因XShoppy进行业务、产品性调整而被增加或修改，或因定期、不定期的维护而暂缓提供）：
        </p>
        <p class="para">
          （一） 您可自行创建专属邀请链接或海报，生成推广信息，选择适合的方式进行推广。
        </p>
        <p class="para">（二）奖励、推广效果数据统计结算，报表查询。</p>
        <p class="para">
          <span class="blod">【内容场景专项软件服务】</span>
          就内容场景，XShoppy分销活动另将提供专项技术实现与内容平台相关产品系统的对接，对接后可向XShoppy分销活动提供的服务包括但不限于如下（下述服务可能因XShoppy进行业务、产品性调整而被增加或修改，或因定期、不定期的维护而暂缓提供）：
        </p>
        <p class="para">
          （一） 支持您创建专属邀请链接或海报，并与XShoppy分销活动对接。
        </p>
        <p class="para">
          （二） 开发专项技术接口，支持XShoppy分销活动于内容平台生成的内容物料可与推广信息相关联，保证客户可通过您的专属邀请链接或海报可跳转并参与XShoppy分销活动，进而与XShoppy进行交易。
        </p>
        <h3>4.2 您与XShoppy分销活动的分销合作合同关系</h3>

        <p class="para">
          <span class="blod">【要约】</span
          >您点击确认本协议或事实上参与XShoppy分销活动时起（以时间在先者为准），即接受了XShoppy发出的XShoppy分销活动要约，同意参加XShoppy分销活动并按XShoppy分销活动现在及未来可能支持的各种推广方式和推广规则进行推广。
        </p>

        <p class="para">
          <span class="blod"> 【分销合作合同关系】 </span>
          您和XShoppy间建立的分销合作合同关系由双方按本协议履行。您进入XShoppy分销活动版块后，通过取链进行的推广为XShoppy产品进行推广。
        </p>
        <p class="para">
          <span class="blod"> 【推广变更】 </span>
          您与XShoppy分销活动建立推广关系后：
        </p>
        <p class="para">
          （一）XShoppy分销活动可能基于其业务政策等原因而中止或终止与XShoppy分销活动。
        </p>
        <p class="para">
          （二）<span class="throughLine"
            >请您自行、定期通过XShoppy分销活动取链页面、自有推广资源内的推广信息等渠道检查推广是否发生变更，包括推广代码是否仍然有效、推广信息是否发生变更等，并视变更情况调整分销方案。因您怠于检查导致您预估收入损失、推广信息侵权等问题由XShoppy分销活动您自行承担责任。</span
          >
        </p>
        <h3>4.3 XShoppy分销活动推广</h3>
        <h4>4.3.1 推广权限</h4>
        <p class="para">
          您参加XShoppy分销活动的推广权限以XShoppy分销活动实际推广时可参与的为准。
        </p>

        <h4>4.3.2 推广管理</h4>
        <p class="para">
          【合法性】您确保其自身及您的推广资源已经获得了政府有关部门的所有许可和批准（如需获得），不得违反国家法律法规的管理规定。您应确保您的推广信息真实、准确、合法。
        </p>
        <p class="para">
          【正当性】您有权通过相应推广资源进行本协议项下的合作，但不得侵犯他人权益。
        </p>
        <h3>4.4 费用与结算</h3>
        <h4>4.4.1 推广费</h4>
        <p class="para">
          <span class="blod"> 【收付款主体】</span>
          推广费（本协议内又称为“奖励”）由XShoppy支付给您。
        </p>
        <p class="para">
          <span class="blod"> 【奖励】</span>
          出于维护合作秩序及保护您权益的目的，XShoppy根据活动规则通过XShoppy分销活动系统对奖励金额进行了设置。
          <span class="throughLine">
            为更好地实现推广，XShoppy可能调整奖励金额或奖励机制。</span
          >
          <span class="blod"
            >依据活动规则，XShoppy将在实际收到客户支付费用后且满足约定条件后依约定期限计算并支付。</span
          >
        </p>
        <p class="para">
          【奖励退回】如果XShoppy发现向您支付的任何费用是错误支付的，XShoppy有权自行决定：（A）收回向您错误支付的任何费用；或（B）在未来应付费用中扣除错误金额；或（C）您应在被通知需要退还错误金额的三十（30）天内向XShoppy退还相应款项。
        </p>
        <h4>4.4.2 其他</h4>
        <p class="para">
          <span class="blod">【币种、单位及小数点处理】</span>
          本协议第4.5条约定的各项费用均按人民币计算，以元为单位，四舍五入保留两位小数点。
        </p>
        <p class="para">
          <span class="blod"
            >【计费依据】奖励以XShoppy分销活动系统统计和最终确认的数据为准。</span
          >XShoppy应确保统计结果的真实性，不得弄虚作假。
        </p>
        <p class="para">
          <span class="blod"> 【收款账户与提现】</span
          >按XShoppy分销活动系统、规则要求处理。  
        </p>
        <p class="para">
          <span class="blod"> 【其他费用】</span>为更好的进行推广，<span
            class="throughLine"
            >如新增其他第三方并要您向第三方支付合理费用的，XShoppy会通过本协议约定的通知方式，以合理的期限提前通知您，确保您有选择的权利。</span
          >
        </p>
        <h3>4.5 责任限制</h3>
        <p class="para">
          <span class="blod"> 【不可抗力】</span>
          <span class="throughLine">
            XShoppy将按“现状”和“可得到”的状态向您提供XShoppy分销活动所必须的技术支持。XShoppy依法律规定承担基础保障义务，但无法对由于信息网络设备维护、连接故障，电脑、通讯或其他系统的故障，电力故障，罢工，暴乱，火灾，洪水，风暴，爆炸，战争，政府行为，司法行政机关的命令或因第三方原因而给您造成的损害结果承担责任。
             </span
          >
        </p>

        <h2>五、个人信息保护</h2>
        <p class="para">
          XShoppy非常重视用户个人信息（即能够独立或与其他信息结合后识别用户身份的信息）的保护，在您参与XShoppy分销活动时，
          <span class="throughLine">
            您同意XShoppy按照在XShoppy网站公布的隐私权政策收集、存储、参与、披露和保护您的个人信息。 </span
          >XShoppy希望通过隐私权政策向您清楚地介绍XShoppy对您个人信息的处理方式，因此XShoppy建议您点击XShoppy网站首页底部链接完整地阅读隐私权政策，以帮助您更好地保护您的隐私权。
        </p>
        <h2>六、用户的违约及处理</h2>
        <h3>6.1 违约认定</h3>
        <p class="para">发生如下情形之一的，视为您违约：</p>
        <p class="para">（一） 参与XShoppy分销活动时违反相关法律法规规定的。</p>
        <p class="para">（二） 违反本协议或本协议补充协议约定的。</p>
        <p class="para">
          为适应电子商务发展和满足用户对高效优质服务的需求，您理解并同意，
          <span class="throughLine">
            XShoppy可在规则中约定违约认定程序和标准。如：XShoppy可通过过滤系统对XShoppy分销活动的推广效果数据进行排查，或通过人工对违约行为进行抓取；您有义务对您数据异常现象进行充分举证或合理解释，否则将被认定为违约。
          </span>
        </p>
        <h3>6.2 违约处理措施</h3>
        <p class="para">
          <span class="blod"> 【处理措施】 </span>
          <span class="throughLine"
            >XShoppy可依本协议及相关规则约定对您或您的关联账户采取冻结账户、不结算奖励、收回权限、终止合作等处理措施。</span
          >
        </p>
        <p class="para">
          <span class="blod"> 【处理结果公示】</span>
          <span class="throughLine">
            XShoppy可对您的违约行为处理措施信息，以及其他经国家行政或司法机关生效法律文书确认的违法信息予以公示。</span
          >
        </p>
        <h3>6.3 赔偿责任</h3>
        <p class="para">
          <span class="throughLine">
            如违约方的行为使XShoppy及/或其关联公司、其他守约方遭受损失（包括自身的直接经济损失、商誉损失及对外支付的赔偿金、和解款、律师费、诉讼费等间接经济损失），违约方应赔偿XShoppy及/或其关联公司、其他守约方的上述全部损失。</span
          >
        </p>
        <p class="para">
          <span class="throughLine">
            如违约方的行为使XShoppy及/或其关联公司、其他守约方遭受第三方主张权利，XShoppy及/或其关联公司、其他守约方可在对第三人承担金钱给付等义务后就全部损失向违约方追偿。</span
          >
        </p>
        <p class="para">
          <span class="throughLine">
            如XShoppy认定违约方的行为已经或者将必然导致守约方、第三方遭受损失，XShoppy及/或XShoppy关联公司出于守约方、第三方权益保护目的，可自应付违约方的费用中抵减。如仍不足支付相应款项的，违约方同意XShoppy可以参与自有资金代违约方支付上述款项，违约方应当返还该部分费用并赔偿因此造成XShoppy的全部损失。</span
          >
        </p>
        <p class="para">
          <span class="throughLine">
            对于违约方造成XShoppy及/或其关联公司、其他守约方、第三方的所有损失(包括XShoppy及/或其关联公司垫付款在内的上述所有情形)，违约方同意XShoppy可以自应付违约方的费用中抵减。如仍不足支付上述赔偿款项的，XShoppy及/或XShoppy关联公司可直接抵减违约方在XShoppy及/或XShoppy关联公司其它协议项下的权益，并可继续追偿。</span
          >
        </p>
        <h2>七、协议的变更</h2>
        <p class="para">
          XShoppy可根据国家法律法规变化及维护合作秩序需要，不时修改本协议、补充协议，变更后的协议、补充协议（下称“变更事项”）将按本协议约定方式通知您。
        </p>
        <p class="para">
          如您不同意变更事项，您有权于变更事项确定的生效日前联系XShoppy反馈意见。如反馈意见得以采纳，XShoppy将酌情调整变更事项。
        </p>
        <p class="para">
          <span class="throughLine">
            如您对已生效的变更事项仍不同意的，您应当于变更事项确定的生效之日起停止参与XShoppy分销活动，变更事项对您不产生效力；如您在变更事项生效后仍继续参与XShoppy分销活动的，则视为您同意已生效的变更事项。
          </span>
        </p>
        <h2>八、通知</h2>
        <p class="para">您同意XShoppy以以下任一合理的方式向您送达各类通知：</p>
        <p class="para">（一） 公示的文案。</p>
        <p class="para">（二） 站内信或弹窗等消息。</p>
        <p class="para">
          （三） 根据您预留于XShoppy的联系方式发出的电子邮件、短信、函件等。
        </p>

        <h2>九、协议的终止</h2>
        <h3>9.1 终止的情形</h3>
        <p class="para">
          <span class="blod">【用户发起的终止】</span>
          您有权通过以下任一方式终止本协议:
        </p>
        <p class="para">
          （一） 变更事项生效前您停止参与XShoppy分销活动，并明示不愿接受变更事项的。
        </p>
        <p class="para">（二） 您明示不愿继续参与XShoppy分销活动的。</p>
        <p class="para">
          （三） 除非您与XShoppy另有明确约定，您提前3天通知XShoppy的，可单方终止本协议，且无需承担违约责任。
        </p>
        <p class="para">
          <span class="blod"> 【XShoppy发起的终止】</span
          >符合以下任一条件的，XShoppy可以本协议约定方式通知您终止本协议：
        </p>
        <p class="para">
          （一） 您的账户为不活跃账户，被XShoppy依据本协议约定终止合作的。
        </p>
        <p class="para">
          （二） 您在与XShoppy及/或其关联公司进行其他合作时，有侵犯他人合法权益或其他严重违法违约行为的。
        </p>
        <p class="para">
          （三） 您违反本协议其他约定，XShoppy依据本协议约定终止合作的。
        </p>
        <p class="para">
          （四） 除非XShoppy与您另有明确约定，<span class="throughLine"
            >XShoppy提前3天通知您的，可单方终止本协议，且无需承担违约责任。</span
          >
        </p>
        <p class="para">
          （五）<span class="throughLine"> 其它应当终止服务的情况。</span>
        </p>
        <p class="para">
          本协议终止的，您不能再登录XShoppy分销活动页面。反之，<span
            class="throughLine"
            >当XShoppy通知您永久关闭XShoppy账户或终止您参与XShoppy分销活动时，本协议将同时终止，XShoppy将不再另行通知您终止本协议。</span
          >
        </p>
        <h3>9.2 终止后的处理</h3>

        <p class="para">
          <span class="blod">【用户信息披露】</span>
          <span class="throughLine">
            本协议终止后，除法律有明确规定外，XShoppy无义务向您或您指定的第三方披露您账户中的任何信息。</span
          >
        </p>
        <p class="para">
          <span class="blod">【其他事项处理】</span>本协议终止后：
        </p>
        <p class="para">
          （一） 本协议有效期内已经执行的部分仍应按实际履行情况及本协议约定进行。对于您过往的违约行为，XShoppy仍可依据本协议向您追究违约责任。
        </p>
        <p class="para">
          （二） XShoppy有权继续保存您留存于XShoppy分销活动内提交的本协议第五条所列的各类信息。
        </p>

        <h2>十、法律适用、管辖与其他</h2>
        <p class="para">
          <span class="blod">【法律适用】</span
          ><span class="throughLine"
            >本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用中华人民共和国大陆地区法律；如法律无相关规定的，参照商业惯例及/或行业惯例。</span
          >
        </p>
        <p class="para">
          <span class="blod">【管辖】</span
          ><span class="throughLine"
            >您因本协议所产生的任何争议，由XShoppy与您协商解决。协调不成时，任何一方均可向XShoppy经营主体住所地有管辖权的人民法院提起诉讼。</span
          >
        </p>
        <p class="para">
          <span class="blod"> 【可分性】</span
          ><span class="throughLine"
            >本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。</span
          >
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
      isMobile: inject("isMobile"),
      backFn,
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang="scss">
.pc.agreement-container,
.mobile.agreement-container {
  background-color: #fff;
  padding-top: 32px;
  padding-bottom: 30px;
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
      h2 {
        font-size: 18px;
        text-align: left;
        font-weight: bold;
        margin-bottom: 24px;
      }
      h3 {
        font-size: 16px;
        text-align: left;
        font-weight: bold;
        margin-bottom: 24px;
      }
      h4 {
        font-size: 14px;
        text-align: left;
        font-weight: bold;
        margin-bottom: 24px;
      }
      .para {
        text-indent: 2em;
        font-size: 14px;
        text-align: left;
        line-height: 20px;
        margin-bottom: 16px;
        color: #000000;
        text-align: justify;
        .blod {
          font-weight: bold;
        }
        .throughLine {
          text-decoration: underline;
          font-weight: bold;
        }
        .red {
          color: #ff4343;
        }
      }
    }
  }
}
.mobile.agreement-container {
  background-color: #fff;
  padding-top: 32px;
  .content {
    width: 100%;
    padding: 24px 20px;
    box-sizing: border-box;
  }
}
</style>
