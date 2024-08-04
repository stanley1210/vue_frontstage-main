<template>
    <div class="text-center navbarBody p-2 flex-fill">
        <div class="row row-cols-2">
            <div class="col d-flex align-items-start flex-column mb-3 wordBody">
                <p>ID.{{ carData.id }}</p>
                <p>品牌：{{ carData.carinfoBrand }}</p>
                <p>車名：{{ carData.carinfoModelName }} </p>
                <p>售價：${{ carData.price }}</p>
                <p>議價空間：{{ carData.negotiable }}</p>
            </div>
            <div class="col">
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
            <div class="col">
                <h2>性能</h2>
                <p>變速系統：{{ carData.carinfoTransmission }}</p>
                <p>排氣量：{{ carData.carinfoCc }}</p>
                <p>馬力：{{ carData.carinfoHp }}</p>
                <p>扭力：{{ carData.carinfoTorque }}</p>
            </div>
            <div class="col">
                <h2>其他資訊</h2>
                <p>車況評分：{{ carData.conditionScore }}</p>
                <p>是否改裝：{{ carData.remark }}</p>
                <p>上架日期：{{ carData.launchDate }}</p>

            </div>
            <div class="col">
                <h2>訂單狀態：{{ carData.state }}</h2>
                <p>停放分店：{{ carData.branch }}</p>
                <p>管理銷售員：{{ carData.employeeId }}</p>
                <p>state狀態：{{ carData.state }}</p>

            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(["carData"]);
const emit = defineEmits([]);

</script>

<style></style>