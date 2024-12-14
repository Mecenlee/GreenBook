import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default () => {
    return (
        <View style={rootStyles.root}>
            <Text>首页</Text>
        </View>
    );
}

const rootStyles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 