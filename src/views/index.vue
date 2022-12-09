<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import emitter from '@/utils/eventBus.js'

import NavBar from '@/components/NavBar/index.vue'
import Player from '@/components/Player/index.vue'
import { UserDetails } from '@/api/user'

const $route = useRoute()
const $router = useRouter()

// 获取用户详情
async function GetUserDetails(uid) {
    const user_details = await UserDetails({
        params: {
            uid
        }
    })
    return user_details
}

watch($route, route => {
    const uid = localStorage.getItem('uid')
    if (!uid) {

    } else {
        // 获取数据
        GetUserDetails(uid).then(user_details => {
            emitter.emit('user_details', user_details)
        })
    }
}, {
    immediate: true
})

</script>

<template>
    <div id="container">
        <NavBar />
        <div class="content">
            <router-view>
            </router-view>
        </div>
        <Player />
    </div>
</template>

<style lang="less" scoped>
#container {
    width: 100%;
    background-color: var(--bg_theme_color);

    .content {
        width: 100%;
        height: auto;
        padding: 64px 10vw !important;
        display: flex;
        justify-content: center;
        align-items: center;
    }

}
</style>