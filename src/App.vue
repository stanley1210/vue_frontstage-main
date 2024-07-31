<template>

  <RouterView v-slot="{Component, route}" >

    <transition name="slide" mode="out-in">
      <component :is="Component" :key="route.fullPath" ></component>
    </transition>

  </RouterView>
 



</template>

<script setup>
import { RouterView,useRoute } from 'vue-router'
import { watch } from 'vue';

// 使用 useRoute 获取当前路由对象
const route = useRoute();

watch(
  () => route.path,
  (newPath) => {
    console.log('Route path:', newPath);
  }
);

</script>

<style lang="css">
div {
  font-family: 'Ubuntu', sans-serif;
}

.slide-enter-active,
.slide-leave-active{
  transition: opacity 1s,transform 1s;
}

.slide-enter-from,
.slide-leave-to{
  opacity: 0;
  transform: translateX(-5%);
}
</style>