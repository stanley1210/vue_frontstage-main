<template>
    <div>
      <div class="container text-center">
        <div class="row align-items-start">
          <div class="demo-date-picker col-2">
            <el-date-picker v-model="picker" type="date" placeholder="Pick a date" :disabled-date="disabledDate" @change="emitDateChange" />
          </div>
  
          <div class="col-2">
            <el-select v-model="value" placeholder="Time Slot" style="width: 240px" @change="emitTimeSlotChange">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
      </div>
  
      <div class="mb-4">
        <el-button type="warning" @click="handleSubmit">submit</el-button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref,defineEmits,defineProps } from 'vue';
  import axios from 'axios';

const emit = defineEmits<{
  (event: 'hide-view-car'): void;
}>();

const props = defineProps<{
  carId: number;
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
  
  const selectedDate = ref('');
  const selectedTimeSlot = ref('');

  // 触发日期变化事件
  function emitDateChange() {
    selectedDate.value = picker.value;
  }
  
  // 触发时段变化事件
  function emitTimeSlotChange() {
    selectedTimeSlot.value = value.value;
  }

  function handleSubmit() {
 const requestData = {
    viewTimeSection: selectedTimeSlot.value,
    carId: props.carId,
    viewCarDate: selectedDate.value,
    customerId:5,
    
};
axios.post('http://localhost:8080/kajarta/front/viewCar/create', requestData)
    .then(response => {
      console.log('Reservation success:', response.data);
      emit('hide-view-car');
    })
    .catch(error => {
      console.error('Reservation failed:', error);
    });
}

  </script>
  
  <style>
  .demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
  }
  
  .demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
  }
  
  .demo-date-picker .block:last-child {
    border-right: none;
  }
  
  .demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }
  </style>
  