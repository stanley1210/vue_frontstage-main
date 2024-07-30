<template>
    <!-- ------------------------------------------大圖------------------------------------------ -->
    <Navigation></Navigation>
    <div class="d-flex flex-row wordBody">
        <div class="p-2 flex-fill navbarBody">
            <CarImage :images="images"></CarImage>
        </div>
        <div class="p-2 flex-fill navbarBody">
            <CarCompareImage :images="images"></CarCompareImage>
        </div>
    </div>
    <h2 class="navbarBody wordBody">Compare Info.</h2>
    <!-- ------------------------------------------左資料行 ------------------------------------------ -->
    <div class="d-flex flex-row wordBody">
        <CarCompareColumnL
            v-for="carData in carDatas"
            :key="carData.id"
            :carData="carData"
            class="text-center navbarBody p-2 flex-fill"
            ></CarCompareColumnL>

        <!-- ------------------------------------------右資料行 ------------------------------------------ -->
        <div class="p-2 flex-fill navbarBody">
            <CarCompareColumnR
                v-for="carData in carDatas"
                :key="carData.id"
                :carData="carData"
                class="text-center navbarBody p-2 flex-fill"
                ></CarCompareColumnR>
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
import CarCompareColumnL from '@/components/CarCompareColumnL .vue';
import CarCompareColumnR from '@/components/CarCompareColumnR.vue';
import CarCompareImage from '@/components/CarCompareImage.vue';
import { useRoute } from 'vue-router';
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


const carDatas = ref([]); // 資料列表
const selectedCarId = ref(null); // 当前选择的汽车 ID
    import CarImage from '@/components/CarImage.vue';
    
    const images = ref([]); // 資料列表

//搜尋單筆car資訊
axios.get(`http://localhost:8080/kajarta/car/find/1`)
    .then(function (response) {
        if (response && response.data) {
            console.log("response", response);
            carDatas.value = response.data.list;
            if (carDatas.value.length > 0) {
                selectedCarId.value = carDatas.value[0].id; // 假设你选择了第一个汽车
                console.log("Selected Car ID:", selectedCarId.value); // Debug output
            }
 
            // 搜索图片信息
            return axios.get('http://localhost:8080/kajarta/image/getCarIdImage/1');
        } else {
            console.error("Invalid response data structure:", response);
            throw new Error("Invalid car data response");
        }
    })
    .then(function (response) {
        if (response && response.data) {
            console.log("response", response);
            images.value = response.data.CarIdImageList;
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


</script>

<style></style>
