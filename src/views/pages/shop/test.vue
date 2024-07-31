<template>
    <div>
      <h1>二手车展示</h1>
      <ul>
        <li v-for="car in cars" :key="car.id">{{ car.brand }} - {{ car.model }} - {{ car.year }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        cars: [], // 当前显示的二手车列表
        previousCars: [] // 上次查询的二手车列表
      };
    },
    mounted() {
      this.fetchCars();
      setInterval(this.fetchAndCompareCars, 60000); // 每分钟查询一次
    },
    methods: {
      fetchCars() {
        axios.get('http://localhost:3000/api/cars')
          .then(response => {
            this.cars = response.data;
          })
          .catch(error => {
            console.error('获取数据失败', error);
          });
      },
      fetchAndCompareCars() {
        axios.get('http://localhost:3000/api/cars')
          .then(response => {
            const newCars = response.data;
            // 比较新数据和上次数据
            const newAddedCars = newCars.filter(car => 
              !this.previousCars.some(prevCar => prevCar.id === car.id));
            if (newAddedCars.length > 0) {
              console.log('有新车被添加:', newAddedCars);
              this.cars = newCars;
            }
            // 更新上次查询的数据
            this.previousCars = newCars;
          })
          .catch(error => {
            console.error('获取数据失败', error);
          });
      }
    }
  };
  </script>
  