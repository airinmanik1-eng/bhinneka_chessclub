# ST Bhinneka Chess Club (Astro + Vue)

Versi Astro + Vue dari website statis referensi. Warna hanya memakai palet dari referensi
(token ada di `src/styles/global.css`).

## Menjalankan

    npm install
    npm run dev        # http://localhost:4321
    npm run build      # hasil statis di folder dist/
    npm run preview

## Struktur

- `src/data/site.ts` — semua konten: kegiatan, pengurus per periode, anggota, FAQ
- `src/pages/index.astro` — susunan halaman
- `src/components/*.astro` — bagian statis (Hero, Tentang, Prestasi, FAQ, Kontak, Footer)
- `src/components/*.vue` — bagian interaktif (Header, Kegiatan, Organisasi, Anggota, Formulir)
- `src/components/Lomba.vue` — dokumentasi lomba (6 kegiatan + galeri foto, klik untuk memperbesar)
- `src/assets/dokumentasi/<nama-kegiatan>/` — tempat menaruh foto dokumentasi tiap lomba
- `src/styles/global.css` — desain dan tata letak responsif
- `public/logo.jpg` — logo klub

## Menambah foto dokumentasi lomba

1. Salin foto (jpg, jpeg, png, webp) ke folder kegiatan yang sesuai di `src/assets/dokumentasi/`
   (mis. `gebyar-prestasi-2024/`). Foto diurutkan menurut nama berkas: `01.jpg`, `02.jpg`, ...
2. Foto otomatis menggantikan slot kosong "Foto dokumentasi" di bawah kegiatan tersebut.
   Jika foto belum muncul, hentikan lalu jalankan ulang `npm run dev`.
3. Ubah nama kegiatan atau tahun di `src/data/site.ts` pada daftar `lomba`.
   Perkecil foto (lebar sekitar 1600px) agar website tetap ringan.

## Responsif

CSS ditulis mobile-first di `src/styles/global.css` dengan breakpoint 480px, 760px, 1100px, dan 1500px
(konten dibatasi 1320px di layar lebar). Menu ☰ berlaku sampai 760px. Tombol, tab, dan tautan di HP
berukuran minimal 44px, input 16px agar iOS tidak zoom, dan dialog dibatasi 90dvh.
Ukuran bidak dan koordinat papan mengikuti lebar papan (container query units).

## Catatan

- Data pengurus Periode IV sesuai referensi; Periode I–III, prestasi, anggota, jadwal, dan kontak masih data contoh.
- Formulir hanya mengunduh berkas TXT, belum mengirim ke server.
- Font Google butuh internet; ada font cadangan.
