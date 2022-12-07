<script setup>
import { storeToRefs } from 'pinia'
import { useLangStore } from '@/stores/settings'
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import emitter from '@/utils/eventBus'

const $router = useRouter()
const $route = useRoute()
const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
let cur_route = ref('home')
const isCollapse = ref(false)
let isShowMenu = ref(false)
let isLogin = ref(false)
const avatarUrl = ref('')

// 切换路由
function switchRoute(name) {
    $router.push({
        name
    })
}

function showMenu(e) {
    isShowMenu.value = true
}

onMounted(() => {
    emitter.on('isCollapse', bool => {
        isCollapse.value = bool
    })
    emitter.on('hideMenu', () => {
        isShowMenu.value = false
    })
    emitter.on('user_details', user_details => {
        isLogin.value = true
        avatarUrl.value = user_details.profile.avatarUrl
    })
})
watch($route, route => {
    const { name } = route
    cur_route.value = name
})
</script>

<template>
    <div id="nav_bar">
        <div class="navigation_arrow">
            <i class="iconfont icon-arrowleft" @click="$router.go(-1)"></i>
            <i class="iconfont icon-arrowright" @click="$router.go(1)"></i>
        </div>
        <div class="nav">
            <div class="home" :class="`${cur_route == 'home' ? 'active' : ''}`" @click="switchRoute('home')">{{
                    lang.nav.home
            }}</div>
            <div class="explore" :class="`${cur_route == 'explore' ? 'active' : ''}`" @click="switchRoute('explore')">{{
                    lang.nav.explore
            }}</div>
            <div class="library" :class="`${cur_route == 'library' ? 'active' : ''}`" @click="switchRoute('library')">{{
                    lang.nav.library
            }}</div>
        </div>
        <div class="search_center">
            <div v-show="!isCollapse" class="no_collapse">
                <div class="search">
                    <i class="iconfont icon-search"></i>
                    <input class="searchInput" type="text" :placeholder="lang.nav.search">
                </div>
                <div class="avatar">
                    <img @click.stop="showMenu"
                        :src="`${avatarUrl ? avatarUrl : 'http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=60y60'}`" />
                    <transition name="menu" enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut" duration="100">
                        <div v-show="isShowMenu" class="menu">
                            <div v-show="isLogin" class="profile" @click="$router.push({ name: 'profile' })">
                                <i class="iconfont icon-user-fill"></i>
                                <span>{{ lang.login.profile }}</span>
                            </div>
                            <div class="setting" @click="$router.push({ name: 'setting' })">
                                <i class="iconfont icon-setting-fill"></i>
                                <span>{{ lang.library.userProfileMenu.settings }}</span>
                            </div>
                            <div v-if="!isLogin" class="login" @click="$router.push({ name: 'login' })">
                                <i class="iconfont icon-log-in"></i>
                                <span>{{ lang.login.login }}</span>
                            </div>
                            <div v-else class="logout" @click="logout">
                                <i class="iconfont icon-logout"></i>
                                <span>{{ lang.login.logout }}</span>
                            </div>
                            <div class="github">
                                <i class="iconfont icon-github"></i>
                                <span>{{ lang.nav.github }}</span>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
            <div v-show="isCollapse" class="collapse">456</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
#nav_bar {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 64px;
    padding: 0 10vw;
    background-color: transparent;
    backdrop-filter: var(--nav_player_bd-f);
    display: flex;
    justify-content: space-between;

    >div {
        cursor: pointer;
        flex: 33.33%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 15px 0;
        font-size: var(--nor_fz);
        color: var(--common_text_color);
    }

    .navigation_arrow {
        justify-content: flex-start;

        .iconfont {
            width: 30px;
            height: 30px;
            margin: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bolder;
            border-radius: 10px;

            &:hover {
                background-color: var(--btn_hover_color);
            }
        }
    }

    .nav {
        justify-content: center;

        >div {
            width: 70px;
            height: 100%;
            display: flex;
            margin: 3px;
            justify-content: center;
            align-items: center;
            font-weight: 700;
            border-radius: 10px;

            &:hover {
                background-color: var(--btn_hover_color);
            }
        }

        .active {
            color: var(--font_theme_color);
        }
    }

    .search_center {
        justify-content: flex-end;

        .no_collapse {
            width: 250px;
            height: 100%;
            display: flex;

            .search {
                width: 200px;
                height: 100%;
                display: flex;
                align-items: center;
                border-radius: 8px;
                padding: 0 10px;
                background-color: var(--secondary_bg_color);

                .iconfont {
                    width: 20px;
                    color: var(--common_text_color);
                }

                .searchInput {
                    width: 180px;
                    font-weight: bolder;
                    color: var(--common_text_color);

                    input {
                        &:focus {
                            color: var(--common_text_color) !important;
                        }
                    }
                }

                &:hover {
                    color: var(--common_text_color);
                    background-color: var(--secondary_hover_bg_color);
                }
            }

            .avatar {
                position: relative;
                width: 50px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    position: relative;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;

                }

                .menu {
                    position: absolute;
                    top: 100%;
                    right: -90px;
                    width: 130px;
                    height: auto;
                    border-radius: 15px;
                    border: 1px solid #eee;
                    background-color: var(--bg_theme_color);
                    padding: 6px;
                    overflow: hidden;
                    box-shadow: 0 12px 10px rgba(0, 0, 0, 0.3);

                    >div {
                        width: 100%;
                        height: 45px;
                        border-radius: 10px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;

                        .iconfont {
                            width: 20px;
                            font-size: 18px;
                            margin: 0 4px;
                        }

                        span {
                            font-size: 13px;
                            font-weight: bolder;
                            font-family: var(--common_font_family);
                        }

                        &:hover {
                            color: var(--font_theme_color);
                            background-color: var(--secondary_hover_bg_color);
                        }
                    }
                }

            }
        }
    }
}
</style>