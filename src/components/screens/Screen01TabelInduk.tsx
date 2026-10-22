import React, { useState, useMemo } from 'react';
import { RoadSegment } from '../../data/mockData';
import { ScreenId } from '../Sidebar';

interface Screen01TabelIndukProps {
  roads: RoadSegment[];
  onSelectRoad: (road: RoadSegment) => void;
  onOpenRules: (mode: 'rules' | 'roadmap') => void;
  onOpenUploadCsv: () => void;
  onOpenRequestOpd: () => void;
  onNavigateScreen: (screen: ScreenId) => void;
}

export const Screen01TabelInduk: React.FC<Screen01TabelIndukProps> = ({
  roads,
  onSelectRoad,
  onOpenRules,
  onOpenUploadCsv,
  onOpenRequestOpd,
  onNavigateScreen,
}) => {
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('Semua');
  const [onlyMissingData, setOnlyMissingData] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filtered roads
  const filteredRoads = useMemo(() => {
    return roads.filter((r) => {
      const matchKec =
        selectedKecamatan === 'Semua' || r.kecamatan === selectedKecamatan;
      const matchMissing = onlyMissingData ? r.hasMissingData : true;
      return matchKec && matchMissing;
    });
  }, [roads, selectedKecamatan, onlyMissingData]);

  // Missing data count
  const missingCount = roads.filter((r) => r.hasMissingData).length;

  // Export to Excel / CSV simulation
  const exportToXlsx = () => {
    const headers =
      'ID Ruas,Nama Ruas,Kecamatan,Panjang (km),Lebar (m),Kewenangan,Kondisi Fisik,Tgl Survei,Drainase,Riwayat\n';
    const rows = filteredRoads
      .map(
        (r) =>
          `"${r.id}","${r.name}","${r.kecamatan}",${r.lengthKm},${r.widthM},"${r.jurisdiction}","${r.technicalCondition}","${r.surveyDate}","${r.drainage}","${r.lastHistory}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Inventarisasi_Ruas_Karo_TA2026_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg text-on-surface">
      {/* 1. BANNER PERMANEN PRINSIP */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm p-space-sm rounded-xl bg-surface-container-low/90 shadow-md">
        <div className="flex items-center gap-space-sm">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-tertiary-container/20 text-tertiary flex-shrink-0">
            <span className="material-symbols-outlined text-lg leading-none">
              warning
            </span>
          </div>
          <p className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">
            <span className="text-tertiary font-bold tracking-wide">MODE DEMO:</span>{' '}
            Data simulasi teknokratis DPUTR/BPS Kab. Karo. Seluruh penetapan prioritas
            mengikat pada evaluasi teknis lapangan dan alokasi APBD/IJD.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high text-primary self-start sm:self-auto flex-shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-sm leading-none text-primary">
            lock
          </span>
          <span className="font-tech-code-sm text-[11px] font-semibold tracking-tight text-on-surface">
            Bobot Terkunci Sebelum Data Diisi • Notulen Panel No. 04/SPJPP-KARO/2026
          </span>
        </div>
      </div>

      {/* 2. PRIORITAS JOURNEY TRACKER */}
      <section className="flex flex-col gap-space-md p-space-lg rounded-xl bg-surface-container-low shadow-xl relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none"></div>

        {/* Header Tracker */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md relative z-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary font-tech-code-sm text-tech-code-sm font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                Prioritas Journey Tracker
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant font-medium">
                Siklus Perencanaan Terpadu
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Satu Rangkaian dari Data ke Anggaran
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Integrasi linier tak terputus: Pilar Data (D) → Pilar Metode (M) →
              Pilar Kelembagaan (K) → Pilar Pembiayaan &amp; Dampak (P).
            </p>
          </div>
          <div className="flex items-center gap-space-sm flex-wrap">
            <button
              onClick={() => onOpenRules('roadmap')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-tech-code-sm text-tech-code-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-primary">
                menu_book
              </span>
              Panduan Roadmap
            </button>
            <button
              onClick={() => onOpenRules('rules')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-tech-code-sm text-tech-code-sm font-bold shadow-[0_0_16px_rgba(6,182,212,0.35)] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">
                rule_settings
              </span>
              Aturan Main &amp; Mesin Skor
            </button>
          </div>
        </div>

        {/* 4 Pilar Kartu Berdampingan */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md relative z-10">
          {/* Pilar 1: Aktif Sekarang */}
          <div className="flex flex-col justify-between p-space-md rounded-xl bg-surface-container-high/90 shadow-xl relative overflow-hidden group transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-container"></div>
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-tech-code-sm text-[11px] font-bold text-primary uppercase tracking-wider">
                  PILAR 1 • DATA &amp; GIS
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary font-tech-code-sm text-[10px] font-bold shadow-[0_0_8px_rgba(76,215,246,0.3)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  AKTIF SEKARANG
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface group-hover:text-primary transition-colors">
                Tabel Induk &amp; Peta Koridor
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Standardisasi ID ruas seragam, geolokasi presisi, kondisi fisik riil, dan
                delineasi koridor pertanian dari kantong sentra ke simpul pasar.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-tech-code-sm text-[10px] text-primary font-medium">
                  ID Ruas Seragam
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-tech-code-sm text-[10px] text-primary font-medium">
                  Kelengkapan ≥90%
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-tech-code-sm text-[10px] text-primary font-medium">
                  Koridor Pertanian
                </span>
              </div>
            </div>
            <div className="pt-space-md mt-space-md bg-surface-container-lowest/50 -mx-space-md -mb-space-md px-space-md py-2.5">
              <div className="flex items-center justify-between text-tech-code-sm font-tech-code-sm">
                <span className="text-on-surface-variant text-[11px]">
                  Progres Atribut:
                </span>
                <span className="text-primary font-bold text-[11px]">
                  72% / Target 90% (2027)
                </span>
              </div>
              <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: '72%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Pilar 2: Metode Penilaian */}
          <div
            onClick={() => onNavigateScreen('indeks-prioritas-6-kriteria')}
            className="flex flex-col justify-between p-space-md rounded-xl bg-surface-container/60 hover:bg-surface-container/80 transition-all opacity-90 shadow-md group cursor-pointer"
          >
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-tech-code-sm text-[11px] font-bold text-tertiary uppercase tracking-wider">
                  PILAR 2 • METODE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-tech-code-sm text-[10px]">
                  TAHAP BERIKUTNYA
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface group-hover:text-tertiary transition-colors">
                Indeks 6 Kriteria + Sensitivitas
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Pembobotan multikriteria C-P-A-B-R-M dengan bobot SK terkunci, penilaian
                isolasi kerentanan akses BPBD, serta simulasi 3 skenario robust.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-tech-code-sm text-[10px] text-tertiary font-medium">
                  C-P-A-B-R-M
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-tech-code-sm text-[10px] text-tertiary font-medium">
                  3 Skenario Bobot
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-tech-code-sm text-[10px] text-tertiary font-medium">
                  Bendera Risiko
                </span>
              </div>
            </div>
            <div className="pt-space-md mt-space-md bg-surface-container-lowest/30 -mx-space-md -mb-space-md px-space-md py-2.5">
              <span className="font-tech-code-sm text-[11px] text-on-surface-variant/80 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-tertiary">
                  lock_clock
                </span>
                Buka Matriks Pembobotan ➔
              </span>
            </div>
          </div>

          {/* Pilar 3: Kelembagaan */}
          <div
            onClick={() => onNavigateScreen('sk-tim-publikasi')}
            className="flex flex-col justify-between p-space-md rounded-xl bg-surface-container/60 hover:bg-surface-container/80 transition-all opacity-85 shadow-md group cursor-pointer"
          >
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-tech-code-sm text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                  PILAR 3 • KELEMBAGAAN
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-tech-code-sm text-[10px]">
                  TAHAP BERIKUTNYA
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface group-hover:text-primary transition-colors">
                SK Bupati &amp; Publikasi Peringkat
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Legalisasi Tim Kerja Lintas Sektor (DPUTR, Bappeda, Pertanian, BPBD),
                immutable decision audit log, dan penetapan portal transparansi publik.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-tech-code-sm text-[10px] text-on-surface-variant font-medium">
                  Tim SPJPP
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-tech-code-sm text-[10px] text-on-surface-variant font-medium">
                  Jejak Keputusan
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-tech-code-sm text-[10px] text-on-surface-variant font-medium">
                  SK Bupati Karo
                </span>
              </div>
            </div>
            <div className="pt-space-md mt-space-md bg-surface-container-lowest/30 -mx-space-md -mb-space-md px-space-md py-2.5">
              <span className="font-tech-code-sm text-[11px] text-on-surface-variant/80 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-outline">
                  verified
                </span>
                Legalitas &amp; Legitimasi Publik ➔
              </span>
            </div>
          </div>

          {/* Pilar 4: Pembiayaan & Dampak */}
          <div
            onClick={() => onNavigateScreen('integrasi-rkpd-anggaran')}
            className="flex flex-col justify-between p-space-md rounded-xl bg-surface-container/60 hover:bg-surface-container/80 transition-all opacity-85 shadow-md group cursor-pointer"
          >
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-tech-code-sm text-[11px] font-bold text-secondary uppercase tracking-wider">
                  PILAR 4 • PEMBIAYAAN
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-tech-code-sm text-[10px]">
                  TAHAP BERIKUTNYA
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface group-hover:text-secondary transition-colors">
                RKPD, Usulan Pusat &amp; Pilot
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Integrasi hasil pemeringkatan ke dokumen RKPD Karo 2029, usulan Inpres Jalan
                Daerah (IJD) KemenPUPR, dan uji petik dampak sebelum-sesudah.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-tech-code-sm text-[10px] text-secondary font-medium">
                  RKPD 2029
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-tech-code-sm text-[10px] text-secondary font-medium">
                  Inpres Jalan Daerah
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-tech-code-sm text-[10px] text-secondary font-medium">
                  Ukur Dampak Nyata
                </span>
              </div>
            </div>
            <div className="pt-space-md mt-space-md bg-surface-container-lowest/30 -mx-space-md -mb-space-md px-space-md py-2.5">
              <span className="font-tech-code-sm text-[11px] text-on-surface-variant/80 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">
                  monetization_on
                </span>
                APBD + DAK Tematik + APBN ➔
              </span>
            </div>
          </div>
        </div>

        {/* 3. STEPPER HORIZONTAL 5 LANGKAH & TIMELINE */}
        <div className="flex flex-col gap-space-sm pt-space-sm relative z-10">
          <div className="flex items-center justify-between pb-1">
            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider font-semibold">
              ALUR 5 TAHAPAN METODOLOGI TEKNOKRATIS
            </span>
            <span className="font-tech-code-sm text-tech-code-sm text-primary font-medium">
              Q4 2026 — 2029
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm">
            {/* Step 1 */}
            <div className="p-space-sm rounded-xl bg-surface-container-high/90 shadow-md relative ring-1 ring-primary/40">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-tech-code-sm text-tech-code-sm font-bold flex items-center justify-center">
                  1
                </span>
                <span className="px-1.5 py-0.2 rounded bg-primary/20 text-primary font-tech-code-sm text-[10px] font-bold">
                  📍 ANDA DI SINI
                </span>
              </div>
              <p className="font-headline-md text-sm font-bold text-on-surface">
                1. Inventarisasi Ruas
              </p>
              <p className="font-tech-code-sm text-[11px] text-primary mt-0.5">
                Mandat &amp; Audit Data
              </p>
              <span className="font-tech-code-sm text-[10px] text-on-surface-variant block mt-1">
                Q4 2026 — Q1 2027
              </span>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => onNavigateScreen('peta-koridor-pertanian')}
              className="p-space-sm rounded-xl bg-surface-container/70 hover:bg-surface-container shadow-sm relative cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant font-tech-code-sm text-tech-code-sm font-bold flex items-center justify-center">
                  2
                </span>
                <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant font-tech-code-sm text-[10px]">
                  TAHAP 2
                </span>
              </div>
              <p className="font-headline-md text-sm font-bold text-on-surface">
                2. Pemetaan Koridor
              </p>
              <p className="font-tech-code-sm text-[11px] text-on-surface-variant mt-0.5">
                Model Spasial GIS V.1
              </p>
              <span className="font-tech-code-sm text-[10px] text-on-surface-variant/70 block mt-1">
                Q1 — Q3 2027
              </span>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => onNavigateScreen('penilaian-risiko-akses')}
              className="p-space-sm rounded-xl bg-surface-container/70 hover:bg-surface-container shadow-sm relative cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant font-tech-code-sm text-tech-code-sm font-bold flex items-center justify-center">
                  3
                </span>
                <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant font-tech-code-sm text-[10px]">
                  TAHAP 3
                </span>
              </div>
              <p className="font-headline-md text-sm font-bold text-on-surface">
                3. Penilaian Kondisi &amp; Risiko
              </p>
              <p className="font-tech-code-sm text-[11px] text-on-surface-variant mt-0.5">
                Penetapan &amp; SK Bupati
              </p>
              <span className="font-tech-code-sm text-[10px] text-on-surface-variant/70 block mt-1">
                Q3 — Q4 2027
              </span>
            </div>

            {/* Step 4 */}
            <div
              onClick={() => onNavigateScreen('indeks-prioritas-6-kriteria')}
              className="p-space-sm rounded-xl bg-surface-container/70 hover:bg-surface-container shadow-sm relative cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant font-tech-code-sm text-tech-code-sm font-bold flex items-center justify-center">
                  4
                </span>
                <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant font-tech-code-sm text-[10px]">
                  TAHAP 4
                </span>
              </div>
              <p className="font-headline-md text-sm font-bold text-on-surface">
                4. Multikriteria + Sensitivitas
              </p>
              <p className="font-tech-code-sm text-[11px] text-on-surface-variant mt-0.5">
                Pilot Baseline Pemantauan
              </p>
              <span className="font-tech-code-sm text-[10px] text-on-surface-variant/70 block mt-1">
                Q4 2027 — Q4 2028
              </span>
            </div>

            {/* Step 5 */}
            <div
              onClick={() => onNavigateScreen('integrasi-rkpd-anggaran')}
              className="p-space-sm rounded-xl bg-surface-container/70 hover:bg-surface-container shadow-sm relative cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant font-tech-code-sm text-tech-code-sm font-bold flex items-center justify-center">
                  5
                </span>
                <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant font-tech-code-sm text-[10px]">
                  TAHAP 5
                </span>
              </div>
              <p className="font-headline-md text-sm font-bold text-on-surface">
                5. Penetapan &amp; Pengawasan
              </p>
              <p className="font-tech-code-sm text-[11px] text-on-surface-variant mt-0.5">
                Evaluasi &amp; Integrasi RKPD
              </p>
              <span className="font-tech-code-sm text-[10px] text-on-surface-variant/70 block mt-1">
                Tahun Anggaran 2029
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MODUL 01 - TABEL INDUK RUAS & PARADOKS DATA */}
      <section className="flex flex-col gap-space-lg">
        {/* Header Modul 01 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-primary-container text-on-primary font-tech-code-sm text-tech-code-sm font-bold tracking-wider">
                MODUL 01 • D.1
              </span>
              <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant uppercase">
                PILAR DATA INVENTARISASI DAERAH
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl font-extrabold text-on-surface tracking-tight">
              Tabel Induk Ruas &amp; Paradoks Data
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Kompilasi data ruas jalan produksi pertanian Tanah Karo, pembuktian
              kesenjangan logistik hortikultura, dan transparansi kelengkapan
              atribut teknis sebelum model pemeringkatan dijalankan.
            </p>
          </div>

          {/* Quick Action Pill */}
          <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-xl self-start lg:self-auto shadow-sm">
            <span className="px-3 py-1 rounded-lg bg-surface-container-high font-tech-code-sm text-tech-code-sm text-primary font-semibold">
              {roads.length} Ruas Terinspeksi
            </span>
            <span className="px-3 py-1 rounded-lg font-tech-code-sm text-tech-code-sm text-tertiary">
              {missingCount} Parameter Belum Lengkap
            </span>
          </div>
        </div>

        {/* 4 KARTU KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* KPI 1 */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm shadow-md hover:bg-surface-container transition-all">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
                Produksi 3 Komoditas 2025
              </span>
              <span className="material-symbols-outlined text-primary text-xl">
                agriculture
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-tech-code-lg text-2xl font-bold text-on-surface tracking-tight">
                  5.262.899
                </span>
                <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">
                  kuintal
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-secondary/20 text-secondary font-tech-code-sm text-[11px] font-bold">
                  ▲ +8,35% YoY
                </span>
                <span className="font-body-sm text-[11px] text-on-surface-variant/80">
                  Wortel, Tomat, Kubis
                </span>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between text-tech-code-sm font-tech-code-sm text-[10px] text-on-surface-variant/70 border-t border-outline-variant/20">
              <span>Sumber: BPS Kab. Karo 2025</span>
              <svg className="w-14 h-4 text-secondary" fill="none" viewBox="0 0 60 16">
                <polyline
                  points="0,14 15,12 30,9 45,6 60,2"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm shadow-md hover:bg-surface-container transition-all">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
                Kemantapan Jalan 2024
              </span>
              <span className="material-symbols-outlined text-tertiary text-xl">
                add_road
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-tech-code-lg text-2xl font-bold text-on-surface tracking-tight">
                  63,43%
                </span>
                <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">
                  kondisi mantap
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-tertiary-container/30 text-tertiary font-tech-code-sm text-[11px] font-bold">
                  Target 66,00%
                </span>
                <span className="font-body-sm text-[11px] text-error font-medium">
                  Selisih -2,57 poin
                </span>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between text-tech-code-sm font-tech-code-sm text-[10px] text-on-surface-variant/70 border-t border-outline-variant/20">
              <span>Sumber: DPUTR Bina Marga</span>
              <svg className="w-14 h-4 text-tertiary" fill="none" viewBox="0 0 60 16">
                <polyline
                  points="0,12 20,8 40,7 60,6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm shadow-md hover:bg-surface-container transition-all">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
                Kebutuhan vs Dana Daerah
              </span>
              <span className="material-symbols-outlined text-error text-xl">
                account_balance
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-tech-code-lg text-lg font-bold text-on-surface tracking-tight">
                  Rp1.100 T
                </span>
                <span className="font-tech-code-sm text-xs text-on-surface-variant">
                  vs
                </span>
                <span className="font-tech-code-lg text-lg font-bold text-error tracking-tight">
                  Rp10,67 T
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-error-container/30 text-error font-tech-code-sm text-[11px] font-bold">
                  Gap Anggaran ~99%
                </span>
                <span className="font-body-sm text-[11px] text-on-surface-variant/80">
                  Alokasi Fiskal ~1%
                </span>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between text-tech-code-sm font-tech-code-sm text-[10px] text-on-surface-variant/70 border-t border-outline-variant/20">
              <span>Sumber: Kajian Bappeda / IJD</span>
              <svg className="w-14 h-4 text-error" fill="none" viewBox="0 0 60 16">
                <polyline
                  points="0,4 25,6 45,14 60,15"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm shadow-md hover:bg-surface-container transition-all">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-semibold">
                Luas Panen 4 Komoditas
              </span>
              <span className="material-symbols-outlined text-secondary text-xl">
                landscape
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-tech-code-lg text-2xl font-bold text-on-surface tracking-tight">
                  21.321
                </span>
                <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">
                  hektare
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-secondary/15 text-secondary font-tech-code-sm text-[11px] font-medium">
                  Jeruk, Wortel, Kubis, Tomat
                </span>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between text-tech-code-sm font-tech-code-sm text-[10px] text-on-surface-variant/70 border-t border-outline-variant/20">
              <span>Sumber: Dinas Pertanian Karo</span>
              <svg className="w-14 h-4 text-secondary" fill="none" viewBox="0 0 60 16">
                <polyline
                  points="0,13 18,11 36,7 48,5 60,2"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 5. KARTU LEBAR 'Paradoks Produksi vs Kemantapan Jalan' */}
        <div className="p-space-lg rounded-xl bg-surface-container-low shadow-xl flex flex-col gap-space-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">
                  analytics
                </span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Visualisasi Paradoks: Lonjakan Hasil Panen vs Perlambatan Kemantapan Jalan
                </h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Komparasi data resmi BPS 2025 dan Realisasi Bina Marga DPUTR Karo TA
                2022-2024
              </p>
            </div>
            <div className="flex items-center gap-4 text-tech-code-sm font-tech-code-sm text-xs flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-primary"></span>
                <span className="text-on-surface">Produksi Hortikultura (Kuintal)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-tertiary"></span>
                <span className="text-on-surface">Realisasi Mantap (%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t border-dashed border-error"></span>
                <span className="text-error">Target Renstra (66,00%)</span>
              </div>
            </div>
          </div>

          {/* Grid Visualisasi Komparasi */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center">
            {/* Kolom Chart SVG Gabungan (8 Kolom) */}
            <div className="lg:col-span-8 p-space-md rounded-xl bg-surface-container-lowest/80 flex flex-col gap-space-md">
              <div className="flex items-center justify-between text-tech-code-sm font-tech-code-sm text-xs text-on-surface-variant">
                <span>Tren Komparasi 2022 - 2025</span>
                <span>Skala Relatif Terpadu</span>
              </div>
              {/* SVG Multi-layer Chart */}
              <div className="w-full h-56 relative flex items-center justify-center">
                <svg
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 680 200"
                >
                  {/* Grid lines */}
                  <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="40" x2="660" y1="30" y2="30" />
                  <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="40" x2="660" y1="80" y2="80" />
                  <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="40" x2="660" y1="130" y2="130" />
                  <line stroke="rgba(255,255,255,0.08)" strokeWidth="1" x1="40" x2="660" y1="170" y2="170" />

                  {/* Bar 1: Produksi 2024 */}
                  <rect fill="rgba(6,182,212,0.4)" height="100" rx="4" width="48" x="140" y="70" />
                  <text fill="#dce1fc" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="164" y="62">
                    4.857k
                  </text>
                  <text fill="#869397" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="164" y="188">
                    2024 (P)
                  </text>

                  {/* Bar 2: Produksi 2025 */}
                  <rect fill="#06b6d4" height="130" rx="4" width="48" x="440" y="40" />
                  <text fill="#acedff" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" textAnchor="middle" x="464" y="32">
                    5.262k
                  </text>
                  <text fill="#4cd7f6" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="464" y="188">
                    2025 (P)
                  </text>

                  {/* Target Line 66% */}
                  <line stroke="#ffb4ab" strokeDasharray="4,4" strokeWidth="2" x1="40" x2="660" y1="55" y2="55" />
                  <text fill="#ffb4ab" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="655" y="50">
                    Target 66,00%
                  </text>

                  {/* Kemantapan Line */}
                  <path d="M 110 120 L 310 95 L 510 88" fill="none" stroke="#ffb95f" strokeLinecap="round" strokeWidth="3" />
                  <circle cx="110" cy="120" fill="#191f32" r="5" stroke="#ffb95f" strokeWidth="3" />
                  <text fill="#ffb95f" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="110" y="142">
                    61,54%
                  </text>
                  <text fill="#869397" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="110" y="188">
                    2022
                  </text>

                  <circle cx="310" cy="95" fill="#191f32" r="5" stroke="#ffb95f" strokeWidth="3" />
                  <text fill="#ffb95f" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="310" y="85">
                    63,04%
                  </text>
                  <text fill="#869397" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="310" y="188">
                    2023
                  </text>

                  <circle cx="510" cy="88" fill="#191f32" r="6" stroke="#ffb95f" strokeWidth="3" />
                  <text fill="#ffddb8" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" textAnchor="middle" x="510" y="76">
                    63,43%
                  </text>
                  <text fill="#ffb95f" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="510" y="188">
                    2024
                  </text>
                </svg>
              </div>
              <div className="flex items-center justify-between text-tech-code-sm font-tech-code-sm text-[11px] text-on-surface-variant flex-wrap gap-2">
                <span>
                  Laju 2022-2023: <strong className="text-secondary">+1,50 poin</strong>
                </span>
                <span>
                  Laju 2023-2024: <strong className="text-tertiary">+0,39 poin</strong> (Deselerasi Pertumbuhan)
                </span>
                <span>
                  Selisih ke Target: <strong className="text-error">-2,57 poin</strong>
                </span>
              </div>
            </div>

            {/* Kolom Callout Insight Kotak Anotasi Amber (4 Kolom) */}
            <div className="lg:col-span-4 p-space-md rounded-xl bg-surface-container-high/90 shadow-md flex flex-col justify-between gap-space-sm h-full">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-tertiary">
                  <span className="material-symbols-outlined text-xl">report_problem</span>
                  <span className="font-headline-md text-sm font-bold uppercase tracking-wide">
                    Catatan Paradoks Kebijakan
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Volume panen hortikultura Karo melonjak tajam{' '}
                  <strong className="text-on-surface font-semibold">+8,35%</strong> pada 2025.
                  Namun di saat yang sama, percepatan perbaikan jalan mantap kabupaten
                  melambat drastis dari <strong className="text-on-surface font-semibold">1,50 poin</strong>{' '}
                  (2022–2023) menjadi hanya <strong className="text-on-surface font-semibold">0,39 poin</strong>{' '}
                  (2023–2024).
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Kesenjangan ini memicu <strong className="text-error">biaya logistik tersembunyi</strong>:
                  penurunan kesegaran produk sayur rentan, biaya angkut ganda saat hujan, dan
                  keterisolasian kantong panen saat cuaca ekstrem.
                </p>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-lowest/80 flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-xl">
                  verified_user
                </span>
                <div className="flex flex-col">
                  <span className="font-tech-code-sm text-[10px] text-on-surface-variant uppercase">
                    Rekomendasi Teknokratis
                  </span>
                  <span className="font-tech-code-sm text-tech-code-sm text-primary font-bold">
                    Wajibkan Koridor C-P-A-B-R-M
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. TABEL DATA DINAMIS 'Tabel Induk Ruas' */}
        <div className="flex flex-col gap-space-sm p-space-lg rounded-xl bg-surface-container-low shadow-xl">
          {/* Top Bar Kelengkapan Data */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-sm">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Tabel Induk Inventarisasi Ruas Pertanian
                </h3>
                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-tech-code-sm text-[11px] font-bold">
                  KAB. KARO TA 2026
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Data primer DPUTR &amp; Kompilasi Lapangan. Nilai kosong ditandai eksplisit tanpa data sintetis.
              </p>
            </div>

            {/* Progress Kelengkapan Meter */}
            <div className="flex flex-col gap-1 w-full md:w-80 p-space-sm rounded-xl bg-surface-container-lowest/70">
              <div className="flex items-center justify-between text-tech-code-sm font-tech-code-sm text-xs">
                <span className="text-on-surface-variant">Kelengkapan Atribut:</span>
                <span className="text-primary font-bold">
                  72% <span className="text-on-surface-variant font-normal">/ Target 90% (2027)</span>
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
                  style={{ width: '72%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm py-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={onOpenUploadCsv}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-tech-code-sm text-tech-code-sm transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm text-primary">
                  upload_file
                </span>
                Unggah / Impor CSV
              </button>

              <button
                onClick={() => setOnlyMissingData(!onlyMissingData)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-tech-code-sm text-tech-code-sm transition-all cursor-pointer ${
                  onlyMissingData
                    ? 'bg-tertiary text-on-tertiary font-bold shadow-sm'
                    : 'bg-tertiary-container/20 text-tertiary hover:bg-tertiary-container/30'
                }`}
              >
                <span className="material-symbols-outlined text-sm">filter_alt</span>
                Tandai Data Kosong ({missingCount} Ruas)
              </button>

              <button
                onClick={onOpenRequestOpd}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-tech-code-sm text-tech-code-sm transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm text-secondary">
                  forward_to_inbox
                </span>
                Ajukan Permintaan Data ke OPD
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={selectedKecamatan}
                  onChange={(e) => setSelectedKecamatan(e.target.value)}
                  className="h-8 pl-2.5 pr-8 rounded-lg bg-surface-container-lowest text-on-surface font-tech-code-sm text-tech-code-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all appearance-none border border-outline-variant/30"
                >
                  <option value="Semua">Filter: Semua Kecamatan</option>
                  <option value="Berastagi">Berastagi</option>
                  <option value="Kabanjahe">Kabanjahe</option>
                  <option value="Tigapanah">Tigapanah</option>
                  <option value="Simpang Empat">Simpang Empat</option>
                  <option value="Munte">Munte</option>
                  <option value="Dolat Rayat">Dolat Rayat</option>
                  <option value="Barusjahe">Barusjahe</option>
                  <option value="Payung">Payung</option>
                  <option value="Merek">Merek</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm pointer-events-none">
                  expand_more
                </span>
              </div>

              <button
                onClick={exportToXlsx}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary-container/30 text-secondary hover:bg-secondary-container/40 font-tech-code-sm text-tech-code-sm font-semibold transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Ekspor XLSX
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full overflow-x-auto rounded-xl bg-surface-container-lowest/90 shadow-inner">
            <table className="w-full text-left border-collapse text-body-sm font-body-sm">
              <thead>
                <tr className="bg-surface-container-high/90 text-on-surface-variant font-tech-code-sm text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3">ID Ruas</th>
                  <th className="py-3 px-3">Nama Ruas Jalan</th>
                  <th className="py-3 px-3">Kecamatan</th>
                  <th className="py-3 px-3 text-right">P (km)</th>
                  <th className="py-3 px-3 text-right">L (m)</th>
                  <th className="py-3 px-3">Kewenangan</th>
                  <th className="py-3 px-3">Kondisi Teknis</th>
                  <th className="py-3 px-3">Tgl Survei</th>
                  <th className="py-3 px-3">Koordinat Awal - Akhir</th>
                  <th className="py-3 px-3">Drainase</th>
                  <th className="py-3 px-3">Riwayat Terakhir</th>
                  <th className="py-3 px-3 text-center">Status Atribut</th>
                </tr>
              </thead>
              <tbody className="text-on-surface font-body-sm divide-y-0">
                {filteredRoads.map((row) => {
                  const isMissing = row.hasMissingData;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => onSelectRoad(row)}
                      className={`hover:bg-surface-container/60 transition-colors cursor-pointer ${
                        isMissing ? 'bg-tertiary-container/5' : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-tech-code-sm text-tech-code-sm text-primary font-bold">
                        {row.id}
                      </td>
                      <td className="py-3 px-3 font-medium text-on-surface">
                        {row.name}
                      </td>
                      <td className="py-3 px-3 font-tech-code-sm text-xs">
                        {row.kecamatan}
                      </td>
                      <td className="py-3 px-3 font-tech-code-sm text-xs text-right">
                        {row.lengthKm.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 font-tech-code-sm text-xs text-right">
                        {row.widthM.toFixed(2)}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-surface-container-high font-tech-code-sm text-[10px] text-on-surface-variant">
                          {row.jurisdiction}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-tech-code-sm text-[11px] font-bold ${
                            row.technicalCondition === 'Rusak Berat'
                              ? 'bg-error-container/30 text-error shadow-[0_0_8px_rgba(255,180,171,0.2)]'
                              : row.technicalCondition === 'Rusak Ringan'
                              ? 'bg-tertiary-container/30 text-tertiary'
                              : 'bg-secondary-container/30 text-secondary'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              row.technicalCondition === 'Rusak Berat'
                                ? 'bg-error'
                                : row.technicalCondition === 'Rusak Ringan'
                                ? 'bg-tertiary'
                                : 'bg-secondary'
                            }`}
                          ></span>{' '}
                          {row.technicalCondition}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-tech-code-sm text-xs text-on-surface-variant">
                        {row.surveyDate}
                      </td>
                      <td className="py-3 px-3 font-tech-code-sm text-[11px] text-on-surface-variant">
                        {row.startEndCoords.includes('Belum ada') ? (
                          <span className="px-2 py-0.5 rounded bg-tertiary-container/20 text-tertiary font-tech-code-sm text-[10px] font-medium">
                            ⚠️ {row.startEndCoords}
                          </span>
                        ) : (
                          row.startEndCoords
                        )}
                      </td>
                      <td
                        className={`py-3 px-3 font-tech-code-sm text-xs ${
                          row.drainage.includes('Belum ada')
                            ? 'text-tertiary font-semibold'
                            : row.drainage.includes('Tanpa') || row.drainage.includes('Rusak')
                            ? 'text-error'
                            : 'text-secondary'
                        }`}
                      >
                        {row.drainage}
                      </td>
                      <td className="py-3 px-3 font-tech-code-sm text-xs text-on-surface-variant">
                        {row.lastHistory.includes('Belum ada') ? (
                          <span className="px-2 py-0.5 rounded bg-tertiary-container/20 text-tertiary font-tech-code-sm text-[10px] font-medium">
                            ⚠️ {row.lastHistory}
                          </span>
                        ) : (
                          row.lastHistory
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded font-tech-code-sm text-[11px] ${
                            row.completenessPercent === 100
                              ? 'bg-secondary/15 text-secondary font-semibold'
                              : 'bg-tertiary/20 text-tertiary font-bold'
                          }`}
                        >
                          {row.completenessPercent === 100
                            ? 'Lengkap 100%'
                            : `Incomplete (${row.completenessPercent}%)`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer Tabel & Notice */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm pt-space-xs text-tech-code-sm font-tech-code-sm text-xs">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span>
                Catatan: Baris dengan penanda{' '}
                <strong className="text-tertiary">⚠️ Belum ada data</strong> tidak boleh
                diisi estimasi rekaan. Memerlukan ground-check resmi DPUTR.
              </span>
            </div>
            <div className="flex items-center gap-space-sm self-end sm:self-auto">
              <span className="text-on-surface-variant">
                Menampilkan 1-{filteredRoads.length} dari {roads.length} ruas prioritas pilot
              </span>
              <div className="flex items-center gap-1">
                <button
                  disabled
                  className="p-1 rounded bg-surface-container-high text-on-surface-variant opacity-50 cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-sm leading-none">
                    chevron_left
                  </span>
                </button>
                <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-bold text-xs">
                  {currentPage}
                </span>
                <button
                  disabled
                  className="p-1 rounded bg-surface-container-high text-on-surface-variant opacity-50 cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-sm leading-none">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
