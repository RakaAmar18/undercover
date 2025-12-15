import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import Svg, { Circle, Pattern, Defs, Rect } from 'react-native-svg';
import { COLORS } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';

export const ScreenContainer: React.FC<ViewProps> = ({ children, style, ...props }) => {
    return (
        <View style={[styles.container, style]} {...props}>
            <StatusBar style="dark" />
            <View style={StyleSheet.absoluteFill}>
                <Svg height="100%" width="100%">
                    <Defs>
                        <Pattern
                            id="dots"
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <Circle x="10" y="10" r="2" fill={COLORS.gray} opacity="0.5" />
                        </Pattern>
                    </Defs>
                    <Rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <Rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
                </Svg>
            </View>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        padding: 20,
    },
});
