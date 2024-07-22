<template>
  <div class="container">
    <!-- 包裹选择器和按钮的框 -->
    <div class="form-wrapper">
      <!-- 日期和时间选择器并排显示 -->
      <div class="row align-items-start">
        <!-- 日期选择器 -->
        <div class="col-md-6 mb-2 mb-md-0">
          <div class="demo-date-picker">
            <el-date-picker
              v-model="picker"
              type="date"
              placeholder="Pick a Date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
               :disabled-date="disabledDate"
            />
          </div>
        </div>

        <!-- 时间选择器 -->
        <div class="col-md-6 mb-2">
          <div class="demo-time-picker">
            <el-select v-model="value" placeholder="Time Slot" style="width: 100%">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="text-left mt-2">
        <el-button type="warning" @click="handleSubmit">Submit</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const props = defineProps<{
  carId: number;
}>();

const emit = defineEmits<{
  (event: 'hide-view-car'): void;
}>();


// 当前日期
const today = new Date();

// 禁用今天之前的日期
function disabledDate(date) {
  if (!date) return false;
  return date < today;
}

const picker = ref('');
const value = ref('');
const options = [
  { value: 1, label: '上午10:00-12:00' },
  { value: 2, label: '下午13:00-15:00' },
  { value: 3, label: '下午15:00-17:00' },
  { value: 4, label: '下午17:00-19:00' },
];

function handleSubmit() {
  const payload = {
    viewTimeSection: value.value,
    carId: 1, // 使用传递的 carId
    viewCarDate: picker.value,
    customerId: 1
  };
  console.log(payload)
  axios.post('http://localhost:8080/kajarta/front/viewCar/create', payload)
    .then(response => {
      console.log("提交成功", response);
      emit('hide-view-car');
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      Swal.fire({
        text: "查詢失敗：" + error.message,
        icon: "error"
      });
    });
}


</script>

<style>
.container {
  padding: 20px;
}

.form-wrapper {
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9f9f9;
}

.demo-date-picker,
.demo-time-picker {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 对齐到左侧 */
  width: 100%;
}

.demo-date-picker .el-date-picker,
.demo-time-picker .el-select {
  width: 100%;
}

.text-left {
  text-align: left;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}
</style>