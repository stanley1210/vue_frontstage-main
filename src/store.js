// store.js 處理vuex
import { createStore } from 'vuex';
import axiosapi from '@/plugins/axios';

const store = createStore({
    state: {
        customerInfo: {}
    },
    mutations: {
        setCustomerInfo(state, customerInfo) {
            console.log('Setting customer info:', customerInfo);
            state.customerInfo = customerInfo;
        },
        clearCustomerInfo(state) {
            state.customerInfo = {};
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
        logout({ commit }) {
            commit('clearCustomerInfo');
        }
    }
});

export default store;
