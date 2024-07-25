<template>
    <Navigation></Navigation>
    <div class="card-wrapper">
        <el-card class="card">
            <template #header></template>
            <div class="card-content">
                <img src="/jeep.jpg" alt="Register" class="card-image" />
                <div class="card-form">
                    <h2>Register</h2><br>
                    <hr>
                    <h4>Don’t Miss the Ride Sign Up Now and<br> Drive Away with Deals！</h4><br>
                    <div>
                        <form>
                            <div class="form-item radio-group">
                                <label>
                                    <input type="radio" name="userType" value="regular"> 一般會員
                                </label>
                                <label>
                                    <input type="radio" name="userType" value="seller"> 賣家
                                </label>
                            </div>

                            <div class="form-item">
                                <label for="username">帳號：</label>
                                <input id="username" type="text" class="custom-input" />
                            </div>
                            <div class="form-item">
                                <label for="password">密碼：</label>
                                <input id="password" type="password" class="custom-input" />
                            </div>
                            <div class="form-item">
                                <label for="name">姓名：</label>
                                <input id="name" type="text" class="custom-input" />
                            </div>
                            <div class="form-item">
                                <label for="idNumber">身分證號：</label>
                                <input id="idNumber" type="text" class="custom-input" />
                            </div>
                            <div class="form-item">
                                <label for="gender">性別：</label>
                                <select id="gender" class="custom-input">
                                    <option value="F">F</option>
                                    <option value="M">M</option>
                                </select>
                            </div>
                            <div class="form-item">
                                <label for="phone">電話：</label>
                                <input id="phone" type="text" class="custom-input" />
                            </div>
                            <div class="form-item">
                                <label for="email">Email：</label>
                                <input id="email" type="email" class="custom-input" />
                            </div>
                            <div class="form-item">
                                <label for="city">縣市：</label>
                                <select id="city" class="custom-input">
                                    <option value="台北市">台北市</option>
                                    <option value="新北市">新北市</option>
                                    <option value="桃園市">桃園市</option>
                                    <option value="台中市">台中市</option>
                                </select>
                            </div>
                            <div class="form-item">
                                <label for="address">地址：</label>
                                <input id="address" type="text" class="custom-input" />
                            </div>
                            <div class="form-item">
                                <button type="submit" class="submit-button">註冊</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
</script>

<style scoped>
hr {
    border: none;
    border-top: 1px solid #a33238;
    /* 红色线条 */
    margin: 5px 5px 5px 5px;
    /* 上下间距 */
}

.card-wrapper {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    min-height: 120vh;
    /* 确保容器占满整个视口高度 */
    background-color: #fff5eb;
}

.card {
    max-width: 1400px;
    /* 增大卡片的最大宽度 */
    width: 100%;
    /* 卡片宽度占满容器宽度 */
    padding: 10px;
    background-color: #fff5eb;
}

.card-content {
    display: flex;
    align-items: stretch;
    /* 使子元素的高度一致 */
    background-color: white;
    font-weight: bold;
    color: #a33238;
    width: 100%;
    font-size: 17px;
}

.card-image {
    width: 50%;
    /* 调整图片宽度 */
    height: 100%;
    /* 使图片的高度与父容器一致 */
    object-fit: cover;
    /* 保持图片的宽高比，并覆盖容器 */
    margin-right: 30px;
}

.card-form {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

form {
    width: 100%;
}

.form-item {
    margin-right: 60px;
    margin-bottom: 25px;
    /* 增大表单项之间的间距 */
    display: flex;
    align-items: center;
    /* 垂直居中对齐 */
}

.form-item label {
    width: 25%;
    /* 标签宽度为列宽的1/4 */
    text-align: right;
    /* 标签右对齐 */
    margin-right: 10px;
}

.custom-input {
    width: 120%;
    font-size: 1.1em;
    border: none;
    border-bottom: 2px solid #a33238;
    /* 红色底线 */
    border-radius: 0;
    padding: 4px;
    margin-right: 60px;
}

.custom-input:focus,
.custom-input:hover {
    border-bottom: 2px solid #a33238;
    /* 保持红色底线 */
    box-shadow: none;
}

.submit-button {
    width: 100%;
    max-width: 500px;
    max-height: 60px;
    margin-left: 45px;
    /* 增大按钮的最大宽度 */
    padding: 12px;
    border: none;
    border-radius: 6px;
    background-color: #a33238;
    color: white;
    cursor: pointer;
    font-size: 1.1em;
    /* 增大按钮字体大小 */
}

.submit-button:hover {
    background-color: #66b1ff;
}

.alert {
    margin-top: 20px;
    /* 增大警告消息的上边距 */
}
</style>
