import axios from 'axios';
// 引入store
import store from '@/store/index.js';

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn'
});

// 请求拦截器
request.interceptors.request.use((config) => {
    // 设置请求头的Authorization
    const { user } = store.state;
    // 如果用户登录，就有user
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});
// 响应拦截器
request.interceptors.response.use((response) => {
    // 处理返回的数据
    return response.data.data || response.data;
}, (err) => {
    return Promise.reject(err);
});

export default request;
