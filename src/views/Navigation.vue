<template>
<nav class="navbar navbar-expand-lg navbarBody">
  <div class="container-fluid">
    <RouterLink class="navbar-brand nav-link active" :to="{ name: 'home-link' }">
      <img src="/Kajarta_LOGO_03.svg" class="kajartaLogo" />
    </RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
      <ul class="navbar-nav col-6">
        <li class="nav-item col">
          <RouterLink class="nav-link active" :to="{ name: 'home-link' }">Home</RouterLink>
        </li>
        <li class="nav-item col">
          <RouterLink class="nav-link" :to="{ name: 'about' }">About</RouterLink>
        </li>
        <li class="nav-item col">
          <RouterLink class="nav-link " :to="{ name: 'pages-shop-car-link' }">Car</RouterLink>
        </li>
        <li class="nav-item col">
          <RouterLink class="nav-link " :to="{ name: 'pages-shop-home-link' }">Shop</RouterLink>
        </li>
        <li class="nav-item col">
          <RouterLink class="nav-link " :to="{ name: 'pages-shop-memberArea-link' }">MemberArea</RouterLink>
        </li>

        <li class="nav-item col">
          <a class="nav-link" aria-disabled="true">Estimate</a>
        </li>
        <li class="nav-item col">
          <a class="nav-link" aria-disabled="true">News</a>
        </li>
        <li class="nav-item col" v-if="isAuthenticated">
            <div class="logout-container">
              <el-button round @click="logout" plain>Logout</el-button>
            </div>
          </li>
      </ul>
    </div>
  </div>
</nav>
</template>
    
<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import axiosapi from '@/plugins/axios';
import 'element-plus/dist/index.css';

const router = useRouter();
const store = useStore();

const isAuthenticated = computed(() => store.state.isAuthenticated);

const logout = async () => {
  try {
    console.log('Attempting to logout');
    const response = await axiosapi.post('/logout', {}, {
      withCredentials: true
    });

    if (response.status === 200) {
      console.log('Logout successful');
      localStorage.removeItem('username');
      await store.dispatch('logout'); // 调用 store 的 logout action
      router.push({ name: 'home-link' });
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

onMounted(async () => {
  const username = localStorage.getItem('username');
  if (username) {
    await store.dispatch('fetchCustomerInfo', username);
  }
});
</script>

<style></style>
