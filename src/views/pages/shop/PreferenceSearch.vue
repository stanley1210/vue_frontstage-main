<template>
  <section>
  <Navigation></Navigation>
  <br />
  <!-- 顯示查詢結果 -->
  <h3 style="color: #a33238;">顯示搜尋車輛結果</h3>
  <div class="card-container">
    <div class="card" v-for="data in paginatedResults" :key="data.id" :data="data">
    <img class="card-img-top" :src="`${path}${data.id}`" :alt="data.modelName"> 
      <div class="card-body navbarBody">
        <h5 class="card-title">{{ data.modelName }}</h5>
        <p class="card-text">
          年分: {{ data.productionYear }}<br />
          價格: {{ data.price }} <br />
          里程數: {{ data.milage }} <br />
          車況評分: {{ data.conditionScore }} <br />
          馬力: {{ data.hp }} <br />
          扭力: {{ data.torque }} <br />
          品牌: {{ data.brand }} <br />
          車型: {{ data.suspension }} <br />
          車門數: {{ data.door }} <br />
          乘客數: {{ data.passenger }} <br />
          驅動方式: {{ data.rearWheel }} <br />
          引擎燃料: {{ data.gasoline }} <br />
          變速系統: {{ data.transmission }} <br />
          排氣量: {{ data.cc }} <br />
        </p>
      </div>
    </div>
  </div>
<br>
<!-- 分頁效果(上下頁) -->
<div class="pagination-container">
  <el-pagination
      @current-change="handlePageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[2, 3, 4, 5]"
      layout=" prev, pager, next, jumper"
      :total="results.length">
<!-- 自訂顯示幾筆 -->
    </el-pagination>
     <el-select v-model="pageSize" placeholder="每頁顯示數量" @change="handlePageSizeChange" style="width: 60px;">
      <el-option label="2" :value="2"></el-option>
      <el-option label="3" :value="3"></el-option>
      <el-option label="4" :value="4"></el-option>
      <el-option label="5" :value="5"></el-option>
    </el-select>
    <div>
      每頁顯示 {{ pageSize }} 筆
    </div>
</div>
  <br>
  <el-button @click="goBack" type="default" color="#a33238">返回查詢</el-button>
</section>
</template>

<script setup>
import { onMounted, ref,computed } from 'vue';
import { useRoute,useRouter  } from 'vue-router';
import Navigation from '@/views/Navigation.vue';
import axios from 'axios';

const path =import.meta.env.VITE_PHOTO;
const route = useRoute();
const router = useRouter();
const query = route.query;
const results = ref([]);
const currentPage = ref(1);
const pageSize = ref(4);

// 分頁
const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return results.value.slice(start, end);
});

// 搜尋結果
const handleSearchByNoMemSearch = async () => {
  try { 
    const response = await axios.get('http://localhost:8080/kajarta/preference/searchMore', {
      params: {
        carinfoId: query.carinfoId,
        brand:  query.brand,
        suspension:  query.suspension,
        door: query.door,
        passenger: query.passenger,
        rearwheel: query.rearwheel,
        gasoline: query.gasoline,
        transmission:  query.transmission,
        cc:  query.cc,
        score:  query.score,
        modelName: query.modelName || null,
        productionYear: +query.productionYear || null,
        price: query.price ? parseFloat(query.price) : null,
        milage: query.milage ? parseInt(query.milage) : null,
        hp: query.hp ? parseInt(query.hp) : null,
        torque: query.torque ? parseFloat(query.torque) : null,
      },
    });
    results.value = response.data.preferenceCarList;
    console.log('查詢結果:', response.data);
  } catch (error) {
    console.error('查詢失敗:', error);
  }
};

// 分頁有上下頁選擇
const handlePageChange = (page) => {
  currentPage.value = page;
};

// 分頁自訂顯示幾筆
const handlePageSizeChange = (newSize) => {
  pageSize.value = newSize;
  currentPage.value = 1;
};

// 返回搜尋頁面
const goBack = () => {
  router.push({
    name: 'pages-shop-home-link'
})};

onMounted(() => {
  handleSearchByNoMemSearch();
  console.log('query=' + query);
});
</script>

<style>

.card-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  overflow-x: auto;
}

/* 分頁效果格式 */
.pagination-container {
  display: flex;
  align-items: center;
  gap: 16px; 

}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 1rem;
  line-height: 1.5;
}
</style>
