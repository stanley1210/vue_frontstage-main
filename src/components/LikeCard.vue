<template>
  <div class="card" style="width: 26rem;">
    <font-awesome-icon :icon="['fas', 'star-of-life']" style="color: #a33238;" size="lg" class="likeLogo"
      @click="emit('cardDelete', like.likeId)" />
    <div @click="navigateToCar(like.carId)">
      <div class="card-img-top">
        <img :src="`${path}${isMainPic}`" :alt="like.modelName">
      </div>
      <div class="card-body navbarBody" style="border: unset;">
        <h5 class="card-text">ID.{{ like.likeId }}</h5>
        <p class="card-title">{{ like.brand }} - {{ like.modelName }}</p>
        <div>
          <div class="card-text" style="padding-left: 0; padding-right: 0;">
            {{ like.milage }} KM &nbsp;&nbsp;/ &nbsp;&nbsp;{{ like.productionYear }} &nbsp;&nbsp;/ &nbsp;&nbsp;{{
              like.price }} NTD
          </div>
          <div class="card-text" style="padding-left: 0; padding-right: 0;">
            車況評分-{{ like.conditionScore }}/100 &nbsp;&nbsp;/ &nbsp;&nbsp;新增時間-{{ like.createTime }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axiosapi from '@/plugins/axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // 引入 useRouter
const router = useRouter(); // 使用 useRouter
const props = defineProps({
  like: Object
});
const emit = defineEmits(["cardDelete"]);
const path = import.meta.env.VITE_PHOTO;
const isMainPic = ref('');

onMounted(() => {
  axiosapi.get(`/image/isMainPic/${props.like.carId}`)
    .then(function (response) {
      if (response && response.data) {
        // console.log("response", response);
        isMainPic.value = response.data.isMainPic;
      } else {
        console.error("Invalid response data structure:", response);
        throw new Error("Invalid car data response");
      }
    })
    .catch(function (error) {
      console.error("Error fetching car data:", error);
    });
});


function navigateToCar(carId){
  console.log('Car ID:', carId);
  router.push({ name: 'pages-shop-car-link', query: { carId: carId } });
}
</script>

<style scoped>
.card {
  margin: 0;
  border: unset;
  border-radius: unset;
  margin: 0.8%;
  margin-bottom: 1%;
  background-color: #fff5eb;
  box-sizing: content-box;
  padding: 0;
}

.card:hover {
  box-shadow: 8px 8px 15px #d8d8d8;
}

.card-img-top {
  width: 26rem;
  height: 26rem;
  overflow: hidden;
}

.card-img-top img {
  height: 100%;
  width: auto;
}

.likeLogo {
  position: absolute;
  right: 6%;
  top: 76%;
}

.card-body,
.card-text,
.card-tital {
  color: #a33238;
}
</style>
