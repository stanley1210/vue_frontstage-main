<template>
        <!-- ------------------------------------------大圖------------------------------------------ -->
    <div id="carouselExampleIndicators" class="carousel slide navbarBody" data-bs-ride="carousel" data-bs-interval="4000">
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
    
    <!-- ------------------------------------------資料行------------------------------------------ -->
     <div class="d-flex flex-row">
    <div class="text-center navbarBody p-2 flex-fill">
        <div class="row row-cols-2">
            <div class="col">
                <img src="../../../../public/supra2.jpeg" class="imageSize" >
                <img src="../../../../public/supra2.jpeg" class="imageSize" >
                <img src="../../../../public/supra2.jpeg" class="imageSize" >
                <img src="../../../../public/supra2.jpeg" class="imageSize" >
            </div>
            <div class="col d-flex align-items-start flex-column mb-3 wordBody">
                <p>Id</p>
                <p>車名</p>
                <p>年份</p>
                <p>公里數</p>
            </div>
            <div class="col">
                <div class="col d-flex align-items-start flex-column mb-3 wordBody">
                    <p>尺寸與重量</p>
                    <p>車型：</p>
                    <p>車門數量：</p>
                    <p>乘客數：</p>
                    <p>車身高度</p>
                    <p>車身高度</p>
                    <p>車身高度</p>
                </div>

            </div>
            <div class="col">Column</div>
            <div class="col">Column</div>
            <div class="col">Column</div>
            <div class="col">Column</div>
            <div class="col">Column</div>
        </div>
    </div>
    <div class="p-2 flex-fill">
        <p>3,000,000</p>
        <p>NTD</p>
        <el-button color="#626aef"  plain>預約賞車</el-button>
        <el-button color="#626aef"  plain>開啟比較</el-button>
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