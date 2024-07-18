import axios from "axios";
import Swal from "sweetalert2";

const axiosapi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

//axiosapi.interceptors攔截器 (post/get...接收後)
// axiosapi.interceptors.response.use(
//     function (response) {   //...執行.than(成功)前執行
//         return response;
//     },
//     function (error) {  //...執行.catch(失敗)前執行
//         if (error.response && error.response.status && error.response.status === 403) {
//             sessionStorage.clear();
//             Swal.fire({
//                 text: "失敗(403)：" + error.message,
//                 icon: "error"
//             }).then(function () {
//                 window.location.href = "/secure/login";
//             });
//             return Promise.reject();
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosapi