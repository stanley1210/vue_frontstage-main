<template>
  <section>
    <!-- ------------------------------------------大圖------------------------------------------ -->
    <Navigation></Navigation>
    <CarImage
      :images="images"
      style="height: 30%; width: auto; overflow: hidden"
    ></CarImage>

    <!-- ------------------------------------------資料行 ------------------------------------------ -->
    <div class="navbarBody">
      <div v-for="carData in carDatas" :key="carData.id" :carData="carData">
        <div class="custom-padding-ID">
          <p class="custom-title-color">ID.00{{ carData.id }}</p>
        </div>

        <div class="d-flex mb-3 big-custom-padding">
          <div class="big-custom-padding-carinfoBrand">
            <div class="p-2 big-title-color-carinfoBrand">
              <p>{{ carData.carinfoBrand }}</p>
            </div>
          </div>

          <div class="p-2 big-title-color">
            <div style="padding-right: 20px">
              <p>{{ carData.carinfoModelName }}</p>
              <p style="font-size: 24px">售價：${{ carData.price }}</p>
            </div>
          </div>

          <div class="p-2">
            <font-awesome-icon
              :icon="['fas', 'star-of-life']"
              :spin="isSpinning"
              :style="{ color: iconColor }"
              size="lg"
              @mouseover="handleMouseOver"
              @mouseleave="handleMouseLeave"
              class="likeLogo"
              @click="callLikeCreate(selectedCarId)"
            />
          </div>
        </div>

        <div class="d-flex mb-3 custom-padding">
          <div class="p-2">
            <div class="vertical-line"></div>
          </div>
          <div class="p-2">
            <div class="inline-padding">
              <h2 class="custom-title-color">車輛資訊</h2>
              <div class="custom-text-color">
                <p>年份：{{ carData.productionYear }}</p>
                <p>里程：{{ carData.milage }} km</p>
                <p>車型：{{ carData.carinfoSuspension }}</p>
                <p>車門數量：{{ carData.carinfoDoor }}</p>
                <p>乘客數：{{ carData.carinfoPassenger }}</p>
                <p>驅動方式：{{ carData.carinfoRearWheel }}</p>
                <p>引擎燃料：{{ carData.carinfoGasoline }}</p>
                <p>顏色：{{ carData.color }}</p>
              </div>
            </div>
          </div>

          <div class="p-2">
            <div class="vertical-line2"></div>
          </div>

          <div class="p-2">
            <div class="inline-padding">
              <h2 class="custom-title-color">性能</h2>
              <div class="custom-text-color">
                <p>變速系統：{{ carData.carinfoTransmission }}</p>
                <p>排氣量：{{ carData.carinfoCc }}</p>
                <p>馬力：{{ carData.carinfoHp }}</p>
                <p>扭力：{{ carData.carinfoTorque }}</p>
              </div>
            </div>
          </div>

          <div class="p-2">
            <div class="vertical-line3"></div>
          </div>

          <div class="p-2">
            <div class="inline-padding">
              <h2 class="custom-title-color">其他資訊</h2>
              <div class="custom-text-color">
                <p>車況評分：{{ carData.conditionScore }}</p>
                <p>是否改裝：{{ carData.remarkName }}</p>
                <p>上架日期：{{ carData.launchDate }}</p>
                <br />
                <p>訂單狀態：{{ carData.stateName }}</p>
                <p>停放分店：{{ carData.branch }}</p>
                <p>管理銷售員：{{ carData.employeeName }}</p>
              </div>
            </div>
          </div>

          <div class="p-2">
            <div
              class="d-flex align-items-end flex-column mb-3"
              style="height: 50px"
            >
              <div class="p-2">
                <el-button
                  color="#a33238"
                  size="large"
                  class="custom-text-color-button"
                  @click="toggleViewCar(selectedCarId, customerInfo.id)"
                  >預約賞車
                </el-button>
                <el-dialog
                  v-model="dialogVisible"
                  title=""
                  width="500"
                  class="form-wrapper"
                >
                  <ViewCar
                    :carId="selectedCarId"
                    :customerId="customerInfo.id"
                    @hide-view-car="hideViewCar"
                  />
                </el-dialog>
              </div>
              <div class="mt-auto p-2">
                <el-button
                  color="#a33238"
                  size="large"
                  class="custom-text-color-button"
                  @click="ChangePage(selectedCarId)"
                  >開啟比較</el-button
                >
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </div>
      <div>
        <br />
      </div>
    </div>

    <!-- ------------------------------------------預約、比較、心儀按鈕 ------------------------------------------ -->

    <!-- ------------------------------------------字---------------------------------------------------------- -->

    <SuggestTable></SuggestTable>
    <Footer></Footer>
  </section>
</template>

<script setup>
import SuggestTable from "@/components/SuggestTable.vue";
import Navigation from "@/views/Navigation.vue";
import Footer from "@/views/Footer.vue";
import axiosapi from "@/plugins/axios";
import Swal from "sweetalert2";
import { ref, computed, onMounted, watch } from "vue";
import CarColumnL from "@/components/CarColumnL.vue";
import CarColumnR from "@/components/CarColumnR.vue";
import { useRoute, useRouter } from "vue-router";
import router from "@/router/router";
// const router = useRouter();
const route = useRoute();
const carId = Number(route.query.carId); // 获取传递过来的carId参数
console.log("carId=================" + carId);
// 串接登入會員,這邊下面的import一定要加
import { useStore } from "vuex";
let customerInfo = ref({});
const store = useStore();
onMounted(() => {
  const username = localStorage.getItem("username");
  if (username) {
    store.dispatch("fetchCustomerInfo", username);
  }
});
customerInfo = computed(() => store.state.customerInfo.data || {});
// console.log('===>test Customer info:', customerInfo);

//喜歡標誌屬性
const isSpinning = ref(false);
const iconColor = ref("#a332389c");
// 喜歡標誌事件
const handleMouseOver = () => {
  isSpinning.value = true;
  iconColor.value = "#a33238";
};
const handleMouseLeave = () => {
  isSpinning.value = false;
  iconColor.value = "#a332389c";
};

const carDatas = ref([]); // 資料列表
const selectedCarId = ref(null); // 当前选择的汽车 ID
import CarImage from "@/components/CarImage.vue";

const images = ref([]); // 資料列表

//搜尋單筆car資訊
axiosapi
  .get(`/car/find/${carId}`)
  .then(function (response) {
    if (response && response.data) {
      console.log("response", response);
      carDatas.value = response.data.list;
      carDatas.value.forEach((imageId) => {});
      if (carDatas.value.length > 0) {
        selectedCarId.value = carDatas.value[0].id; // 假设你选择了第一个汽车
        console.log("Selected Car ID:", selectedCarId.value); // Debug output
      }

      // 搜索图片信息
      return axiosapi.get(`/image/isListPic/${carId}`); //給car的id
    } else {
      console.error("Invalid response data structure:", response);
      throw new Error("Invalid car data response");
    }
  })
  .then(function (response) {
    if (response && response.data) {
      console.log("response", response);
      images.value = response.data.isListPic;
    } else {
      console.error("Invalid response data structure:", response);
    }
  })
  .catch(function (error) {
    console.error("Error fetching data:", error);
    Swal.fire({
      text: "查詢失敗：" + error.message,
      icon: "error",
    });
  });

//==========Like=============
function callLikeCreate(carId) {
  const likeData = {
    carId: carId,
    customerId: customerInfo.value.id,
  };
  console.log("likeData=", likeData);
  axiosapi
    .post("/front/like/create", likeData)
    .then(function (response) {
      console.log("response=", response);
      Swal.fire({
        text: "已成功加入心儀清單！",
        icon: "success",
      });
    })
    .catch(function (error) {
      Swal.fire({
        text: "加入心儀清單失敗：" + error.message,
        icon: "error",
      });
    });
}
//==========Like=============
//=========ViewCar========
import ViewCar from "./ViewCar.vue";
const showViewCar = ref(false);
const dialogVisible = ref(false);
function toggleViewCar(carId, customerId) {
  dialogVisible.value = true;
  selectedCarId.value = carId;
  console.log(
    "Toggled Car ID:",
    selectedCarId.value,
    "Customer ID:",
    customerId
  );
}
function hideViewCar() {
  dialogVisible.value = false;
}
//=========ViewCar========

//============ChangePage==========
function ChangePage(carId) {
  router.push({ name: "car-compare", query: { carId: carId } });
}
</script>

<style scoped>
.form-wrapper {
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  width: 70%;
  padding: 6px;
  background-color: #f9f9f9;
}

.custom-title-color {
  color: #a33238;
  line-height: 40px;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 2px;
}

.custom-text-color {
  color: #a33238;
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
  padding-top: 20px;
  letter-spacing: 2px;
}

.custom-text-color-button {
  color: #ffffff;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 2px;
}

.custom-padding {
  padding-left: 150px;
}

.inline-padding {
  padding-right: 150px;
}

.big-title-color {
  color: #a33238;
  line-height: 40px;
  font-size: 50px;
  font-weight: 900;
  letter-spacing: 10px;
}

.big-custom-padding {
  padding-top: 1px;
  padding-left: 150px;
  padding-bottom: 70px;
}

.big-inline-padding {
  padding-right: 150px;
}

.big-title-color-carinfoBrand {
  color: #a33238;
  line-height: 1.1;
  font-size: 80px;
  font-weight: 900;
  letter-spacing: 10px;
}

.big-custom-padding-carinfoBrand {
  padding-right: 1px;
}

.custom-padding-ID {
  padding-top: 30px;
  padding-left: 170px;
}

.vertical-line {
  border-left: 2px solid #a33238;
  /* 线条的粗细和颜色 */
  height: 370px;
  /* 线条的高度 */
  margin: 0 1rem;
  /* 左右外边距 */
}

.vertical-line2 {
  border-left: 2px solid #a33238;
  /* 线条的粗细和颜色 */
  height: 220px;
  /* 线条的高度 */
  margin: 0 1rem;
  /* 左右外边距 */
}

.vertical-line3 {
  border-left: 2px solid #a33238;
  /* 线条的粗细和颜色 */
  height: 380px;
  /* 线条的高度 */
  margin: 0 1rem;
  /* 左右外边距 */
}
</style>
