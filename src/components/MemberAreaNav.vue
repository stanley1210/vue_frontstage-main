<template>
    <div class="container-fluid navbarBody">
      <span class="navbar-text">
        <br>
      <p class="homepageSlogan">Hey,{{name}}</p>
      <p class="homepageSlogan">Found your dream ride yet?</p>
      </span>
      <br><br>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  name: String,
});


</script>

<style scoped>
.homepageSlogan {
        font-size: 45px;
        color: #a33238;
        font-weight: 500;
        line-height: 60px;
}
</style>