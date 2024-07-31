<template>
  <el-icon :size="20" @click="visible = true" class="noticeButton">
    <Bell />
  </el-icon>
  <el-drawer v-model="visible" :show-close="false" class="custom-drawer">
    <template #header="{ close, titleId, titleClass }">
      <div class="drawer-header">
        <h3 class="custom-title-color" :id="titleId">Hello，{{ customerInfo.name }}!</h3>
        <el-button type="info" @click="handleClearNotices">
          <el-icon class="el-icon--left">
            <CircleCloseFilled />
          </el-icon>
          清空
        </el-button>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left">
            <CircleCloseFilled />
          </el-icon>
          Close
        </el-button>
      </div>
    </template>
      <!-- 显示新车信息 -->
      <div v-if="Array.isArray(newCarIds) && newCarIds.length > 0" class="info-box">
      <div class="info-content">
        <p>新增的二手车 IDs：{{ newCarIds.join(', ') }}</p>
      </div>
    </div>
    <div v-if="todayViewCars.length > 0">
      <div v-for="viewCar in todayViewCars" :key="viewCar.id" class="info-box-today">
        <div class="info-content">
          <img :src="`${path}${viewCar.car}`" class="car-img" alt="Car Image">
          <div class="info-text">
            <p>今天是您預約的賞車日期! </p>
            <p>(賞車編號：{{ viewCar.id }})</p>
            <p>車型：{{ viewCar.modelName }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-for="viewCar in sortedViewCars" :key="viewCar.id">
      <div v-if="sortedViewCars.length > 0">
        <div v-if="viewCar.daysLeft > 0" class="info-box">
          <div class="info-content">
            <img :src="`${path}${viewCar.car}`" class="car-img" alt="Car Image">
            <div class="info-text">
              <p>距離您賞車，還有 {{ viewCar.daysLeft }} 天! </p>
              <p>(賞車編號：{{ viewCar.id }})</p>
              <p>車型：{{ viewCar.modelName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElButton, ElDrawer } from 'element-plus';
import { CircleCloseFilled, Bell } from '@element-plus/icons-vue';
import { useStore } from 'vuex';

const path = import.meta.env.VITE_PHOTO;
const store = useStore();

// Define props with default values
const props = defineProps({
  filteredViewCars: {
    type: Array,
    default: () => []
  },
  newCarIds: {
    type: Array,
    default: () => []
  }
});

// Emit events
const emit = defineEmits(['clear-notices']);

// Compute the authentication state from Vuex store
const isAuthenticated = computed(() => store.state.isAuthenticated);

// Compute customer information from Vuex store
const customerInfo = computed(() => store.state.customerInfo.data || {});

// Get today's date as a string
const today = new Date().toDateString();

// Compute days left for each viewCar
const processedViewCars = computed(() => {
  return props.filteredViewCars.map(viewCar => {
    const viewCarDate = new Date(viewCar.viewCarDate);
    const timeDiff = viewCarDate.getTime() - new Date().getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return {
      ...viewCar,
      daysLeft
    };
  });
});

// Filter out today's viewCars
const todayViewCars = computed(() => {
  return props.filteredViewCars.filter(viewCar => {
    const viewCarDate = new Date(viewCar.viewCarDate).toDateString();
    return viewCarDate === today;
  });
});

// Sort processedViewCars by daysLeft
const sortedViewCars = computed(() => {
  return processedViewCars.value.sort((a, b) => a.daysLeft - b.daysLeft);
});

onMounted(() => {
  const username = localStorage.getItem('username');
  if (username) {
    store.dispatch('fetchCustomerInfo', username);
  }
});

const visible = ref(false);

// Handle clearing notices
const handleClearNotices = () => {
  emit('clear-notices');
};



</script>

<style scoped>
.noticeButton {
  cursor: pointer;
}

.custom-title-color {
  color: #a33238;
  margin: 0;
}

.custom-drawer {
  padding: 20px;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-box {
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.info-box-today {
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff5eb;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.info-content {
  display: flex;
  align-items: center;
}

.car-img {
  width: 120px; /* 調整圖片大小 */
  height: auto;
  margin-right: 16px; /* 調整圖片與文字之間的間距 */
}

.info-text p {
  margin: 0;
}

.today-notification {
  border: 2px solid #a33238;
  background-color: #fff3e0;
}

.today-notification h4 {
  margin: 0;
  color: #a33238;
}

.custom-offcanvas {
  background-color: #F2E6E6;
}
</style>
