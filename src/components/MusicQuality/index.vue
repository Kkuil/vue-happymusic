<script setup>
import { storeToRefs } from 'pinia';
import { useLangStore } from '@/stores/settings/index.js'

const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
</script>

<template>
    <div class="music_quality">
        <h2 class="title">{{ lang.settings.musicQuality.title }}</h2>
        <div class="quality">
            <div class="text">{{ lang.settings.musicQuality.text }}</div>
            <select class="selection">
                <option value="low" selected>{{ lang.settings.musicQuality.low }}</option>
                <option value="medium">{{ lang.settings.musicQuality.medium }}</option>
                <option value="high">{{ lang.settings.musicQuality.high }}</option>
                <option value="lossless">{{ lang.settings.musicQuality.lossless }}</option>
            </select>
        </div>
    </div>
</template>

<style lang="less" scoped>
.music_quality {
    width: 50%;
    height: 113px;
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