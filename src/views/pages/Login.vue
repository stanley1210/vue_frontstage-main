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
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import axiosapi from '@/plugins/axios';

const username = ref('');
const password = ref('');
const loginMessage = ref('');
const router = useRouter();
const store = useStore();


const handleSubmit = () => {
	// let request = {
	// 	username: username.value,
	// 	password: password.value
	// };

	// console.log('Request:', request); // 打印 request 確認數據

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
					router.push({ name: 'home-link' });
				});
			} else {
				// 處理非200狀態碼或 success 為 false 的情况
				console.error('Login failed with response:', response);
				Swal.fire({
					icon: 'error',
					title: '登入失败',
					text: data.msg || '帳號或密碼錯誤'
				});
			}
		})
		.catch(error => {
			// 處理其他错误
			console.error('Login failed', error);
			Swal.fire({
				icon: 'error',
				title: '登入失败',
				text: '帳號或密碼錯誤'
			});
		});
};

// 使用 async/await 文法主要有以下幾個好處：
// 1.程式碼可讀性：async/await 語法使非同步程式碼看起來更像同步程式碼，從而提高程式碼的可讀性和可維護性。相較於 .then() 鍊式調用，async/await 更加直觀，減少了回調地獄的問題。
// 2.錯誤處理：async/await 語法可以使用標準的 try/catch 區塊來處理錯誤，使得錯誤處理更加簡潔一致。在 .then() 鍊式呼叫中，你通常需要在鏈的末端使用 .catch() 來處理錯誤。
// 3.調試方便：調試使用 async/await 的程式碼比 .then() 鍊式呼叫更方便，因為堆疊追蹤資訊更加清晰。你可以更輕鬆地查看程式碼執行的順序和變數的狀態。
// 获取员工信息
const getCustomerInfo = async (username) => {
	try {
		const response = await axiosapi.get(`/customer/info/username/${username}`);
		const data = response.data;
		console.log('Customer info:', data);
		// 假设我们使用 Vuex 来存储员工信息
		store.commit('setCustomerInfo', data);
	} catch (error) {
		console.error('Failed to get customer info:', error);
	}
};
// 使用.then
// const getCustomerInfo = (username) => {
//     axiosapi.get(`/customer/info/${username}`)
//     .then(response => {
//         const data = response.data;
//         console.log('Customer info:', data);
//     })
//     .catch(error => {
//         console.error('Failed to get customer info:', error);
//     });
// };
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
