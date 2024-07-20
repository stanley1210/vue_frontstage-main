<template>

  <div class="card">
    <img class="card-img-top" :src="`${path}${like.likeId}`" :alt="like.modelName">
    <div class="card-body navbarBody">
      <h5 class="card-title">{{ like.modelName }}</h5>
      <p class="card-text">
        ID: {{ like.likeId }}
        品牌: {{ like.brand }} <br />
        價格: {{ like.price }} <br />
        車況評分:{{ like.conditionScore }} <br />
        出廠年份:{{ like.productionYear }} <br />
        里程:{{ like.milage }} <br />
        新增時間: {{ like.createTime }} <br />
        <img src="/star-icon-614x460.png" class="likeLogo" @click="emit('cardDelete', like.likeId)">
      </p>
    
    </div>
  </div>



</template>

<script setup>
defineProps({
  like: Object
});
const path = import.meta.env.VITE_PHOTO;
const emit = defineEmits(["cardDelete"]);
</script>

<style scoped>


</style>
