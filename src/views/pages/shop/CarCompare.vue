<template>
  <section class="container-fluid" style="padding: 0; overflow: hidden">
    <Navigation></Navigation>
    <div style="margin-top: 3%">
      <!-- ------------------------------------------大圖------------------------------------------ -->
      <div class="row cmp" style="padding: 0">
        <div class="col-4" style="padding: 0; overflow-x: hidden">
          <!-- <CarImage style="height:100%; width: auto;"  :images="images"></CarImage> -->
          <!-- <img src="" class="cmpImg"> -->
          <div class="" v-if="!CarNewId">
            <div class="d-flex justify-content-center">
              <el-popover placement="bottom" :width="1000" trigger="click">
                <template #reference>
                  <el-icon
                    style="padding-top: 20%; cursor: pointer"
                    size="300px"
                    ><CirclePlus class="cmpImg"
                  /></el-icon>
                </template>
                <div style="margin-left: 50px; margin-right: 50px">
                  <div class="row">
                    <div class="col-1">
                      <select
                        v-model="sortOrder"
                        @change="callFind(1)"
                        class="form-select"
                        style="display: none"
                      />
                    </div>

                    <div class="col-4">
                      <LikeRows
                        :total="total"
                        :options="[2, 3, 4, 5, 10]"
                        v-model="rows"
                        @rows-change="callFind"
                      >
                      </LikeRows>
                    </div>
                  </div>
                  <br />

                  <!--上方分頁欄-->
                  <div class="row">
                    <div class="col-8" v-show="total != 0">
                      <Paginate
                        :first-last-button="true"
                        first-button-text="<<"
                        last-button-text=">>"
                        prev-text="<"
                        next-text=">"
                        :page-count="pages"
                        :initial-page="current"
                        v-model="current"
                        :click-handler="callFind"
                      >
                      </Paginate>
                    </div>
                  </div>
                  <br />

                  <!--Card-->
                  <div
                    class="likecard-container"
                    style="
                      display: flex;
                      justify-content: center;
                      margin-bottom: 5%;
                    "
                  >
                    <ShopHomeCardCaompare
                      v-for="shopHomeCard in shopHomeCards"
                      :key="shopHomeCard.id"
                      :shopHomeCard="shopHomeCard"
                      @updateCarId="handleCarNewId"
                    >
                    </ShopHomeCardCaompare>
                  </div>
                </div>
              </el-popover>
            </div>
          </div>

          <div
            v-if="CarNewId"
            :id="carouselId"
            class="carousel slide navbarBody"
          >
            <img
              :src="`${path}${newImage}`"
              class="cmpImg"
              style="max-width: 100%; height: auto; padding-top: 30%"
            />
          </div>
        </div>

        <!-- ------------------------------------------左資料行 ------------------------------------------ -->

        <div class="col-2 CMPT" style="padding: 0">
          <div style="margin-top: 5%">
            <CarCompareColumnL
              v-for="carData in carCompareDatas"
              :key="carData.id"
              :carData="carData"
              class="text-center navbarBody p-2 flex-fill"
            ></CarCompareColumnL>
          </div>
        </div>

        <!-- ------------------------------------------右資料行 ------------------------------------------ -->
        <div class="col-2 CMPT" style="padding: 0">
          <div style="margin-top: 5%">
            <CarCompareColumnR
              v-for="carData in carDatas"
              :key="carData.id"
              :carData="carData"
              class="text-center navbarBody p-2 flex-fill"
            ></CarCompareColumnR>
          </div>
        </div>
        <div class="col-4 navbarBody" style="padding: 0; overflow: hidden">
          <!-- <CarCompareImage style="height:100%; width: auto;" :images="images"></CarCompareImage> -->
          <img
            :src="`${path}${isMainPic}`"
            class="cmpImg"
            style="max-width: 100%; height: auto; padding-top: 30%"
          />
        </div>
      </div>
    </div>

    <!-- ------------------------------------------字---------------------------------------------------------- -->
    <SuggestTable></SuggestTable>
    <Footer></Footer>
  </section>
</template>

<script setup>
import ShopHomeCardCaompare from "@/components/ShopHomeCardCaompare.vue";
import SuggestTable from "@/components/SuggestTable.vue";
import Navigation from "@/views/Navigation.vue";
import Footer from "@/views/Footer.vue";
import axiosapi from "@/plugins/axios";
import Swal from "sweetalert2";
import { ref, computed, onMounted, watch } from "vue";
import CarCompareR from "@/components/CarCompareR.vue";
import CarCompareL from "@/components/CarCompareL.vue";
import { useRoute } from "vue-router";
import CarCompareColumnL from "@/components/CarCompareColumnL .vue";
const path = import.meta.env.VITE_PHOTO;
const emits = defineEmits();
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

const carDatas = ref([]); // 資料列表
const selectedCarId = ref(null); // 当前选择的汽车 ID
import CarImage from "@/components/CarImage.vue";

const images = ref([]); // 資料列表
const isMainPic = ref(null);
//搜尋單筆car資訊=============================================================
axiosapi
  .get(`/car/find/${carId}`)
  .then(function (response) {
    if (response && response.data) {
      console.log("compareResponse", response);
      carDatas.value = response.data.list;
      if (carDatas.value.length > 0) {
        selectedCarId.value = carDatas.value[0].id; // 假设你选择了第一个汽车
        console.log("Selected Car ID:", selectedCarId.value); // Debug output
      }

      // 搜索图片信息
      return axiosapi.get(`/image/isMainPic/${carId}`);
    } else {
      console.error("Invalid response data structure:", response);
      throw new Error("Invalid car data response");
    }
  })
  .then(function (response) {
    if (response && response.data) {
      console.log("imageGGGGGGGResponse", response);
      isMainPic.value = response.data.isMainPic;
      // isListPic.value=images.value[0].id
      console.log("GGGGGGGGG=", isMainPic.value);
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

// ============圖片比較============
import CarCompareCard from "@/components/CarCompareCard.vue";
import LikeRows from "@/components/LikeRows.vue";
import Paginate from "vuejs-paginate-next";
const kajartaUrl = import.meta.env.VITE_API_URL;
const props = defineProps(["carData", "images"]);

const Datas = ref({});
const shopHomeCards = ref([]);
const rows = ref(4); // 每頁顯示筆數
const pageNumber = ref(1); // 目前頁碼
const sortOrder = ref("asc"); // 排序順序
const total = ref(3); // 總資料筆數
const pages = ref(1); // 總共頁數
const current = ref(1); // 目前頁碼
const CarNewId = ref(null);
const carCompareDatas = ref([]);
const newImages = ref([]);
const newImage = ref(null);
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
    max: rows.value,
  };

  //搜尋單筆car資訊
  axiosapi
    .get(`/car/findAll`, { params: request })
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
        icon: "error",
      });
    });
}

function handleCarNewId(payload) {
  CarNewId.value = payload.carId;
  axiosapi
    .get(`/car/find/${CarNewId.value}`)
    .then(function (response) {
      if (response && response.data) {
        console.log("response", response);
        carCompareDatas.value = response.data.list;
        // 搜索图片信息
        return axiosapi.get(`/image/isMainPic/${CarNewId.value}`);
      } else {
        console.error("Invalid response data structure:", response);
        throw new Error("Invalid car data response");
      }
    })
    .then(function (response) {
      if (response && response.data) {
        console.log("response", response);
        newImage.value = response.data.isMainPic;
        console.log("============", newImage.value);
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
}
</script>

<style scoped>
h1 {
  color: #a33238;
  font-weight: 900;
}

.cmpImg {
  width: auto;
  height: 100%;
}

.cmp {
  overflow: hidden;
  height: 80vh;
}

.CMPT {
  color: #a33238;
  background-color: #fff5eb;
}

.CMPT:hover {
  color: #fff5eb;
  background-color: #a33238;
}

.el-button + .el-button {
  margin-left: 8px;
}

.row {
  background-color: #fff5eb;
}
</style>
