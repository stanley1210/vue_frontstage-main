<template>
       <nav class="navbar navbar-expand-lg navbarBody">
  <div class="container-fluid">
    <RouterLink class="navbar-brand nav-link active" :to="{name:'home'}"><img src="/Kajarta_LOGO_03.svg" class="kajartaLogo"></RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
      <ul class="navbar-nav col-6">
        <li class="nav-item col">
          <RouterLink class="nav-link active" :to="{name:'home'}">Home</RouterLink>
        </li>
        <li class="nav-item col">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item col">
          <RouterLink class="nav-link " :to="{name:'pages-shop-car-link'}">Shop</RouterLink>
        </li>
        <li class="nav-item col">
          <a class="nav-link" aria-disabled="true">Estimate</a>
        </li>
        <li class="nav-item col">
          <a class="nav-link" aria-disabled="true">News</a>
        </li>
        <li class="nav-item col">
          <a class="nav-link" aria-disabled="true">Login</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
    
<script setup>
    import { RouterLink } from 'vue-router';
</script>
    
<style>

</style>