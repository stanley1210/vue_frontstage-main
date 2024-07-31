<template>
    <div style="margin-bottom: 5%;">
        <div class="slogan" style="color:#9a7352">
            <h1>Check these out,<br>
            You might also Find your next Favorite ride here!</h1></div>
        <div class="likecard-container" style="display: flex;justify-content: center; ">
            <ShopHomeCard v-for="shopSuggestCard in shopSuggestCards" :key="shopSuggestCard.id" :shopHomeCard="shopSuggestCard"></ShopHomeCard>
        </div>
    </div>
</template>
    
<script setup >
import {computed, onMounted,ref } from 'vue';
import axiosapi from '@/plugins/axios.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import ShopHomeCard from "@/components/ShopHomeCard.vue"

//用於重新導向 router.push
const router = useRouter()

//登錄資訊用
const store = useStore();
const isAuthenticated = computed(() => store.state.isAuthenticated);
const customerInfo = computed(() => store.state.customerInfo.data || {});
    
//顯示推薦車'S
const shopSuggestCards = ref([]);

//customerRecord資料
const customerRecord = ref([]);

//車輛查詢條件
const brandId = ref(null);//品牌
const displacementId = ref(null); //排氣CC
const doorId = ref(null);//門數
const passengerId = ref(null);//乘客數
const gasolineId = ref(null);//燃料
const rearWheelId = ref(null);//驅動
const suspensionId = ref(null);//車型
const transmissionId = ref(null);//打檔

const fetchCustomerData = async () => {
    const username = localStorage.getItem("username");
    if (username) {
        await store.dispatch("fetchCustomerInfo", username);
    }
};

onMounted(async () => {
    await fetchCustomerData();
    if (customerInfo.value.id) {
        console.log("CustomerInfo",customerInfo.value)
        if (customerInfo.value.id) {
            await callCustomerRecordInfo(customerInfo.value.id);//查詢客戶推薦紀錄
        }else{
            callSuggestCarFind(); 
        }
    }else {
    console.warn('Employee info not loaded yet');
    callSuggestCarFind(); 
    }
});

//查詢客戶紀錄
async function callCustomerRecordInfo(customerId) {
    axiosapi.get(`/customerRecord/${customerId}`).then(function (responce) {
        customerRecord.value = responce.data.data
        console.log("customerRecord",customerRecord.value);
        console.log("customerRecord.no01Care",customerRecord.value.no01Care);
        console.log("customerRecord.no02Care",customerRecord.value.no02Care);
        console.log("customerRecord.no03Care",customerRecord.value.no03Care);
        // if (customerRecord.value.no03Care!=null) {
        //     // console.log("十位數",Math.floor(customerRecord.value.no03Care/10));
        //     // console.log("個位數",customerRecord.value.no03Care % 10);
        //     switch (Math.floor(customerRecord.value.no03Care/10)) {
        //         case 0 :brandId.value=customerRecord.value.no03Care % 10; break;
        //         case 1 :displacementId.value=customerRecord.value.no03Care % 10; break;
        //         case 2 :doorId.value=customerRecord.value.no03Care % 10; break;
        //         case 3 :passengerId.value=customerRecord.value.no03Care % 10; break;
        //         case 4 :gasolineId.value=customerRecord.value.no03Care % 10; break;
        //         case 5 :rearWheelId.value=customerRecord.value.no03Care % 10; break;
        //         case 6 :suspensionId.value=customerRecord.value.no03Care % 10; break;
        //         case 7 :transmissionId.value=customerRecord.value.no03Care % 10; break;
        //         default: break;
        //     }
        // }
        // if (customerRecord.value.no02Care!=null) {
        //     // console.log("十位數",Math.floor(customerRecord.value.no02Care/10));
        //     // console.log("個位數",customerRecord.value.no02Care % 10);
        //     switch (Math.floor(customerRecord.value.no02Care/10)) {
        //         case 0 :brandId.value=customerRecord.value.no02Care % 10; break;
        //         case 1 :displacementId.value=customerRecord.value.no02Care % 10; break;
        //         case 2 :doorId.value=customerRecord.value.no02Care % 10; break;
        //         case 3 :passengerId.value=customerRecord.value.no02Care % 10; break;
        //         case 4 :gasolineId.value=customerRecord.value.no02Care % 10; break;
        //         case 5 :rearWheelId.value=customerRecord.value.no02Care % 10; break;
        //         case 6 :suspensionId.value=customerRecord.value.no02Care % 10; break;
        //         case 7 :transmissionId.value=customerRecord.value.no02Care % 10; break;
        //         default: break;
        //     }
        // }
        if (customerRecord.value.no01Care!=null) {
            // console.log("十位數",Math.floor(customerRecord.value.no01Care/10));
            // console.log("個位數",customerRecord.value.no01Care % 10);
            switch (Math.floor(customerRecord.value.no01Care/10)) {
                case 0 :brandId.value=customerRecord.value.no01Care % 10; break;
                case 1 :displacementId.value=customerRecord.value.no01Care % 10; break;
                case 2 :doorId.value=customerRecord.value.no01Care % 10; break;
                case 3 :passengerId.value=customerRecord.value.no01Care % 10; break;
                case 4 :gasolineId.value=customerRecord.value.no01Care % 10; break;
                case 5 :rearWheelId.value=customerRecord.value.no01Care % 10; break;
                case 6 :suspensionId.value=customerRecord.value.no01Care % 10; break;
                case 7 :transmissionId.value=customerRecord.value.no01Care % 10; break;
                default: break;
            }
            callSuggestCarFind();  
        }

        }).catch(function (error) {
        console.log("error",error);
        Swal.fire({
                text: "查詢錯誤"+error.message,
                icon: "error"
            });

    })  
}


function callSuggestCarFind() {
    console.log("brandId 2", brandId.value);
        console.log("displacementId 2",displacementId.value);
        console.log("doorId 2",doorId.value);
        console.log("passengerId 2",passengerId.value);
        console.log("gasolineId 2",gasolineId.value);
        console.log("rearWheelId 2",rearWheelId.value);
        console.log("suspensionId 2",suspensionId.value);
        console.log("transmissionId 2",transmissionId.value);

    axiosapi.get('/preference/searchMore', {
        params: {
            brand:  brandId.value,
            suspension:  suspensionId.value,
            door: doorId.value,
            passenger: passengerId.value,
            rearwheel: rearWheelId.value,
            gasoline: gasolineId.value,
            transmission:  transmissionId.value,
            cc:  displacementId.value
        },
    }).then(function (response) {
        let temp = []
        temp = response.data.preferenceCarList 
        if (temp!=null) {
            //只取前3項;
            for (let i = 0; i < 4 && i < temp.length; i++) {
                shopSuggestCards.value.push(response.data.preferenceCarList[i]);
            }
            console.log('shopSuggestCards 1',shopSuggestCards.value);
            console.log('shopSuggestCards length 1',shopSuggestCards.value.length);
            
            if (temp.length<3) {
                        axiosapi.get('/preference/searchMore', {
                            params: {},
                        }).then(function (response) {
                            let temp2 = []
                            temp2 = response.data.preferenceCarList
                            for (let i = 0; i < 4-temp.length; i++) {
                                shopSuggestCards.value.push(response.data.preferenceCarList[i]);
                            }
                            console.log('shopSuggestCards 2',shopSuggestCards.value);
                            console.log('shopSuggestCards length 2',shopSuggestCards.value.length);
                            
                        })
                    }
        }else{
            axiosapi.get('/preference/searchMore', {
                            params: {},
                        }).then(function (response) {
                            let temp2 = []
                            temp2 = response.data.preferenceCarList
                            for (let i = 0; i < 4; i++) {
                                shopSuggestCards.value.push(response.data.preferenceCarList[i]);
                            }
                            console.log('shopSuggestCards 3',shopSuggestCards.value);
                            console.log('shopSuggestCards length 3',shopSuggestCards.value.length);
                            
                        })
        }
        

        
    }).catch (function (error) {
        console.log('shopSuggestCards查詢失敗:', error);
    });
}

</script>
    
<style scoped>
.slogan{
    margin: 3%;
}
    
</style>