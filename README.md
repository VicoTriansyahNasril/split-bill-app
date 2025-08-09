# Split Bill 💸

Aplikasi web modern dan dinamis untuk membagi tagihan secara adil dan mudah. Dibuat dengan ReactJS, aplikasi ini dirancang untuk menangani skenario pembagian tagihan yang paling rumit sekalipun, mulai dari pesanan personal hingga item yang dibagi rata, dengan antarmuka yang intuitif dan responsif.

---

### _Tautan Demo Langsung Akan Segera Tersedia_


## ✨ Fitur Unggulan

Aplikasi ini dilengkapi dengan berbagai fitur untuk memastikan pengalaman pengguna yang terbaik:

#### Manajemen Tagihan Dinamis
- **Tambah/Hapus Peserta:** Kelola daftar orang yang ikut patungan dengan mudah.
- **Tambah/Hapus Item:** Input nama pesanan beserta harga satuannya.
- **Kuantitas Fleksibel:** Tentukan jumlah setiap item yang dipesan (misal: 4x Mixue).
- **Edit "In-place":** Klik dua kali (atau ikon pensil) pada nama, harga, atau kuantitas untuk mengeditnya secara langsung.
- **Biaya Tambahan Fleksibel:** Atur Pajak dan Biaya Layanan dalam bentuk **Persentase (%)** atau **Nominal (Rp)**.

#### Sistem Penugasan Canggih
- **Mode "Personal":** Tetapkan jumlah pesanan yang berbeda untuk setiap orang pada satu item yang sama.
- **Mode "Dibagi Rata":** Ganti mode item untuk membaginya secara merata ke semua peserta yang dipilih.
- **Validasi Kuantitas:** Sistem secara otomatis mencegah pengguna meng-assign lebih banyak item daripada jumlah yang tersedia.
- **Umpan Balik Visual:** Lihat sisa item yang belum ter-assign secara real-time.

#### Pengalaman Pengguna (UX) Modern
- **Tema Terang & Gelap:** Ganti tema sesuai preferensi Anda. Pilihan akan tersimpan otomatis.
- **Desain Responsif:** Tampilan optimal di berbagai perangkat, dari ponsel hingga desktop.
- **Animasi Halus:** Transisi yang mulus saat menambah atau menghapus elemen, ditenagai oleh **Framer Motion**.
- **Umpan Balik Interaktif:**
    - **Highlight:** Arahkan kursor ke nama di ringkasan untuk menyorot item yang mereka pesan.
    - **Confetti:** Rayakan keberhasilan perhitungan dengan efek confetti yang memuaskan.
    - **Modal Konfirmasi Elegan:** Validasi tindakan penting (seperti menghapus) dengan modal kustom.
- **Salin Ringkasan Lengkap:** Salin hasil perhitungan dengan detail lengkap ke clipboard, siap untuk dibagikan di chat.

#### Persistensi Data
- **Simpan Sesi Otomatis:** Semua data Anda disimpan di `localStorage` browser, jadi pekerjaan Anda tidak akan hilang jika tidak sengaja menutup tab.
- **Tombol "Mulai Baru":** Hapus semua data sesi saat ini untuk memulai tagihan baru dengan mudah.

## 🛠️ Teknologi yang Digunakan

- **Frontend:** [ReactJS](https://reactjs.org/) (dengan Vite)
- **State Management:** [React Context API](https://reactjs.org/docs/context.html)
- **Animasi:** [Framer Motion](https://www.framer.com/motion/)
- **Styling:** CSS Murni dengan arsitektur modern

## 🚀 Cara Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di mesin lokal Anda.

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/VicoTriansyahNasril/split-bill-app.git
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd split-bill-app
    ```

3.  **Install semua dependensi:**
    ```bash
    npm install
    ```

4.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```

5.  Buka [http://localhost:5173](http://localhost:5173) (atau port lain yang ditampilkan di terminal) di browser Anda.

---

Dibuat dengan ❤️ oleh **Vico Triansyah Nasril**
