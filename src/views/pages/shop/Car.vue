<template>
    <section>
        <!-- ------------------------------------------大圖------------------------------------------ -->
        <Navigation></Navigation>
        <CarImage :images="images" style="height: 30%; width: auto; overflow: hidden;"></CarImage>


        <!-- ------------------------------------------資料行 ------------------------------------------ -->
        <div class="d-flex flex-row wordBody">
            <CarColumnL v-for="carData in carDatas" :key="carData.id" :carData="carData"
                class="text-center navbarBody p-2 flex-fill"></CarColumnL>

            <!-- ------------------------------------------預約、比較、心儀按鈕 ------------------------------------------ -->
            <div class="p-2 flex-fill navbarBody">
                <div>
                    <p>3,000,000</p>
                    <p>NTD</p>
                </div>
                <div>
                    <font-awesome-icon :icon="['fas', 'star-of-life']" :spin="isSpinning" :style="{ color: iconColor }"
                        size="lg" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave" class="likeLogo"
                        @click="callLikeCreate(selectedCarId)" />
                </div>



              

                <div>
                    <el-button color="#626aef" plain @click="toggleViewCar(selectedCarId, customerInfo.id)">預約賞車
                    </el-button>
                    <el-dialog v-model="dialogVisible" title="" width="500" class="form-wrapper">
                        <ViewCar :carId="selectedCarId" :customerId="customerInfo.id" @hide-view-car="hideViewCar" />
                    </el-dialog>
                </div>




                <el-button color="#626aef" plain>開啟比較</el-button>
            </div>
            <el-button color="#626aef" plain>開啟比較</el-button>
        </div>
        <!-- ------------------------------------------字---------------------------------------------------------- -->
        <div>
            ~ {{ customerInfo.name || '用户名' }}
            ~ {{ customerInfo.id || '用户ID' }}
            ~ {{ customerInfo.account || '帳號' }}
        </div>
        <SuggestTable></SuggestTable>
        <Footer></Footer>
    </section>
</template>

<script setup>
import SuggestTable from "@/components/SuggestTable.vue";
import Navigation from '@/views/Navigation.vue';
import Footer from "@/views/Footer.vue"
import axios from 'axios';
import axiosapi from "@/plugins/axios";
import Swal from 'sweetalert2';
import { ref, computed, onMounted, watch } from 'vue';
import CarColumnL from '@/components/CarColumnL.vue';
import CarColumnR from '@/components/CarColumnR.vue';
import { useRoute, useRouter } from 'vue-router';
import router from "@/router/router";
// const router = useRouter();
const route = useRoute();
const carId = Number(route.query.carId);  // 获取传递过来的carId参数
console.log("carId=================" + carId)
// 串接登入會員,這邊下面的import一定要加
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
// console.log('===>test Customer info:', customerInfo);


//喜歡標誌屬性
const isSpinning = ref(false);
const iconColor = ref('#a332389c');
// 喜歡標誌事件
const handleMouseOver = () => {
    isSpinning.value = true;
    iconColor.value = '#a33238';
};
const handleMouseLeave = () => {
    isSpinning.value = false;
    iconColor.value = '#a332389c';
};


const carDatas = ref([]); // 資料列表
const selectedCarId = ref(null); // 当前选择的汽车 ID
import CarImage from '@/components/CarImage.vue';

const images = ref([]); // 資料列表

//搜尋單筆car資訊
axiosapi.get(`/car/find/${carId}`)
    .then(function (response) {
        if (response && response.data) {
            console.log("response", response);
            carDatas.value = response.data.list;
            carDatas.value.forEach(imageId => {
            });
            if (carDatas.value.length > 0) {
                selectedCarId.value = carDatas.value[0].id; // 假设你选择了第一个汽车
                console.log("Selected Car ID:", selectedCarId.value); // Debug output
            }

            // 搜索图片信息
            return axiosapi.get(`/image/isListPic/${carId}`);//給car的id
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
            icon: "error"
        });
    });

//==========Like=============
function callLikeCreate(carId) {
    const likeData = {
        carId: carId,
        customerId: customerInfo.value.id
    };
    console.log("likeData=", likeData);
    axios.post('http://localhost:8080/kajarta/front/like/create', likeData)
        .then(function (response) {
            console.log('response=', response);
            Swal.fire({
                text: "已成功加入心儀清單！",
                icon: "success"
            });
        })
        .catch(function (error) {
            Swal.fire({
                text: "加入心儀清單失敗：" + error.message,
                icon: "error"
            });
        });
}
//==========Like=============
//=========ViewCar========
import ViewCar from './ViewCar.vue';
const showViewCar = ref(false);
const dialogVisible = ref(false);
function toggleViewCar(carId, customerId) {
    dialogVisible.value=true;
    selectedCarId.value = carId;
    console.log("Toggled Car ID:", selectedCarId.value, "Customer ID:", customerId);
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
</style>
