<template>

        <div class="homebackground">
                <!-- <h3>Home</h3> -->
                <img src="/public/Kajarta_LOGO_ 1.svg" style="width: 4%;margin: 4% 4%;float: left;" />
                <div class="homepagebanner">
                        <img src="/public/img/homepageIMG01.jpg" style="width: 100%">
                </div>

                <div class="homepagebuttonpart">
                        駕 馭 未 來 ， 擁 抱 旅 程
                </div>

                <div class="homepageSlogan">
                        Drive the Future,<br>
                        Embrace the Journey
                </div>

                <div class="homepageManu">
                        <div class="homepageBTMBox"><a href="" class="homepageBTM">Home</a></div>
                        <div class="homepageBTMBox"><a href="/pages/about" class="homepageBTM">About</a></div>
                        <div class="homepageBTMBox"><a href="/pages/shop/home" class="homepageBTM">Shop</a></div>
                        <div class="homepageBTMBox"><a href="" class="homepageBTM">Estimate</a></div>
                        <div class="homepageBTMBox"><a href="" class="homepageBTM">News</a></div>
                        <div class="homepageBTMBox"><a href="/pages/login" class="homepageBTM">Log in</a></div>
                </div>
        </div>
        <!--獲取用戶的資料-->
        <div>
                ~ {{ customerInfo.name || '用户名' }}
                ~ {{ customerInfo.id || '用户ID' }}
                ~ {{ customerInfo.account || '帳號' }}
        </div>
</template>
<script setup>
// 串接登入會員,這邊下面的import一定要加
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
let customerInfo = ref({});
const store = useStore();
onMounted(() => {
        const username = localStorage.getItem('username');
        if (username) {
                store.dispatch('fetchCustomerInfo', username);
        }
});
customerInfo = computed(() => store.state.customerInfo.data || {});
console.log('===>test Customer info:', customerInfo);
</script>

<style scoped>
.homepageBTMBox:hover {
        border-bottom: #a33238 1px solid;
        margin: 8px 0;
}

.homepageBTMBox {
        margin: 8px 0;
        border-bottom: #fff5eb 1px solid;
}

.homepageBTM {
        margin: 0;
        padding: 0;
        text-decoration: none;
        color: #a332389c;
        font-size: 23px;
}

.homepageBTM:hover {
        text-decoration: none;
        color: #a33238;
        font-size: 23px;
}

.homepageManu {
        position: absolute;
        width: 26%;
        height: 27.5%;
        margin: 29.5% 4%;
        font-weight: 900;
        color: #a33238;
}

.homepageSlogan {
        position: absolute;
        width: 50%;
        height: 18%;
        margin: 15% 4%;
        font-size: 65px;
        font-weight: 900;
        color: #a33238;
        line-height: 70px;

}

.homebackground {

        height: 100vb;
        background-color: #fff5eb;
}

.homepagebanner {
        float: right;
        width: 70%;
        margin: 4% 0%;
}

.homepagebuttonpart {
        float: left;
        width: 22%;
        height: 30px;
        margin: 12% 4%;
        font-weight: 900;
        color: #a33238;
        font-size: 25px;
}
</style>