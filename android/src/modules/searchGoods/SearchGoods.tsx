import React, { useEffect, useRef, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native";

import icon_search from '../../assets/icon_search.png';
import icon_arrow from '../../assets/icon_arrow.png';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";

export default () => {

    const navigation = useNavigation<StackNavigationProp<any>>();
    const [showBack, setShowBack] = useState<boolean>(false);

    const inputRef = useRef<TextInput>(null);
    useEffect(() => {
        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();//未生效
            setShowBack(true);
            inputRef.current?.focus();
        }, 100);
    }, []);

    const onBackPress = () => {
        LayoutAnimation.easeInEaseOut();//未生效
        setShowBack(false);
        inputRef.current?.blur();
        setTimeout(() => {
            navigation.pop();
        }, 300);
    }
    // 头部搜索栏
    const renderTitle = () => {
        return (
            <View style={styles.titleLayout}>
                {showBack && <TouchableOpacity style={styles.backButton}
                    onPress={onBackPress}
                >
                    <Image source={icon_arrow} style={styles.backImg} />
                </TouchableOpacity>}
                <View style={styles.searchLayout} >
                    <Image style={styles.searchIcon} source={icon_search} />
                    <TextInput
                        style={styles.searchTxt}
                        placeholder="脆亮小麦粉"
                        placeholderTextColor={'#bbb'}
                        ref={inputRef}
                    />
                </View>
                <Text style={styles.searchBotton}>搜索</Text>
            </View>
        );
    }
    return (
        <View>
            {renderTitle()}
        </View>
    );
}



const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'transiparent',
    },
    titleLayout: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    searchLayout: {
        height: 32,
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginLeft: 16,
    },
    searchIcon: {
        width: 18,
        height: 18,
    },
    searchTxt: {
        fontSize: 14,
        color: '#bbb',
        marginLeft: 6,
        paddingHorizontal: 8,
        paddingVertical: 0,
    },
    menuIcon: {
        width: 22,
        height: 22,
        marginHorizontal: 6,
    },
    searchBotton: {
        fontSize: 16,
        color: '#666',
        marginHorizontal: 12,
    },
    backButton: {
        height: '100%',
        paddingLeft: 16,
        justifyContent: 'center',
    },
    backImg: {
        width: 20,
        height: 20,
    },
}); 