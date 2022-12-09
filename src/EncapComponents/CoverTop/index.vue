<script>
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import emitter from '@/utils/eventBus.js'

import { useLangStore } from '@/stores/settings'
import DescToast from '@/EncapComponents/DescToast/index.vue'
export default {
    components: {
        DescToast
    },
    setup(props, ctx) {
        const { attrs: { coverImgUrl, title, artistName, tags, descriptions } } = ctx
        const $route = useRoute()
        const langStore = useLangStore()
        const { lang } = storeToRefs(langStore)
        let isShowMenu = ref(false)
        let isShowDesc = ref(false)
        const menu_pos = reactive({
            left: 0,
            top: 0
        })
        return {
            lang,
            coverImgUrl,
            title,
            artistName,
            tags,
            descriptions,
            isShowMenu,
            isShowDesc,
            menu_pos
        }
    },
    methods: {
        showMenu(e) {
            this.isShowMenu = true
            this.menu_pos.left = e.offsetX
            this.menu_pos.top = e.offsetY
        },
        showDesc() {
            this.isShowDesc = !this.isShowDesc
        }
    },
    mounted() {
        emitter.on('hideMenu', () => {
            this.isShowMenu = false
        })
    }
}
</script>

<template>
    <div class="cover_top">
        <div class="cover_img"
            :style="`background-image: url(${coverImgUrl}); ${$route.name == 'artist' ? 'border-radius: 50%;' : ''}`">
        </div>
        <div class="cover_info">
            <h1 class="title">{{ title }}</h1>
            <h3 class="sub_title">
                <span v-if="$route.name == 'artist'">{{ lang.artist.artist }}</span>
                <span v-else>Single by {{ artistName }}</span>
                <span v-for="tag, index in tags" :key="tag" class="tag">
                    (
                        {{ tag }}
                        <span v-show="(index != tags.length - 1)">,</span>
                    )
                </span>
            </h3>
            <h5 class="achievements">
                <slot name="achievements"></slot>
            </h5>
            <span class="descriptions" @click="showDesc">
                {{ descriptions }}
            </span>
            <div class="controls">
                <div class="play">
                    <i class="iconfont icon-playfill"></i>
                    <span>{{ lang.common.play }}</span>
                </div>
                <div class="like">
                    <span v-if="$route.name == 'artist'">关注</span>
                    <span v-else>
                        <i class="iconfont icon-heart"></i>
                    </span>
                </div>
                <div class="remain_tools" @click.stop="showMenu">
                    <span>...</span>
                    <div v-show="(isShowMenu && $route.name == 'artist')" class="artist_menu"
                        :style="`top: ${menu_pos.top}; left: ${menu_pos.left};`">
                        <div class="copy_link" @click="">
                            <span>{{ lang.contextMenu.copyUrl }}</span>
                        </div>
                        <div class="open_in_browser" @click="">
                            <span>{{ lang.contextMenu.openInBrowser }}</span>
                        </div>
                    </div>
                    <div v-show="(isShowMenu && $route.name == 'album')" class="album_menu"
                        :style="`top: ${menu_pos.top}; left: ${menu_pos.left};`">
                        <div class="save_to_library" @click="">
                            <span>{{ lang.contextMenu.saveToLibrary }}</span>
                        </div>
                        <div class="add_list" @click="">
                            <span>{{ lang.contextMenu.addToPlaylist }}</span>
                        </div>
                        <div class="copy_link" @click="">
                            <span>{{ lang.contextMenu.copyUrl }}</span>
                        </div>
                        <div class="open_in_browser" @click="">
                            <span>{{ lang.contextMenu.openInBrowser }}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <DescToast :descriptions="descriptions" v-show="isShowDesc" :showDesc="showDesc"/>
    </div>
</template>

<style lang="less" scoped>
.cover_top {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;

    >div {
        height: 300px;
    }

    .cover_img {
        width: 300px;
        border-radius: 15px;
        background-color: #fff;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .cover_info {
        position: relative;
        margin-left: 40px;
        display: flex;
        justify-content: flex-start;
        align-content: flex-start;
        flex-direction: column;
        color: var(--common_text_color);

        .title {
            width: 100px;
            font-size: 40px;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .sub_title {
            opacity: 0.8;
            font-weight: normal;
            margin-top: 30px;
        }

        .achievements {
            margin-top: 5px;
            font-weight: normal;
            opacity: 0.8;
        }

        .descriptions {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 60vw;
            cursor: pointer;
            opacity: 0.6;
            margin-top: 30px;
            overflow: hidden;
            font-weight: normal;
            display: -webkit-box;
            text-overflow: ellipsis;
            white-space: pre-wrap;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;

            &:hover {
                opacity: 0.9;
            }
        }

        .controls {
            position: absolute;
            bottom: 0;
            width: 190px;
            display: flex;
            justify-content: space-between;

            >div {
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 35px;
                border-radius: 5px;
                color: var(--common_text_color);

                &:hover {
                    transform: scale(1.05);
                }

                &:active {
                    transform: scale(0.9);
                }
            }

            .play {
                width: 85px;
                background-color: #000;
                font-weight: bolder;

                color: #335eea;
                background-color: #bbcdff;

                .iconfont {
                    margin-right: 3px;
                }
            }

            .like,
            .remain_tools {
                position: relative;
                padding: 0 10px;
                background-color: rgba(58, 58, 58, 0.326);

                >span {
                    font-weight: bold;
                    color: var(--common_text_color);
                }

                [class$='_menu'] {
                    position: absolute;
                    width: 130px;
                    transform: translate(50%, 50%);
                    border-radius: 10px;
                    border: 1px solid #eee;
                    background-color: var(--bg_theme_color);
                    padding: 6px;
                    overflow: hidden;
                    box-shadow: 0 12px 10px rgba(0, 0, 0, 0.3);

                    >div {
                        width: 100%;
                        height: 45px;
                        border-radius: 10px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;

                        span {
                            font-size: 13px;
                            font-weight: bolder;
                            font-family: var(--common_font_family);
                        }

                        &:hover {
                            color: var(--font_theme_color);
                            background-color: var(--secondary_hover_bg_color);
                        }
                    }
                }
            }

        }
    }
}
</style>