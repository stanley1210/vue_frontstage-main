<template>
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
        <div class="navbarBody">
                <select class="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                </select>
        </div>
        
<h1>Looking for your dream ride?</h1>
</template>
    
<script setup>

</script>
    
<style>
    .imageWidth{
        width:1000px;
}
</style>