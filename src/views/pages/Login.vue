<template>
	<form @submit.prevent="handleSubmit">
		<div class="mb-3">
			<label for="exampleInputEmail1" class="form-label">帳號</label>
			<input type="account" class="form-control" id="exampleInputEmail1" v-model="username"
				aria-describedby="emailHelp" required>
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
import axios from 'axios';
import axiosapi from '@/plugins/axios';
const kajartaUrl = import.meta.env.VITE_API_URL;

const username = ref('');
const password = ref('');

const handleSubmit = () => {
	let request = {
		username: username.value,
		password: password.value
	};

	console.log('Request:', request);  // 打印request确认数据

	// axios.post(`${kajartaUrl}/login`, request)
	// axiosapi.post(`/login`, request)
	axiosapi.post(`/login`, request, {
		headers: {
			'Content-Type': 'multipart/form-data'
			// 'Cookie': 'JSESSIONID=96B1405F9552690261D66FCBC6B6E7B4' // 如果需要设置 Cookie，可以这样添加
		},
		withCredentials: true // 允许跨域请求带上 Cookie
	})
		.then(response => {
			if (response.status === 200) {
				// 登入成功處理
				console.log('Login successful', response.data);
			} else {
				// 處理非200狀態碼
				console.error('Login failed with status', response.status);
			}
		})
		.catch(error => {
			// 處理錯誤
			console.error('Login failed', error);
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
