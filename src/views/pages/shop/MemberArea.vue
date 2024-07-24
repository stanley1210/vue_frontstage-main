<template>
    <Navigation></Navigation>
    <MemberAreaNav></MemberAreaNav>
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


</script>

<style scoped>
.homepageSlogan {
        font-size: 30px;
        color: #a33238;
        font-weight: 500;
        line-height: 6px;
}
</style>