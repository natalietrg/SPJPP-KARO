import React from 'react';

interface Screen90HariProps {
  onNavigate: (path: string) => void;
}

export const Screen90Hari: React.FC<Screen90HariProps> = ({ onNavigate }) => {
  const stages = [
    {
      phase: 'Tahap 1',
      period: 'Minggu 1 – 2',
      title: 'Konsolidasi Data Dasar & Audit Awal',
      status: 'Selesai 100%',
      badgeColor: 'text-secondary bg-secondary/15 border-secondary/30',
      actionTitle: 'Buka Tabel Induk Ruas (D.1)',
      targetPath: 'tabel-induk-ruas',
      tasks: [
        'Sinkronisasi 9 ruas prioritas koridor sentra hortikultura DPUTR Karo',
        'Penetapan baseline kondisi teknis jalan (IRI, SDP, Drainase)',
        'Pemberian stempel Belum Ada Data pada parameter belum terverifikasi',
      ],
    },
    {
      phase: 'Tahap 2',
      period: 'Minggu 3 – 4',
      title: 'Peta Spasial Koridor & Kajian Kebencanaan BPBD',
      status: 'Selesai 100%',
      badgeColor: 'text-secondary bg-secondary/15 border-secondary/30',
      actionTitle: 'Buka Peta Koridor GIS (D.2)',
      targetPath: 'peta-koridor-pertanian',
      tasks: [
        'Digitasi koridor GIS sentra agribisnis ke Pasar Roga Berastagi & Medan',
        'Overlay zona rawan longsor patahan tektonik lereng Sinabung & Sibayak',
        'Penetapan detour ketiadaan rute alternatif logistik sayur & jeruk',
      ],
    },
    {
      phase: 'Tahap 3',
      period: 'Minggu 5 – 7',
      title: 'Penguncian Bobot Enam Kriteria & Uji Sensitivitas',
      status: 'Selesai 100%',
      badgeColor: 'text-secondary bg-secondary/15 border-secondary/30',
      actionTitle: 'Buka Indeks Prioritas 6 Kriteria (M.1)',
      targetPath: 'indeks-prioritas-6-kriteria',
      tasks: [
        'Sidang Pleno Tim Koordinasi mengunci bobot C, P, A, B, R, M (Total 100%)',
        'Normalisasi Min-Max matematis anti-intervensi subjektif',
        'Simulasi 3 skenario bobot untuk memverifikasi konsistensi Kelas I (Kokoh)',
      ],
    },
    {
      phase: 'Tahap 4',
      period: 'Minggu 8 – 10',
      title: 'Legalisasi SK Tim Bupati & Penjodohan Pembiayaan RKPD',
      status: 'Sedang Berjalan (85%)',
      badgeColor: 'text-primary bg-primary/20 border-primary/40 animate-pulse',
      actionTitle: 'Buka Integrasi RKPD (P.1)',
      targetPath: 'integrasi-rkpd-anggaran',
      tasks: [
        'Penerbitan SK Bupati Karo No. 600/012/DPUTR/2025',
        'Penjodohan alokasi DAK Tematik Pertanian Rp 5,97 M & Inpres Jalan Daerah',
        'Validasi Readiness Criteria (RC) dan DED fisik jalan',
      ],
    },
    {
      phase: 'Tahap 5',
      period: 'Minggu 11 – 12',
      title: 'Peluncuran Pilot Percontohan & Portal Transparansi Publik',
      status: 'Jadwal Siap',
      badgeColor: 'text-tertiary bg-tertiary/20 border-tertiary/40',
      actionTitle: 'Buka Portal Transparansi Publik',
      targetPath: 'beranda-publik',
      tasks: [
        'Pengukuran baseline susut panen & waktu tempuh pada pilot Simpang Empat',
        'Pembukaan portal transparansi terbuka bagi masyarakat dan kelompok tani',
        'Audit berkala integritas basis data bersama BPKP Perwakilan Sumut',
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* HEADER BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-surface-container-low/60 p-6 rounded-2xl border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary font-tech-code-sm text-tech-code-sm uppercase font-bold tracking-wider">
              PANEL KEPUTUSAN EKSEKUTIF
            </span>
            <span className="text-outline text-tech-code-sm font-tech-code-sm">•</span>
            <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant uppercase tracking-wider">
              CRITICAL PATH 90 HARI KERJA
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
            Panel Keputusan 90 Hari SPJPP-Karo
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1">
            Garis waktu ketat 5 tahapan teknokratis dari inventarisasi data hingga penyerapan anggaran untuk memastikan penanganan jalan
            produksi pertanian tepat sasaran dan berintegritas tinggi.
          </p>
        </div>

        {/* 90-DAY PROGRESS SUMMARY */}
        <div className="flex items-center gap-4 bg-surface-container-high/60 p-3 rounded-xl border border-outline-variant/20">
          <div className="text-right">
            <span className="font-label-caps text-label-caps text-outline uppercase block">PROGRESS ROADMAP</span>
            <span className="font-tech-code-lg text-xl font-bold text-secondary">HARI KE-68 / 90</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-secondary/30 border-t-secondary flex items-center justify-center font-tech-code-md text-xs font-bold text-on-surface">
            75%
          </div>
        </div>
      </div>

      {/* 5-STAGE TIMELINE CARDS */}
      <div className="space-y-4">
        {stages.map((stg, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-primary/40 transition-all"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="font-tech-code-md text-sm font-bold text-primary">{stg.phase}</span>
                <span className="font-tech-code-sm text-xs text-outline">•</span>
                <span className="font-tech-code-sm text-xs text-on-surface-variant">{stg.period}</span>
                <span className={`px-2.5 py-0.5 rounded-full font-tech-code-sm text-xs font-bold border ${stg.badgeColor}`}>
                  {stg.status}
                </span>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-surface">{stg.title}</h3>
              <ul className="space-y-1 text-xs text-on-surface-variant font-body-sm pl-4 list-disc">
                {stg.tasks.map((task, tIdx) => (
                  <li key={tIdx}>{task}</li>
                ))}
              </ul>
            </div>

            <div className="self-stretch lg:self-auto flex items-center justify-end">
              <button
                onClick={() => onNavigate(stg.targetPath)}
                className="w-full lg:w-auto px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-body-sm text-sm font-semibold flex items-center justify-center gap-2 border border-outline-variant/30 transition-all"
              >
                <span>{stg.actionTitle}</span>
                <span className="material-symbols-outlined text-tech-code-md">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
