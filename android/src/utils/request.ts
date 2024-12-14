import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.230.116:7001',
    timeout: 10 * 1000,

});

const get = (url: string, params: any) => {
    return instance.get(url, {
        params: params,
    });
}

const post = (url: string, params: any) => {
    return instance.post(url, params);
}

export { get, post }