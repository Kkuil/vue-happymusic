<script setup>
import { ref, defineProps, onMounted, reactive, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { SingerHotSongs } from '@/api/singer'
import { useLangStore } from '@/stores/settings'

import PlayButton from '@/EncapComponents/PlayButton/index.vue'

const props = defineProps(['id'])
const hot_songs = reactive([])
const show_songs = reactive([])
const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
const $router = useRouter()
let isMore = ref(true)
let show = ref('more')

async function GetSingerHotSongs(id) {
    return SingerHotSongs({ id })
}

watch(show_songs, songs => {
    if(songs.length == hot_songs.length) {
        show.value = 'less'
    }
})

function more() {
    show.value = 'less'
    show_songs.push(...hot_songs.slice(12))
}

function less() {
    show.value = 'more'
    show_songs.splice(12)
}

onMounted(async () => {
    const data = await GetSingerHotSongs(props.id)
    hot_songs.push(...data.songs)
    show_songs.push(...data.songs.slice(0, 12))
    nextTick(() => {
        if(hot_songs.length == show_songs.length) isMore.value = false
    })
})
</script>

<template>
    <div class="hot_songs">
        <h2 class="title">{{ lang.artist.popularSongs }}</h2>
        <div class="content">
            <div v-for="song in show_songs" :key="song.id" class="song">
                <div class="cover" :style="`background-image: url(${song.al.picUrl});`">
                    <PlayButton />
                </div>
                <div class="info">
                    <h3 class="song_name">{{ song.al.name }}</h3>
                    <span class="relevance">{{ song.alia[0] }}</span>
                    <span class="author" @click.stop="$router.push({ path: '/artist', query: { id: song.ar[0].id } })">{{ song.ar[0].name }}</span>
                </div>
            </div>
            <span v-show="isMore" class="show_more">
                <span class="more" v-show="show == 'more'" @click="more">{{ lang.artist.showMore }}</span>
                <span class="less" v-show="show == 'less'" @click="less">{{ lang.artist.showLess }}</span>
            </span>
        </div>
    </div>
</template>

<style lang="less" scoped>
.hot_songs {
    width: 100%;
    height: auto;
    margin-top: 60px;

    .title {
        width: 100%;
        color: var(--common_text_color);
    }

    .content {
        position: relative;
        margin-top: 20px;
        width: 100%;
        height: auto;
        color: var(--common_text_color);
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .song {
            cursor: pointer;
            width: 300px;
            height: 100px;
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            cursor: pointer;
            border-radius: 20px;
            &:hover {
                background-color: rgba(204, 204, 204, 0.073);
            }
            .cover {
                position: relative;
                width: 100px;
                height: 100px;
                border-radius: 15px;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }

            .info {
                width: 130px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 20px;
                .song_name,
                .author,
                .relevance {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    &:hover {
                        text-decoration: underline;
                    }
                }
                .author,
                .relevance {
                    font-size: 13px;
                    opacity: 0.8;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }

        .show_more {
            cursor: pointer;
            position: absolute;
            bottom: -20px;
            left: 0;
            color: #ccc;
            opacity: 0.8;
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>