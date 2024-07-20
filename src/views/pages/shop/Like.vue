<template>
    <h3>Like Table</h3>
    <div class="row">
        <div class="col-2">
            <select v-model="sortOrder" @change="callFind(1)" class="form-select">
                <option value="asc">最後新增</option>
                <option value="desc">最近新增</option>
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
            <Paginate :first-last-button="true" first-button-text="<<" last-button-text=">>" prev-text="<" next-text=">"
                :page-count="pages" :initial-page="current" v-model="current" :click-handler="callFind">
            </Paginate>
        </div>
    </div>
    <br>

    <!--Card-->
    <div class="likecard-container">
        <LikeCard v-for="like in likes" :key="like.likeId" :like="like" @card-delete="callRemove">
        </LikeCard>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import Paginate from 'vuejs-paginate-next';
import LikeCard from '@/components/LikeCard.vue';
import LikeRows from '@/components/LikeRows.vue';

const rows = ref(4); // 每頁顯示筆數
const pageNumber = ref(1); // 目前頁碼
const sortOrder = ref('asc'); // 排序順序
const likes = ref([]); // 資料列表
const total = ref(3); // 總資料筆數
const pages = ref(1); // 總共頁數
const current = ref(1); // 目前頁碼

onMounted(function () {
    callFind();
});

function callFind(page) {
    // Swal.fire({
    //     text: "處理中.....",
    //     allowOutsideClick: false,
    //     showConfirmButton: false
    // });

    if (page) {
        current.value = page;
    }

    let request = {
        pageNumber: current.value,
        sortOrder: sortOrder.value,
        max: rows.value
    };

    axios.get('http://localhost:8080/kajarta/front/like/selectAll', { params: request })
        .then(function (response) {
            if (response && response.data) {
                likes.value = response.data.list;
                total.value = response.data.totalElements;
                pages.value = response.data.totalPages;
                console.log("response", response);
            } else {
                console.error("Invalid response data structure:", response);
            }

            // setTimeout(function () {
            //     Swal.close();
            // }, 500);
        })
        .catch(function (error) {
            console.error("Error fetching data:", error);
            Swal.fire({
                text: "查詢失敗：" + error.message,
                icon: "error"
            });
        });
}


function callRemove(id) {
    if (id) {
        axios.delete("http://localhost:8080/kajarta/front/like/delete/" + id).then(function (response) {
            console.log("response", response);
            if (response.data.success) {
                callFind(current.value);
            } else {
                Swal.fire({
                    icon: "warning",
                    text: response.data.message,
                });
            }
        })
    }
}


</script>

<style scoped>
/* 样式可根据需要自定义 */

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
}
</style>
