<template>
  <div class="card" style="width: 30rem">
    <img :src="mainImageUrl" class="card-img-top" />
    <div class="card-body navbarBody">
      <el-icon :size="16" class="likeLogo" @click="handleLikeCreate">
        <Star />
      </el-icon>
      <h5 class="card-title">ID.{{ shopHomeCard.id }}</h5>
      <p class="card-text">{{ shopHomeCard.carinfoModelName }}</p>
      <div class="d-flex flex-row">
        <div class="card-text p-2 flex-grow-1">
          (里程){{ shopHomeCard.milage }}/ (年份){{
            shopHomeCard.productionYear
          }}
        </div>
        <div class="card-text p-2">{{ shopHomeCard.price }} NTD</div>
      </div>
      <el-button type="primary" @click="pushCarId"
        >我真的需要這個酷東西！！</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axiosapi from "@/plugins/axios.js";

const props = defineProps(["shopHomeCard"]);
const emits = defineEmits(["updateCarId"]);
const path = import.meta.env.VITE_PHOTO;
const mainImageUrl = ref("");

onMounted(function () {
  findMainPic(props.shopHomeCard.id);
});

function pushCarId() {
  emits("updateCarId", { carId: props.shopHomeCard.id });
  console.log("============", props.shopHomeCard.id);
}

//以carId搜主圖
function findMainPic(carId) {
  axiosapi
    .get(`/image/isMainPic/${carId}`)
    .then(function (response) {
      if (response && response.data) {
        console.log("MainPicresponse", response);
        mainImageUrl.value = path + response.data.isMainPic;
      } else {
        console.error("Invalid response data structure:", response);
        throw new Error("Invalid car data response");
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

<style></style>
