import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../components/ScreenContainer';
import { ComicText } from '../components/ComicText';
import { ComicButton } from '../components/ComicButton';
import { COLORS } from '../constants/theme';
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
            <View style={styles.card}>
                <ComicText variant="h1" style={styles.title} color={color} outline>{title}</ComicText>

                <ComicText variant="h3" style={{ marginBottom: 10 }}>Roles Revealed:</ComicText>
                <ScrollView style={styles.list}>
                    {players.map(p => (
                        <View key={p.id} style={styles.row}>
                            <ComicText variant="body" style={{ fontWeight: 'bold' }}>{p.name}</ComicText>
                            <ComicText variant="body">{p.role} ({p.word})</ComicText>
                        </View>
                    ))}
                </ScrollView>

                <ComicButton
                    title="PLAY AGAIN"
                    onPress={() => navigation.popToTop()}
                    style={{ marginTop: 20 }}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'black',
        alignItems: 'center',
        maxHeight: '80%',
    },
    title: {
        textAlign: 'center',
        fontSize: 50,
        marginBottom: 30,
        transform: [{ rotate: '-2deg' }],
    },
    list: {
        width: '100%',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 4,
    }
});
