import React, { useState } from 'react';
import { RoadSegment } from '../../data/mockData';

interface UploadCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportRoads: (newRoads: RoadSegment[]) => void;
}

export const UploadCsvModal: React.FC<UploadCsvModalProps> = ({
  isOpen,
  onClose,
  onImportRoads,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [parsedPreview, setParsedPreview] = useState<RoadSegment[] | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const downloadSampleTemplate = () => {
    const csvContent =
      'id,name,kecamatan,lengthKm,widthM,jurisdiction,technicalCondition,surveyDate,startEndCoords,drainage,lastHistory\n' +
      'KR-10-SIM,Jl. Poros Perkebunan Kol Simacem,Naman Teran,5.20,3.50,Kabupaten,Rusak Berat,22/01/2026,"3.1410°N, 98.4210°E → 3.1610°N, 98.4350°E",Tanpa Saluran,Rehab 2018\n' +
      'KR-11-KUT,Jl. Penghubung Jeruk Kutambelin,Laubaleng,4.80,4.00,Kabupaten,Sedang,23/01/2026,"3.0810°N, 98.3900°E → 3.0950°N, 98.4050°E",Saluran Permanen,Lapen 2022';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Template_Survei_Jalan_SPJPP_Karo.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseCsvText = (text: string) => {
    try {
      const lines = text.split('\n').filter((l) => l.trim().length > 0);
      if (lines.length < 2) {
        setErrorMsg('File CSV minimal harus memiliki header dan 1 baris data.');
        return;
      }

      const results: RoadSegment[] = [];
      // parse header and rows
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map((p) => p.replace(/^"|"$/g, '').trim());
        if (parts.length >= 7) {
          const id = parts[0] || `KR-${10 + i}-IMP`;
          const name = parts[1] || 'Ruas Impor Tambahan';
          const kecamatan = parts[2] || 'Berastagi';
          const lengthKm = parseFloat(parts[3]) || 4.0;
          const widthM = parseFloat(parts[4]) || 3.5;
          const jurisdiction = (parts[5] as any) || 'Kabupaten';
          const technicalCondition = (parts[6] as any) || 'Rusak Berat';
          const surveyDate = parts[7] || '22/01/2026';
          const startEndCoords = parts[8] || '3.1500°N, 98.5000°E → 3.1600°N, 98.5100°E';
          const drainage = parts[9] || 'Saluran Alami';
          const lastHistory = parts[10] || 'Belum Pernah Ditangani';

          results.push({
            id,
            code: `RUAS-${id}`,
            name,
            kecamatan,
            lengthKm,
            widthM,
            jurisdiction,
            technicalCondition,
            surveyDate,
            startEndCoords,
            drainage,
            lastHistory,
            completenessPercent: 100,
            criteria: { c: 0.75, p: 0.8, a: 0.72, b: 0.68, r: 0.65, m: 0.6 },
            compositeScore: 0.715,
            priorityClass: 'Kelas II',
            isRobust: false,
            hasRiskFlag: false,
          });
        }
      }

      if (results.length > 0) {
        setParsedPreview(results);
        setErrorMsg('');
      } else {
        setErrorMsg('Format CSV tidak sesuai format standar SPJPP.');
      }
    } catch {
      setErrorMsg('Gagal memproses file CSV.');
    }
  };

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        parseCsvText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleApply = () => {
    if (parsedPreview && parsedPreview.length > 0) {
      onImportRoads(parsedPreview);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-2xl rounded-2xl bg-surface-container-low border border-outline-variant/40 shadow-2xl overflow-hidden z-10 flex flex-col">
        {/* Header */}
        <div className="p-5 bg-surface-container-high/60 border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">
              upload_file
            </span>
            <div>
              <h2 className="font-headline-md text-lg font-bold text-on-surface">
                Unggah / Impor Data Ruas (CSV)
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Standardisasi atribut primer DPUTR Bina Marga &amp; Kompilasi Lapangan
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
        <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
          {/* Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files?.[0]) {
                handleFileUpload(e.dataTransfer.files[0]);
              }
            }}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer ${
              dragOver
                ? 'border-primary bg-primary/10'
                : 'border-outline-variant/50 hover:border-primary/60 bg-surface-container-lowest/60'
            }`}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.csv,text/csv';
              input.onchange = (e: any) => {
                if (e.target.files?.[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              };
              input.click();
            }}
          >
            <span className="material-symbols-outlined text-primary text-4xl">
              cloud_upload
            </span>
            <div className="flex flex-col gap-1">
              <span className="font-headline-md text-sm font-bold text-on-surface">
                {fileName ? fileName : 'Seret & Letakkan File CSV ke Sini'}
              </span>
              <span className="font-tech-code-sm text-xs text-on-surface-variant">
                atau klik untuk memilih file dari komputer Anda
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-error-container/20 text-error text-xs font-tech-code-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Download sample template */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-high/60">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-lg">
                table_view
              </span>
              <span className="font-tech-code-sm text-xs text-on-surface">
                Perlu contoh susunan kolom data?
              </span>
            </div>
            <button
              onClick={downloadSampleTemplate}
              className="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-tertiary font-tech-code-sm text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-tertiary/30"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Unduh Template CSV</span>
            </button>
          </div>

          {/* Preview if parsed */}
          {parsedPreview && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-xs text-secondary uppercase font-bold">
                  Pratinjau Data Terbaca ({parsedPreview.length} Ruas)
                </span>
                <span className="text-[10px] font-tech-code-sm text-on-surface-variant">
                  Siap diintegrasikan ke tabel induk
                </span>
              </div>
              <div className="max-h-40 overflow-x-auto rounded-lg bg-surface-container-lowest border border-outline-variant/30">
                <table className="w-full text-left font-tech-code-sm text-xs">
                  <thead className="bg-surface-container-high text-on-surface-variant">
                    <tr>
                      <th className="p-2">ID</th>
                      <th className="p-2">Nama Ruas</th>
                      <th className="p-2">Kecamatan</th>
                      <th className="p-2">P (km)</th>
                      <th className="p-2">Kondisi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10 text-on-surface">
                    {parsedPreview.map((p, idx) => (
                      <tr key={idx} className="hover:bg-surface-container/50">
                        <td className="p-2 text-primary font-bold">{p.id}</td>
                        <td className="p-2">{p.name}</td>
                        <td className="p-2">{p.kecamatan}</td>
                        <td className="p-2">{p.lengthKm}</td>
                        <td className="p-2">{p.technicalCondition}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/30 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-tech-code-sm text-xs font-semibold cursor-pointer"
          >
            Batal
          </button>
          <button
            disabled={!parsedPreview || parsedPreview.length === 0}
            onClick={handleApply}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary font-tech-code-sm text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <span className="material-symbols-outlined text-sm">check</span>
            <span>Terapkan Impor ({parsedPreview?.length || 0} Ruas)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
