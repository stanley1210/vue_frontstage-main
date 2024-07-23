<template>
  <div>
    <div v-for="viewCar in viewCars" :key="viewCar.id" class="custom-card mb-3">
      <div class="row g-0">
        <div class="col-md-7">
          <img :src="`${path}${viewCar.car}`" class="img-fluid rounded-start" alt="Car Image">
        </div>
        <div class="col-md-5 position-relative">
          <div class="card-body d-flex flex-column justify-content-between h-100 p-3">
            <div class="text-end">
              <h5 class="card-title">Car ID: {{ viewCar.car }}</h5>
              <h5 class="card-title">ID.00{{ viewCar.id }}</h5>
              <h5 class="card-title">{{ viewCar.modelName }}</h5>
              <div class="d-flex flex-row-reverse">
                <div class="p-2">
                  <h6 class="card-title">{{ viewCar.viewCarDate }}</h6>
                </div>
                <div class="p-2">
                  <h6 class="card-title">{{ viewCar.viewTimeSection }}</h6>
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <el-button round @click="toggleViewCar(selectedCarId)" size="small">賞車評價</el-button>
                <el-button round @click="toggleViewCar(selectedCarId)" size="small">取消賞車</el-button>
                <el-button round @click="toggleCar(selectedCarId)" size="small">詳細資料</el-button>
              </div>
            </div>

            <div class="custom-text-group">
              <p class="card-text">預約狀態: {{ getViewCarStatusText(viewCar.viewCarStatus) }}</p>
              <p class="card-text">賞車客戶: {{ viewCar.customerName }}先生/小姐</p>
              <p class="card-text">客戶電話: {{ viewCar.tel }}</p>
              <p class="card-text">試車分店: {{ getViewCarBranchText(viewCar.branch) }}</p>
            </div>

            <div class="text-end">
              <el-pagination size="small" layout="prev, pager, next" :total="totalElements" :current-page="currentPage"
                :page-size="1" @current-change="handlePageChange" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
let customerInfo = ref({});
const store = useStore();
onMounted(() => {
        const username = localStorage.getItem('username');
        if (username) {
                store.dispatch('fetchCustomerInfo', username);
        }
});
customerInfo = computed(() => store.state.customerInfo.data || {});
console.log('===>test Customer info:', customerInfo);



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
.custom-card {
  max-width: 900px;
  /* 调整卡片的最大宽度 */
  word-wrap: break-word;
  /* 防止文字溢出 */
}

.img-fluid {
  height: 100%;
  /* 确保图片高度填满容器 */
  object-fit: cover;
  /* 确保图片填满容器并保持比例 */
}

.card-body {
  overflow: hidden;
  /* 防止内容溢出 */
}

.text-end {
  text-align: right;
  /* 右对齐 */
}

.position-relative {
  position: relative;
}

.h-100 {
  height: 100%;
}

.custom-text-group p {
  margin-bottom: 0.25rem;
  /* 调整每个文本段之间的间距 */
}
</style>
