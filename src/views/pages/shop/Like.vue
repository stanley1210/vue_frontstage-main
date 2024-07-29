<template>
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

    <!-- 上方分頁欄 -->
    <div class="row">
        <div class="col-8" v-show="total != 0">
            <Paginate :first-last-button="true" first-button-text="<<" last-button-text=">>" prev-text="<" next-text=">"
                :page-count="pages" :initial-page="current" v-model="current" :click-handler="callFind">
            </Paginate>
        </div>
    </div>
    <br>

    <!-- Card -->
    <div class="likecard-container">
        <LikeCard v-for="like in likes" :key="like.likeId" :like="like" @card-delete="callRemove">
        </LikeCard>
        <div>
    ~ {{ customerInfo.name || "用户名" }} ~ {{ customerInfo.id || "用户ID" }} ~
    {{ customerInfo.account || "帳號" }}
  </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, watch, computed } from 'vue';
import Swal from 'sweetalert2';
import Paginate from 'vuejs-paginate-next';
import LikeCard from '@/components/LikeCard.vue';
import LikeRows from '@/components/LikeRows.vue';
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

// Compute the authentication state from Vuex store
const isAuthenticated = computed(() => store.state.isAuthenticated);

// Compute customer information from Vuex store
const customerInfo = computed(() => store.state.customerInfo.data || {});

onMounted(() => {
  const username = localStorage.getItem("username");
  if (username) {
    store.dispatch("fetchCustomerInfo", username);
  }
});



// 定义 reactive 状态
const rows = ref(4); // 每页显示的条目数
const sortOrder = ref('asc'); // 排序顺序
const likes = ref([]); // 数据列表
const total = ref(3); // 总数据笔数
const pages = ref(1); // 总页数
const current = ref(1); // 当前页码

// 在组件挂载时调用一次 callFind
onMounted(function () {
    callFind();
});

// 当 rows 改变时重置页码到 1 并调用 callFind
watch(rows, function (newValue, oldValue) {
    if (newValue !== oldValue) {
        current.value = 1;
        callFind();
    }
});

function callFind(page = 1) {
    // 在更改页码之前，将其设置为 1
    current.value = page;

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
th, td {
    border: 1px solid #ddd;
    padding: 8px;
}
th {
    background-color: #f2f2f2;
}
</style>
