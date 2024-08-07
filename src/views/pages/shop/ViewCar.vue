<template>
  <div class="container">
    <!-- 包裹选择器和按钮的框 -->
    <div class="form-wrapper">
      <!-- 日期和时间选择器上下排列 -->
      <div class="row align-items-start">
        <!-- 日历选择器 -->
        <div class="col-12 mb-2">
          <div class="demo-date-picker">
            <el-calendar v-model="value" class="calendar">
              <template #date-cell="{ data }">
                <p :class="data.isSelected ? 'is-selected' : ''">
                  {{ data.day.split('-').slice(1).join('-') }}
                  {{ data.isSelected ? '✔️' : '' }}
                </p>
              </template>
            </el-calendar>
          </div>
        </div>

        <!-- 时间选择器 -->
        <div class="col-12 mb-2">
          <div class="demo-time-picker">
            <el-select v-model="timeValue" placeholder="Time Slot" style="width: 100%">
              <el-option class="demo-time-picker" v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="text-left mt-2">
        <el-button size="large" type="warning" @click="handleSubmit">Submit</el-button>
      </div>
    </div>
    
  </div>
  
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import axiosapi from '@/plugins/axios';
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
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 清除时间部分，只比较日期
  const selectedDate = new Date(value.value);
  selectedDate.setHours(0, 0, 0, 0); // 清除时间部分，只比较日期

  if (selectedDate < today) {
    Swal.fire({
      title: '無效日期',
      text: '不能選擇今天以前的日期，請選擇有效日期。',
      icon: 'warning',
      confirmButtonText: '確定'
    });
    return;
  }

  const payload = {
    viewTimeSection: timeValue.value,
    carId: props.carId, // 使用传递的 carId
    viewCarDate: value.value,
    customerId: props.customerId
  };
  console.log(payload);

  axiosapi.post('/front/viewCar/create', payload)
    .then(response => {
      console.log("提交成功", response);
      emit('hide-view-car'); // 触发关闭对话框事件
      Swal.fire({
        title: '成功!',
        text: '您的預約已成功提交。',
        icon: 'success',
        confirmButtonText: '確定'
      }).then(() => {
       
      });
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

<style scope>
.container {
  padding: 20px;
}

.form-wrapper {
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  width: 100%;
  padding: 16px;
  background-color: #f9f9f9;
}

.demo-date-picker,
.demo-time-picker {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  font-size: 21px;
}

.demo-date-picker .calendar {
  width: 100%;
  /* 让日历适应容器宽度 */
  max-width: 120%;
  box-sizing: border-box;
  font-size: 21px;
}

.demo-time-picker .el-select {
  width: 100%;
  padding: 10px;
  font-size: 24px;
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
.swal2-container {
  z-index: 9999 !important; /* 确保 SweetAlert 弹框显示在最上层 */
}
</style>
