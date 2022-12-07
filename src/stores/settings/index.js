import { defineStore } from 'pinia'
import zhCN from '@/locale/lang/zh-CN'
import en from '@/locale/lang/en'
import zhTW from '@/locale/lang/zh-TW'
import tr from '@/locale/lang/tr'

// 语言设置
export const useLangStore = defineStore('lang', {
    state: () => {
        return {
            lang: zhCN
        }
    },
    actions: {
        updateLang(lang = 'Chinese') {
            const mapLang = {
                'Chinese': zhCN,
                'English': en,
                'Taiwanese': zhTW,
                'Turkish': tr
            }
            this.lang = mapLang[lang]
            localStorage.setItem('settings', JSON.stringify({ ...JSON.parse(localStorage.getItem('settings')), language: lang }))
        }
    }
})

// 主题设置
export const useAppearStore = defineStore('appearance', {
    state: () => {
        return {
            appearance: 'light'
        }
    },
    actions: {
        updateAppearance(appearance) {
            this.appearance = appearance
            document.body.style.setProperty('--bg_theme_color', appearance == 'dark' ? '#222' : '#fff')
            document.body.style.setProperty('--common_text_color', appearance == 'dark' ? '#fff' : '#000')
            document.body.style.setProperty('--secondary_bg_color', appearance == 'dark' ? '#333' : '#f5f5f7')
            document.body.style.setProperty('--secondary_hover_bg_color', appearance == 'dark' ? '#333' : '#87c9f8b6')
            document.body.style.setProperty('--symbol_color', appearance == 'dark' ? '#303030' : '#cfcfcf')        
            localStorage.setItem('settings', JSON.stringify({ ...JSON.parse(localStorage.getItem('settings')), appearance }))
        }
    }
})

// 语种设置
export const usePreferStore = defineStore('preference', {
    state: () => {
        return {
            preference: 'Chinese'
        }
    },
    actions: {
        updatePreference(preference) {
            this.preference = preference
        }
    }
})

// 音质设置
export const useMQStore = defineStore('music_quality', {
    state: () => {
        return {
            music_quality: 'common'
        }
    },
    actions: {
        updatePreference(music_quality) {
            this.music_quality = music_quality
        }
    }
})

// 歌词设置
export const useLyricsStore = defineStore('lyrics', {
    state: () => {
        return {
            lyrics: 'common'
        }
    },
    actions: {
        updatePreference(lyrics) {
            this.lyrics = lyrics
        }
    }
})

// 苹果推荐歌单
export const useAppleListStore = defineStore('isShowAppleList', {
    state: () => {
        return {
            isShowAppleList: true
        }
    },
    actions: {
        updateIsShowAppleList(isShowAppleList) {
            this.isShowAppleList = isShowAppleList
            localStorage.setItem('settings', JSON.stringify({ ...JSON.parse(localStorage.getItem('settings')), isShowAppleList }))
        }
    }
})