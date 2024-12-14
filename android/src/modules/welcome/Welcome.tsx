import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import icon_main_logo from '../../assets/icon_main_logo.png';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export default () => {
    useEffect(() => {
        setTimeout(() => {
            startLogin();
        }, 3000);
    }, []);

    const navigation = useNavigation<StackNavigationProp<any>>();

    const startLogin = () => {
        navigation.replace('Login');
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