<script setup>
import QRProductor from '@/EncapComponents/QRProductor/index.vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted, watch } from 'vue'

import { useLangStore } from '@/stores/settings/index.js'
import QR from '@/components/LoginQR/index.vue'
import Email from '@/components/LoginEmail/index.vue'
import Phone from '@/components/LoginPhone/index.vue'

const $route = useRoute()
const langStore = useLangStore()
const { lang } = storeToRefs(langStore)
let login_way = ref('qr')
let show = ref($route.name)

function switchLoginWay(way) {
    login_way.value = way
}

watch($route, route => {
    show.value = route.name
})

</script>

<template>
    <div id="account" v-show="(show == 'account')">
        <div class="content">
            <div class="logo">
                <img class="img" src="/img/logos/netease-music.png" />
                <span class="text">{{ lang.login.loginText }}</span>
            </div>
            <QR v-show="(login_way == 'qr')"/>
            <Email v-show="(login_way == 'email')"/>
            <Phone  v-show="(login_way == 'phone')"/>
            <div class="other_ways">
                <span class="email" @click="switchLoginWay('email')">{{ lang.login.loginWithEmail }}</span>
                <span style="color: #ccc;">|</span>
                <span class="phone" @click="switchLoginWay('phone')">{{ lang.login.loginWithPhone }}</span>
                <span style="color: #ccc;">|</span>
                <span class="QR" @click="switchLoginWay('qr')">{{ lang.login.loginWithQR }}</span>
            </div>
            <div class="secure_tips">
                <span v-html="lang.login.notice"></span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
#account {
    width: 100%;
    height: 83vh;
    z-index: 99;
    padding: 64px 10vw;
    background-color: var(--bg_theme_color);
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .logo {
            width: 100%;
            height: 120px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            margin-bottom: 30px;

            .img {
                width: 75px;
                height: 75px;
            }

            .text {
                font-weight: bolder;
                font-size: 23px;
                color: var(--common_text_color);
            }
        }

        .other_ways {
            width: 100%;
            height: 30px;
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;

            .email,
            .phone,
            .QR {
                cursor: pointer;
                color: var(--common_text_color);
                font-size: 1vw;
                margin: 5px;

                &:hover {
                    color: var(--font_theme_color);
                }
            }
        }

        .secure_tips {
            margin-top: 20px;
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 10px;
            color: var(--common_text_color);
        }
    }
}
</style>