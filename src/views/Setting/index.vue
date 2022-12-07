<script setup>
import CustomPreference from '@/components/CustomPreference/index.vue'
import MusicQuality from '@/components/MusicQuality/index.vue'
import Lyrics from '@/components/Lyrics/index.vue'
import Others from '@/components/Others/index.vue'
</script>

<template>
    <div id="setting">
        <CustomPreference />
        <MusicQuality />
        <Lyrics />
        <Others />
    </div>
</template>

<style lang="less" scoped>
#setting {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .content {
        width: 50%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
}
</style>