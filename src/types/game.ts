export interface Player {
    id: string;
    name: string;
    role?: 'civilian' | 'undercover';
    word?: string;
    hasViewedWord?: boolean;
}

export interface WordPair {
    civilian: string;
    undercover: string;
}

export interface GameState {
    players: Player[];
    undercoverCount: number;
    currentWordPair: WordPair | null;
    gameStarted: boolean;
    currentPlayerIndex: number;
}
