import Axios, {InternalAxiosRequestConfig} from 'axios';
import {ElMessage} from 'element-plus';
import {Cookies} from '@/utils';
import router from '@/router';
import {Md5} from "ts-md5";

const devUrl = '';
const prodUrl = process.env.VUE_APP_PATH || '';

// 接口路径的设置
const url = process.env.NODE_ENV === 'development' ? '' + devUrl : prodUrl;

/**
 * 创建默认接口请求设置
 * 传参接收使用json
 * 默认传参 userid 时间戳 密钥
 * @type {Axios}
 */
const ajax = Axios.create({
    baseURL: url,
    timeout: 10 * 1000,
    method: 'post',
    params: {},
    headers: {
        'Content-Type': 'application/json',
    },
    transformRequest: [
        (data) => {
            // 获取时间戳
            const timestamp = new Date().getTime();
            // 初始化传参
            data = data || {};
            // 加入时间戳与密钥
            data = Object.assign(data, {
                timestamp,
                keyword: get_key_word(timestamp),
            });
            // 返回json
            // return Qs.stringify(data);
            return JSON.stringify(data);
        },
    ],
    transformResponse: [transformResponseData],
});

ajax.interceptors.request.use(addJwtTokenToRequest, error => {
    return Promise.reject(error);
});

const ajax_get = Axios.create({
    baseURL: url,
    timeout: 10 * 1000,
    method: 'get',
    params: {
        timestamp: new Date().getTime(),
        keyword: get_key_word(new Date().getTime()),
    },
    headers: {
        'Content-Type': 'application/json',
    },
    transformResponse: [transformResponseData],
});

ajax_get.interceptors.request.use(addJwtTokenToRequest, error => {
    return Promise.reject(error);
});

function transformResponseData(data: any) {
    data = data || {};

    if (typeof data === 'string') data = JSON.parse(data);

    if (data.message) {
        let type = 'info'; // 默认为信息提示
        switch (data.code) {
            case 0:
                type = 'success';
                break;
            case 1:
                type = 'error';
                break;
            case 2:
                type = 'warning';
                break;
            // 还可以根据需要添加其他状态的处理
        }

        ElMessage({
            message: data.message,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            type: type,
        });
    }

    // 登录信息错误
    if (data.code === 4010 || data.code === 4011) {
        // 清除登录信息
        sessionStorage.removeItem('jwtToken');
        router.push('/login');
    }

    return data;
}

function addJwtTokenToRequest(config: InternalAxiosRequestConfig) {
    // 从 Session Storage 中获取 JWT Token
    const jwtToken = sessionStorage.getItem('jwtToken');

    // 如果 JWT Token 存在，将其添加到请求头
    if (jwtToken && jwtToken !== 'undefined') {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }

    return config;
}

/**
 * 生成密钥
 * 时间戳 + 密文,经过md5加密后形成
 * @param time 时间戳 以毫秒为单位
 * @returns {*}
 */
function get_key_word(time: number) {
    // 密钥文本使用数组拆分
    const keyArr = ['s', 'u', 'n', 'l', 'i', 'g', 'h', 't'];
    const tailArr = ['-', 'm', 'a', 'n', 'g', 'a'];

    // 合并密钥文本与时间戳,使用md5加密
    // 返回密钥
    return Md5.hashStr(time + keyArr.join('') + tailArr.join(''));
}

/**
 * 将加载到的list进行排序
 * @param arr
 */
function array_sort(arr: any[]) {
    arr.sort((a: any, b: any) => {
        const valueA: any = a.match(/\d+(?=\b)/);
        const valueB: any = b.match(/\d+(?=\b)/);

        return valueA - valueB;
    });
}

/**
 * 将加载到的list进行排序
 * @param arr
 */
function array_sort_name(arr: any[]) {
    arr.sort((a: any, b: any) => {
        const valueA: any = a.name.match(/\d+(?=\b)/);
        const valueB: any = b.name.match(/\d+(?=\b)/);

        return valueA - valueB;
    });
}

export {ajax, ajax_get, url, addJwtTokenToRequest, array_sort, array_sort_name};
