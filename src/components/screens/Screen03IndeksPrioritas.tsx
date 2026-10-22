import React, { useState } from 'react';
import { RoadItem } from '../../data/mockData';

interface Screen03IndeksPrioritasProps {
  roads: RoadItem[];
  onSelectRoad: (road: RoadItem) => void;
  onNavigate: (path: string) => void;
  onOpenRules: () => void;
}

export const Screen03IndeksPrioritas: React.FC<Screen03IndeksPrioritasProps> = ({
  roads,
  onSelectRoad,
  onNavigate,
  onOpenRules,
}) => {
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('Semua');
  const [filterClass, setFilterClass] = useState<string>('Semua');
  const [activeRoadId, setActiveRoadId] = useState<string>('RUAS-KR-04');

  // Filter list
  const filteredRoads = roads.filter((r) => {
    if (selectedKecamatan !== 'Semua' && r.kecamatan !== selectedKecamatan) return false;
    if (filterClass !== 'Semua' && r.kelas !== filterClass) return false;
    return true;
  });

  const activeRoad = roads.find((r) => r.id === activeRoadId) || roads[0];

  // Radar points computation
  // Values: C, P, A, B, R, M
  const cVal: number = activeRoad?.cNorm ?? activeRoad?.criteria.c ?? 0.92;
  const pVal: number = activeRoad?.pNorm ?? activeRoad?.criteria.p ?? 0.94;
  const aVal: number = activeRoad?.aNorm ?? activeRoad?.criteria.a ?? 0.82;
  const bVal: number = activeRoad?.bNorm ?? activeRoad?.criteria.b ?? 0.88;
  const rVal: number = activeRoad?.rNorm ?? activeRoad?.criteria.r ?? 0.85;
  const mVal: number = activeRoad?.mNorm ?? activeRoad?.criteria.m ?? 0.78;

  // Center (150, 150), radius = 130
  // C: top (angle -90 or 150, 150 - 130*cVal)
  const cPt = { x: 150, y: +(150 - 130 * cVal).toFixed(1) };
  // P: top-right (+30 deg from horizontal = angle -30)
  // x = 150 + 130 * pVal * cos(30), y = 150 - 130 * pVal * sin(30)
  const pPt = {
    x: +(150 + 130 * pVal * Math.cos(Math.PI / 6)).toFixed(1),
    y: +(150 - 130 * pVal * Math.sin(Math.PI / 6)).toFixed(1),
  };
  // A: bottom-right
  const aPt = {
    x: +(150 + 130 * aVal * Math.cos(Math.PI / 6)).toFixed(1),
    y: +(150 + 130 * aVal * Math.sin(Math.PI / 6)).toFixed(1),
  };
  // B: bottom
  const bPt = { x: 150, y: +(150 + 130 * bVal).toFixed(1) };
  // R: bottom-left
  const rPt = {
    x: +(150 - 130 * rVal * Math.cos(Math.PI / 6)).toFixed(1),
    y: +(150 + 130 * rVal * Math.sin(Math.PI / 6)).toFixed(1),
  };
  // M: top-left
  const mPt = {
    x: +(150 - 130 * mVal * Math.cos(Math.PI / 6)).toFixed(1),
    y: +(150 - 130 * mVal * Math.sin(Math.PI / 6)).toFixed(1),
  };

  const radarPolygonPoints = `${cPt.x},${cPt.y} ${pPt.x},${pPt.y} ${aPt.x},${aPt.y} ${bPt.x},${bPt.y} ${rPt.x},${rPt.y} ${mPt.x},${mPt.y}`;

  const handleExportCsv = () => {
    const headers = 'ID,Nama Ruas,Kecamatan,C_Norm,P_Norm,A_Norm,B_Norm,R_Norm,M_Norm,Skor_Indeks,Kelas,Stabilitas\n';
    const rows = filteredRoads
      .map(
        (r) =>
          `"${r.id}","${r.name}","${r.kecamatan}",${r.cNorm ?? r.criteria.c},${r.pNorm ?? r.criteria.p},${r.aNorm ?? r.criteria.a},${r.bNorm ?? r.criteria.b},${r.rNorm ?? r.criteria.r},${r.mNorm ?? r.criteria.m},${(r.score ?? r.compositeScore).toFixed(3)},"${r.kelas ?? r.priorityClass}","${r.stability ?? (r.isRobust ? 'Kokoh' : 'Sensitif')}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SPJPP_Prioritas_Enam_Kriteria_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* BANNER SIMULASI PROTOKOL TEKNOKRATIS */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low/90 backdrop-blur-md p-space-md shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md border border-outline-variant/30">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-start md:items-center gap-space-sm z-10">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-tertiary/15 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-headline-md leading-none">balance</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps uppercase text-tertiary font-bold tracking-widest px-2 py-0.5 rounded bg-tertiary/10">
                Mode Algoritmik
              </span>
              <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant font-semibold">
                M.1 Multi-Criteria Decision Analysis (MCDA)
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface mt-0.5 font-medium">
              Formula multikriteria objektif untuk mencegah intervensi subjektif dalam penentuan perbaikan jalan produksi.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 z-10 self-stretch md:self-auto justify-end">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high/90 border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">
              Model Akreditasi: BAPPEDA Karo TA 2026
            </span>
          </div>
        </div>
      </div>

      {/* HEADER MODUL METODOLOGI */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md bg-surface-container-low/50 p-space-lg rounded-2xl shadow-sm border border-outline-variant/20">
        <div className="space-y-space-xs max-w-4xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-secondary/15 text-secondary font-tech-code-sm text-tech-code-sm font-bold tracking-wider uppercase">
              Metode Pilar M.1
            </span>
            <span className="font-tech-code-sm text-tech-code-sm text-outline">Metode • Standar Teknis Karo</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl font-bold tracking-tight text-on-surface">
            Modul 03 - Indeks Prioritas Enam Kriteria (C-P-A-B-R-M)
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Pembobotan multikriteria terstandarisasi dengan normalisasi{' '}
            <span className="font-tech-code-sm text-primary font-semibold">min-max</span> dan penguncian parameter sebelum data
            dimasukkan untuk menjamin integritas alokasi infrastruktur tani.
          </p>
        </div>
        <div className="flex items-center gap-space-sm flex-wrap">
          <button
            onClick={onOpenRules}
            className="px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-body-sm text-body-sm font-medium flex items-center gap-2 transition-all shadow-sm border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-tech-code-md">description</span>
            <span>Buku Pedoman Metodologi</span>
          </button>
          <button
            onClick={() => onNavigate('uji-sensitivitas-bobot')}
            className="px-4 py-2.5 rounded-lg bg-primary-container hover:bg-surface-tint text-on-primary font-body-sm text-body-sm font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-cyan-500/25"
          >
            <span className="material-symbols-outlined text-tech-code-md">history_toggle_off</span>
            <span>Uji Simulasi Sensitivitas (M.3)</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD 3-COLUMN INTEGRATIVE LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        {/* ========================================== */}
        {/* KOLOM KIRI (3 Kolom): Panel Bobot Terkunci  */}
        {/* ========================================== */}
        <div className="xl:col-span-3 flex flex-col gap-space-md">
          {/* Status Penguncian SK Bupati / Notulen */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-surface-container-high/90 to-surface-container-low/95 p-space-md shadow-xl border border-outline-variant/30">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-tertiary/15 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between pb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary/15 text-tertiary font-tech-code-sm text-tech-code-sm font-bold tracking-wide">
                <span className="material-symbols-outlined text-tech-code-sm leading-none">lock</span>
                BOBOT TERKUNCI TIM SPJPP
              </span>
              <span className="font-tech-code-sm text-tech-code-sm text-secondary font-bold bg-secondary/10 px-2 py-0.5 rounded">
                TOTAL: 100%
              </span>
            </div>
            <div className="space-y-1.5 py-2">
              <p className="font-tech-code-sm text-[11px] text-on-surface-variant flex items-center justify-between">
                <span>Nomor Notulen:</span>
                <span className="text-on-surface font-semibold">02/BA-BOBOT/SPJPP/2026</span>
              </p>
              <p className="font-tech-code-sm text-[11px] text-on-surface-variant flex items-center justify-between">
                <span>Tanggal Pengesahan:</span>
                <span className="text-on-surface font-semibold">14 Januari 2026</span>
              </p>
              <p className="font-tech-code-sm text-[11px] text-on-surface-variant flex items-center justify-between">
                <span>Otoritas:</span>
                <span className="text-primary font-semibold">Tim Koordinasi Kab. Karo</span>
              </p>
            </div>
            <div className="mt-2 pt-2 bg-surface-container-lowest/60 rounded-lg p-2.5 flex items-center gap-2 border border-outline-variant/20">
              <span className="material-symbols-outlined text-tertiary text-tech-code-md">verified_user</span>
              <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
                Parameter terkunci otomatis oleh sistem kriptografi SHA-256 untuk mematuhi integritas audit BPKP.
              </p>
            </div>
          </div>

          {/* 6 Slider Kriteria (Disabled / Terkunci) */}
          <div className="rounded-xl bg-surface-container-low/80 backdrop-blur-md p-space-md shadow-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-2">
              <span className="font-headline-md text-headline-md font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-headline-md">tune</span>
                Vektor Bobot Kriteria
              </span>
              <span className="font-tech-code-sm text-tech-code-sm text-outline">Σ wj = 1.00</span>
            </div>

            {/* Slider List */}
            <div className="flex flex-col gap-3.5">
              {/* 1. C - Kondisi Teknis */}
              <div className="p-2.5 rounded-lg bg-surface-container-high/60 flex flex-col gap-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-primary/20 text-primary font-tech-code-sm text-tech-code-sm font-bold flex items-center justify-center">
                      C
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface font-semibold">Kondisi Teknis Jalan</span>
                  </div>
                  <span className="font-tech-code-md text-tech-code-md text-primary font-bold">25% (0.25)</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '25%' }}></div>
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant flex items-center justify-between">
                  <span>Sub-indikator: IRI, SDP, Drainase</span>
                  <span className="font-tech-code-sm text-[10px] text-outline">DPUTR</span>
                </p>
              </div>

              {/* 2. P - Hortikultura */}
              <div className="p-2.5 rounded-lg bg-surface-container-high/60 flex flex-col gap-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-secondary/20 text-secondary font-tech-code-sm text-tech-code-sm font-bold flex items-center justify-center">
                      P
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface font-semibold">Kepentingan Produksi</span>
                  </div>
                  <span className="font-tech-code-md text-tech-code-md text-secondary font-bold">25% (0.25)</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '25%' }}></div>
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant flex items-center justify-between">
                  <span>Sub-indikator: Volume panen kuintal</span>
                  <span className="font-tech-code-sm text-[10px] text-outline">Dinas Pertanian</span>
                </p>
              </div>

              {/* 3. A - Keterhubungan Pasar */}
              <div className="p-2.5 rounded-lg bg-surface-container-high/60 flex flex-col gap-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-primary-fixed/20 text-primary-fixed-dim font-tech-code-sm text-tech-code-sm font-bold flex items-center justify-center">
                      A
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface font-semibold">Akses ke Pasar/Sentra</span>
                  </div>
                  <span className="font-tech-code-md text-tech-code-md text-primary-fixed-dim font-bold">15% (0.15)</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-fixed-dim h-full rounded-full" style={{ width: '15%' }}></div>
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant flex items-center justify-between">
                  <span>Sub-indikator: Jarak ke Pasar Berastagi</span>
                  <span className="font-tech-code-sm text-[10px] text-outline">GIS Koridor</span>
                </p>
              </div>

              {/* 4. B - Penerima Manfaat */}
              <div className="p-2.5 rounded-lg bg-surface-container-high/60 flex flex-col gap-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-secondary-fixed/20 text-secondary-fixed-dim font-tech-code-sm text-tech-code-sm font-bold flex items-center justify-center">
                      B
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface font-semibold">Penerima Manfaat</span>
                  </div>
                  <span className="font-tech-code-md text-tech-code-md text-secondary-fixed-dim font-bold">10% (0.10)</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary-fixed-dim h-full rounded-full" style={{ width: '10%' }}></div>
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant flex items-center justify-between">
                  <span>Sub-indikator: KK Petani & Rasio Desa</span>
                  <span className="font-tech-code-sm text-[10px] text-outline">BPS Karo</span>
                </p>
              </div>

              {/* 5. R - Risiko Gangguan Akses */}
              <div className="p-2.5 rounded-lg bg-surface-container-high/60 flex flex-col gap-1.5 border border-error/30 ring-1 ring-error/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-error-container/40 text-error font-tech-code-sm text-tech-code-sm font-bold flex items-center justify-center">
                      R
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface font-semibold">Risiko Gangguan Akses</span>
                  </div>
                  <span className="font-tech-code-md text-tech-code-md text-error font-bold">15% (0.15)</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div className="bg-error h-full rounded-full" style={{ width: '15%' }}></div>
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant flex items-center justify-between">
                  <span>Sub-indikator: Rute alternatif, kerawanan longsor</span>
                  <span className="font-tech-code-sm text-[10px] text-error font-semibold">BPBD Karo</span>
                </p>
              </div>

              {/* 6. M - Pemeliharaan & Keberlanjutan */}
              <div className="p-2.5 rounded-lg bg-surface-container-high/60 flex flex-col gap-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-tertiary/20 text-tertiary font-tech-code-sm text-tech-code-sm font-bold flex items-center justify-center">
                      M
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface font-semibold">Pemeliharaan & DED</span>
                  </div>
                  <span className="font-tech-code-md text-tech-code-md text-tertiary font-bold">10% (0.10)</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{ width: '10%' }}></div>
                </div>
                <p className="font-body-sm text-[11px] text-on-surface-variant flex items-center justify-between">
                  <span>Sub-indikator: Kesiapan DED & Riwayat swadaya</span>
                  <span className="font-tech-code-sm text-[10px] text-outline">Bina Marga</span>
                </p>
              </div>
            </div>

            {/* Tombol Aksi Panel Bobot */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => onNavigate('log-audit')}
                className="w-full py-2.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-body-sm text-body-sm font-semibold flex items-center justify-center gap-2 transition-all border border-outline-variant/20"
              >
                <span className="material-symbols-outlined text-tech-code-md">history</span>
                <span>Buka Log Riwayat Bobot (v2.4)</span>
              </button>
              <button
                onClick={() => onNavigate('sk-tim-publikasi')}
                className="w-full py-2.5 px-3 rounded-lg bg-surface-container-low hover:bg-tertiary/15 text-tertiary font-body-sm text-body-sm font-semibold flex items-center justify-center gap-2 transition-all border border-tertiary/30"
              >
                <span className="material-symbols-outlined text-tech-code-md">gavel</span>
                <span>Ajukan Perubahan (Rapat Pleno)</span>
              </button>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-space-md rounded-xl bg-surface-container-low/60 flex items-start gap-3 border border-outline-variant/20">
            <span className="material-symbols-outlined text-secondary text-headline-md flex-shrink-0 mt-0.5">verified</span>
            <div className="space-y-1">
              <p className="font-headline-md text-body-md font-bold text-on-surface">Validitas Algoritmik</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Metode ini mengacu pada Permen PUPR & Pedoman Teknis DAK Tematik Penguatan Sentra Hortikultura Dataran Tinggi.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* KOLOM TENGAH (6 Kolom): Tabel Ranking Ruas  */}
        {/* ========================================== */}
        <div className="xl:col-span-6 flex flex-col gap-space-md">
          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm p-3 rounded-xl bg-surface-container-low/90 backdrop-blur-md shadow-md border border-outline-variant/30">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setFilterClass('Semua')}
                className={`px-3 py-1.5 rounded-lg font-tech-code-sm text-tech-code-sm font-bold transition-all ${
                  filterClass === 'Semua' ? 'bg-surface-container-high text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Semua ({roads.length})
              </button>
              <button
                onClick={() => setFilterClass('Kelas I')}
                className={`px-3 py-1.5 rounded-lg font-tech-code-sm text-tech-code-sm flex items-center gap-1 transition-all ${
                  filterClass === 'Kelas I' ? 'bg-error-container/40 text-error font-bold' : 'text-error hover:bg-surface-container-high'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-error"></span>
                Kelas I ({roads.filter((r) => r.kelas === 'Kelas I').length})
              </button>
              <button
                onClick={() => setFilterClass('Kelas II')}
                className={`px-3 py-1.5 rounded-lg font-tech-code-sm text-tech-code-sm flex items-center gap-1 transition-all ${
                  filterClass === 'Kelas II' ? 'bg-tertiary/20 text-tertiary font-bold' : 'text-tertiary hover:bg-surface-container-high'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                Kelas II ({roads.filter((r) => r.kelas === 'Kelas II').length})
              </button>
              <button
                onClick={() => setFilterClass('Kelas III')}
                className={`px-3 py-1.5 rounded-lg font-tech-code-sm text-tech-code-sm flex items-center gap-1 transition-all ${
                  filterClass === 'Kelas III' ? 'bg-secondary/20 text-secondary font-bold' : 'text-secondary hover:bg-surface-container-high'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Kelas III ({roads.filter((r) => r.kelas === 'Kelas III').length})
              </button>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedKecamatan}
                onChange={(e) => setSelectedKecamatan(e.target.value)}
                className="h-9 px-3 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
              >
                <option value="Semua">Semua Kecamatan</option>
                <option value="Simpang Empat">Simpang Empat</option>
                <option value="Naman Teran">Naman Teran</option>
                <option value="Tigapanah">Tigapanah</option>
                <option value="Dolat Rayat">Dolat Rayat</option>
                <option value="Merek">Merek</option>
                <option value="Payung">Payung</option>
                <option value="Barusjahe">Barusjahe</option>
                <option value="Laubaleng">Laubaleng</option>
                <option value="Munte">Munte</option>
              </select>
              <button
                onClick={handleExportCsv}
                className="h-9 px-3 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary font-tech-code-sm text-tech-code-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm border border-outline-variant/30"
                title="Unduh CSV Hasil Pemeringkatan"
              >
                <span className="material-symbols-outlined text-tech-code-md">download</span>
                <span className="hidden sm:inline">CSV</span>
              </button>
            </div>
          </div>

          {/* Tabel Heatmap Peringkat */}
          <div className="rounded-xl bg-surface-container-low/95 backdrop-blur-md shadow-xl overflow-hidden flex flex-col border border-outline-variant/30">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/90 text-outline border-b border-outline-variant/30">
                    <th className="py-3 px-3 font-tech-code-sm text-[11px] uppercase tracking-wider text-center w-12">Rnk</th>
                    <th className="py-3 px-3 font-tech-code-sm text-[11px] uppercase tracking-wider min-w-[170px]">
                      Ruas & Kecamatan
                    </th>
                    <th className="py-3 px-2 font-tech-code-sm text-[11px] text-primary uppercase text-center" title="Bobot: 25%">
                      C
                    </th>
                    <th className="py-3 px-2 font-tech-code-sm text-[11px] text-secondary uppercase text-center" title="Bobot: 25%">
                      P
                    </th>
                    <th
                      className="py-3 px-2 font-tech-code-sm text-[11px] text-primary-fixed uppercase text-center"
                      title="Bobot: 15%"
                    >
                      A
                    </th>
                    <th
                      className="py-3 px-2 font-tech-code-sm text-[11px] text-secondary-fixed uppercase text-center"
                      title="Bobot: 10%"
                    >
                      B
                    </th>
                    <th className="py-3 px-2 font-tech-code-sm text-[11px] text-error uppercase text-center" title="Bobot: 15%">
                      R
                    </th>
                    <th className="py-3 px-2 font-tech-code-sm text-[11px] text-tertiary uppercase text-center" title="Bobot: 10%">
                      M
                    </th>
                    <th className="py-3 px-3 font-tech-code-sm text-[11px] uppercase tracking-wider text-right">Skor (I)</th>
                    <th className="py-3 px-3 font-tech-code-sm text-[11px] uppercase tracking-wider text-center">Kelas & Kokoh</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-on-surface font-body-sm text-body-sm">
                  {filteredRoads.map((road, idx) => {
                    const isSelected = road.id === activeRoadId;
                    const cNorm = road.cNorm ?? road.criteria.c;
                    const pNorm = road.pNorm ?? road.criteria.p;
                    const aNorm = road.aNorm ?? road.criteria.a;
                    const bNorm = road.bNorm ?? road.criteria.b;
                    const rNorm = road.rNorm ?? road.criteria.r;
                    const mNorm = road.mNorm ?? road.criteria.m;
                    const score = road.score ?? road.compositeScore;
                    const kelas = road.kelas ?? road.priorityClass;
                    const stability = road.stability ?? (road.isRobust ? 'Kokoh' : 'Sensitif');

                    return (
                      <tr
                        key={road.id}
                        onClick={() => setActiveRoadId(road.id)}
                        className={`transition-colors cursor-pointer group ${
                          isSelected ? 'bg-primary/15 ring-1 ring-primary/40' : 'hover:bg-surface-container-high/50'
                        }`}
                      >
                        <td className="py-3 px-3 text-center font-tech-code-md text-tech-code-md font-bold text-primary">
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td className="py-3 px-3 min-w-[170px]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-on-surface group-hover:text-primary transition-colors leading-tight">
                              {road.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 font-tech-code-sm text-[10px] text-on-surface-variant">
                            <span>{road.id}</span>
                            <span>•</span>
                            <span>Kec. {road.kecamatan}</span>
                          </div>
                        </td>
                        {/* Heatmap Normalized values: 0.00 - 1.00 */}
                        <td className="py-3 px-2 text-center font-tech-code-sm font-semibold bg-primary/20 text-on-surface">
                          {cNorm.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-center font-tech-code-sm font-semibold bg-secondary/25 text-on-surface">
                          {pNorm.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-center font-tech-code-sm font-semibold bg-primary-fixed/20 text-on-surface">
                          {aNorm.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-center font-tech-code-sm font-semibold bg-secondary-fixed/20 text-on-surface">
                          {bNorm.toFixed(2)}
                        </td>
                        <td
                          className={`py-3 px-2 text-center font-tech-code-sm font-bold ${
                            rNorm >= 0.7 ? 'bg-error/30 text-error' : 'bg-error/10 text-on-surface'
                          }`}
                          title={rNorm >= 0.7 ? 'Skor Risiko > 0.70 (Kerentanan Tinggi)' : 'Risiko Terkendali'}
                        >
                          {rNorm.toFixed(2)}
                          {rNorm >= 0.7 && <span className="inline-block text-[11px] leading-none ml-0.5">🚩</span>}
                        </td>
                        <td className="py-3 px-2 text-center font-tech-code-sm font-semibold bg-tertiary/15 text-on-surface">
                          {mNorm.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 text-right font-tech-code-lg text-tech-code-lg font-bold text-primary">
                          {score.toFixed(3)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span
                              className={`px-2 py-0.5 rounded-full font-tech-code-sm text-[10px] font-bold tracking-wider uppercase ${
                                kelas === 'Kelas I'
                                  ? 'bg-error-container/40 text-error'
                                  : kelas === 'Kelas II'
                                  ? 'bg-tertiary/20 text-tertiary'
                                  : 'bg-secondary/20 text-secondary'
                              }`}
                            >
                              {kelas}
                            </span>
                            {stability === 'Kokoh' ? (
                              <span
                                className="inline-flex items-center gap-0.5 text-[10px] font-tech-code-sm text-tertiary bg-tertiary/10 px-1.5 py-0.2 rounded font-semibold"
                                title="Tetap di Kelas I pada sedikitnya 2 dari 3 skenario"
                              >
                                ⭐ Kokoh
                              </span>
                            ) : (
                              <span className="text-[10px] font-tech-code-sm text-outline">-</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer Keterangan Tabel */}
            <div className="p-3 bg-surface-container-high/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-on-surface-variant font-tech-code-sm text-[11px] border-t border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="text-tertiary">⭐ Prioritas Kokoh:</span>
                <span>Menandakan ruas tetap di Kelas I pada sedikitnya 2 dari 3 skenario sensitivitas.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-error">🚩 Bendera Risiko:</span>
                <span>Nilai R &gt; 0.70 (Urgen mitigasi isolasi).</span>
              </div>
            </div>
          </div>

          {/* Detail Card Ruas Terpilih (Micro-View) */}
          {activeRoad && (
            <div className="p-space-md rounded-xl bg-surface-container-low/80 backdrop-blur-md shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md border border-outline-variant/30">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-tech-code-sm text-[11px] font-bold">
                    TERPILIH
                  </span>
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface">{activeRoad.name}</h2>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {activeRoad.corridor} • Sentra {activeRoad.commodity} • Panjang: {activeRoad.lengthKm} km • Estimasi Biaya:{' '}
                  {activeRoad.estimatedCost}
                </p>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => onNavigate('peta-koridor-pertanian')}
                  className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-body-sm text-body-sm font-semibold transition-all border border-outline-variant/20"
                >
                  Lihat di GIS (D.2)
                </button>
                <button
                  onClick={() => onSelectRoad(activeRoad)}
                  className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-sm text-body-sm font-bold transition-all shadow-md"
                >
                  Detail & Inspeksi Lengkap
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================== */}
        {/* KOLOM KANAN (3 Kolom): Radar Chart & Rumus */}
        {/* ========================================== */}
        <div className="xl:col-span-3 flex flex-col gap-space-md">
          {/* Radar Chart Card (SVG Native) */}
          <div className="rounded-xl bg-surface-container-low/85 backdrop-blur-md p-space-md shadow-xl flex flex-col gap-space-sm border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <span className="font-headline-md text-headline-md font-semibold text-on-surface">Radar Enam Kriteria</span>
              <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-tech-code-sm text-[10px] font-bold">
                {activeRoad.id}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
              Sebaran skor ternormalisasi (0 - 1) untuk Ruas {activeRoad.name}.
            </p>

            {/* Inline SVG Radar Chart */}
            <div className="relative w-full aspect-square flex items-center justify-center py-2">
              <svg className="w-full h-full max-w-[260px] overflow-visible" viewBox="0 0 300 300">
                {/* Background Hexagon Webs (100%, 75%, 50%, 25%) */}
                <polygon
                  className="text-surface-container-highest stroke-surface-bright/50"
                  fill="none"
                  points="150,20 262,85 262,215 150,280 38,215 38,85"
                  strokeWidth="1.5"
                ></polygon>
                <polygon
                  className="text-surface-container-highest/60 stroke-surface-bright/30"
                  fill="none"
                  points="150,52 234,101 234,199 150,248 66,199 66,101"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                ></polygon>
                <polygon
                  className="text-surface-container-highest/40 stroke-surface-bright/20"
                  fill="none"
                  points="150,85 206,117 206,183 150,215 94,183 94,117"
                  strokeWidth="1"
                ></polygon>
                <polygon
                  className="text-surface-container-highest/20 stroke-surface-bright/10"
                  fill="none"
                  points="150,117 178,134 178,166 150,183 122,166 122,134"
                  strokeDasharray="2 2"
                  strokeWidth="1"
                ></polygon>

                {/* Axis Spokes */}
                <line stroke="rgba(255,255,255,0.12)" strokeWidth="1" x1="150" x2="150" y1="150" y2="20"></line>
                <line stroke="rgba(255,255,255,0.12)" strokeWidth="1" x1="150" x2="262" y1="150" y2="85"></line>
                <line stroke="rgba(255,255,255,0.12)" strokeWidth="1" x1="150" x2="262" y1="150" y2="215"></line>
                <line stroke="rgba(255,255,255,0.12)" strokeWidth="1" x1="150" x2="150" y1="150" y2="280"></line>
                <line stroke="rgba(255,255,255,0.12)" strokeWidth="1" x1="150" x2="38" y1="150" y2="215"></line>
                <line stroke="rgba(255,255,255,0.12)" strokeWidth="1" x1="150" x2="38" y1="150" y2="85"></line>

                {/* Data Polygon */}
                <polygon
                  fill="rgba(76, 215, 246, 0.25)"
                  points={radarPolygonPoints}
                  stroke="#4cd7f6"
                  strokeWidth="2.5"
                ></polygon>

                {/* Point Dots */}
                <circle cx={cPt.x} cy={cPt.y} fill="#4cd7f6" r="4"></circle>
                <circle cx={pPt.x} cy={pPt.y} fill="#4edea3" r="4"></circle>
                <circle cx={aPt.x} cy={aPt.y} fill="#acedff" r="4"></circle>
                <circle cx={bPt.x} cy={bPt.y} fill="#6ffbbe" r="4"></circle>
                <circle
                  className={rVal >= 0.7 ? 'animate-pulse' : ''}
                  cx={rPt.x}
                  cy={rPt.y}
                  fill="#ffb4ab"
                  r={rVal >= 0.7 ? 5 : 4}
                ></circle>
                <circle cx={mPt.x} cy={mPt.y} fill="#ffb95f" r="4"></circle>

                {/* Spoke Labels with Values */}
                <text className="fill-primary font-tech-code-sm text-[11px] font-bold" textAnchor="middle" x="150" y="10">
                  C ({cVal.toFixed(2)})
                </text>
                <text className="fill-secondary font-tech-code-sm text-[11px] font-bold" textAnchor="start" x="270" y="85">
                  P ({pVal.toFixed(2)})
                </text>
                <text className="fill-primary-fixed-dim font-tech-code-sm text-[11px] font-bold" textAnchor="start" x="268" y="222">
                  A ({aVal.toFixed(2)})
                </text>
                <text className="fill-secondary-fixed-dim font-tech-code-sm text-[11px] font-bold" textAnchor="middle" x="150" y="298">
                  B ({bVal.toFixed(2)})
                </text>
                <text className="fill-error font-tech-code-sm text-[11px] font-bold" textAnchor="end" x="25" y="222">
                  R ({rVal.toFixed(2)}) {rVal >= 0.7 && '🚩'}
                </text>
                <text className="fill-tertiary font-tech-code-sm text-[11px] font-bold" textAnchor="end" x="25" y="85">
                  M ({mVal.toFixed(2)})
                </text>
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant/30 text-[11px] font-tech-code-sm">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span>Produksi: {pVal >= 0.8 ? 'Sangat Tinggi' : 'Sedang'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-error font-bold">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span>{rVal >= 0.7 ? 'Kerentanan Tinggi' : 'Risiko Normal'}</span>
              </div>
            </div>
          </div>

          {/* Card Formulasi Matematis Transparan */}
          <div className="rounded-xl bg-surface-container-lowest/90 backdrop-blur-md p-space-md shadow-xl flex flex-col gap-space-sm border-l-4 border-primary border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <span className="font-tech-code-sm text-tech-code-sm text-primary uppercase font-bold tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-tech-code-md">functions</span>
                Formulasi Matematis
              </span>
              <span className="font-tech-code-sm text-[10px] text-outline">Metode Min-Max</span>
            </div>

            {/* Code Block Formula */}
            <div className="bg-surface-container-high/60 rounded-lg p-3 font-tech-code-sm text-tech-code-sm text-on-surface leading-relaxed border border-outline-variant/20">
              <div className="text-primary font-bold">Ii = Σ (wj · zij)</div>
              <div className="text-secondary mt-1">zij = (xij − min(xj)) / (max(xj) − min(xj))</div>
            </div>

            {/* Formula Legend */}
            <div className="space-y-1.5 text-[11px] font-tech-code-sm text-on-surface-variant">
              <p className="font-bold text-on-surface">Keterangan Variabel:</p>
              <div className="grid grid-cols-12 gap-1">
                <span className="col-span-2 text-primary font-bold">Ii</span>
                <span className="col-span-10">: Nilai Indeks Prioritas Ruas ke-i</span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                <span className="col-span-2 text-secondary font-bold">wj</span>
                <span className="col-span-10">: Bobot Kriteria ke-j (Σ wj = 1.00)</span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                <span className="col-span-2 text-primary-fixed-dim font-bold">zij</span>
                <span className="col-span-10">: Nilai Ternormalisasi Kriteria ke-j</span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                <span className="col-span-2 text-outline font-bold">xij</span>
                <span className="col-span-10">: Nilai Mentah Indikator Lapangan</span>
              </div>
            </div>

            <button
              onClick={onOpenRules}
              className="w-full mt-1 py-2 px-3 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary font-body-sm text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-tech-code-md">table_view</span>
              <span>Lihat Detail Normalisasi & Aturan</span>
            </button>
          </div>

          {/* Mandatory Institutional Disclaimer */}
          <div className="p-3 rounded-xl bg-surface-container-low/50 flex items-start gap-2.5 border border-outline-variant/20">
            <span className="material-symbols-outlined text-outline text-headline-md flex-shrink-0 mt-0.5">info</span>
            <p className="font-body-sm text-[11px] text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">Disclaimer Mandatori:</strong> Indeks ini bersifat rekomendasi teknokratis
              objektif. Penetapan akhir penanganan jalan tetap melalui verifikasi teknis lapangan DPUTR dan ketersediaan
              alokasi APBD/APBN/DAK.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
