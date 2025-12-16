import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { ComicText } from '../components/ComicText';
import { ComicButton } from '../components/ComicButton';
import { COLORS } from '../constants/theme';
import { RootStackParamList } from '../types'; // I'll create this types file later or inline it if small

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <ScreenContainer style={styles.container}>
            <View style={styles.header}>
                <ComicText variant="h1" color={COLORS.primary} outline style={styles.title}>
                    UNDER
                </ComicText>
                <ComicText variant="h1" color={COLORS.accent} outline style={styles.titleBottom}>
                    COVER
                </ComicText>
                <ComicText variant="h3" style={styles.subtitle}>
                    Siapa Pengkhianatnya?
                </ComicText>
            </View>

            <View style={styles.menu}>
                <ComicButton
                    title="PLAY GAME"
                    onPress={() => navigation.navigate('Setup')}
                    style={styles.button}
                />
                <ComicButton
                    title="RULES"
                    variant="secondary"
                    onPress={() => navigation.navigate('Rules')}
                    style={styles.button}
                />
            </View>

            <View style={styles.footer}>
                <ComicText variant="label" style={styles.footerText}>CodeByRaka</ComicText>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 40, // Push visual center down slightly
    },
    header: {
        alignItems: 'center',
        marginBottom: 60,
        transform: [{ rotate: '-5deg' }], // Jaunty angle
    },
    title: {
        fontSize: 64,
        lineHeight: 70,
    },
    titleBottom: {
        fontSize: 64,
        lineHeight: 70,
        marginTop: -20,
    },
    subtitle: {
        marginTop: 10,
        transform: [{ rotate: '5deg' }],
        backgroundColor: 'black',
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    menu: {
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        marginBottom: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    footerText: {
        color: 'black',
        opacity: 0.5,
    }
});
