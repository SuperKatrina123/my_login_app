import axios from 'axios';
import qs from 'qs';
import {message} from 'antd';


const instance = axios.create({
    timeout: 10000,
})

// 添加请求拦截器
instance.interceptors.request.use(config => { 
    // console.log('config', config);
    config.headers.Authorization = sessionStorage.getItem('token') || '';
    return config;
}, err => {
    return Promise.reject(err);
});

// 添加响应拦截器
instance.interceptors.response.use(response => {
    console.log(response);
    // 我后端是权限校验成功
    if (response.data.msg === '权限校验成功！') {
        window.history.pushState(null, 'home','/');
    } else {
        return Promise.reject(response.data.msg);
    }
}, err => {
    if (err.response) {
        // token失效，回到登录页面
        window.history.pushState(null, 'login','/login');
    }
})

export default function ajax(method='GET', url, data={}, config) {

    return new Promise((resolve, reject) => {
        let promise;
        // 执行异步ajax请求
        if (method === 'GET') {
            promise = instance({
                method:'GET',
                url, 
                params:data,
                ...config,
            })  // params配置指定的是query参数
        } else {
            promise = axios({
                method: 'POST',
                url, 
                data: qs.stringify(data),
                headers: {
                  'Context-type': 'application/json',
                  'Authorization': 'Bearer ' + window.sessionStorage.getItem('token'),
                }, 
                ...config,
            })
        };

        promise.then(response => {
            // 如果成功了，调用resolve(response.data)
            resolve(response);
        }).catch(error => {    // 对所有ajax请求出错做统一处理，这样外层就不用再处理错误了
            // 如果失败了，提示请求后台出错
            reject(message.error(error));
        })
    })
}
