<template>
<el-button type="primary" :icon="Search" @click="drawer = true">
  會員進階查詢
  </el-button>
  <el-drawer v-model="drawer" title="進階搜尋功能" :with-header="false" style="background-color:#fff5eb" >
    <span style="color: #845b38;">選擇你想要的車輛條件</span>
    <div class="form-container" >
      <br>
        <div class="form-group">
          <label for="brand">品牌</label>
          <select id="brand" required>
            <option value="" disabled>選擇你要的品牌</option>
            <option value="Brand 1">HONDA</option>
            <option value="Brand 2">TOYOTA</option>
            <option value="Brand 3">MAZDA</option>
            <option value="Brand 4">BENZ</option>
            <option value="Brand 5">PORSCHE</option>
            <option value="Brand 6">BMW</option>
            <option value="Brand 7">VOLKSWAGEN</option>
            <option value="Brand 8">NISSAN</option>
            <option value="Brand 9">SUBARU</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="suspension">車型</label>
          <select id="suspension" required>
            <option value="" disabled>選擇你要的車型</option>
            <option value="suspension 1">轎車</option>
            <option value="suspension 2">休旅車</option>
            <option value="suspension 3">敞篷車</option>
            <option value="suspension 4">跑車</option>
            <option value="suspension 5">吉普車</option>
            <option value="suspension 6">掀背車</option>
          </select>
        </div>

        <div class="form-group">
          <label for="door">車門數</label>
          <select id="door" required>
            <option value="" disabled>選擇你要的車門數</option>
            <option value="door 1">二門</option>
            <option value="door 2">三門</option>
            <option value="door 3">四門</option>
            <option value="door 4">五門</option>
            <option value="door 5">六門</option>
          </select>
        </div>

        <div class="form-group">
          <label for="passenger">乘客數</label>
          <select id="passenger" required>
            <option value="" disabled>選擇能容納的乘客數</option>
            <option value="passenger 1">二人座</option>
            <option value="passenger 2">四人座</option>
            <option value="passenger 3">五人座</option>
            <option value="passenger 4">七人座以上</option>
          </select>
        </div>

        <div class="form-group">
          <label for="rearWheel">驅動方式</label>
          <select id="rearWheel" required>
            <option value="" disabled>選擇你要的驅動方式</option>
            <option value="rearWheel 1">前驅</option>
            <option value="rearWheel 2">後驅</option>
            <option value="rearWheel 3">四驅</option>
          </select>
        </div>

        <div class="form-group">
          <label for="gasoline">引擎燃料</label>
          <select id="gasoline" required>
            <option value="" disabled>選擇你要的引擎燃料</option>
            <option value="gasoline 1">汽油</option>
            <option value="gasoline 2">柴油</option>
            <option value="gasoline 3">油電複合</option>
            <option value="gasoline 4">純電</option>
          </select>
        </div>

        <div class="form-group">
          <label for="transmission">變速系統</label>
          <select id="transmission" required>
            <option value="" disabled>選擇你要的引擎燃料</option>
            <option value="transmission 1">自排</option>
            <option value="transmission 2">手排</option>
            <option value="transmission 3">手自排</option>
            <option value="transmission 4">自手排</option>
          </select>
        </div>

        <div class="form-group">
          <label for="displacement">排氣量</label>
          <select id="displacement" required>
            <option value="" disabled>選擇你要的排氣量</option>
            <option value="displacement 1">1200cc以下</option>
            <option value="displacement 2">1201cc-1800cc</option>
            <option value="displacement 3">1801cc-2400cc</option>
            <option value="displacement 4">2401cc-3000cc</option>
            <option value="displacement 5">3001cc-4200cc</option>
            <option value="displacement 6">4201cc-5400cc</option>
            <option value="displacement 7">5401cc以上</option>
          </select>
        </div>
        <el-button type="primary" :icon="Search" @click="handleSearch">進階搜尋</el-button>
      </div>
    </el-drawer>

  <div class="form-container">
    <br>
    <div class="form-group">
      <label>車輛名稱搜尋</label>
      <input type="text" v-model="selectName" placeholder="輸入車輛名稱" />
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

    <el-button type="primary" :icon="Search" @click="handleSubmit">查詢</el-button>
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


const selectName = ref('')
const productionYear = ref('')
const price = ref('')
const milage = ref('')
const score = ref('')
const hp = ref('')
const torque = ref('')

// 存储查询结果
const results = ref([])

// 提交查询
const handleSubmit = async () => {
  try {
    // 调用动态查询
    await handleSearchByNoMemSearch();
  } catch (error) {
    console.error('查詢失敗:', error);
  }
}

const handleSearchByNoMemSearch = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/nomemsearch', {
      params: {
        selectName: selectName.value || null,
        productionYear: productionYear.value ? parseInt(productionYear.value, 10) : null,
        price: price.value ? parseFloat(price.value) : null,
        milage: milage.value ? parseInt(milage.value, 10) : null,
        score: score.value ? parseInt(score.value, 10) : null,
        hp: hp.value ? parseInt(hp.value, 10) : null,
        torque: torque.value ? parseFloat(torque.value) : null
      }
    })
    results.value = response.data.list
    console.log('查詢結果:', response.data)
  } catch (error) {
    console.error('查詢失敗:', error);
  }
}


const handleSearchByName = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/search/selectName', {
      params: { keyword: selectName.value }
    })
    console.log('車輛名稱搜尋結果:', response.data)
  } catch (error) {
    console.error('車輛名稱查詢失敗:', error)
  }
}

const handleSearchByYear = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/search/productionYear', {
      params: { keyword: parseInt(productionYear.value, 10) }
    })
    console.log('年分查詢結果:', response.data)
  } catch (error) {
    console.error('年分查詢失敗:', error)
  }
}

const handleSearchByPrice = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/search/price', {
      params: { keyword: parseFloat(price.value) }
    })
    console.log('價格查詢結果:', response.data)
  } catch (error) {
    console.error('價格查詢失敗:', error)
  }
}

const handleSearchByMilage = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/search/milage', {
      params: { keyword: parseInt(milage.value, 10) }
    })
    console.log('里程數查詢結果:', response.data)
  } catch (error) {
    console.error('里程數查詢失敗:', error)
  }
}

const handleSearchByScore = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/search/score', {
      params: { keyword: parseInt(score.value, 10) }
    })
    console.log('評分查詢結果:', response.data)
  } catch (error) {
    console.error('評分查詢失敗:', error)
  }
}

const handleSearchByHp = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/search/hp', {
      params: { keyword: parseInt(hp.value, 10) }
    })
    console.log('馬力查詢結果:', response.data)
  } catch (error) {
    console.error('馬力查詢失敗:', error)
  }
}

const handleSearchByTorque = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/search/torque', {
      params: { keyword: parseFloat(torque.value) }
    })
    console.log('扭力查詢結果:', response.data)
  } catch (error) {
    console.error('扭力查詢失敗:', error)
  }
}

</script>
    
<style >

.form-container {
  margin-bottom: 20px; /* 调整每个表单之间的间距 */
}

.form-group {
  border-bottom: 1px solid #845b38; /* 添加底部边框 */
  padding-bottom: 10px; /* 调整内边距 */
  margin-bottom: 10px; /* 调整间距 */
}

</style>