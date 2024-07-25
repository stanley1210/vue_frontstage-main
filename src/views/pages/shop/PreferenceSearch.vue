<template>
    <Navigation></Navigation>

    <br>
        <div class="card-body navbarBody">
            <p class="card-text">
                車輛名稱：{{ results.modelName }}<br>
                年分: {{ results.productionYear }}<br>
                價格: {{ results.price }} <br />
                里程數:{{ results.milage }} <br />
                車況評分:{{ results.score }} <br />
                馬力:{{ results.hp }} <br />
                扭力: {{ results.torque }} <br />
                品牌: {{ results.brand }} <br />
                車型: {{ results.suspension }} <br />
                車門數: {{ results.door }} <br />
                乘客數: {{ results.passenger }} <br />
                驅動方式: {{ results.rearWheel }} <br />
                引擎燃料: {{ results.gasoline }} <br />
                變速系統: {{ results.transmission }} <br />
                排氣量: {{ results.cc }} <br />
            </p>
        </div>
</template>
<script setup>
import { ref} from 'vue';
import { useRoute } from 'vue-router';
import Navigation from '@/views/Navigation.vue';
import { defineProps } from 'vue';

// 使用 useRoute 来获取路由中的查询参数
const route = useRoute();
const results = ref({});

const props = defineProps({
  results: {
    type: Object,
    default: () => ({})
  }
});

</script>
<style>


</style>
