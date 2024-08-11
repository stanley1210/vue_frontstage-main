<template>
  <!-- =================================資料區塊================================= -->
  <!-- <div v-if="CarNewId" class="p-2">
        <div class="text-center navbarBody d-flex flex-column" v-for="carCompareData in carCompareDatas" :key="carCompareData.id" :carCompareData="carCompareData">
          <div class="col p-2 wordBody">
            <div class="col d-flex align-items-start flex-column mb-3" >
              <p>ID.{{ carCompareData.id }}</p>
              <p>品牌：{{ carCompareData.carinfoBrand }}</p>
              <p>車名：{{ carCompareData.carinfoModelName }} </p>
              <p>售價：${{ carCompareData.price }}</p>
              <p>議價空間：{{ carCompareData.negotiable }}</p>
            </div>
          </div>
          <div class="col p-2">
            <div class="col d-flex align-items-start flex-column mb-3">
              <h2>車輛資訊</h2>
              <p>年份：{{ carCompareData.productionYear }}</p>
              <p>里程：{{ carCompareData.milage }} km</p>
              <p>車型：{{ carCompareData.carinfoSuspension }}</p>
              <p>車門數量：{{ carCompareData.carinfoDoor }}</p>
              <p>乘客數：{{ carCompareData.carinfoPassenger }}</p>
              <p>驅動方式：{{ carCompareData.carinfoRearWheel }}</p>
              <p>引擎燃料：{{ carCompareData.carinfoGasoline }}</p>
              <p>顏色：{{ carCompareData.color }}</p>
            </div>
          </div>
          <div class="col p-2">
            <div class="col d-flex align-items-start flex-column mb-3">
                <h2>性能</h2>
                <p>變速系統：{{ carCompareData.carinfoTransmission }}</p>
                <p>排氣量：{{ carCompareData.carinfoCc }}</p>
                <p>馬力：{{ carCompareData.carinfoHp }}</p>
                <p>扭力：{{ carCompareData.carinfoTorque }}</p>
              </div>
            </div>
            <div class="col p-2">
              <div class="col d-flex align-items-start flex-column mb-3">
                <h2>其他資訊</h2>
                <p>車況評分：{{ carCompareData.conditionScore }}</p>
                <p>是否改裝：{{ carCompareData.remark }}</p>
                <p>上架日期：{{ carCompareData.launchDate }}</p>
              </div>
            </div>
            <div class="col p-2">
              <div class="col d-flex align-items-start flex-column mb-3">
                <h2>訂單狀態：{{ carCompareData.state }}</h2>
                <p>停放分店：{{ carCompareData.branch }}</p>
                <p>管理銷售員：{{ carCompareData.employeeId }}</p>
                <p>state狀態：{{ carCompareData.state }}</p>
              </div>
            </div>
          </div>
</div> -->

  <div class="outsideH1"><h1>Compa</h1></div>
  <div class="outsideP">
    <p>ID.{{ carData.id }}&emsp;&emsp;&emsp;&emsp;&emsp;車輛</p>
  </div>

  <div class="outsideP"><p>&nbsp;</p></div>
  <div class="outsideP">
    <p>{{ carData.carinfoBrand }}&emsp;&emsp;&emsp;&emsp;&emsp;品</p>
  </div>
  <div class="outsideP">
    <p>{{ carData.carinfoModelName }}&emsp;&emsp;&emsp;&emsp;&emsp;型</p>
  </div>
  <div class="outsideP">
    <p>
      {{ carData.productionYear }} 年款 ({{
        carData.color
      }})&emsp;&emsp;&emsp;&emsp;&emsp;年
    </p>
  </div>
  <div class="outsideP">
    <p>TWD ${{ carData.price }}&emsp;&emsp;&emsp;&emsp;&emsp;售</p>
  </div>
  <div class="outsideP">
    <p>{{ carData.milage }} km&emsp;&emsp;&emsp;&emsp;&emsp;里</p>
  </div>

  <div class="outsideP"><p>&nbsp;</p></div>
  <div class="outsideP">
    <p>
      {{ carData.carinfoDoor }} - {{ carData.carinfoPassenger }} -
      {{ carData.carinfoSuspension }}&emsp;&emsp;&emsp;&emsp;
    </p>
  </div>
  <div class="outsideP">
    <p>
      {{ carData.carinfoRearWheel }} - {{ carData.carinfoTransmission }} -
      {{ carData.carinfoGasoline }}&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
    </p>
  </div>

  <div class="outsideP"><p>&nbsp;</p></div>
  <div class="outsideP">
    <p>{{ carData.carinfoCc }}&emsp;&emsp;&emsp;&emsp;排氣</p>
  </div>
  <div class="outsideP">
    <p>{{ carData.carinfoHp }}&emsp;&emsp;&emsp;&emsp;&emsp;馬</p>
  </div>
  <div class="outsideP">
    <p>{{ carData.carinfoTorque }}&emsp;&emsp;&emsp;&emsp;&emsp;扭</p>
  </div>

  <!-- <div class="outsideP"><p>&nbsp;</p></div> -->
  <div class="outsideP">
    <p>{{ carData.conditionScore }}&emsp;&emsp;&emsp;&emsp;車況</p>
  </div>
  <div class="outsideP">
    <p>{{ getRemarkMap(carData.remark) }}&emsp;&emsp;&emsp;&emsp;是否</p>
  </div>
  <div class="outsideP">
    <p>{{ carData.launchDate }}&emsp;&emsp;&emsp;&emsp;上架</p>
  </div>
  <div class="outsideP" style="border-bottom: unset">
    <p>{{ carData.branch }}&emsp;&emsp;&emsp;&emsp;停放</p>
  </div>
  <br />

  <div class="button-container">
    <el-button
      type="primary"
      :icon="Refresh"
      color="#a33238"
      class="custom-button"
      @click="resetCarCompare"
      >重置比較車輛</el-button
    >
    <el-button
      type="primary"
      :icon="Refresh"
      color="#a33238"
      class="custom-button"
      @click="goBack"
      >返回車輛查詢</el-button
    >
  </div>

  <!-- <p>品牌：{{ carData.carinfoBrand }}</p>-->
  <!--<p>車名：{{ carData.carinfoModelName }} </p> -->
  <!-- <p>議價空間：{{ carData.negotiable }}</p> -->
  <!-- <h2>車輛資訊</h2> -->
  <!-- <p>年份：{{ carData.productionYear }}</p> -->
  <!-- <p>車型：{{ carData.carinfoSuspension }}</p> -->
  <!-- <p>車門數量：{{ carData.carinfoDoor }}</p> -->
  <!-- <p>乘客數：{{ carData.carinfoPassenger }}</p> -->
  <!-- <p>驅動方式：{{ carData.carinfoRearWheel }}</p> -->
  <!-- <p>引擎燃料：{{ carData.carinfoGasoline }}</p> -->
  <!-- <p>顏色：{{ carData.color }}</p> -->
  <!-- <p>變速系統：{{ carData.carinfoTransmission }}</p>  -->
  <!-- <h2>性能</h2> -->
  <!-- <h2>其他資訊</h2> -->
  <!-- <h2>訂單狀態：{{ carData.state }}</h2> -->
  <!-- <p>管理銷售員：{{ carData.employeeId }}</p> -->
  <!-- <p>state狀態：{{ carData.state }}</p> -->
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["carData"]);
const remarkMap = {
  1: "有改裝",
  0: "無改裝",
};
const getRemarkMap = function (status) {
  return remarkMap[status] || "找不到";
};
// 重置比較資訊
const resetCarCompare = () => {
  //保留原本的CARID
  const carId = router.currentRoute.value.query.carId;

  document.body.classList.add("fade-out");

  // 更新 URL
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("carId", carId);
  window.history.replaceState({}, "", currentUrl);
  window.location.reload();

  //沒鳥用的刷新特效
  setTimeout(() => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("carId", carId);
    window.history.replaceState({}, "", currentUrl);
    window.location.reload();
  }, 300);
};

// 返回shophome
const goBack = () => {
  router.push({ name: "pages-shop-home-link" });
};
</script>

<style scoped>
p {
  font-weight: 900;
  margin-bottom: 3px;
  font-size: 14px;
}

.outsideP {
  /* color: #a33238; */
  display: flex;
  justify-content: flex-end;
  border-bottom: #a3323821 0.5px solid;
  padding-top: 5px;
  height: 33px;
  /* background-color: #fff5eb; */
}

.outsideH1 {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 4px;
  padding-top: 4px;
  /* background-color: #fff5eb; */
}

h1 {
  /* color: #a33238; */
  font-weight: 900;
  text-decoration: underline #a33238 3px;
}

.button-container {
  display: flex;

  margin-bottom: 50px;
}

.custom-button {
  width: 100px; /* 调整宽度 */
  height: 30px; /* 调整高度 */
  font-size: 15px; /* 调整字体大小 */
}

.fade-out {
  animation: fadeOut 0.5s forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
