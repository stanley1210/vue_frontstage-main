<template>
    <el-button round @click="dialog = true" size="small" class="custom-button">
      賞車評價
    </el-button>
    <el-drawer v-model="dialog" title="留下您寶貴的評分吧!" :before-close="handleClose" direction="rtl" class="demo-drawer">

      <div class="demo-drawer__content">
        <h6>給銷售員評價吧!</h6>
        <div class="slider-demo-block">
          <el-slider v-model="employeeScore" show-input />
        </div>
        <h6>給車行評價吧!</h6>
        <div class="slider-demo-block">
          <el-slider v-model="branchScore" show-input />
        </div>
        <h6>給車子評價吧!</h6>
        <div class="slider-demo-block">
          <el-slider v-model="carScore" show-input />
        </div>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取消</el-button>
          <el-button type="primary" :loading="loading" @click="onClick">
            {{ loading ? '提交中 ...' : '提交' }}
          </el-button>
        </div>
      </div>
    </el-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import axios from 'axios'

const props = defineProps({
  date: String,
  timeSection: String,
  viewCarId: Number,
  customerId: Number,
  carId: Number
});

const employeeScore = ref(0)
const branchScore = ref(0)
const carScore = ref(0)
const deal = ref(0)
const viewCarStatus = ref(0)
const customerId = ref(0)



const timeSectionMap = {
  "10:00:00-12:00:00": 1,
  "13:00:00-15:00:00": 2,
  "15:00:00-17:00:00": 3,
  "17:00:00-19:00:00": 4,
};
const getViewCarStatusText = (status) => timeSectionMap[status] || '未知状态';

let timer;
const dialog = ref(false);
const loading = ref(false);

// Call FindById to fetch data
const callFindById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/kajarta/front/viewCar/select/${id}`);
    const data = response.data.list[0]; // Extracting the first item from the list
    deal.value = data.deal || 0;
    viewCarStatus.value = data.viewCarStatus || 0;
    customerId.value = data.customer || 0;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Watch dialog to fetch data when the drawer opens
watch(dialog, (newValue) => {
  if (newValue) {
    callFindById(props.viewCarId);
  }
});




const onClick = async () => {
  loading.value = true
  try {
    const response = await axios.put(`http://localhost:8080/kajarta/front/viewCar/update/${props.viewCarId}`, {
      id: props.viewCarId,
      carId: props.carId,
      customerId: customerId.value,
      viewCarDate: props.date,
      viewTimeSection: getViewCarStatusText(props.timeSection),
      deal: deal.value,
      viewCarStatus: viewCarStatus.value,
      salesScore: employeeScore.value,
      factoryScore: branchScore.value,
      carScore: carScore.value
    })
    console.log(response.data)
    if (response.data.success) {
      ElMessage({
        type: 'success',
        message: '提交成功'
      })
      dialog.value = false
    } else {
      ElMessage({
        type: 'warning',
        message: response.data.message
      })
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '提交失敗: ' + error.message
    })
  } finally {
    loading.value = false
  }
}

const handleClose = (done) => {
  if (loading.value) {
    return
  }
  ElMessageBox.confirm('你确定要提交吗?')
    .then(() => {
      loading.value = true
      timer = setTimeout(() => {
        done()
        // 动画关闭需要一定的时间
        setTimeout(() => {
          loading.value = false
        }, 800)
      }, 2000)
    })
    .catch(() => {
      // 捕获错误
    })
}

const cancelForm = () => {
  loading.value = false
  dialog.value = false
  clearTimeout(timer)
}
</script>

<style scoped>
.small-input {
  width: 100px;
  /* 調整輸入框寬度 */
}
</style>