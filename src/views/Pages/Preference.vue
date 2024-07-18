<template>
 <div class="form-container">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="selectName">Select Name</label>
        <input type="text" v-model="form.selectName" id="selectName" required />
      </div>

      <div class="form-group">
        <label for="productionYear">Production Year</label>
        <input type="number" v-model="form.productionYear" id="productionYear" required />
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" v-model="form.price" id="price" required />
      </div>

      <div class="form-group">
        <label for="milage">Milage</label>
        <input type="number" v-model="form.milage" id="milage" required />
      </div>

      <div class="form-group">
        <label for="score">Score</label>
        <input type="number" v-model="form.score" id="score" required />
      </div>

      <div class="form-group">
        <label for="customerId">Customer ID</label>
        <input type="number" v-model="form.customerId" id="customerId" required />
      </div>

      <div class="form-group">
        <label for="carinfoId">Carinfo ID</label>
        <input type="number" v-model="form.carinfoId" id="carinfoId" required />
      </div>

      <div class="form-group">
        <label for="brand">Brand</label>
        <select v-model="form.brand" id="brand" required>
          <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="form.suspension" />
          Suspension
        </label>
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="form.door" />
          Door
        </label>
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="form.passenger" />
          Passenger
        </label>
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="form.rearWheel" />
          Rear Wheel
        </label>
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="form.gasoline" />
          Gasoline
        </label>
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="form.transmission" />
          Transmission
        </label>
      </div>

      <div class="form-group">
        <label for="cc">CC</label>
        <input type="number" v-model="form.cc" id="cc" required />
      </div>

      <div class="form-group">
        <label for="hp">HP</label>
        <input type="number" v-model="form.hp" id="hp" required />
      </div>

      <div class="form-group">
        <label for="torque">Torque</label>
        <input type="number" v-model="form.torque" id="torque" required />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>
  
<script setup>


  
</script>
    
<style scoped>


</style>