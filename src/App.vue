<template>
    <Navigation></Navigation>
    <RouterView></RouterView>
    <Footer></Footer>
</template>
  
<script setup>
  import Navigation from './views/Navigation.vue';
  import {RouterView} from 'vue-router'
  import Footer from "@/views/Footer.vue"
</script>
  
<style>
  
</style>