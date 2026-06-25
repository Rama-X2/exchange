# HomeLab — Premium Powder Drink E-Commerce & Editorial Website

**HomeLab** adalah sebuah platform e-commerce dan editorial web premium yang dirancang khusus untuk mempresentasikan lini produk bubuk minuman premium (termasuk *Japanese ceremonial grade matcha*, *latte series*, *tea series*, dan *fruit series*) milik **Rama-X2**. Proyek ini dibuat sebagai portofolio pengembangan web modern dengan fokus pada estetika *high-end*, performa ringan tanpa overhead framework berat, serta pengalaman belanja (*UI/UX*) yang sangat halus dan intuitif.

---

## 🎨 Konsep & Desain Estetika (UI/UX)
Situs web ini dirancang ulang secara radikal untuk menghadirkan citra merek mewah (*boutique brand image*) dengan karakteristik visual sebagai berikut:
- **High-End Editorial Typography**: Mengombinasikan font **Cinzel** (serif yang anggun dan berkarakter untuk judul besar) dengan **Instrument Sans** (sans-serif bersih dan modern untuk tingkat keterbacaan teks isi yang tinggi).
- **Kurasi Palet Warna**: Menggunakan kombinasi warna hangat yang harmonis:
  - *Deep Espresso Charcoal* (`#1B1917`) sebagai warna primer dan teks utama.
  - *Warm Bronze/Sand* (`#A88E75`) sebagai aksen premium.
  - *Clean Linen Beige* (`#FAF8F5`) dan *Soft Cream* (`#F4EFEA`) sebagai warna latar belakang yang nyaman di mata.
- **Glassmorphic Header**: Bilah navigasi melayang (*sticky floating*) yang slim dan melengkung elegan menggunakan efek kaca buram (*backdrop blur*) modern.
- **Frameless Premium Card Grid**: Penyajian kartu produk katalog tanpa bingkai (*borderless*) dengan efek transisi mikro saat kursor diarahkan (*hover interactive scale & lift*) yang menambah kesan hidup pada halaman.

---

## ✨ Fitur-Fitur Utama Halaman

### 1. Interaktif Catalog & Pencarian Dinamis
- **Sistem Penyaringan Kategori**: Memisahkan koleksi produk secara instan berdasarkan kategori (*Matcha Series, Latte Series, Tea Series, Fruit Series*).
- **Pencarian Real-Time**: Pengguna dapat mencari produk secara instan berdasarkan nama, *tasting notes*, maupun negara asal.
- **Pengurutan Harga**: Mengurutkan produk berdasarkan harga terendah ke tertinggi, tertinggi ke terendah, maupun berdasarkan alfabetis.

### 2. Jalur Pembelian Cepat & Detail Produk Informatif
- **Direct-to-Checkout (Tombol BELI)**: Fitur pembelian jalur cepat di mana menekan tombol "BELI" langsung menambahkan item ke keranjang dan mengalihkan pengguna ke halaman pembayaran secara instan guna memaksimalkan tingkat konversi transaksi.
- **Spesifikasi & Deskripsi Lengkap**: Halaman detail yang menyajikan info terperinci seperti *tasting notes*, wilayah panen daun teh, instruksi penyeduhan (panas/dingin), serta komposisi bahan baku.

### 3. Keranjang & Checkout Client-Side (Tanpa Server Overhead)
- **Persistensi Keranjang Belanja**: Menggunakan penyimpanan lokal browser (*localStorage*) untuk menyimpan state keranjang belanja pengguna secara real-time.
- **Kalkulasi Akurat**: Menghitung secara otomatis harga subtotal, biaya pengiriman flat, pajak pertambahan nilai (PPN 10%), serta total pembayaran akhir.
- **Metode Pembayaran E-Wallet & Bank**: Antarmuka modern yang memfasilitasi pilihan pembayaran dengan ikon e-wallet dan transfer bank terkemuka.

### 4. Editorial Blog & Upacara Matcha
- **Editorial Grid**: Menyajikan kisah edukasi seputar matcha Jepang (seperti perbedaan matcha dengan kopi, rahasia suhu air terbaik, penanganan rasa pahit, dan peran L-theanine untuk fokus bekerja).
- **Clean Typography Layout**: Konten artikel yang kaya dengan penataan paragraf dan daftar poin berbutir (*bullet lists*) yang sangat rapi untuk menunjang pengalaman membaca (*reading flow*).

### 5. Keamanan & Alur Autentikasi Minimalis
- **Split-Screen Layout**: Halaman masuk (*Sign In*), daftar (*Register*), dan lupa kata sandi (*Forgot Password*) didesain menggunakan tata letak layar terbagi (*split-screen*) minimalis yang memisahkan form pengisian dengan ilustrasi estetis produk.

---

## 🛠️ Arsitektur & Teknologi Stack
Proyek ini mengutamakan efisiensi pemuatan halaman (*load-time speed*) dengan menghindari overhead pustaka JavaScript yang tidak perlu:
- **Markup & Struktur**: HTML5 Semantis untuk SEO yang lebih optimal dan struktur markup yang bersih.
- **Styling Engine**: **Tailwind CSS v4** digabungkan dengan **Vanilla CSS** khusus untuk kontrol spesifisitas tingkat tinggi (seperti efek glassmorphism, kustomisasi scrollbar, widget melayang, dan override navigasi).
- **Logika & Interaktivitas**: **Vanilla JavaScript (ES6 Modules)** untuk rendering produk dinamis, pencarian katalog, pemrosesan artikel blog, serta manajemen state belanja lokal.
- **Integrasi Pihak Ketiga**: Widget interaktif WhatsApp terapung untuk layanan pelanggan cepat, serta Google Analytics untuk pemantauan lalu lintas web.

---

## 📂 Struktur Proyek Utama
```text
exchange-main/
├── assets/
│   ├── css/
│   │   └── style.css            # Desain sistem, kustomisasi CSS, & token warna
│   ├── js/
│   │   ├── products.js          # Database lokal produk bubuk premium
│   │   ├── blog-data.js         # Artikel editorial terformat
│   │   └── script.js            # Logika belanja, rendering, filter, & navigasi
│   └── img/                     # Aset gambar visual, ikon, & logo brand (.webp)
├── index.html                   # Halaman Utama (Beranda Premium)
├── product.html                 # Katalog Produk & Filter Pencarian
├── product-detail.html          # Detail Informasi Produk & Seduh
├── bag.html                     # Keranjang Belanja Client-Side
├── checkout.html                # Form Pengiriman & Opsi Pembayaran
├── order-confirmation.html      # Rangkuman Pembelian & Sukses
├── blog.html                    # Daftar Kisah & Artikel Editorial
├── blog-detail.html             # Halaman Baca Artikel Blog
├── faq.html                     # Halaman Tanya Jawab Interaktif
├── contact.html                 # Form Kontak & Info Kantor Pusat
├── sign-in.html                 # Halaman Masuk Akun
├── register.html                # Halaman Pendaftaran Akun
├── forgot-password.html         # Halaman Reset Kata Sandi
└── [Halaman Kebijakan Lain]     # Dokumen legal/syarat ketentuan
```
