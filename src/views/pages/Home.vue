<template>
  <section>
    <div class="homebackground">
      <!-- <h3>Home</h3> -->
      <img src="/public/Kajarta_LOGO_ 1.svg" style="width: 4%; margin: 4% 4%; float: left" />

      <div class="homepagebanner">
        <!-- 跑馬燈 -->
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <!-- 跑馬燈下方按鈕 -->
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <!-- 跑馬燈圖示 -->
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="4000">
            <img src="/public/img/homepageIMG01.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item" data-bs-interval="4000">
            <img src="/public/img/homepageIMG03.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item" data-bs-interval="000">
            <img src="/public/img/homepageIMG02.jpg" class="d-block w-100" alt="...">
          </div>
        </div>
      </div>
        <!-- <img src="/public/img/homepageIMG01.jpg" style="width: 100%" /> -->
      </div>

      <div class="homepagebuttonpart">駕 馭 未 來 ， 擁 抱 旅 程</div>

      <div class="homepageSlogan">
        Drive the Future,<br />
        Embrace the Journey
      </div>

      <div class="homepageManu">
        <div class="homepageBTMBox">
          <RouterLink class="homepageBTM" :to="{ name: 'home-link' }">Home</RouterLink>
        </div>
        <div class="homepageBTMBox">
          <RouterLink class="homepageBTM" :to="{ name: 'about' }">About</RouterLink>
        </div><!--  href="/pages/about" -->
        <div class="homepageBTMBox">
          <RouterLink class="homepageBTM" :to="{ name: 'pages-shop-home-link' }">Shop</RouterLink>
        </div>
        <div class="homepageBTMBox"><a href="" class="homepageBTM">Estimate</a></div>
        <div class="homepageBTMBox"><a href="" class="homepageBTM">News</a></div>
        <!-- Only show the login button if the user is not authenticated -->
        <div class="homepageBTMBox" v-if="!isAuthenticated">
          <button type="button" class="homepageBTM btn-login" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
            Log in
          </button>
        </div>
      </div>
      <!-- Offcanvas -->
      <div class="offcanvas offcanvas-end custom-offcanvas" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
        id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel" style="width: 400px">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasScrollingLabel"></h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <Login></Login>
        </div>
      </div>
    </div>
    <!-- Display user information -->
    <!-- <div>
    ~ {{ customerInfo.name || "用户名" }} ~ {{ customerInfo.id || "用户ID" }} ~
    {{ customerInfo.account || "帳號" }}
  </div> -->
  <!-- <SuggestTable></SuggestTable> 推薦測試用-->
  <Footer></Footer>
  </section>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import Login from "@/views/pages/Login.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import Footer from "../Footer.vue"
// import SuggestTable from "@/components/SuggestTable.vue"

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
  z-index: 2;
}

.homebackground {
  height: 100vh;
  background-color: #fff5eb;
}

.homepagebanner {
  float: right;
  width: 70%;
  margin: 4% 0%;
  z-index: 1;
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

.btn-login {
  border: none;
  background: none;
  font-size: 23px;
  font-weight: 900;
  /* Ensure button text is bold */
  color: #a332389c;
}

.btn-login:hover {
  color: #a33238;
}

.custom-offcanvas {
  background-color: #5c1519;
}
</style>
