<template>
  <div class="row"  v-if="customerInfo" style="margin-top:5%;margin-bottom: 5%;  ">
    <div class="col-4" style="padding: 0;">
      <img src="/img/menber_info_img01.jpg" alt="Register" class="card-image " />
    </div>
    <div class="col-8" style="background-color: #fff5eb;padding: 0;">
      
                
         
      <div class="card-content" style="padding: 0;">
      
        <div class="card-form">
          <h1>Member Information</h1>
          <form v-if="!isEditing" style="margin-left: 5%;">
            <div class="form-item">
              <label for="name">姓名&emsp;&emsp;&emsp;：</label>
              <span class="infoText">{{ customerInfo.name }}</span>
            </div>
            <div class="form-item">
              <label for="idNumber">身分證號&emsp;：</label>
              <span class="infoText">{{ customerInfo.idNumber }}</span>
            </div>
            <div class="form-item">
              <label for="gender">性別&emsp;&emsp;&emsp;：</label>
              <span class="infoText">{{ customerInfo.sex }}</span>
            </div>
            <div class="form-item">
              <label for="phone">電話&emsp;&emsp;&emsp;：</label>
              <span class="infoText">{{ customerInfo.phone }}</span>
            </div>
            <div class="form-item">
              <label for="email">E-mail&emsp;&emsp;：</label>
              <span class="infoText">{{ customerInfo.email }}</span>
            </div>
            <div class="form-item">
              <label for="city">縣市&emsp;&emsp;&emsp;：</label>
              <span class="infoText">{{ customerInfo.cityName }}</span>
            </div>
            <div class="form-item">
              <label for="address">地址&emsp;&emsp;&emsp;：</label>
              <span class="infoText">{{ customerInfo.address }}</span>
            </div>
            
            <div >
              <div class="resetPWD">
              <font-awesome-icon icon="fa-solid fa-lock" style="color:#a33238;"/> 
<!-- 修改密碼 -->
<button type="button" class="btn btn-custom" data-bs-toggle="modal" data-bs-target="#resetPwd" @click="ss">Reset Password</button>

<!-- 彈出視窗 -->
<div class="modal fade" id="resetPwd" tabindex="-1" aria-labelledby="exampleModalLabel">
  <div class="modal-dialog modal-dialog-centered" style="max-width: 350px;"> 
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style="display: flex; justify-content: center; align-items: center; height: 100%;">
        <el-form>
          <el-form-item label="請輸入原密碼 :&nbsp;" style="color:#a33238">
            <el-input v-model="oldPassword" type="password" size="small" style="width:200px;" />
          </el-form-item>
          <el-form-item label="請輸入新密碼 :&nbsp;" style="color:#a33238">
            <el-input v-model="password" type="password" size="small" style="width:200px;" />
          </el-form-item>
        </el-form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary custom-btn-primary" @click="doModify()">Save</button>
      </div>
    </div>
  </div>
</div>

            </div>
              <button  type="button" @click="startEditing" class="save-button button-row1" style="width: 30%;position: absolute;right:5%;
">Information Revise</button>

            </div>
          </form>

          <!-- 编辑模式表单 -->
          <form v-if="isEditing" @submit.prevent="callModify" style="margin-left: 5%;">
            <div class="form-item">
              <label for="name">姓名&emsp;&emsp;&emsp;：</label>
              <input id="name" type="text" v-model="form.name" class="custom-input"  />
            </div>
            <div class="form-item">
              <label for="idNumber">身分證號&emsp;：</label>
              <input
                id="idNumber"
                type="text"
                v-model="form.idNumber"
                class="custom-input"
              />
            </div>
            <div class="form-item">
              <label for="gender">性別&emsp;&emsp;&emsp;：</label>
              <select id="gender" v-model="form.sex" class="custom-input">
                <option value="F">F</option>
                <option value="M">M</option>
              </select>
            </div>
            <div class="form-item">
              <label for="phone">電話&emsp;&emsp;&emsp;：</label>
              <input id="phone" type="text" v-model="form.phone" class="custom-input" />
            </div>
            <div class="form-item">
              <label for="email">E-mail&emsp;&emsp;：</label>
              <input id="email" type="email" v-model="form.email" class="custom-input" />
            </div>
            <div class="form-item">
              <label for="city">縣市&emsp;&emsp;&emsp;：</label>
              <select id="city" v-model="form.city" class="custom-input">
                <option v-for="(city, value) in cities" :key="value" :value="value">
                  {{ city }}
                </option>
              </select>
            </div>
            <div class="form-item">
              <label for="address">地址&emsp;&emsp;&emsp;：</label>
              <input
                id="address"
                type="text"
                v-model="form.address"
                class="custom-input"
              />
            </div>
            <button type="button" @click="cancelEditing" class="cancel-button" style="width: 20%;position: absolute;right:5%">Cancel</button>
              <button type="submit" class="save-button" style="width: 20%;position: absolute;right:26%">Save</button>
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

//修改密碼用
const oldPassword = ref('');
const password = ref('')

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

// 修改密码用
function doModify() {

if (!oldPassword.value.trim()) {
    Swal.fire({
        icon: "warning",
        text: "原密碼不可為空",
    });
    return;
}
if (!password.value.trim()) {
    Swal.fire({
        icon: "warning",
        text: "新密碼不可為空",
    });
    return;
}

Swal.fire({
    text: "執行中......",
    allowOutsideClick: false,
    showConfirmButton: false,
});

let request = {
    "password": password.value,
    accountType: customerInfo.value.accountType,
    account: customerInfo.value.account,
    name: customerInfo.value.name,
    idNumber: customerInfo.value.idNumber,
    sex: customerInfo.value.sex,
    phone: customerInfo.value.phone,
    email: customerInfo.value.email,
    city: customerInfo.value.city,
    address: customerInfo.value.address,
};

console.log("request========>" + JSON.stringify(request));

// 直接使用 employeeInfo.value.id
axiosapi.put(`/customer/modify/${customerInfo.value.id}`, request).then(function (response) {
    console.log("response", response);
    if (response.data.success) {
        Swal.fire({
            icon: "success",
            text: response.data.message,
            showConfirmButton: false,
        },700).then(() => {
            setTimeout(() => {
                window.location.reload();  // 自动刷新页面
            }, 0);
        });
    } else {
        Swal.fire({
            icon: "warning",
            text: response.data.message,
        });
    }
}).catch(function (error) {
    console.log("error", error);
    Swal.fire({
        icon: "error",
        text: "修改錯誤：" + error.message,
    });
}).finally(() => {
    setTimeout(() => {
        Swal.close();  // 关闭视窗
    }, 1000);
});
}




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
        title: "修改失敗",
        text: response.data.msg,
      });
    }
  } catch (error) {
    console.error("Error during modification:", error);
    Swal.fire({
      icon: "error",
      title: "修改失敗",
      text: "請稍後再試",
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
.custom-btn-primary {
  background-color: #a33238;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 0;
  font-size: 15px;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.btn-custom{
  color: #a33238;
  font-weight: bold;
}
.resetPWD{
  margin-left: 350px;
  margin-bottom: -36px; 
}
.btn-custom:hover {
  color: #a33238; 
}

.btn-custom:focus {
  color: #a33238 !important;  
  outline: none !important;  
  border: none !important;   
}

.btn-custom:active{
  color: #a33238 !important;  
  outline: none !important;  
  border: none !important;   
  border-bottom: #a33238 2px solid !important;   
  border-radius: 0px !important;   
}



.custom-input {
  width: 52%; /* 让输入框宽度自适应父容器 */
  padding: 8px; /* 添加内边距 */
  border: unset; /* 设置边框颜色 */
  border-radius: 4px; /* 设置圆角边框 */
  font-size: 14px; /* 调整字体大小 */
  height: 34px;
  color: #a33238;
  font-weight: 900;
  letter-spacing:1px
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
  margin: 2%; /* 去除右边距 */
}

h1 {
  color: #a33238;
  margin: 2.5% 0 2% 3%; /* 调整标题的左边距 */
  font-weight: 900;
}



.form-item {
  width: 93%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  height: 35px;
  border-bottom: #a33238 1px solid;
}

.form-item label {
  width: 10%;
  text-align: left;
  margin-right: 10px;
  font-weight: 900;
  color: #a33238;
  letter-spacing:1px
}
.infoText{
  display: inline-block;
  width: 40%; /* 或指定具体的宽度，如 200px */
  box-sizing: border-box; /* 包括边框在内的总宽度 */
  color: #a33238;
  font-weight: 900;
  letter-spacing:1px
  
}
</style>
