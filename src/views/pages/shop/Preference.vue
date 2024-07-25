<template>
<el-button type="primary" color="#a33238" :icon="Search" @click="drawer = true">
  會員進階查詢
  </el-button>
  <el-drawer v-model="drawer" title="進階搜尋功能" :with-header="false" style="background-color:#fff5eb" >
    <span style="color: #a33238;">選擇你想要的車輛條件</span>
    <div class="form-container" >
      <br>
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

        <div class="form-group">
          <label for="brand">品牌</label>
          <select id="brand" v-model="brand" required>
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
          <select id="suspension" v-model="suspension" required>
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
          <select id="door" v-model="door" required>
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
          <select id="passenger"  v-model="passenger" required>
            <option value="" disabled>選擇能容納的乘客數</option>
            <option value="1">二人座</option>
            <option value="2">四人座</option>
            <option value="3">五人座</option>
            <option value="4">七人座以上</option>
          </select>
        </div>

        <div class="form-group">
          <label for="rearWheel">驅動方式</label>
          <select id="rearWheel" v-model="rearWheel" required>
            <option value="" disabled>選擇你要的驅動方式</option>
            <option value="1">前驅</option>
            <option value="2">後驅</option>
            <option value="3">四驅</option>
          </select>
        </div>

        <div class="form-group">
          <label for="gasoline">引擎燃料</label>
          <select id="gasoline" v-model="gasoline" required>
            <option value="" disabled>選擇你要的引擎燃料</option>
            <option value="1">汽油</option>
            <option value="2">柴油</option>
            <option value="3">油電複合</option>
            <option value="4">純電</option>
          </select>
        </div>

        <div class="form-group">
          <label for="transmission">變速系統</label>
          <select id="transmission" v-model="transmission" required>
            <option value="" disabled>選擇你要的引擎燃料</option>
            <option value="1">自排</option>
            <option value="2">手排</option>
            <option value="3">手自排</option>
            <option value="4">自手排</option>
          </select>
        </div>

        <div class="form-group">
          <label for="cc">排氣量</label>
          <select id="cc" v-model="cc" required>
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
        <el-button type="primary"  color="#a33238" :icon="Search" @click="handleSubmit">進階搜尋</el-button>
        <el-button type="danger" @click="resetForm">重置查詢</el-button>
      </div>
    </el-drawer>

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
    <el-button type="danger"  @click="resetForm">重置查詢</el-button>
  </div>

<!-- <div class="form-group">
        <label for="preferences_lists">會員喜好清單</label>
        <input type="text"  id="preferences_lists" required />
      </div>          -->
</template>
  
<script setup>
import { ref } from 'vue'
import axios from 'axios'
const drawer = ref(false)
import { Search} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const brand = ref('')
const suspension = ref('')
const door = ref('')
const passenger = ref('')
const rearWheel = ref('')
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
// 存储查询结果
const results = ref([])

// 提交查询
// const handleSubmit = async () => {
//   try {
//     // 调用动态查询
//     await handleSearchByNoMemSearch();
//   } catch (error) {
//     console.error('查詢失敗:', error);
//   }
// }

// const handleSearchByNoMemSearch = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/kajarta/preference/searchMore', {
//       params: {
//         brand: brand.value,
//         suspension: suspension.value,
//         door: door.value,
//         passenger: passenger.value,
//         rearWheel: rearWheel.value,
//         gasoline: gasoline.value,
//         transmission: transmission.value,
//         cc: cc.value,
//         score:score.value,
//         modelName: modelName.value || null,
//         productionYear: productionYear.value ? parseInt(productionYear.value, 10) : null,
//         price: price.value ? parseFloat(price.value) : null,
//         milage: milage.value ? parseInt(milage.value, 10) : null,
//         hp: hp.value ? parseInt(hp.value, 10) : null,
//         torque: torque.value ? parseFloat(torque.value) : null
//       }
//     })
//     results.value = response.data.list
//     console.log('查詢結果:', response.data)
//   } catch (error) {
//     console.error('查詢失敗:', error);
//   }
// }

const handleSubmit = async () => {
  try {
    // 调用动态查询
    await handleSearchByNoMemSearch();
    // 跳转到结果页面
    router.push({ name: 'pages-shop-PreferenceSearch-link', 
    query: { brand: results.brand, 
      suspension: results.suspension, 
      door: results.door, 
      passenger: results.passenger, 
      rearWheel: results.rearWheel, 
      gasoline: results.gasoline, 
      transmission: results.transmission, 
      cc: results.cc, 
      score: results.score, 
      modelName: results.modelName, 
      productionYear: results.productionYear, 
      price: results.price, 
      milage: results.milage, 
      hp: results.hp, 
      torque: results.torque}})
  } catch (error) {
    console.error('查詢失敗:', error);
  }
}

const handleSearchByNoMemSearch = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/searchMore', {
      params: {
        brand: brand.value,
        suspension: suspension.value,
        door: door.value,
        passenger: passenger.value,
        rearWheel: rearWheel.value,
        gasoline: gasoline.value,
        transmission: transmission.value,
        cc: cc.value,
        score: score.value,
        modelName: modelName.value || null,
        productionYear: productionYear.value ? parseInt(productionYear.value, 10) : null,
        price: price.value ? parseFloat(price.value) : null,
        milage: milage.value ? parseInt(milage.value, 10) : null,
        hp: hp.value ? parseInt(hp.value, 10) : null,
        torque: torque.value ? parseFloat(torque.value) : null
      }
    })
    results.value = response.data.preferenceCarList
    console.log('查詢結果:', response.data)
  } catch (error) {
    console.error('查詢失敗:', error);
  }
}

const resetForm = () => {
  brand.value = ''
  suspension.value = ''
  door.value = ''
  passenger.value = ''
  rearWheel.value = ''
  gasoline.value = ''
  transmission.value = ''
  cc.value = ''
  modelName.value = ''
  productionYear.value = ''
  price.value = ''
  milage.value = ''
  conditionScore.value = ''
  hp.value = ''
  torque.value = ''
}


// const handleSearchByName = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/kajarta/preference/search/selectName', {
//       params: { keyword: selectName.value }
//     })
//     console.log('車輛名稱搜尋結果:', response.data)
//   } catch (error) {
//     console.error('車輛名稱查詢失敗:', error)
//   }
// }

// const handleSearchByYear = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/kajarta/preference/search/productionYear', {
//       params: { keyword: parseInt(productionYear.value, 10) }
//     })
//     console.log('年分查詢結果:', response.data)
//   } catch (error) {
//     console.error('年分查詢失敗:', error)
//   }
// }

// const handleSearchByPrice = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/kajarta/preference/search/price', {
//       params: { keyword: parseFloat(price.value) }
//     })
//     console.log('價格查詢結果:', response.data)
//   } catch (error) {
//     console.error('價格查詢失敗:', error)
//   }
// }

// const handleSearchByMilage = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/kajarta/preference/search/milage', {
//       params: { keyword: parseInt(milage.value, 10) }
//     })
//     console.log('里程數查詢結果:', response.data)
//   } catch (error) {
//     console.error('里程數查詢失敗:', error)
//   }
// }

// const handleSearchByScore = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/kajarta/preference/search/score', {
//       params: { keyword: parseInt(score.value, 10) }
//     })
//     console.log('評分查詢結果:', response.data)
//   } catch (error) {
//     console.error('評分查詢失敗:', error)
//   }
// }

// const handleSearchByHp = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/kajarta/preference/search/hp', {
//       params: { keyword: parseInt(hp.value, 10) }
//     })
//     console.log('馬力查詢結果:', response.data)
//   } catch (error) {
//     console.error('馬力查詢失敗:', error)
//   }
// }

// const handleSearchByTorque = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/kajarta/preference/search/torque', {
//       params: { keyword: parseFloat(torque.value) }
//     })
//     console.log('扭力查詢結果:', response.data)
//   } catch (error) {
//     console.error('扭力查詢失敗:', error)
//   }
// }

</script>
    
<style >

.form-container {
  margin-bottom: 20px; /* 调整每个表单之间的间距 */
}

.form-group {
  border-bottom: 1px solid #a33238; /* 添加底部边框 */
  padding-bottom: 10px; /* 调整内边距 */
  margin-bottom: 10px; /* 调整间距 */
}

</style>