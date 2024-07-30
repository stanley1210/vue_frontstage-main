<template>
  <div class="row"  v-if="customerInfo" style="margin-top:5%;margin-bottom: 5%;  ">
    <div class="col-4" style="padding: 0;">
      <img src="/img/menber_info_img01.jpg" alt="Register" class="card-image " />
    </div>
    <div class="col-8" style="background-color: #fff5eb;padding: 0;">
    
      <div class="card-content" style="padding: 0;">
        
        <div class="card-form">
          <h1>Member Information</h1>
          <form v-if="!isEditing">
            <div class="form-item">
              <label for="name">姓名    ：</label>
              <span>{{ customerInfo.name }}</span>
            </div>
            <div class="form-item">
              <label for="idNumber">身分證號：</label>
              <span>{{ customerInfo.idNumber }}</span>
            </div>
            <div class="form-item">
              <label for="gender">性別    ：</label>
              <span>{{ customerInfo.sex }}</span>
            </div>
            <div class="form-item">
              <label for="phone">電話    ：</label>
              <span>{{ customerInfo.phone }}</span>
            </div>
            <div class="form-item">
              <label for="email">E-mail：</label>
              <span>{{ customerInfo.email }}</span>
            </div>
            <div class="form-item">
              <label for="city">縣市    ：</label>
              <span>{{ customerInfo.cityName }}</span>
            </div>
            <div class="form-item">
              <label for="address">地址    ：</label>
              <span>{{ customerInfo.address }}</span>
            </div>
            <div class="button-row1">
              <button type="button" @click="startEditing">Information Revise</button>
            </div>
          </form>

          <!-- 编辑模式表单 -->
          <form v-if="isEditing" @submit.prevent="callModify">
            <div class="form-item">
              <label for="name">姓名    ：</label>
              <input id="name" type="text" v-model="form.name" class="custom-input"  />
            </div>
            <div class="form-item">
              <label for="idNumber">身分證號：</label>
              <input
                id="idNumber"
                type="text"
                v-model="form.idNumber"
                class="custom-input"
              />
            </div>
            <div class="form-item">
              <label for="gender">性別    ：</label>
              <select id="gender" v-model="form.sex" class="custom-input">
                <option value="F">F</option>
                <option value="M">M</option>
              </select>
            </div>
            <div class="form-item">
              <label for="phone">電話    ：</label>
              <input id="phone" type="text" v-model="form.phone" class="custom-input" />
            </div>
            <div class="form-item">
              <label for="email">E-mail：</label>
              <input id="email" type="email" v-model="form.email" class="custom-input" />
            </div>
            <div class="form-item">
              <label for="city">縣市    ：</label>
              <select id="city" v-model="form.city" class="custom-input">
                <option v-for="(city, value) in cities" :key="value" :value="value">
                  {{ city }}
                </option>
              </select>
            </div>
            <div class="form-item">
              <label for="address">地址    ：</label>
              <input
                id="address"
                type="text"
                v-model="form.address"
                class="custom-input"
              />
            </div>
            <div class="button-row">
              <button type="submit" class="save-button">Save</button>
              <button type="button" @click="cancelEditing" class="cancel-button">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import axiosapi from "@/plugins/axios.js";
import Swal from "sweetalert2";

const store = useStore();
const customerInfo = computed(() => store.state.customerInfo.data || {});
const isEditing = ref(false);

const form = ref({
  name: customerInfo.value.name || "",
  idNumber: customerInfo.value.idNumber || "",
  sex: customerInfo.value.sex || "",
  phone: customerInfo.value.phone || "",
  email: customerInfo.value.email || "",
  city: customerInfo.value.city || "",
  address: customerInfo.value.address || "",
});

const cities = ref({
  1: "台北市",
  2: "新北市",
  3: "桃園市",
  4: "台中市",
  5: "台南市",
  6: "高雄市",
  7: "基隆市",
  8: "新竹市",
  9: "新竹縣",
  10: "嘉義市",
  11: "嘉義縣",
  12: "苗栗縣",
  13: "彰化縣",
  14: "南投縣",
  15: "雲林縣",
  16: "屏東縣",
  17: "宜蘭縣",
  18: "花蓮縣",
  19: "台東縣",
});

const startEditing = () => {
  isEditing.value = true;
  // 初始化表单内容
  form.value = {
    name: customerInfo.value.name || "",
    idNumber: customerInfo.value.idNumber || "",
    sex: customerInfo.value.sex || "",
    phone: customerInfo.value.phone || "",
    email: customerInfo.value.email || "",
    city: customerInfo.value.city || "",
    address: customerInfo.value.address || "",
  };
};

const cancelEditing = () => {
  isEditing.value = false;
};

const callModify = async () => {
  const customerId = customerInfo.value.id; // 这里假设 customerInfo 中包含 id 字段
  const request = {
    accountType: customerInfo.value.accountType,
    account: customerInfo.value.account,
    password: customerInfo.value.password,
    name: form.value.name,
    idNumber: form.value.idNumber,
    sex: form.value.sex,
    phone: form.value.phone,
    email: form.value.email,
    city: form.value.city,
    address: form.value.address,
  };

  try {
    const response = await axiosapi.put(`/customer/modify/${customerId}`, request);
    if (response.data.success) {
      Swal.fire({
        icon: "success",
        title: "會員資料已更新",
        showConfirmButton: false,
        timer: 1000,
      });
      // 更新 store 中的 customerInfo
      store.dispatch("fetchCustomerInfo", localStorage.getItem("username"));
      isEditing.value = false;
    } else {
      Swal.fire({
        icon: "error",
        title: "修改失败",
        text: response.data.msg,
      });
    }
  } catch (error) {
    console.error("Error during modification:", error);
    Swal.fire({
      icon: "error",
      title: "修改失败",
      text: "请稍后再试",
    });
  }
};

onMounted(() => {
  const username = localStorage.getItem("username");
  if (username) {
    store.dispatch("fetchCustomerInfo", username);
  }
});
</script>

<style scoped>
.custom-input {
  width: 45%; /* 让输入框宽度自适应父容器 */
  padding: 8px; /* 添加内边距 */
  border: 1px solid #ccc; /* 设置边框颜色 */
  border-radius: 4px; /* 设置圆角边框 */
  font-size: 14px; /* 调整字体大小 */
  box-sizing: border-box; /* 包括内边距和边框在内的宽度 */
  height: 40px;
}

.custom-input:focus {
  border-color: #a33238; /* 设置获取焦点时的边框颜色 */
  outline: none; /* 去掉默认的焦点轮廓 */
}

.button-row1 button {
  margin-right: 10px;
  margin-left: 167px; /* 添加左侧间距 */
  padding: 7px 93px;
  background-color: #b03a48;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-right: 230px; /* 添加左边距 */
}

.save-button,
.cancel-button {
  width: 120px; /* 设置按钮的统一宽度 */
  padding: 6px 12px; /* 调整内边距以控制按钮高度 */
  background-color: #b03a48;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px; /* 调整字体大小 */
}

.cancel-button {
  background-color: #aaa; /* 设置不同的背景颜色 */
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
  width: 100%; /* 调整图片的宽度 */
  height: auto;
  object-fit: cover;
}

.card-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 0; /* 去除右边距 */
}

h1 {
  color: #a33238;
  margin: 3% 0 0 3%; /* 调整标题的左边距 */
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
