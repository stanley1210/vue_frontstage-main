<template>

    <div class="card">
      <img class="card-img-top" :src="`${path}${like.id}`" :alt="like.modelName">
      <div class="card-body">
        <h5 class="card-title">{{ like.modelName }}</h5>
        <p class="card-text">
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
  const path = import.meta.env.VITE_PHOTO_API;
  </script>
  
  <style scoped>
  .card {
    margin-bottom: 1rem;
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
  