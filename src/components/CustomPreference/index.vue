<script setup>
import { storeToRefs } from 'pinia'
import { reactive } from 'vue';
import { useLangStore, useAppearStore } from '@/stores/settings'
import moment from 'moment'

const langStore = useLangStore()
const appearStore = useAppearStore()
const { lang } = storeToRefs(langStore)
const setting = reactive({
    language: null,
    appearance: null,
    preference: null
})

// 切换语言
function switchLang(e) {
    langStore.updateLang(e.target.value)
}

// 更换主题
function changeTheme(e) {
    const themeColor = e.target.value
    let flag = themeColor == 'dark' ? 0 : themeColor == 'light' ? 1 : 2
    if(flag == 2) {
        const now = moment().format('H')
        flag = +now >= 18 ? 0 : 1
    }
    const appearance = flag ? 'light' : 'dark'
    appearStore.updateAppearance(appearance)
}
</script>

<template>
    <div class="custom_preference">
        <div class="language">
            <div class="text">{{ lang.settings.language.text }}</div>
            <select class="selection" @change="switchLang">
                <option value="Chinese" selected>{{ lang.settings.language.Chinese }}</option>
                <option value="English">{{ lang.settings.language.English }}</option>
                <option value="Taiwanese">{{ lang.settings.language.Taiwanese }}</option>
                <option value="Turkish">{{ lang.settings.language.Turkish }}</option>
            </select>
        </div>
        <div class="appearance">
            <div class="text">{{ lang.settings.appearance.text }}</div>
            <select class="selection" @change="changeTheme">
                <option value="auto" selected>{{ lang.settings.appearance.auto }}</option>
                <option value="light">{{ lang.settings.appearance.light }}</option>
                <option value="dark">{{ lang.settings.appearance.dark }}</option>
            </select>
        </div>
        <div class="music_preference">
            <div class="text">{{ lang.settings.preference.text }}</div>
            <select class="selection">
                <option value="noPrefer">{{ lang.settings.preference.noPrefer }}</option>
                <option value="Chinese" selected>{{ lang.settings.preference.China }}</option>
                <option value="Euro_American">{{ lang.settings.preference.Euro_American }}</option>
                <option value="Japanese">{{ lang.settings.preference.Japanese }}</option>
                <option value="Korean">{{ lang.settings.preference.Korean }}</option>
            </select>
        </div>
    </div>
</template>

<style lang="less" scoped>

.custom_preference {
    width: 50%;
    height: 200px;

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