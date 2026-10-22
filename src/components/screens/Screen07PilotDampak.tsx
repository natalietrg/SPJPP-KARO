import React, { useState } from 'react';

export const Screen07PilotDampak: React.FC = () => {
  const [activePilotTab, setActivePilotTab] = useState<'perbandingan' | 'kelompokTani'>('perbandingan');
  const [conditionToggle, setConditionToggle] = useState<'after' | 'before'>('after');

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* HEADER BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-surface-container-low/60 p-6 rounded-2xl border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-tertiary/20 text-tertiary font-tech-code-sm text-tech-code-sm uppercase font-bold tracking-wider">
              PILAR P.3 EVALUASI
            </span>
            <span className="text-outline text-tech-code-sm font-tech-code-sm">•</span>
            <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant uppercase tracking-wider">
              EVALUASI DAMPAK SOSIO-EKONOMI PERTANIAN
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
            Pilot Sebelum-Sesudah (Before & After Study)
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1">
            Pengukuran empiris dampak intervensi jalan produksi terhadap efisiensi logistik, penurunan susut pascapanen (
            <em className="text-primary font-medium">post-harvest loss</em>), dan peningkatan nilai tukar petani (NTP) hortikultura.
          </p>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-surface-container-low shadow-inner border border-outline-variant/30">
          <button
            onClick={() => setActivePilotTab('perbandingan')}
            className={`px-4 py-2 rounded-lg font-tech-code-md text-sm transition-all ${
              activePilotTab === 'perbandingan'
                ? 'bg-surface-container-high text-on-surface font-bold shadow'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Metrik Sebelum-Sesudah
          </button>
          <button
            onClick={() => setActivePilotTab('kelompokTani')}
            className={`px-4 py-2 rounded-lg font-tech-code-md text-sm transition-all ${
              activePilotTab === 'kelompokTani'
                ? 'bg-surface-container-high text-on-surface font-bold shadow'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Testimoni & Kelompok Tani
          </button>
        </div>
      </div>

      {/* CASE STUDY HIGHLIGHT */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-surface-container-high/80 to-surface-container-low/90 border border-outline-variant/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="px-2.5 py-0.5 rounded bg-primary/20 text-primary font-tech-code-sm text-xs font-bold">
            RUAS PERCONTOHAN TERPILIH
          </span>
          <h2 className="font-headline-md text-2xl font-bold text-on-surface">
            Ruas Simpang Empat – Naman Teran (Panjang 6.4 km)
          </h2>
          <p className="font-body-sm text-sm text-on-surface-variant">
            Koridor Utama Hortikultura Sinabung • Dibiayai DAK Tematik Pertanian TA 2025 • Rekonstruksi Rigid Pavement & Talud
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-container-lowest/80 p-1.5 rounded-xl border border-outline-variant/30">
          <button
            onClick={() => setConditionToggle('before')}
            className={`px-3 py-1.5 rounded-lg font-tech-code-sm text-xs font-bold transition-all ${
              conditionToggle === 'before'
                ? 'bg-error-container text-on-error-container shadow'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Kondisi Sebelum (2024)
          </button>
          <button
            onClick={() => setConditionToggle('after')}
            className={`px-3 py-1.5 rounded-lg font-tech-code-sm text-xs font-bold transition-all ${
              conditionToggle === 'after'
                ? 'bg-secondary-container text-on-secondary-container shadow'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Kondisi Sesudah (2026)
          </button>
        </div>
      </div>

      {activePilotTab === 'perbandingan' ? (
        <>
          {/* 4 CORE BEFORE-AFTER IMPACT TILES */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Tile 1 */}
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-outline uppercase">Waktu Tempuh ke Pasar</span>
                <span className="material-symbols-outlined text-primary text-xl">schedule</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="font-tech-code-lg text-3xl font-bold text-secondary">18 Menit</p>
                <span className="text-xs text-error font-tech-code-sm line-through">48 Menit</span>
              </div>
              <p className="font-body-sm text-xs text-secondary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_down</span>
                <span>Efisiensi Waktu: -62.5%</span>
              </p>
            </div>

            {/* Tile 2 */}
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-outline uppercase">Susut Panen Pascapanen</span>
                <span className="material-symbols-outlined text-error text-xl">agriculture</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="font-tech-code-lg text-3xl font-bold text-secondary">3.1%</p>
                <span className="text-xs text-error font-tech-code-sm line-through">14.2%</span>
              </div>
              <p className="font-body-sm text-xs text-secondary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_down</span>
                <span>Penghematan: -78% Kerusakan</span>
              </p>
            </div>

            {/* Tile 3 */}
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-outline uppercase">Ongkos Angkut per Kuintal</span>
                <span className="material-symbols-outlined text-tertiary text-xl">local_shipping</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="font-tech-code-lg text-3xl font-bold text-secondary">Rp 18.000</p>
                <span className="text-xs text-error font-tech-code-sm line-through">Rp 35.000</span>
              </div>
              <p className="font-body-sm text-xs text-secondary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_down</span>
                <span>Margin Petani Meningkat: +48.5%</span>
              </p>
            </div>

            {/* Tile 4 */}
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-outline uppercase">Volume Tonase Terlayani</span>
                <span className="material-symbols-outlined text-secondary text-xl">inventory_2</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="font-tech-code-lg text-3xl font-bold text-primary">920 Ton/Bln</p>
                <span className="text-xs text-outline font-tech-code-sm line-through">420 Ton</span>
              </div>
              <p className="font-body-sm text-xs text-primary font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>Kapasitas Angkut: +119%</span>
              </p>
            </div>
          </div>

          {/* VISUAL CONDITION COMPARISON CARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-6 rounded-2xl border transition-all ${
                conditionToggle === 'before'
                  ? 'bg-error-container/20 border-error/50 ring-2 ring-error/30'
                  : 'bg-surface-container-low border-outline-variant/30 opacity-75'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-3">
                <span className="font-tech-code-md text-sm font-bold text-error uppercase">SEBELUM INTERVENSI (2024)</span>
                <span className="font-tech-code-sm text-xs text-outline">Perkerasan Makadam Rusak</span>
              </div>
              <ul className="space-y-2.5 text-xs text-on-surface-variant font-body-sm">
                <li className="flex items-start gap-2">
                  <span className="text-error font-bold">✕</span>
                  <span>IRI (Indeks Kerataan Jalan) rata-rata 11.4 m/km (kategori rusak parah).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error font-bold">✕</span>
                  <span>Tidak ada parit drainase samping, air hujan mengikis badan jalan selebar 1 meter.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error font-bold">✕</span>
                  <span>Truk cold-storage sayur sering terperosok saat musim penghujan (Oktober-Januari).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-error font-bold">✕</span>
                  <span>Cabai dan tomat mengalami memar benturan (mechanical bruising) hingga susut 14.2%.</span>
                </li>
              </ul>
            </div>

            <div
              className={`p-6 rounded-2xl border transition-all ${
                conditionToggle === 'after'
                  ? 'bg-secondary/10 border-secondary/50 ring-2 ring-secondary/30'
                  : 'bg-surface-container-low border-outline-variant/30 opacity-75'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-3">
                <span className="font-tech-code-md text-sm font-bold text-secondary uppercase">SESUDAH INTERVENSI (2026)</span>
                <span className="font-tech-code-sm text-xs text-secondary font-bold">Beton Rigid K-300 + Talud</span>
              </div>
              <ul className="space-y-2.5 text-xs text-on-surface-variant font-body-sm">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">✓</span>
                  <span>IRI menurun drastis menjadi 3.2 m/km (kategori mantap prima).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Talud penahan tanah sepanjang 1.200 meter di titik rawan longsor KM 4.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Waktu tempuh ke Pasar Roga Berastagi terpangkas dari 48 menit menjadi 18 menit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Harga jual sayur di tingkat petani meningkat 18% berkat kesegaran komoditas terjaga prima.</span>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        /* KELOMPOK TANI & FEEDBACK */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center font-tech-code-md">
                KT
              </span>
              <div>
                <h4 className="font-headline-md text-sm font-bold text-on-surface">Kelompok Tani Arih Ersada</h4>
                <p className="font-tech-code-sm text-[11px] text-on-surface-variant">Desa Naman • 48 Anggota Petani Cabai</p>
              </div>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant italic leading-relaxed">
              “Sebelum jalan dibeton, kalau hujan deras kami tidak berani panen karena truk penampung menolak masuk. Sekarang jam 5
              sore petik, jam 7 malam cabai sudah sampai di Berastagi dalam kondisi segar tanpa lecet.”
            </p>
            <span className="font-tech-code-sm text-[11px] text-secondary font-semibold block">Validasi Tim Lapangan DPUTR</span>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-secondary/20 text-secondary font-bold flex items-center justify-center font-tech-code-md">
                KP
              </span>
              <div>
                <h4 className="font-headline-md text-sm font-bold text-on-surface">Koperasi Horti Simalem</h4>
                <p className="font-tech-code-sm text-[11px] text-on-surface-variant">Kec. Simpang Empat • Distributor Jeruk</p>
              </div>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant italic leading-relaxed">
              “Biaya perbaikan suspensi armada kami turun 60%. Penurunan ongkos angkut Rp 17.000 per kuintal langsung kami alihkan
              sebagai kenaikan harga beli ke petani mitra.”
            </p>
            <span className="font-tech-code-sm text-[11px] text-secondary font-semibold block">Validasi Asosiasi Logistik</span>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-tertiary/20 text-tertiary font-bold flex items-center justify-center font-tech-code-md">
                BP
              </span>
              <div>
                <h4 className="font-headline-md text-sm font-bold text-on-surface">BPP Simpang Empat</h4>
                <p className="font-tech-code-sm text-[11px] text-on-surface-variant">Dinas Pertanian Kab. Karo</p>
              </div>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant italic leading-relaxed">
              “Data Indeks Kepuasan Petani mencapai 94.6%. Percontohan ini menjadi bukti bahwa metode multikriteria SPJPP tepat sasaran
              secara ekonomi dan tidak mubazir.”
            </p>
            <span className="font-tech-code-sm text-[11px] text-secondary font-semibold block">Penyuluh Pertanian Ahli</span>
          </div>
        </div>
      )}
    </div>
  );
};
