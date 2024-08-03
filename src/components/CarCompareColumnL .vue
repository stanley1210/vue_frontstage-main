<template>

    <div class="outsideH1" ><h1>Compa</h1></div>
    <div class="outsideP"><p>ID.{{ carData.id }}&emsp;&emsp;&emsp;&emsp;&emsp;車輛</p></div>

    <div class="outsideP" ><p>&nbsp;</p></div>
    <div class="outsideP"><p>{{ carData.carinfoBrand }}&emsp;&emsp;&emsp;&emsp;&emsp;品</p></div>
    <div class="outsideP"><p>{{ carData.carinfoModelName }}&emsp;&emsp;&emsp;&emsp;&emsp;型</p></div>
    <div class="outsideP"><p>{{ carData.productionYear }} 年款 ({{ carData.color }})&emsp;&emsp;&emsp;&emsp;&emsp;年</p></div>
    <div class="outsideP"><p>TWD ${{ carData.price }}&emsp;&emsp;&emsp;&emsp;&emsp;售</p></div>
    <div class="outsideP"><p>{{ carData.milage }} km&emsp;&emsp;&emsp;&emsp;&emsp;里</p></div>

    <div class="outsideP"><p>&nbsp;</p></div>
    <div class="outsideP"><p>{{ carData.carinfoDoor }} - {{ carData.carinfoPassenger }} - {{ carData.carinfoSuspension }}&emsp;&emsp;&emsp;&emsp;</p></div>
    <div class="outsideP"><p>{{ carData.carinfoRearWheel }} - {{ carData.carinfoTransmission }} - {{ carData.carinfoGasoline }}&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;</p></div>

    <div class="outsideP"><p>&nbsp;</p></div>
    <div class="outsideP"><p>{{ carData.carinfoCc }}&emsp;&emsp;&emsp;&emsp;排氣</p></div>
    <div class="outsideP"><p>{{ carData.carinfoHp }}&emsp;&emsp;&emsp;&emsp;&emsp;馬</p></div>
    <div class="outsideP"><p>{{ carData.carinfoTorque }}&emsp;&emsp;&emsp;&emsp;&emsp;扭</p></div>

    <div class="outsideP"><p>&nbsp;</p></div>
    <div class="outsideP"><p>{{ carData.conditionScore }}&emsp;&emsp;&emsp;&emsp;車況</p></div>
    <div class="outsideP"><p>{{ carData.remark }}&emsp;&emsp;&emsp;&emsp;是否</p></div>
    <div class="outsideP"><p>{{ carData.launchDate }}&emsp;&emsp;&emsp;&emsp;上架</p></div>
    <div class="outsideP" style="border-bottom: unset;"><p>{{ carData.branch }}&emsp;&emsp;&emsp;&emsp;停放</p></div>

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
    justify-content: flex-end;
    border-bottom: #a3323821 0.5px solid;
    padding-top: 5px;
    height: 33px;
    /* background-color: #fff5eb; */
}


.outsideH1{
    display: flex;
    justify-content: flex-end;
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