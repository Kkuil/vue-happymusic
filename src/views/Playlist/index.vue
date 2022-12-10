<script setup>
import { ref, onActivated, reactive } from 'vue'
import { useRoute } from 'vue-router';
import PlayListDetails from '@/api/playlist_details'

const $route = useRoute()
const playlist_details = reactive({})

async function GetPlayListDetails() {
    return await PlayListDetails({
        id: $route.query.id
    })
}

onActivated(async () => {
    const data = await GetPlayListDetails()
    console.log(data)
    Object.assign(playlist_details, data)
})

</script>

<template>
    <div id="playlist">playlist</div>
</template>


<style lang="less" scoped>
#playlist {
    height: 100vh;
}
</style>