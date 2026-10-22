import React from 'react';
import { RoadItem } from '../../data/mockData';

interface Screen06RkpdAnggaranProps {
  roads: RoadItem[];
  onSelectRoad: (road: RoadItem) => void;
  onNavigate: (path: string) => void;
}

export const Screen06RkpdAnggaran: React.FC<Screen06RkpdAnggaranProps> = ({ roads, onSelectRoad, onNavigate }) => {
  const proposals = [
    {
      id: 'PROP-DAK-01',
      roadId: 'RUAS-KR-04',
      name: 'Simpang Empat – Naman Teran',
      fundingSource: 'DAK Tematik Pertanian',
      targetYear: 'TA 2026',
      allocation: 'Rp 3,82 Miliar',
      panjang: '6.4 km',
      rcStatus: 'RC Lengkap (100%)',
      dedStatus: 'DED DPUTR Selesai',
      sipdStatus: 'Tervalidasi SIPD',
      prioritas: 'Kelas I (Skor: 0.887)',
    },
    {
      id: 'PROP-IJD-02',
      roadId: 'RUAS-KR-12',
      name: 'Tigapanah – Sukarame',
      fundingSource: 'Inpres Jalan Daerah (IJD)',
      targetYear: 'TA 2026',
      allocation: 'Rp 4,95 Miliar',
      panjang: '8.1 km',
      rcStatus: 'RC 90% (Lahan Bebas)',
      dedStatus: 'DED DPUTR 2025',
      sipdStatus: 'Diajukan ke Balai BBPJN',
      prioritas: 'Kelas I (Skor: 0.835)',
    },
    {
      id: 'PROP-APBD-03',
      roadId: 'RUAS-KR-01',
      name: 'Kabanjahe – Singa',
      fundingSource: 'APBD Karo Murni',
      targetYear: 'TA 2026',
      allocation: 'Rp 2,40 Miliar',
      panjang: '5.2 km',
      rcStatus: 'RC Lengkap (100%)',
      dedStatus: 'DED Tersedia',
      sipdStatus: 'Masuk Renja DPUTR',
      prioritas: 'Kelas I (Skor: 0.796)',
    },
    {
      id: 'PROP-DAK-04',
      roadId: 'RUAS-KR-08',
      name: 'Dolat Rayat – Kubusimbelang',
      fundingSource: 'DAK Tematik Pengentasan Kemiskinan',
      targetYear: 'TA 2026',
      allocation: 'Rp 2,15 Miliar',
      panjang: '4.7 km',
      rcStatus: 'RC 80% (Kajian Lingkungan)',
      dedStatus: 'Revisi DED 2026',
      sipdStatus: 'Antrean RKPD',
      prioritas: 'Kelas II (Skor: 0.742)',
    },
  ];

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* HEADER BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-surface-container-low/60 p-6 rounded-2xl border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary font-tech-code-sm text-tech-code-sm uppercase font-bold tracking-wider">
              PILAR P.1 • P.2 PEMBIAYAAN
            </span>
            <span className="text-outline text-tech-code-sm font-tech-code-sm">•</span>
            <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant uppercase tracking-wider">
              SINKRONISASI RKPD 2026 & USULAN PUSAT
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
            Integrasi RKPD & Usulan Anggaran Multi-Jalur
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1">
            Penjodohan otomatis hasil pemeringkatan objektif (Kelas I) ke dalam jendela pembiayaan DAK Tematik Pertanian, Inpres Jalan
            Daerah (IJD), APBD Kabupaten Karo, dan program sinergi swadaya tani.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('pilot-sebelum-sesudah')}
            className="px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-body-sm text-body-sm font-medium flex items-center gap-2 border border-outline-variant/20 transition-all"
          >
            <span className="material-symbols-outlined text-tech-code-md">query_stats</span>
            <span>Evaluasi Pilot Dampak (P.3)</span>
          </button>
        </div>
      </div>

      {/* METRICS BUDGET CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-1">
          <span className="font-label-caps text-label-caps text-outline uppercase">Total Alokasi Terpetakan</span>
          <p className="font-tech-code-lg text-2xl text-primary font-bold">Rp 13,32 M</p>
          <p className="font-body-sm text-xs text-on-surface-variant">4 Ruas Prioritas Tertinggi Kelas I & II</p>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-1">
          <span className="font-label-caps text-label-caps text-outline uppercase">Porsi DAK Tematik</span>
          <p className="font-tech-code-lg text-2xl text-secondary font-bold">Rp 5,97 M (45%)</p>
          <p className="font-body-sm text-xs text-on-surface-variant">Kemenkeu & Kementerian PUPR</p>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-1">
          <span className="font-label-caps text-label-caps text-outline uppercase">Porsi Inpres Jalan (IJD)</span>
          <p className="font-tech-code-lg text-2xl text-primary-fixed font-bold">Rp 4,95 M (37%)</p>
          <p className="font-body-sm text-xs text-on-surface-variant">BBPJN Wilayah II Sumatera Utara</p>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-1">
          <span className="font-label-caps text-label-caps text-outline uppercase">Porsi APBD Murni Karo</span>
          <p className="font-tech-code-lg text-2xl text-tertiary font-bold">Rp 2,40 M (18%)</p>
          <p className="font-body-sm text-xs text-on-surface-variant">Pos Anggaran Bina Marga DPUTR</p>
        </div>
      </div>

      {/* PROPOSAL MATCHING TABLE */}
      <div className="p-6 rounded-2xl bg-surface-container-low shadow-xl border border-outline-variant/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              Matriks Usulan Penanganan Berdasarkan Kelas Prioritas
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Tiap usulan memenuhi Readiness Criteria (RC) DAK dan terhubung dengan kode akun SIPD Kemendagri
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary font-tech-code-sm text-xs font-bold border border-secondary/30">
            SINKRONISASI SIPD: REALTIME
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/90 text-outline font-tech-code-sm text-[11px] uppercase tracking-wider border-b border-outline-variant/30">
                <th className="py-3 px-3">Kode Proposal</th>
                <th className="py-3 px-4">Nama Ruas & Kelas</th>
                <th className="py-3 px-3">Sumber Pembiayaan</th>
                <th className="py-3 px-3">Panjang & Alokasi</th>
                <th className="py-3 px-3">Kesiapan DED & RC</th>
                <th className="py-3 px-3">Status Usulan</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 font-body-sm text-body-sm">
              {proposals.map((prop) => {
                const targetRoad = roads.find((r) => r.id === prop.roadId);
                return (
                  <tr key={prop.id} className="hover:bg-surface-container-high/40 transition-colors">
                    <td className="py-3.5 px-3 font-tech-code-sm text-xs text-primary font-bold">{prop.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-on-surface font-tech-code-md text-sm">{prop.name}</div>
                      <div className="text-[11px] text-on-surface-variant">{prop.prioritas}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-tech-code-sm text-xs font-semibold border border-outline-variant/20">
                        {prop.fundingSource}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-tech-code-md font-bold text-secondary text-sm">{prop.allocation}</div>
                      <div className="text-[11px] text-on-surface-variant">{prop.panjang}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-tech-code-sm text-xs text-on-surface">{prop.rcStatus}</div>
                      <div className="text-[11px] text-on-surface-variant">{prop.dedStatus}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-tech-code-sm text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        {prop.sipdStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {targetRoad && (
                        <button
                          onClick={() => onSelectRoad(targetRoad)}
                          className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary font-tech-code-sm text-xs font-bold transition-all border border-outline-variant/20"
                        >
                          Periksa
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
