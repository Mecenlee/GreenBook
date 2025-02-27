import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Modal, StyleSheet } from 'react-native';

import icon_group from '../../assets/icon_group.png';
import icon_create_group from '../../assets/icon_create_group.png';


export interface FloatMenuRef {
    show: (pageY: number) => void;
    hide: () => void;
}

export default forwardRef((props: any, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [y, setY] = useState<number>(100);

    const show = (pageY: number) => {
        setY(pageY);
        setVisible(true);
    };

    const hide = () => {
        setVisible(false);
    };

    // ref转发
    useImperativeHandle(ref, () => {
        return {
            show, hide,
        };
    });

    const renderMenus = () => {
        const styles = StyleSheet.create({
            layout: {
                width: 170,
                backgroundColor: 'white',
                borderRadius: 16,
                position: 'absolute',
                right: 10,
            },
            menuItem: {
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                height: 56,
                paddingLeft: 20,
            },
            menuIcon: {
                width: 28,
                height: 28,
            },
            menuTxt: {
                fontSize: 17,
                color: '#333',
                marginLeft: 16,
            },
            line: {
                height: StyleSheet.hairlineWidth,
                backgroundColor: '#eee',
                marginHorizontal: 20,
            },
        });
        return (
            <View style={[styles.layout, { top: y }]}>
                <TouchableOpacity style={styles.menuItem}>
                    <Image source={icon_group} style={styles.menuIcon} />
                    <Text style={styles.menuTxt}>群聊广场</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity style={styles.menuItem}>
                    <Image source={icon_create_group} style={styles.menuIcon} />
                    <Text style={styles.menuTxt}>加入群聊</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
            statusBarTranslucent={true}
            animationType="fade"
            onRequestClose={hide}
        >
            <TouchableOpacity style={styles.root}
                onPress={hide}
            >
                {renderMenus()}
            </TouchableOpacity>
        </Modal>
    );
});

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00000040',
    },
});
