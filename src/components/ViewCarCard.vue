<template>

  <div class="row">
    <div class="col-2"></div>
        <div class="col-10" style="display: flex; justify-content: flex-end;">
            <h1>Reservation Info</h1>
        </div>
        <el-divider color="#a33238;"></el-divider>
    </div>


 
    <div v-for="viewCar in viewCars" :key="viewCar.id" class="row" style="height: 70vh;margin-bottom: 5%;">
      
        <div class="col-8" style="padding: 0;height: 100%; overflow: hidden;display: flex;align-items: center;justify-content: center;">
          <img :src="`${path}${viewCar.isMainPic}`" class="img-fluid " alt="Car Image">
        </div>
        <div class="col-4 position-relative">
          <div class="bodyCard ">
            <div class="text-end">
              <h5 class="custom-title-color">ID.00{{ viewCar.car }}</h5>
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
              <div >
                <ViewCarDrawer class="customBTM" :date="viewCar.viewCarDate" :timeSection="String(viewCar.viewTimeSectionNb)"
                  :customerId="customerInfo.id" :carId="viewCar.car" :viewCarId="viewCar.id" :viewCarStatus="viewCar.viewCarStatus">
                </ViewCarDrawer>
                <el-button round v-if="viewCar.viewCarStatus===3" disabled size="small" class="customBTM">註銷賞車</el-button>
                <el-button round v-else @click="confirmRemove(viewCar.id,viewCar.car,viewCar.viewCarDate,viewCar.viewTimeSectionNb)" size="small" class="customBTM" >取消賞車</el-button>

                <el-button round @click="toggleCar(selectedCarId)" size="small" class="customBTM" style="margin-left: 16px;">詳細資料</el-button>
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

            <div class="pageCON">
              <el-pagination size="small" background layout="prev, next" :total="totalElements"
                :current-page="currentPage" :page-size="1" @current-change="handlePageChange" />
            </div>
          </div>
        </div>
      
    </div>
 
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axiosapi from '@/plugins/axios';
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
const viewCarId = props.viewCarId;

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

const getViewCarStatusText = function(status) {
  return viewCarStatusMap[status] || '未知状态';
};

const getViewCarBranchText = function(branch) {
  return branchMap[branch] || '未知状态';
};

const getViewTimeSectionhText = function(time) {
  return viewTimeSectionhMap[time] || '未知状态';
};

customerInfo = computed(function() {
  return store.state.customerInfo.data || {};
});


const fetchViewCars = async (page = 1) => {
  console.log('nowRunfetchViewCars')

  if (page === undefined) page = 1;
  try {
    const response = await axiosapi.get('/front/viewCar/findPageByCustomerId', {
      params: { customerId: customerInfo.value.id, pageNumber: page, max: 1 }
    });

    const data = response.data;
    viewCars.value = data.list;
    totalElements.value = data.totalElements;

    // Fetch employee information for each viewCar
    viewCars.value.forEach(function(viewCar) {
      findEmployee(viewCar.id);
    });

    // Iterate over viewCars to fetch car images
    viewCars.value.forEach(function(viewCar) {
      axiosapi.get(`/image/isMainPic/${viewCar.car}`)
        .then(function(response) {
          if (response && response.data) {
            viewCar.isMainPic = response.data.isMainPic;
          } else {
            console.error("Invalid response data structure:", response);
            throw new Error("Invalid car data response");
          }
        })
        .catch(function(error) {
          console.error("Error fetching car data:", error);
        });
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
      const response = await axiosapi.get('/front/viewCar/findPageByCustomerId', {
        params: { customerId: customerInfo.value.id, pageNumber, max: 1 }
      });

      const data = response.data;
      if (data.list.some(viewCar => viewCar.id == props.viewCarId)) {
        // console.log(`Found viewCarId ${props.viewCarId} on page ${pageNumber}`);
        currentPage.value = pageNumber;
        viewCars.value = data.list;
        totalElements.value = data.totalElements;
        found = true;

        // Fetch isMainPic for each viewCar
        await Promise.all(viewCars.value.map(async (viewCar) => {
          try {
            const response = await axiosapi.get(`/image/isMainPic/${viewCar.car}`);
            if (response && response.data) {
              viewCar.isMainPic = response.data.isMainPic;
              console.log("==============",viewCar.isMainPic);
              
            }
          } catch (error) {
            console.error(`Error fetching isMainPic for car ${viewCar.car}:`, error);
          }
        }));

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




const handlePageChange = function(page) {
  currentPage.value = page;
  fetchViewCars(page);
};

onMounted(function() {
  const username = localStorage.getItem('username');
  if (username) {
    store.dispatch('fetchCustomerInfo', username).then(function() {
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


function confirmRemove(id, car, viewCarDate, viewTimeSectionNb) {
  ElMessageBox.confirm(
    '確定要取消賞車嗎?',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      draggable: true,
    }
  )
    .then(function() {
      callRemove(id, car, viewCarDate, viewTimeSectionNb);
    })
    .catch(function() {
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
  axiosapi.post("/viewCarAssigned/findByHQL", request).then(function (response) {
    console.log(response.data.data);
    if (response.data.data.length == 0) {
      // console.log("no單");
    } else {
      employeeName.value = response.data.data[0].employeeName;
      employeeId.value = response.data.data[0].employeeId;
    }
  }).catch(function (error) {
    console.log("error", error);
    Swal.fire({
      text: "查詢錯誤" + error.message,
      icon: "error"
    });
  });
}

const callRemove = async function(id, car, viewCarDate, viewTimeSectionNb) {
  try {
    const response = await axiosapi.put(`/front/viewCar/update/${id}`, {
      viewCarStatus: 3, // 將 viewCarStatus 設置為 3 表示註銷
      id: id,
      carId: car,
      customerId: customerInfo.value.id,
      viewCarDate: viewCarDate,
      viewTimeSection: viewTimeSectionNb,
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


.img-fluid {
  height: auto;
  /* 设定固定高度 */
  width: 100%;
  /* 设定宽度为容器的 100% */
  object-fit: cover;
  /* 确保图片覆盖整个容器，保持比例 */
}

.bodyCard {
  background-color: #a33238;
  border: unset;
  height: 100%;
  padding: 5%;
}

.text-end {
  text-align: right;
}

.position-relative {
  position: relative;
  padding: 0;
}

.h-100 {
  height: 100%;
}

.custom-text-group p {
  margin-bottom: 0.25rem;
}

.custom-title-color {
  color: #fff8f3;
  line-height: 36px;
  font-size: 30px;

}

.custom-text-color {
  position: absolute;
  bottom: 5%;
  left: 8%;
  color: #fff8f3;
  font-size: 20px;
  line-height: 24px;
  letter-spacing:3px;
  font-weight: 900;
}

.pageCON{
  position: absolute;
  bottom: 8%;
  right: 8%;
}

.homepageSlogan {
  font-size: 30px;
  color: #a33238;
  font-weight: 500;
  line-height: 6px;
}

h1 {
    color: #a33238;
    font-weight: 900;
}

.row {
    margin-left: 3.2%;
    margin-right: 3.2%;
}
.customBTM{
  margin-left: 15px;
  color: #a33238;
}
</style>
