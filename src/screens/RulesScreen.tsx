import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/ScreenContainer';
import { ComicText } from '../components/ComicText';
import { ComicButton } from '../components/ComicButton';
import { COLORS, BORDER_RADIUS, BORDER_WIDTH } from '../constants/theme';

export const RulesScreen = () => {
    const navigation = useNavigation();

    return (
        <ScreenContainer style={styles.container}>
            <View style={styles.header}>
                <ComicText variant="h2" style={{ textDecorationLine: 'underline', width: '100%', textAlign: 'center' }} numberOfLines={1} adjustsFontSizeToFit>CARA MAIN</ComicText>
            </View>

            <ScrollView style={styles.scroll}>
                <View style={styles.section}>
                    <ComicText variant="h3" color={COLORS.secondary} numberOfLines={1}>1. PERAN</ComicText>
                    <ComicText variant="body">
                        • <ComicText variant="body" style={{ fontWeight: 'bold' }}>WARGA:</ComicText> Dapat kata yang sama. {"\n"}
                        • <ComicText variant="body" style={{ fontWeight: 'bold' }}>UNDERCOVER:</ComicText> Dapat kata yang sedikit beda. {"\n"}
                        • <ComicText variant="body" style={{ fontWeight: 'bold' }}>MR. WHITE:</ComicText> Tidak dapat kata ("???").
                    </ComicText>
                </View>

                <View style={styles.section}>
                    <ComicText variant="h3" color={COLORS.secondary} numberOfLines={1}>2. CEK KARTU</ComicText>
                    <ComicText variant="body">
                        Oper HP ke pemain lain. Cukup SATU KALI tap untuk lihat kata, lalu oper lagi. Jangan sampai diintip!
                    </ComicText>
                </View>

                <View style={styles.section}>
                    <ComicText variant="h3" color={COLORS.secondary} numberOfLines={1}>3. DISKUSI</ComicText>
                    <ComicText variant="body">
                        Jelaskan katamu dalam SATU kalimat. Jangan terlalu jelas (nanti Mr. White tahu!), tapi jangan terlalu abstrak (nanti kamu dicurigai!).
                    </ComicText>
                </View>

                <View style={styles.section}>
                    <ComicText variant="h3" color={COLORS.secondary} numberOfLines={1}>4. ELIMINASI</ComicText>
                    <ComicText variant="body">
                        Setelah semua bicara, lakukan VOTE untuk menendang pemain yang dicurigai sebagai Impostor.
                    </ComicText>
                </View>

                <View style={styles.section}>
                    <ComicText variant="h3" color={COLORS.secondary} numberOfLines={1}>5. PEMENANG</ComicText>
                    <ComicText variant="body">
                        • <ComicText variant="body" style={{ fontWeight: 'bold' }}>WARGA MENANG</ComicText> jika semua penjahat keluar. {"\n"}
                        • <ComicText variant="body" style={{ fontWeight: 'bold' }}>PENJAHAT MENANG</ComicText> jika jumlah mereka {'>='} Warga.
                    </ComicText>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            <View style={styles.footer}>
                <ComicButton title="SIAP MAIN!" onPress={() => navigation.goBack()} />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    scroll: {
        flex: 1,
        paddingHorizontal: 10,
    },
    section: {
        backgroundColor: 'white',
        borderWidth: BORDER_WIDTH,
        borderRadius: BORDER_RADIUS,
        padding: 15,
        marginBottom: 15,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    footer: {
        paddingVertical: 20,
    }
});
