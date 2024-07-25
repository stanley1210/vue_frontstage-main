<template>
	<br><br><br>
	<p class="p-text">Welcome,<br>Your next great find is wating</p><br>
	<form @submit.prevent="handleSubmit">
		<div class="form-group">
			<label for="username">帳號:</label>
			<input type="text" id="username" v-model="username" class="input-field" required>
		</div>
		<div class="form-group">
			<label for="password">密碼:</label>
			<input type="password" id="password" v-model="password" class="input-field" required>
		</div>
		<button type="submit" class="submit-button">登入</button>
		<a href="/pages/register" class="register-link">註冊</a>
		<div v-if="loginMessage" class="alert alert-success mt-3">
			{{ loginMessage }}
		</div>
	</form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import axiosapi from '@/plugins/axios';

const username = ref('');
const password = ref('');
const loginMessage = ref('');
const router = useRouter();
const store = useStore();

const handleSubmit = () => {
	// 创建 FormData 对象
	const formData = new FormData();
	formData.append('username', username.value);
	formData.append('password', password.value);

	console.log('FormData:', formData); // 打印 FormData 确认数据

	axiosapi.post(`/login`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		withCredentials: true // 允许跨域請求带上 Cookie
	})
		.then(response => {
			const data = response.data;
			console.log('Response data:', data);

			if (data.success && data.code === 200) {
				// 登入成功處理
				console.log('Login successful', data);
				Swal.fire({
					icon: 'success',
					title: '登入成功',
					text: '您已成功登入！'
				}).then(async () => {
					const username = data.data.username;
					console.log('=====>username', username);

					localStorage.setItem('username', username);
					// 发起请求获取员工信息
					await getCustomerInfo(username);
					// 跳轉到 Home 頁面
					router.push('/pages/about');
				});
			} else {
				// 處理非200狀態碼或 success 為 false 的情况
				Swal.fire({
					icon: 'error',
					title: '登入失败',
					text: data.msg || '帳號或密碼錯誤'
				});
			}
		})
		.catch(error => {
			// 處理其他错误
			Swal.fire({
				icon: 'error',
				title: '登入失败',
				text: '帳號或密碼錯誤'
			});
		});
};

// 获取员工信息
const getCustomerInfo = async (username) => {
	try {
		const response = await axiosapi.get(`/customer/info/username/${username}`);
		const data = response.data;
		// 假设我们使用 Vuex 来存储员工信息
		store.commit('setCustomerInfo', data);
	} catch (error) {
		console.error('Failed to get customer info:', error);
	}
};
</script>

<style scoped>
.p-text {
	width: 90%;
	/* 调整底线的长度 */
	color: #a33238;
	font-size: 30px;
}

.header-container {
	display: flex;
	align-items: center;
	margin-bottom: 20px;
}

.logo {
	all: unset;
	margin-right: 30px;
	display: flex;
	justify-content: center;
}

.logo-icon {
	width: 30px;
}

.header-text {
	font-size: 1.5em;
	font-weight: bold;
	color: #a33238;
}

.card {
	max-width: 800px;
	margin: auto;
	padding: 20px;
	background-color: #fff5eb;
}

.card-content {
	display: flex;
	align-items: flex-start;
	background-color: white;
	font-weight: bold;
	color: #a33238;
}

.card-image {
	width: 50%;
	margin-right: 20px;
}

.form-container {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.form {
	width: 100%;
	max-width: 400px;
}

.form-group {
	margin-bottom: 15px;
	color: #a33238;
}

.form-group label {
	margin-right: 10px;
}

.input-field {
	width: calc(100% - 100px);
	/* 当前设置宽度减去标签的宽度 */
	padding: 8px;
	border: none;
	background-color: transparent;
	/* 背景透明 */
}

.submit-button {
	width: 100%;
	max-width: 550px;
	/* 设定一个更窄的最大宽度 */
	padding: 10px;
	border: none;
	border-radius: 4px;
	background-color: #a33238;
	color: white;
	cursor: pointer;
}

.submit-button:hover {
	background-color: #66b1ff;
}

.register-link {
	display: block;
	margin-top: 10px;
	color: #a33238;
	text-align: center;
	text-decoration: none;
	font-size: 14px;
}

.register-link:hover {
	text-decoration: underline;
}

.alert {
	margin-top: 15px;
}
</style>
