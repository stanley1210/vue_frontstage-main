<template>
    <Navigation></Navigation>
    <!-- ------------------------------------------大圖------------------------------------------ -->
    <div id="carouselExampleIndicators" class="carousel slide navbarBody" data-bs-ride="carousel"
        data-bs-interval="4000">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../../../../public/supra1.png" class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="../../../../public/supra2.jpeg" class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="../../../../public/supra3.jpeg" class="d-block w-100">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>

    <!-- ------------------------------------------資料行 ------------------------------------------ -->
    <div class="d-flex flex-row wordBody">
        <CarColumnL v-for="carData in carDatas" :key="carData.id" :carData="carData"
            class="text-center navbarBody p-2 flex-fill"></CarColumnL>

        <!-- ------------------------------------------預約、比較、心儀按鈕 ------------------------------------------ -->
        <CarColumnR class="p-2 flex-fill navbarBody"></CarColumnR>
        <el-icon>
            <Star />
        </el-icon>
        <div class="p-2 flex-fill">
            <p>3,000,000</p>
            <p>NTD</p>
            <div>
                <el-button color="#626aef" plain @click="toggleViewCar(selectedCarId, customerInfo.id)">預約賞車</el-button>
                <ViewCar v-if="showViewCar" @hide-view-car="hideViewCar" :carId="selectedCarId"
                    :customerId="customerInfo.id" />
            </div>
            <el-button color="#626aef" plain>開啟比較</el-button>
        </div>
    </div>
    <!-- ------------------------------------------字---------------------------------------------------------- -->
    <div>
        ~ {{ customerInfo.name || '用户名' }}
        ~ {{ customerInfo.id || '用户ID' }}
        ~ {{ customerInfo.account || '帳號' }}
    </div>
    <Footer></Footer>
</template>

<script setup>
import Navigation from '@/views/Navigation.vue';
import Footer from "@/views/Footer.vue"
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref, computed, onMounted, watch } from 'vue';
import CarColumnL from '@/components/CarColumnL.vue';
import CarColumnR from '@/components/CarColumnR.vue';

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
console.log('===>test Customer info:', customerInfo);




const carDatas = ref([]); // 資料列表
const selectedCarId = ref(null); // 当前选择的汽车 ID

//搜尋單筆car資訊
axios.get('http://localhost:8080/kajarta/car/find/1')
    .then(function (response) {
        if (response && response.data) {
            console.log("response", response);
            carDatas.value = response.data.list;
            if (carDatas.value.length > 0) {
                selectedCarId.value = carDatas.value[0].id; // 假设你选择了第一个汽车
                console.log("Selected Car ID:", selectedCarId.value); // Debug output
            }
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

//==========Like=============
import Like from './Like.vue';
//==========Like=============
//=========ViewCar========
import ViewCar from './ViewCar.vue';
const showViewCar = ref(false);
function toggleViewCar(carId, customerId) {
    selectedCarId.value = carId;
    showViewCar.value = !showViewCar.value; // 切换 ViewCar 组件的显示状态
    console.log("Toggled Car ID:", selectedCarId.value, "Customer ID:", customerId);
}
function hideViewCar() {
    showViewCar.value = false;
}
//=========ViewCar========

</script>

<style></style>