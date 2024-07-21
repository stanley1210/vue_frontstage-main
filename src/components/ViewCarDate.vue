<template>
  <div class="container text-center">
    <div class="row align-items-start">
      <div class="demo-date-picker col-2">
        <!-- <span class="demonstration">date</span> -->
        <el-date-picker v-model="picker" type="date" placeholder="Pick a date" :disabled-date="disabledDate" />
      </div>

      <!-----------------时段----------------------->
      <div class="col-2">
        <el-select v-model="value" placeholder="Time Slot" style="width: 240px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//===============日历===================
import { ref } from 'vue';

// 当前日期
const today = new Date();

// 禁用今天之前的日期
function disabledDate(date) {
  if (!date) return false;
  return date < today;
}

const picker = ref('');
//===============日历===================

//===============时段===================
const value = ref('');

const options = [
  { value: 1, label: '10:00:00-12:00:00' },
  { value: 2, label: '13:00:00-15:00:00' },
  { value: 3, label: '15:00:00-17:00:00' },
  { value: 4, label: '17:00:00-19:00:00' },
];

// 触发日期变化事件
function emitDateChange() {
  emit('date-changed', { date: picker.value, timeSlot: value.value });
}

// 触发时段变化事件
function emitTimeSlotChange() {
  emit('time-slot-changed', { date: picker.value, timeSlot: value.value });
}

const emit = defineEmits(['date-changed', 'time-slot-changed']);
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
