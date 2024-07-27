<template>
  <div class="homebackground">
    <!-- <h3>Home</h3> -->
    <img
      src="/public/Kajarta_LOGO_ 1.svg"
      style="width: 4%; margin: 4% 4%; float: left"
    />
    <div class="homepagebanner">
      <img src="/public/img/homepageIMG01.jpg" style="width: 100%" />
    </div>

    <div class="homepagebuttonpart">駕 馭 未 來 ， 擁 抱 旅 程</div>

    <div class="homepageSlogan">
      Drive the Future,<br />
      Embrace the Journey
    </div>

    <div class="homepageManu">
      <div class="homepageBTMBox"><a href="" class="homepageBTM">Home</a></div>
      <div class="homepageBTMBox">
        <a href="/pages/about" class="homepageBTM">About</a>
      </div>
      <div class="homepageBTMBox">
        <a href="/pages/shop/home" class="homepageBTM">Shop</a>
      </div>
      <div class="homepageBTMBox"><a href="" class="homepageBTM">Estimate</a></div>
      <div class="homepageBTMBox"><a href="" class="homepageBTM">News</a></div>
      <!-- Only show the login button if the user is not authenticated -->
      <div class="homepageBTMBox" v-if="!isAuthenticated">
        <button
          type="button"
          class="homepageBTM btn-login"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          Log in
        </button>
      </div>
      <!-- Offcanvas -->
      <div
        class="offcanvas offcanvas-end custom-offcanvas"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
        style="width: 550px"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasScrollingLabel"></h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <Login></Login>
        </div>
      </div>
    </div>s
  </div>
  <!-- Display user information -->
  <div>
    ~ {{ customerInfo.name || "用户名" }} ~ {{ customerInfo.id || "用户ID" }} ~
    {{ customerInfo.account || "帳號" }}
  </div>
</template>

<script setup>
import Login from "@/views/pages/Login.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

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
}

.homebackground {
  height: 100vh;
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

.btn-login {
  border: none;
  background: none;
  font-size: 23px;
  font-weight: 900; /* Ensure button text is bold */
  color: #a332389c;
}

.btn-login:hover {
  color: #a33238;
}

.custom-offcanvas {
  background-color: #F2E6E6;
}
</style>
