<script>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useLangStore } from '@/stores/settings'

export default {
    setup(props, ctx) {
        const { attrs: { descriptions, showDesc } } = ctx
        const langStore = useLangStore()
        const $route = useRoute()
        const { lang } = storeToRefs(langStore)
        let isShow = ref(true)
        return {
            lang,
            descriptions,
            isShow,
            showDesc
        }
    }
}
</script>
<template>
    <div class="toast" v-show="isShow">
        <div class="content">
            <div class="top">
                <h3 class="title">{{ $route.name == 'artist' ? lang.artist.artistDesc : lang.album.albumDesc }}</h3>
                <i class="iconfont icon-close-bold" @click="showDesc"></i>
            </div>
            <div class="descriptions">
                {{ descriptions }}
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.toast {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh !important;
    background-color: rgba(53, 53, 53, 0.42);
    display: flex;
    justify-content: center;
    align-items: center;
    
    .content {
        border: 1px solid var(--bg_theme_color);
        width: 50%;
        height: 60%;
        backdrop-filter: var(--nav_player_bd-f);
        color: var(--common_text_color);
        border-radius: 10px;
        .top {
            width: 100%;
            height: 10%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            border-bottom: 3px solid rgba(94, 94, 94, 0.308);

            .iconfont {
                width: 22px;
                height: 22px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover {
                    background-color: rgba(193, 192, 192, 0.397);
                }
            }
        }

        .descriptions {
            width: 100%;
            height: 85%;
            padding: 15px;
            overflow: auto;
        }
    }
}
</style>