<template>
  <section>
  <!-- 註冊會員按鍵 -->
<el-button color="#a33238" @click="goToRegister" :dark="isDark" :icon="User" v-if="!isCustomerInfoComplete || !isAuthenticated">註冊會員</el-button>

<!-- 會員進階搜尋按鈕 -->
<el-button  type="primary" color="#a33238" :icon="Search" @click="handleClick" :disabled="false" >
  會員進階查詢
  </el-button>

  <!-- 會員心儀列表按鈕 -->
  <el-button  type="warning" color="#a33238" :icon="Star" :disabled="false" @click="openSavedSearches">會員喜好清單
  </el-button>

  <!-- 搜尋過紀錄 -->
  <el-drawer v-model="drawer2" :direction="direction" style="background-color:#fff5eb">
      <div v-if="savedSearches.length" >
      <div v-for="search in savedSearches" :key="search.id" :search=search class="card" style="background-color:#fff5eb">
        <p class="search-item">車輛名稱: {{ search.selectName || '未填入搜尋條件' }}</p>
        <p class="search-item">年分: {{ search.productionYear || '未填入搜尋條件' }}</p>
        <p class="search-item">價格: {{ search.price || '未填入搜尋條件' }}</p>
        <p class="search-item">里程數: {{ search.milage || '未填入搜尋條件' }}</p>
        <p class="search-item">車況評分: {{ search.score || '未填入搜尋條件' }}</p>
        <p class="search-item">馬力: {{ search.hp || '未填入搜尋條件' }}</p>
        <p class="search-item">扭力: {{ search.torque || '未填入搜尋條件' }}</p>
        <p class="search-item">車輛型號:{{search.carinfoModelName }}</p>
        <p class="search-item">品牌: {{ getBrandName(search.brand)}}</p>
        <p class="search-item">車型: {{ getSuspensionName(search.suspension) }}</p>
        <p class="search-item">車門數: {{getDoorName(search.door )}}</p>
        <p class="search-item">乘客數: {{ getPassengerName(search.passenger) }}</p>
        <p class="search-item">驅動方式: {{ getRearWheelName(search.rearWheel) }}</p>
        <p class="search-item">引擎燃料: {{ getGasolineName(search.gasoline) }}</p>
        <p class="search-item">變速系統: {{ getTransmissionName(search.transmission) }}</p>
        <p class="search-item">排氣量: {{getCcName (search.cc) }}</p> 
        <el-button type="primary" :icon="Edit" color="#a33238" @click="editSearch(search)">編輯</el-button>
      </div> 
    </div>
    <div v-else>
      <p style="color: #a33238; font-weight: bold; ">沒有儲存的搜尋條件。</p>
    </div>
  </el-drawer>

  <!-- 進階搜尋功能 -->
  <el-drawer v-model="drawer" title="進階搜尋功能" :with-header="false" style="background-color:#fff5eb"  >
    <span style="color: #a33238; font-weight: bold; font-size: 20px;">選擇你想要的車輛條件</span>
    <div class="form-container" >
      <br>
    <br>
    <div class="form-group">
      <label>車輛名稱搜尋</label>
      <input type="text" v-model="modelName" placeholder="輸入車輛名稱" :disabled="isDisabled" />
    </div>
    
    <div class="form-group">
      <label>年分</label>
      <input type="text" v-model="productionYear" placeholder="輸入年分" :disabled="isDisabled" />
    </div>

    <div class="form-group">
      <label>價格</label>
      <input type="text" v-model="price" placeholder="輸入價格" :disabled="isDisabled"  />
    </div>

    <div class="form-group">
      <label>里程數</label>
      <input type="text" v-model="milage" placeholder="輸入里程數" :disabled="isDisabled" />
    </div>

    <div class="form-group">
      <label>車況評分</label>
      <input type="text" v-model="score" placeholder="輸入車況評分" :disabled="isDisabled" />
    </div>

    <div class="form-group">
      <label>馬力</label>
      <input type="text" v-model="hp" placeholder="輸入馬力" :disabled="isDisabled" />
    </div>

    <div class="form-group">
      <label>扭力</label>
      <input type="text" v-model="torque" placeholder="輸入扭力" :disabled="isDisabled" />
    </div>

    <div class="form-group">
          <label for="carinfoId">車輛型號</label>
          <select id="carinfoId" 
            v-model="carinfoId"  
            name="carinfoId"  class="custom-select"
            required
            @change="onCarinfoChange" >
            <option value="" disabled>選擇你要的車型</option>
              <option 
                v-for="carinfoData in carinfoDatas"
                :key="carinfoData.id"
                :carinfoData="carinfoData"
                :value="`${carinfoData.id}`" 
                >{{ carinfoData.modelName }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="brand">品牌</label>
          <select id="brand" v-model="brand" class="custom-select" required :disabled="isDisabled">
            <option value="" disabled>選擇你要的品牌</option>
            <option value="1">HONDA</option>
            <option value="2">TOYOTA</option>
            <option value="3">MAZDA</option>
            <option value="4">BENZ</option>
            <option value="5">PORSCHE</option>
            <option value="6">BMW</option>
            <option value="7">VOLKSWAGEN</option>
            <option value="8">NISSAN</option>
            <option value="9">SUBARU</option>
          </select>
        </div>

        <div class="form-group">
          <label for="suspension">車型</label>
          <select id="suspension" v-model="suspension"  class="custom-select" required :disabled="isDisabled">
            <option value="" disabled>選擇你要的車型</option>
            <option value="1">轎車</option>
            <option value="2">休旅車</option>
            <option value="3">敞篷車</option>
            <option value="4">跑車</option>
            <option value="5">吉普車</option>
            <option value="6">掀背車</option>
          </select>
        </div>

        <div class="form-group">
          <label for="door">車門數</label>
          <select id="door" v-model="door"  class="custom-select" required :disabled="isDisabled">
            <option value="" disabled>選擇你要的車門數</option>
            <option value="1">二門</option>
            <option value="2">三門</option>
            <option value="3">四門</option>
            <option value="4">五門</option>
            <option value="5">六門</option>
          </select>
        </div>

        <div class="form-group">
          <label for="passenger">乘客數</label>
          <select id="passenger"  v-model="passenger"  class="custom-select" required :disabled="isDisabled">
            <option value="" disabled>選擇能容納的乘客數</option>
            <option value="1">二人座</option>
            <option value="2">四人座</option>
            <option value="3">五人座</option>
            <option value="4">七人座以上</option>
          </select>
        </div>

        <div class="form-group">
          <label for="rearwheel">驅動方式</label>
          <select id="rearwheel" v-model="rearwheel"  class="custom-select" required :disabled="isDisabled">
            <option value="" disabled>選擇你要的驅動方式</option>
            <option value="1">前驅</option>
            <option value="2">後驅</option>
            <option value="3">四驅</option>
          </select>
        </div>

        <div class="form-group">
          <label for="gasoline">引擎燃料</label>
          <select id="gasoline" v-model="gasoline"  class="custom-select" required :disabled="isDisabled">
            <option value="" disabled>選擇你要的引擎燃料</option>
            <option value="1">汽油</option>
            <option value="2">柴油</option>
            <option value="3">油電複合</option>
            <option value="4">純電</option>
          </select>
        </div>

        <div class="form-group">
          <label for="transmission">變速系統</label>
          <select id="transmission" v-model="transmission"  class="custom-select" required :disabled="isDisabled">
            <option value="" disabled>選擇你要的引擎燃料</option>
            <option value="1">自排</option>
            <option value="2">手排</option>
            <option value="3">手自排</option>
            <option value="4">自手排</option>
          </select>
        </div>

        <div class="form-group">
          <label for="cc">排氣量</label>
          <select id="cc" v-model="cc"  class="custom-select" required :disabled="isDisabled">
            <option value="" disabled>選擇你要的排氣量</option>
            <option value="1">1200cc以下</option>
            <option value="2">1201cc-1800cc</option>
            <option value="3">1801cc-2400cc</option>
            <option value="4">2401cc-3000cc</option>
            <option value="5">3001cc-4200cc</option>
            <option value="6">4201cc-5400cc</option>
            <option value="7">5401cc以上</option>
          </select>
        </div>
        <el-button type="primary"  color="#a33238" :icon="Search" @click="handleSubmit">查詢</el-button>
        <el-button type="warning" :icon="Refresh" color="#a33238" @click="resetForm">重置查詢</el-button>
        <el-button v-if="saveValidate"type="success" :icon="FolderAdd" color="#a33238" @click="saveSearchRecord">儲存查詢條件</el-button> 
       <p></p>
        <el-button v-if="updateValidate" type="primary" :icon="Edit" color="#a33238" @click="handleUpdate">修改查詢條件
        </el-button>    
      </div>
    </el-drawer>
<!-- 非會員搜尋 -->
  <div class="form-container">
    <br>
    <div class="form-group">
      <label>車輛名稱搜尋</label>
      <input type="text" v-model="modelName" placeholder="輸入車輛名稱" />
    </div>
    
    <div class="form-group">
      <label>年分</label>
      <input type="text" v-model="productionYear" placeholder="輸入年分" />
    </div>

    <div class="form-group">
      <label>價格</label>
      <input type="text" v-model="price" placeholder="輸入價格" />
    </div>

    <div class="form-group">
      <label>里程數</label>
      <input type="text" v-model="milage" placeholder="輸入里程數" />
    </div>

    <div class="form-group">
      <label>車況評分</label>
      <input type="text" v-model="score" placeholder="輸入車況評分" />
    </div>

    <div class="form-group">
      <label>馬力</label>
      <input type="text" v-model="hp" placeholder="輸入馬力" />
    </div>

    <div class="form-group">
      <label>扭力</label>
      <input type="text" v-model="torque" placeholder="輸入扭力" />
    </div>

    <el-button type="primary"  color="#a33238" :icon="Search" @click="handleSubmit">查詢</el-button>
    <el-button type="warning" :icon="Refresh" color="#a33238"  @click="resetForm">重置查詢</el-button>
  </div>
</section>
</template>
  
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { Search,Star,Edit,FolderAdd,Refresh,User} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const saveValidate=ref(false);
const updateValidate=ref(false);
const store = useStore();
// Compute the authentication state from Vuex store
const isAuthenticated = computed(() => store.state.isAuthenticated);
// Compute customer information from Vuex store
const customerInfo = computed(() => store.state.customerInfo.data || {});
const isCustomerInfoComplete = computed(() =>
  customerInfo.value.name && customerInfo.value.id && customerInfo.value.account
);

onMounted(() => {
  const username = localStorage.getItem("username");
  if (username) {
    store.dispatch("fetchCustomerInfo", username);
  }
  customerId.value=customerInfo.value.id;
  callCarinfoFind();
});

const isDisabled = ref(false);
const drawer = ref(false)
const drawer2 = ref(false)
const router = useRouter()
const brand = ref('')
const suspension = ref('')
const door = ref('')
const passenger = ref('')
const rearwheel = ref('')
const gasoline = ref('')
const transmission = ref('')
const cc = ref('')
const modelName = ref('')
const productionYear = ref('')
const price = ref('')
const milage = ref('')
const score = ref('')
const hp = ref('')
const torque = ref('')
const results = ref([])
const savedSearches = ref([])
const id =  ref('')
const customerId=ref(null)
const carinfoId=ref('')
const carinfoDatas=ref([]);
const kajartaUrl = import.meta.env.VITE_API_URL;

function callCarinfoFind() {
  //搜尋單筆carinfo資訊
  axios.get(`${kajartaUrl}/carinfo/list`)
        .then(function (response) {
            if (response && response.data) {
                console.log("response", response);
                carinfoDatas.value = response.data.list;
            } else {
                console.error("Invalid response data structure:", response);
            }
        })
        .catch(function (error) {
            console.error("Error fetching data:", error, response);
            Swal.fire({
                text: "查詢失敗：" + error.message,
                icon: "error"
            });
        });
      }


//搜尋條件頁面跳轉到結果
const handleSubmit = () => {
  router.push({
    name: 'pages-shop-PreferenceSearch-link',
    query: {
      carinfoId: carinfoId.value,
      modelName: modelName.value,
      productionYear: productionYear.value,
      price: price.value,
      milage: milage.value,
      score: score.value,
      hp: hp.value,
      torque: torque.value,
      brand: brand.value,
      suspension: suspension.value,
      door: door.value,
      passenger: passenger.value,
      rearwheel: rearwheel.value,
      gasoline: gasoline.value,
      transmission: transmission.value,
      cc: cc.value,
    },
  });
};

//打開儲存心儀條件搜尋紀錄
const editSearch = (search) => {
  carinfoId.value= search.carinfo_id || ''
  modelName.value = search.selectName || ''
  productionYear.value = search.productionYear || ''
  price.value = search.price || ''
  milage.value = search.milage || ''
  score.value = search.score || ''
  hp.value = search.hp || ''
  torque.value = search.torque || ''
  brand.value = search.brand || ''
  suspension.value = search.suspension || ''
  door.value = search.door || ''
  passenger.value = search.passenger || ''
  rearwheel.value = search.rearWheel || ''
  gasoline.value = search.gasoline || ''
  transmission.value = search.transmission || ''
  cc.value = search.cc || ''
  id.value = search.id || ''
  // 打開編輯的 drawer
  drawer.value = true
  updateValidate.value=true
  saveValidate.value=false
}

//修改心儀列表table
const handleUpdate = async () => {
  try {
    const updateData = {
      id: parseInt(id.value) ,
      selectName: modelName.value,
      productionYear: productionYear.value ? parseInt(productionYear.value) : null,
      price: price.value ? parseFloat(price.value) : null,
      milage: milage.value ? parseInt(milage.value) : null,
      score: score.value ? parseInt(score.value) : null,
      brand: brand.value ? parseInt(brand.value) : null,
      suspension: suspension.value ? parseInt(suspension.value) : null,
      door: door.value ? parseInt(door.value) : null,
      passenger: passenger.value ? parseInt(passenger.value) : null,
      rear_wheel: rearwheel.value ? parseInt(rearwheel.value) : null,
      gasoline: gasoline.value ? parseInt(gasoline.value) : null,
      transmission: transmission.value ? parseInt(transmission.value) : null,
      cc: cc.value ? parseInt(cc.value) : null,
      hp: hp.value ? parseInt(hp.value) : null,
      torque: torque.value ? parseFloat(torque.value) : null,
      customer_id: customerInfo.value.id, 
      carinfo_id: carinfoId.value ? parseInt(carinfoId.value) : null,
      preferences_lists: 1,
    };
    console.log('Sending data:', updateData);

    await axios.put(`http://localhost:8080/kajarta/preference/modify/${id.value}`, updateData);
    ElMessage({
      message: '搜尋條件已成功更新!',
      type: 'success',
    });
    fetchSavedSearches(); // 重新獲取儲存的搜尋條件以更新顯示
    drawer.value = false;
  } catch (error) {
    ElMessage({
      message: '更新搜尋條件失敗',
      type: 'error',
    });
  }
};

//心儀搜尋條件儲存
const saveSearchRecord = async () => {
  try {
    console.log("customerInfo.value.id="+customerInfo.value.id);
    const searchRecord = {
      selectName: modelName.value || null,
      productionYear: productionYear.value ? parseInt(productionYear.value) : null,
      price: price.value ? parseFloat(price.value) : null,
      milage: milage.value ? parseInt(milage.value) : null,
      score: score.value ? parseInt(score.value) : null,
      customer_id: customerInfo.value.id,
      carinfo_id: carinfoId.value?parseInt(carinfoId.value):null,
      brand: brand.value ? parseInt(brand.value) : null,
      suspension: suspension.value ? parseInt(suspension.value) : null,
      door: door.value ? parseInt(door.value) : null,
      passenger: passenger.value ? parseInt(passenger.value) : null,
      rear_wheel: rearwheel.value ? parseInt(rearwheel.value) : null,
      gasoline: gasoline.value ? parseInt(gasoline.value) : null,
      transmission: transmission.value ? parseInt(transmission.value) : null,
      cc: cc.value ? parseInt(cc.value) : null,
      hp: hp.value ? parseInt(hp.value) : null,
      torque: torque.value ? parseFloat(torque.value) : null,
      preferences_lists: 1,
    };

    const response = await axios.post('http://localhost:8080/kajarta/preference/create', searchRecord);
    ElMessageBox.alert('搜尋條件已成功儲存!', '成功', {
      confirmButtonText: '確定',
      type: 'success',
    })
  } catch (error) {
    ElMessage({
      message: '儲存搜尋條件失敗',
      type: 'error',
    })
  }
};

//列出心儀TABLE的結果
const fetchSavedSearches = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/kajarta/preference/findByCustomerId/${customerInfo.value.id}`)
    savedSearches.value = response.data.list
    console.log("喜好清單資訊="+savedSearches.value[0].carinfo_id)
  } catch (error) {
    ElMessage({
      message: '無法獲取儲存的搜尋條件',
      type: 'error',
    })
  }
}

// 會員喜好清單驗證
const openSavedSearches = () => {
  if (!isAuthenticated.value) {
    alert("請先登入會員！");
  }
   else if(!isCustomerInfoComplete.value) {
    alert("會員訊息不完整 麻煩檢查！");
  }else{
    fetchSavedSearches();
    drawer2.value = true;
  }
}

// 會員進階搜尋驗證
const handleClick = () => {
  if (!isAuthenticated.value) {
    alert("請先登入會員！");
  } else if (!isCustomerInfoComplete.value) {
    alert("會員訊息不完整 麻煩檢查！");
  } else {
    drawer.value = true;
    saveValidate.value=true;
    updateValidate.value=false;
  }
  console.log("customerId="+customerId);
  console.log("customerInfo.value.id="+customerInfo.value.id);
};

// 註冊會員跳轉頁面
const goToRegister = () => {
  router.push({ name: 'register' });
};

// 重置搜尋條件
const resetForm = () => {
  carinfoId.value=''
  brand.value = ''
  suspension.value = ''
  door.value = ''
  passenger.value = ''
  rearwheel.value = ''
  gasoline.value = ''
  transmission.value = ''
  cc.value = ''
  modelName.value = ''
  productionYear.value = ''
  price.value = ''
  milage.value = ''
  score.value = ''
  hp.value = ''
  torque.value = ''

  isDisabled.value = false;
}

function onCarinfoChange() {  // 如果選擇了車輛型號，則禁用所有其他欄位，否則啟用
  isDisabled.value = !!carinfoId.value;
}

// 以下都在轉值
const getBrandName = (value) => {
  const brand = {
    1: 'HONDA',
    2: 'TOYOTA',
    3: 'MAZDA',
    4: 'BENZ',
    5: 'PORSCHE',
    6: 'BMW',
    7: 'VOLKSWAGEN',
    8: 'NISSAN',
    9: 'SUBARU'
  }
  return brand[value] || '未填入搜尋條件'
}

const getSuspensionName = (value)=> {
  const Suspension = {
    1: '轎車',
    2: '休旅車',
    3: '敞篷車',
    4: '跑車',
    5: '吉普車',
    6: '掀背車'
  }
  return Suspension[value] || '未填入搜尋條件'
}

const getDoorName = (value)=> {
  const door = {
    1: '二門',
    2: '三門',
    3: '四門',
    4: '五門',
    5: '六門',
  }
  return door[value] || '未填入搜尋條件'
}

const getPassengerName = (value)=> {
  const passenger = {
    1: '二人座',
    2: '四人座',
    3: '五人座',
    4: '七人座以上'
    
  }
  return passenger[value] || '未填入搜尋條件'
}

const getRearWheelName = (value)=> {
  const rearWheel = {
    1: '前驅',
    2: '後驅',
    3: '四驅'
  }
  return rearWheel[value] || '未填入搜尋條件'
}

const getGasolineName = (value)=> {
  const gasoline = {
    1: '汽油',
    2: '柴油',
    3: '油電複合',
    4: '純電'
  }
  return gasoline[value] || '未填入搜尋條件'
}

const getTransmissionName = (value)=> {
  const transmission = {
    1: '自排',
    2: '手排',
    3: '手自排',
    4: '自手排'
  }
  return transmission[value] || '未填入搜尋條件'
}

const getCcName = (value)=> {
  const cc = {
    1: '1200以下',
    2: '1201-1800',
    3: '1801-2400',
    4: '2401-3000',
    5: '3001-4200',
    6: '4201-5400',
    7: '5401以上',
  }
  return cc[value] || '未填入搜尋條件'
}

</script>
    
<style >

.form-container {
  margin-bottom: 20px; /* 调整每个表单之间的间距 */
  width: 350px;
}

.form-group {
  border-bottom: 1px solid #a33238; /* 添加底部边框 */
  padding-bottom: 10px; /* 调整内边距 */
  margin-bottom: 10px; /* 调整间距 */
 
}

.form-group input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 350px; /* 調整輸入框的寬度 */
  font-weight: bold;/* 調整輸入字體變粗體 */
}

.form-group label {
  margin-bottom: 5px;
  color: #a33238; /* 改变标签的文本颜色 */
  font-weight: bold;/* 調整字體變粗體 */
}

.search-item {
  font-weight: bold;
  color: #a33238; /* 你可以改成任何顏色 */
  margin-bottom: 8px;
}

.custom-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  font-size: 16px;
  color: #333;
  appearance: none; /* 去掉原本的下拉箭頭 */
  -webkit-appearance: none; /* 支援 Safari */
  -moz-appearance: none; /* 支援 Firefox */
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.custom-select:focus {
  border-color: #a33238; /* 聚焦時的邊框顏色 */
  outline: none; /* 去掉聚焦的藍色輪廓 */
}

.custom-select::after {
  content: '▼'; /* 自定義下拉箭頭 */
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; /* 不阻擋選擇操作 */
  color: #333;
}

.form-group {
  position: relative; /* 讓下拉箭頭相對於容器 */
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

</style>