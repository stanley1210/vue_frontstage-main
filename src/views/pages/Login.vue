<template>
	<form @submit.prevent="handleSubmit">
		<div class="mb-3">
			<label for="exampleInputEmail1" class="form-label">帳號</label>
			<input type="text" class="form-control" id="exampleInputEmail1" v-model="username"
				aria-describedby="emailHelp" required>
		</div>
		<div class="mb-3">
			<label for="exampleInputPassword1" class="form-label">密碼</label>
			<input type="password" class="form-control" id="exampleInputPassword1" v-model="password" required>
		</div>
		<button type="submit" class="btn btn-primary">登入</button>
		<div v-if="loginMessage" class="alert alert-success mt-3">
			{{ loginMessage }}
		</div>
	</form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import Swal from 'sweetalert2'; 
import axiosapi from '@/plugins/axios';

const username = ref('');
const password = ref('');
const loginMessage = ref(''); 

const router = useRouter(); 

const handleSubmit = () => {
	let request = {
		username: username.value,
		password: password.value
	};

	console.log('Request:', request); // 打印 request 確認數據

	axiosapi.post(`/login`, request, {
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		withCredentials: true // 允许跨域請求带上 Cookie
	})
		.then(response => {
			const data = response.data;
			console.log('Response data:', data); 

			if (data.success && data.code === 200) {
				// 登入成功处理
				console.log('Login successful', data);
				Swal.fire({
					icon: 'success',
					title: '登入成功',
					text: '您已成功登入！'
				}).then(() => {
					router.push({ name: 'home-link' }); // 跳轉到 Home 頁面
				});
			} else {
				// 处理非200状态码或 success 为 false 的情况
				console.error('Login failed with response:', response);
				Swal.fire({
					icon: 'error',
					title: '登入失败',
					text: data.msg || '帳號或密碼錯誤'
				});
			}
		})
		.catch(error => {
			// 处理错误
			console.error('Login failed', error);
			Swal.fire({
				icon: 'error',
				title: '登入失败',
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

.alert {
	margin-top: 15px;
}
</style>
