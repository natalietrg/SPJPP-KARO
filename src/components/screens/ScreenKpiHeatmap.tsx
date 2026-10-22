import React, { useState } from 'react';
import { RoadItem } from '../../data/mockData';

interface ScreenKpiHeatmapProps {
  roads: RoadItem[];
  onSelectRoad: (road: RoadItem) => void;
}

export const ScreenKpiHeatmap: React.FC<ScreenKpiHeatmapProps> = ({ roads, onSelectRoad }) => {
  const [selectedCell, setSelectedCell] = useState<{ prob: number; impact: number } | null>(null);

  // Map roads to 5x5 matrix
  // Probability (1 to 5) based on R and Slope
  // Impact (1 to 5) based on Production Ton and Detour
  const getMatrixCoord = (road: RoadItem) => {
    const rNorm = road.rNorm ?? road.criteria.r;
    const pNorm = road.pNorm ?? road.criteria.p;

    let prob = 3;
    if (rNorm >= 0.8) prob = 5;
    else if (rNorm >= 0.7) prob = 4;
    else if (rNorm >= 0.5) prob = 3;
    else prob = 2;

    let impact = 3;
    if (pNorm >= 0.9) impact = 5;
    else if (pNorm >= 0.75) impact = 4;
    else if (pNorm >= 0.6) impact = 3;
    else impact = 2;

    return { prob, impact };
  };

  const getCellSeverity = (prob: number, impact: number) => {
    const score = prob * impact;
    if (score >= 16) return { bg: 'bg-error/30 hover:bg-error/45 text-error border-error/50', label: 'Ekstrem' };
    if (score >= 10) return { bg: 'bg-tertiary-container/30 hover:bg-tertiary-container/45 text-tertiary border-tertiary/40', label: 'Tinggi' };
    if (score >= 6) return { bg: 'bg-tertiary/20 hover:bg-tertiary/30 text-tertiary-fixed border-tertiary/20', label: 'Sedang' };
    return { bg: 'bg-secondary/15 hover:bg-secondary/25 text-secondary border-secondary/30', label: 'Rendah' };
  };

  const roadsInSelectedCell = selectedCell
    ? roads.filter((r) => {
        const c = getMatrixCoord(r);
        return c.prob === selectedCell.prob && c.impact === selectedCell.impact;
      })
    : [];

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* HEADER BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-surface-container-low/60 p-6 rounded-2xl border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-error-container/40 text-error font-tech-code-sm text-tech-code-sm uppercase font-bold tracking-wider">
              MATRIKS KEPUTUSAN 5x5
            </span>
            <span className="text-outline text-tech-code-sm font-tech-code-sm">•</span>
            <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant uppercase tracking-wider">
              RISIKO GANGGUAN vs DAMPAK EKONOMI
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
            Dasbor KPI & Matriks Risiko 5x5
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1">
            Visualisasi pemetaan risiko bencana geologi (probabilitas putus) terhadap dampak kelumpuhan pasokan pangan Kabupaten Karo
            untuk memitigasi potensi krisis logistik ke Sumatera Utara dan ekspor Belawan.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high border border-outline-variant/20">
          <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
          <span className="font-tech-code-sm text-xs text-error font-bold">3 Ruas di Kuadran Ekstrem</span>
        </div>
      </div>

      {/* KPI TILES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-1">
          <span className="font-label-caps text-label-caps text-outline uppercase">Kemantapan Jalan Tani</span>
          <p className="font-tech-code-lg text-2xl text-tertiary font-bold">44.2%</p>
          <p className="font-body-sm text-xs text-on-surface-variant">Target RPJMD Karo 2026: 65%</p>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-1">
          <span className="font-label-caps text-label-caps text-outline uppercase">Potensi Kerugian Pangan</span>
          <p className="font-tech-code-lg text-2xl text-error font-bold">Rp 18,4 Miliar</p>
          <p className="font-body-sm text-xs text-on-surface-variant">Jika 3 Ruas Kritis Putus &gt;24 Jam</p>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-1">
          <span className="font-label-caps text-label-caps text-outline uppercase">Ruas Terisolasi Total</span>
          <p className="font-tech-code-lg text-2xl text-error font-bold">3 Ruas (Nihil Detour)</p>
          <p className="font-body-sm text-xs text-on-surface-variant">Wajib Masuk DAK Tanggap Bencana</p>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-1">
          <span className="font-label-caps text-label-caps text-outline uppercase">Kesiapan DED & RC DAK</span>
          <p className="font-tech-code-lg text-2xl text-secondary font-bold">78% Siap</p>
          <p className="font-body-sm text-xs text-on-surface-variant">Syarat Pencairan Dana Tahap I</p>
        </div>
      </div>

      {/* 5x5 HEATMAP GRID & CELL INSPECTOR */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* 5x5 MATRIX */}
        <div className="xl:col-span-8 flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-xl border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Matriks 5x5 Prioritas Akses</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Klik kotak sel untuk melihat daftar ruas jalan di dalamnya
              </p>
            </div>
            <div className="flex items-center gap-2 font-tech-code-sm text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-error inline-block"></span> Ekstrem
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-tertiary-container inline-block"></span> Tinggi
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-tertiary inline-block"></span> Sedang
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-secondary inline-block"></span> Rendah
              </span>
            </div>
          </div>

          {/* Matrix Container */}
          <div className="flex gap-4">
            {/* Y-Axis Label */}
            <div className="flex flex-col justify-between py-6 items-center text-center w-12 font-tech-code-sm text-[11px] text-outline">
              <span className="rotate-[-90deg] whitespace-nowrap uppercase tracking-wider font-bold text-error">
                Probabilitas Bencana (1 s/d 5) →
              </span>
            </div>

            {/* Matrix Cells */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((prob) => (
                <div key={prob} className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((impact) => {
                    const sev = getCellSeverity(prob, impact);
                    const matchingRoads = roads.filter((r) => {
                      const c = getMatrixCoord(r);
                      return c.prob === prob && c.impact === impact;
                    });
                    const isSelected = selectedCell?.prob === prob && selectedCell?.impact === impact;

                    return (
                      <button
                        key={impact}
                        onClick={() => setSelectedCell({ prob, impact })}
                        className={`h-20 rounded-xl p-2 flex flex-col justify-between border transition-all text-left relative ${
                          sev.bg
                        } ${isSelected ? 'ring-2 ring-primary scale-[1.02] shadow-lg' : ''}`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-tech-code-sm">
                          <span className="font-bold opacity-80">
                            P{prob} × I{impact}
                          </span>
                          <span className="font-bold">{sev.label}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {matchingRoads.map((r) => (
                            <span
                              key={r.id}
                              className="px-1.5 py-0.5 rounded bg-surface-container-lowest/80 text-[10px] font-tech-code-sm font-bold text-on-surface truncate max-w-full"
                              title={r.name}
                            >
                              {r.id}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}

              {/* X-Axis Label */}
              <div className="grid grid-cols-5 gap-2 pt-2 text-center font-tech-code-sm text-[11px] text-outline">
                <span>1 (Kecil)</span>
                <span>2 (Ringan)</span>
                <span>3 (Sedang)</span>
                <span>4 (Besar)</span>
                <span>5 (Kritis)</span>
              </div>
              <div className="text-center font-tech-code-sm text-[11px] text-primary uppercase tracking-wider font-bold pt-1">
                Dampak Disrupsi Ekonomi Pangan →
              </div>
            </div>
          </div>
        </div>

        {/* CELL DETAILS INSPECTOR */}
        <div className="xl:col-span-4 flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-xl border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Ruas Dalam Sel Terpilih</h3>
            {selectedCell && (
              <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-tech-code-sm text-xs font-bold">
                P{selectedCell.prob} × I{selectedCell.impact}
              </span>
            )}
          </div>

          {selectedCell ? (
            roadsInSelectedCell.length > 0 ? (
              <div className="space-y-3">
                {roadsInSelectedCell.map((road) => (
                  <div
                    key={road.id}
                    onClick={() => onSelectRoad(road)}
                    className="p-3.5 rounded-xl bg-surface-container-high/70 border border-outline-variant/20 hover:border-primary/50 cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-tech-code-md text-sm font-bold text-on-surface">{road.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-tech-code-sm font-bold ${
                          road.kelas === 'Kelas I' ? 'bg-error-container/40 text-error' : 'bg-tertiary/20 text-tertiary'
                        }`}
                      >
                        {road.kelas}
                      </span>
                    </div>
                    <p className="font-body-sm text-xs font-semibold text-primary">{road.name}</p>
                    <p className="font-body-sm text-[11px] text-on-surface-variant">
                      Kec. {road.kecamatan} • Sentra {road.commodity || 'Hortikultura'} • Skor: {(road.score ?? road.compositeScore).toFixed(3)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-outline font-tech-code-sm text-xs">
                Tidak ada ruas jalan pada koordinat sel ini.
              </div>
            )
          ) : (
            <div className="p-8 text-center text-on-surface-variant font-body-sm text-xs">
              Pilih salah satu kotak di matriks 5x5 untuk melihat daftar ruas dan tingkat ancaman.
            </div>
          )}

          {/* Quick Guidance Box */}
          <div className="p-3.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/20 space-y-1 text-xs font-body-sm text-on-surface-variant">
            <span className="font-bold text-on-surface block">Petunjuk Kebijakan:</span>
            <p>
              Ruas di kuadran Ekstrem (P4-5 × I4-5) memperoleh prioritas intervensi DAK Tematik dan perlindungan struktur talud BPBD
              dalam rancangan anggaran tahun berjalan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
