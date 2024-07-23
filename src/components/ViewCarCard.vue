<template>
  <div>
    <!-- 显示分页数据 -->
    <div v-for="viewCar in viewCars" :key="viewCar.id" class="card mb-3" style="max-width: 540px;">
      <img :src="`${path}${viewCar.car}`" class="card-img-top" alt="Car Image">
      <div class="card-body">
        <h5 class="card-title">Car ID: {{ viewCar.car }}</h5>
        <h5 class="card-title">ID.00{{ viewCar.id }}</h5>
        <h5 class="card-title"> {{ viewCar.modelName }}</h5>
        <h5 class="card-title"> {{ viewCar.viewCarDate }}</h5>
        <h5 class="card-title"> {{ viewCar.viewTimeSection }}</h5>
        <p class="card-text">預約狀態: {{ getViewCarStatusText(viewCar.viewCarStatus) }}</p>
        <p class="card-text">賞車客戶: {{ viewCar.customerName }}先生/小姐</p>
        <p class="card-text">客戶電話: {{ viewCar.tel }}</p>
        <p class="card-text">試車分店: {{ getViewCarBranchText(viewCar.branch) }}</p>


        <div class="mb-4">
          <el-button round @click="toggleViewCar(selectedCarId)">Round</el-button>
        </div>


        <!-- 根据需要显示更多字段 -->
        <el-pagination size="small" layout="prev, pager, next" :total="totalElements" :current-page="currentPage"
          :page-size="1" @current-change="handlePageChange" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


const path = import.meta.env.VITE_PHOTO;
const viewCars = ref([]);
const totalElements = ref(0);
const currentPage = ref(1);
const sortOrder = ref('asc');
const viewCarStatusMap = {
  0: '預約中',
  1: '時間確定',
  2: '完成賞車',
  3: '註銷'
};

const branchMap = {
  1: '台北市大吉祥分店',
  2: '台中市大滿貫分店',
  3: '高雄市大巨蛋分店'
};

const getViewCarStatusText = (status) => viewCarStatusMap[status] || '未知状态';
const getViewCarBranchText = (branch) => branchMap[branch] || '未知状态';

// 获取分页数据的函数
const fetchViewCars = async (pageNumber) => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/front/viewCar/selectAll', {
      params: { pageNumber }
    });

    const data = response.data;
    viewCars.value = data.list;
    totalElements.value = data.totalElements;
    currentPage.value = data.currentPage;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// 当前页数改变时的处理函数
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchViewCars(page);
};

// 初始化页面数据
onMounted(() => {
  fetchViewCars(currentPage.value);
});
</script>

<style>
.card-img-top {
  height: 200px;
  object-fit: cover;
  /* 确保图片填满容器并保持比例 */
}
</style>
