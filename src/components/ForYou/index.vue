<script setup>
import { ref } from 'vue'

import TodayRecommend from '@/components/TodayRecommend/index.vue'
import FM from '@/components/FM/index.vue'

import { defaultCovers } from '@/utils/staticData.js'


</script>

<template>
    <div class="for_you">
        <h2 class="title">For You</h2>
        <div class="content">
            <TodayRecommend :bgi="defaultCovers[1]"/>
            <FM />
        </div>
    </div>
</template>

<style scoped lang="less">
.for_you {
    .title {
        font-size: 2.3vw;
    }
    .content {
        display: flex;
        justify-content: space-between;

        >div {
            margin-top: 25px;
            width: 48%;
            height: 12vw;
            background-color: #fff;
            border-radius: 15px;
            margin-bottom: 3vh;
        }
    }
}
</style>