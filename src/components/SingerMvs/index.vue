<script setup>
import { ref, defineProps, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia';
import { SingerMV } from '@/api/singer'
import { useLangStore } from '@/stores/settings'

import PlayButton from '@/EncapComponents/PlayButton/index.vue'
const props = defineProps(['id'])
const mvs = reactive([])
const langStore = useLangStore()
const { lang } = storeToRefs(langStore)

async function GetSingerMV(id) {
    return SingerMV({ id })
}

onMounted(async () => {
    const data = await GetSingerMV(props.id)
    mvs.push(...data.mvs)
    console.log(data)
})
</script>

<template>
    <div class="singer_mvs">
        <h2 class="title" v-show="mvs.length">{{ lang.library.mvs }}</h2>
        <div class="content">
            <div v-for="mv in mvs" :key="mv.id" class="mv">
                <div class="cover" :style="`background-image: url(${mv.imgurl});`">
                    <PlayButton />
                </div>
                <div class="info">
                    <h3 class="name">{{ mv.name }}</h3>
                    <span class="publish_time">{{ mv.publishTime }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.singer_mvs {
    width: 100%;
    height: auto;
    margin-top: 60px;

    .title {
        width: 100%;
        color: var(--common_text_color);
    }

    .content {
        cursor: pointer;
        width: 100%;
        height: auto;
        margin-top: 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        .mv {
            width: 230px;
            height: 200px;
            color: var(--common_text_color);
            margin-bottom: 20px;
            margin-left: 15px;
            .cover {
                position: relative;
                width: 100%;
                height: 70%;
                border-radius: 15px;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }
            .info {
                margin-top: 10px;
                width: 100%;
                height: 30%;
                display: flex;
                flex-direction: column;
                .name {
                    width: 100%;
                    height: 30px;
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
                }
            }
        }
    }
}
</style>