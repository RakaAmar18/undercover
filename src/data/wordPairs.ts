import { WordPair } from '../types/game';

// Indonesian word pairs for the Undercover game
export const WORD_PAIRS: WordPair[] = [
    { civilian: 'Sate Ayam', undercover: 'Sate Kambing' },
    { civilian: 'Nasi Goreng', undercover: 'Mie Goreng' },
    { civilian: 'Rendang', undercover: 'Gulai' },
    { civilian: 'Bakso', undercover: 'Mie Ayam' },
    { civilian: 'Gado-Gado', undercover: 'Pecel' },
    { civilian: 'Soto Ayam', undercover: 'Soto Betawi' },
    { civilian: 'Martabak Manis', undercover: 'Martabak Telur' },
    { civilian: 'Es Teh', undercover: 'Es Jeruk' },
    { civilian: 'Kopi', undercover: 'Teh' },
    { civilian: 'Ayam Goreng', undercover: 'Ayam Bakar' },
    { civilian: 'Pisang Goreng', undercover: 'Pisang Rebus' },
    { civilian: 'Tempe', undercover: 'Tahu' },
    { civilian: 'Nasi Uduk', undercover: 'Nasi Kuning' },
    { civilian: 'Kerupuk', undercover: 'Emping' },
    { civilian: 'Sambal', undercover: 'Kecap' },
    { civilian: 'Kue Lapis', undercover: 'Kue Putu' },
    { civilian: 'Es Campur', undercover: 'Es Buah' },
    { civilian: 'Bika Ambon', undercover: 'Kue Pancong' },
    { civilian: 'Gudeg', undercover: 'Opor' },
    { civilian: 'Rawon', undercover: 'Semur' },
];

export const getRandomWordPair = (): WordPair => {
    const randomIndex = Math.floor(Math.random() * WORD_PAIRS.length);
    return WORD_PAIRS[randomIndex];
};
