<template>
	<Navigation></Navigation>
	<div class="card-wrapper">
	  <el-card class="card">
		<template #header></template>
		<div class="card-content">
		  <img src="/jeep.jpg" alt="Register" class="card-image" />
		  <div class="card-form">
			<h1>Register</h1><br><br>
			<hr>
			<h3>Don’t Miss the Ride<br>Sign Up Now and<br>Drive Away with Deals！</h3><br>
			<div>
			<el-form>
				<el-form-item label="">
      <el-radio-group >
        <el-radio label="regular">一般會員</el-radio>
        <el-radio label="seller">賣家</el-radio>
      </el-radio-group>
    </el-form-item>
				
			  <el-form-item label="帳號　：">
				<el-input placeholder="請輸入帳號"></el-input>
			  </el-form-item>
			  <el-form-item label="密碼">
				<el-input type="password" placeholder="請輸入密碼"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名">
				<el-input placeholder="請輸入姓名"></el-input>
			  </el-form-item>
			  <el-form-item label="電話">
				<el-input placeholder="請輸入電話"></el-input>
			  </el-form-item>
			  <el-form-item label="電子郵件">
				<el-input placeholder="請輸入電子郵件"></el-input>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary">註冊</el-button>
			  </el-form-item>
			</el-form>
		</div>
		  </div>
		</div>
	  </el-card>
	</div>
  </template>
  
  <style scoped>
  hr {
    border: none;
    border-top: 1px solid #a33238; /* 红色线条 */
    margin: 10px 5px 10px 5px; /* 上下间距 */
  }
  .card-wrapper {
	display: flex;
	justify-content: center; /* 水平居中 */
	align-items: center; /* 垂直居中 */
	min-height: 120vh; /* 确保容器占满整个视口高度 */
	background-color: #f5f5f5; 
  }
  
  .card {
	max-width: 1300px; /* 增大卡片的最大宽度 */
	width: 100%; /* 卡片宽度占满容器宽度 */
	padding: 20px;
	background-color: #fff5eb;
  }
  
  .card-content {
	display: flex;
	align-items: flex-start;
	background-color: white;
	font-weight: bold;
	color: #a33238;
	width: 100%; /* 确保内容宽度占满卡片 */
  }
  
  .card-image {
	width: 50%; /* 增大图片的宽度 */
	margin-right: 20px;
  }
  
  .card-form {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
  }
  
  .el-form {
	width: 100%;
  }
  
  .el-form-item {
	margin-bottom: 20px; /* 增大表单项之间的间距 */
  }
  
  .el-input {
	width: 80%;
	font-size: 1.1em; /* 增大输入框字体大小 */
  }
  
  .submit-button {
	width: 100%;
	max-width: 350px; /* 增大按钮的最大宽度 */
	padding: 12px;
	border: none;
	border-radius: 6px;
	background-color: #a33238;
	color: white;
	cursor: pointer;
	font-size: 1.1em; /* 增大按钮字体大小 */
  }
  
  .submit-button:hover {
	background-color: #66b1ff;
  }
  
  .alert {
	margin-top: 20px; /* 增大警告消息的上边距 */
  }
  </style>
  