<template>
  <div class="container">
    <!-- 包裹选择器和按钮的框 -->
    <div class="form-wrapper">
      <!-- 日期和时间选择器上下排列 -->
      <div class="row align-items-start">
        <!-- 日历选择器 -->
        <div class="col-12 mb-2">
          <div class="demo-date-picker">
            <el-calendar v-model="value" class="calendar" />
          </div>
        </div>

        <!-- 时间选择器 -->
        <div class="col-12 mb-2">
          <div class="demo-time-picker">
            <el-select v-model="timeValue" placeholder="Time Slot" style="width: 100%">
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
  customerId: number;
}>();

const emit = defineEmits<{
  (event: 'hide-view-car'): void;
}>();

// 当前日期
const value = ref(new Date());

const timeValue = ref('');
const options = [
  { value: 1, label: '上午10:00-12:00' },
  { value: 2, label: '下午13:00-15:00' },
  { value: 3, label: '下午15:00-17:00' },
  { value: 4, label: '下午17:00-19:00' },
];

function handleSubmit() {
  const payload = {
    viewTimeSection: timeValue.value,
    carId: props.carId, // 使用传递的 carId
    viewCarDate: value.value,
    customerId: props.customerId
  };
  console.log(payload);

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
  align-items: flex-start;
  width: 100%;
}

.demo-date-picker .calendar {
  width: 100%; /* 让日历适应容器宽度 */
  max-width: 100%;
  box-sizing: border-box;
}

.demo-time-picker .el-select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  height: 50px;
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
