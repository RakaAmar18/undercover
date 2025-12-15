export type WordPair = {
    civilian: string;
    undercover: string;
    category: string;
};

export const WORD_BANK: WordPair[] = [
    // --- MAKANAN & MINUMAN ---
    { civilian: 'Kopi', undercover: 'Teh', category: 'Minuman' },
    { civilian: 'Nasi Goreng', undercover: 'Mie Goreng', category: 'Makanan' },
    { civilian: 'Sate Ayam', undercover: 'Sate Kambing', category: 'Makanan' },
    { civilian: 'Bakso', undercover: 'Soto', category: 'Makanan' },
    { civilian: 'Burger', undercover: 'Sandwich', category: 'Makanan' },
    { civilian: 'Pizza', undercover: 'Pasta', category: 'Makanan' },
    { civilian: 'Es Krim', undercover: 'Yoghurt', category: 'Dessert' },
    { civilian: 'Cokelat', undercover: 'Keju', category: 'Makanan' },
    { civilian: 'Roti', undercover: 'Donat', category: 'Makanan' },
    { civilian: 'Susu', undercover: 'Santan', category: 'Bahan' },
    { civilian: 'Gula', undercover: 'Garam', category: 'Bumbu' },
    { civilian: 'Mentega', undercover: 'Margarin', category: 'Bahan' },
    { civilian: 'Kecap', undercover: 'Saus', category: 'Bumbu' },
    { civilian: 'Tahu', undercover: 'Tempe', category: 'Makanan' },
    { civilian: 'Lontong', undercover: 'Ketupat', category: 'Makanan' },
    { civilian: 'Bubur Ayam', undercover: 'Bubur Kacang Ijo', category: 'Makanan' },

    // --- SAYURAN (Tricky) ---
    { civilian: 'Bayam', undercover: 'Kangkung', category: 'Sayuran' },
    { civilian: 'Brokoli', undercover: 'Kembang Kol', category: 'Sayuran' },
    { civilian: 'Wortel', undercover: 'Lobak', category: 'Sayuran' },
    { civilian: 'Sawi', undercover: 'Selada', category: 'Sayuran' },
    { civilian: 'Bawang Merah', undercover: 'Bawang Bombay', category: 'Sayuran' },
    { civilian: 'Seledri', undercover: 'Daun Bawang', category: 'Sayuran' },
    { civilian: 'Tomat', undercover: 'Cabai', category: 'Sayuran' },
    { civilian: 'Kentang', undercover: 'Ubi', category: 'Sayuran' },
    { civilian: 'Jamur', undercover: 'Tauge', category: 'Sayuran' },
    { civilian: 'Kacang Panjang', undercover: 'Buncis', category: 'Sayuran' },

    // --- BUAH-BUAHAN (Tricky) ---
    { civilian: 'Jeruk', undercover: 'Lemon', category: 'Buah' },
    { civilian: 'Melon', undercover: 'Semangka', category: 'Buah' },
    { civilian: 'Apel', undercover: 'Pir', category: 'Buah' },
    { civilian: 'Anggur', undercover: 'Blueberry', category: 'Buah' },
    { civilian: 'Nangka', undercover: 'Durian', category: 'Buah' },
    { civilian: 'Mangga', undercover: 'Pepaya', category: 'Buah' },
    { civilian: 'Dukuh', undercover: 'Langsat', category: 'Buah' },
    { civilian: 'Rambutan', undercover: 'Leci', category: 'Buah' },
    { civilian: 'Salak', undercover: 'Nanas', category: 'Buah' },
    { civilian: 'Alpukat', undercover: 'Jambu Biji', category: 'Buah' },
    { civilian: 'Pisang', undercover: 'Jagung', category: 'Buah/Sayur' }, // Shape similarity
    { civilian: 'Stroberi', undercover: 'Ceri', category: 'Buah' },

    // --- HEWAN (Tricky) ---
    { civilian: 'Kucing', undercover: 'Anjing', category: 'Hewan' },
    { civilian: 'Singa', undercover: 'Harimau', category: 'Hewan' },
    { civilian: 'Elang', undercover: 'Rajawali', category: 'Hewan' },
    { civilian: 'Kuda', undercover: 'Keledai', category: 'Hewan' }, // Closer than Zebra
    { civilian: 'Kambing', undercover: 'Domba', category: 'Hewan' },
    { civilian: 'Ayam', undercover: 'Bebek', category: 'Hewan' },
    { civilian: 'Ular', undercover: 'Belut', category: 'Hewan' }, // Shape
    { civilian: 'Hiu', undercover: 'Paus', category: 'Hewan' },
    { civilian: 'Semut', undercover: 'Rayap', category: 'Hewan' },
    { civilian: 'Nyamuk', undercover: 'Lalat', category: 'Hewan' },
    { civilian: 'Kupu-kupu', undercover: 'Ngengat', category: 'Hewan' },
    { civilian: 'Kura-kura', undercover: 'Penyu', category: 'Hewan' },
    { civilian: 'Buaya', undercover: 'Komodo', category: 'Hewan' },
    { civilian: 'Katak', undercover: 'Kodok', category: 'Hewan' },
    { civilian: 'Lebah', undercover: 'Tawon', category: 'Hewan' },

    // --- FILM & KARTUN & POP CULTURE ---
    { civilian: 'Harry Potter', undercover: 'Lord of the Rings', category: 'Film' },
    { civilian: 'Star Wars', undercover: 'Star Trek', category: 'Film' },
    { civilian: 'Avengers', undercover: 'Justice League', category: 'Film' },
    { civilian: 'Batman', undercover: 'Iron Man', category: 'Tokoh' }, // Rich guys with gadgets
    { civilian: 'Superman', undercover: 'Thor', category: 'Tokoh' }, // Strong flying guys with capes
    { civilian: 'Spiderman', undercover: 'Ant-Man', category: 'Tokoh' }, // Bug heroes
    { civilian: 'Naruto', undercover: 'Dragon Ball', category: 'Anime' },
    { civilian: 'Doraemon', undercover: 'Ninja Hattori', category: 'Anime' },
    { civilian: 'Upin & Ipin', undercover: 'BoBoiBoy', category: 'Kartun' },
    { civilian: 'Spongebob', undercover: 'Minions', category: 'Kartun' },
    { civilian: 'Mickey Mouse', undercover: 'Tom & Jerry', category: 'Kartun' },
    { civilian: 'Frozen', undercover: 'Moana', category: 'Film' },
    { civilian: 'Toy Story', undercover: 'Cars', category: 'Film' },
    { civilian: 'Squid Game', undercover: 'Alice in Borderland', category: 'Series' },
    { civilian: 'Joker', undercover: 'Pennywise', category: 'Tokoh' }, // Clowns

    // --- TEMPAT & BRAND ---
    { civilian: 'Indomaret', undercover: 'Alfamart', category: 'Tempat' },
    { civilian: 'Gojek', undercover: 'Grab', category: 'App' },
    { civilian: 'Facebook', undercover: 'Instagram', category: 'App' },
    { civilian: 'WhatsApp', undercover: 'Telegram', category: 'App' },
    { civilian: 'Youtube', undercover: 'TikTok', category: 'App' },
    { civilian: 'Hotel', undercover: 'Apartemen', category: 'Tempat' },
    { civilian: 'Sekolah', undercover: 'Kampus', category: 'Tempat' },
    { civilian: 'Bioskop', undercover: 'Netflix', category: 'Hiburan' },
    { civilian: 'Pantai', undercover: 'Kolam Renang', category: 'Tempat' },

    // --- OBJEK & KONSEP ---
    { civilian: 'Emas', undercover: 'Perak', category: 'Benda' },
    { civilian: 'Uang', undercover: 'Kartu Kredit', category: 'Benda' },
    { civilian: 'Jam Tangan', undercover: 'Jam Dinding', category: 'Benda' },
    { civilian: 'Topi', undercover: 'Helm', category: 'Benda' },
    { civilian: 'Kacamata', undercover: 'Lensa Kontak', category: 'Benda' },
    { civilian: 'Gitar', undercover: 'Biola', category: 'Alat Musik' },
    { civilian: 'Piano', undercover: 'Keyboard', category: 'Alat Musik' },
    { civilian: 'Mobil', undercover: 'Bus', category: 'Kendaraan' },
    { civilian: 'Motor', undercover: 'Sepeda', category: 'Kendaraan' },
    { civilian: 'Matahari', undercover: 'Bulan', category: 'Alam' },
    { civilian: 'Bintang', undercover: 'Lampu', category: 'Benda' },
    { civilian: 'Hujan', undercover: 'Salju', category: 'Alam' },
    { civilian: 'Angin', undercover: 'Kipas', category: 'Benda' },

    // --- ABSTRAK (Sangat Mirip) ---
    { civilian: 'Cinta', undercover: 'Sayang', category: 'Perasaan' },
    { civilian: 'Sedih', undercover: 'Kecewa', category: 'Perasaan' },
    { civilian: 'Marah', undercover: 'Benci', category: 'Perasaan' },
    { civilian: 'Takut', undercover: 'Khawatir', category: 'Perasaan' },
    { civilian: 'Senang', undercover: 'Bahagia', category: 'Perasaan' },
    { civilian: 'Pintar', undercover: 'Licik', category: 'Sifat' },
    { civilian: 'Berani', undercover: 'Nekat', category: 'Sifat' },
    { civilian: 'Hemat', undercover: 'Pelit', category: 'Sifat' },
    { civilian: 'Sombong', undercover: 'Percaya Diri', category: 'Sifat' },
    { civilian: 'Bohong', undercover: 'Rahasia', category: 'Konsep' },

    // --- LEBIH BANYAK LAGI (Batch 2) ---
    // Olahraga
    { civilian: 'Sepak Bola', undercover: 'Futsal', category: 'Olahraga' },
    { civilian: 'Tenis', undercover: 'Bulutangkis', category: 'Olahraga' },
    { civilian: 'Basket', undercover: 'Voli', category: 'Olahraga' },
    { civilian: 'Renang', undercover: 'Menyelam', category: 'Olahraga' },
    { civilian: 'Lari', undercover: 'Jalan Cepat', category: 'Olahraga' },
    { civilian: 'Tinju', undercover: 'Karate', category: 'Olahraga' },

    // Profesi Mirip
    { civilian: 'Penjahit', undercover: 'Desainer', category: 'Profesi' },
    { civilian: 'Fotografer', undercover: 'Videografer', category: 'Profesi' },
    { civilian: 'Aktor', undercover: 'Sutradara', category: 'Profesi' },
    { civilian: 'Montir', undercover: 'Insinyur', category: 'Profesi' },
    { civilian: 'Satpam', undercover: 'Polisi', category: 'Profesi' },
    { civilian: 'Hakim', undercover: 'Jaksa', category: 'Profesi' },

    // Teknologi
    { civilian: 'Laptop', undercover: 'Komputer', category: 'Teknologi' },
    { civilian: 'Wifi', undercover: 'Kuota Data', category: 'Teknologi' },
    { civilian: 'Mouse', undercover: 'Touchpad', category: 'Teknologi' },
    { civilian: 'Earphone', undercover: 'Headset', category: 'Teknologi' },
    { civilian: 'Google', undercover: 'Yahoo', category: 'Teknologi' },
    { civilian: 'Android', undercover: 'iPhone', category: 'Teknologi' },

    // Makanan & Masakan (Lanjutan)
    { civilian: 'Rawon', undercover: 'Soto Daging', category: 'Makanan' },
    { civilian: 'Gudeg', undercover: 'Opor', category: 'Makanan' },
    { civilian: 'Rendang', undercover: 'Dendeng', category: 'Makanan' },
    { civilian: 'Pempek', undercover: 'Batagor', category: 'Makanan' },
    { civilian: 'Siomay', undercover: 'Dimsum', category: 'Makanan' },
    { civilian: 'Kerupuk', undercover: 'Keripik', category: 'Makanan' },
    { civilian: 'Sambal', undercover: 'Saus Tomat', category: 'Makanan' },

    // Alam & Lingkungan
    { civilian: 'Sungai', undercover: 'Danau', category: 'Alam' },
    { civilian: 'Hutan', undercover: 'Kebun', category: 'Alam' },
    { civilian: 'Pasir', undercover: 'Debu', category: 'Alam' },
    { civilian: 'Batu', undercover: 'Kerikil', category: 'Alam' },
    { civilian: 'Awan', undercover: 'Asap', category: 'Alam' },
    { civilian: 'Pelangi', undercover: 'Aurora', category: 'Alam' },

    // Brand & Tokoh Indonesia
    { civilian: 'Jokowi', undercover: 'Prabowo', category: 'Tokoh' },
    { civilian: 'Raisa', undercover: 'Isyana', category: 'Tokoh' },
    { civilian: 'Raffi Ahmad', undercover: 'Deddy Corbuzier', category: 'Tokoh' },
    { civilian: 'Indomie', undercover: 'Mie Sedaap', category: 'Brand' },
    { civilian: 'Aqua', undercover: 'Le Minerale', category: 'Brand' },
    { civilian: 'Teh Botol', undercover: 'Teh Pucuk', category: 'Brand' },
    { civilian: 'BCA', undercover: 'Mandiri', category: 'Brand' },
    { civilian: 'Tokopedia', undercover: 'Shopee', category: 'Brand' },

    // Kendaraan
    { civilian: 'Pesawat', undercover: 'Helikopter', category: 'Kendaraan' },
    { civilian: 'Kereta', undercover: 'Tram', category: 'Kendaraan' },
    { civilian: 'Becak', undercover: 'Bajaj', category: 'Kendaraan' },
    { civilian: 'Kapal', undercover: 'Perahu', category: 'Kendaraan' },

    // Random Objects
    { civilian: 'Gunting', undercover: 'Pisau', category: 'Benda' },
    { civilian: 'Sapu', undercover: 'Pel', category: 'Benda' },
    { civilian: 'Handuk', undercover: 'Tisu', category: 'Benda' },
    { civilian: 'Sabun', undercover: 'Sampo', category: 'Benda' },
    { civilian: 'Sikat Gigi', undercover: 'Odol', category: 'Benda' },
    { civilian: 'Bantal', undercover: 'Guling', category: 'Benda' },
    { civilian: 'Selimut', undercover: 'Sarung', category: 'Benda' },
];
