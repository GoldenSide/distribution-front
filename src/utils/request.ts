import axios from "axios";
import { sign_md5 } from "./md5";
import { haveToken, removeToken } from './cookie'
import { ElMessage } from "element-plus";
import router from "../router/index"
const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL as string,
    timeout: 5000 // request timeout
});
// 发起请求之前的拦截器
service.interceptors.request.use(
    config => {
        // 如果有token 就携带tokon
        const token = window.localStorage.getItem("accessToken");
        if (token) {
            config.headers.common.Authorization = token;
        }
        config.headers.Authorization = haveToken();
        let copyObj = { ...config.data }
        config.headers.Sign = sign_md5(copyObj, haveToken());
        return config;
    },
    error => Promise.reject(error)
);
// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code == 0) {
            return res;
        } else {
            ElMessage({
                message: res.msg || "请求错误，请刷新后重试",
                type: "error",
                duration: 5 * 1000
            });
            if (res.code == 10 || res.code == 14 || res.code == 15) {
                removeToken();
                router.push({ path: '/advertising' })
            }
            return Promise.reject(new Error(res.message || "Error"));
        }
    },
    error => {
        return Promise.reject(error);
    }
);
export default service;