import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
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

    const [peekModalVisible, setPeekModalVisible] = useState(false);
    const [selectedPeekPlayer, setSelectedPeekPlayer] = useState<Player | null>(null);
    const [isPeekRevealed, setIsPeekRevealed] = useState(false);

    const [eliminationModal, setEliminationModal] = useState<{ visible: boolean, player: Player | null, step: 'CONFIRM' | 'REVEAL' }>({
        visible: false,
        player: null,
        step: 'CONFIRM'
    });

    const handleEliminate = (player: Player) => {
        setEliminationModal({
            visible: true,
            player: player,
            step: 'CONFIRM'
        });
    };

    const confirmElimination = () => {
        if (!eliminationModal.player) return;

        // Move to reveal step
        setEliminationModal(prev => ({ ...prev, step: 'REVEAL' }));
    };

    const closeEliminationModal = () => {
        if (!eliminationModal.player) return;

        const targetPlayer = eliminationModal.player;
        const updatedPlayers = players.map(p =>
            p.id === targetPlayer.id ? { ...p, isAlive: false } : p
        );

        setPlayers(updatedPlayers);
        setEliminationModal({ visible: false, player: null, step: 'CONFIRM' }); // Reset

        // Check win condition AFTER state update (using local const)
        const status = checkWinCondition(updatedPlayers);
        if (status !== 'ONGOING') {
            navigation.replace('Result', {
                winner: status === 'CIVILIAN_WIN' ? 'CIVILIAN' : 'UNDERCOVER',
                players: updatedPlayers
            });
        }
    };

    const handlePeekRequest = (player: Player) => {
        setSelectedPeekPlayer(player);
        setIsPeekRevealed(false);
    };

    const handlePeekReveal = () => {
        setIsPeekRevealed(true);
    };

    const handlePeekClose = () => {
        setPeekModalVisible(false);
        setSelectedPeekPlayer(null);
        setIsPeekRevealed(false);
    };

    const renderPlayer = ({ item }: { item: Player }) => (
        <View style={[styles.playerRow, !item.isAlive && styles.deadPlayer]}>
            <View style={styles.playerInfo}>
                <View style={[styles.avatar, { backgroundColor: item.isAlive ? COLORS.primary : COLORS.gray }]}>
                    <ComicText variant="h2">{item.name?.split(' ')[1] ? item.name?.split(' ')[0][0] + item.name?.split(' ')[1][0] : item.name?.substring(0, 2)}</ComicText>
                </View>
                <View>
                    <ComicText variant="h3" numberOfLines={1} style={!item.isAlive && { textDecorationLine: 'line-through', color: COLORS.text }}>
                        {item.name}
                    </ComicText>
                    {!item.isAlive && <ComicText variant="label" color={COLORS.accent}>ELIMINATED</ComicText>}
                </View>
            </View>

            {item.isAlive && (
                <TouchableOpacity
                    style={styles.voteBtn}
                    onPress={() => handleEliminate(item)}
                >
                    <ComicText variant="h3" color="white">❌</ComicText>
                </TouchableOpacity>
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

            <View style={styles.footer}>
                <ComicButton
                    title="LUPA KATA? (DANGER!)"
                    variant="secondary"
                    onPress={() => setPeekModalVisible(true)}
                />
            </View>

            {/* Elimination Modal */}
            {eliminationModal.visible && eliminationModal.player && (
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { borderColor: eliminationModal.step === 'CONFIRM' ? COLORS.accent : 'black' }]}>
                        {eliminationModal.step === 'CONFIRM' ? (
                            <>
                                <ComicText variant="h2" color={COLORS.accent}>ELIMINATE?</ComicText>
                                <ComicText variant="body" style={{ textAlign: 'center', marginVertical: 20 }}>
                                    Are you sure you want to kick <ComicText variant="body" style={{ fontWeight: 'bold' }}>{eliminationModal.player.name}</ComicText>?
                                </ComicText>
                                <View style={{ gap: 10, width: '100%' }}>
                                    <ComicButton
                                        title="YES, KICK THEM!"
                                        variant="danger"
                                        onPress={confirmElimination}
                                    />
                                    <ComicButton
                                        title="CANCEL"
                                        variant="secondary"
                                        onPress={() => setEliminationModal({ visible: false, player: null, step: 'CONFIRM' })}
                                    />
                                </View>
                            </>
                        ) : (
                            <>
                                <ComicText variant="h2">IDENTITY REVEALED</ComicText>
                                <View style={{ marginVertical: 20, alignItems: 'center' }}>
                                    <ComicText variant="h1" color={eliminationModal.player.role === 'CIVILIAN' ? COLORS.success : COLORS.accent} outline>
                                        {eliminationModal.player.role}
                                    </ComicText>
                                    <View style={styles.wordBox}>
                                        <ComicText variant="h2" color={COLORS.primary} outline>{eliminationModal.player.word}</ComicText>
                                    </View>
                                </View>
                                <ComicButton
                                    title="CONTINUE"
                                    onPress={closeEliminationModal}
                                />
                            </>
                        )}
                    </View>
                </View>
            )}

            {peekModalVisible && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {!selectedPeekPlayer ? (
                            <>
                                <ComicText variant="h3" style={{ marginBottom: 20 }}>SIAPA KAMU?</ComicText>
                                <FlatList
                                    data={players.filter(p => p.isAlive)}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.peekItem}
                                            onPress={() => handlePeekRequest(item)}
                                        >
                                            <ComicText variant="body">{item.name}</ComicText>
                                        </TouchableOpacity>
                                    )}
                                />
                                <ComicButton title="CANCEL" onPress={() => setPeekModalVisible(false)} variant="secondary" style={{ marginTop: 20 }} />
                            </>
                        ) : !isPeekRevealed ? (
                            <>
                                <ComicText variant="h2" color={COLORS.accent}>STOP!</ComicText>
                                <ComicText variant="body" style={{ textAlign: 'center', marginVertical: 20 }}>
                                    Oper HP ke <ComicText variant="h3">{selectedPeekPlayer.name}</ComicText>
                                </ComicText>
                                <ComicButton title="SAYA SUDAH PEGANG HP" onPress={handlePeekReveal} />
                                <ComicButton title="BATAL" onPress={() => setSelectedPeekPlayer(null)} variant="secondary" style={{ marginTop: 10 }} />
                            </>
                        ) : (
                            <>
                                <ComicText variant="h3">KATAMU ADALAH:</ComicText>
                                <View style={styles.wordBox}>
                                    <ComicText variant="h1" color={COLORS.primary} outline>{selectedPeekPlayer.word}</ComicText>
                                </View>
                                <ComicButton title="TUTUP SEKARANG" onPress={handlePeekClose} />
                            </>
                        )}
                    </View>
                </View>
            )}
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
        paddingBottom: 100, // Space for footer
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
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: BORDER_RADIUS,
        borderWidth: BORDER_WIDTH,
        alignItems: 'center',
    },
    peekItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        width: '100%',
        alignItems: 'center',
    },
    wordBox: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: BORDER_RADIUS,
        marginVertical: 20,
        transform: [{ rotate: '-2deg' }],
    },
    voteBtn: {
        backgroundColor: COLORS.accent,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'black',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
    }
});
