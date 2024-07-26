<template>
  <el-icon :size="20" @click="visible = true" class="noticeButton">
    <Bell />
  </el-icon>
  <el-drawer v-model="visible" :show-close="false"> <!-- 修改处：添加 class -->
    <template #header="{ close, titleId, titleClass }">
      <div>
        <h3 class="custom-title-color" :id="titleId">Hello，{{ customerInfo.name }}!</h3>
      </div>
      <el-button type="danger" @click="close">
        <el-icon class="el-icon--left">
          <CircleCloseFilled />
        </el-icon>
        Close
      </el-button>
    </template>
    This is drawer content.
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { ElButton, ElDrawer } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import Login from "@/views/pages/Login.vue";
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

const visible = ref(false)
</script>

<style scoped>
.noticeButton {
  cursor: pointer;
}

.custom-title-color {
  color: #a33238;
  line-height: 12px;
  margin-top: 16px;
}

</style>
