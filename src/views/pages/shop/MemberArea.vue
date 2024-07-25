<template>
    <Navigation></Navigation>
    <MemberAreaNav :name="customerInfo.name"></MemberAreaNav>
    <br><br>
    <ViewCarCard></ViewCarCard>
    <br> <br> <br>
  <div class="homepageSlogan">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sparkling List</div>
  <p>__________________________________________________________________________________________________________________</p>
  <br>
    <Like></Like>
    <Footer></Footer>
</template>

<script setup>
import Navigation from '@/views/Navigation.vue';
import Footer from "@/views/Footer.vue"
import Like from './Like.vue';
import ViewCarCard from '@/components/ViewCarCard.vue';
import MemberAreaNav from '@/components/MemberAreaNav.vue';
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
.homepageSlogan {
        font-size: 30px;
        color: #a33238;
        font-weight: 500;
        line-height: 6px;
}
</style>