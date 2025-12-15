import { Player, GameState, WordPair } from '../types/game';

export const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const assignRoles = (
    players: Player[],
    undercoverCount: number,
    wordPair: WordPair
): Player[] => {
    // Shuffle players to randomize role assignment
    const shuffledPlayers = shuffleArray(players);

    return shuffledPlayers.map((player, index) => {
        const isUndercover = index < undercoverCount;
        return {
            ...player,
            role: isUndercover ? 'undercover' : 'civilian',
            word: isUndercover ? wordPair.undercover : wordPair.civilian,
            hasViewedWord: false,
        };
    });
};

export const validateUndercoverCount = (totalPlayers: number, undercoverCount: number): boolean => {
    return undercoverCount > 0 && undercoverCount < totalPlayers;
};

export const generatePlayerId = (): string => {
    return `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
