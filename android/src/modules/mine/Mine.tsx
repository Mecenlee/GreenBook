import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, LayoutChangeEvent, Dimensions, RefreshControl } from "react-native";
import { styles } from "../../components/slidePager/style";
import UserStore from "../../stores/UserStore";
import { observer, useLocalStore } from "mobx-react";
import MineStore from "./MineStore";
import { EMPTY_ARRAY } from "mobx/lib/internal";
import Empty from "../../components/Empty";
import ResizeImage from "../../components/ResizeImage";
import Heart from "../../components/Heart";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import icon_mine_bg from '../../assets/icon_mine_bg.png';
import icon_menu from '../../assets/icon_menu.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_share from '../../assets/icon_share.png';
import icon_location_info from '../../assets/icon_location_info.png';
import icon_qrcode from '../../assets/icon_qrcode.png';
import icon_add from '../../assets/icon_add.png';
import icon_male from '../../assets/icon_male.png';
import icon_female from '../../assets/icon_female.png';
import icon_setting from '../../assets/icon_setting.png';
import icon_no_note from '../../assets/icon_no_note.webp';
import icon_no_collection from '../../assets/icon_no_collection.webp';
import icon_no_favorate from '../../assets/icon_no_favorate.webp';
import SideMenu, { SideMenuRef } from "./SideMenu";


const EMPTY_CONFIG = [
    { icon: icon_no_note, tips: '快去发布今日的好心情吧~' },
    { icon: icon_no_collection, tips: '快去收藏你喜欢的作品吧~' },
    { icon: icon_no_favorate, tips: '喜欢点赞的人运气不会太差哦~' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');


export default observer(() => {

    const { userInfo } = UserStore;
    const store = useLocalStore(() => new MineStore());
    const [bgImgHeight, setBgImgHeight] = useState<number>(400);
    const [tabIndex, setTabIndex] = useState<number>(0);
    const sideMenuRef = useRef<SideMenuRef>();

    useEffect(() => {
        store.requestAll();
    }, []);



    const renderTitle = () => {
        const styles = StyleSheet.create({
            titleLayout: {
                width: '100%',
                height: 48,
                flexDirection: 'row',
                alignItems: 'center',
            },
            menuButton: {
                height: '100%',
                paddingHorizontal: 16,
                justifyContent: 'center',
            },
            menuImg: {
                width: 28,
                height: 28,
                resizeMode: 'contain',
            },
            rightMenuImg: {
                marginHorizontal: 7,
                tintColor: 'white',
            },
        });
        return (
            <View style={styles.titleLayout}>
                <TouchableOpacity style={styles.menuButton}
                    onPress={() => {
                        sideMenuRef?.current?.show();
                    }}
                >
                    <Image source={icon_menu} style={styles.menuImg} />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <Image source={icon_shop_car} style={[styles.menuImg, styles.rightMenuImg]} />
                <Image source={icon_share} style={[styles.menuImg, styles.rightMenuImg]} />
            </View>
        );
    }

    const renderInfo = () => {
        const styles = StyleSheet.create({
            avatarLayout: {
                width: '100%',
                flexDirection: 'row',
                alignItems: 'flex-end',
                padding: 16,
            },
            avatarImg: {
                width: 96,
                height: 96,
                resizeMode: 'cover',
                borderRadius: 48,
            },
            addImg: {
                width: 28,
                height: 28,
                marginLeft: -28,
                marginBottom: 2,
            },
            nameLayout: {
                marginLeft: 20,
            },
            nameTxt: {
                fontSize: 22,
                color: 'blue',
                fontWeight: 'bold',
            },
            idLayout: {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
                marginBottom: 20,
            },
            idTxt: {
                fontSize: 12,
                color: '#bbb',
            },
            qrcodeImg: {
                width: 12,
                height: 12,
                marginLeft: 6,
                tintColor: '#bbb',
            },
            descTxt: {
                color: 'white',
                paddingHorizontal: 16,
                fontSize: 14,
            },
            sexLayout: {
                width: 32,
                height: 24,
                backgroundColor: '#ffffff50',
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 16,
                marginTop: 12,
            },
            sexImg: {
                width: 12,
                height: 12,
                resizeMode: 'contain',
            },
            infoLayout: {
                flexDirection: 'row',
                width: '100%',
                paddingRight: 16,
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 28,
            },
            infoItem: {
                alignItems: 'center',
                paddingHorizontal: 16,
            },
            infoValue: {
                fontSize: 18,
                color: 'white',
            },
            infoLabel: {
                fontSize: 12,
                color: '#ddd',
                marginTop: 6,
            },
            infoButton: {
                height: 32,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 16,
            },
            editTxt: {
                fontSize: 14,
                color: '#ffffff',
            },
            settingImg: {
                width: 20,
                height: 20,
                tintColor: '#ffffff',
            },
        });
        const { avatar, nickName, redBookId, desc, sex, location } = userInfo;
        const { info } = store;
        return (
            <View onLayout={(e: LayoutChangeEvent) => {
                const { height } = e.nativeEvent.layout;
                setBgImgHeight(height);
            }}>
                <View style={styles.avatarLayout}>
                    <Image source={{ uri: avatar }} style={styles.avatarImg} />
                    <Image source={icon_add} style={styles.addImg} />
                    <View style={styles.nameLayout}>
                        <Text style={styles.nameTxt}>{nickName}</Text>
                        <View style={styles.idLayout}>
                            <Text style={styles.idTxt}>小红书号: {redBookId}</Text>
                            <Image source={icon_qrcode} style={styles.qrcodeImg} />
                        </View>
                    </View>
                </View>
                <Text style={styles.descTxt}>{desc}</Text>
                <View style={styles.sexLayout}>
                    <Image source={sex === 'male' ? icon_male : icon_female} style={styles.sexImg} />
                </View>
                <View style={styles.infoLayout}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoValue}>{info.followCount}</Text>
                        <Text style={styles.infoLabel}>关注</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoValue}>{info.fans}</Text>
                        <Text style={styles.infoLabel}>粉丝</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoValue}>{info.favorateCount}</Text>
                        <Text style={styles.infoLabel}>获赞与收藏</Text>
                    </View>
                    <View style={{ flex: 1, }} />
                    <TouchableOpacity style={styles.infoButton}>
                        <Text style={styles.editTxt}>编辑资料</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoButton}>
                        <Image source={icon_setting} style={styles.settingImg} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const navigation = useNavigation<StackNavigationProp<any>>();

    const onArticlePress = useCallback((article: ArticleSimple) => () => {
        navigation.push('ArticleDetail', { id: article.id });
    }, []);

    const renderTabs = () => {
        const styles = StyleSheet.create({
            titleLayout: {
                width: '100%',
                height: 48,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                paddingHorizontal: 16,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#eee',
            },
            icon: {
                width: 28,
                height: 28,
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
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 12,
            },
            tabTxt: {
                fontSize: 17,
                color: '#999',
            },
            tabTxtSelected: {
                fontSize: 17,
                color: '#333',
            },

        });

        return (
            <View style={styles.titleLayout}>
                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => {
                        setTabIndex(0);
                    }}
                >
                    <Text style={tabIndex === 0 ? styles.tabTxtSelected : styles.tabTxt}>笔记</Text>
                    {tabIndex === 0 && <View style={styles.line} />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}
                    onPress={() => {
                        setTabIndex(1);
                    }}
                >
                    <Text style={tabIndex === 1 ? styles.tabTxtSelected : styles.tabTxt}>收藏</Text>
                    {tabIndex === 1 && <View style={styles.line} />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}
                    onPress={() => {
                        setTabIndex(2);
                    }}
                >
                    <Text style={tabIndex === 2 ? styles.tabTxtSelected : styles.tabTxt}>赞过</Text>
                    {tabIndex === 2 && <View style={styles.line} />}
                </TouchableOpacity>
            </View>
        );
    }

    const renderList = () => {
        const { noteList, collectionList, favorateList } = store;
        const currentList = [noteList, collectionList, favorateList][tabIndex];
        if (!currentList?.length) {
            const config = EMPTY_CONFIG[tabIndex];
            return <Empty icon={config.icon} tips={config.tips} />;
        }
        const styles = StyleSheet.create({
            listContainer: {
                width: '100%',
                backgroundColor: 'white',
                flexDirection: 'row',
                flexWrap: 'wrap',
            },
            itemImg: {
                width: SCREEN_WIDTH - 18 >> 1,
                height: 240,

            },
        });

        return (
            <View style={styles.listContainer}>
                {currentList.map((item, index) => {
                    return (
                        // 每一个小卡片 
                        <TouchableOpacity style={rootStyles.item}
                            onPress={onArticlePress(item)}
                            key={`${item.id}-${index}`}
                        >
                            <Image source={{ uri: item.image }} style={styles.itemImg} />
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
                })}
            </View>
        );
    }

    return (
        <View style={rootStyles.root}>
            <Image source={icon_mine_bg} style={[rootStyles.bgImg, { height: bgImgHeight + 64 }]} />
            {renderTitle()}
            <ScrollView
                style={rootStyles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={store.refreshing}
                        onRefresh={store.requestAll}
                    />
                }

            >
                {renderInfo()}
                {renderTabs()}
                {renderList()}
            </ScrollView>
            <SideMenu ref={sideMenuRef} />
        </View>
    );
});

const rootStyles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    bgImg: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 400,
    },
    scrollView: {
        width: '100%',
        flex: 1,
    },
    item: {
        width: SCREEN_WIDTH - 18 >> 1,
        backgroundColor: 'white',
        marginStart: 6,
        marginBottom: 6,
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 8,
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
}); 