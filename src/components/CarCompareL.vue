<template>
            <div id="carouselExampleIndicators" class="carousel slide navbarBody">
        <div class="carousel-indicators">
            <button 
            v-for="(image,index) in images"
            :key="index"
            type="button" 
            :data-bs-target="'#carouselExampleIndicators'" 
            :data-bs-slide-to="index" 
            :class="{active: index === 0}"
            :aria-current="index===0 ? 'true':'false'" 
            :aria-label="'Slide'+(index+1)"></button>
        </div>
        <div class="carousel-inner" >
            <div 
            :class="['carousel-item', {active:index===0}]" 
            v-for="(image,index) in images" :key="index">
                <img :src="`${path}${image.id}`" class="d-block w-100" >
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


    <div class="text-center navbarBody d-flex flex-column">
            <div class="col p-2 wordBody">
                <div class="col d-flex align-items-start flex-column mb-3">
                <p>ID.{{ carData.id }}</p>
                <p>品牌：{{ carData.carinfoBrand }}</p>
                <p>車名：{{ carData.carinfoModelName }} </p>
                <p>售價：${{ carData.price }}</p>
                <p>議價空間：{{ carData.negotiable }}</p>
            </div>
            </div>
            <div class="col p-2">
                <div class="col d-flex align-items-start flex-column mb-3">
                    <h2>車輛資訊</h2>
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
            <div class="col p-2">
                <div class="col d-flex align-items-start flex-column mb-3">
                <h2>性能</h2>
                <p>變速系統：{{ carData.carinfoTransmission }}</p>
                <p>排氣量：{{ carData.carinfoCc }}</p>
                <p>馬力：{{ carData.carinfoHp }}</p>
                <p>扭力：{{ carData.carinfoTorque }}</p>
            </div>
            </div>
            <div class="col p-2">
                <div class="col d-flex align-items-start flex-column mb-3">
                <h2>其他資訊</h2>
                <p>車況評分：{{ carData.conditionScore }}</p>
                <p>是否改裝：{{ carData.remark }}</p>
                <p>上架日期：{{ carData.launchDate }}</p>
                </div>
            </div>
            <div class="col p-2">
                <div class="col d-flex align-items-start flex-column mb-3">
                <h2>訂單狀態：{{ carData.state }}</h2>
                <p>停放分店：{{ carData.branch }}</p>
                <p>管理銷售員：{{ carData.employeeId }}</p>
                <p>state狀態：{{ carData.state }}</p>
            </div>
            </div>
        </div>
</template>
    
<script setup>
    const path = import.meta.env.VITE_PHOTO;
    const props = defineProps(["carData","images"]);
</script>
    
<style>
    
</style>

