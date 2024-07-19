<template>

  <div class="card">
    <img class="card-img-top" :src="`${path}${like.likeId}`" :alt="like.modelName">
    <div class="card-body">
      <h5 class="card-title">{{ like.modelName }}</h5>
      <p class="card-text">
        ID: {{ like.likeId }}
        品牌: {{ like.brand }} <br />
        價格: {{ like.price }} <br />
        車況評分:{{ like.conditionScore }} <br />
        出廠年份:{{ like.productionYear }} <br />
        里程:{{ like.milage }} <br />
        新增時間: {{ like.createTime }} <br />
      </p>
    </div>
  </div>



</template>

<script setup>
defineProps({
  like: Object
});
const path = import.meta.env.VITE_PHOTO;
</script>

<style scoped>
.card {
  margin-right: 16px; /* 卡片之間的間距 */
  flex: 0 0 auto; /* 讓卡片不縮放 */
  width: 300px; /* 設置卡片的固定寬度 */
}

.card-body {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 1rem;
  color: #555;
}
</style>