import { observer, useLocalStore } from "mobx-react";
import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, Image } from "react-native";
import HomeStore from "./HomeStore";
import { observable } from "mobx";

import icon_heart from '../../assets/icon_heart.png';
import icon_heart_empty from '../../assets/icon_heart_empty.png';
import FlowList from '../../components/flowlist/FlowList.js';
import ResizeImage from "../../components/ResizeImage";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default observer(() => {
    //创建一个store
    // const store = useLocalStore(() => ({
    //     ...new HomeStore(),
    // }));

    const store = useLocalStore(() => new HomeStore());

    const refreshNewData = () => {
        store.resetPage();
        store.requestHomeList();
    }

    const loadMoreData = () => {
        store.requestHomeList();
    }
    const Footer = () => {
        return (
            <Text style={rootStyles.footerTxt}>---没有更多数据了---</Text>
        );
    }
    useEffect(() => {
        store.requestHomeList();
    }, []);

    const renderItem1 = ({ item, index }: { item: ArticleSimple, index: number }) => {
        return (
            // 每一个小卡片 
            <View style={rootStyles.item}>
                <ResizeImage uri={item.image} />
                <Text style={rootStyles.titleTxt}>{item.title}</Text>
                <View style={rootStyles.nameLayout}>
                    <Image source={{ uri: item.avatarUrl }} style={rootStyles.avatarImg} />
                    <Text style={rootStyles.nameTex}>{item.userName}</Text>
                    <Image source={icon_heart_empty} style={rootStyles.heart} />
                    <Text style={rootStyles.countTxt}>{item.favoriteCount}</Text>
                </View>
            </View>
        );
    }
    return (
        <View style={rootStyles.root}>
            <FlowList
                style={rootStyles.flatList}
                data={store.homeList}
                numColumns={2}
                renderItem={renderItem1}
                contentContainerStyle={rootStyles.container}//给整体内容的
                refreshing={store.refreshing}
                onRefresh={refreshNewData}
                onEndReachedThreshold={0.1}
                onEndReached={loadMoreData}
                ListFooterComponent={Footer}
            />
        </View>
    );
});

const rootStyles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    },
    flatList: {
        width: '100%',
        height: '100%',

    },
    item: {
        width: SCREEN_WIDTH - 18 >> 1,
        // height: 260,
        backgroundColor: 'white',
        marginStart: 6,
        marginBottom: 6,
        borderRadius: 8,
        overflow: 'hidden',
    },
    container: {
        paddingTop: 6,
    },
    titleTxt: {
        fontSize: 14,
        color: '#333',
        marginHorizontal: 12,
        marginVertical: 4,
    },
    nameLayout: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    avatarImg: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    nameTex: {
        fontSize: 12,
        color: '#999',
        marginLeft: 6,
        flex: 1,
    },
    heart: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    countTxt: {
        fontSize: 14,
        color: '#999',
        marginLeft: 4,
    },
    footerTxt: {
        width: '100%',
        fontSize: 14,
        color: '#999',
        marginVertical: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
}); 