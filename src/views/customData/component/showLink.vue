<!---*
* @description 
* @fileName showlink.vue
* @author 叶金龙
* @date 2021/08/13 15:01:13
*--->
<template>
    <teleport to=".dialog">
        <div
            :class="[{ pc: !isMobile, mobile: isMobile }, 'dialog_mask']"
            v-if="showLinkVisible"
        ></div>
        <div
            :class="[{ pc: !isMobile, mobile: isMobile }, 'dialogBox']"
            v-if="showLinkVisible"
        >
            <div class="top">
                <span>
                    {{ title }}
                </span>
                <svg-icon
                    icon-class="close"
                    @click.native="simpleClose"
                />
            </div>
            <div :class="[{ pc: !isMobile, mobile: isMobile }, 'content']">
                <div class="name">{{ chanel?.name }}的专属链接</div>
                <div
                    class="box qrcode-img"
                    id="qrcode"
                >
                    <img :src="chanel?.qr_code" />
                </div>
                <button
                    v-if="!isMobile"
                    class="primary"
                    @click="downLoadImg(chanel?.name, 'img-qr' + chanel?.id, chanel?.qr_code)"
                >
                    下载海报
                </button>
                <p
                    v-else
                    class="tips"
                >长按海报保存到手机</p>
                <div class="copyLine">
                    <span
                        class="url"
                        :title="chanel?.channel_url"
                    >{{
            chanel?.channel_url
          }}</span>
                    <span
                        class="copy"
                        v-copy="chanel?.channel_url"
                    >复制</span>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, SetupContext, inject } from "vue";
import { downLoadImg } from "@/utils/downLoad";
// import qrcode from "@/components/qrcode.vue";
interface Data {}
export default defineComponent({
    name: "",
    props: {
        showLinkVisible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "提示"
        },
        chanel: {
            type: Object,
            required: true
        }
    },
    components: {},
    setup(props, ctx: SetupContext) {
        const data: Data = reactive<Data>({});
        let simpleClose = () => {
            ctx.emit("update:showLinkVisible", false);
        };
        return {
            simpleClose,
            downLoadImg,
            isMobile: inject("isMobile"),
            ...toRefs(data)
        };
    }
});
</script>

<style scoped lang="scss">
.pc.content,
.mobile.content {
    padding: 32px;
    .name {
        font-size: 14px;
        margin-bottom: 16px;
        color: #202d40;
        line-height: 20px;
    }
    .qrcode-img {
        margin: 8px 0;
        height: 148px;
        img {
            max-height: 148px;
        }
    }
    .box {
        border: 1px solid #ccc;
        width: 148px;
        height: 148px;
        margin: 0 auto;
        border-radius: 4px;
    }
    button {
        margin-top: 8px;
    }

    .tips {
        font-size: 12px;
        text-align: center;
        color: #cbcbcb;
    }
    .copyLine {
        text-align: center;
        height: 20px;
        margin-top: 16px;
        line-height: 20px;
        .url {
            display: inline-block;
            max-width: 175px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;
            vertical-align: top;
        }
        .copy {
            color: #442bde;
            font-size: 14px;
            margin-left: 6px;
            font-weight: 600;
            cursor: pointer;
            vertical-align: top;
        }
    }
}
.mobile.content {
}
</style>
