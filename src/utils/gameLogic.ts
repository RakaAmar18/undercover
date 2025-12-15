import { WORD_BANK, WordPair } from "../assets/words";

export type Role = 'CIVILIAN' | 'UNDERCOVER' | 'MR_WHITE';

export interface Player {
    id: string;
    role: Role;
    word: string; // "???" for Mr. White
    isAlive: boolean;
    name?: string; // Player 1, Player 2...
}

export interface GameSettings {
    totalPlayers: number;
    undercoverCount: number;
    mrWhiteCount: number;
}

export const getRandomWord = (): WordPair => {
    const index = Math.floor(Math.random() * WORD_BANK.length);
    return WORD_BANK[index];
};

export const generatePlayers = (settings: GameSettings, wordPair: WordPair): Player[] => {
    const { totalPlayers, undercoverCount, mrWhiteCount } = settings;
    const civilianCount = totalPlayers - undercoverCount - mrWhiteCount;

    let roles: Role[] = [];

    for (let i = 0; i < civilianCount; i++) roles.push('CIVILIAN');
    for (let i = 0; i < undercoverCount; i++) roles.push('UNDERCOVER');
    for (let i = 0; i < mrWhiteCount; i++) roles.push('MR_WHITE');

    // Shuffle roles
    roles = roles.sort(() => Math.random() - 0.5);

    return roles.map((role, index) => ({
        id: `player-${index + 1}`,
        role,
        word: role === 'CIVILIAN' ? wordPair.civilian : (role === 'UNDERCOVER' ? wordPair.undercover : '???'),
        isAlive: true,
        name: `Player ${index + 1}`
    }));
};

export const checkWinCondition = (players: Player[]) => {
    const alivePlayers = players.filter(p => p.isAlive);
    const civils = alivePlayers.filter(p => p.role === 'CIVILIAN').length;
    const undercovers = alivePlayers.filter(p => p.role === 'UNDERCOVER').length;
    const whites = alivePlayers.filter(p => p.role === 'MR_WHITE').length;

    // Bad guys total
    const badGuys = undercovers + whites;

    if (badGuys === 0) {
        return 'CIVILIAN_WIN';
    }

    // If bad guys outnumber or equal civilians (usually game over in Mafia style, but in Undercover usually it's till 1v1?)
    // Standard Undercover rules:
    // Civilians win if they eliminate all Undercovers and Mr. White.
    // Undercovers win if only 1 Civilian is left (or ratio is met).
    // Actually, usually if Bad Guys >= Civilians, Bad Guys win.

    if (badGuys >= civils) {
        return 'IMPOSTOR_WIN';
    }

    return 'ONGOING';
};
