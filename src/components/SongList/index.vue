<script setup>
import { ref, onBeforeMount, reactive, computed, defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'
import { useLangStore } from '@/stores/settings'
import { usePlayerStore } from '@/stores/player';
import moment from 'moment';

import { Lyrics } from '@/api/lyric'
import { SongUrl } from '@/api/song'

const props = defineProps(['song_info'])
const langStore = useLangStore()
const playStore = usePlayerStore()
const { lang } = storeToRefs(langStore)
const { play_state, playing_song } = storeToRefs(playStore)
const $route = useRoute()
let hover_index = ref(-1)

function formatTime(timestamp) {
    return moment(timestamp).format('mm: ss')
}

function formatDate(timestamp) {
    return moment(timestamp).format('YYYY年MM月DD日')
}

// 播放音乐
async function playOrPause(song) {
    // 判断是否是正在播放的音乐
    if (playing_song.value.id == song.id) {
        if(playing_song.value.url) playStore.play_or_pause(!this.play_state.isPlaying)
        else playStore.play_or_pause(false)
    } else {
        playStore.play_or_pause(false)
        const {
            id,
            al,
            name,
            ar,
            dt,
        } = song
        // 获取歌词信息
        const { lrc: { lyric } } = await Lyrics(id)
        // 获取歌曲url
        const { data: { url } } = await SongUrl(id)
        // 更新播放信息
        playStore.switch_music({
            id,
            url,
            cover: al.picUrl,
            song_name: name,
            artist_name: ar[0].name,
            song_length: dt,
            lyrics: lyric.split('\n')
        })
        if (url) {
            playStore.play_or_pause(true)
        }
    }
}

</script>

<template>
    <div class="song_list">
        <div v-for="song, index in props.song_info.songs" :key="song.id" class="song"
            @mouseenter="(hover_index = index)" @mouseleave="(hover_index = -1)">
            <div class="left">
                <span class="index">
                    <span v-show="(!(hover_index == index))">{{ index + 1 }}</span>
                    <i v-show="(hover_index == index)" class="iconfont play" @click="playOrPause(song)"
                        :class="`${(playing_song.id == song.id) && play_state.isPlaying ? 'icon-pause' : 'icon-playfill'}`"></i>
                </span>
                <h3 class="name">{{ song.name }}</h3>
                <div class="singer_name">
                    <span v-for="artist in song.ar"
                        @click="$router.push({ path: '/artist', query: { id: artist.id } })">{{ artist.name }}</span>
                </div>
            </div>
            <div class="right">
                <i v-show="(hover_index == index)" class="like iconfont icon-heart"></i>
                <span>{{ formatTime(song.dt) }}</span>
            </div>
        </div>
        <div class="copyright">
            <div class="publish">{{ lang.album.released }} {{ formatDate(props.song_info.publish_time) }}</div>
            <div class="company">
                <i class="iconfont icon-copyright"></i>
                <span>{{ props.song_info.company }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.song_list {
    width: 100%;
    height: auto;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    color: var(--common_text_color);

    .song {
        width: 100%;
        height: 45px;
        border-radius: 10px;
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:hover {
            background-color: rgba(204, 204, 204, 0.189);
        }

        .left {
            display: flex;
            align-items: center;

            .index {
                position: relative;
                width: 30px;
                text-align: center;

                .play {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #335eea;
                    font-size: 30px;
                    transform-origin: center;

                    &:active {
                        transform: translate(-50%, -50%) scale(0.9);
                    }
                }
            }

            .name {
                width: 200px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .singer_name {
                margin-left: 10px;
                width: 300px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                span {
                    cursor: pointer;
                    margin-left: 5px;
                    color: rgb(82, 82, 82);

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }

        .right {
            width: 90px;
            display: flex;
            align-items: center;
            justify-content: space-around;

            .like {
                cursor: pointer;

                &:hover {
                    transform: scale(1.05);
                }

                &:active {
                    transform: scale(0.9);
                }
            }

            >span {
                width: 50px;
            }
        }
    }

    .copyright {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: rgb(86, 86, 86);
        opacity: 0.8;
        font-size: 13px;

        .publish {
            font-size: 15px;
        }

        .company {
            margin-top: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>