import routerShop from "./shop/router-shop";
import Like from "./Like.vue";

export default [
    ...routerShop
    { name: "like-link", path: "/pages/like", component: Like },
];


