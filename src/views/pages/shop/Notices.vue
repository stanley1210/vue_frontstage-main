<template>
  <el-icon :size="20" @click="visible = true" class="noticeButton">
    <Bell />
  </el-icon>
  <el-drawer v-model="visible" :show-close="false" class="custom-drawer">
    <template #header="{ close, titleId, titleClass }">
      <div class="drawer-header">
        <h3 class="custom-title-color" :id="titleId">Hello，{{ customerInfo.name }}!</h3>
        <el-button type="info" @click="handleClearNotices" >
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

    <div class="switch-container"> <!-- 添加 switch-container -->
      <el-switch v-model="notificationsEnabled" class="ml-2" inline-prompt
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="關閉通知" inactive-text="開啟通知" />
    </div>
    <div v-if="notificationsEnabled">
      <!-- 显示新车信息 -->


      <div v-if="newCarData.length > 0" class="pointer">
        <div v-for="car in newCarData" :key="car.id" @click="redirectToNewCar(car.id)" class="info-box-today">
          <div class="info-content">
            <img :src="fetchNewCarImageId(car)" class="car-img" alt="Car Image" :id="car.id">
            <div class="info-text">
              <p>有您心儀的車上架了! 快來看看吧!</p>
              <p>(carId：{{ car.id }})</p>
            </div>
          </div>
        </div>
      </div>




      <div v-if="todayViewCars.length > 0" class="pointer">
        <div v-for="viewCar in todayViewCars" :key="viewCar.id" @click="redirectToViewCar(viewCar.id)"
          class="info-box-today">
          <div class="info-content">
            <img :src="carPhotoSrc(viewCar)" class="car-img" alt="Car Image" :id="viewCar.id">
            <div class="info-text">
              <p>今天是您預約的賞車日期!</p>
              <p>(賞車編號：{{ viewCar.id }})</p>
              <p>(carId：{{ viewCar.car }})</p>
              <p>車型：{{ viewCar.modelName }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-for="viewCar in sortedViewCars" :key="viewCar.id" @click="redirectToViewCar(viewCar.id)" class="pointer">
        <div v-if="sortedViewCars.length > 0">
          <div v-if="viewCar.daysLeft > 0" class="info-box">
            <div class="info-content">
              <img :src="carPhotoSrc(viewCar)" class="car-img" alt="Car Image" :id="viewCar.id">
              <div class="info-text">
                <p>距離您賞車，還有 {{ viewCar.daysLeft }} 天!</p>
                <p>(賞車編號：{{ viewCar.id }})</p>
                <p>(carId：{{ viewCar.car }})</p>
                <p>車型：{{ viewCar.modelName }}</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { ElButton, ElDrawer } from 'element-plus';
import { CircleCloseFilled, Bell } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; // 引入 useRouter
import axios from 'axios';
const router = useRouter(); // 使用 useRouter
const path = import.meta.env.VITE_PHOTO;
const store = useStore();
const newCarData = ref([]);
const notificationsEnabled = ref(localStorage.getItem('notificationsEnabled') === 'true'); // 從 localStorage 初始化通知開關狀態
// 監聽 notificationsEnabled 的變化並保存到 localStorage
watch(notificationsEnabled, (newVal) => {
  localStorage.setItem('notificationsEnabled', newVal);
});

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


watch(() => props.newCarIds, (newVal) => {
  if (newVal && newVal.length > 0) {
    fetchNewCarData(newVal);
  }
}, { immediate: true });
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
  // console.log('傳入的carID', props.newCarIds); // 確保 props.newCarIds 有值
  if (props.newCarIds.length > 0) {
    fetchNewCarData(props.newCarIds);
  }


  const username = localStorage.getItem('username');
  if (username) {
    store.dispatch('fetchCustomerInfo', username);
  }
});





// var photoId = null;
const fetchImageId = async (viewCar) => {
  try {
    const response = await axios.get(`http://localhost:8080/kajarta/image/isMainPic/${viewCar.car}`);
    // console.log(`记录返回的数据 ${viewCar.car}: ${response.data.isMainPic}`); 
    document.getElementById(viewCar.id).src = path + response.data.isMainPic;
  } catch (error) {
    console.error('Error fetching image ID:', error);
    return ''; // 返回空值或其他默认值
  }
};

const fetchNewCarImageId = async (car) => {
  try {
    const response = await axios.get(`http://localhost:8080/kajarta/image/isMainPic/${car.id}`);
    // console.log(`记录返回的数据 ${viewCar.car}: ${response.data.isMainPic}`); 
    document.getElementById(car.id).src = path + response.data.isMainPic;
  } catch (error) {
    console.error('Error fetching image ID:', error);
    return ''; // 返回空值或其他默认值
  }
};

const carPhotoSrc = function (viewCar) {
  fetchImageId(viewCar);
  // console.log(path);
  // console.log(path+photoId);
  // return path+photoId;
}
const visible = ref(false);

// Handle clearing notices
const handleClearNotices = () => {
  clearNewCar();
  emit('clear-notices');
};

const clearNewCar = () =>{
  newCarData.value = [];
}

// Redirect to ViewCar with query parameter
const redirectToViewCar = (carId) => {
  console.log('Car ID:', carId);
  router.push({ name: 'pages-shop-memberArea-link', query: { id: carId } });
};

const redirectToNewCar = (carId) => {
  console.log('Car ID:', carId);
  router.push({ name: 'pages-shop-car-link', query: { carId: carId } });
};



//抓取新車id

const fetchNewCarData = async (newCarIds) => {
  try {
    // console.log('Fetching new car data for IDs:', newCarIds);
    const carDataPromises = newCarIds.flat().map(carId =>
      axios.get(`http://localhost:8080/kajarta/car/find/${carId}`)
    );
    const carDataResponses = await Promise.all(carDataPromises);
    newCarData.value = carDataResponses.flatMap(response => response.data.list);
    // console.log('newCarData.value==============', newCarData.value);
  } catch (error) {
    console.error('Error fetching new car data:', error);
  }
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
  width: 120px;
  /* 調整圖片大小 */
  height: auto;
  margin-right: 16px;
  /* 調整圖片與文字之間的間距 */
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

.pointer {
  cursor: pointer;
}
</style>
