<template>
        <div class="card" style="width: 30rem;">
            <img :src="`${path}${shopHomeCard.id}`" class="card-img-top">
            <div class="card-body navbarBody">
                <el-icon :size="16" class="likeLogo" @click="handleLikeCreate">
                    <Star />
                </el-icon>
                <h5 class="card-title">ID.{{ shopHomeCard.id }}</h5>
                <p class="card-text">{{ shopHomeCard.carinfoModelName }}</p>
                <div class="d-flex flex-row">
                    <div class="card-text p-2 flex-grow-1">(里程){{ shopHomeCard.milage }} / (年份){{ shopHomeCard.productionYear }}</div>
                    <div class="card-text p-2">{{ shopHomeCard.price }} NTD</div>
                </div>
                <el-button type="primary" @click="navigateToCar">我真的需要這個酷東西！！</el-button>
            </div>
        </div>
    </template>
    
    <script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import { Star } from '@element-plus/icons-vue';
    
    const props = defineProps({
        shopHomeCard: Object
    });
    const path = import.meta.env.VITE_PHOTO;
    const router = useRouter();
    const customerId = 1; // 或從其他來源獲取
    
    const emit = defineEmits(["likeCreate"]);
    
    function handleLikeCreate() {
        const likeData = {
            carId: props.shopHomeCard.id,
            customerId: customerId
        };
        axios.post('http://localhost:8080/kajarta/front/like/create', likeData)
            .then(function (response) {
                Swal.fire({
                    text: "已成功加入心儀清單！",
                    icon: "success"
                });
                emit('likeCreate', props.shopHomeCard.id); // 發送事件通知父組件
            })
            .catch(function (error) {
                Swal.fire({
                    text: "加入心儀清單失敗：" + error.message,
                    icon: "error"
                });
            });
    }
    
    function navigateToCar() {
        router.push({ name: 'pages-shop-car-link', query: { carId: props.shopHomeCard.id } });
    }
    </script>

<style></style>