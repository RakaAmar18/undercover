import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { ComicText } from '../components/ComicText';
import { ComicButton } from '../components/ComicButton';
import { COLORS, BORDER_WIDTH, BORDER_RADIUS } from '../constants/theme';
import { RootStackParamList } from '../types';

type SetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Setup'>;

const Counter = ({ label, value, min, max, onChange }: { label: string, value: number, min: number, max: number, onChange: (v: number) => void }) => (
    <View style={styles.counterContainer}>
        <View style={{ flex: 1, paddingRight: 10 }}>
            <ComicText variant="h3" numberOfLines={1} adjustsFontSizeToFit>{label}</ComicText>
        </View>
        <View style={styles.counterControls}>
            <TouchableOpacity
                style={[styles.counterBtn, value <= min && styles.counterBtnDisabled]}
                onPress={() => value > min && onChange(value - 1)}
                disabled={value <= min}
            >
                <ComicText variant="h2">-</ComicText>
            </TouchableOpacity>

            <View style={styles.valueBox}>
                <ComicText variant="h2">{value}</ComicText>
            </View>

            <TouchableOpacity
                style={[styles.counterBtn, value >= max && styles.counterBtnDisabled]}
                onPress={() => value < max && onChange(value + 1)}
                disabled={value >= max}
            >
                <ComicText variant="h2">+</ComicText>
            </TouchableOpacity>
        </View>
    </View>
);

export const SetupScreen = () => {
    const navigation = useNavigation<SetupScreenNavigationProp>();
    const [totalPlayers, setTotalPlayers] = useState(4);
    const [undercovers, setUndercovers] = useState(1);
    // Optional: Mr White toggled
    const [hasMrWhite, setHasMrWhite] = useState(false);
    const [mrWhite, setMrWhite] = useState(1); // Default to 1 if enabled

    // Effective count
    const actualMrWhite = hasMrWhite ? mrWhite : 0;

    const isValid = totalPlayers > (undercovers + actualMrWhite + 1);

    const handleStart = () => {
        navigation.navigate('PlayerName', {
            settings: {
                totalPlayers,
                undercoverCount: undercovers,
                mrWhiteCount: actualMrWhite,
            }
        });
    };

    return (
        <ScreenContainer style={styles.container}>
            <ComicText variant="h2" style={styles.header}>GAME SETUP</ComicText>

            <View style={styles.card}>
                <Counter
                    label="Total Players"
                    value={totalPlayers}
                    min={3}
                    max={20}
                    onChange={setTotalPlayers}
                />

                <Counter
                    label="Undercovers"
                    value={undercovers}
                    min={1}
                    max={totalPlayers - 2}
                    onChange={setUndercovers}
                />

                {/* Mr. White Toggle Section */}
                <View style={styles.toggleRow}>
                    <View style={{ flex: 1 }}>
                        <ComicText variant="h3">Mr. White?</ComicText>
                    </View>
                    <TouchableOpacity
                        style={[styles.toggleBtn, hasMrWhite ? styles.toggleOn : styles.toggleOff]}
                        onPress={() => setHasMrWhite(!hasMrWhite)}
                    >
                        <ComicText variant="h3" color={hasMrWhite ? 'white' : COLORS.text}>
                            {hasMrWhite ? 'YES' : 'NO'}
                        </ComicText>
                    </TouchableOpacity>
                </View>

                {hasMrWhite && (
                    <Counter
                        label="Mr. White Count"
                        value={mrWhite}
                        min={1}
                        max={totalPlayers - undercovers - 2}
                        onChange={setMrWhite}
                    />
                )}
            </View>

            {!isValid && (
                <ComicText variant="body" style={{ color: COLORS.accent, textAlign: 'center', marginVertical: 10 }}>
                    Must have at least 2 Civilians!
                </ComicText>
            )}

            <View style={styles.footer}>
                <ComicButton
                    title="START GAME"
                    onPress={handleStart}
                    style={!isValid ? { opacity: 0.5 } : {}}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    header: {
        textAlign: 'center',
        marginBottom: 30,
        textDecorationLine: 'underline',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: BORDER_RADIUS,
        borderWidth: BORDER_WIDTH,
        borderColor: 'black',
        padding: 20,
        gap: 20,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    counterBtn: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    counterBtnDisabled: {
        backgroundColor: COLORS.gray,
        borderColor: COLORS.gray,
    },
    valueBox: {
        width: 50, // Increased from 40
        alignItems: 'center',
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 2,
        borderTopColor: '#eee',
        marginTop: 10,
        width: '100%', // Ensure full width
    },
    toggleBtn: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
    },
    toggleOn: {
        backgroundColor: COLORS.success,
    },
    toggleOff: {
        backgroundColor: COLORS.gray,
    },
    footer: {
        marginTop: 40,
    }
});
