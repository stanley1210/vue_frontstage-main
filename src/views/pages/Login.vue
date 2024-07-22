<template>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">帳號</label>
            <input type="text" class="form-control" id="exampleInputEmail1" v-model="username" aria-describedby="emailHelp" required>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">密碼</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-primary">登入</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 导入 useRouter
import Swal from 'sweetalert2'; // 引入SweetAlert2
import axiosapi from '@/plugins/axios';

const username = ref('');
const password = ref('');

const router = useRouter(); // 获取路由实例

const handleSubmit = () => {
    let request = {
        username: username.value,
        password: password.value
    };

    console.log('Request:', request); // 打印request确认数据

    axiosapi.post(`/login`, request, {
		headers: {
			'Content-Type': 'multipart/form-data'
        },
        withCredentials: true // 允许跨域请求带上 Cookie
    })
    .then(response => {
        const data = response.data;
        console.log('Response data:', data); // 打印响应数据以确认

        if (data.success && data.code === 200) {
            // 登入成功處理
            console.log('Login successful', data);
            router.push({ name: 'home-link' }); // 跳转到 Home 页面
        } else {
            // 處理非200狀態碼或 success 为 false 的情况
            console.error('Login failed with response:', response);
            Swal.fire({
                icon: 'error',
                title: '登入失敗',
                text: data.msg || '帳號或密碼錯誤'
            });
        }
    })
    .catch(error => {
        // 處理錯誤
        console.error('Login failed', error);
        Swal.fire({
            icon: 'error',
            title: '登入失敗',
            text: '帳號或密碼錯誤'
        });
    });
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: auto;
}

div {
    margin-bottom: 15px;
}

button {
    padding: 10px;
}
</style>
