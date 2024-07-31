<template>
  <Navigation></Navigation>
  <div class="card-wrapper">
    <el-card class="card">
      <template #header></template>
      <div class="card-content">
        <img src="/jeep.jpg" alt="Register" class="card-image" />
        <div class="card-form">
          <h2>Register</h2>
          <br />
          <hr />
          <h4>
            Don’t Miss the Ride Sign Up Now and<br />
            Drive Away with Deals！
          </h4>
          <br />
          <div>
            <form>
              <div class="form-item radio-group">
                <label>
                  <input type="radio" v-model="form.accountType" value="1" /> 一般會員
                </label>
                <label>
                  <input type="radio" v-model="form.accountType" value="2" /> 賣家
                </label>
              </div>
              <div class="form-item">
                <label for="account">帳號：</label>
                <input
                  id="account"
                  type="text"
                  v-model="form.account"
                  class="custom-input"
                />
              </div>
              <div class="form-item">
                <label for="password">密碼：</label>
                <input
                  id="password"
                  type="password"
                  v-model="form.password"
                  class="custom-input"
                />
              </div>
              <div class="form-item">
                <label for="name">姓名：</label>
                <input id="name" type="text" v-model="form.name" class="custom-input" />
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
                <label for="sex">性別：</label>
                <select id="sex" v-model="form.sex" class="custom-input">
                  <option value="F">F</option>
                  <option value="M">M</option>
                </select>
              </div>
              <div class="form-item">
                <label for="phone">電話：</label>
                <input id="phone" type="text" v-model="form.phone" class="custom-input" />
              </div>
              <div class="form-item">
                <label for="email">Email：</label>
                <input
                  id="email"
                  type="email"
                  v-model="form.email"
                  class="custom-input"
                />
              </div>
              <div class="form-item">
                <label for="city">縣市：</label>
                <select id="city" v-model="form.city" class="custom-input">
                  <option v-for="(city, value) in cities" :key="value" :value="value">
                    {{ city }}
                  </option>
                </select>
              </div>
              <div class="form-item">
                <label for="address">地址：</label>
                <input
                  id="address"
                  type="text"
                  v-model="form.address"
                  class="custom-input"
                />
              </div>
              <div class="form-item">
                <button type="button" @click="callCreate" class="submit-button">
                  註冊
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axiosapi from "@/plugins/axios.js";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import Navigation from "@/views/Navigation.vue";
import { useRouter } from "vue-router";
const router = useRouter();

//城市
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

const store = useStore();
const form = ref({
  accountType: "", // This should be 'accountType' to match with the radio button v-model
  account: "",
  password: "",
  name: "",
  idNumber: "",
  sex: "",
  phone: "",
  email: "",
  city: "", // 确保这里存储的是城市的编号
  address: "",
});

const callCreate = async () => {
  const customerRequest = {
    accountType: form.value.accountType,
    account: form.value.account,
    password: form.value.password,
    name: form.value.name,
    idNumber: form.value.idNumber,
    sex: form.value.sex,
    phone: form.value.phone,
    email: form.value.email,
    city: form.value.city,
    address: form.value.address,
  };

  try {
    // 第一個mssql的API請求參數
    const customerResponse = await axiosapi.post("/customer/add", customerRequest);
    console.log("Customer API Response:", customerResponse.data); 

    if (customerResponse.data.success) {
      const customerId = customerResponse.data.data.id; //假設註冊已經包含了員工的id假設註冊已經包含了員工的id

      // mango的API請求參數
      const customerRecordRequest = {
        customerId: customerId,
      };

      // 調用mango的新增API
      const customerRecordResponse = await axiosapi.post("/customerRecord", customerRecordRequest);
      console.log("CustomerRecord API Response:", customerRecordResponse.data);

      if (customerRecordResponse.data.success) {
        Swal.fire({
          icon: "success",
          title: "註冊成功",
          showConfirmButton: false,
          timer: 1000,
        }).then(async () => {
          await nextTick(); 
          router.push("/").then(() => {
            window.location.reload(); // 強制刷新頁面
          });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "CustomerRecord 註冊失敗",
          text: customerRecordResponse.data.message,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "註冊失敗",
        text: customerResponse.data.msg,
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    Swal.fire({
      icon: "error",
      title: "註冊失敗",
      text: "請稍後再試",
    });
  }
};


const customerInfo = ref({});
onMounted(() => {
  const username = localStorage.getItem("username");
  if (username) {
    store.dispatch("fetchCustomerInfo", username);
  }
});
customerInfo.value = store.state.customerInfo.data || {};
console.log("===>test Customer info:", customerInfo.value);
</script>

<style scoped>
hr {
  border: none;
  border-top: 1px solid #a33238;
  margin: 5px 5px 5px 5px;
}

.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120vh;
  background-color: #fff5eb;
}

.card {
  max-width: 1400px;
  width: 100%;
  padding: 10px;
  background-color: #fff5eb;
}

.card-content {
  display: flex;
  align-items: stretch;
  background-color: white;
  font-weight: bold;
  color: #a33238;
  width: 100%;
  font-size: 17px;
}

.card-image {
  width: 50%;
  height: 100%;
  object-fit: cover;
  margin-right: 30px;
}

.card-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-item {
  margin-right: 60px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
}

.form-item label {
  width: 25%;
  text-align: right;
  margin-right: 10px;
}

.custom-input {
  width: 120%;
  font-size: 1.1em;
  border: none;
  border-bottom: 2px solid #a33238;
  border-radius: 0;
  padding: 4px;
  margin-right: 60px;
}

.custom-input:focus,
.custom-input:hover {
  border-bottom: 2px solid #a33238;
  box-shadow: none;
}

.submit-button {
  width: 100%;
  max-width: 500px;
  max-height: 60px;
  margin-left: 45px;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background-color: #a33238;
  color: white;
  cursor: pointer;
  font-size: 1.1em;
}

.submit-button:hover {
  background-color: #66b1ff;
}
</style>
