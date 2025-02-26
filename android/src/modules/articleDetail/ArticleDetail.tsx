import { observer, useLocalStore } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArticleDetailStore from "./ArticleDetailStore";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import icon_arrow from '../../assets/icon_arrow.png';
import icon_share from '../../assets/icon_share.png';
import { StackNavigationProp } from "@react-navigation/stack";
import { ImageSlider } from "../../components/slidePager";
import UserStore from "../../stores/UserStore";
import { TextInput } from "react-native-gesture-handler";
import dayjs from "dayjs";
import Heart from "../../components/Heart";
import icon_collection from '../../assets/icon_collection.png';
import icon_collection_selected from '../../assets/icon_collection_selected.png';
import icon_comment from '../../assets/icon_comment.png';
import icon_edit_comment from '../../assets/icon_edit_comment.png';

type RouteParams = {
    ArticleDetail: {
        id: number;
    }
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export default observer(() => {

    const store = useLocalStore(() => new ArticleDetailStore());
    const { params } = useRoute<RouteProp<RouteParams, 'ArticleDetail'>>();
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        store.requestArticleDetail(params.id);
    }, []);

    const { detail } = store;

    const [height, setHeight] = useState<number>(400);


    useEffect(() => {
        if (!store.detail?.images) {
            return;
        }
        const firstImg = store.detail?.images?.[0];

        Image.getSize(firstImg, (width: number, height: number) => {
            const showHeight = SCREEN_WIDTH * height / width;
            setHeight(showHeight);
        });
    }, [store.detail?.images]);

    const renderTitle = () => {
        return (
            <View style={styles.titleLayout}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                    <Image source={icon_arrow} style={styles.backImg} />
                </TouchableOpacity>
                <Image source={{ uri: detail.avatarUrl }} style={styles.avatarImg} />
                <Text style={styles.userNameTxt}>{detail.userName}</Text>
                <Text style={styles.followTxt}>关注</Text>
                <Image source={icon_share} style={styles.shareImg} />
            </View>
        );
    }
    const renderImgs = () => {
        const { images } = detail;
        if (!images?.length) {
            return null;
        }
        const data: any[] = images.map(i => {
            return { img: i };
        })

        return (
            <View style={{ paddingBottom: 30 }}>
                <ImageSlider
                    data={data}
                    autoPlay={false}
                    closeIconColor="white"
                    caroselImageStyle={{ height }}
                    indicatorContainerStyle={{ bottom: -40, }}
                    activeIndicatorStyle={styles.activeDot}
                    inActiveIndicatorStyle={styles.inActiveDot}
                />
            </View>
        );
    }
    const renderInfo = () => {
        const tags = detail.tag?.map(i => `# ${i}`).join(' ');
        return (
            <>
                <Text style={styles.articleTitleTxt}>{detail.title}</Text>
                <Text style={styles.descTxt}>{detail.desc}</Text>
                <Text style={styles.tagsTxt}>{tags}</Text>
                <Text style={styles.timeAndLocationTxt}>{detail.dateTime}  {detail.location}</Text>
                <View style={styles.line} />
            </>
        );
    }

    const renderComments = () => {
        const { detail } = store;
        const count = detail.comments?.length || 0;
        const { userInfo } = UserStore;

        const styles = StyleSheet.create({
            commentItem: {
                width: '100%',
                flexDirection: 'row',

            },
            commentsCountTxt: {
                fontSize: 14,
                color: '#666',
                marginTop: 20,
                marginLeft: 16,
            },
            inputLayout: {
                width: '100%',
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
            },
            userAvatarImg: {
                width: 32,
                height: 32,
                borderRadius: 16,
                resizeMode: 'cover',
            },
            commentInput: {
                flex: 1,
                height: 32,
                borderRadius: 16,
                marginLeft: 12,
                backgroundColor: '#f0f0f0',
                fontSize: 14,
                color: '#333',
                textAlignVertical: 'center',
                paddingVertical: 0,
                paddingHorizontal: 12,


            },
            commentContainer: {
                paddingHorizontal: 16,
                paddingTop: 16,
                paddingBottom: 32,
            },
            cAvatar: {
                width: 36,
                height: 36,
                resizeMode: 'cover',
                borderRadius: 18,
            },
            contentLayout: {
                flex: 1,
                marginHorizontal: 12,
            },
            nameTxt: {
                fontSize: 12,
                color: '#999',
            },
            messageTxt: {
                fontSize: 14,
                color: '#333',
                marginTop: 6,
            },
            timeLocationTxt: {
                fontSize: 12,
                color: '#bbb',
            },
            countLayout: {
                alignItems: 'center',
            },
            fCount: {
                fontSize: 12,
                color: '#666',
                marginTop: 2,
            },
            divider: {
                marginLeft: 50,
                marginRight: 0,
                height: StyleSheet.hairlineWidth,
                backgroundColor: '#eee',
                marginVertical: 16,
            },
        });
        return (
            <>
                <Text style={styles.commentsCountTxt}>
                    {count ? `共 ${count} 条评论` : '暂无评论'}
                </Text>
                <View style={styles.inputLayout}>
                    <Image style={styles.userAvatarImg} source={{ uri: userInfo.avatar }} />
                    <TextInput style={styles.commentInput}
                        placeholder="说点什么吧，万一火了呢"
                        placeholderTextColor={'#bbb'}
                    />
                </View>
                {!!count && <View style={styles.commentContainer}>
                    {detail.comments?.map((i: ArticleComment, index: number) => {
                        return (
                            <View key={`${index}`}>
                                <View style={styles.commentItem}>
                                    <Image style={styles.cAvatar} source={{ uri: i.avatarUrl }} />
                                    <View style={styles.contentLayout}>
                                        <Text style={styles.nameTxt}>{i.userName}</Text>
                                        <Text style={styles.messageTxt}>
                                            {i.message}
                                            <Text style={styles.timeLocationTxt}>{dayjs(i.dateTime).format('MM-DD')}  {i.location}</Text>
                                        </Text>
                                        {
                                            !!i.children?.length &&
                                            i.children.map((j: ArticleComment, subIndex: number) => {
                                                return (
                                                    <View key={`${index}-${subIndex}`} style={[styles.commentItem, { marginTop: 12, width: SCREEN_WIDTH - 80, }]} >
                                                        <Image style={styles.cAvatar} source={{ uri: j.avatarUrl }} />
                                                        <View style={styles.contentLayout}>
                                                            <Text style={styles.nameTxt}>{j.userName}</Text>
                                                            <Text style={styles.messageTxt}>
                                                                {j.message}
                                                                <Text style={styles.timeLocationTxt}>{dayjs(j.dateTime).format('MM-DD')}  {j.location}</Text>
                                                            </Text>

                                                        </View>
                                                        <View style={styles.countLayout}>
                                                            <Heart
                                                                size={20}
                                                                value={j.isFavorite}
                                                            />
                                                            <Text style={styles.fCount}>{j.favoriteCount}</Text>
                                                        </View>

                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={styles.countLayout}>
                                        <Heart
                                            size={20}
                                            value={i.isFavorite}
                                        />
                                        <Text style={styles.fCount}>{i.favoriteCount}</Text>
                                    </View>

                                </View>
                                <View style={styles.divider} />
                            </View>

                        );
                    })}
                </View >}
            </>
        );
    }

    const renderBottom = () => {
        const { detail } = store;
        return (
            <View style={styles.bottomLayout}>
                <View style={styles.bottomEditLayout}>
                    <Image source={icon_edit_comment} style={styles.editImg} />
                    <TextInput style={styles.bottomCommentInput}
                        placeholder="说点什么"
                        placeholderTextColor={'#333'}
                    />

                </View>
                <Heart value={detail.isFavorite} size={30} />
                <Text style={styles.bottomCount}>{detail.favoriteCount}</Text>
                <Image style={styles.bottomIcon} source={detail.isCollection ? icon_collection_selected : icon_collection} />
                <Text style={styles.bottomCount}>{detail.collectionCount}</Text>
                <Image style={styles.bottomIcon} source={icon_comment} />
                <Text style={styles.bottomCount}>{detail.comments?.length || 0}</Text>

            </View>
        );
    }
    return detail ? (
        <View style={styles.root}>
            {renderTitle()}
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
            >
                {renderImgs()}
                {renderInfo()}
                {renderComments()}
            </ScrollView>
            {renderBottom()}
        </View>
    ) : null;
})

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    titleLayout: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backImg: {
        width: 20,
        height: 20,
    },
    backButton: {
        height: '100%',
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    avatarImg: {
        width: 40,
        height: 40,
        // resizeMode: 'cover',
        borderRadius: 20,
    },
    userNameTxt: {
        fontSize: 15,
        flex: 1,
        color: '#333',
        marginLeft: 16,
    },
    followTxt: {
        paddingHorizontal: 16,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ff2442',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 12,
        color: '#ff2442',
    },
    shareImg: {
        height: 28,
        width: 28,
        marginHorizontal: 16,
    },
    activeDot: {
        width: 6,
        height: 6,
        backgroundColor: '#ff2442',
        borderRadius: 3,
    },
    inActiveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#c0c0c0',
    },
    articleTitleTxt: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        paddingHorizontal: 16,
    },
    descTxt: {
        fontSize: 15,
        color: '#333',
        marginTop: 6,
        paddingHorizontal: 16,
    },
    tagsTxt: {
        fontSize: 15,
        color: '#305090',
        marginTop: 6,
        paddingHorizontal: 16,
    },
    timeAndLocationTxt: {
        fontSize: 12,
        color: '#bbb',
        marginVertical: 16,
        marginLeft: 16,
    },
    line: {
        marginHorizontal: 16,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee',
    },
    bottomLayout: {
        width: '100%',
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    bottomEditLayout: {
        height: 40,
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginRight: 12,

    },
    bottomCommentInput: {
        height: '100%',
        fontSize: 16,
        color: '#333',
        textAlignVertical: 'center',
        paddingVertical: 0,
    },
    bottomCount: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    bottomIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 12,
    },
    editImg: {
        width: 20,
        height: 20,
        tintColor: '#333',
    },

});