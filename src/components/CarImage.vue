<template>
  <div id="carouselExampleIndicators" class="carousel slide navbarBody">
    <div class="carousel-indicators">
      <button v-for="(image, index) in images" :key="index" type="button" :data-bs-target="'#carouselExampleIndicators'"
        :data-bs-slide-to="index" :class="{ active: index === 0 }" :aria-current="index === 0 ? 'true' : 'false'"
        :aria-label="'Slide' + (index + 1)"></button>
    </div>
    <div class="carousel-inner">
      <div :class="['carousel-item', { active: index === 0 }]" v-for="(image, index) in images" :key="index">
        <img :src="`${path}${image.imageId}`" class="d-block w-100">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script setup>
const path = import.meta.env.VITE_PHOTO;
const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

</script>

<style></style>