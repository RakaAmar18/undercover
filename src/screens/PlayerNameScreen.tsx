import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { ComicText } from '../components/ComicText';
import { ComicButton } from '../components/ComicButton';
import { COLORS, BORDER_RADIUS, BORDER_WIDTH } from '../constants/theme';
import { RootStackParamList } from '../types';

type PlayerNameRouteProp = RouteProp<RootStackParamList, 'PlayerName'>;
type PlayerNameNavProp = NativeStackNavigationProp<RootStackParamList, 'PlayerName'>;

export const PlayerNameScreen = () => {
    const navigation = useNavigation<PlayerNameNavProp>();
    const route = useRoute<PlayerNameRouteProp>();
    const { settings } = route.params;

    // Initialize names with empty strings
    const [names, setNames] = useState<string[]>(Array(settings.totalPlayers).fill(''));
    const scrollViewRef = useRef<ScrollView>(null);

    const handleNameChange = (text: string, index: number) => {
        const newNames = [...names];
        newNames[index] = text;
        setNames(newNames);
    };

    const handleNext = () => {
        // Fill empty names with defaults "Player N"
        const finalNames = names.map((name, index) =>
            name.trim() === '' ? `Player ${index + 1}` : name.trim()
        );

        navigation.navigate('RoleReveal', {
            settings,
            playerNames: finalNames
        });
    };

    return (
        <ScreenContainer>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <ComicText variant="h2" style={styles.title} numberOfLines={1} adjustsFontSizeToFit>WHO ARE YOU?</ComicText>
                    <ComicText variant="body" numberOfLines={1}>Enter player names (optional)</ComicText>
                </View>

                <ScrollView
                    ref={scrollViewRef}
                    style={styles.scroll}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                >
                    {names.map((name, index) => (
                        <View key={index} style={styles.inputRow}>
                            <View style={styles.labelBox}>
                                <ComicText variant="h3" color="white" numberOfLines={1}>P{index + 1}</ComicText>
                            </View>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={(text) => handleNameChange(text, index)}
                                placeholder={`Player ${index + 1}`}
                                placeholderTextColor="#999"
                                maxLength={12}
                            />
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.footer}>
                    <ComicButton title="START GAME" onPress={handleNext} />
                </View>
            </KeyboardAvoidingView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        textDecorationLine: 'underline',
        marginBottom: 5,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 15,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    labelBox: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.secondary,
        borderRadius: BORDER_RADIUS,
        borderWidth: BORDER_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: 'white',
        borderRadius: BORDER_RADIUS,
        borderWidth: BORDER_WIDTH,
        paddingHorizontal: 15,
        fontFamily: 'Bangers_400Regular',
        fontSize: 24,
        color: 'black',
    },
    footer: {
        padding: 20,
        paddingBottom: 40,
    }
});
