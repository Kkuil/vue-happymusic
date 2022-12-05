import { defineStore } from 'pinia'
import zhCN from '@/locale/lang/zh-CN'
import en from '@/locale/lang/en'
import zhTW from '@/locale/lang/zh-TW'
import tr from '@/locale/lang/tr'

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
        }
    }
})