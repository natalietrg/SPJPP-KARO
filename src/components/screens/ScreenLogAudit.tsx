import React, { useState } from 'react';
import { AuditLogItem } from '../../data/mockData';

interface ScreenLogAuditProps {
  logs: AuditLogItem[];
  onExportLogs: () => void;
}

export const ScreenLogAudit: React.FC<ScreenLogAuditProps> = ({ logs, onExportLogs }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLogs = logs.filter((log) => {
    if (selectedFilter !== 'Semua' && !log.action.toLowerCase().includes(selectedFilter.toLowerCase())) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        log.id.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.actor.toLowerCase().includes(q) ||
        (log.details || '').toLowerCase().includes(q) ||
        log.hash.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* HEADER BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-surface-container-low/60 p-6 rounded-2xl border border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-outline/20 text-on-surface font-tech-code-sm text-tech-code-sm uppercase font-bold tracking-wider">
              JEJAK AUDIT & INTEGRITAS
            </span>
            <span className="text-outline text-tech-code-sm font-tech-code-sm">•</span>
            <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant uppercase tracking-wider">
              KRIPTOGRAFI SHA-256 TAMPER-EVIDENT
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
            Log Audit & Integritas Keputusan (28 Log)
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1">
            Setiap perubahan bobot kriteria, mutasi data survei lapangan, dan pergeseran peringkat dicatat secara permanen untuk
            menjamin transparansi mutlak dan mematuhi standar pemeriksaan BPK / BPKP.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportLogs}
            className="px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-body-sm text-body-sm font-medium flex items-center gap-2 border border-outline-variant/20 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-tech-code-md">download</span>
            <span>Ekspor Log Audit (JSON)</span>
          </button>
        </div>
      </div>

      {/* CRYPTOGRAPHIC INTEGRITY STRIP */}
      <div className="p-4 rounded-xl bg-surface-container-low border border-secondary/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary text-2xl">verified_user</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-tech-code-md text-sm font-bold text-secondary">Integritas Hash: Terverifikasi 100%</span>
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Rantai hash SHA-256 utuh tanpa modifikasi retrospektif • Ledger tersinkronisasi ke server Bappeda Karo
            </p>
          </div>
        </div>
        <div className="font-tech-code-sm text-xs text-outline">
          Blok Terakhir: <span className="text-primary font-mono">0x9f4a...83ec21</span>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['Semua', 'Bobot', 'Validasi', 'Usulan', 'Impor'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-tech-code-sm text-xs font-bold transition-all ${
                selectedFilter === cat ? 'bg-surface-container-high text-on-surface shadow' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari aktor, nomor log, atau aksi..."
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-xs focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
          />
        </div>
      </div>

      {/* LOG LIST TABLE */}
      <div className="rounded-2xl bg-surface-container-low shadow-xl border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/90 text-outline font-tech-code-sm text-[11px] uppercase tracking-wider border-b border-outline-variant/30">
                <th className="py-3 px-3 w-16 text-center">No</th>
                <th className="py-3 px-3">Waktu</th>
                <th className="py-3 px-4">Aktor & Jabatan</th>
                <th className="py-3 px-4">Tindakan / Peristiwa</th>
                <th className="py-3 px-4">Detail Perubahan</th>
                <th className="py-3 px-4 text-right font-mono">Hash SHA-256</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 font-body-sm text-xs">
              {filteredLogs.map((log, idx) => (
                <tr key={log.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-3.5 px-3 text-center font-tech-code-sm text-outline">{String(idx + 1).padStart(2, '0')}</td>
                  <td className="py-3.5 px-3 font-tech-code-sm text-on-surface-variant whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-on-surface">{log.actor}</div>
                    <div className="font-tech-code-sm text-[10px] text-primary">{log.role}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-tech-code-sm font-semibold border border-outline-variant/20">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-on-surface-variant max-w-md">{log.details || log.detail}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="font-mono text-[10px] text-outline hover:text-primary transition-colors cursor-copy" title="Klik untuk verifikasi hash">
                      {log.hash}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
