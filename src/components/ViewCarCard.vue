<template>
    <div>
      <!-- 顯示分頁數據 -->
      <div v-for="viewCar in viewCars" :key="viewCar.id" class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4" style="height: 200px;">
            <img :src="`${path}${viewCar.id}`" class="img-fit" alt="Car Image">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <select v-model="sortOrder" @change="fetchViewCars(1)" class="form-select">
                <option value="asc">最後新增</option>
                <option value="desc">最近新增</option>
              </select>
              <h5 class="card-title">{{ viewCar.id }}</h5>
              <p class="card-text">View Car Date: {{ viewCar.viewCarDate }}</p>
              <p class="card-text">Sales Score: {{ viewCar.salesScore }}</p>
              <!-- 可以根據需要顯示更多字段 -->
              <el-pagination
                size="small"
                layout="prev, pager, next"
                :total="totalElements"
                :current-page="currentPage"
                :page-size="1"
                @current-change="handlePageChange"
              />
            </div>
          </div>
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

// 獲取分頁數據的函數
const fetchViewCars = async (pageNumber) => {
    try {
        const response = await axios.get('http://localhost:8080/kajarta/front/viewCar/selectAll', {
            params: {
                pageNumber: pageNumber,
            },
        });

        // 使用響應數據
        const data = response.data;
        console.log('Response data:', data);
        viewCars.value = data.list;
        totalElements.value = data.totalElements;
        currentPage.value = data.currentPage;
        console.log('totalElements=' + totalElements.value);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// 當前頁數改變時的處理函數
const handlePageChange = (page) => {
    currentPage.value = page;
    fetchViewCars(page);
};

// 初始化頁面數據
onMounted(() => {
    fetchViewCars(currentPage.value);
});
</script>

<style>
.img-fit {
  width: 200px;
  height: 100%;
  
}
</style>