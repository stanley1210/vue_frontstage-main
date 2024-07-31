<template>
  <br>
  <div class="homepageSlogan">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reservation
    info</div>
  <p>__________________________________________________________________________________________________________________
  </p>
  <br>
  <div>
    <div v-for="viewCar in viewCars" :key="viewCar.id" class="custom-card mb-3">
      <div class="row g-0">
        <div class="col-md-7">
          <img :src="`${path}${viewCar.car}`" class="img-fluid rounded-start" alt="Car Image">
        </div>
        <div class="col-md-5 position-relative">
          <div class="card-body d-flex flex-column justify-content-between h-100 p-3 viewcarnavbarBody">
            <div class="text-end">
              <h5 class="custom-title-color">ID.00{{ viewCar.id }}</h5>
              <h5 class="custom-title-color">{{ viewCar.modelName }}</h5>
              <div class="d-flex flex-row-reverse">
                <div class="p-2">
                  <h6 class="custom-title-color">{{ viewCar.viewCarDate }}</h6>
                </div>
                <div class="p-2">
                  <h6 class="custom-title-color">{{ getViewTimeSectionhText(viewCar.viewTimeSectionNb) }}</h6>
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <ViewCarDrawer :date="viewCar.viewCarDate" :timeSection="String(viewCar.viewTimeSectionNb)"
                  :customerId="customerInfo.id" :carId="viewCar.car" :viewCarId="viewCar.id" :viewCarStatus="viewCar.viewCarStatus">
                </ViewCarDrawer>
                <el-button round v-if="viewCar.viewCarStatus===3" disabled size="small" class="custom-button">註銷賞車</el-button>
                <el-button round v-else @click="confirmRemove(viewCar.id,viewCar.car,viewCar.viewCarDate,viewCar.viewTimeSectionNb)" size="small" class="custom-button">取消賞車</el-button>

                <el-button round @click="toggleCar(selectedCarId)" size="small" class="custom-button">詳細資料</el-button>
              </div>
            </div>
            <br>
            <div class="custom-text-color">
              <p>預約狀態: {{ getViewCarStatusText(viewCar.viewCarStatus) }}</p>
              <p>賞車客戶: {{ customerInfo.name }}先生/小姐</p>
              <p>客戶電話: {{ customerInfo.phone }}</p>
              <p>接待業務: {{employeeName}}</p>
              <p>試車分店: {{ getViewCarBranchText(viewCar.branch) }}</p>
            </div>

            <div class="text-end">
              <el-pagination size="small" background layout="prev, pager, next" :total="totalElements"
                :current-page="currentPage" :page-size="1" @current-change="handlePageChange" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import ViewCarDrawer from './ViewCarDrawer.vue';
const props = defineProps({
  viewCarId: String
});

const store = useStore();
let customerInfo = ref({});
const path = import.meta.env.VITE_PHOTO;
const viewCars = ref([]);
const totalElements = ref(0);
const currentPage = ref(1);
const employeeName = ref('');
const employeeId = ref('');

const viewCarStatusMap = {
  0: '預約中',
  1: '時間確定',
  2: '完成賞車',
  3: '註銷'
};

const viewTimeSectionhMap = {
  1: "10:00:00-12:00:00",
  2: "13:00:00-15:00:00",
  3: "15:00:00-17:00:00",
  4: "17:00:00-19:00:00"
};

const branchMap = {
  1: '台北市大吉祥分店',
  2: '台中市大滿貫分店',
  3: '高雄市大巨蛋分店'
};

const getViewCarStatusText = (status) => viewCarStatusMap[status] || '未知状态';
const getViewCarBranchText = (branch) => branchMap[branch] || '未知状态';
const getViewTimeSectionhText = (time) => viewTimeSectionhMap[time] || '未知状态';

const fetchViewCars = async (page = 1) => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/front/viewCar/findPageByCustomerId', {
      params: { customerId: customerInfo.value.id, pageNumber: page, max: 1 }
    });

    const data = response.data;
    viewCars.value = data.list;
    totalElements.value = data.totalElements;

     // Fetch employee information for each viewCar
     viewCars.value.forEach(viewCar => {
      findEmployee(viewCar.id);
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};







// Fetch all viewCars data to find the page containing viewCarId
const fetchAllViewCars = async () => {
  try {
    let pageNumber = 1;
    let found = false;

    while (!found) {
      const response = await axios.get('http://localhost:8080/kajarta/front/viewCar/findPageByCustomerId', {
        params: { customerId: customerInfo.value.id, pageNumber, max: 1 }
      });

      const data = response.data;
      if (data.list.some(viewCar => viewCar.id == props.viewCarId)) {
        console.log(`Found viewCarId ${props.viewCarId} on page ${pageNumber}`);
        currentPage.value = pageNumber;
        viewCars.value = data.list;
        totalElements.value = data.totalElements;
        found = true;
        viewCars.value.forEach(viewCar => {
          findEmployee(viewCar.id);
        });
      } else if (pageNumber >= data.totalPages) {
        console.log(`Reached last page without finding viewCarId ${props.viewCarId}`);
        found = true;
      } else {
        pageNumber++;
      }
    }

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};








const handlePageChange = (page) => {
  currentPage.value = page;
  fetchViewCars(page);
};

onMounted(() => {
  const username = localStorage.getItem('username');
  if (username) {
    store.dispatch('fetchCustomerInfo', username).then(() => {
      if (props.viewCarId) {
        fetchAllViewCars();
      } else {
        fetchViewCars();
      }
    });
  } else {
    if (props.viewCarId) {
      fetchAllViewCars();
    } else {
      fetchViewCars();
    }
  }
});

customerInfo = computed(() => store.state.customerInfo.data || {});
console.log('===>test Customer info:', customerInfo);

function confirmRemove(id,car,viewCarDate,viewTimeSectionNb) {
  ElMessageBox.confirm(
    '確定要取消賞車嗎?',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      draggable: true,
    }
  )
    .then(() => {
      callRemove(id,car,viewCarDate,viewTimeSectionNb);
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
}


function findEmployee(viewCarId) {
  let request = {
    "viewCarId": viewCarId,
    "isPage": 0,
    "max": 999,
    "dir": false,
    "order": "updateTime"
  }
  axios.post("http://localhost:8080/kajarta/viewCarAssigned/findByHQL", request).then(function (responce) {
    console.log(responce.data.data);
    if (responce.data.data.length == 0) {
      console.log("no單");
    } else {
      employeeName.value = responce.data.data[0].employeeName
      employeeId.value = responce.data.data[0].employeeId
    }
  }).catch(function (error) {
    console.log("error", error);
    Swal.fire({
      text: "查詢錯誤" + error.message,
      icon: "error"
    });
  });
}



// function callRemove(id) {
//   if (id) {
//     axios.delete(`http://localhost:8080/kajarta/front/viewCar/delete/${id}`)
//       .then(function (response) {
//         console.log("response", response);
//         if (response.data.success) {
//           fetchViewCars(currentPage.value, customerInfo.value.id);
//           ElMessage({
//             type: 'success',
//             message: 'Delete completed',
//           });
//         } else {
//           ElMessage({
//             type: 'warning',
//             message: response.data.message,
//           });
//         }
//       })
//       .catch(function (error) {
//         console.error("Error deleting data:", error);
//         ElMessage({
//           type: 'error',
//           message: 'Delete failed: ' + error.message,
//         });
//       });
//   }
// }



const callRemove = async (id,car,viewCarDate,viewTimeSectionNb) => {
  try {
    const response = await axios.put(`http://localhost:8080/kajarta/front/viewCar/update/${id}`, {
      viewCarStatus: 3, // 將 viewCarStatus 設置為 3 表示註銷
      id:id,
      carId:car,
      customerId: customerInfo.value.id,
      viewCarDate:viewCarDate,
      viewTimeSection:viewTimeSectionNb,
    });
    console.log(response.data);
    if (response.data.success) {
      ElMessage({
        type: 'success',
        message: '提交成功'
      });
      // 刷新數據以反映更改
      fetchViewCars(currentPage.value);
    } else {
      ElMessage({
        type: 'warning',
        message: response.data.message
      });
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '提交失敗: ' + error.message
    });
  }
}




</script>


<style scoped>
.custom-card {
  max-width: 900px;
  word-wrap: break-word;
}

.img-fluid {
  height: 350px;
  /* 设定固定高度 */
  width: 100%;
  /* 设定宽度为容器的 100% */
  object-fit: cover;
  /* 确保图片覆盖整个容器，保持比例 */
}

.card-body {
  overflow: hidden;
}

.text-end {
  text-align: right;
}

.position-relative {
  position: relative;
}

.h-100 {
  height: 100%;
}

.custom-text-group p {
  margin-bottom: 0.25rem;
}

.custom-title-color {
  color: #ffecdc;
  line-height: 12px;
}

.custom-text-color {
  color: #ffecdc;
  font-size: 14px;
  line-height: 6px;
}

.homepageSlogan {
  font-size: 30px;
  color: #a33238;
  font-weight: 500;
  line-height: 6px;
}
</style>
