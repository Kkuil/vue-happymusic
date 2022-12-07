<script setup>
import { ref, defineProps } from 'vue'
import { byAppleMusic } from "@/utils/staticData.js";
import CoverRow from '@/EncapComponents/CoverRow/index.vue'

const props = defineProps(['title'])

</script>

<template>
    <CoverRow :title="title" :list="byAppleMusic" imgProp="coverImgUrl" uniqueSubName="By Apple Music"
        navigatePage="apple" :seeMoreInfo="{ isShowSeeMore: false, navigatePage: '123' }" :isRadius="false"
        :isShowPlayButton="true" />
</template>

<style scoped lang="less">

</style>