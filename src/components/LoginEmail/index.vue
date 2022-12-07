<script setup>
import { ref, watch } from 'vue'
import md5 from 'js-md5'

import { LoginWithEmail } from '@/api/login'

let email = ref('')
let password = ref('')
let isEError = ref(false)
let isPError = ref(false)

async function login() {
    if (!email.value) {
        isEError.value = true
        return
    } else {
        const reg = /^[\w]*@163\.com$/
        const isLegal = reg.test(email.value)
        if (!isLegal) {
            isEError.value = true
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
    password.value = md5(password.value)
    const { code } = await LoginWithEmail({
        params: {
            email: email.value,
            md5_password: password.value
        }
    })
    if (code == 503) {
        isEError.value = true
        isPError.value = true
        return
    }
    email.value = ' '
    password.value = ' '
}

</script>

<template>
    <div class="email_content">
        <div class="email_num" :style="`${isEError ? 'border: 1px solid red;' : ''}`">
            <i class="iconfont icon-email"></i>
            <input type="text" placeholder="邮箱" v-model="email">
        </div>
        <div class="password" :style="`${isPError ? 'border: 1px solid red;' : ''}`">
            <i class="iconfont icon-password"></i>
            <input type="password" placeholder="密码" v-model="password">
        </div>
        <div class="login" @click="login">登录</div>
    </div>
</template>

<style scoped lang="less">
.email_content {
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

    .email_num,
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