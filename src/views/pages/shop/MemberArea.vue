<template>
        <section class="container-fluid" style="padding: 0;overflow-x: hidden;" >
                <Navigation></Navigation>
                <MemberAreaNav :name="customerInfo.name"></MemberAreaNav>
                <br><br>
                <ViewCarCard></ViewCarCard>
                <Like></Like>
                <PreferenceSearch :showNavigation="false"></PreferenceSearch>
                <MemberInfo></MemberInfo>
                <Footer></Footer>
        </section>
</template>

<script setup>
import Navigation from '@/views/Navigation.vue';
import Footer from "@/views/Footer.vue"
import Like from './Like.vue';
import ViewCarCard from '@/components/ViewCarCard.vue';
import MemberAreaNav from '@/components/MemberAreaNav.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import MemberInfo from '@/components/MemberInfo.vue';
import PreferenceSearch from './PreferenceSearch.vue';
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