import React from 'react';

interface Screen05SkTimProps {
  onNavigate: (path: string) => void;
  onRequestPleno: () => void;
}

export const Screen05SkTim: React.FC<Screen05SkTimProps> = ({ onNavigate, onRequestPleno }) => {
  return (
    <div className="flex flex-col w-full space-y-6">
      {/* HEADER BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-surface-container-low/60 p-6 rounded-2xl border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary font-tech-code-sm text-tech-code-sm uppercase font-bold tracking-wider">
              PILAR K.1 • K.2 LEGALITAS
            </span>
            <span className="text-outline text-tech-code-sm font-tech-code-sm">•</span>
            <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant uppercase tracking-wider">
              KEPUTUSAN BUPATI KARO NO. 600/012/DPUTR/2025
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
            SK Tim Koordinasi & Publikasi Kebijakan
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1">
            Dasar hukum pembentukan Tim Koordinasi Multi-Sektor, pengesahan matriks pembobotan enam kriteria, dan rantai akuntabilitas
            publikasi keputusan penanganan jalan produksi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRequestPleno}
            className="px-4 py-2.5 rounded-lg bg-primary-container hover:bg-surface-tint text-on-primary font-body-sm text-body-sm font-bold flex items-center gap-2 transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-tech-code-md">how_to_reg</span>
            <span>Rapat Pleno Pengesahan</span>
          </button>
        </div>
      </div>

      {/* 2-COLUMN LEGAL DECREE & STAKEHOLDER MATRIX */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* SK BUPATI CERTIFICATE DOCUMENT CARD */}
        <div className="xl:col-span-7 flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-xl border border-outline-variant/30 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">policy</span>
              <div>
                <span className="font-label-caps text-label-caps text-outline uppercase">LEGAL INSTRUMENT</span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Salinan Keputusan Bupati Karo</h3>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary font-tech-code-sm text-tech-code-sm font-bold border border-secondary/30">
              BERLAKU AKTIF
            </span>
          </div>

          {/* DOCUMENT BODY */}
          <div className="p-5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/20 space-y-4 font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
            <div className="text-center space-y-1 pb-3 border-b border-outline-variant/20">
              <p className="font-headline-md text-sm font-bold uppercase text-on-surface tracking-wider">
                BUPATI KARO PROVINSI SUMATERA UTARA
              </p>
              <p className="font-tech-code-sm text-xs text-primary font-semibold">
                NOMOR: 600/012/DPUTR/TA-2025 TANGGAL 14 JANUARI 2026
              </p>
              <p className="font-headline-md text-xs font-semibold text-on-surface">
                TENTANG PEMBENTUKAN TIM TEKNIS PENILAIAN JALAN PRODUKSI PERTANIAN (SPJPP) KABUPATEN KARO
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <p>
                <strong className="text-on-surface font-tech-code-sm uppercase">Menimbang:</strong> Bahwa untuk menjamin kepastian
                hukum, efektivitas penyerapan Dana Alokasi Khusus (DAK) Tematik Pertanian, serta mencegah distorsi alokasi akibat intervensi
                non-teknokratis dalam penetapan ruas jalan produksi tanaman pangan dan hortikultura.
              </p>
              <p>
                <strong className="text-on-surface font-tech-code-sm uppercase">Mengingat:</strong> UU No. 2 Tahun 2022 tentang Jalan;
                Instruksi Presiden No. 3 Tahun 2023 tentang Percepatan Konektivitas Jalan Daerah; Peraturan Daerah Kab. Karo No. 04 Tahun
                2024 tentang RTRW.
              </p>
              <p>
                <strong className="text-on-surface font-tech-code-sm uppercase">Menetapkan:</strong> Mengesahkan penggunaan algoritma
                pembobotan enam kriteria (C: 25%, P: 25%, A: 15%, B: 10%, R: 15%, M: 10%) dan melarang pengubahan bobot tanpa Berita
                Acara Sidang Pleno resmi.
              </p>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between font-tech-code-sm text-[11px]">
              <div>
                <span className="text-outline block">Tanda Tangan Digital SHA-256:</span>
                <span className="text-primary font-mono text-[10px]">7f8b91c...a49d1e2f89cc81b2</span>
              </div>
              <div className="text-right">
                <span className="text-outline block">Ditetapkan di:</span>
                <span className="text-on-surface font-semibold">Kabanjahe, Kab. Karo</span>
              </div>
            </div>
          </div>

          {/* MANDATORY ACTIONS */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => onNavigate('integrasi-rkpd-anggaran')}
              className="py-2.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-body-sm text-sm font-semibold flex items-center justify-center gap-2 border border-outline-variant/20 transition-all"
            >
              <span className="material-symbols-outlined text-tech-code-md">account_balance</span>
              <span>Integrasi ke RKPD (P.1)</span>
            </button>
            <button
              onClick={() => onNavigate('beranda-publik')}
              className="py-2.5 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-primary font-body-sm text-sm font-semibold flex items-center justify-center gap-2 border border-primary/30 transition-all"
            >
              <span className="material-symbols-outlined text-tech-code-md">public</span>
              <span>Buka Portal Publik (K.2)</span>
            </button>
          </div>
        </div>

        {/* STAKEHOLDER SIGNATORIES & LEGAL CHAIN */}
        <div className="xl:col-span-5 flex flex-col space-y-6">
          {/* OPD SIGNATORY TEAMS */}
          <div className="p-6 rounded-2xl bg-surface-container-low shadow-xl border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Matriks Tanda Tangan OPD Terkait</h3>
              <span className="font-tech-code-sm text-secondary font-semibold">4 / 4 Lengkap</span>
            </div>

            <div className="space-y-3">
              {/* OPD 1 */}
              <div className="p-3 rounded-xl bg-surface-container-high/60 border border-outline-variant/20 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="font-tech-code-md text-sm font-bold text-on-surface">DPUTR Kab. Karo</span>
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">
                    Ir. Hendra Tarigan • Pengesahan Teknis Jalan (C & M)
                  </p>
                </div>
                <span className="material-symbols-outlined text-secondary text-xl">check_circle</span>
              </div>

              {/* OPD 2 */}
              <div className="p-3 rounded-xl bg-surface-container-high/60 border border-outline-variant/20 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="font-tech-code-md text-sm font-bold text-on-surface">Bappeda Kab. Karo</span>
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">
                    Drs. Terang Ginting • Penyelarasan RKPD & DAK (P.1)
                  </p>
                </div>
                <span className="material-symbols-outlined text-secondary text-xl">check_circle</span>
              </div>

              {/* OPD 3 */}
              <div className="p-3 rounded-xl bg-surface-container-high/60 border border-outline-variant/20 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="font-tech-code-md text-sm font-bold text-on-surface">Dinas Pertanian</span>
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">
                    Metehsa Sembiring, S.P. • Validasi Produksi Horti (P & B)
                  </p>
                </div>
                <span className="material-symbols-outlined text-secondary text-xl">check_circle</span>
              </div>

              {/* OPD 4 */}
              <div className="p-3 rounded-xl bg-surface-container-high/60 border border-outline-variant/20 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="font-tech-code-md text-sm font-bold text-on-surface">BPBD Kab. Karo</span>
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">
                    Natanail Perangin-angin • Peta Zona Bahaya Longsor (R)
                  </p>
                </div>
                <span className="material-symbols-outlined text-secondary text-xl">check_circle</span>
              </div>
            </div>
          </div>

          {/* PROTOKOL TRANSPARANSI PUBLIK */}
          <div className="p-5 rounded-2xl bg-surface-container-low shadow-xl border border-outline-variant/30 space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">visibility</span>
              <h4 className="font-headline-md text-sm font-bold text-on-surface">Protokol K.2: Keterbukaan Informasi</h4>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Seluruh daftar peringkat ruas Kelas I, II, dan III diumumkan secara terbuka pada kanal resmi Pemkab Karo dan papan
              pengumuman 17 kantor kecamatan untuk mencegah potensi korupsi pengadaan jalan tani.
            </p>
            <div className="p-2.5 rounded-lg bg-surface-container-lowest/80 text-[11px] font-tech-code-sm text-secondary flex items-center gap-2">
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Memenuhi UU KIP No. 14 Tahun 2008</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
