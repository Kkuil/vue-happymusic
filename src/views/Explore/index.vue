<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useLangStore } from '@/stores/settings'

import CoverRow from '@/EncapComponents/CoverRow/index.vue'

import { playlistCategories } from '@/utils/staticData'
import { TopPlaylist, RecommendList, HighQualityPlaylist } from '@/api/playlist'
import { TopList } from '@/api/toplist'

const $route = useRoute()
const $router = useRouter()
const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
const main_cates = ['语种', '风格', '场景', '情感', '主题']
const sub_cates = computed(() => {
    const temp = {
        'static': [],
        '语种': [],
        '风格': [],
        '场景': [],
        '情感': [],
        '主题': []
    }
    playlistCategories.forEach(cate => {
        temp[cate.bigCate].push(cate.name)
    })
    return temp
})
const navigations = reactive(sub_cates.value['static'])
let active_cate = ref(0)
let isShowRemain = ref(false)
const content = reactive({
    list: [],
    offset: 0,
    imgProp: 'coverImgUrl',
})

function play_count(playCount) {
    const pc = Math.floor(playCount / 10000)
    return pc ? pc : playCount
}

function addNavi(item) {
    const index = navigations.indexOf(item)
    if (index == -1) navigations.push(item)
    else {
        navigations.splice(index, 1)
    }
}

function switchCate(cate_name, index) {
    active_cate.value = index
    $router.push({
        path: 'explore',
        query: {
            cate: cate_name
        }
    })
}

async function naviCate(cate_name, offset, flag) {
    const mapCate = {
        '推荐歌单': {
            fn: GetRecommendPlaylist,
            list: 'result',
            cover: 'picUrl'
        },
        '精品歌单': {
            fn: GetHighQualityPlaylist,
            list: 'playlists',
            cover: 'coverImgUrl'
        },
        '排行榜': {
            fn: GetTopList,
            list: 'list',
            cover: 'coverImgUrl'
        },
    }
    if (mapCate[cate_name]) {
        const { fn, list, cover } = mapCate[cate_name]
        const data = await fn()
        !flag
        ? content.list.splice(0, content.list.length, ...data[list])
        : content.list.push(...data[list])
        content.imgProp = cover
    } else {
        const { playlists } = await GetTopPlayList(cate_name, offset)
        !flag
        ? content.list.splice(0, content.list.length, ...playlists)
        : content.list.push(...playlists)
        content.imgProp = 'coverImgUrl'
    }
}

// TopPlayList
async function GetTopPlayList(cate_name, offset = 0) {
    return await TopPlaylist({
        offset,
        cat: cate_name
    })
}

// RecommendList   result  picUrl
async function GetRecommendPlaylist() {
    return await RecommendList({
        limit: 50
    })
}

// HighQualityPlaylist   playlists  coverImgUrl
async function GetHighQualityPlaylist(before) {
    return await HighQualityPlaylist({
        before
    })
}

// TopList    list coverImgUrl
async function GetTopList() {
    return await TopList({})
}

function loadMore() {
    naviCate($route.query.cate, content.offset + 50, 1)
    content.offset += 50
}

watch($route, route => {
    const cate = $route.query.cate
    if (!navigations.includes(cate)) {
        navigations.push(cate)
        active_cate.value = navigations.length - 1
    }
    naviCate(cate, content.offset, 0)
}, {
    immediate: true
})

</script>

<template>
    <div id="explore">
        <div class="title">{{ lang.nav.explore }}</div>
        <div class="nav">
            <div class="show_nav">
                <div class="navigations">
                    <div v-for="nav, index in navigations" :key="nav" class="nav_btn"
                        :class="`${active_cate == index ? 'show_nav_active' : ''}`" @click="switchCate(nav, index)">
                        <span>{{ nav }}</span>
                    </div>
                </div>
                <div class="more nav_btn" @click="(isShowRemain = !isShowRemain)">
                    <i class="iconfont icon-gengduo"></i>
                </div>
            </div>
            <div class="hide_nav" v-show="isShowRemain">
                <div v-for="nav in main_cates" :key="nav" class="nav">
                    <h2 class="main">{{ nav }}</h2>
                    <div class="sub">
                        <div v-for="item in sub_cates[nav]" :key="item" class="item nav_btn" @click="addNavi(item)"
                            :class="`${navigations.includes(item) ? 'hide_nav_active' : ''}`">
                            <span>{{ item }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <CoverRow :list="content.list" :imgProp="content.imgProp" navigatePage="playlist"
                :seeMoreInfo="{ isShowSeeMore: false }" :isRadius="false" :isShowPlayButton="true"
                :isTextCenter="false">
                <template #name="{ item }">
                    <div class="text">
                        <span class="play_count" v-show="$route.query.cate != '排行榜'">
                            <i class="iconfont icon-playfill"></i>
                            <span>{{ play_count(item.playCount) }}w</span>
                        </span>
                        <span class="main_name">{{ item.name }}</span>
                        <span class="updateFrequency" v-show="$route.query.cate == '排行榜'">{{ item.updateFrequency
                        }}</span>
                    </div>
                </template>
            </CoverRow>
        </div>
        <div v-show="!['推荐歌单', '排行榜'].includes($route.query.cate)" class="load_more" @click="loadMore">{{
                lang.explore.loadMore
        }}</div>
    </div>
</template>

<style lang="less" scoped>
#explore {
    width: 100%;
    color: var(--common_text_color);

    .title {
        width: 100%;
        font-weight: bolder;
        font-size: 3vw;
    }

    >.nav {
        margin-top: 20px;
        width: 100%;
        height: auto;

        .show_nav {
            width: 100%;
            display: flex;

            .navigations {
                display: flex;
                flex-wrap: wrap;
                width: auto;

                >div {
                    cursor: pointer;
                    margin: 5px;
                    width: auto;
                    height: 35px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bolder;
                    padding: 8px;
                    color: #7a7a7b;
                    background-color: rgba(204, 204, 204, 0.253);
                }
            }

            .more {
                width: 50px;
                cursor: pointer;
                margin: 5px;
                height: 35px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bolder;
                padding: 8px;
                color: #7a7a7b;
                background-color: rgba(204, 204, 204, 0.253);
            }
        }

        .show_nav_active {
            color: #335eea !important;
            background-color: #bbcdff !important;
        }

        .hide_nav_active {
            color: #335eea !important;
        }

        .hide_nav {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: auto;
            border-radius: 10px;
            padding: 30px;
            margin-top: 10px;
            background-color: rgba(204, 204, 204, 0.253);

            .nav {
                width: 100%;
                display: flex;
                margin-bottom: 20px;

                .title {
                    width: 20%;
                    color: #bdbdbd;
                }

                .sub {
                    margin-left: 30px;
                    width: 80%;
                    display: flex;
                    flex-wrap: wrap;

                    .item {
                        padding: 8px;
                        height: 35px;
                        font-size: 16px;
                        display: flex;
                        margin-right: 10px;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }

            > :last-child {
                margin-bottom: 0;
            }
        }

        .nav_btn {
            border-radius: 8px;
            cursor: pointer;

            &:hover {
                color: #335eea !important;
                background-color: #bbcdff !important;
            }
        }

    }

    .content {
        width: 100%;

        .text {
            margin-top: 3px;
            display: flex;
            flex-direction: column;

            .play_count {
                font-size: 1vw;
                color: rgba(204, 204, 204, 0.189);

                .iconfont {
                    font-size: 0.8vw;
                }
            }

            .main_name,
            .sub_name {
                cursor: pointer;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .main_name {
                font-size: 1.2vw;
                color: var(--common_text_color);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                &:hover {
                    text-decoration: underline;
                }
            }

            .sub_name {
                font-size: 0.7vw;
                color: rgb(116, 116, 116);

                &:hover {
                    text-decoration: underline;
                }
            }

            .updateFrequency {
                font-size: 0.8vw;
            }
        }
    }

    .load_more {
        cursor: pointer;
        width: 80px;
        padding: 8px;
        margin: 15px auto;
        font-weight: bolder;
        border-radius: 8px;
        background-color: rgba(204, 204, 204, 0.203);

        &:hover {
            transform: scale(1.05);
        }

        &:active {
            transform: scale(0.9);
        }
    }
}
</style>