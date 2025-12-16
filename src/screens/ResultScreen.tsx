import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { ComicText } from '../components/ComicText';
import { ComicButton } from '../components/ComicButton';
import { COLORS, BORDER_RADIUS } from '../constants/theme';
import { RootStackParamList } from '../types';

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;
type ResultScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'Result'>;

export const ResultScreen = () => {
    const navigation = useNavigation<ResultScreenNavProp>();
    const route = useRoute<ResultScreenRouteProp>();
    const { winner, players } = route.params;

    const color = winner === 'CIVILIAN' ? COLORS.success : COLORS.accent;
    const title = winner === 'CIVILIAN' ? 'CIVILIANS WIN!' : 'IMPOSTORS WIN!';

    return (
        <ScreenContainer style={[styles.container, { backgroundColor: color }]}>
            <View style={styles.content}>
                <View style={styles.headerBadge}>
                    <ComicText variant="h1" color="white" style={styles.headerText} numberOfLines={1}>{winner === 'CIVILIAN' ? 'CIVILIANS' : 'IMPOSTORS'}</ComicText>
                    <ComicText variant="h1" color="white" style={styles.headerText} numberOfLines={1}>WIN!</ComicText>
                </View>

                <View style={styles.card}>
                    <ComicText variant="h3" style={{ marginBottom: 15, textDecorationLine: 'underline' }} numberOfLines={1}>MISSION REPORT</ComicText>
                    <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
                        {players.map(p => (
                            <View key={p.id} style={[styles.row, p.role !== 'CIVILIAN' && styles.impostorRow]}>
                                <View>
                                    <ComicText variant="body" numberOfLines={1} style={{ fontWeight: 'bold' }}>{p.name}</ComicText>
                                    <ComicText variant="label" color={COLORS.gray} numberOfLines={1}>{p.role}</ComicText>
                                </View>
                                <View style={styles.wordBadge}>
                                    <ComicText variant="body" color="white" adjustsFontSizeToFit numberOfLines={1}>{p.word}</ComicText>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    <ComicButton
                        title="PLAY AGAIN"
                        onPress={() => navigation.popToTop()}
                        style={{ marginTop: 20, width: '100%' }}
                    />
                </View>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    headerBadge: {
        marginBottom: 30,
        alignItems: 'center',
        transform: [{ rotate: '-3deg' }],
    },
    headerText: {
        fontSize: 60,
        lineHeight: 65,
        textShadowColor: 'black',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 0,
    },
    card: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: BORDER_RADIUS,
        borderWidth: 4,
        borderColor: 'black',
        alignItems: 'center',
        maxHeight: '70%',
        width: '100%',
        shadowColor: 'black',
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    list: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#F8F9FA',
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
    },
    impostorRow: {
        backgroundColor: '#FFF0F5', // Light pinkish for bad guys
        borderColor: COLORS.accent,
    },
    wordBadge: {
        backgroundColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        transform: [{ rotate: '2deg' }],
    }
});
