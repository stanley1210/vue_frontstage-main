<template>
       <nav class="navbar navbar-expand-lg navbarBody">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img src="/Kajarta_LOGO_03.svg" class="kajartaLogo"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <div class="d-flex flex-row-reverse w-100 ">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active mb-3" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link " :to="{name:'pages-shop-car-link'}">Shop</RouterLink>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-disabled="true">Estimate</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-disabled="true">News</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-disabled="true">Login</a>
        </li>
      </ul>
    </div>
    </div>
  </div>
</nav>
</template>
    
<script setup>
    import { RouterLink } from 'vue-router';
</script>
    
<style>

</style>