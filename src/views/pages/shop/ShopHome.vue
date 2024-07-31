<template>
    <section>
        <Navigation></Navigation>
        <!-- ------------------------------------------心儀條件------------------------------------------ -->

        <div class="row align-items-start" style="background-color:#fff5eb;">
            <div class="col-4">
                <br>
                <h3 style="color: #a33238;">選擇您的理想車輛查詢</h3>
                <br>
                <Preference />
            </div>

            <div id="carouselExampleIndicators" class="carousel slide navbarBody imageWidth col-8"
                data-bs-ride="carousel" data-bs-interval="4000">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                        class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="../../../../public/supra1.png" class="d-block w-100">
                    </div>
                    <div class="carousel-item">
                        <img src="../../../../public/supra2.jpeg" class="d-block w-100">
                    </div>
                    <div class="carousel-item">
                        <img src="../../../../public/supra3.jpeg" class="d-block w-100">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>

        <!-- ------------------------------------------字---------------------------------------------------------- -->
        <div style="margin: 50px;">
            <h1 class="wordBody" style="color:#9a7352">Looking for your dream ride?</h1>
            <h1 class="wordBody" style="color:#9a7352">Luckily Your've just found it!</h1>
        </div>


        <!-- ------------------------------------------分頁卡---------------------------------------------------------- -->
        <div style="margin-left: 50px; margin-right: 50px;">
            <div class="row">
                <div class="col-1">
                    <select v-model="sortOrder" @change="callFind(1)" class="form-select">
                        <option value="asc">升序</option>
                        <option value="desc">降序</option>
                    </select>
                </div>

                <div class="col-4">
                    <LikeRows :total="total" :options="[2, 3, 4, 5, 10]" v-model="rows" @rows-change="callFind">
                    </LikeRows>
                </div>
            </div>
            <br>

            <!--上方分頁欄-->
            <div class="row">
                <div class="col-8" v-show="total != 0">
                    <Paginate :first-last-button="true" first-button-text="<<" last-button-text=">>" prev-text="<"
                        next-text=">" :page-count="pages" :initial-page="current" v-model="current"
                        :click-handler="callFind">
                    </Paginate>
                </div>
            </div>
            <br>

            <!--Card-->
            <div class="likecard-container" style="display: flex;justify-content: center;margin-bottom: 5%; ">
                <ShopHomeCard v-for="shopHomeCard in shopHomeCards" :key="shopHomeCard.id" :shopHomeCard="shopHomeCard"
                    @likeCreate="callLikeCreate"></ShopHomeCard>
            </div>
        </div>
        <Footer></Footer>
    </section>
</template>

<script setup>
import Navigation from '@/views/Navigation.vue';
import Footer from "@/views/Footer.vue"
import ShopHomeCard from "@/components/ShopHomeCard.vue"
import LikeRows from '@/components/LikeRows.vue';
import Paginate from 'vuejs-paginate-next';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref, onMounted } from 'vue';

const kajartaUrl = import.meta.env.VITE_API_URL;
const shopHomeCards = ref([]);
const rows = ref(4); // 每頁顯示筆數
const pageNumber = ref(1); // 目前頁碼
const sortOrder = ref('asc'); // 排序順序
const total = ref(3); // 總資料筆數
const pages = ref(1); // 總共頁數
const current = ref(1); // 目前頁碼

onMounted(function () {
    callFind();
});

function callFind(page) {
    if (page) {
        current.value = page;
    }


    let request = {
        pageNumber: current.value,
        sortOrder: sortOrder.value,
        max: rows.value
    };

    //搜尋所有car資訊
    axios.get(`${kajartaUrl}/car/findAll`, { params: request })
        .then(function (response) {
            if (response && response.data) {
                console.log("response", response);
                shopHomeCards.value = response.data.list;
                total.value = response.data.totalElements;
                pages.value = response.data.totalPages;
            } else {
                console.error("Invalid response data structure:", response);
            }

            // setTimeout(function () {
            //     Swal.close();
            // }, 500);
        })
        .catch(function (error) {
            console.error("Error fetching data:", error, response);
            Swal.fire({
                text: "查詢失敗：" + error.message,
                icon: "error"
            });
        });
}

import Preference from './Preference.vue'


</script>

<style>
.imageWidth {
    width: 1000px;
}

fieldset {
    width: 500px;
    margin: 15px
}

fieldset {
    width: 500px;
    margin: 15px
}
</style>