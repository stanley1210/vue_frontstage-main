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
                    <a href="#" class="btn btn-primary">我真的需要這個酷東西！！</a>
            </div>
    </div>
</template>

<script setup>
const props = defineProps(["shopHomeCard"]);
const path = import.meta.env.VITE_PHOTO;

//需要car.id customer.id
const emit = defineEmits(["likeCreate"]);

function handleLikeCreate() {
emit('likeCreate', props.shopHomeCard.id);
}
</script>

<style></style>