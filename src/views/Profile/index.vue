<script setup>
import { ref, onMounted, reactive } from 'vue'
import emitter from '@/utils/eventBus.js'

let user_details = reactive({})

onBeforeMount(() => {
    emitter.on('user_details', details => {
        user_details = Object.assign(user_details, details)
    })
})
</script>

<template>
    <!-- <div id="profile">
        <div class="user_info">
            <div class="info" :style="`background-image: url(${user_details.profile.backgroundUrl});`">
                <div class="avatar" :style="`background-image: url(${user_details.profile.avatarUrl});`"></div>
                <span class="nickname">{{ user_details.profile.nickname }}</span>
                <div class="follow_rank">
                    <span class="text follows">{{ user_details.profile.follows }} 关注</span>
                    <span class="split">|</span>
                    <span class="text followeds">{{ user_details.profile.followeds }} 粉丝</span>
                    <span class="split">|</span>
                    <span class="text level">Lv.{{ user_details.level }}</span>
                </div>
            </div>
        </div>
    </div> -->
</template>

<style scoped lang="less">
#profile {
    width: 100%;
    height: 100vh;

    .user_info {
        margin-top: 50px;
        width: 100%;
        height: auto;
        padding: 0 7vw;

        .info {
            width: 100%;
            height: 250px;
            border-radius: 15px;
            background-color: #0094ff;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;

            .avatar {
                margin-top: -45px;
                width: 90px;
                height: 90px;
                border-radius: 50%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }

            .nickname {
                margin-top: 6px;
                font-weight: bolder;
                font-size: 25px;
                color: var(--common_text_color);
            }

            .follow_rank {
                margin-top: 5px;
                display: flex;
                justify-content: space-between;
                width: 150px;
                font-weight: 700;
                color: var(--common_text_color);
                .split {
                    font-weight: normal;
                    color: #ccc;
                }
            }
        }
    }
}
</style>