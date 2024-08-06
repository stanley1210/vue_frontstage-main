<template>
    <div class="container-fluid navbarBody" style="padding-bottom: 1%;padding-left: 3%;padding-top: 3%;">
      <span class="navbar-text">
        <br>
      <p class="homepageSlogan" style="margin: 0;padding: 0;">Hey,{{name}}</p>
      <p class="homepageSlogan" style="margin: 0;padding: 0;">Found your dream ride yet?</p>
      </span>

      <div class="routerLinkbox">
        <div><RouterLink to="#" style="all: unset;" ><p class="routerLinkText"> - &nbsp;&nbsp;Ckeck &nbsp;the &nbsp;Sparkling &nbsp;List &nbsp;!!!</p></RouterLink> </div>
          <div><RouterLink to="#" style="all: unset;"><p class="routerLinkText"> - &nbsp;View &nbsp;the &nbsp;Preference &nbsp;List &nbsp;!!!</p></RouterLink> </div>
      </div>
    </div>
</template>
<script  setup>

import { RouterLink, useRouter } from 'vue-router';

const props = defineProps({
  name: String,
});


</script>

<style scoped>
.homepageSlogan {
        font-size: 30px;
        color: #a33238;
        font-weight: 500;
        line-height: 36px;
}

.routerLinkText{
  color: #a33238;
  flex-direction: unset;
  font-weight: 900;
  letter-spacing: 1px;
  margin:  0;
}

.routerLinkbox{
  position: absolute;
top: 18%;
right: 4%;

}
</style>