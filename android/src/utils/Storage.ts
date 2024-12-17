import AsyncStorage from "@react-native-async-storage/async-storage"

// 异步拿到一个Promise
const save = async (key: string, value: string) => {
    try {
        return await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error(e);
    }
}

const load = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        console.error(e);
        return null;
    }
}

const remove = async (key: string) => {
    try {
        return await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error(e);
    }
}

const clear = async () => {
    try {
        AsyncStorage.clear();
    } catch (e) {
        console.error(e);
    }
}

export { save, clear, remove, load }