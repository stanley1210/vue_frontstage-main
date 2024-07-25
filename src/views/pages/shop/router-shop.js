import Car from "./Car.vue";
import Like from "./Like.vue";
import ViewCar from "./ViewCar.vue";
import ShopHome from "./ShopHome.vue";
import Preference from "./Preference.vue";
import MemberArea from "./MemberArea.vue";
import Notices from "./Notices.vue";
import Login from "../Login.vue"
import About from "../About.vue"
import Register from "../Register.vue"

import PreferenceSearch from "./PreferenceSearch.vue";
export default [
    { name: "pages-shop-car-link", path: "/pages/shop/car", component: Car },
    { name: "pages-shop-like-link", path: "/pages/shop/like", component: Like },
    { name: "pages-shop-viewCar-link", path: "/pages/shop/viewCar", component: ViewCar },
    { name: "pages-shop-memberArea-link", path: "/pages/shop/memberArea", component: MemberArea },
    { name: "pages-shop-home-link", path: "/pages/shop/home", component: ShopHome },
    { name: "pages-shop-preference-link", path: "/pages/shop/preference", component: Preference },
    { name: "pages-shop-notices-link", path: "/pages/shop/notices", component: Notices },
    { name: "login", path: "/pages/login", component: Login },
    { name: "about", path: "/pages/about", component: About },
    { name: "register", path: "/pages/register", component: Register }
    { name: "pages-shop-PreferenceSearch-link", path: "/pages/shop/PreferenceSearch", component: PreferenceSearch }
];