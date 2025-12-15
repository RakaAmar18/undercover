import { GameSettings, Player } from './utils/gameLogic';

export type RootStackParamList = {
    Home: undefined;
    Rules: undefined;
    Setup: undefined;
    RoleReveal: { settings: GameSettings };
    Game: { players: Player[] };
    Result: { winner: 'CIVILIAN' | 'UNDERCOVER' | 'MR_WHITE', players: Player[] };
};
