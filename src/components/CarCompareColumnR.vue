<template>
    <div class="outsideH1" ><h1>re Info.</h1></div>
    <div class="outsideP"><p>編號&emsp;&emsp;&emsp;&emsp;&emsp;ID.{{ carData.id }}</p></div>

    <div class="outsideP"><p>&nbsp;</p></div>
    <div class="outsideP"><p>牌&emsp;&emsp;&emsp;&emsp;&emsp;{{ carData.carinfoBrand }}</p></div>
    <div class="outsideP"><p>號&emsp;&emsp;&emsp;&emsp;&emsp;{{ carData.carinfoModelName }} </p></div>
    <div class="outsideP"><p>分&emsp;&emsp;&emsp;&emsp;&emsp;{{ carData.productionYear }} 年款 ({{ carData.color }})</p></div>
    <div class="outsideP"><p>價&emsp;&emsp;&emsp;&emsp;&emsp;TWD ${{ carData.price }}</p></div>
    <div class="outsideP"><p>程&emsp;&emsp;&emsp;&emsp;&emsp;{{ carData.milage }} km</p></div>

    <div class="outsideP"><p>&nbsp;</p></div>
    <div class="outsideP"><p>&emsp;&emsp;&emsp;&emsp;{{ carData.carinfoDoor }} - {{ carData.carinfoPassenger }} - {{ carData.carinfoSuspension }}</p></div>
    <div class="outsideP"><p>&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;{{ carData.carinfoRearWheel }} - {{ carData.carinfoTransmission }} - {{ carData.carinfoGasoline }}</p></div>

    <div class="outsideP"><p>&nbsp;</p></div>
    <div class="outsideP"><p>總量&emsp;&emsp;&emsp;&emsp;{{ carData.carinfoCc }}</p></div>
    <div class="outsideP"><p>力&emsp;&emsp;&emsp;&emsp;&emsp;{{ carData.carinfoHp }}</p></div>
    <div class="outsideP"><p>力&emsp;&emsp;&emsp;&emsp;&emsp;{{ carData.carinfoTorque }}</p></div>

    <div class="outsideP"><p>&nbsp;</p></div>
    <div class="outsideP"><p>評分&emsp;&emsp;&emsp;&emsp;{{ carData.conditionScore }}</p></div>
    <div class="outsideP"><p>改裝&emsp;&emsp;&emsp;&emsp;{{ carData.remark }}</p></div>
    <div class="outsideP"><p>日期&emsp;&emsp;&emsp;&emsp;{{ carData.launchDate }}</p></div>
    <div class="outsideP" style="border-bottom: unset;"><p>分店&emsp;&emsp;&emsp;&emsp;{{ carData.branch }}</p></div>

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

const props = defineProps(["carData"]);
const emit = defineEmits([]);

</script>

<style scoped>
p {
    
    font-weight: 900;
    margin-bottom: 3px;
    font-size: 14px;
}

.outsideP{
    /* color: #a33238; */
    display: flex;
    justify-content: flex-start;
    border-bottom: #a3323821 0.5px solid;
    padding-top: 5px;
    height: 33px;
    /* background-color: #fff5eb; */
}

.outsideH1{
    display: flex;
    justify-content: flex-start;
    padding-bottom:4px;
    padding-top:4px;
    /* background-color: #fff5eb; */
}

h1 {
    /* color: #a33238; */
    font-weight: 900;
    text-decoration: underline #a33238 3px;
}


</style>