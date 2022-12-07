<script setup>
import { storeToRefs } from 'pinia'
import { reactive } from 'vue';
import { useLangStore, useAppleListStore } from '@/stores/settings'

import Switch from '@/EncapComponents/Switch/index.vue'

const langStore = useLangStore()
const appleListStore = useAppleListStore()
const { lang } = storeToRefs(langStore)
const { isShowAppleList } = storeToRefs(appleListStore)

function isShowApple(isShowAppleList) {
    appleListStore.updateIsShowAppleList(isShowAppleList)
}

</script>

<template>
    <div class="others">
        <h2 class="title">{{lang.settings.lyricFontSize.title}}</h2>
        <div class="showPlaylistsByAppleMusic">
            <div class="text">{{ lang.settings.showPlaylistsByAppleMusic }}</div>
            <div class="switch">
                <Switch @switch="isShowApple" :initial="isShowAppleList"/>
            </div>
        </div>
        <div class="subTitleDefault">
            <div class="text">{{ lang.settings.subTitleDefault }}</div>
            <div class="switch">
                <Switch/>
            </div>
        </div>
        <div class="enableReversedMode">
            <div class="text">{{ lang.settings.enableReversedMode }}</div>
            <div class="switch">
                <Switch/>
            </div>
        </div>
        <div class="showLyricsTranslation">
            <div class="img">
                <svg class="iconfont">
                    <use xlink:href="#icon-rainbow"/>
                </svg>
                <img src="../../../public/img/logos/nyancat-stop.png" alt="">
            </div>
            <div class="switch">
                <Switch/>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>

.others {
    width: 50%;
    height: 300px;

    .title {
        padding-bottom: 10px;
        color: var(--common_text_color);
        border-bottom: 1px solid rgb(92, 92, 92);
    }
    >div {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .text {
            font-size: 16px;
            font-weight: 500;
            opacity: .78;
            color: var(--common_text_color);
        }

        .img {
            width: 60px;
            height: 40px;
            display: flex;
            align-items: center;
            .iconfont {
                width: 50%;
                height: 50%;
            }
            img {
                width: 50%;
                height: 50%;
            }
        }

        .selection {
            width: 10vw;
            height: 35px;
            border-radius: 10px;
            color: var(--common_text_color);
            background-color: var(--secondary_bg_color);
            &:focus {
                color: #222;
                background-color: var(--secondary_focus_bg_color);
            }
        }
    }
}
</style>