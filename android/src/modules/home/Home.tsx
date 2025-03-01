import { observer, useLocalStore } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, Image, TouchableOpacity, ScrollView, Platform } from "react-native";
import HomeStore from "./HomeStore";

import FlowList from '../../components/flowlist/FlowList.js';
import ResizeImage from "../../components/ResizeImage";
import Heart from "../../components/Heart";
import TitleBar from "./components/TitleBar";
import CategoryList from "./components/CategoryList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";


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
        store.getCategoryList();
        store.requestHomeList();
    }, []);



    const onArticlePress = useCallback((article: ArticleSimple) => () => {
        navigation.push('ArticleDetail', { id: article.id });
    }, []);

    const navigation = useNavigation<StackNavigationProp<any>>();

    const renderItem1 = ({ item, index }: { item: ArticleSimple, index: number }) => {
        return (
            // 每一个小卡片 
            <TouchableOpacity style={rootStyles.item}
                onPress={onArticlePress(item)}
            >
                <ResizeImage uri={item.image} />
                <Text style={rootStyles.titleTxt}>{item.title}</Text>
                <View style={rootStyles.nameLayout}>
                    <Image source={{ uri: item.avatarUrl }} style={rootStyles.avatarImg} />
                    <Text style={rootStyles.nameTex}>{item.userName}</Text>
                    <Heart
                        value={item.isFavorite}
                        size={20}
                        onValueChanged={(value: boolean) => {
                            console.log(value);
                        }}
                    />
                    <Text style={rootStyles.countTxt}>{item.favoriteCount}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    const categoryList = store.categoryList.filter((i => i.isAdd));

    return (
        <View style={rootStyles.root}>
            <TitleBar tab={1} onTabChanged={(tab: number) => {
                console.log(`tab = ${tab}`);
            }} />
            <FlowList
                style={rootStyles.flatList}
                data={store.homeList}
                numColumns={2}
                keyExtrator={(item: ArticleSimple) => `${item.id}`}
                renderItem={renderItem1}
                contentContainerStyle={rootStyles.container}//给整体内容的
                refreshing={store.refreshing}
                onRefresh={refreshNewData}
                onEndReachedThreshold={0.1}
                onEndReached={loadMoreData}
                ListFooterComponent={Footer}
                ListHeaderComponent={
                    <CategoryList categoryList={categoryList} onCategoryChange={(category: Category) => {
                        console.log(`我是category改变后${JSON.stringify(category)}`);
                    }} allCategoryList={store.categoryList} />
                }
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
        // paddingTop: 6,
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