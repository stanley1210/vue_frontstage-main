<template>
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" placeholder="Username" required />
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');

const handleSubmit = () => {
    let request = {
        username: username.value,
        password: password.value
    };

    axios.post('/login', request)
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
