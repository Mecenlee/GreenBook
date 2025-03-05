import { MMKV } from 'react-native-mmkv';

// 创建一个存储实例
const storage = new MMKV();

// 异步拿到一个Promise
const save = async (key: string, value: string) => {
    try {
        storage.set(key, value);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const load = async (key: string) => {
    try {
        return storage.getString(key);
    } catch (e) {
        console.error(e);
        return null;
    }
}

const remove = async (key: string) => {
    try {
        storage.delete(key);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const clear = async () => {
    try {
        storage.clearAll();
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export { save, clear, remove, load }