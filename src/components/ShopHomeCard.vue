<template>
    <div class="card" style="width: 30rem;">
            <img :src="`${path}${shopHomeCard.id}`" class="card-img-top">
            <div class="card-body navbarBody">
                    <el-icon :size="16" class="likeLogo" @click="handleLikeCreate">
                            <Star />
                    </el-icon>
                    <h5 class="card-title">ID.{{ shopHomeCard.id }}</h5>
                    <p class="card-text">{{ shopHomeCard.carinfoModelName }}</p>
                    <div class="d-flex flex-row ">
                            <div class="card-text p-2 flex-grow-1">(里程){{ shopHomeCard.milage }}/ (年份){{
                                    shopHomeCard.productionYear }}</div>
                            <div class="card-text p-2">{{ shopHomeCard.price }} NTD</div>
                    </div>
                    <el-button type="primary" @click="navigateToCarDetail">我真的需要這個酷東西！！</el-button>
            </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; // 新增导入 useRouter

const props = defineProps(["shopHomeCard"]);
const path = import.meta.env.VITE_PHOTO;
const emit = defineEmits(["likeCreate"],["findCarId"]);

const router = useRouter(); // 新增 useRouter 实例

function handleLikeCreate() {
    emit('likeCreate', props.shopHomeCard.id);
}

function navigateToCarDetail() { // 新增 navigateToCarDetail 方法
    emit('findCarId', props.shopHomeCard.id);
    router.push({ name: 'pages-shop-car-link' });
}
</script>

<style></style>