<template>
        <!-- ------------------------------------------大圖------------------------------------------ -->
    <CarImage :images="images"></CarImage>
    <!-- ------------------------------------------資料行 ------------------------------------------ -->
    <div class="d-flex flex-row wordBody">
        <CarColumnL  v-for="carData in carDatas" :key="carData.id" :carData="carData" class="text-center navbarBody p-2 flex-fill" ></CarColumnL>
       
    <!-- ------------------------------------------預約、比較、心儀按鈕 ------------------------------------------ -->
        <CarColumnR class="p-2 flex-fill navbarBody"></CarColumnR>

    <div class="p-2 flex-fill">


        <Like></Like>

        <p>3,000,000</p>
        <p>NTD</p>
        <div>
        <el-button color="#626aef"  plain @click="toggleViewCar" >預約賞車</el-button>
        <ViewCar v-if="showViewCar" @hide-view-car="hideViewCar"/>
    </div>
        <el-button color="#626aef"  plain>開啟比較</el-button>
    </div>
</div>
    <!-- ------------------------------------------字---------------------------------------------------------- -->
    <div class="wordBody"style="margin: 50px;">
            <h1>Chech these out,</h1>
            <h1>You might also find your next favorite ride here!</h1>
    </div>
</template>
    
<script setup>
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import { ref } from 'vue';
    import CarColumnL from '@/components/CarColumnL.vue';
    import CarColumnR from '@/components/CarColumnR.vue';
    import CarImage from '@/components/CarImage.vue';
    
    const carDatas = ref([]); // 資料列表
    const images = ref([]); // 資料列表

    //搜尋單筆car資訊
        axios.get('http://localhost:8080/kajarta/car/find/1')
        .then(function (response) {
            if (response && response.data) {
                console.log("response", response);
                carDatas.value=response.data.list;
            } else {
                console.error("Invalid response data structure:", response);
            }

            // setTimeout(function () {
            //     Swal.close();
            // }, 500);
        })
        .catch(function (error) {
            console.error("Error fetching data:", error,response);
            Swal.fire({
                text: "查詢失敗：" + error.message,
                icon: "error"
            });
        });

        //搜尋圖片資訊
        axios.get('http://localhost:8080/kajarta/image/getCarIdImage/2')
        .then(function (response) {
            if (response && response.data) {
                console.log("response", response);
                images.value=response.data.CarIdImageList;
            } else {
                console.error("Invalid response data structure:", response);
            }

            // setTimeout(function () {
            //     Swal.close();
            // }, 500);
        })
        .catch(function (error) {
            console.error("Error fetching data:", error,response);
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
function toggleViewCar() {
  showViewCar.value = !showViewCar.value; // 切换 ViewCar 组件的显示状态
}
function hideViewCar() {
  showViewCar.value = false;
}
//=========ViewCar========

</script>
        
<style>
        
</style>