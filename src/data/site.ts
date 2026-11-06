// Seluruh konten situs ada di berkas ini. Ubah di sini, tampilan ikut berubah.

export const nav = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'kegiatan', label: 'Kegiatan' },
  { id: 'prestasi', label: 'Prestasi' },
  { id: 'organisasi', label: 'Organisasi' },
  { id: 'anggota', label: 'Anggota' },
  { id: 'kontak', label: 'Kontak' },
];

export type Kind = 'latihan' | 'kompetisi' | 'komunitas';

export const activities = [
  {
    kind: 'latihan' as Kind, glyph: '♞', tone: 'sand', tag: 'Belajar',
    title: 'Latihan rutin & sparring',
    summary: 'Latihan bersama untuk mengasah dasar permainan, taktik, dan analisis partai.',
    when: 'ISI hari · ISI jam · ISI tempat',
    detail: 'Anggota berlatih bersama lewat sparring dan evaluasi partai. ISI penjelasan singkat: siapa yang boleh ikut, apa yang dipelajari, dan siapa pendampingnya.',
  },
  {
    kind: 'kompetisi' as Kind, glyph: '♜', tone: 'gold', tag: 'Tantangan',
    title: 'Lomba & turnamen',
    summary: 'Mengikuti berbagai lomba catur, dari Gebyar Prestasi 2024 hingga Chess Tournament Medan 2025.',
    when: '6 lomba · 2024–2025',
    detail: 'UPM Catur mengikuti lomba di berbagai penyelenggara, di antaranya Gebyar Prestasi 2024, Open Tournament Alpha Chess Club 2025, dan Pertandingan Catur GBI Rumah Persembahan 2025. Dokumentasi tiap lomba ada di bagian Dokumentasi Lomba di bawah.',
  },
  {
    kind: 'komunitas' as Kind, glyph: '♟\uFE0E♟\uFE0E', tone: 'mist', tag: 'Terhubung',
    title: 'Belajar & berbagi strategi',
    summary: 'Diskusi pembukaan, bedah permainan, dan saling berbagi pengetahuan.',
    when: 'ISI hari · ISI jam · ISI tempat',
    detail: 'Sesi diskusi pembukaan, taktik, strategi akhir permainan, dan bedah partai. ISI hal lain yang memang dilakukan, misalnya pertandingan persahabatan.',
  },
];
// Dokumentasi lomba. `slug` = nama folder foto di src/assets/<slug>/
// Isi `year` jika tahunnya sudah pasti (kosongkan jika belum).
export const lomba = [
  { slug: 'gebyar-prestasi-2024', title: 'Gebyar Prestasi 2024', year: '2024' },
  { slug: 'lomba-hmj-perbankan-syariah', title: 'Lomba di HMJ Perbankan Syariah', year: '' },
  { slug: 'open-tournament-alpha-chess-club-2025', title: 'Open Tournament Alpha Chess Club', year: '2025' },
  { slug: 'islamic-banking-festival-medan', title: 'Pertandingan Catur Islamic Banking Festival Kota Medan', year: '' },
  { slug: 'pertandingan-catur-gbi-rumah-persembahan-2025', title: 'Pertandingan Catur GBI Rumah Persembahan', year: '2025' },
  { slug: 'chess-tournament-medan-2025', title: 'Chess Tournament Medan', year: '2025' },
];

// Dokumentasi sparing/latihan. `slug` = nama folder foto di src/assets/<slug>/
// `slug` harus sama persis dengan nama foldernya (huruf besar/kecil dan spasi ikut dihitung).
export const sparing = [
  { slug: 'Kegiatan Sparing Tahun 2026', title: 'Kegiatan Sparing Tahun 2026' },
  { slug: 'Kegiatan Sparing Tahun 2025', title: 'Kegiatan Sparing Tahun 2025' },
  { slug: 'Kegiatan Sparing Tahun 2024', title: 'Kegiatan Sparing Tahun 2024' },
];

export const filters: { key: 'all' | Kind; label: string }[] = [
  { key: 'all', label: 'Semua kegiatan' },
  { key: 'latihan', label: 'Latihan' },
  { key: 'kompetisi', label: 'Kompetisi' },
  { key: 'komunitas', label: 'Komunitas' },
];


const roles = ['Ketua UPM', 'Wakil Ketua I UPM', 'Wakil Ketua II UPM', 'Sekretaris UPM', 'Bendahara UPM'];

// Periode IV memakai data yang diberikan pembina (penempatan periode masih sementara).
export const realBoard = [
  { role: roles[0], name: 'Meyzha Auritza', info: '2403311756 · Informatika' },
  { role: roles[1], name: 'Mades pranata bottor partogi tua bukit', info: '2402211605 · Kewirausahaan' },
  { role: roles[2], name: 'Heber Prengky Situngkir', info: '2403310001 · Informatika' },
  { role: roles[3], name: 'Stevania Br Ketaren', info: '2403310262 · Informatika' },
  { role: roles[4], name: 'Airin Manik', info: '2403310005 · Informatika' },
];

// Pengurus UPM Chess Club
const board2425 = [
  { role: 'Ketua', name: 'Jul Fredy Purba', info: '2302210073 · Kewirausahaan' },
  { role: 'Wakil Ketua', name: 'Walrian Sihombing', info: '2403311382 · Informatika' },
  { role: 'Sekretaris', name: 'Delima Tumanggor', info: '2402210885 · Bisnis Digital' },
  { role: 'Bendahara', name: 'Enjelina Simangunsong', info: '2402221114 · Bisnis Digital' },
  { role: 'PDD', name: 'Viago Hiskiel Meliala', info: '2402221683 · Bisnis Digital' },
  { role: 'Pendataan', name: 'Jasswant Anbumani', info: '2403311658 · Informatika' },
];

const board2526 = [
  { role: 'Ketua', name: 'Teguh Suranta Purba', info: '2301120177 · Informatika' },
  { role: 'Wakil Ketua', name: 'Walrian Sihombing', info: '2403311382 · Informatika' },
  { role: 'Sekretaris', name: 'Milansari Zagoto', info: '2502210971 · Bisnis Digital' },
  { role: 'Bendahara', name: 'Alyza Salsabila', info: '2402220350 · Bisnis Digital' },
  { role: 'Dokumentasi', name: 'Viago Hiskiel Meliala', info: '2402221683 · Bisnis Digital' },
  { role: 'Mentoring', name: 'Jul Fredy Purba', info: '2302210073 · Kewirausahaan' },
];

export const periods = [
  {
    id: 1,
    label: 'I',
    status: 'Contoh arsip · Data dummy',
    desc: 'Contoh susunan pengurus Periode I. Nama dan rentang tahun akan diganti dengan arsip resmi.',
    board: ['A', 'B', 'C', 'D', 'E'].map((l, j) => ({
      role: roles[j],
      name: `Pengurus Contoh ${l}`,
      info: 'Data dummy · Tahun belum dikonfirmasi',
    })),
  },
  {
    id: 2,
    label: 'II',
    status: 'Data pengurus',
    desc: 'Susunan pengurus UPM Chess Club periode 2024 – 2025.',
    board: board2425,
  },
  {
    id: 3,
    label: 'III',
    status: 'Data pengurus',
    desc: 'Susunan pengurus UPM Chess Club periode 2025 – 2026.',
    board: board2526,
  },
  {
    id: 4,
    label: 'IV',
    status: 'Pengurus terbaru',
    desc: 'Susunan pengurus berdasarkan data yang diberikan pembina. Penempatan pada Periode IV bersifat sementara; tahun jabatan menunggu konfirmasi.',
    board: realBoard,
  },
];

export const members = [
  { name: 'Anggota Contoh A', prodi: 'Informatika', angkatan: 2024 },
  { name: 'Anggota Contoh B', prodi: 'Kewirausahaan', angkatan: 2024 },
  { name: 'Anggota Contoh C', prodi: 'Informatika', angkatan: 2025 },
];

export const faq = [
  { q: 'Belum bisa bermain, boleh bergabung?', a: 'Boleh. Klub dirancang sebagai wadah pengembangan minat mahasiswa, termasuk yang baru mengenal catur. Informasi alur penerimaan anggota akan diumumkan oleh pengurus.' },
  { q: 'Apa yang bisa dipelajari lebih dulu?', a: 'Mulai dengan mengenali gerak bidak, tujuan skakmat, dan prinsip dasar: mengembangkan bidak, menguasai pusat, serta menjaga keamanan raja.' },
  { q: 'Bagaimana cara memulai latihan mandiri?', a: 'Coba teka-teki taktik sederhana, mainkan partai dengan waktu yang cukup, dan tinjau kembali keputusan setelah bermain. Catat satu hal yang dapat diperbaiki pada latihan berikutnya.' },
  { q: 'Apa yang perlu dibawa saat latihan?', a: 'Siapkan semangat belajar dan catatan kecil. Kebutuhan papan, jam catur, lokasi, serta perlengkapan lain mengikuti informasi resmi dari pengurus.' },
];
