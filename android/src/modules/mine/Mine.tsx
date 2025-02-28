import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { styles } from "../../components/slidePager/style";


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
import UserStore from "../../stores/UserStore";

export default () => {

    const { userInfo } = UserStore;

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
                <TouchableOpacity style={styles.menuButton}>
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
                color: 'white',
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
                marginBottom: 36,
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
        return (
            <>
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
                        <Text style={styles.infoValue}>14</Text>
                        <Text style={styles.infoLabel}>关注</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoValue}>7</Text>
                        <Text style={styles.infoLabel}>粉丝</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoValue}>0</Text>
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
            </>
        );
    }

    return (
        <View style={rootStyles.root}>
            <Image source={icon_mine_bg} style={rootStyles.bgImg} />
            {renderTitle()}
            <ScrollView style={rootStyles.scrollView}>
                {renderInfo()}
            </ScrollView>
        </View>
    );
}

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
    }
}); 