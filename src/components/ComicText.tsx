import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface ComicTextProps extends TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'label';
    color?: string;
    outline?: boolean;
}

export const ComicText: React.FC<ComicTextProps> = ({
    style,
    variant = 'body',
    color = COLORS.text,
    outline = false,
    ...props
}) => {
    const getStyle = () => {
        switch (variant) {
            case 'h1': return styles.h1;
            case 'h2': return styles.h2;
            case 'h3': return styles.h3;
            case 'label': return styles.label;
            default: return styles.body;
        }
    };

    const textStyle = [
        getStyle(),
        { color },
        outline && styles.outline,
        style
    ];

    return <Text style={textStyle} {...props} />;
};

const styles = StyleSheet.create({
    h1: {
        fontFamily: 'Bangers_400Regular',
        fontSize: 48,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    h2: {
        fontFamily: 'Bangers_400Regular',
        fontSize: 32,
        letterSpacing: 1.5,
    },
    h3: {
        fontFamily: 'Bangers_400Regular',
        fontSize: 24,
        letterSpacing: 1,
    },
    label: {
        fontFamily: 'System', // Fallback or a slightly bold sans
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    body: {
        fontFamily: 'System',
        fontSize: 16,
    },
    outline: {
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 0, // Hard shadow for comic effect
    },
});
