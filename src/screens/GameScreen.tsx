import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { ComicText } from '../components/ComicText';
import { ComicButton } from '../components/ComicButton';
import { COLORS, BORDER_RADIUS, BORDER_WIDTH } from '../constants/theme';
import { RootStackParamList } from '../types';
import { Player, checkWinCondition } from '../utils/gameLogic';

type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;
type GameScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

export const GameScreen = () => {
    const navigation = useNavigation<GameScreenNavProp>();
    const route = useRoute<GameScreenRouteProp>();

    // Initialize from params, but keep local state for eliminations
    const [players, setPlayers] = useState<Player[]>(route.params.players);
    const [round, setRound] = useState(1);

    const handleEliminate = (player: Player) => {
        Alert.alert(
            "Eliminate Player?",
            `Are you sure you want to eliminate ${player.name}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "ELIMINATE",
                    style: 'destructive',
                    onPress: () => confirmElimination(player)
                }
            ]
        );
    };

    const confirmElimination = (targetPlayer: Player) => {
        // Reveal identity
        Alert.alert(
            "IDENTITY REVEALED!",
            `${targetPlayer.name} was a ${targetPlayer.role}! \nWord: ${targetPlayer.word}`,
            [
                {
                    text: "OK",
                    onPress: () => {
                        const updatedPlayers = players.map(p =>
                            p.id === targetPlayer.id ? { ...p, isAlive: false } : p
                        );
                        setPlayers(updatedPlayers);

                        // Check win condition
                        const status = checkWinCondition(updatedPlayers);
                        if (status !== 'ONGOING') {
                            navigation.replace('Result', {
                                winner: status === 'CIVILIAN_WIN' ? 'CIVILIAN' : 'UNDERCOVER',
                                players: updatedPlayers
                            });
                        }
                    }
                }
            ]
        );
    };

    const renderPlayer = ({ item }: { item: Player }) => (
        <View style={[styles.playerRow, !item.isAlive && styles.deadPlayer]}>
            <View style={styles.playerInfo}>
                <View style={styles.avatar}>
                    <ComicText variant="h2">{item.name?.split(' ')[1]}</ComicText>
                </View>
                <ComicText variant="h3" style={!item.isAlive && { textDecorationLine: 'line-through', color: COLORS.gray }}>
                    {item.name}
                </ComicText>
            </View>

            {item.isAlive ? (
                <ComicButton
                    title="VOTE"
                    variant="danger"
                    onPress={() => handleEliminate(item)}
                    style={{ transform: [{ scale: 0.8 }] }}
                />
            ) : (
                <ComicText variant="label" color={COLORS.accent}>ELIMINATED</ComicText>
            )}
        </View>
    );

    return (
        <ScreenContainer>
            <View style={styles.header}>
                <ComicText variant="h2">GAME ON!</ComicText>
                <ComicText variant="body">Find the impostors.</ComicText>
            </View>

            <FlatList
                data={players}
                renderItem={renderPlayer}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    list: {
        paddingBottom: 40,
    },
    playerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: BORDER_RADIUS,
        borderWidth: 2,
        borderColor: 'black',
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    deadPlayer: {
        backgroundColor: '#F0F0F0',
        borderColor: COLORS.gray,
        shadowOpacity: 0,
    },
    playerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    }
});
