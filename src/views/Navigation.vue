<template>
  <nav class="navbar navbar-expand-lg navbarBody navbar-margin">
    <div class="container-fluid">
      <RouterLink class="navbar-brand nav-link active" :to="{ name: 'home-link' }"><img src="/Kajarta_LOGO_03.svg"
          class="kajartaLogo"></RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>

      </button>
      <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
        <ul class="navbar-nav col-6">
          <li class="nav-item col">
            <RouterLink class="nav-link active" :to="{ name: 'home-link' }">Home</RouterLink>
          </li>
          <li class="nav-item col">
            <a class="nav-link" href="#">About</a>
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
          <li class="nav-item col">
            <RouterLink class="nav-link " :to="{ name: 'login' }">Login</RouterLink>
          </li>
          <li class="nav-item col">
            <div class="logout-container">
              <el-button round @click="logout" plain>Logout</el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div>
    <div><Notices></Notices></div>
  </div>
  </nav>
</template>

<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import axiosapi from '@/plugins/axios';
import 'element-plus/dist/index.css';
import Notices from './pages/shop/Notices.vue';

const router = useRouter();
const store = useStore();
console.log('before Attempting to logout');
const logout = async () => {
  try {
    console.log('Attempting to logout');
    // console.log('Store:', store); // 添加调试信息
    const response = await axiosapi.post('/logout', {}, {
      withCredentials: true
    });

    if (response.status === 200) {
      console.log('Logout successful');
      localStorage.removeItem('username');
      store.dispatch('logout'); // 调用 store 的 logout action
      router.push('/pages/login');
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

const customerInfo = ref({});
onMounted(async () => {
  const username = localStorage.getItem('username');
  if (username) {
    await store.dispatch('fetchCustomerInfo', username);
  }
});
customerInfo.value = computed(() => store.state.customerInfo.data || {});

const isCollapse = ref(false);
const value5 = ref(true);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.navbar-margin{
margin-right: 30px;
}
</style>