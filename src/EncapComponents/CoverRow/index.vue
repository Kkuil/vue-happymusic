<script>
import { ref } from 'vue'
import { useLangStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
    setup(props, ctx) {
        const { attrs: { title, list, imgProp, uniqueSubName, subName, navigatePage, seeMoreInfo, isRadius, isShowPlayButton, isTextCenter } } = ctx
        const langStore = useLangStore()
        const { lang } = storeToRefs(langStore)
        const $router = useRouter()
        let isUpdate = ref(false)
        function navigation(id) {
            $router.push({
                path: `/${this.navigatePage}`,
                query: {
                    id
                }
            })
        }
        return {
            lang,
            title,
            list,
            imgProp,
            uniqueSubName,
            subName,
            navigatePage,
            seeMoreInfo,
            isRadius,
            isShowPlayButton,
            isTextCenter,
            isUpdate,
            navigation
        }
    },
    methods: {
        seeMore() {
            this.$router.push({
                name: this.seeMoreInfo.navigatePage
            })
        }
    },
    updated() {
        this.isUpdate = true
    }
}
</script>

<template>
    <div class="cover_row">
        <div class="top">
            <span class="title">{{ title }}</span>
            <span v-show="seeMoreInfo.isShowSeeMore" class="see_more" @click="seeMore">{{ lang.home.seeMore }}</span>
        </div>
        <div class="content">
            <div v-for="item in list" :key="item.id" class="cover_item" @click="navigation(item.id)">
                <div class="cover" :style="`${isRadius ? 'border-radius: 50%;' : ''}`">
                    <img class="img" :src="item[imgProp]" />
                    <div class="play" v-show="isShowPlayButton">
                        <i class="iconfont icon-playfill"></i>
                    </div>
                </div>
                <div class="text" :style="`${isTextCenter ? 'align-items: center;' : ''}`">
                    <span class="main_text">{{ item.name }}</span>
                    <span v-if="uniqueSubName" class="sub_text">{{ uniqueSubName }}</span>
                    <span v-else class="sub_text">{{ isUpdate ? item[subName[0]][subName[1]] : '' }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.cover_row {
    width: 100%;
    margin-top: 20px;
    >div {
        width: 100%;
    }

    .top {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 15px;

        .title {
            font-weight: bolder;
            font-size: 2.3vw;
            color: var(--common_text_color);
        }

        .see_more {
            font-size: 1vw;
            cursor: pointer;
            color: #ccc;
            opacity: 0.5;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .content {
        margin: 0 !important;
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        .cover_item {
            width: 18%;
            height: 19vw;
            margin-top: 1.5vw;
            margin-left: 1.4vw;

            .cover {
                position: relative;
                width: 100%;
                height: 80%;
                border-radius: 15px;
                overflow: hidden;

                &:hover {
                    filter: drop-shadow(5px 5px 20px);
                }

                .img {
                    height: 100%;
                }

                .play {
                    cursor: pointer;
                    z-index: 99;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: transparent;

                    .iconfont {
                        cursor: default;
                        width: 3vw;
                        height: 3vw;
                        font-size: 2vw;
                        border-radius: 50%;
                        backdrop-filter: blur(5px);
                        display: none;
                        justify-content: center;
                        align-items: center;
                        color: var(--common_text_color);

                        &:active {
                            transform: scale(0.9);
                        }

                        &:hover {
                            opacity: 0.8;
                        }
                    }

                    &:hover .iconfont {
                        display: flex;
                    }
                }
            }

            .text {
                margin-top: 10px;
                display: flex;
                flex-direction: column;

                .main_text,
                .sub_text {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .main_text {
                    font-size: 1.2vw;
                    color: var(--common_text_color);
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                    &:hover {
                        text-decoration: underline;
                    }
                }

                .sub_text {
                    font-size: 0.7vw;
                    color: rgb(116, 116, 116);

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>