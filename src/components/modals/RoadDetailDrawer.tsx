import React from 'react';
import { RoadSegment } from '../../data/mockData';

interface RoadDetailDrawerProps {
  road: RoadSegment | null;
  onClose: () => void;
  onGoToGis?: () => void;
  onGoToCriteria?: () => void;
}

export const RoadDetailDrawer: React.FC<RoadDetailDrawerProps> = ({
  road,
  onClose,
  onGoToGis,
  onGoToCriteria,
}) => {
  if (!road) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-3xl rounded-2xl bg-surface-container-low border border-outline-variant/40 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-surface-container-high/60 border-b border-outline-variant/30 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary font-tech-code-sm text-xs font-bold">
                {road.id} • {road.code}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full font-tech-code-sm text-xs font-bold ${
                  road.priorityClass === 'Kelas I'
                    ? 'bg-error-container/40 text-error'
                    : road.priorityClass === 'Kelas II'
                    ? 'bg-tertiary-container/30 text-tertiary'
                    : 'bg-secondary-container/30 text-secondary'
                }`}
              >
                {road.priorityClass} {road.isRobust && '⭐ Kokoh'}
              </span>
              {road.hasRiskFlag && (
                <span className="px-2 py-0.5 rounded-full bg-error/20 text-error font-tech-code-sm text-xs font-bold flex items-center gap-1">
                  🚩 Bendera Risiko R &gt; 0.70
                </span>
              )}
            </div>
            <h2 className="font-headline-lg text-xl font-bold text-on-surface mt-1">
              {road.name}
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Kecamatan {road.kecamatan} • Kewenangan: {road.jurisdiction} • Terakhir:{' '}
              {road.lastHistory}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 overflow-y-auto flex flex-col gap-5">
          {/* Main metric row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-surface-container flex flex-col">
              <span className="font-label-caps text-[10px] text-outline uppercase">
                Panjang &amp; Lebar
              </span>
              <span className="font-tech-code-lg text-lg font-bold text-on-surface mt-1">
                {road.lengthKm} km × {road.widthM} m
              </span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container flex flex-col">
              <span className="font-label-caps text-[10px] text-outline uppercase">
                Kondisi Fisik
              </span>
              <span
                className={`font-tech-code-lg text-lg font-bold mt-1 ${
                  road.technicalCondition === 'Rusak Berat'
                    ? 'text-error'
                    : road.technicalCondition === 'Rusak Ringan'
                    ? 'text-tertiary'
                    : 'text-secondary'
                }`}
              >
                {road.technicalCondition}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container flex flex-col">
              <span className="font-label-caps text-[10px] text-outline uppercase">
                Indeks Komposit (I)
              </span>
              <span className="font-tech-code-lg text-lg font-bold text-primary mt-1">
                {road.compositeScore.toFixed(3)}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container flex flex-col">
              <span className="font-label-caps text-[10px] text-outline uppercase">
                Kelengkapan Data
              </span>
              <span
                className={`font-tech-code-lg text-lg font-bold mt-1 ${
                  road.completenessPercent === 100
                    ? 'text-secondary'
                    : 'text-tertiary'
                }`}
              >
                {road.completenessPercent}%
              </span>
            </div>
          </div>

          {/* Missing data warning if applicable */}
          {road.hasMissingData && (
            <div className="p-3.5 rounded-xl bg-tertiary-container/20 border border-tertiary/40 flex items-start gap-3">
              <span className="material-symbols-outlined text-tertiary text-xl shrink-0 mt-0.5">
                warning
              </span>
              <div className="flex flex-col">
                <span className="font-tech-code-sm text-xs font-bold text-tertiary uppercase">
                  Catatan Audit: Parameter Belum Lengkap
                </span>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  {road.missingDataNotes}
                </p>
                <span className="text-[11px] font-tech-code-sm text-tertiary/80 mt-1">
                  Memerlukan ground-check resmi DPUTR sebelum pencairan DAK.
                </span>
              </div>
            </div>
          )}

          {/* 6 Criteria Multi-Attribute Breakdown */}
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-[11px] uppercase text-primary tracking-wider font-bold">
              Pembobotan 6 Kriteria (C-P-A-B-R-M)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-tech-code-sm">
                  <span className="text-primary font-bold">C • Fisik (25%)</span>
                  <span className="font-bold text-on-surface">{road.criteria.c.toFixed(2)}</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${road.criteria.c * 100}%` }}></div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-tech-code-sm">
                  <span className="text-secondary font-bold">P • Produksi (25%)</span>
                  <span className="font-bold text-on-surface">{road.criteria.p.toFixed(2)}</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: `${road.criteria.p * 100}%` }}></div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-tech-code-sm">
                  <span className="text-primary-fixed-dim font-bold">A • Akses Pasar (15%)</span>
                  <span className="font-bold text-on-surface">{road.criteria.a.toFixed(2)}</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-fixed-dim" style={{ width: `${road.criteria.a * 100}%` }}></div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-tech-code-sm">
                  <span className="text-secondary-fixed-dim font-bold">B • Manfaat (10%)</span>
                  <span className="font-bold text-on-surface">{road.criteria.b.toFixed(2)}</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary-fixed-dim" style={{ width: `${road.criteria.b * 100}%` }}></div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-tech-code-sm">
                  <span className="text-error font-bold">R • Risiko (15%)</span>
                  <span className="font-bold text-error">{road.criteria.r.toFixed(2)} {road.criteria.r > 0.7 && '🚩'}</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-error" style={{ width: `${road.criteria.r * 100}%` }}></div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-tech-code-sm">
                  <span className="text-tertiary font-bold">M • DED/Pemeliharaan (10%)</span>
                  <span className="font-bold text-on-surface">{road.criteria.m.toFixed(2)}</span>
                </div>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary" style={{ width: `${road.criteria.m * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Survey Footprint */}
          <div className="p-4 rounded-xl bg-surface-container flex flex-col gap-2">
            <span className="font-label-caps text-[10px] text-outline uppercase tracking-wider">
              Parameter Spasial &amp; Drainase Lapangan
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-tech-code-sm">
              <div>
                <span className="text-on-surface-variant block">Geolokasi Awal → Akhir:</span>
                <span className="text-on-surface font-semibold">{road.startEndCoords}</span>
              </div>
              <div>
                <span className="text-on-surface-variant block">Kondisi Drainase Eksisting:</span>
                <span className="text-on-surface font-semibold">{road.drainage}</span>
              </div>
              <div>
                <span className="text-on-surface-variant block">Tanggal Survei Teknis:</span>
                <span className="text-on-surface font-semibold">{road.surveyDate}</span>
              </div>
              <div>
                <span className="text-on-surface-variant block">Riwayat Penanganan:</span>
                <span className="text-on-surface font-semibold">{road.lastHistory}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onGoToGis && (
              <button
                onClick={() => {
                  onClose();
                  onGoToGis();
                }}
                className="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-bright text-primary font-tech-code-sm text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">map</span>
                <span>Buka di Peta (D.2)</span>
              </button>
            )}
            {onGoToCriteria && (
              <button
                onClick={() => {
                  onClose();
                  onGoToCriteria();
                }}
                className="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-bright text-secondary font-tech-code-sm text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">radar</span>
                <span>Lihat Radar Skor (M.1)</span>
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-tech-code-sm text-xs font-bold transition-all cursor-pointer"
          >
            Tutup Inspeksi
          </button>
        </div>
      </div>
    </div>
  );
};
