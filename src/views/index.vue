<script setup>
import NavBar from '@/components/NavBar/index.vue'
import Player from '@/components/Player/index.vue'
</script>

<template>
    <div id="container">
        <NavBar />
        <div class="content">
            <router-view v-slot="{ Component, route }" class="container">
                <transition name="content" mode="out-in">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </router-view>
        </div>
        <Player />
    </div>
</template>

<style lang="less" scoped>
#container {
    width: 100%;
    height: 100%;
    .content {
        width: 100%;
        height: 100vh;
    }
    .container {
        width: calc(100vw + 17px);
        height: 100vh;
        overflow: auto;
        background-color: var(--bg_theme_color);
        padding: 64px 10vw !important;
    }
}
</style>