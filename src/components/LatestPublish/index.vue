<script setup>
import { ref, defineProps, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia';
import { SingerMV } from '@/api/singer'
import { useLangStore } from '@/stores/settings'

import PlayButton from '@/EncapComponents/PlayButton/index.vue'
const props = defineProps(['id'])
const latest_mv = reactive({})
const langStore = useLangStore()
const { lang } = storeToRefs(langStore)

async function GetSingerMV(id) {
    return SingerMV({ id })
}

onMounted(async () => {
    const data = await GetSingerMV(props.id)
    Object.assign(latest_mv, data.mvs[0])
})

</script>

<template>
    <div class="latest_publish">
        <h2 class="title">{{ lang.artist.latestRelease }}</h2>
        <div class="content">
            <div class="mv" @click="$router.push({ path: '/mv', query: { id: latest_mv.id } })">
                <div class="cover" :style="`background-image: url(${latest_mv.imgurl});`">
                    <PlayButton />
                </div>
                <div class="mv_info">
                    <h3 class="mv_name">{{ latest_mv.name }}</h3>
                    <span class="publish_time">{{ latest_mv.publishTime }}</span>
                    <span class="text">{{ lang.artist.latestMV }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.latest_publish {
    width: 100%;
    height: auto;
    margin-top: 60px;

    .title {
        width: 100%;
        color: var(--common_text_color);
    }

    .content {
        color: var(--common_text_color);
        margin-top: 20px;
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .mv {
            width: 400px;
            height: 150px;
            border-radius: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .cover {
                cursor: pointer;
                position: relative;
                width: 200px;
                height: 100%;
                border-radius: 15px;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }

            .mv_info {
                width: 180px;

                .mv_name {
                    cursor: pointer;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &:hover {
                        text-decoration: underline;
                    }
                }

                .publish_time {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 10px;
                }
                .text, .publish_time {
                    font-size: 15px;
                    opacity: 0.8;
                }
            }
        }
    }
}
</style>