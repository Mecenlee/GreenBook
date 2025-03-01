import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text, ToastAndroid } from "react-native";
import icon_daily from '../../../assets/icon_daily.png';
import icon_search from '../../../assets/icon_search.png';
import Toast from "../../../components/widdget/Toast";

type Props = {
    tab: number;
    onTabChanged: (tabIndex: number) => void;
};
export default ({ tab, onTabChanged }: Props) => {
    const [tabIndex, setTabIndex] = useState<number>(1);//1是发现

    useEffect(() => {
        setTabIndex(tab);
    }, [tab]);

    const hotfixPress = async () => {
        Toast.show(`点击搜索`);
    }

    return (
        <>
            <View style={styles.titleLayout}>
                <TouchableOpacity style={styles.dailyButton}>
                    <Image
                        source={icon_daily}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => {
                        setTabIndex(0);
                        onTabChanged?.(0);
                    }}
                >
                    <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>关注</Text>
                    {tabIndex === 0 && <View style={styles.line} />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}
                    onPress={() => {
                        setTabIndex(1);
                        onTabChanged?.(1);
                    }}
                >
                    <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>推荐</Text>
                    {tabIndex === 1 && <View style={styles.line} />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}
                    onPress={() => {
                        setTabIndex(2);
                        onTabChanged?.(2);
                    }}
                >
                    <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>重庆</Text>
                    {tabIndex === 2 && <View style={styles.line} />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchButton}
                    onPress={hotfixPress}
                >
                    <Image
                        source={icon_search}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </>

    );
}


const styles = StyleSheet.create({
    logTxt: {
        color: 'black',
    },
    titleLayout: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
    },
    icon: {
        width: 28,
        height: 28,
    },
    dailyButton: {
        paddingRight: 12,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 42,
    },

    searchButton: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 12,
        marginLeft: 42,
    },
    line: {
        width: 28,
        height: 2,
        backgroundColor: '#ff2442',
        borderRadius: 1,
        position: 'absolute',
        bottom: 6,
    },
    tabButton: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabTxt: {
        fontSize: 16,
        color: '#999',
    },
    tabTxtSelected: {
        fontSize: 17,
        color: '#333',
    },

});