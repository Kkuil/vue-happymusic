<script setup>
import { ref, onBeforeMount, reactive, computed, defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'
import { useLangStore } from '@/stores/settings'
import moment from 'moment';

const props = defineProps(['song_info'])
const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
const $route = useRoute()
let hover_index = ref(-1)

function formatTime(timestamp) {
    return moment(timestamp).format('mm: ss')
}

function formatDate(timestamp) {
    return moment(timestamp).format('YYYY年MM月DD日')
}

console.log(props.song_info)
</script>

<template>
    <div class="song_list">
        <div v-for="song, index in props.song_info.songs" :key="song.id" class="song"
            @mouseenter="(hover_index = index)" @mouseleave="(hover_index = -1)">
            <div class="left">
                <span class="index">
                    <span v-show="(!(hover_index == index))">{{ index + 1 }}</span>
                    <i v-show="(hover_index == index)" class="iconfont icon-playfill play"></i>
                </span>
                <h3 class="name">{{ song.name }}</h3>
                <div class="singer_name">
                    <span v-for="artist in song.ar" @click="$router.push({ path: '/artist', query: { id: artist.id } })">{{ artist.name }}</span>
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
                    color: rgba(204, 204, 204, 0.183);

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