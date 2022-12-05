<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLangStore } from '@/stores/lang/index.js'

const $router = useRouter()
const langStore = useLangStore()
const { lang } = storeToRefs(langStore)

</script>

<template>
    <div id="login">
        <div class="icons">
            <div class="logo">
                <img class="img" src="/img/logos/yesplaymusic.png" />
            </div>
            <span class="symbol"> X </span>
            <div class="netstat">
                <img class="img" src="/img/logos/netease-music.png" alt="" />
            </div>
        </div>
        <div class="login_ways">
            <div class="qr_way" @click="$router.push({ name: 'account' })">
                <div class="words">
                    <span class="big_words">{{ lang.login.loginText }}</span>
                    <span class="small_words">{{ lang.login.accessToAll }}</span>
                </div>
                <i class="iconfont icon-arrowright"></i>
            </div>
            <div class="search_way">
                <div class="words">
                    <span class="big_words">{{ lang.login.search }}</span>
                    <span class="small_words">{{ lang.login.readonly }}</span>
                </div>
                <i class="iconfont icon-arrowright"></i>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<style lang="less" scoped>
#login {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .icons {
        width: 30vw;
        display: flex;
        align-items: center;
        justify-content: center;

        .img {
            width: 4.5vw;
            height: 4.5vw;
            margin: 1vw;
        }

        .symbol {
            font-size: var(--nor_fz);
            font-weight: bolder;
            color: var(--symbol_color);
        }
    }

    .login_ways {
        width: 22vw;
        margin-top: 1.2vw;

        >div {
            position: relative;
            cursor: pointer;
            width: 100%;
            height: 130px;
            border-radius: 15px;
            background-color: #eaeffd;
            margin: 20px 0;

            .words {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                flex-direction: column;
                .big_words {
                    font-size: 1.5vw;
                    font-weight: bolder;
                    color: var(--font_theme_color);
                }

                .small_words {
                    font-size: 1vw;
                    color: var(--font_theme_color);
                }
            }

            .iconfont {
                position: absolute;
                top: 50%;
                right: 6vw;
                transform: translateY(-50%);
                font-weight: bolder;
                font-size: 1.8vw;
                opacity: 0;
                color: var(--font_theme_color);
            }

            &:hover .words{
                left: 45%;
            }
            &:hover .iconfont {
                opacity: 1;
                right: 4vw;
            }
        }
    }
}
</style>