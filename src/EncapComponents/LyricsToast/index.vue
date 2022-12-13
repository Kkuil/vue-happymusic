<script>
import emitter from '@/utils/eventBus'
import { storeToRefs } from 'pinia'

import { usePlayerStore } from '@/stores/player'
import PlayControls from '@/EncapComponents/PlayControls/index.vue'

export default {
    components: {
        PlayControls
    },
    setup(props, ctx) {
        const playStore = usePlayerStore()
        const { playing_song } = storeToRefs(playStore)
        return {
            playing_song
        }
    },
    methods: {
        close() {
            emitter.emit('close_toast')
        }
    },
    computed: {
        lyrics() {
            return this.playing_song.lyrics.map(lyric => lyric.slice(lyric.indexOf(" ")))
        }
    }
}
</script>

<template>
    <div id="lyrics_toast">
        <div class="content">
            <div class="song_info">
                <div class="cover">
                    <img :src="playing_song.cover" class="img">
                </div>
                <div class="info_like">
                    <div class="info">
                        <div class="song_name">{{ playing_song.song_name }}</div>
                        <div class="artist_name">
                            <span>{{ playing_song.song_name }}</span>
                            <i>-</i>
                            <span>{{ playing_song.artist_name }}</span>
                        </div>
                    </div>
                    <i class="iconfont icon-heart like"></i>
                </div>
                <div class="volume"></div>
                <div class="button_icon">
                    <PlayControls />
                </div>
            </div>
            <div class="song_lyrics">
                <div v-for="lyric, index in lyrics" :key="index" class="line">
                    <div class="lyric">{{ lyric }}</div>
                </div>
            </div>
        </div>
        <i class="iconfont icon-long-arrow-bottom close" @click="close"></i>
    </div>
</template>

<style lang="less" scoped>
#lyrics_toast {
    position: relative;
    z-index: 999;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #535353;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
        width: 1100px;
        height: 600px;
        display: flex;

        >div {
            height: 100%;
        }

        .song_info {
            display: flex;
            flex-direction: column;

            >div {
                width: 100%;
            }

            .cover {
                display: flex;
                align-items: center;

                .img {
                    width: 410px;
                    height: 410px;
                    border-radius: 15px;
                    object-fit: cover;

                }
            }

            .info_like {
                height: 120px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: var(--common_text_color);

                .info {
                    >div {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .song_name {
                        width: 250px;
                        font-weight: bolder;
                        font-size: 25px;
                    }

                    .artist_name {
                        width: 200px;
                        font-size: 15px;
                        color: #ccc;
                        cursor: pointer;

                        >span {
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                }

                .like {
                    font-size: 20px;
                    cursor: pointer;
                    border-radius: 10px;
                    padding: 8px;
                    &:hover {
                        background-color: rgba(204, 204, 204, 0.144);
                    }
                }

            }

            .volume {
                height: 9.5%;
            }

            .button_icon {
                height: 21%;
                display: flex;
                justify-content: center;

            }
        }

        .song_lyrics {
            width: 600px;
            height: 600px;
            overflow: auto;
            margin-left: 30px;
            .lyric {
                cursor: pointer;
                border-radius: 10px;
                width: 100%;
                height: 50px;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                color: var(--common_text_color);
                font-size: 20px;
                &:hover {
                    background-color: rgba(204, 204, 204, 0.336);
                }
                &:active {
                    transform: scale(0.9);
                }
            }
        }
    }

    .close {
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 20px;
        padding: 10px;
        font-weight: bolder;
        border-radius: 10px;
        color: #7c7b7b;

        &:hover {
            color: var(--common_text_color);
            background-color: rgba(204, 204, 204, 0.24);
        }
    }
}
</style>