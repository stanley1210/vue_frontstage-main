<template>
  <nav class="navbar navbar-expand-lg navbarBody ">
    <div class="container-fluid navbar-margin">
      <RouterLink class="navbar-brand nav-link active" :to="{ name: 'home-link' }">
        <img src="/Kajarta_LOGO_03.svg" class="kajartaLogo" />
      </RouterLink>
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
            <RouterLink class="nav-link" :to="{ name: 'pages-shop-car-link' }">Car</RouterLink>
          </li>
          <li class="nav-item col">
            <RouterLink class="nav-link" :to="{ name: 'pages-shop-home-link' }">Shop</RouterLink>
          </li>
          <li class="nav-item col">
            <RouterLink class="nav-link" :to="{ name: 'pages-shop-memberArea-link' }">MemberArea</RouterLink>
          </li>
          <li class="nav-item col">
            <a class="nav-link" aria-disabled="true">Estimate</a>
          </li>
          <li class="nav-item col">
            <a class="nav-link" aria-disabled="true">News</a>
          </li>
          <li class="nav-item col" v-if="!isAuthenticated">
            <RouterLink class="nav-link" :to="{ name: 'register' }">Register</RouterLink>
          </li>
          <li class="nav-item col" v-if="isAuthenticated">
            <button class="btn btn-link nav-link" @click="logout">Logout</button>
          </li>
      </ul>
      <div><Notices></Notices></div>
    </div>
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

const isAuthenticated = computed(() => store.state.isAuthenticated);
const customerInfo = computed(() => store.state.customerInfo.data || {});
const viewCars = ref<any[]>([]);
const filteredViewCars = ref<any[]>([]);

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
      await store.dispatch('logout'); // 调用 store 的 logout action
      router.push({ name: 'home-link' });
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

//=======================ViewCar==========================
const fetchViewCars = async () => {
  if (customerInfo.value.id) {
    try {
      const response = await axiosapi.get(`http://localhost:8080/kajarta/front/viewCar/findByCustomer/${customerInfo.value.id}`);
      const data = response.data;
      viewCars.value = data.list;

      // 获取当前时间和未来 10 天的日期
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + 10);

      console.log('Today:', today.toISOString().split('T')[0]);
      console.log('Future Date (10 days later):', futureDate.toISOString().split('T')[0]);

      // 筛选出 viewCarDate 在未来 10 天内的记录
      filteredViewCars.value = viewCars.value.filter((viewCar: any) => {
        const viewCarDate = new Date(viewCar.viewCarDate);
        console.log(`ViewCarDate: ${viewCar.viewCarDate}, Parsed Date: ${viewCarDate.toISOString().split('T')[0]}`);
        return viewCarDate >= today && viewCarDate <= futureDate;
      });

      console.log('Filtered view cars (within next 10 days):', filteredViewCars.value);
    } catch (error) {
      console.error('Failed to fetch view cars:', error);
    }
  }
};
//=======================ViewCar==========================




onMounted(async () => {
  const username = localStorage.getItem('username');
  if (username) {
    await store.dispatch('fetchCustomerInfo', username);
    await fetchViewCars();
  }
});
</script>

<style scoped>
/* 确保所有的 nav-link 和按钮有一致的样式 */
.nav-link {
  color: #a33238;
  text-decoration: none;
  font-size: 14px;
  line-height: 1.5;
  /* 调整行高确保对齐 */
}

.nav-link:hover {
  text-decoration: underline;
}

.btn-link {
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  color: #a33238;
  line-height: 1.5;
  /* 确保按钮与其他链接在垂直方向上对齐 */
}

.btn-link:hover {
  text-decoration: underline;
}

/* 确保按钮和其他 nav-items 在同一行对齐 */
.nav-item {
  display: flex;
  align-items: center;
}

.navbar-margin {
  margin-right: 30px;
}
</style>