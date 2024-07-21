<template>
        <!-- ------------------------------------------大圖------------------------------------------ -->
    <div id="carouselExampleIndicators" class="carousel slide navbarBody" data-bs-ride="carousel" data-bs-interval="4000">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../../../../public/supra1.png" class="d-block w-100" >
            </div>
            <div class="carousel-item">
                <img src="../../../../public/supra2.jpeg" class="d-block w-100" >
            </div>
            <div class="carousel-item">
                <img src="../../../../public/supra3.jpeg" class="d-block w-100" >
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    
    <!-- ------------------------------------------資料行 ------------------------------------------ -->
    <div class="d-flex flex-row wordBody">
        <div class="text-center navbarBody p-2 flex-fill">
        <div class="row row-cols-2">
            <div class="col">
                <img src="../../../../public/supra2.jpeg" class="imageSize" >
                <img src="../../../../public/supra2.jpeg" class="imageSize" >
                <img src="../../../../public/supra2.jpeg" class="imageSize" >
                <img src="../../../../public/supra2.jpeg" class="imageSize" >
            </div>
            <div class="col d-flex align-items-start flex-column mb-3 wordBody">
                <p>Id</p>
                <p>品牌 </p>
                <p>車名 </p>
                <p>售價</p>
                <p>議價空間</p>
            </div>
            <div class="col">
                <div class="col d-flex align-items-start flex-column mb-3">
                    <h2>車輛資訊</h2>
                    <p>年份</p>
                    <p>里程數</p>
                    <p>車型：</p>
                    <p>車門數量：</p>
                    <p>乘客數：</p>
                    <p>驅動方式</p>
                    <p>引擎燃料</p>
                    <p>顏色</p>
                </div>
            </div>
            <div class="col">
                <h2>性能</h2>
                <p>變速系統</p>
                <p>排氣量</p>
                <p>馬力</p>
                <p>扭力</p>
            </div>
            <div class="col">
                <h2>其他資訊</h2>
                <p>車況評分</p>
                <p>是否改裝</p>
                <p>上架日期</p>
                
            </div>
            <div class="col">
                <h2>訂單狀態</h2>
                <p>停放分店</p>
                <p>管理銷售員</p>
                <p>state狀態</p>
                
            </div>
        </div>
    </div>
    
    <!-- ------------------------------------------預約、比較、心儀按鈕 ------------------------------------------ -->
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
    
<script setup lang='ts'>
import { ref } from 'vue';
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