<template>
    <el-button round v-if="props.viewCarStatus!=3" @click="dialog = true" size="small" class="custom-button">
      賞車評價
    </el-button>
    <el-button round v-if="props.viewCarStatus===3" disabled @click="dialog = true" size="small" class="custom-button">
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
import axiosapi from '@/plugins/axios';
import Swal from 'sweetalert2';

const props = defineProps({
  date: String,
  timeSection: String,
  viewCarId: Number,
  customerId: Number,
  carId: Number,
  viewCarStatus:Number
});

const employeeScore = ref(0)
const branchScore = ref(0)
const carScore = ref(0)
const deal = ref(0)
const viewCarStatus = ref(0)
const customerId = ref(0)


let timer;
const dialog = ref(false);
const loading = ref(false);

// Call FindById to fetch data
const callFindById = async (id) => {
  try {
    const response = await axiosapi.get(`/front/viewCar/select/${id}`);
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
    const response = await axiosapi.put(`/front/viewCar/update/${props.viewCarId}`, {
      id: props.viewCarId,
      carId: props.carId,
      customerId: customerId.value,
      viewCarDate: props.date,
      viewTimeSection: props.timeSection,
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
    axiosapi.get('/front/viewCar/KPI')
        .then(function (response) {
            console.log('response=', response);
            Swal.fire({
                text: "已成功更新Kpi！",
                icon: "success"
            });
        })
        .catch(function (error) {
            Swal.fire({
                text: "更新失敗" + error.message,
                icon: "error"
            });
        });
}


const handleClose = (done) => {
  if (loading.value) {
    return
  }
  ElMessageBox.confirm('確定要提交嗎?')
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