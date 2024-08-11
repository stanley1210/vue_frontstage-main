<template>
    <div class="row">
        <div class="col-2">
            <font-awesome-icon :icon="['fas', 'star-of-life']" style="color: #a33238; margin-top: 8px;" size="2xl" />
        </div>
        <div class="col-10" style="display: flex; justify-content: flex-end;">
            <h1>Sparkling List</h1>
        </div>
        <el-divider color="#a33238;"></el-divider>
    </div>

    <!-- Card -->
    <div class="likecard-container" style="display: flex; justify-content: center; margin-bottom: 1%;">
        <LikeCard v-for="like in likes" :key="like.likeId" :like="like" @cardDelete="callRemove" />
    </div>

    <div class="row">
        <div class="col-2">
            <select v-model="sortOrder" @change="callFind(1)" class="form-select">
                <option value="asc">最後新增</option>
                <option value="desc">最近新增</option>
            </select>
        </div>
        <div class="col-4">
            <LikeRows :total="total" :options="[2, 3, 4, 5, 10]" v-model="rows" @rows-change="callFind" />
        </div>
        <div class="col-6" v-show="total != 0" style="display: flex; justify-content: flex-end;">
            <Paginate :first-last-button="true" first-button-text="<<" last-button-text=">>" prev-text="<" next-text=">"
                :page-count="pages" :initial-page="current" v-model="current" :click-handler="callFind" />
        </div>
    </div>
</template>

<script setup>
import axiosapi from '@/plugins/axios';
import { ref, onMounted, watch, computed } from 'vue';
import Swal from 'sweetalert2';
import Paginate from 'vuejs-paginate-next';
import LikeCard from '@/components/LikeCard.vue';
import LikeRows from '@/components/LikeRows.vue';
import { useStore } from 'vuex';

// 获取 store 实例
const store = useStore();

// 获取 customerInfo 并定义一个 computed 属性以便在模板中使用
const customerInfo = computed(() => store.state.customerInfo.data || {});

// 定义 reactive 状态
const rows = ref(4); // 每页显示的条目数
const sortOrder = ref('desc'); // 排序顺序
const likes = ref([]); // 数据列表
const total = ref(3); // 总数据笔数
const pages = ref(1); // 总页数
const current = ref(1); // 当前页码

// 在组件挂载时调用一次 callFind
onMounted(() => {
    const username = localStorage.getItem('username');
    if (username) {
        store.dispatch('fetchCustomerInfo', username);
    }
    callFind();
});

// 当 rows 改变时重置页码到 1 并调用 callFind
watch(rows, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        console.log("========watch-rows")
        current.value = 1;
    }
});

watch(customerInfo, (newVal) => {
    if (newVal && newVal.id) {
        console.log("==========watch-customerInfo")
        callFind();
    }
});


function callFind(page = 1) {
    // 在更改页码之前，将其设置为 1
    current.value = page;

    let request = {
        pageNumber: current.value,
        sortOrder: sortOrder.value,
        max: rows.value,
        customerId: customerInfo.value.id
    };

    axiosapi.get('/front/like/findByCustomerId', { params: request })
        .then(response => {
            if (response && response.data) {
                likes.value = response.data.list;
                total.value = response.data.totalElements;
                pages.value = response.data.totalPages;
                console.log("response", response);
            } else {
                console.error("Invalid response data structure:", response);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);

        });
}

function callRemove(id) {
    if (id) {
        axiosapi.delete(`/front/like/delete/${id}`)
            .then(response => {
                console.log("response", response);
                if (response.data.success) {
                    ElMessage({
                        type: 'success',
                        message: '已移除心儀車輛'
                    });
                    callFind(current.value);
                } else {
                    Swal.fire({
                        icon: "warning",
                        text: response.data.message,
                    });
                }
            });
    }
}
</script>

<style scoped>
.row {
    margin-left: 3.2%;
    margin-right: 3.2%;
}

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

h1 {
    color: #a33238;
    font-weight: 900;
}
</style>
