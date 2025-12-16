import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withSequence } from 'react-native-reanimated';
import { COLORS, BORDER_WIDTH, BORDER_RADIUS } from '../constants/theme';
import { ComicText } from './ComicText';

interface ComicButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'accent' | 'danger';
    style?: ViewStyle;
}

export const ComicButton: React.FC<ComicButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    style
}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
        onPress();
    };

    const getColors = () => {
        switch (variant) {
            case 'secondary': return { bg: COLORS.secondary, text: 'white' };
            case 'accent': return { bg: COLORS.accent, text: 'white' };
            case 'danger': return { bg: COLORS.warning, text: 'white' };
            default: return { bg: COLORS.primary, text: 'black' };
        }
    };

    const colors = getColors();

    return (
        <Animated.View style={[animatedStyle, style]}>
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[
                    styles.container,
                    { backgroundColor: colors.bg }
                ]}
            >
                <ComicText variant="h3" color={colors.text} style={styles.text} numberOfLines={1} adjustsFontSizeToFit>{title}</ComicText>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: BORDER_RADIUS,
        borderWidth: BORDER_WIDTH,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        // Hard shadow
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5, // Android fallback (not perfect hard shadow but okay)
        marginBottom: 8, // Make space for the shadow
        marginRight: 4,
    },
    text: {
        textAlign: 'center',
    }
});
