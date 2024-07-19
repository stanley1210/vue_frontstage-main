<template>
        <!-- 心儀條件 -->

        <div class="row align-items-center">
                <div class="col-4">
                        <el-button>安安你好</el-button>
                </div>
        <div id="carouselExampleIndicators" class="carousel slide navbarBody imageWidth col-8" data-bs-ride="carousel" data-bs-interval="4000">
                <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img src="../../../../public/supra1.png" class="d-block w-100" >
                        </div>
                        <div class="carousel-item">
                        <img src="../../../../public/supra2.jpeg" class="d-block w-100" >
                        </div>
                        <div class="carousel-item">
                                <img src="../../../../public/supra3.jpeg" class="d-block w-100" >
                        </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                        </button>
                </div>
        </div>
        
<h1 class="wordBody">Looking for your dream ride?</h1>
<h1 class="wordBody">Luckily Your've just found it!</h1>

<div class="card" style="width: 30rem;">
  <img src="../../../../public/supra1.png" class="card-img-top">
  <div class="card-body navbarBody">
          <h5 class="card-title">ID????</h5>
    <p class="card-text">Toyota Supra</p>
    <div class="d-flex flex-row ">
        <div class="card-text p-2 flex-grow-1">(里程)13000KM / (年份)2024</div>
        <div class="card-text p-2">3,000,000 NTD</div>
</div>
<a href="#" class="btn btn-primary">我真的需要這個酷東西！！</a>
</div>
</div>
<div class="navbarBody d-flex" style="height:200px;">
        <div style="padding-top: 50px; padding-left: 50px;">
                <h1 class="wordBody">Got something on your mind?</h1>
                <h1 class="wordBody">Click here and let's chat!</h1>
        </div>
                <div style="padding-top: 130px; padding-left: 550px;">
                        <h6 class="wordBody">2024 Kajarta. All rights reserved.</h6>
        </div>
</div>
</template>
    
<script setup>

</script>
    
<style>
    .imageWidth{
        width:1000px;
}
</style>