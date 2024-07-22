<template>
  <div class="form-container">
      <div class="form-group">
        <label>車輛名稱搜尋</label>
        <input type="text" v-model="selectName" required />
          <el-button type="primary" @click="handleSubmitByName">查詢</el-button>
      </div>
  
  </div>

  <div class="form-container">
    <form @submit.prevent="handleSubmitByYear">
      <div class="form-group">
        <label>年分</label>
        <input type="text" v-model="productionYear" required />
        <button type="submit">查詢</button>
      </div>
    </form>
  </div>

  <div class="form-container">
    <form @submit.prevent="handleSubmitByPrice">
      <div class="form-group">
        <label>價格</label>
        <input type="text" v-model="price" required />
        <button type="submit">查詢</button>
      </div>
    </form>
  </div>

  <div class="form-container">
    <form @submit.prevent="handleSubmitByMilage">
      <div class="form-group">
        <label>里程數</label>
        <input type="text" v-model="milage" required />
        <button type="submit">查詢</button>
      </div>
    </form>
  </div>

      <!-- <div class="form-group">
        <label for="score">車況評分</label>
        <input type="text"  id="score" required />
      </div>

      <div class="form-group">
        <label for="customerId">建立會員</label>
        <input type="text"  id="customerId" required />
      </div>

      <div class="form-group">
        <label for="carinfoId">條件查詢</label>
        <input type="text"  id="carinfoId" required />
      </div>

   <div class="form-group">
   <label for="brand">品牌</label>
    <select id="brand" required>
    <option option value="" disabled>選擇你要的品牌</option>
    <option value="Brand 1">袋鼠會咬人</option>
    <option value="Brand 2">袋鼠會吃人</option>
    <option value="Brand 3">唐人街拳法</option>
  </select> 
 </div>

 <div class="form-group">
   <label for="suspension">車型</label>
    <select id="suspension" required>
    <option option value="" disabled>選擇你要的車型</option>
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
    <option option value="" disabled>選擇你要的車門數</option>
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
    <option option value="" disabled>選擇能容納的乘客數</option>
    <option value="passenger 1">二人座</option>
    <option value="passenger 2">四人座</option>
    <option value="passenger 3">五人座</option>
    <option value="passenger 4">七人座以上</option>
  </select> 
 </div>

 <div class="form-group">
   <label for="rearWheel">驅動方式</label>
    <select id="rearWheel" required>
    <option option value="" disabled>選擇你要的驅動方式</option>
    <option value="rearWheel 1">前驅</option>
    <option value="rearWheel 2">後驅</option>
    <option value="rearWheel 3">四驅</option>
  </select> 
 </div>

 <div class="form-group">
   <label for="gasoline">引擎燃料</label>
    <select id="gasoline" required>
    <option option value="" disabled>選擇你要的引擎燃料</option>
    <option value="gasoline 1">汽油</option>
    <option value="gasoline 2">柴油</option>
    <option value="gasoline 3">油電複合</option>
    <option value="gasoline 4">純電</option>
  </select> 
 </div>

 <div class="form-group">
   <label for="transmission">變速系統</label>
    <select id="transmission" required>
    <option option value="" disabled>選擇你要的引擎燃料</option>
    <option value="transmission 1">自排</option>
    <option value="transmission 2">手排</option>
    <option value="transmission 3">手自排</option>
    <option value="transmission 4">自手排</option>
  </select> 
 </div>

 <div class="form-group">
   <label for="displacement">排氣量</label>
    <select id="displacement" required>
    <option option value="" disabled>選擇你要的排氣量</option>
    <option value="displacement 1">1200cc以下</option>
    <option value="displacement 2">1201cc-1800cc</option>
    <option value="displacement 3">1801cc-2400cc</option>
    <option value="displacement 4">2401cc-3000cc</option>
    <option value="displacement 5">3001cc-4200cc</option>
    <option value="displacement 6">4201cc-5400cc</option>
    <option value="displacement 7">5401cc以上</option>
  </select> 
 </div>

 <div class="form-group">
        <label for="hp">馬力</label>
        <input type="text"  id="hp" required />
      </div>
<div class="form-group">
        <label for="torque">扭力</label>
        <input type="text"  id="torque" required />
      </div> 
<div class="form-group">
        <label for="preferences_lists">會員喜好清單</label>
        <input type="text"  id="preferences_lists" required />
      </div>        
      

      <button type="submit">查詢</button>
    </form> 
  </div> --> 
</template>
  
<script setup>

import { ref } from 'vue'
import axios from 'axios'
import { Search } from '@element-plus/icons-vue'


const selectName = ref('')
const productionYear = ref('')
const price = ref('')
const milage = ref('')


const handleSearchByName = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/search/selectName', {
      params: {
        keyword: selectName.value
      }
    })
    console.log('車輛名稱搜尋結果:', response.data)
  
  } catch (error) {
    console.error('查詢失敗:', error)
  }
}


const handleSearchByYear = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/search/productionYear', {
      params: {
        keyword: parseInt(productionYear.value, 10) //把Integer轉成整數
      }
    })
    console.log('出產年分查詢結果:', response.data)
  
  } catch (error) {
    console.error('查詢失敗:', error)
  }
}

const handleSearchByPrice = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/search/price', {
      params: {
        keyword: parseFloat(price.value)
      }
    });
    console.log('價格查詢結果:', response.data);
  } catch (error) {
    console.error('查詢失敗:', error);
  }
};

const handleSearchByMilage = async () => {
  try {
    const response = await axios.get('http://localhost:8080/kajarta/preference/search/milage', {
      params: {
        keyword: parseInt(milage.value, 10) //把Integer轉成整數
      }
    })
    console.log('里程數查詢結果:', response.data)
  
  } catch (error) {
    console.error('查詢失敗:', error)
  }
}


const handleSubmitByName = (event) => {
  event.preventDefault()
  handleSearchByName()
}


const handleSubmitByYear = (event) => {
  event.preventDefault()
  handleSearchByYear()
}

const handleSubmitByPrice = (event) => {
  event.preventDefault();
  handleSearchByPrice();
};

const handleSubmitByMilage = (event) => {
  event.preventDefault();
  handleSearchByMilage();
};

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