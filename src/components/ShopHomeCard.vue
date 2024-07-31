<template>
    <div class="card" style="width: 26rem;">
        <font-awesome-icon 
            :icon="['fas', 'star-of-life']" 
            :spin="isSpinning" 
            :style="{ color: iconColor }" 
            size="lg"
            @mouseover="handleMouseOver" 
            @mouseleave="handleMouseLeave"  
            class="likeLogo" 
            @click="handleLikeCreate"/>

            <div @click="navigateToCar">
                <div class="card-img-top">
                    <img :src="`${path}${shopHomeCard.id}`" >
                </div>
                
                

                <div class="card-body navbarBody" style="border: unset;">
                    <h5 class="card-text">ID.{{ shopHomeCard.id }}</h5>
                    <p class="card-title" v-if="!shopHomeCard.carinfoModelName">{{ shopHomeCard.modelName }}</p>
                    <p class="card-title" v-if="shopHomeCard.carinfoModelName">{{ shopHomeCard.carinfoModelName }}</p>
                    <div class="d-flex flex-row" >
                        <div class="card-text " style="padding-left: 0;padding-right: 0;">{{ shopHomeCard.milage }} KM &nbsp;&nbsp;/ &nbsp;&nbsp;{{ shopHomeCard.productionYear }}</div>
                        <div class="card-text" style="padding-left: 0;padding-right: 0;position: absolute;right:5%;">{{ shopHomeCard.price }} NTD</div>
                    </div>
                    <!-- <el-button type="primary" @click="navigateToCar">我真的需要這個酷東西！！</el-button> -->
                </div>
                
            </div>
        </div>
    </template>
    
    <script setup>
    import { computed, onMounted,ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import axiosapi from '@/plugins/axios.js';
    import Swal from 'sweetalert2';
    import { Star } from '@element-plus/icons-vue';
    import { useStore } from "vuex";
    
    const props = defineProps({
        shopHomeCard: Object
    });
    const path = import.meta.env.VITE_PHOTO;
    const router = useRouter();
    const customerId = ref(); // 或從其他來源獲取 //enzo加入會員ID
    
    const emit = defineEmits(["likeCreate"]);

    //喜歡標誌屬性
    const isSpinning = ref(false);
    const iconColor = ref('#a332389c');

    //登錄資訊用
    const store = useStore();
    const isAuthenticated = computed(() => store.state.isAuthenticated);
    const customerInfo = computed(() => store.state.customerInfo.data || {});

    const fetchCustomerData = async () => {
    const username = localStorage.getItem("username");
        if (username) {
            await store.dispatch("fetchCustomerInfo", username);
        }
    };

    onMounted(async () => {
        await fetchCustomerData();
        if (customerInfo.value.id) {
        customerId.value =customerInfo.value.id  // 或從其他來源獲取 //enzo加入會員ID
        console.log("customerId",customerId.value);
    //enzo加入會員ID
        }else {
        console.warn('customer info not loaded yet');
        }
    });
    
    function handleLikeCreate() {
        if (customerId.value) {
            const likeData = {
                carId: props.shopHomeCard.id,
                customerId: customerId
            };
            axios.post('http://localhost:8080/kajarta/front/like/create', likeData)
                .then(function (response) {
                    ElMessage({
                        message: '已成功加入心儀清單！',
                        type: 'success',
                    });
                    emit('likeCreate', props.shopHomeCard.id); // 發送事件通知父組件
                })
                .catch(function (error) {
                    Swal.fire({
                        text: "加入心儀清單失敗：" + error.message,
                        icon: "error"
                    });
                });
        }else{
            //導向登錄頁面
        }
    }
    
    function navigateToCar() {
        if (customerId.value) {
            console.log(props.shopHomeCard);
            let car = props.shopHomeCard
            axiosapi.get(`/carinfo/find/${props.shopHomeCard.carinfoId}`).then(function (responce) {
                let carInfo = responce.data.list[0]
                console.log("carInfo ", carInfo);
                console.log("brandId ", carInfo.brand);
                console.log("displacementId ",carInfo.cc);
                console.log("doorId ",carInfo.door);
                console.log("passengerId ",carInfo.passenger);
                console.log("gasolineId ",carInfo.gasoline);
                console.log("rearWheelId ",carInfo.rearWheel);
                console.log("suspensionId ",carInfo.suspension);
                console.log("transmissionId ",carInfo.transmission);

                console.log("productionYear",car.productionYear);
                console.log("price",car.price);
                console.log("milage",car.milage);
                console.log("score",car.conditionScore);
                console.log("hp",carInfo.hp);
                console.log("torque",carInfo.torque);

                axiosapi.get(`/customerRecord/modify/${customerId.value}`,{
                    params: {
                        brand:  carInfo.brand,
                        cc:  carInfo.cc,
                        door: carInfo.door,
                        passenger: carInfo.passenger,
                        gasoline: carInfo.gasoline,
                        rearwheel: carInfo.rearWheel,
                        suspension:  carInfo.suspension,
                        transmission:  carInfo.transmission,

                        productionYear: car.productionYear,
                        price: car.price,
                        milage: car.milage,
                        score: car.conditionScore,
                        hp: carInfo.hp,
                        torque: carInfo.torque
                    }
                }).then(function (responce) {
                    console.log(responce.data.data);
                    if (!responce.data.data) {
                        axiosapi.post(`/customerRecord`,{"customerId": customerId.value}).then(function (responce) {
                            console.log("建立新推薦紀錄");
                        }).catch (function (error) {
                            console.log('推薦建立失敗:', error);
                        });  
                    }
                }).catch (function (error) {
                    console.log('推薦修改失敗:', error);
                });
            }).catch (function (error) {
                console.log('Carinfo查詢失敗:', error);
            });
        }
        router.push({ name: 'pages-shop-car-link', query: { carId: props.shopHomeCard.id } });
    }


    // 喜歡標誌事件
    const handleMouseOver = () => {
    isSpinning.value = true;
    iconColor.value = '#a33238';
    };

    const handleMouseLeave = () => {
    isSpinning.value = false;
    iconColor.value = '#a332389c';
    };
    </script>

<style scoped>
.card{
    border: unset;
    border-radius: unset;
    margin:0.8%;
    margin-bottom: 1%;
    background-color: #fff5eb;
    box-sizing: content-box;
}

.card:hover {
    box-shadow: 8px 8px 15px #d8d8d8;
}

.card-img-top{
    width: 26rem;
    height: 26rem;
    overflow: hidden;

}
.card-img-top img{
    height: 100%;
    width: auto;

}
.likeLogo{
    position: absolute;
    right: 6%;
    top: 76%;

}
.card-body, .card-text, .card-tital{
    color: #a33238;
}


</style>