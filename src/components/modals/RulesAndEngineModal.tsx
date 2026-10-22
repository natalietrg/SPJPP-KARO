import React from 'react';

interface RulesAndEngineModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'rules' | 'roadmap';
}

export const RulesAndEngineModal: React.FC<RulesAndEngineModalProps> = ({
  isOpen,
  onClose,
  mode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-3xl rounded-2xl bg-surface-container-low border border-outline-variant/40 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 bg-surface-container-high/60 border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">
              {mode === 'rules' ? 'rule_settings' : 'timeline'}
            </span>
            <div>
              <h2 className="font-headline-md text-lg font-bold text-on-surface">
                {mode === 'rules'
                  ? 'Aturan Main & Mesin Skor SPJPP'
                  : 'Panduan Roadmap Siklus 2026 — 2029'}
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Keputusan Bersama Tim Koordinasi Perencanaan Infrastruktur Pertanian Kab. Karo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-on-surface font-body-sm text-body-sm">
          {mode === 'rules' ? (
            <>
              <div className="p-4 rounded-xl bg-surface-container-high/70 space-y-2 border-l-4 border-primary">
                <span className="font-tech-code-sm text-xs font-bold text-primary uppercase">
                  1. Prinsip Immutabilitas Bobot (Anti-Intervensi)
                </span>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  Seluruh vektor bobot kriteria kualitatif dan kuantitatif ($w_j$) dikunci melalui Notulen Panel No. 04/SPJPP-KARO/2026 dengan hash kriptografis sebelum data survei diinput ke sistem. Perubahan bobot hanya sah dilakukan lewat Rapat Pleno Tim Koordinasi.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-high/70 space-y-2 border-l-4 border-secondary">
                <span className="font-tech-code-sm text-xs font-bold text-secondary uppercase">
                  2. Formula Normalisasi Min-Max
                </span>
                <div className="p-2.5 rounded bg-surface-container-lowest font-tech-code-sm text-xs text-secondary">
                  z_ij = (x_ij - min(x_j)) / (max(x_j) - min(x_j))
                </div>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  Menjamin seluruh dimensi variabel (kuintal panen, derajat kemiringan, jarak kilometer, jumlah KK) berada dalam skala seragam 0.00 hingga 1.00 tanpa bias skala satuan.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-high/70 space-y-2 border-l-4 border-error">
                <span className="font-tech-code-sm text-xs font-bold text-error uppercase">
                  3. Protokol Bendera Risiko (¶21 SK)
                </span>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  Ruas yang memiliki kondisi fisik mantap (&gt;70% baik) namun memiliki skor risiko keterputusan $R &gt; 0.70$ (contoh: ketiadaan rute alternatif atau bahaya longsor tebing aktif) tetap mendapatkan status proteksi khusus dalam Musrenbang Tematik Ketahanan Pangan.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-high/70 space-y-2 border-l-4 border-tertiary">
                <span className="font-tech-code-sm text-xs font-bold text-tertiary uppercase">
                  4. Kriteria Kelulusan Kelas Prioritas
                </span>
                <ul className="list-disc list-inside text-xs text-on-surface-variant space-y-1">
                  <li><strong className="text-error">Kelas I (Kritis):</strong> Skor $I_i \ge 0.75$, diusulkan ke Inpres Jalan Daerah (IJD) dan DAK Tematik.</li>
                  <li><strong className="text-tertiary">Kelas II (Sedang):</strong> Skor $0.50 \le I_i &lt; 0.75$, pembiayaan prioritas APBD Karo.</li>
                  <li><strong className="text-secondary">Kelas III (Rutin):</strong> Skor $I_i &lt; 0.50$, pemeliharaan swadaya &amp; rutin jalan poros desa.</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-tech-code-sm font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-tech-code-md text-sm font-bold text-primary">
                      Tahap 1: Inventarisasi Ruas &amp; Audit Data (Q4 2026 — Q1 2027)
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Standardisasi ID ruas KR-XX, geolokasi WGS84, dan audit kelengkapan atribut target minimal 90%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface font-tech-code-sm font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-tech-code-md text-sm font-bold text-on-surface">
                      Tahap 2: Pemetaan Koridor Agribisnis GIS (Q1 — Q3 2027)
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Delineasi spasial 5 koridor utama penghubung sentra sayur dataran tinggi Karo menuju Pasar Induk Lau Cih Medan &amp; Pasar Roga.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface font-tech-code-sm font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-tech-code-md text-sm font-bold text-on-surface">
                      Tahap 3: Penilaian Kondisi &amp; Risiko Bencana (Q3 — Q4 2027)
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Ground check gabungan DPUTR &amp; BPBD untuk kerentanan bahaya longsor lereng vulkanik Sinabung-Sibayak.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface font-tech-code-sm font-bold flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-tech-code-md text-sm font-bold text-on-surface">
                      Tahap 4: Multikriteria &amp; Uji Sensitivitas (Q4 2027 — Q4 2028)
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Penetapan ranking definitif dan pengujian robustness 3 skenario kebijakan fiskal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary font-tech-code-sm font-bold flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div>
                    <h4 className="font-tech-code-md text-sm font-bold text-secondary">
                      Tahap 5: Penetapan SK Bupati &amp; Integrasi RKPD (TA 2029)
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Penguncian dokumen perencanaan resmi daerah dan pengusulan DAK Tematik serta Inpres Jalan Daerah.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/30 flex items-center justify-between">
          <span className="font-tech-code-sm text-xs text-outline">
            Dokumen Acuan: Perbup No. 12/2026
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-tech-code-sm text-xs font-bold transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
