// store.js
import { createStore } from 'vuex';
import axiosapi from '@/plugins/axios';

const store = createStore({
    state: {
        customerInfo: {},
        isAuthenticated: false, // 认证状态
    },
    mutations: {
        setCustomerInfo(state, customerInfo) {
            console.log('Setting customer info:', customerInfo);
            state.customerInfo = customerInfo;
            state.isAuthenticated = true; // 登录后设置为已认证
        },
        clearCustomerInfo(state) {
            state.customerInfo = {};
            state.isAuthenticated = false; // 登出时清除认证状态
        }
    },
    actions: {
        async fetchCustomerInfo({ commit }, username) {
            try {
                const response = await axiosapi.get(`/customer/info/username/${username}`);
                const data = response.data;
                console.log('Customer info:', data);
                commit('setCustomerInfo', data);
            } catch (error) {
                console.error('Failed to fetch customer info', error);
            }
        },
        async login({ commit }, credentials) {
            try {
                const response = await axiosapi.post('/login', credentials);
                if (response.status === 200) {
                    // 假设登录成功返回用户信息
                    const data = response.data;
                    commit('setCustomerInfo', data);
                }
            } catch (error) {
                console.error('Login failed:', error);
            }
        },
        logout({ commit }) {
            commit('clearCustomerInfo');
            // 如果有必要，可以在此调用 API 处理登出请求
            // await axiosapi.post('/logout');
        }
    }
});

export default store;
