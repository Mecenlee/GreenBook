import axios, { AxiosResponse } from "axios";
import Apis from '../api/Apis';
import Toast from "../components/widdget/Toast";

const instance = axios.create({
    baseURL: 'http://192.168.1.6:7001',
    timeout: 10 * 1000,
});

/**
 * 对返回体错误信息分类
 */
instance.interceptors.response.use(
    response => response,
    error => {
        const { response } = error;
        if (response) {
            const { status } = response;
            if (status >= 500) {
                //服务端报错

            } else if (status === 400) {
                //借口参数异常

            } else if (status == 401) {
                //登录信息过期，需要重新登录

            } else {
                //其他错误信息
                Toast.error(`检查如下条件：1. 手机电脑需在同一wifi下 2. 代码中的ip和端口`);
            }
        } else {
            //网络异常

        }
        return Promise.reject(error);
    }
);

const get = (url: string, params: any): Promise<AxiosResponse<any, any>> => {
    return instance.get(url, {
        params: params,
    });
}

const post = (url: string, params: any): Promise<AxiosResponse<any, any>> => {
    return instance.post(url, params);
}

const request = (name: string, params: any): Promise<AxiosResponse<any, any>> => {
    const api = (Apis as any)[name];
    const { url, method } = api;
    if (method === 'get') {
        return get(url, params);
    } else {
        return post(url, params);
    }
}

export { request }