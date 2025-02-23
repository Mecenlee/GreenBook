import { observer, useLocalStore } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArticleDetailStore from "./ArticleDetailStore";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import icon_arrow from '../../assets/icon_arrow.png';
import icon_share from '../../assets/icon_share.png';
import { StackNavigationProp } from "@react-navigation/stack";
import { ImageSlider } from "../../components/slidePager";


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
        return (
            <View>

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
            </ScrollView>
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
});