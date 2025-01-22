import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";
import icon_heart from '../assets/icon_heart.png';
import icon_heart_empty from '../assets/icon_heart_empty.png';
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";

type Props = {
    value: boolean;
    onValueChanged?: (value: boolean) => void;
    size: number;
}
export default (props: Props) => {
    const [showState, setShowState] = useState<boolean>(false);
    const { value, onValueChanged, size = 20 } = props;
    useEffect(() => {
        setShowState(value);
    }, [value]);

    const scale = useRef<Animated.Value>(new Animated.Value(0)).current;
    const alpha = useRef<Animated.Value>(new Animated.Value(0)).current;

    const onHeartPress = () => {
        const newState = !showState;
        setShowState(newState);
        onValueChanged?.(newState);

        if (newState) {
            alpha.setValue(1);

            const scaleAnim = Animated.timing(scale, {
                toValue: 1.8,
                duration: 300,
                useNativeDriver: false,
            });
            const aplhaAnim = Animated.timing(alpha, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false,
                delay: 200,
            });
            Animated.parallel([scaleAnim, aplhaAnim]).start();
        } else {
            scale.setValue(0);
            alpha.setValue(0);
        }
    }
    return (
        <TouchableOpacity
            onPress={onHeartPress}
        >
            <Image source={showState ? icon_heart : icon_heart_empty} style={[styles.container, { width: size, height: size }]} />
            <Animated.View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size >> 1,
                    borderWidth: size / 20,
                    position: 'absolute',
                    borderColor: '#ff2442',
                    transform: [
                        { scale: scale }
                    ],
                    opacity: alpha,
                }}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
});