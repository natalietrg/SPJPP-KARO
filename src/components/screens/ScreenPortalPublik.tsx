import React, { useState } from 'react';
import { RoadItem } from '../../data/mockData';

interface ScreenPortalPublikProps {
  roads: RoadItem[];
  onSelectRoad: (road: RoadItem) => void;
  onOpenRules: () => void;
}

export const ScreenPortalPublik: React.FC<ScreenPortalPublikProps> = ({ roads, onSelectRoad, onOpenRules }) => {
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportForm, setReportForm] = useState({
    namaPelapor: '',
    kontak: '',
    desaKecamatan: '',
    namaRuas: '',
    komoditasTerdampak: 'Cabai Merah',
    keterangan: '',
  });

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setReportForm({
        namaPelapor: '',
        kontak: '',
        desaKecamatan: '',
        namaRuas: '',
        komoditasTerdampak: 'Cabai Merah',
        keterangan: '',
      });
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* PUBLIC HERO BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface-container-high/90 via-surface-container-low to-surface-container-high/90 p-8 border border-secondary/30 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary font-tech-code-sm text-xs font-bold border border-secondary/30">
              PORTAL TERBUKA KABUPATEN KARO
            </span>
            <span className="font-tech-code-sm text-xs text-outline">UU KIP No. 14 / 2008</span>
          </div>
          <h1 className="font-headline-xl text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
            Transparansi Alokasi Jalan Produksi Pertanian
          </h1>
          <p className="font-body-lg text-base text-on-surface-variant leading-relaxed">
            Selamat datang di portal keterbukaan informasi publik SPJPP-Karo. Setiap rupiah anggaran jalan produksi diputuskan
            berdasarkan data riil tonase panen, bahaya longsor, dan jarak ke pasar—bukan kedekatan politik.
          </p>
          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <button
              onClick={onOpenRules}
              className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary font-body-sm text-xs font-bold flex items-center gap-2 border border-primary/30 transition-all"
            >
              <span className="material-symbols-outlined text-sm">menu_book</span>
              <span>Pelajari Cara Penilaian (Metodologi)</span>
            </button>
            <a
              href="#lapor"
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-sm text-xs font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-sm">campaign</span>
              <span>Lapor Kerusakan Jalan Tani</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3 PILLARS OF PUBLIC ASSURANCE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-2">
          <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">balance</span>
          </div>
          <h3 className="font-headline-md text-base font-bold text-on-surface">Objektif & Terukur</h3>
          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
            Skor dihitung matematis menggunakan 6 kriteria teknis. Tidak ada ruas siluman yang menyusup tanpa data hasil survei resmi.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-2">
          <div className="w-10 h-10 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">shield</span>
          </div>
          <h3 className="font-headline-md text-base font-bold text-on-surface">Bebas Intervensi</h3>
          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
            Bobot kriteria dikunci dengan kriptografi SHA-256 sejak Januari 2026 dan diawasi bersama oleh tim BPKP dan inspektorat.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl space-y-2">
          <div className="w-10 h-10 rounded-lg bg-tertiary/20 text-tertiary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">group</span>
          </div>
          <h3 className="font-headline-md text-base font-bold text-on-surface">Partisipasi Petani</h3>
          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
            Kelompok tani dapat mengajukan laporan jalan amblas, hambatan jembatan, serta memantau jadwal realisasi perbaikan APBD.
          </p>
        </div>
      </div>

      {/* PUBLIC ROADS TABLE OVERVIEW */}
      <div className="p-6 rounded-2xl bg-surface-container-low shadow-xl border border-outline-variant/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              Daftar Prioritas Penanganan Jalan Produksi Karo
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Status resmi hasil pemeringkatan teknokratis Pemkab Karo TA 2026
            </p>
          </div>
          <span className="font-tech-code-sm text-xs text-secondary font-semibold">Total: {roads.length} Ruas Terdata</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high/90 text-outline font-tech-code-sm text-[11px] uppercase tracking-wider border-b border-outline-variant/30">
                <th className="py-3 px-3">Kode</th>
                <th className="py-3 px-4">Nama Ruas & Kecamatan</th>
                <th className="py-3 px-3">Sentra Komoditas</th>
                <th className="py-3 px-3">Panjang</th>
                <th className="py-3 px-3">Tingkat Prioritas</th>
                <th className="py-3 px-3 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 font-body-sm text-xs">
              {roads.map((road) => (
                <tr key={road.id} className="hover:bg-surface-container-high/40 transition-colors">
                  <td className="py-3.5 px-3 font-tech-code-sm text-primary font-bold">{road.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-on-surface">{road.name}</div>
                    <div className="text-[11px] text-on-surface-variant">Kecamatan {road.kecamatan}</div>
                  </td>
                  <td className="py-3.5 px-3 text-on-surface">{road.commodity}</td>
                  <td className="py-3.5 px-3 font-tech-code-sm">{road.lengthKm} km</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-tech-code-sm text-xs font-bold ${
                        road.kelas === 'Kelas I'
                          ? 'bg-error-container/40 text-error'
                          : road.kelas === 'Kelas II'
                          ? 'bg-tertiary/20 text-tertiary'
                          : 'bg-secondary/20 text-secondary'
                      }`}
                    >
                      {road.kelas} ({road.stability === 'Kokoh' ? '⭐ Sangat Mendesak' : 'Terjadwal'})
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => onSelectRoad(road)}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-tech-code-sm text-xs transition-all border border-outline-variant/20"
                    >
                      Buka Rincian
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CITIZEN REPORT FORM & OPEN DATA DOWNLOADS */}
      <div id="lapor" className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* REPORT FORM */}
        <div className="xl:col-span-7 flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-xl border border-outline-variant/30 space-y-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">campaign</span>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Formulir Aspirasi & Laporan Jalan Tani
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Laporan masyarakat langsung masuk ke dasbor Tim Verifikasi Lapangan DPUTR & Bappeda Karo
              </p>
            </div>
          </div>

          {reportSuccess ? (
            <div className="p-6 rounded-xl bg-secondary/15 border border-secondary/40 text-center space-y-2">
              <span className="material-symbols-outlined text-secondary text-4xl">check_circle</span>
              <h4 className="font-headline-md text-base font-bold text-secondary">Laporan Berhasil Terkirim!</h4>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Nomor Tiket: <strong className="text-on-surface font-mono">LAP-KARO-2026-089</strong>. Tim teknis DPUTR akan
                menjadwalkan uji lapangan dalam 3x24 jam kerja.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReport} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-tech-code-sm text-xs text-on-surface-variant block mb-1">Nama Pelapor / Kelompok Tani</label>
                  <input
                    type="text"
                    required
                    value={reportForm.namaPelapor}
                    onChange={(e) => setReportForm({ ...reportForm, namaPelapor: e.target.value })}
                    placeholder="Contoh: Pa Ukur Tarigan / KT Arih Ersada"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-xs border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="font-tech-code-sm text-xs text-on-surface-variant block mb-1">Nomor Kontak WhatsApp / HP</label>
                  <input
                    type="text"
                    required
                    value={reportForm.kontak}
                    onChange={(e) => setReportForm({ ...reportForm, kontak: e.target.value })}
                    placeholder="0812-XXXX-XXXX"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-xs border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-tech-code-sm text-xs text-on-surface-variant block mb-1">Desa & Kecamatan</label>
                  <input
                    type="text"
                    required
                    value={reportForm.desaKecamatan}
                    onChange={(e) => setReportForm({ ...reportForm, desaKecamatan: e.target.value })}
                    placeholder="Contoh: Desa Naman, Kec. Naman Teran"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-xs border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="font-tech-code-sm text-xs text-on-surface-variant block mb-1">Komoditas Terdampak Utama</label>
                  <select
                    value={reportForm.komoditasTerdampak}
                    onChange={(e) => setReportForm({ ...reportForm, komoditasTerdampak: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-xs border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Cabai Merah">Cabai Merah</option>
                    <option value="Jeruk Siam">Jeruk Siam</option>
                    <option value="Kol & Brokoli">Kol & Brokoli</option>
                    <option value="Kentang Granola">Kentang Granola</option>
                    <option value="Jagung Hibrida">Jagung Hibrida</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-tech-code-sm text-xs text-on-surface-variant block mb-1">Nama Ruas Jalan / Titik Kerusakan</label>
                <input
                  type="text"
                  required
                  value={reportForm.namaRuas}
                  onChange={(e) => setReportForm({ ...reportForm, namaRuas: e.target.value })}
                  placeholder="Contoh: Jalan tembus ladang jeruk KM 2 arah Pasar Roga"
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-xs border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-tech-code-sm text-xs text-on-surface-variant block mb-1">
                  Keterangan Kerusakan & Dampak Panen
                </label>
                <textarea
                  rows={3}
                  required
                  value={reportForm.keterangan}
                  onChange={(e) => setReportForm({ ...reportForm, keterangan: e.target.value })}
                  placeholder="Jelaskan kondisi jalan, apakah amblas, tergenang lumpur, atau jembatan patah yang menghalangi truk pengangkut..."
                  className="w-full p-3 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-xs border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-sm text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-tech-code-md">send</span>
                <span>Kirim Laporan Resmi ke DPUTR Karo</span>
              </button>
            </form>
          )}
        </div>

        {/* OPEN DATA DOWNLOADS & FAQ */}
        <div className="xl:col-span-5 flex flex-col space-y-6">
          <div className="p-6 rounded-2xl bg-surface-container-low shadow-xl border border-outline-variant/30 space-y-4">
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Unduhan Data Terbuka (Open Data)</h3>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Format data terbuka dapat digunakan oleh akademisi, media massa, NGO, dan masyarakat umum:
            </p>

            <div className="space-y-2.5">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Mengunduh GeoJSON Spasial Koridor Karo TA 2026...');
                }}
                className="p-3 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high flex items-center justify-between border border-outline-variant/20 transition-all text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary">map</span>
                  <div>
                    <span className="font-bold text-on-surface block">Peta Koridor Hortikultura (GeoJSON)</span>
                    <span className="text-[10px] text-outline">Layer WGS84 • 5 Koridor Pertanian</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">download</span>
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Mengunduh CSV Matriks Penilaian Enam Kriteria TA 2026...');
                }}
                className="p-3 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high flex items-center justify-between border border-outline-variant/20 transition-all text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary">table_chart</span>
                  <div>
                    <span className="font-bold text-on-surface block">Tabel Skor Enam Kriteria (CSV)</span>
                    <span className="text-[10px] text-outline">Lengkap parameter C, P, A, B, R, M</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">download</span>
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Membuka Salinan SK Bupati Karo No. 600/012/DPUTR/2025...');
                }}
                className="p-3 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high flex items-center justify-between border border-outline-variant/20 transition-all text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-tertiary">picture_as_pdf</span>
                  <div>
                    <span className="font-bold text-on-surface block">Salinan SK Bupati Tim SPJPP (PDF)</span>
                    <span className="text-[10px] text-outline">Legalitas & Cap Digital Pemkab Karo</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">download</span>
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low shadow-xl border border-outline-variant/30 space-y-2">
            <h4 className="font-headline-md text-sm font-bold text-on-surface">Tanya Jawab (FAQ)</h4>
            <div className="space-y-2 text-xs text-on-surface-variant">
              <div>
                <strong className="text-on-surface block">Mengapa jalan di desa saya belum masuk Kelas I?</strong>
                <span>
                  Penentuan Kelas I memprioritaskan ruas dengan volume tonase komoditas tertinggi dan ketiadaan rute alternatif jika
                  terjadi longsor, guna mencegah gagal panen massal.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
