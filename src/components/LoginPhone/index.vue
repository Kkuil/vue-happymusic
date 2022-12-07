<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import md5 from 'js-md5'
import emitter from '@/utils/eventBus.js'
import UserDetail from '@/api/user_detail'

import { LoginWithPhone } from '@/api/login'

const $router = useRouter()
let phone = ref('')
let password = ref('')
let isPPError = ref(false)
let isPError = ref(false)

async function login() {
    if (!phone.value) {
        isPPError.value = true
        return
    } else {
        const reg = /^1[3-9]\d{9}$/
        const isLegal = reg.test(phone.value)
        if (!isLegal) {
            isPPError.value = true
            return
        }
    }
    if (!password.value) {
        isPError.value = true
        return
    } else {
        if (password.value.length < 6) {
            isPError.value = true
            return
        }
    }
    const { code, account: { id } } = await LoginWithPhone({
        params: {
            phone: phone.value,
            md5_password: md5(password.value)
        }
    })
    // 本地存储uid
    localStorage.setItem('uid', id)
    if (code == 503) {
        isPPError.value = true
        isPError.value = true
        return
    }
    // 获取用户数据
    const user_details = await GetUserDetails(id)
    // 发送用户数据
    emitter.emit('user_details', user_details)
    // 跳往home页面
    $router.push({
        name: 'home'
    })
}

async function GetUserDetails(uid) {
    return await UserDetail({
        params: {
            uid
        }
    })
}

</script>

<template>
    <div class="phone_content">
        <div class="phone_num" :style="`${isPPError ? 'border: 1px solid red;' : ''}`">
            <i class="iconfont icon-phone"></i>
            <input type="text" placeholder="手机号" v-model="phone">
        </div>
        <div class="password" :style="`${isPError ? 'border: 1px solid red;' : ''}`">
            <i class="iconfont icon-password"></i>
            <input type="password" placeholder="密码" v-model="password">
        </div>
        <div class="login
        " @click="login">
            登录
        </div>
    </div>
</template>

<style scoped lang="less">
.phone_content {
    width: 300px;
    height: 185px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    >div {
        width: 300px;
        height: 50px;
        border-radius: 10px;
        background-color: var(--secondary_bg_color);
    }

    .phone_num,
    .password {
        display: flex;

        .iconfont {
            width: 15%;
            display: flex;
            font-size: 20px;
            color: var(--common_text_color);
            justify-content: center;
            align-items: center;
        }

        input {
            width: 85%;
        }
    }

    .login {
        cursor: pointer;
        margin-top: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--font_theme_color);
        font-size: var(--nor_fz);
        font-weight: bolder;
        background-color: #bbcdff;

        &:hover {
            transform: scale(1.05);
        }
    }
}
</style>