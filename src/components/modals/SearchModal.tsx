import React, { useState, useMemo } from 'react';
import { ScreenId } from '../Sidebar';
import { RoadSegment, Corridor } from '../../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  roads: RoadSegment[];
  corridors: Corridor[];
  onSelectRoad: (road: RoadSegment) => void;
  onSelectScreen: (screen: ScreenId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  roads,
  corridors,
  onSelectRoad,
  onSelectScreen,
}) => {
  const [query, setQuery] = useState('');

  const filteredRoads = useMemo(() => {
    if (!query.trim()) return roads.slice(0, 5);
    const q = query.toLowerCase();
    return roads.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.kecamatan.toLowerCase().includes(q)
    );
  }, [roads, query]);

  const filteredCorridors = useMemo(() => {
    if (!query.trim()) return corridors;
    const q = query.toLowerCase();
    return corridors.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.subTitle.toLowerCase().includes(q) ||
        c.commodities.some((comm) => comm.name.toLowerCase().includes(q))
    );
  }, [corridors, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-surface-container-lowest/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl rounded-2xl bg-surface-container-low border border-outline-variant/40 shadow-2xl overflow-hidden z-10 flex flex-col">
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-outline-variant/30 bg-surface-container-lowest/80">
          <span className="material-symbols-outlined text-primary text-xl mr-3">
            search
          </span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik nama ruas, kecamatan, sentra, atau komoditas..."
            className="flex-1 bg-transparent text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md focus:outline-none"
          />
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-surface-container-high text-xs font-tech-code-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 flex flex-col gap-4">
          {/* Corridors Section */}
          {filteredCorridors.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-label-caps text-[10px] uppercase text-outline tracking-wider">
                Koridor Agribisnis Spasial (D.2)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCorridors.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      onSelectScreen('peta-koridor-pertanian');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/20 hover:border-primary/50 transition-all cursor-pointer flex flex-col justify-between gap-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-tech-code-sm text-xs font-bold text-primary group-hover:underline">
                        {c.name}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-error-container/30 text-error text-[10px] font-tech-code-sm font-bold">
                        {c.priorityClass}
                      </span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant line-clamp-1">
                      {c.subTitle}
                    </span>
                    <span className="text-[10px] text-secondary font-tech-code-sm">
                      {c.hortiProductionKw.toLocaleString()} kw/thn
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Roads Section */}
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-[10px] uppercase text-outline tracking-wider">
              Ruas Jalan Pertanian ({filteredRoads.length})
            </span>
            {filteredRoads.length === 0 ? (
              <p className="text-on-surface-variant text-sm font-body-sm py-4 text-center">
                Tidak ada ruas yang cocok dengan pencarian &quot;{query}&quot;.
              </p>
            ) : (
              <div className="flex flex-col gap-1.5">
                {filteredRoads.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      onSelectRoad(r);
                      onSelectScreen('tabel-induk-ruas');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-tech-code-sm text-xs text-primary font-bold shrink-0">
                        {r.id}
                      </span>
                      <div className="min-w-0 flex flex-col">
                        <span className="font-body-sm text-xs font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                          {r.name}
                        </span>
                        <span className="font-tech-code-sm text-[10px] text-on-surface-variant">
                          Kec. {r.kecamatan} • {r.lengthKm} km • {r.technicalCondition}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-tech-code-sm text-xs font-bold text-on-surface">
                        {r.compositeScore.toFixed(3)}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-tech-code-sm font-bold ${
                          r.priorityClass === 'Kelas I'
                            ? 'bg-error-container/30 text-error'
                            : r.priorityClass === 'Kelas II'
                            ? 'bg-tertiary/20 text-tertiary'
                            : 'bg-secondary/20 text-secondary'
                        }`}
                      >
                        {r.priorityClass}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-surface-container-lowest border-t border-outline-variant/20 flex items-center justify-between text-xs font-tech-code-sm text-on-surface-variant">
          <span>Pilih hasil untuk membuka inspeksi teknis</span>
          <span>Bantuan: SPJPP Karo AI Index</span>
        </div>
      </div>
    </div>
  );
};
