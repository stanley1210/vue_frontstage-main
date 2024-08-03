<template>
  <!-- =================================圖片區塊================================= -->
  <div class="d-flex flex-column mb-3">
    <div class="p-2" v-if="!CarNewId">
      <div class="d-flex justify-content-center">
        <el-popover
        placement="bottom"
        :width="1000"
        trigger="click"
        >
        <template #reference>
          <el-icon 
      style="padding-top: 20% ; cursor: pointer;"
      size="300px"
      
      ><CirclePlus /></el-icon>
    </template>
    <div style="margin-left: 50px; margin-right: 50px;">
      <div class="row">
        <div class="col-1">
          <select v-model="sortOrder" @change="callFind(1)" class="form-select">
            <option value="asc">升序</option>
            <option value="desc">降序</option>
          </select>
        </div>
        
        <div class="col-4">
          <LikeRows :total="total" :options="[2, 3, 4, 5, 10]" v-model="rows" @rows-change="callFind">
          </LikeRows>
        </div>
      </div>
      <br>
      
      <!--上方分頁欄-->
      <div class="row">
        <div class="col-8" v-show="total != 0">
          <Paginate :first-last-button="true" first-button-text="<<" last-button-text=">>" prev-text="<"
            next-text=">" :page-count="pages" :initial-page="current" v-model="current"
                    :click-handler="callFind">
                  </Paginate>
                </div>
              </div>
              <br>
              
              <!--Card-->
              <div class="likecard-container">
                <CarCompareCard v-for="shopHomeCard in shopHomeCards" :key="shopHomeCard.id" :shopHomeCard="shopHomeCard"
                 @updateCarId="handleCarNewId"></CarCompareCard>
              </div>
            </div>
          </el-popover>
        </div>
      </div>

  <div v-if="CarNewId" :id="carouselId" class="carousel slide navbarBody">
        <div class="carousel-indicators">
            <button 
            v-for="(newImage,index2) in newImages"
            :key="index2"
            type="button" 
            :data-bs-target="'#carouselExampleIndicators'" 
            :data-bs-slide-to="index2" 
            :class="{active: index2 === 0}"
            :aria-current="index2===0 ? 'true':'false'" 
            :aria-label="'Slide'+(index2+1)"></button>
        </div>
        <div class="carousel-inner" >
            <div 
            :class="['carousel-item', {active:index2===0}]" 
            v-for="(newImage,index2) in newImages" :key="index2">
                <img :src="`${path}${newImage.id}`" class="d-block w-100" >
            </div>
        </div>
        <button class="carousel-control-prev" type="button" :data-bs-target="'#'+carouselId" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>

        <button class="carousel-control-next" type="button" :data-bs-target="'#'+carouselId" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
        <!-- =================================資料區塊================================= -->
      <div v-if="CarNewId" class="p-2">
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
</div>
</div>
            
</template>
    
<script setup>
import { ref,onMounted } from 'vue';
import CarCompareCard from './CarCompareCard.vue';
import LikeRows from '@/components/LikeRows.vue';
import Paginate from 'vuejs-paginate-next';
import axios from 'axios';
import Swal from 'sweetalert2';
const kajartaUrl = import.meta.env.VITE_API_URL;
    const path = import.meta.env.VITE_PHOTO;
    const props = defineProps(["carData","images"]);

const Datas=ref({ });
const shopHomeCards = ref([]);
const rows = ref(4); // 每頁顯示筆數
const pageNumber = ref(1); // 目前頁碼
const sortOrder = ref('asc'); // 排序順序
const total = ref(3); // 總資料筆數
const pages = ref(1); // 總共頁數
const current = ref(1); // 目前頁碼
const CarNewId=ref(null);
const carCompareDatas=ref([]);
const newImages=ref([]);
const carouselId = `carousel-${Math.random().toString(36).substr(2, 9)}`;

onMounted(function () {
    callFind();
});

    function callFind(page) {
    if (page) {
        current.value = page;
    }

    let request = {
        pageNumber: current.value,
        sortOrder: sortOrder.value,
        max: rows.value
    };

    //搜尋單筆car資訊
    axios.get(`${kajartaUrl}/car/findAll`, { params: request })
        .then(function (response) {
            if (response && response.data) {
                console.log("response", response);
                shopHomeCards.value = response.data.list;
                total.value = response.data.totalElements;
                pages.value = response.data.totalPages;
            } else {
                console.error("Invalid response data structure:", response);
            }

            // setTimeout(function () {
            //     Swal.close();
            // }, 500);
        })
        .catch(function (error) {
            console.error("Error fetching data:", error, response);
            Swal.fire({
                text: "查詢失敗：" + error.message,
                icon: "error"
            });
        });
}

function handleCarNewId(payload) {
  CarNewId.value=payload.carId;
  axios.get(`http://localhost:8080/kajarta/car/find/${CarNewId.value}`)
    .then(function (response) {
        if (response && response.data) {
            console.log("response", response);
            carCompareDatas.value = response.data.list;
            // 搜索图片信息
            return axios.get('http://localhost:8080/kajarta/image/getCarIdImage/2');
        } else {
            console.error("Invalid response data structure:", response);
            throw new Error("Invalid car data response");
        }
    })
    .then(function (response) {
        if (response && response.data) {
            console.log("response", response);
            newImages.value = response.data.CarIdImageList;
        } else {
            console.error("Invalid response data structure:", response);
        }
    })
    .catch(function (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
            text: "查詢失敗：" + error.message,
            icon: "error"
        });
    });
}

</script>
    
<style>
    .el-button + .el-button {
  margin-left: 8px;
}
</style>
