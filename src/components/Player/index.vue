<script setup>
import { watch, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import emitter from '@/utils/eventBus.js'


import { usePlayerStore } from '@/stores/player'

import LyricsToast from '@/EncapComponents/LyricsToast/index.vue'
import PlayControls from '@/EncapComponents/PlayControls/index.vue'

const playStore = usePlayerStore()
const { play_state, playing_song, will_playlist } = storeToRefs(playStore)
const $route = useRoute()
let isShowPlayer = ref(true)
let isShowLyrics = ref(false)

// 监听音量变化
let volume = computed({
    get() {
        return play_state.value.volume
    },
    set(value) {
        playStore.change_volume(value)
    }
})

// 切换播放模式
function switchPlayMode() {
    playStore.switch_mode()
}

watch($route, route => {
    if (route.name == 'login' || route.name == 'account' || route.name == 'mv') {
        isShowPlayer.value = false
    } else {
        isShowPlayer.value = true
    }
}, {
    immediate: true,
    deep: true
})

onMounted(() => {
    emitter.on('close_toast', () => {
        isShowLyrics.value = false
    })
})
</script>

<template>
    <transition name="player" :duration="2000">
        <div id="player" v-show="isShowPlayer">
            <div class="left">
                <img :src="playing_song.cover" class="img">
                <div class="song_info">
                    <span :title="playing_song.song_name" class="song_name">{{ playing_song.song_name }}</span>
                    <span :title="playing_song.artist_name" class="artist_name">{{ playing_song.artist_name }}</span>
                </div>
                <i title="喜欢" class="iconfont icon-heart like"></i>
            </div>
            <div class="center">
                <PlayControls />
            </div>
            <div class="right">
                <i class="iconfont icon-24gf-playlistMusic4 play_list" title="播放列表"></i>
                <i class="iconfont play_order"
                    :class="`${play_state.play_mode ? play_state.play_mode == 1 ? 'icon-danquxunhuan' : 'icon-suijibofang' : 'icon-bofang-xunhuanbofang'}`"
                    :title="`${play_state.play_mode ? play_state.play_mode == 1 ? '单曲循环' : '随机播放' : '循环播放'}`"
                    @click="switchPlayMode"></i>
                <div class="play_volume">
                    <!-- <VueSlider 
                        v-model="volume"
                        width="100"
                        height="35"
                        :min="0"
                        :max="1"
                        :interval="0.01"
                        :clickable="true"
                        :drag-on-click="true"
                        :duration="0"
                        :dot-size="12"
                        tooltip="none"
                    /> -->
                </div>
                <div class="open_toast">
                    <i title="歌词" class="iconfont icon-arrowtop" @click="(isShowLyrics = true)"></i>
                </div>
            </div>
        </div>
    </transition>
    <transition name="lyrics" :duration="20000">
        <LyricsToast v-show="isShowLyrics" />
    </transition>
</template>

<style lang="less" scoped>
#player {
    z-index: 100;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 64px;
    backdrop-filter: var(--nav_player_bd-f);
    display: flex;
    justify-content: space-between;
    align-items: center;

    >div {
        cursor: pointer;
        flex: 33.33%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 0;
        font-size: var(--nor_fz);
        color: var(--common_text_color);
    }

    .left {
        .img {
            border-radius: 10px;
            height: 100%;
        }

        .song_info {
            margin: 0 8px;
            width: 80px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;

            >span {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .song_name {
                font-size: 15px;
            }

            .artist_name {
                font-size: 10px;
                margin-top: 5px;
            }
        }
    }

    .right {
        >i {
            &:hover {
                text-shadow: 0 0 10px #fff;
            }
        }

        >div,
        >i {
            margin: 0 3px;
        }

        .play_volume {
            width: 100px;
        }

        .open_toast {
            width: 35px;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;

            &:hover {
                background-color: rgba(204, 204, 204, 0.148);
            }
        }
    }
}

.player-leave-active {
    transform: translateY(100%);
}

.lyrics-enter-active {
    transform: translateY(0%);
}

.lyrics-leave-active {
    transform: translateY(100%);
}
</style>