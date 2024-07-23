<template>
        <h3>Home</h3>
        <!--獲取用戶的資料-->
        ~ {{ customerInfo.name || '用户名' }}
        ~ {{ customerInfo.id || '用户ID' }}
        ~ {{ customerInfo.account || '帳號' }}
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

<style></style>