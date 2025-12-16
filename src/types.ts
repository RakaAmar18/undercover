import { GameSettings, Player } from './utils/gameLogic';

export type RootStackParamList = {
    Home: undefined;
    Rules: undefined;
    Setup: undefined;
    PlayerName: { settings: GameSettings };
    RoleReveal: { settings: GameSettings, playerNames: string[] };
    Game: { players: Player[] };
    Result: { winner: 'CIVILIAN' | 'UNDERCOVER' | 'MR_WHITE', players: Player[] };
};
