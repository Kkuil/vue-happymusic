<script setup>
import VuePlyr from 'vue-plyr';
import '@/assets/styles/vue-plyr.css';
import { ref, onActivated, reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import moment from 'moment';

import { useLangStore } from '@/stores/settings'
import PlayButton from '@/EncapComponents/PlayButton/index.vue'

import { MvAddress, MvDetails, SimilarMvs } from '@/api/mv.js'

const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
const $route = useRoute()
const $router = useRouter()
const video = ref(null)
const video_info = reactive({
    url: '',
    artistName: 'Kkuil',
    artistId: '666',
    name: '小KaiYanyan',
    playCount: '99999',
    publishTime: '2003-01-10',
    mvs: []
})

async function initial_video() {
    const mvid = $route.query.id
    // 获取视频地址
    const { data: { url } } = await GetMvAddress(mvid)
    // 获取视频详情
    const { data: { artistName, artistId, name, playCount, publishTime } } = await GetMvDetails(mvid)
    // 获取相似mvs
    const { mvs } = await GetSimilarMvs(mvid)
    Object.assign(video_info, { url, artistName, artistId, name, playCount, publishTime, mvs })

}

async function GetMvAddress(id) {
    return await MvAddress({
        id
    })
}

async function GetMvDetails(mvid) {
    return await MvDetails({
        mvid
    })
}

async function GetSimilarMvs(mvid) {
    return await SimilarMvs({
        mvid
    })
}

const play_count = computed(() => {
    const pc = Math.floor(video_info.playCount / 10000)
    if (pc) return `${lang.value.player.totalPlayNum}：${pc}w`
    else video_info.playCount
})

const durations = (duration) => {
    return moment(duration).format('mm:ss')

}

watch($route, route => {
    initial_video()
})

onActivated(async () => {
    initial_video()
})
</script>

<template>
    <div id="mv">
        <div class="video">
            <VuePlyr>
                <video ref="video" :src="video_info.url"></video>
            </VuePlyr>
        </div>
        <div class="video_info">
            <div class="name">
                <span>{{ video_info.name }}</span>
                <i class="iconfont icon-heart"></i>
            </div>
            <div class="play_count">
                <span>{{ play_count }}</span>
            </div>
            <div class="publish_time">
                <span>{{ video_info.publishTime }}</span>
            </div>
        </div>
        <div class="more">
            <h1>{{ lang.mv.moreVideo }}</h1>
            <div class="mvs">
                <div v-for="mv in video_info.mvs" :key="mv.id" class="mv" @click="$router.push({ path: '/mv', query: { id: mv.id } })">
                    <div class="cover" :style="`background-image: url(${mv.cover});`">
                        <PlayButton />
                    </div>
                    <div class="mv_info">
                        <span class="name">{{ mv.name
                        }}</span>
                        <span class="artist_name"
                            @click.stop="$router.push({ path: '/artist', query: { id: mv.artistId } })">({{ mv.artistName
                            }})</span>
                        <div class="duration">{{ durations(mv.duration) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
#mv {
    width: 100%;
    color: var(--common_text_color);

    .video {
        width: 100%;
        border-radius: 16px;
        background: transparent;
        overflow: hidden;
    }

    .video_info {
        margin-top: 10px;
        width: 100%;
        height: 60px;

        .name {
            font-weight: bolder;
            font-size: 25px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .iconfont {
                cursor: pointer;
                margin-left: 10px;
                font-size: 20px;
                &:hover {
                    color: #335ee2;
                }
                &:active {
                    transform: scale(0.8);
                }
            }
        }

        .play_count,
        .publish_time {
            font-size: 13px;
            color: rgba(238, 238, 238, 0.445);
        }
    }

    .more {
        margin: 50px 0;

        .mvs {
            width: 100%;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;

            .mv {
                margin-top: 10px;
                width: 270px;

                .cover {
                    position: relative;
                    cursor: pointer;
                    width: 100%;
                    height: 180px;
                    border-radius: 15px;
                    background-position: center;
                    background-size: cover;
                    background-repeat: no-repeat;
                }

                .mv_info {
                    margin-top: 10px;
                    >span {
                        color: rgb(95, 95, 95);
                        cursor: pointer;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                    
                    .name {
                        margin-right: 5px;
                        color: var(--common_text_color);
                    }
                }
            }
        }
    }
}
</style>