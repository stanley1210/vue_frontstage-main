<template>
  <nav class="navbar navbar-expand-lg navbarBody">
    <div class="container-fluid navbar-margin">
      <RouterLink class="navbar-brand nav-link active" :to="{ name: 'home-link' }">
        <img src="/Kajarta_LOGO_03.svg" class="kajartaLogo" style="width: 65%;padding-top: 3px;padding-left: 50px;" />
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
        <ul class="navbar-nav col-6">
          <li class="nav-item col">
            <RouterLink class="nav-link  navbtm" :to="{ name: 'home-link' }">Home</RouterLink>
          </li>
          <li class="nav-item col">
            <RouterLink class="nav-link  navbtm" :to="{ name: 'about' }">About</RouterLink>
          </li>
          <li class="nav-item col">
            <RouterLink class="nav-link navbtm" :to="{ name: 'pages-shop-home-link' }">Shop</RouterLink>
          </li>
          <li class="nav-item col" v-if="customerInfo.accountType == 1 || customerInfo.accountType == 2">
            <RouterLink class="nav-link navbtm" :to="{ name: 'pages-shop-memberArea-link' }"
              style="margin-right: 35px;">MemberArea</RouterLink>
          </li>

          <li class="nav-item col" style="margin-right: 20px;">
            <RouterLink class="nav-link navbtm" disabled="true" to="#">Estimate</RouterLink>
          </li>
          <li class="nav-item col">
            <RouterLink class="nav-link navbtm" disabled="true" to="#">News</RouterLink>
          </li>
          <li class="nav-item col" v-if="isAuthenticated">
            <div class="logout-container">
              <a class="nav-link navbtm" href="#" @click.prevent="logout">Logout</a>
            </div>
          </li>
          <li>
            <div style="margin-top: 10px;margin-right: 20px;margin-left: 20px;">
              <Notices :filteredViewCars="filteredViewCars" :newCarIds="matchingIds" @clear-notices="clearNotices">
              </Notices>
            </div>
          </li>
        </ul>
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
const newCarId = ref<number | null>(null);
const newCarIds = ref<any[]>([]);
const preferenceCarIds = ref([]);
const matchingIds = ref<any[]>([]);
const customerInfoId = ref('');

customerInfoId.value = customerInfo.value.id


const logout = async () => {
  try {
    // console.log('Attempting to logout');
    const response = await axiosapi.post('/logout', {}, {
      withCredentials: true
    });

    if (response.status === 200) {
      // console.log('Logout successful');
      localStorage.removeItem('username');
      await store.dispatch('logout'); // 调用 store 的 logout action
      router.push({ name: 'home-link' });
      await store.dispatch('logout'); // 调用 store 的 logout action
      router.push({ name: 'home-link' });
    }
  } catch (error) {
    // console.error('Logout failed:', error);
  }
};

//=======================ViewCar==========================
const fetchViewCars = async () => {
  if (customerInfo.value.id) {
    try {
      const response = await axiosapi.get(`/front/viewCar/findByCustomer/${customerInfo.value.id}`);
      const data = response.data;
      viewCars.value = data.list;

      // 获取当前时间和未来 10 天的日期
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 确保时间为 00:00:00
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 10);

      // 筛选出 viewCarDate 在今天及未来 10 天内的记录
      filteredViewCars.value = viewCars.value.filter((viewCar: any) => {
        const viewCarDate = new Date(viewCar.viewCarDate);
        viewCarDate.setHours(0, 0, 0, 0); // 确保时间为 00:00:00
        return viewCarDate >= today && viewCarDate <= futureDate;
      });

      // console.log('Filtered view cars (today and within next 10 days):', filteredViewCars.value);
    } catch (error) {
      console.error('Failed to fetch view cars:', error);
    }
  }
};

// 修改处：定义清空通知的方法
const clearNotices = () => {
  filteredViewCars.value = [];
};
//=======================ViewCar==========================

//======================有無新車=======================
// 获取新增车辆
const fetchNewCars = async () => {
  try {
    const since = new Date().toISOString();
    // console.log('since=' + since);

    // 发起请求获取新车
    const responseNewCars = await axiosapi.get('/front/notice/new-cars', { params: { since } });
    const newCarsData = responseNewCars.data;  // 已经是对象，不需要再次解析

    if (newCarsData.length > 0) {
      // 将所有新车的 ID 存储在数组中
      newCarIds.value = newCarsData.map(car => car.id);
      console.log('newCarIds.value=' + newCarIds.value);
    }

    // 获取符合条件的车辆 ID
    await fetchCarIdsByCustomer(customerInfo.value.id);  // 这里的 123 是示例客户 ID，你需要替换成实际的客户 ID
// console.log('customerInfo.value.id========'+customerInfo.value.id)
    // 比较两个数组中的 ID
    matchingIds.value = newCarIds.value.filter(id => preferenceCarIds.value.includes(id));
    if (matchingIds.value.length > 0) {
      // console.log('Matching IDs:', matchingIds);
    } else {
      // console.log('No matching IDs found.');
    }
  } catch (error) {
    console.error('Failed to fetch new cars:', error);
  }
};


//符合心儀條件的所有車子
const fetchCarIdsByCustomer = async (customerId) => {
  try {
    // 发起请求获取符合条件的车辆
    const response = await axiosapi.get(`/front/notice/findPreferenceDatasId/${customerId}`);
// console.log('fetchCarIdsByCustomer response.data.list=====',response.data.list)
    // 处理响应数据
    const data = response.data.list; // 解析出符合条件的车辆列表

    if (data.length > 0) {
      // 提取车辆 ID
      preferenceCarIds.value = data.map(car => car.id);
      console.log('preferenceCarIds.value=', preferenceCarIds.value);
    } else {
      // console.log('No cars match the preferences.');
    }
  } catch (error) {
    console.error('Failed to fetch car IDs:', error);
  }
};



//======================有無新車=======================
onMounted(async () => {
  const username = localStorage.getItem('username');
  if (username) {
    await store.dispatch('fetchCustomerInfo', username);
    await fetchNewCars();
    await fetchViewCars();

    // setInterval(fetchNewCars, 30000); // 每分钟检查一次
  }
});






</script>

<style scoped>
.navbtm {
  font-size: 18px;
  font-weight: 900;
  color: #a33238;
}

.navbtm:hover {
  text-decoration: underline #a33238 3px;
  color: #a33238;

}
</style>