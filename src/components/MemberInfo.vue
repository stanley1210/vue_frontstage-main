<template>
  <div class="card-wrapper">
    <el-card class="card">
      <div class="card-content">
        <img src="/happyDriver.png" alt="Register" class="card-image" />
        <div class="card-form">
          <h2>Member Information</h2>
          <form>
            <div class="form-item">
              <label for="name">姓名：</label>
              <span>{{ customerInfo.name }}</span>
            </div>
            <div class="form-item">
              <label for="idNumber">身分證號：</label>
              <span>{{ customerInfo.idNumber }}</span>
            </div>
            <div class="form-item">
              <label for="gender">性別：</label>
              <span>{{ customerInfo.sex }}</span>
            </div>
            <div class="form-item">
              <label for="phone">電話：</label>
              <span>{{ customerInfo.phone }}</span>
            </div>
            <div class="form-item">
              <label for="email">Email：</label>
              <span>{{ customerInfo.email }}</span>
            </div>
            <div class="form-item">
              <label for="city">縣市：</label>
              <span>{{ customerInfo.cityName }}</span>
            </div>
            <div class="form-item">
              <label for="address">地址：</label>
              <span>{{ customerInfo.address }}</span>
            </div>
            <div class="button-row">
        <button>Information Revise</button>
      </div>
          </form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const customerInfo = computed(() => store.state.customerInfo.data || {});

onMounted(() => {
  const username = localStorage.getItem("username");
  if (username) {
    store.dispatch("fetchCustomerInfo", username);
  }
});
</script>

<style scoped>

.button-row button {
  margin-right: 10px;
  margin-left: 167px; /* 添加左侧间距 */
  padding: 7px 93px;
  background-color: #b03a48;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}


.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  width: 120%;
  max-width: 1300px;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto; /* 确保在父容器中水平居中 */
}

.card {
  max-width: 1450px;
  width: 100%;
  padding: 10px;
  background-color: #fff5eb;
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 10px; /* 减小图片和表单之间的间距 */
}
.card-image {
  width: 55%; /* 调整图片的宽度 */
  height: auto;
  object-fit: cover;
}

.card-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 0; /* 去除右边距 */
}

h2 {
  font-size: 28px;
  color: #a33238;
  margin: 0 0 20px 75px; /* 调整标题的左边距 */
}

form {
  width: 150%;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-item label {
  width: 20%;
  text-align: right;
  margin-right: 10px;
  font-weight: bold;
  color: #a33238;
}
span {
  display: inline-block;
  border-bottom: 2px solid #a33238;
  width: 40%; /* 或指定具体的宽度，如 200px */
  box-sizing: border-box; /* 包括边框在内的总宽度 */
}
</style>
