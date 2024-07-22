<template>
    <Navigation></Navigation>
    <RouterView></RouterView>
    <Footer></Footer>
  <!-- <Preference></Preference> -->
 
  
 
  
</template>

<script setup>
  import Navigation from './views/Navigation.vue';
  import {RouterView} from 'vue-router'
  import Footer from "@/views/Footer.vue"
// import Preference from './views/Pages/Preference.vue';






</script>

<style></style>