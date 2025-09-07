# Website Kelas 8H

Website resmi untuk kelas 8H dengan sistem manajemen lengkap dan panel admin.

## Fitur Utama

### Untuk Pengunjung
- **Home**: Halaman utama dengan statistik kelas
- **Struktur Kelas**: Menampilkan struktur organisasi kelas dengan foto
- **Anggota Kelas**: Daftar semua siswa dengan fitur pencarian
- **Jadwal Piket**: Jadwal piket harian
- **Jadwal Pelajaran**: Jadwal mata pelajaran per hari
- **Pengumuman**: Informasi dan pengumuman terbaru

### Untuk Admin
- **Login System**: Sistem login yang aman untuk mengakses panel admin
- **CRUD Operations**: Tambah, edit, dan hapus data untuk semua section
- **Upload Foto**: Fitur upload foto untuk anggota kelas dan struktur
- **Bulk Delete**: Fitur hapus semua anggota kelas sekaligus
- **Responsive Design**: Tampilan yang optimal di desktop dan mobile

## Teknologi yang Digunakan

- **HTML5**: Struktur website
- **CSS3**: Styling dengan responsive design
- **JavaScript**: Fungsionalitas interaktif dan manajemen data
- **LocalStorage**: Penyimpanan data lokal
- **Font Awesome**: Icon library

## Instalasi dan Penggunaan

1. **Download/Clone** semua file ke folder project
2. **Buka** file `index.html` di browser
3. **Login Admin** menggunakan kredensial default:
   - Username: `admin`
   - Password: `admin123`

## Konfigurasi Admin

### Cara Mengubah Username dan Password Admin

1. **Buka file `script.js`**
2. **Cari bagian `ADMIN_CONFIG`** di baris awal:
   ```javascript
   const ADMIN_CONFIG = {
       username: 'admin',        // Ganti dengan username baru
       password: 'admin123'      // Ganti dengan password baru
   };
   ```
3. **Simpan file** dan refresh browser

### Alternatif: Menggunakan Config File

1. **Buka file `config.js`**
2. **Edit bagian admin**:
   ```javascript
   admin: {
       username: 'username_baru',
       password: 'password_baru'
   }
   ```

## Struktur File

```
8H/
├── index.html          # Halaman utama
├── styles.css          # File CSS untuk styling
├── script.js           # File JavaScript utama
├── config.js           # File konfigurasi
└── README.md           # Dokumentasi ini
```

## Fitur Responsive

Website ini telah dioptimalkan untuk berbagai ukuran layar:
- **Desktop**: Layout grid penuh
- **Tablet**: Layout yang disesuaikan
- **Mobile**: Navigation hamburger menu, layout single column

## Color Scheme

Website menggunakan skema warna hitam, putih, dan abu-abu:
- **Primary**: #2c3e50 (Dark Gray)
- **Secondary**: #3498db (Blue)
- **Accent**: #e74c3c (Red)
- **Background**: #f8f9fa (Light Gray)
- **Text**: #333333 (Dark Gray)

## Cara Menggunakan Admin Panel

1. **Login**: Klik tombol "Admin" di navigation, masukkan username dan password
2. **Navigasi Tab**: Gunakan tab di bagian atas untuk berpindah antar section
3. **Tambah Data**: Isi form dan klik "Tambah/Update"
4. **Edit Data**: Klik tombol "Edit" pada item yang ingin diubah
5. **Hapus Data**: Klik tombol "Hapus" pada item yang ingin dihapus
6. **Upload Foto**: Pilih file gambar (JPG, PNG, GIF) maksimal 5MB

## Fitur Khusus

### Upload Foto
- Format yang didukung: JPG, PNG, GIF
- Ukuran maksimal: 5MB
- Foto akan disimpan dalam format base64 di localStorage

### Pencarian Anggota
- Ketik nama di kotak pencarian untuk filter anggota kelas
- Pencarian real-time tanpa perlu menekan enter

### Hapus Semua Anggota
- Fitur khusus untuk menghapus semua anggota kelas sekaligus
- Dilengkapi konfirmasi untuk mencegah penghapusan tidak sengaja

## Troubleshooting

### Data Tidak Muncul
- Pastikan JavaScript diaktifkan di browser
- Cek console browser untuk error
- Refresh halaman

### Foto Tidak Muncul
- Pastikan ukuran file tidak melebihi 5MB
- Gunakan format JPG, PNG, atau GIF
- Coba compress foto jika terlalu besar

### Tidak Bisa Login Admin
- Periksa username dan password di file `script.js`
- Pastikan tidak ada typo dalam kredensial
- Cek case sensitivity (huruf besar/kecil)

## Pengembangan Lebih Lanjut

Untuk pengembangan lebih lanjut, Anda dapat:
1. **Menambah fitur backup/restore data**
2. **Integrasi dengan database server**
3. **Sistem notifikasi**
4. **Export data ke Excel/PDF**
5. **Multi-user admin dengan role berbeda**

## Dukungan Browser

Website ini kompatibel dengan:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Lisensi

Project ini dibuat untuk keperluan edukasi dan dapat digunakan secara bebas.

---

**Dibuat dengan ❤️ untuk Kelas 8H**
