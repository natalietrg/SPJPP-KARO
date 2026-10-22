---
name: SPJPP-Karo Executive Intelligence
colors:
  surface: '#0c1225'
  surface-dim: '#0c1225'
  surface-bright: '#33384d'
  surface-container-lowest: '#070d20'
  surface-container-low: '#151b2e'
  surface-container: '#191f32'
  surface-container-high: '#23293d'
  surface-container-highest: '#2e3449'
  on-surface: '#dce1fc'
  on-surface-variant: '#bcc9cd'
  inverse-surface: '#dce1fc'
  inverse-on-surface: '#2a3044'
  outline: '#869397'
  outline-variant: '#3d494c'
  surface-tint: '#4cd7f6'
  primary: '#4cd7f6'
  on-primary: '#003640'
  primary-container: '#06b6d4'
  on-primary-container: '#00424f'
  inverse-primary: '#00687a'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#e79400'
  on-tertiary-container: '#563400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#acedff'
  primary-fixed-dim: '#4cd7f6'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0c1225'
  on-background: '#dce1fc'
  surface-variant: '#2e3449'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '800'
    lineHeight: 4.25rem
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  tech-code-lg:
    fontFamily: JetBrains Mono
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: 0.02em
  tech-code-md:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  tech-code-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.03em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

### Brand Personality & Philosophy
Sistem ini dirancang sebagai platform analitik geospasial dan pengambil keputusan teknokratis tingkat tinggi untuk infrastruktur jalan produksi pertanian. Karakter visual memadukan ketegasan tata kelola kepemerintahan (SIGAP) dengan kemewahan antarmuka *mission control* modern. Kesan yang dihadirkan adalah presisi ilmiah, keandalan analitis, keamanan data, dan kejelasan hierarki tanpa ornamen visual yang berlebihan.

### Visual Aesthetic & Design Movement
Gaya visual mengawinkan **Deep Institutional Dark Mode** dengan sentuhan **Precision Glassmorphism**:
- **Canvas Base:** Latar belakang *deep navy-slate* multi-kedalaman (#070B18 dan #0B1124) yang menghilangkan kelelahan mata operator GIS dalam sesi kerja panjang.
- **Glassmorphic Paneling:** Panel semi-transparan dengan kepekatan tinggi (80–90%), *backdrop blur* mikroskopis, serta garis batas (*luminous hairline stroke*) setebal 1px berkekuatan optik rendah untuk membingkai data secara tegas.
- **Pillar-Coded Chromatic Signatures:** Setiap modul tata kelola dan koridor pertanian memiliki kode warna fungsional yang konstan, mempercepat pemindaian visual lintas dashboard.

## Colors

### Canvas & Structural Surfaces
- **Background Deep Canvas:** `#070B18` — Kanvas terdalam untuk *viewport* peta satelit dan latar antarmuka utama.
- **Surface Elevation 1 (Card/Container):** `#0B1124` dengan opasitas 85% dan *backdrop blur* 16px.
- **Surface Elevation 2 (Panel/Drawer/Popover):** `#0F172A` dengan opasitas 90%.
- **Surface Interactive (Hover/Active):** `#1E293B` pada opasitas 60%.
- **Luminous Borders:** `rgba(255, 255, 255, 0.08)` untuk batas umum, bertransisi ke `#334155` atau `#1E293B` untuk pemisah struktural.

### Pillar Accent Taxonomy
- **Pilar 1 (Data & Koridor):** `#06B6D4` (Cyan Primer), `#38BDF8` (Sky Highlight). Digunakan pada perimeter jalan, koordinat spasial, dan feed spasial GIS.
- **Pilar 2 (Metode Penilaian & Bobot):** `#F59E0B` (Amber Core), `#FB923C` (Orange Tint). Digunakan pada kalkulasi MCA/AHP, matriks kriteria, dan formula evaluasi teknis.
- **Pilar 3 (Kelembagaan & Kolaborasi):** `#A855F7` (Purple Core), `#EC4899` (Magenta Accent). Digunakan pada data kelompok tani, sertifikasi kepemilikan, dan wewenang dinas.
- **Pilar 4 (Pembiayaan & Pemantauan):** `#10B981` (Emerald Core), `#34D399` (Green Luminous). Digunakan pada serapan anggaran APBD/DAK, audit berkala, dan jadwal pemeliharaan.

### Severity & Risk Tiers
- **Kelas I (Kritis / Prioritas Tertinggi):** `#F43F5E` (Rose Core), Glow: `rgba(244, 63, 94, 0.25)`. Kerusakan jalan berat, akses komoditas terputus total.
- **Kelas II (Sedang / Terancam):** `#F59E0B` (Amber Core), Glow: `rgba(245, 158, 11, 0.25)`. Penurunan fungsional, butuh perkerasan berkala.
- **Kelas III (Terkendali / Mantap):** `#10B981` (Emerald Core), Glow: `rgba(16, 185, 129, 0.25)`. Jalan siap angkut panen optimal.

### Typography & Icon Contrast
- **Text High-Emphasis:** `#F8FAFC` (Slate-50) — Kontras rasio > 15:1 terhadap canvas.
- **Text Medium-Emphasis:** `#94A3B8` (Slate-400) — Untuk label deskripsi dan metadata.
- **Text Low-Emphasis:** `#64748B` (Slate-500) — Untuk pembatas visual dan teks penonaktifan.

## Typography

### Implementation Philosophy
Tipografi pada sistem ini membedakan peran antara narasi institusional dan ketepatan kalkulasi:
- **Plus Jakarta Sans (Headlines):** Menyediakan kepribadian yang kokoh, modern, dan berkontur bersih untuk metrik besar dan judul panel tata kelola.
- **Inter (Body):** Memberikan kenyamanan membaca laporan hasil survei lapangan, parameter audit, serta deskripsi teknis tanpa distorsi.
- **JetBrains Mono (Technical Engine):** Dikhususkan untuk seluruh kode pilar (misal: `D.1.04`, `M.2.1A`, `K.1.09`, `P.3.02`), koordinat derajat desimal WGS84 (`3.1167° N, 98.4833° E`), indeks skor desimal (`84.92 / 100`), serta visualisasi rumus matematis bobot jalan.

### Numerical Tabular Figures
Seluruh penggunaan angka skor dan moneter harus mengaktifkan fitur OpenType `tnum` (tabular numbers) untuk memastikan baris tabel dan komparasi matriks sejajar sempurna secara vertikal.

## Layout & Spacing

### Layout Structure
- **Desktop Grid (≥1280px):** 12 kolom simetris dengan lebar *gutter* 1.5rem dan *outer margin* 2rem. Dashboard menggunakan skema *asymmetric split*: 4 kolom untuk panel filter & inspeksi pilar, 8 kolom untuk peta koridor GIS dan matriks keputusan.
- **Tablet Grid (768px - 1279px):** 8 kolom adaptif dengan margin 1.5rem. Panel filter menyusut menjadi collapsible drawer horizontal.
- **Mobile Grid (<768px):** 4 kolom fluida, margin 1rem. Seluruh visualisasi data beralih ke mode vertikal bertumpuk (*stacked cards*) dengan tabel berpindah ke mode ringkasan horizontal-scroll.

### Rhythmic Padding Standards
- Inner Card Padding: `space-lg` (1.5rem) pada desktop, otomatis menyusut ke `space-md` (1rem) pada perangkat mobile.
- Section Header Gap: `space-sm` (0.5rem) antara judul dan label kategori pilar.
- Form Row Gap: `space-md` (1rem) untuk konsistensi input inspeksi.

## Elevation & Depth

### The Luminous Glass Elevation Hierarchy
Sistem tidak memanfaatkan bayangan hitam buram konvensional. Sebagai gantinya, kedalaman diartikulasikan melalui opasitas bertingkat, blur kanvas belakang, dan pendaran batas (*edge luminance*):

1. **Elevation Base (Canvas):** Flat `#070B18`. Menampung peta raster/vektor dan latar audit global.
2. **Elevation Low (Container/Data Grid):**
   - Background: `rgba(11, 17, 36, 0.75)`
   - Backdrop Blur: `12px`
   - Border: `1px solid rgba(255, 255, 255, 0.06)`
   - Shadow: `0 4px 20px -2px rgba(0, 0, 0, 0.5)`
3. **Elevation Mid (Interactive Cards & Focused Tiles):**
   - Background: `rgba(15, 23, 42, 0.85)`
   - Backdrop Blur: `16px`
   - Border: `1px solid rgba(56, 189, 248, 0.2)` saat aktif, atau `rgba(255, 255, 255, 0.1)` saat pasif
   - Shadow: `0 12px 32px -4px rgba(0, 0, 0, 0.65)`
4. **Elevation High (Modal, Drawer, Geo-Tooltip):**
   - Background: `rgba(7, 11, 24, 0.95)`
   - Backdrop Blur: `24px`
   - Border: `1px solid rgba(255, 255, 255, 0.15)`
   - Shadow: `0 20px 48px -6px rgba(0, 0, 0, 0.85), 0 0 16px 0 rgba(6, 182, 212, 0.1)`

## Shapes

### Corner Curvature Language
Sistem menggunakan proporsi kurva makro untuk membungkus struktur data kompleks menjadi ramah mata:
- **Major Panel & Map Containers:** Menggunakan kurva `rounded-3xl` (1.5rem / 24px) untuk melembutkan pertemuan visual antara modul GIS dengan widget panel samping.
- **Standard Cards & Data Grouping:** Menggunakan `rounded-2xl` (1rem / 16px) untuk membingkai daftar agregat pilar, grafik tren panen, dan metrik anggaran.
- **Controls & Input Fields:** Menggunakan kurva `rounded-lg` (0.5rem / 8px) untuk mempertahankan ketegasan perangkat kerja teknokratis.
- **Status Pills & Micro Badges:** Menggunakan radius *full pill* (9999px) guna menonjolkan kode pilar dan indikator tingkat risiko kritis secara visual.

## Components

### 1. Interactive Tabs (Filter Pilar)
- **Container:** Shell pipih dengan background `rgba(11, 17, 36, 0.85)`, border 1px `rgba(255, 255, 255, 0.06)`, padding 4px, `rounded-xl`.
- **Tab Item:** Teks `Inter` 13px medium. Keadaan aktif memperoleh latar `rgba(30, 41, 59, 0.8)`, border 1px `rgba(255, 255, 255, 0.12)`, warna teks putih murni, serta *dot indicator* mini berpendar sesuai warna pilar terkait.
- **Hover:** Transisi halus 150ms dengan teks `#F8FAFC` dan latar semu `rgba(255, 255, 255, 0.04)`.

### 2. Status Badges & Priority Glows
- **Komposisi:** Lencana berbentuk kapsul (*pill*) memadukan teks monospaced `JetBrains Mono` 11px uppercase dengan padding horizontal 10px dan vertikal 3px.
- **Kelas I (Kritis):** Latar `rgba(244, 63, 94, 0.12)`, teks `#FB7185`, border 1px `rgba(244, 63, 94, 0.35)`, bayangan berpendar: `0 0 8px rgba(244, 63, 94, 0.3)`. Disertai denyut titik merah di samping teks.
- **Kelas II (Sedang):** Latar `rgba(245, 158, 11, 0.12)`, teks `#FBBF24`, border 1px `rgba(245, 158, 11, 0.35)`.
- **Kelas III (Terkendali):** Latar `rgba(16, 185, 129, 0.12)`, teks `#34D399`, border 1px `rgba(16, 185, 129, 0.35)`.

### 3. Precision Buttons
- **Primary SIGAP Action:** Latar gradien linear horizontal (`#06B6D4` ke `#0284C7`), teks `#070B18` berbobot tebal (Font-weight: 700), `rounded-lg`, border none. Efek *glow* pada hover: `0 0 20px rgba(6, 182, 212, 0.4)`.
- **Secondary Ghost Action:** Latar `rgba(15, 23, 42, 0.6)`, border 1px `rgba(255, 255, 255, 0.15)`, teks `#F8FAFC`. Hover: Border `#38BDF8` dan teks `#38BDF8`.
- **Danger Override:** Latar `rgba(244, 63, 94, 0.15)`, border 1px `#F43F5E`, teks `#F43F5E`.

### 4. Input Fields & Dropdowns
- **Struktur:** Tinggi 42px, latar `rgba(11, 17, 36, 0.7)`, border 1px `#334155`, teks `#F8FAFC`, tipografi `Inter` 14px, `rounded-lg`.
- **Focus State:** Border bersinar `#06B6D4` dengan cincin luar `0 0 0 2px rgba(6, 182, 212, 0.2)`. Label teknis di atasnya menggunakan font `JetBrains Mono` 11px warna `#94A3B8`.

### 5. Table Glass Styling (Matriks Penilaian Jalan)
- **Header:** Latar `rgba(15, 23, 42, 0.9)`, border bawah 1px `#334155`, font `JetBrains Mono` 11px uppercase warna `#64748B`, perataan teks presisi.
- **Row:** Latar transparan bertransisi ke `rgba(30, 41, 59, 0.4)` saat kursor melintas. Garis pemisah horizontal setebal 1px `rgba(255, 255, 255, 0.04)`.
- **Sel Skor/Kode:** Diberi gaya dengan font `JetBrains Mono` 13px berkontras tinggi `#F8FAFC` untuk angka mutlak dan lencana warna pilar untuk kode parameter.

### 6. Audit Trail Timeline
- **Garis Sumbu:** Vertikal 2px berwarna `#1E293B` di sebelah kiri konten.
- **Node Status:** Lingkaran 12px dengan border 2px berlatar `#070B18`. Node menyala sesuai warna pilar evaluator (contoh: `#A855F7` untuk verifikasi kelompok tani).
- **Entri Perubahan:** Berisi timestamp monospaced abu-abu `#64748B`, tag akun birokrasi, serta ringkasan perbedaan bobot dalam gelembung kartu kaca `rounded-xl`.