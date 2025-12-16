import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { ScreenContainer } from '../components/ScreenContainer';
import { ComicText } from '../components/ComicText';
import { ComicButton } from '../components/ComicButton';
import { COLORS, BORDER_RADIUS, BORDER_WIDTH } from '../constants/theme';
import { RootStackParamList } from '../types';
import { generatePlayers, getRandomWord, Player } from '../utils/gameLogic';

type RoleRevealRouteProp = RouteProp<RootStackParamList, 'RoleReveal'>;
type RoleRevealNavProp = NativeStackNavigationProp<RootStackParamList, 'RoleReveal'>;

export const RoleRevealScreen = () => {
    const navigation = useNavigation<RoleRevealNavProp>();
    const route = useRoute<RoleRevealRouteProp>();
    const { settings, playerNames } = route.params;

    const [players, setPlayers] = useState<Player[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false); // Card face up or down

    // Generate players on mount
    useEffect(() => {
        const wordPair = getRandomWord();
        // Modify generatePlayers to accept names, or map them afterwards
        // Since generatePlayers probably generates "Player N", we can map over it
        const generatedPlayers = generatePlayers(settings, wordPair);

        // Overwrite names if provided
        const namedPlayers = generatedPlayers.map((p, i) => ({
            ...p,
            name: playerNames && playerNames[i] ? playerNames[i] : p.name
        }));

        setPlayers(namedPlayers);
    }, []);

    const currentPlayer = players[currentIndex];

    const handleReveal = () => {
        setIsRevealed(true);
    };

    const handleNext = () => {
        setIsRevealed(false);
        if (currentIndex < players.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            navigation.replace('Game', { players });
        }
    };

    if (!currentPlayer) return <ScreenContainer><ComicText>Loading...</ComicText></ScreenContainer>;

    return (
        <ScreenContainer style={styles.container}>
            <View style={styles.header}>
                <ComicText variant="h3">PLAYER {currentIndex + 1} / {players.length}</ComicText>
            </View>

            <View style={styles.cardContainer}>
                {!isRevealed ? (
                    <TouchableOpacity style={styles.cardBack} onPress={handleReveal} activeOpacity={0.9}>
                        <ComicText variant="h1" color="white" style={styles.questionMark}>?</ComicText>
                        <ComicText variant="h3" color="white">TAP TO REVEAL</ComicText>
                        <ComicText variant="body" color="white" style={{ marginTop: 10 }}>Pass to {players[currentIndex]?.name || `Player ${currentIndex + 1}`}</ComicText>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.cardFront}>
                        <ComicText variant="h2" style={{ marginBottom: 20 }}>SECRET WORD</ComicText>
                        <View style={styles.wordBox}>
                            <ComicText variant="h1" color={COLORS.primary} outline adjustsFontSizeToFit numberOfLines={1}>{currentPlayer.word}</ComicText>
                        </View>
                        <ComicText variant="body" style={{ marginTop: 20, textAlign: 'center' }}>
                            Remember your word!{"\n"}Don't let others see it!
                        </ComicText>
                    </View>
                )}
            </View>

            <View style={styles.footer}>
                {isRevealed && (
                    <ComicButton
                        title={currentIndex === players.length - 1 ? "START GAME" : "NEXT PLAYER"}
                        onPress={handleNext}
                    />
                )}
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBack: {
        width: 300,
        height: 400,
        backgroundColor: COLORS.text, // Black card back
        borderRadius: BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'white',
        // Comic pattern on back?
    },
    cardFront: {
        width: 300,
        height: 400,
        backgroundColor: 'white',
        borderRadius: BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'black',
        padding: 20,
        shadowColor: 'black',
        shadowOffset: { width: 8, height: 8 }, // Deep shadow
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    questionMark: {
        fontSize: 120,
        marginBottom: 20,
    },
    wordBox: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: BORDER_RADIUS,
        transform: [{ rotate: '-2deg' }],
    },
    footer: {
        height: 80,
        justifyContent: 'center',
    }
});
