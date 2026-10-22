import React, { useState } from 'react';

interface RequestOpdDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (opd: string, note: string, roadCode: string) => void;
}

export const RequestOpdDataModal: React.FC<RequestOpdDataModalProps> = ({
  isOpen,
  onClose,
  onSubmitRequest,
}) => {
  const [selectedRoad, setSelectedRoad] = useState('KR-03-TPN (Jl. Akses Ladang Kubis Tigapanah)');
  const [targetOpd, setTargetOpd] = useState('DPUTR Bina Marga - Seksi Perencanaan & Geodesi');
  const [urgency, setUrgency] = useState('Mendesak (Deadline Pra-RKPD: 14 Hari)');
  const [justification, setJustification] = useState(
    'Diperlukan titik koordinat presisi WGS84 ujung segmen dan elevasi kontur lereng untuk melengkapi kelayakan DAK Tematik Pertanian TA 2026.'
  );
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRequest(targetOpd, justification, selectedRoad);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-xl rounded-2xl bg-surface-container-low border border-outline-variant/40 shadow-2xl overflow-hidden z-10 flex flex-col">
        {/* Header */}
        <div className="p-5 bg-surface-container-high/60 border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl">
              forward_to_inbox
            </span>
            <div>
              <h2 className="font-headline-md text-lg font-bold text-on-surface">
                Ajukan Permintaan Data ke OPD Terkait
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Surat perintah ground-check resmi antar dinas untuk parameter kosong
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

        {submitted ? (
          <div className="p-8 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-2xl">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <h3 className="font-headline-md text-lg font-bold text-on-surface">
              Permintaan Data Berhasil Diajukan!
            </h3>
            <p className="font-body-sm text-xs text-on-surface-variant max-w-md">
              Notifikasi telah didistribusikan ke dasbor OPD terkait dan dicatat ke Log Audit Integritas SPJPP (Hash SHA-256).
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            {/* Target Road */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-[10px] uppercase text-outline">
                Ruas dengan Parameter Belum Lengkap
              </label>
              <select
                value={selectedRoad}
                onChange={(e) => setSelectedRoad(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-tech-code-sm text-xs focus:border-primary focus:outline-none"
              >
                <option value="KR-03-TPN (Jl. Akses Ladang Kubis Tigapanah)">
                  KR-03-TPN: Tigapanah (Belum ada GPS akhir)
                </option>
                <option value="KR-05-MNT (Jl. Sentra Jeruk Munte - Sarinembah)">
                  KR-05-MNT: Munte (Belum ada arsip riwayat penanganan)
                </option>
                <option value="KR-08-BRS (Jl. Rintisan Kantong Kentang Barusjahe)">
                  KR-08-BRS: Barusjahe (Belum ada survei drainase)
                </option>
              </select>
            </div>

            {/* Target OPD */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-[10px] uppercase text-outline">
                Instansi / OPD Penanggung Jawab
              </label>
              <select
                value={targetOpd}
                onChange={(e) => setTargetOpd(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-tech-code-sm text-xs focus:border-primary focus:outline-none"
              >
                <option value="DPUTR Bina Marga - Seksi Perencanaan & Geodesi">
                  DPUTR Bina Marga (Survei Geodesi &amp; Kondisi Fisik)
                </option>
                <option value="BPBD Kab. Karo - Bidang Pencegahan & Kesiapsiagaan">
                  BPBD Kab. Karo (Survei Kerawanan Longsor &amp; Drainase Lahar)
                </option>
                <option value="Dinas Pertanian - Seksi Prasarana & Sarana">
                  Dinas Pertanian (Validasi Luas Hamparan &amp; Poktan)
                </option>
                <option value="Bappeda - Bidang Infrastruktur & Kewilayahan">
                  Bappeda (Kompilasi Usulan DAK Tematik)
                </option>
              </select>
            </div>

            {/* Urgency */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-[10px] uppercase text-outline">
                Tingkat Urgensi
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-tech-code-sm text-xs focus:border-primary focus:outline-none"
              >
                <option>Mendesak (Deadline Pra-RKPD: 14 Hari)</option>
                <option>Prioritas Reguler (Musrenbang Kabupaten)</option>
                <option>Rutin Tahunan</option>
              </select>
            </div>

            {/* Justification note */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-[10px] uppercase text-outline">
                Justifikasi Kebutuhan Teknis
              </label>
              <textarea
                rows={3}
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-body-sm text-xs focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-tech-code-sm text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary-container text-on-secondary font-tech-code-sm text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <span className="material-symbols-outlined text-sm">send</span>
                <span>Kirim Permintaan Ground-Check</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
