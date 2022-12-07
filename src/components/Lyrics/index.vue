<script setup>
import { storeToRefs } from 'pinia'
import { reactive } from 'vue';
import { useLangStore } from '@/stores/settings'

import Switch from '@/EncapComponents/Switch/index.vue'

const langStore = useLangStore()
const { lang } = storeToRefs(langStore)

function turn(a) {
    console.log(a)
}

</script>

<template>
    <div class="lyrics">
        <h2 class="title">{{lang.settings.lyricFontSize.title}}</h2>
        <div class="showLyricsTranslation">
            <div class="text">{{ lang.settings.showLyricsTranslation }}</div>
            <div class="switch">
                <Switch @switch="turn"/>
            </div>
        </div>
        <div class="lyricsBackground">
            <div class="text">{{ lang.settings.lyricsBackground.text }}</div>
            <select class="selection">
                <option value="off" selected>{{ lang.settings.lyricsBackground.off }}</option>
                <option value="on">{{ lang.settings.lyricsBackground.on }}</option>
                <option value="dynamic">{{ lang.settings.lyricsBackground.dynamic }}</option>
            </select>
        </div>
        <div class="lyrics1">
            <div class="text">{{ lang.settings.lyricFontSize.text }}</div>
            <select class="selection" @change="switchLang">
                <option value="small" selected>{{ lang.settings.lyricFontSize.small }}</option>
                <option value="medium">{{ lang.settings.lyricFontSize.medium }}</option>
                <option value="large">{{ lang.settings.lyricFontSize.large }}</option>
                <option value="xlarge">{{ lang.settings.lyricFontSize.xlarge }}</option>
            </select>
        </div>
    </div>
</template>

<style lang="less" scoped>

.lyrics {
    width: 50%;
    height: 240px;

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