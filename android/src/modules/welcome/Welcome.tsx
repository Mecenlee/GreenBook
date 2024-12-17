import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native"; 
import icon_main_logo from '../../assets/icon_main_logo.png';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { load } from "../../utils/Storage";

export default () => {
    useEffect(() => {
        load("userInfo");
        setTimeout(() => {
            getUserInfo();
        }, 2000);
    }, []);

    const getUserInfo = async () => {
        const cacheUserInfo = await load("userInfo");
        if (cacheUserInfo && JSON.parse(cacheUserInfo)) {
            startHome();
        } else {
            startLogin();
        }
    }
    const navigation = useNavigation<StackNavigationProp<any>>();

    const startLogin = () => {
        navigation.replace('Login');
    }
    const startHome = () => {
        navigation.replace('MainTab');
    }
    return (
        <View style={styles.root}>
            <Image
                source={icon_main_logo}
                style={styles.logo_main}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',

    },
    logo_main: {
        width: 200,
        height: 100,
        marginTop: 300,
        resizeMode: 'contain',
    },
});