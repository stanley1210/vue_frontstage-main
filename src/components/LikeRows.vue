<template>
    <div>
      <label for="rows">每頁顯示筆數：</label>
      <select v-model="rows" @change="onRowsChange" id="rows">
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    total: Number,
    options: Array,
    modelValue: Number
  });
  
  const emit = defineEmits(['update:modelValue', 'rows-change']);
  
  const rows = ref(props.modelValue);
  
  // Watch for changes in props.modelValue to update the local rows value
  watch(() => props.modelValue, (newValue) => {
    rows.value = newValue;
  });
  
  function onRowsChange() {
    emit('update:modelValue', rows.value);
    emit('rows-change', rows.value);
  }
  </script>
  
  <style scoped>
  div {
    margin: 0.5rem 0;
  }
  label {
    margin-right: 0.5rem;
  }
  select {
    padding: 0.3rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  