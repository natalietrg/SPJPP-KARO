import React, { useState, useEffect } from 'react';
import { RoadItem } from '../../data/mockData';

interface Screen03bRisikoAksesProps {
  roads: RoadItem[];
  initialTab?: 'm2' | 'm3';
  onSelectRoad: (road: RoadItem) => void;
  onNavigate: (path: string) => void;
  onRequestOpd: (roadName: string) => void;
}

export const Screen03bRisikoAkses: React.FC<Screen03bRisikoAksesProps> = ({
  roads,
  initialTab = 'm2',
  onSelectRoad,
  onNavigate,
  onRequestOpd,
}) => {
  const [activeTab, setActiveTab] = useState<'m2' | 'm3'>(initialTab);
  const [selectedCorridorFilter, setSelectedCorridorFilter] = useState<string>('Semua');
  const [activeScenario, setActiveScenario] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Scenario weights
  const scenarios = {
    1: {
      name: 'Seimbang (Standar SK)',
      desc: 'Bobot resmi sesuai Notulen Kesepakatan Tim Koordinasi DPUTR-Bappeda-Pertanian.',
      weights: { C: 0.25, P: 0.25, A: 0.15, B: 0.1, R: 0.15, M: 0.1 },
    },
    2: {
      name: 'Produksi & Pasar (Agro-Driven)',
      desc: 'Menitikberatkan volume panen hortikultura dan kedekatan akses ke Pasar Induk Berastagi.',
      weights: { C: 0.15, P: 0.35, A: 0.25, B: 0.1, R: 0.1, M: 0.05 },
    },
    3: {
      name: 'Kebencanaan & Teknis (Resilience)',
      desc: 'Menitikberatkan mitigasi risiko patahan Sinabung, longsor vulkanik, dan tingkat kerusakan fisik.',
      weights: { C: 0.35, P: 0.15, A: 0.1, B: 0.05, R: 0.25, M: 0.1 },
    },
  };

  const currentWeights = scenarios[activeScenario].weights;

  // 4-Component Risk Matrix Data
  const riskMatrixData = [
    {
      id: 'RUAS-KR-04',
      name: 'Simpang Empat – Naman Teran',
      sub: 'Kec. Naman Teran • 6.4 km • Zona KRB III Sinabung',
      hazard: 0.94,
      hazardLabel: 'Vulkanik Aktif',
      exposure: 0.94,
      exposureLabel: '920 T/bln',
      vulnerability: 0.88,
      vulnerabilityLabel: 'Lereng Tebing',
      consequence: 0.95,
      consequenceLabel: 'Isolasi 3 Desa',
      totalScore: 0.887,
      status: 'Kritis',
      corridor: 'Koridor I',
    },
    {
      id: 'RUAS-KR-12',
      name: 'Tigapanah – Sukarame',
      sub: 'Kec. Tigapanah • 8.1 km • Dataran Lereng Sibayak',
      hazard: 0.82,
      hazardLabel: 'Longsor Curam',
      exposure: 0.91,
      exposureLabel: '1.140 T/bln',
      vulnerability: 0.76,
      vulnerabilityLabel: 'Drainase Rusak',
      consequence: 0.84,
      consequenceLabel: 'Detour 28 km',
      totalScore: 0.835,
      status: 'Kritis',
      corridor: 'Koridor I',
    },
    {
      id: 'RUAS-KR-01',
      name: 'Kabanjahe – Singa',
      sub: 'Kec. Tigapanah • 5.2 km • Urat Nadi Sayur Daun',
      hazard: 0.62,
      hazardLabel: 'Sedang',
      exposure: 0.8,
      exposureLabel: '650 T/bln',
      vulnerability: 0.72,
      vulnerabilityLabel: 'Sebagian Talud',
      consequence: 0.7,
      consequenceLabel: 'Detour 12 km',
      totalScore: 0.796,
      status: 'Waspada',
      corridor: 'Koridor I',
    },
    {
      id: 'RUAS-KR-08',
      name: 'Dolat Rayat – Kubusimbelang',
      sub: 'Kec. Dolat Rayat • 4.7 km • Sentra Jeruk Siam',
      hazard: 0.73,
      hazardLabel: 'Patahan Sesar',
      exposure: 0.84,
      exposureLabel: '810 T/bln',
      vulnerability: 0.7,
      vulnerabilityLabel: 'Amblas Parsial',
      consequence: 0.82,
      consequenceLabel: 'Detour 18 km',
      totalScore: 0.742,
      status: 'Waspada',
      corridor: 'Koridor II',
    },
    {
      id: 'RUAS-KR-23',
      name: 'Payung – Batukarang',
      sub: 'Kec. Payung • 9.0 km • Perbatasan Lahar Hujan',
      hazard: 0.88,
      hazardLabel: 'Banjir Lahar',
      exposure: 0.71,
      exposureLabel: '520 T/bln',
      vulnerability: 0.78,
      vulnerabilityLabel: 'Jembatan Kritis',
      consequence: 0.9,
      consequenceLabel: 'Isolasi Total',
      totalScore: 0.661,
      status: 'Kritis',
      corridor: 'Koridor II',
    },
  ];

  const filteredMatrix = riskMatrixData.filter((item) => {
    if (selectedCorridorFilter !== 'Semua' && item.corridor !== selectedCorridorFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* TOP HEADER & CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-error-container/40 text-error font-tech-code-sm text-tech-code-sm uppercase font-bold tracking-wider">
              PILAR METODE M.2 • M.3
            </span>
            <span className="text-outline text-tech-code-sm font-tech-code-sm">•</span>
            <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant uppercase tracking-wider">
              SK BUPATI KARO NO. 600/012/DPUTR/2025
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
            Model Risiko Akses & Uji Sensitivitas
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1">
            Kerangka evaluasi probabilitas bencana perlintasan logistik hortikultura serta simulasi ketahanan (
            <em className="text-secondary font-medium">robustness testing</em>) penetapan prioritas penanganan jalan produksi.
          </p>
        </div>

        {/* PRIMARY TAB TOGGLE */}
        <div className="inline-flex p-1 rounded-xl bg-surface-container-low shadow-inner border border-outline-variant/30">
          <button
            onClick={() => setActiveTab('m2')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-tech-code-md text-tech-code-md transition-all ${
              activeTab === 'm2'
                ? 'text-on-surface bg-surface-container-high shadow-md font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            <span>03b. Risiko Akses (M.2)</span>
          </button>
          <button
            onClick={() => setActiveTab('m3')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-tech-code-md text-tech-code-md transition-all ${
              activeTab === 'm3'
                ? 'text-on-surface bg-surface-container-high shadow-md font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            <span>04. Uji Sensitivitas (M.3)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 03b: PENILAIAN RISIKO GANGGUAN AKSES (M.2)                           */}
      {/* ========================================================================= */}
      {activeTab === 'm2' && (
        <div className="flex flex-col space-y-6">
          {/* METRICS FORMULATION BAR */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-surface-container-low backdrop-blur-xl shadow-xl border border-outline-variant/30">
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-outline uppercase">Formulasi Multivariat M.2</span>
              <span className="font-tech-code-lg text-tech-code-lg text-primary font-bold mt-1">R = f(H × E × V × C)</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Indeks gabungan probabilitas x isolasi ekonomi
              </span>
            </div>
            <div className="flex flex-col pl-4 border-l border-outline-variant/30">
              <div className="flex items-center justify-between">
                <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">H • Bahaya (Hazard)</span>
                <span className="font-tech-code-sm text-tech-code-sm text-error font-bold">Slope &gt; 35%</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant/80 mt-1">
                Frekuensi patahan tektonik & lereng vulkanik Sinabung-Sibayak.
              </p>
            </div>
            <div className="flex flex-col pl-4 border-l border-outline-variant/30">
              <div className="flex items-center justify-between">
                <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">E × V • Paparan & Rentan</span>
                <span className="font-tech-code-sm text-tech-code-sm text-tertiary font-bold">14.800 Ton/Bln</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant/80 mt-1">
                Tonase komoditas lewat tanpa proteksi bronjong/dinding penahan.
              </p>
            </div>
            <div className="flex flex-col pl-4 border-l border-outline-variant/30">
              <div className="flex items-center justify-between">
                <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">C • Keterputusan</span>
                <span className="font-tech-code-sm text-tech-code-sm text-secondary font-bold">Detour 0-68 Km</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant/80 mt-1">
                Ketiadaan koridor arteri sekunder saat ruas putus total.
              </p>
            </div>
          </div>

          {/* EMPIRICAL DISASTER ASSESSMENT SECTION */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* STACKED BAR SCIENTIFIC REPORT CARD */}
            <div className="xl:col-span-7 flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-xl border border-outline-variant/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-error-container/30 text-error">
                      <span className="material-symbols-outlined text-lg">landslide</span>
                    </span>
                    <span className="font-label-caps text-label-caps text-error uppercase">Kajian Geologi Kebencanaan</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-1">
                    Kajian Koridor Karo – Medan (Hastuty et al., 2026)
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Pemetaan zona bahaya longsor sepanjang 51 km koridor distribusi utama Berastagi-Medan via Sembahe.
                  </p>
                </div>
                <span className="px-2 py-1 rounded bg-surface-container-high text-primary font-tech-code-sm text-tech-code-sm border border-outline-variant/20">
                  VALIDASI GIS
                </span>
              </div>

              {/* BIG STACKED BAR VISUALIZATION */}
              <div className="my-4 space-y-2">
                <div className="flex items-center justify-between font-tech-code-sm text-tech-code-sm">
                  <span className="text-on-surface-variant">Distribusi Tingkat Bahaya (Panjang Ruas Kritis: 51 km)</span>
                  <span className="text-error font-bold">56% Wilayah Berisiko Tinggi/Sangat Tinggi</span>
                </div>
                {/* The Stacked Bar */}
                <div className="h-8 w-full rounded-xl overflow-hidden flex shadow-inner bg-surface-container-lowest">
                  {/* Sedang 44% (19 km) */}
                  <div
                    className="h-full bg-tertiary flex items-center justify-center text-on-tertiary font-tech-code-sm text-[11px] font-bold transition-all hover:brightness-110"
                    style={{ width: '44%' }}
                    title="Sedang: 19 km (44%)"
                  >
                    SEDANG 44% (19 km)
                  </div>
                  {/* Tinggi 47% (24 km) */}
                  <div
                    className="h-full bg-error flex items-center justify-center text-on-error font-tech-code-sm text-[11px] font-bold transition-all hover:brightness-110"
                    style={{ width: '47%' }}
                    title="Tinggi: 24 km (47%)"
                  >
                    TINGGI 47% (24 km)
                  </div>
                  {/* Sangat Tinggi 9% (8 km) */}
                  <div
                    className="h-full bg-error-container flex items-center justify-center text-on-error-container font-tech-code-sm text-[10px] font-bold transition-all hover:brightness-110"
                    style={{ width: '9%' }}
                    title="Sangat Tinggi: 8 km (9%)"
                  >
                    9% (8 km)
                  </div>
                </div>

                {/* Legend Bar */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-high/60 border border-outline-variant/20">
                    <span className="w-3 h-3 rounded-sm bg-tertiary"></span>
                    <div className="flex flex-col">
                      <span className="font-tech-code-sm text-tech-code-sm text-on-surface">Bahaya Sedang</span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">19 km (Kemiringan 15-25°)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-high/60 border border-outline-variant/20">
                    <span className="w-3 h-3 rounded-sm bg-error"></span>
                    <div className="flex flex-col">
                      <span className="font-tech-code-sm text-tech-code-sm text-on-surface">Bahaya Tinggi</span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">24 km (Hujan &gt; 2.800mm)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-high/60 border border-outline-variant/20">
                    <span className="w-3 h-3 rounded-sm bg-error-container"></span>
                    <div className="flex flex-col">
                      <span className="font-tech-code-sm text-tech-code-sm text-on-surface">Sangat Tinggi</span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">8 km (Tebing Kritis)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Geo-analytical Quote Note */}
              <div className="mt-2 p-3.5 rounded-xl bg-surface-container-lowest/80 border-l-2 border-primary text-body-sm text-on-surface-variant">
                <p className="italic">
                  “Koridor sentra agribisnis Karo-Medan memiliki kerentanan struktur geologi aktif dengan 17 titik kritis longsor
                  berulang. Gangguan konektivitas di atas 12 jam memicu depresiasi harga jual komoditas hortikultura hingga 32% di
                  pasar induk Lau Cih.”
                </p>
                <div className="flex items-center justify-between mt-2 font-tech-code-sm text-[11px] text-outline">
                  <span>Sumber: Riset Geomekanika Universitas Sumatera Utara & Bappeda Karo 2026</span>
                  <span className="text-primary font-bold">Indeks Kerentanan Wilayah: 0.84</span>
                </div>
              </div>
            </div>

            {/* HISTORICAL DISASTER LOG (BPBD & DPUTR DATA) */}
            <div className="xl:col-span-5 flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-xl space-y-4 border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary">history_toggle_off</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Kejadian Historis Kritis</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-error-container/20 text-error font-tech-code-sm text-tech-code-sm">
                  CATATAN BPBD
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Disrupsi logistik agribisnis terparah yang melumpuhkan rantai pasok ke Medan dan pelabuhan Belawan:
              </p>

              {/* EVENT CARD 1 */}
              <div className="p-4 rounded-xl bg-surface-container-high/70 space-y-3 border border-outline-variant/20">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="font-label-caps text-label-caps text-error font-bold">LONGSOR MASIF 4 TITIK</span>
                    <h4 className="font-tech-code-md text-tech-code-md text-on-surface font-bold">
                      Kawasan Tahura Berastagi (KM 54-56)
                    </h4>
                    <p className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">
                      23 - 24 November 2024 • Hujan Ekstrem 180 mm/hari
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-error/20 text-error font-tech-code-sm text-[10px] font-bold">
                    LUMPUH TOTAL
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-1 bg-surface-container-lowest/60 p-2.5 rounded-lg border border-outline-variant/10">
                  <div>
                    <span className="font-label-caps text-[9px] text-outline block">DURASI PUTUS</span>
                    <span className="font-tech-code-lg text-tech-code-lg text-error font-bold">38 Jam</span>
                  </div>
                  <div>
                    <span className="font-label-caps text-[9px] text-outline block">KERUGIAN LOGISTIK</span>
                    <span className="font-tech-code-lg text-tech-code-lg text-tertiary font-bold">Rp4,2 M</span>
                  </div>
                  <div>
                    <span className="font-label-caps text-[9px] text-outline block">PENANGANAN</span>
                    <span className="font-tech-code-sm text-tech-code-sm text-secondary font-semibold">Normalisasi Darurat</span>
                  </div>
                </div>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Antrean truk cold-storage sayur mencapai 14 km. 420 ton kubis dan wortel afkir akibat keterlambatan kapal ekspor di
                  Belawan.
                </p>
              </div>

              {/* EVENT CARD 2 */}
              <div className="p-4 rounded-xl bg-surface-container-high/70 space-y-3 border border-outline-variant/20">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="font-label-caps text-label-caps text-tertiary font-bold">AMBLAS BADAN JALAN 1.2 M</span>
                    <h4 className="font-tech-code-md text-tech-code-md text-on-surface font-bold">
                      Ruas Desa Semangat Gunung – Daulu
                    </h4>
                    <p className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">
                      12 Januari 2025 • Tekanan Hidrostatik Air Bawah Tanah
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary/20 text-tertiary font-tech-code-sm text-[10px] font-bold">
                    TERISOLASI
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-1 bg-surface-container-lowest/60 p-2.5 rounded-lg border border-outline-variant/10">
                  <div>
                    <span className="font-label-caps text-[9px] text-outline block">DURASI PUTUS</span>
                    <span className="font-tech-code-lg text-tech-code-lg text-tertiary font-bold">16 Jam</span>
                  </div>
                  <div>
                    <span className="font-label-caps text-[9px] text-outline block">RUTE ALTERNATIF</span>
                    <span className="font-tech-code-lg text-tech-code-lg text-error font-bold">NIHIL (0)</span>
                  </div>
                  <div>
                    <span className="font-label-caps text-[9px] text-outline block">POPULASI TERDAMPAK</span>
                    <span className="font-tech-code-sm text-tech-code-sm text-primary font-semibold">1.840 KK Petani</span>
                  </div>
                </div>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Jalan berstatus urat nadi tunggal agrowisata dan sentra cabai merah lereng Sibayak. Petani terpaksa melangsir beban
                  dengan sepeda motor modifikasi.
                </p>
              </div>
            </div>
          </div>

          {/* RISK ANALYSIS COMPONENT MATRIX & RED FLAGS */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* 4-COMPONENT MINI BAR MATRIX */}
            <div className="xl:col-span-8 flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-xl space-y-4 border border-outline-variant/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Matriks Penilaian 4 Komponen Risiko Ruas Pertanian
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Tiap pilar dinilai pada rentang indeks teknis 0.00 – 1.00 oleh Tim Teknis DPUTR & BPBD
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">Filter Koridor:</span>
                  <select
                    value={selectedCorridorFilter}
                    onChange={(e) => setSelectedCorridorFilter(e.target.value)}
                    className="h-9 px-3 rounded-lg bg-surface-container-high border-0 text-on-surface font-tech-code-sm text-tech-code-sm focus:ring-1 focus:ring-primary border border-outline-variant/30"
                  >
                    <option value="Semua">Semua Koridor (5 Ruas)</option>
                    <option value="Koridor I">Koridor I - Sayur & Cabai Kabanjahe</option>
                    <option value="Koridor II">Koridor II - Lereng Sinabung & Horti</option>
                  </select>
                </div>
              </div>

              {/* MATRIX TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-high/90 text-outline font-tech-code-sm text-[11px] uppercase tracking-wider border-b border-outline-variant/20">
                      <th className="py-3 px-4 rounded-l-lg">Ruas & Koridor</th>
                      <th className="py-3 px-3">Hazard (H)</th>
                      <th className="py-3 px-3">Exposure (E)</th>
                      <th className="py-3 px-3">Vulnerability (V)</th>
                      <th className="py-3 px-3">Consequence (C)</th>
                      <th className="py-3 px-4 text-right rounded-r-lg">Skor Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10 font-body-sm text-body-sm">
                    {filteredMatrix.map((item) => (
                      <tr key={item.id} className="hover:bg-surface-container-high/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-on-surface font-tech-code-md text-tech-code-md">{item.name}</div>
                          <div className="text-[11px] text-on-surface-variant">{item.sub}</div>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="w-24 bg-surface-container-lowest h-2 rounded-full overflow-hidden mb-1">
                            <div className="bg-error h-full rounded-full" style={{ width: `${item.hazard * 100}%` }}></div>
                          </div>
                          <span className="font-tech-code-sm text-tech-code-sm text-error font-semibold">
                            {item.hazard.toFixed(2)} ({item.hazardLabel})
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="w-24 bg-surface-container-lowest h-2 rounded-full overflow-hidden mb-1">
                            <div className="bg-primary h-full rounded-full" style={{ width: `${item.exposure * 100}%` }}></div>
                          </div>
                          <span className="font-tech-code-sm text-tech-code-sm text-primary font-semibold">
                            {item.exposure.toFixed(2)} ({item.exposureLabel})
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="w-24 bg-surface-container-lowest h-2 rounded-full overflow-hidden mb-1">
                            <div
                              className="bg-tertiary h-full rounded-full"
                              style={{ width: `${item.vulnerability * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-tech-code-sm text-tech-code-sm text-tertiary font-semibold">
                            {item.vulnerability.toFixed(2)} ({item.vulnerabilityLabel})
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="w-24 bg-surface-container-lowest h-2 rounded-full overflow-hidden mb-1">
                            <div
                              className="bg-error h-full rounded-full"
                              style={{ width: `${item.consequence * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-tech-code-sm text-tech-code-sm text-error font-semibold">
                            {item.consequence.toFixed(2)} ({item.consequenceLabel})
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="px-2.5 py-1 rounded bg-error/20 text-error font-tech-code-md text-tech-code-md font-bold shadow-[0_0_8px_rgba(255,180,171,0.25)]">
                            {item.totalScore.toFixed(3)} ({item.status})
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RED FLAGS LIST */}
            <div className="xl:col-span-4 flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-xl space-y-4 border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error">flag</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Daftar Titik Kritis (Red Flags)</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-error/20 text-error font-tech-code-sm text-tech-code-sm font-bold">
                  2 AKTIF
                </span>
              </div>

              {/* Red Flag Item 1 */}
              <div className="p-3.5 rounded-xl bg-surface-container-high/80 border-l-4 border-error space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-tech-code-sm text-[11px] text-error font-bold flex items-center gap-1">
                    <span>🚩</span> FLAG-01: TIKUNGAN KRITIS TAHURA
                  </span>
                  <span className="px-2 py-0.5 rounded bg-error/20 text-error font-tech-code-sm text-[10px] font-bold">
                    Kondisi: Rusak Berat
                  </span>
                </div>
                <div className="font-tech-code-md text-tech-code-md text-on-surface font-bold">
                  Simpang Katepul – Gurusinga (KM 3.8)
                </div>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Tebing setinggi 22 meter tanpa retaining wall. Retakan tanah selebar 15 cm terdeteksi pascahujan lebat akhir pekan
                  lalu.
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="font-tech-code-sm text-[10px] text-outline">KONSEKUENSI SKOR: 0.95</span>
                  <button
                    onClick={() => onRequestOpd('Simpang Katepul – Gurusinga')}
                    className="px-2 py-1 rounded bg-error/20 text-error hover:bg-error hover:text-on-error text-[11px] font-tech-code-sm transition-all"
                  >
                    Bahas Forum OPD
                  </button>
                </div>
              </div>

              {/* Red Flag Item 2 */}
              <div className="p-3.5 rounded-xl bg-surface-container-high/80 border-l-4 border-tertiary space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-tech-code-sm text-[11px] text-tertiary font-bold flex items-center gap-1">
                    <span>🚩</span> FLAG-02: JEMBATAN BOTTLENECK
                  </span>
                  <span className="px-2 py-0.5 rounded bg-tertiary/15 text-tertiary font-tech-code-sm text-[10px]">
                    Kondisi: Sedang
                  </span>
                </div>
                <div className="font-tech-code-md text-tech-code-md text-on-surface font-bold">
                  RUAS-KR-14: Kutambaru – Munte (KM 1.2)
                </div>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  Pilar jembatan Lau Bengap mengalami gerusan aliran deras pascahujan. Berpotensi memutus suplai jagung hibrida ke
                  pabrik pakan Deliserdang.
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="font-tech-code-sm text-[10px] text-outline">KONSEKUENSI SKOR: 0.84</span>
                  <button
                    onClick={() => onRequestOpd('Kutambaru – Munte')}
                    className="px-2 py-1 rounded bg-tertiary/20 text-tertiary hover:bg-tertiary hover:text-on-tertiary text-[11px] font-tech-code-sm transition-all"
                  >
                    Bahas Forum OPD
                  </button>
                </div>
              </div>

              {/* Notice Footer */}
              <div className="p-3 rounded-lg bg-surface-container-lowest/60 text-tech-code-sm text-[11px] text-outline flex items-start gap-2 border border-outline-variant/20">
                <span className="material-symbols-outlined text-sm text-primary shrink-0 mt-0.5">verified_user</span>
                <span>Ruas Bendera Risiko wajib diikutsertakan dalam Musrenbang Tematik Ketahanan Pangan DPUTR-BPBD.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 04: UJI SENSITIVITAS BOBOT 3 SKENARIO (M.3)                           */}
      {/* ========================================================================= */}
      {activeTab === 'm3' && (
        <div className="flex flex-col space-y-6">
          {/* WEIGHTING SCENARIOS SWITCHER STRIP */}
          <div className="p-6 rounded-2xl bg-surface-container-low shadow-xl space-y-5 border border-outline-variant/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-tertiary/20 text-tertiary">
                    <span className="material-symbols-outlined text-base">tune</span>
                  </span>
                  <span className="font-label-caps text-label-caps text-tertiary uppercase font-bold">
                    Simulasi Model Kebijakan
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-1">
                  Uji Robustness & Sensitivitas Bobot Kriteria
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {scenarios[activeScenario].desc}
                </p>
              </div>

              {/* 3 Scenario Selector Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
                <button
                  onClick={() => setActiveScenario(1)}
                  className={`px-3.5 py-2.5 rounded-lg text-left transition-all ${
                    activeScenario === 1
                      ? 'bg-primary-container text-on-primary font-bold shadow-md'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <div className="font-tech-code-sm text-[10px] uppercase opacity-80">SKENARIO 1</div>
                  <div className="font-headline-md text-sm font-bold truncate">Seimbang (Standar SK)</div>
                </button>
                <button
                  onClick={() => setActiveScenario(2)}
                  className={`px-3.5 py-2.5 rounded-lg text-left transition-all ${
                    activeScenario === 2
                      ? 'bg-secondary-container text-on-secondary font-bold shadow-md'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <div className="font-tech-code-sm text-[10px] uppercase opacity-80">SKENARIO 2</div>
                  <div className="font-headline-md text-sm font-bold truncate">Produksi & Pasar</div>
                </button>
                <button
                  onClick={() => setActiveScenario(3)}
                  className={`px-3.5 py-2.5 rounded-lg text-left transition-all ${
                    activeScenario === 3
                      ? 'bg-tertiary-container text-on-tertiary font-bold shadow-md'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <div className="font-tech-code-sm text-[10px] uppercase opacity-80">SKENARIO 3</div>
                  <div className="font-headline-md text-sm font-bold truncate">Kebencanaan & Teknis</div>
                </button>
              </div>
            </div>

            {/* ACTIVE WEIGHT DISTRIBUTION GAUGES */}
            <div className="pt-4 border-t border-outline-variant/20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-2.5 rounded-lg bg-surface-container-high/60 border border-outline-variant/20">
                <span className="font-tech-code-sm text-[10px] text-outline block">C • Kondisi Jalan</span>
                <span className="font-tech-code-md text-tech-code-md text-primary font-bold">
                  {(currentWeights.C * 100).toFixed(0)}%
                </span>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full mt-1 overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${currentWeights.C * 100}%` }}></div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-high/60 border border-outline-variant/20">
                <span className="font-tech-code-sm text-[10px] text-outline block">P • Kepentingan Produksi</span>
                <span className="font-tech-code-md text-tech-code-md text-secondary font-bold">
                  {(currentWeights.P * 100).toFixed(0)}%
                </span>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full mt-1 overflow-hidden">
                  <div className="bg-secondary h-full" style={{ width: `${currentWeights.P * 100}%` }}></div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-high/60 border border-outline-variant/20">
                <span className="font-tech-code-sm text-[10px] text-outline block">A • Akses Pasar</span>
                <span className="font-tech-code-md text-tech-code-md text-primary-fixed-dim font-bold">
                  {(currentWeights.A * 100).toFixed(0)}%
                </span>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full mt-1 overflow-hidden">
                  <div className="bg-primary-fixed-dim h-full" style={{ width: `${currentWeights.A * 100}%` }}></div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-high/60 border border-outline-variant/20">
                <span className="font-tech-code-sm text-[10px] text-outline block">B • Penerima Manfaat</span>
                <span className="font-tech-code-md text-tech-code-md text-secondary-fixed-dim font-bold">
                  {(currentWeights.B * 100).toFixed(0)}%
                </span>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full mt-1 overflow-hidden">
                  <div className="bg-secondary-fixed-dim h-full" style={{ width: `${currentWeights.B * 100}%` }}></div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-high/60 border border-outline-variant/20">
                <span className="font-tech-code-sm text-[10px] text-outline block">R • Risiko Bencana</span>
                <span className="font-tech-code-md text-tech-code-md text-error font-bold">
                  {(currentWeights.R * 100).toFixed(0)}%
                </span>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full mt-1 overflow-hidden">
                  <div className="bg-error h-full" style={{ width: `${currentWeights.R * 100}%` }}></div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-high/60 border border-outline-variant/20">
                <span className="font-tech-code-sm text-[10px] text-outline block">M • Pemeliharaan DED</span>
                <span className="font-tech-code-md text-tech-code-md text-tertiary font-bold">
                  {(currentWeights.M * 100).toFixed(0)}%
                </span>
                <div className="w-full bg-surface-container-lowest h-1.5 rounded-full mt-1 overflow-hidden">
                  <div className="bg-tertiary h-full" style={{ width: `${currentWeights.M * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* BUMP CHART (RANK SHIFT) & STABILITY MATRIX */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* BUMP / SLOPE CHART */}
            <div className="xl:col-span-6 flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-xl space-y-4 border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                      Slope Chart: Pergeseran Rank Ruas
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Lintasan posisi peringkat 1 s/d 6 melintasi ketiga konfigurasi skenario bobot.
                  </p>
                </div>
                <span className="font-tech-code-sm text-tech-code-sm text-outline">N=6 Ruas Utama</span>
              </div>

              {/* Inline SVG Bump / Slope Chart */}
              <div className="relative w-full h-[320px] rounded-xl bg-surface-container-lowest/80 p-4 flex flex-col justify-between overflow-hidden border border-outline-variant/20">
                {/* Column Labels in SVG Header */}
                <div className="flex justify-between px-6 font-tech-code-sm text-tech-code-sm font-bold text-on-surface-variant border-b border-outline-variant/30 pb-2">
                  <span>Skenario 1 (Seimbang)</span>
                  <span>Skenario 2 (Pasar)</span>
                  <span>Skenario 3 (Bencana)</span>
                </div>

                {/* The SVG Canvas */}
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 500 240">
                  {/* Grid Lines for Ranks 1 to 6 */}
                  <line stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4" strokeWidth="1" x1="30" x2="470" y1="20" y2="20"></line>
                  <line stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4" strokeWidth="1" x1="30" x2="470" y1="60" y2="60"></line>
                  <line stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4" strokeWidth="1" x1="30" x2="470" y1="100" y2="100"></line>
                  <line stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4" strokeWidth="1" x1="30" x2="470" y1="140" y2="140"></line>
                  <line stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4" strokeWidth="1" x1="30" x2="470" y1="180" y2="180"></line>
                  <line stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4" strokeWidth="1" x1="30" x2="470" y1="220" y2="220"></line>

                  {/* RUAS 01: Simpang Empat (Rank 1 -> Rank 2 -> Rank 1) */}
                  <path
                    d="M 50 20 C 150 20, 150 60, 250 60 C 350 60, 350 20, 450 20"
                    stroke="#4cd7f6"
                    strokeLinecap="round"
                    strokeWidth="4"
                  ></path>
                  <circle cx="50" cy="20" fill="#4cd7f6" r="5"></circle>
                  <circle cx="250" cy="60" fill="#4cd7f6" r="5"></circle>
                  <circle cx="450" cy="20" fill="#4cd7f6" r="6" stroke="#0c1225" strokeWidth="2"></circle>

                  {/* RUAS 04: Tiganderket (Rank 2 -> Rank 4 -> Rank 2) */}
                  <path
                    d="M 50 60 C 150 60, 150 140, 250 140 C 350 140, 350 60, 450 60"
                    stroke="#ffb4ab"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                  <circle cx="50" cy="60" fill="#ffb4ab" r="4"></circle>
                  <circle cx="250" cy="140" fill="#ffb4ab" r="4"></circle>
                  <circle cx="450" cy="60" fill="#ffb4ab" r="5"></circle>

                  {/* RUAS 07: Suka-Ndeskati (Rank 3 -> Rank 1 -> Rank 4) */}
                  <path
                    d="M 50 100 C 150 100, 150 20, 250 20 C 350 20, 350 140, 450 140"
                    stroke="#4edea3"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                  <circle cx="50" cy="100" fill="#4edea3" r="4"></circle>
                  <circle cx="250" cy="20" fill="#4edea3" r="5"></circle>
                  <circle cx="450" cy="140" fill="#4edea3" r="4"></circle>

                  {/* RUAS 02: Kabanjahe-Singa (Rank 4 -> Rank 3 -> Rank 5) */}
                  <path
                    d="M 50 140 C 150 140, 150 100, 250 100 C 350 100, 350 180, 450 180"
                    stroke="#ffb95f"
                    strokeDasharray="3 3"
                    strokeWidth="2.5"
                  ></path>
                  <circle cx="50" cy="140" fill="#ffb95f" r="3.5"></circle>
                  <circle cx="250" cy="100" fill="#ffb95f" r="3.5"></circle>
                  <circle cx="450" cy="180" fill="#ffb95f" r="3.5"></circle>

                  {/* RUAS 14: Kutambaru (Rank 5 -> Rank 6 -> Rank 3) */}
                  <path
                    d="M 50 180 C 150 180, 150 220, 250 220 C 350 220, 350 100, 450 100"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                  ></path>
                  <circle cx="50" cy="180" fill="#06b6d4" r="3.5"></circle>
                  <circle cx="250" cy="220" fill="#06b6d4" r="3.5"></circle>
                  <circle cx="450" cy="100" fill="#06b6d4" r="4"></circle>

                  {/* RUAS 11: Barusjahe (Rank 6 -> Rank 5 -> Rank 6) */}
                  <path
                    d="M 50 220 C 150 220, 150 180, 250 180 C 350 180, 350 220, 450 220"
                    stroke="#869397"
                    strokeWidth="2"
                  ></path>
                  <circle cx="50" cy="220" fill="#869397" r="3"></circle>
                  <circle cx="250" cy="180" fill="#869397" r="3"></circle>
                  <circle cx="450" cy="220" fill="#869397" r="3"></circle>
                </svg>

                {/* Slope Chart Quick Legend */}
                <div className="flex items-center justify-between text-[11px] font-tech-code-sm pt-1 text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span> RUAS-01
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-error inline-block"></span> RUAS-04
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span> RUAS-07
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary inline-block"></span> RUAS-02
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-container inline-block"></span> RUAS-14
                  </span>
                </div>
              </div>

              {/* Analytical Insight Text */}
              <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                <strong className="text-on-surface">Temuan Grafis:</strong> Ruas Simpang Empat – Naman Teran memperlihatkan stabilitas
                tertinggi di mana ia tidak pernah keluar dari posisi 2 besar pada skenario mana pun. Sebaliknya, Ruas-14 melompat dari
                Rank 6 ke Rank 3 ketika bobot bahaya longsor diperbesar.
              </p>
            </div>

            {/* STABILITY & ROBUSTNESS TABLE */}
            <div className="xl:col-span-6 flex flex-col p-6 rounded-2xl bg-surface-container-low shadow-xl space-y-4 border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">verified</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                      Tabel Konsistensi Peringkat (Robustness)
                    </h3>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Kriteria Kelas I: Masuk top prioritas (≥ 2 skenario) = Rekomendasi Definitif.
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-secondary font-tech-code-sm text-tech-code-sm border border-outline-variant/20">
                  VALID 100%
                </span>
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-high/90 text-outline font-tech-code-sm text-[11px] uppercase tracking-wider border-b border-outline-variant/20">
                      <th className="py-3 px-3 rounded-l-lg">Ruas Jalan</th>
                      <th className="py-3 px-2 text-center">S.1</th>
                      <th className="py-3 px-2 text-center">S.2</th>
                      <th className="py-3 px-2 text-center">S.3</th>
                      <th className="py-3 px-2 text-center">Frekuensi K-I</th>
                      <th className="py-3 px-3 rounded-r-lg text-right">Status Stabilitas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10 font-body-sm text-body-sm">
                    <tr className="hover:bg-surface-container-high/40 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-bold font-tech-code-md text-tech-code-md text-on-surface block">
                          RUAS-KR-04: Simpang Empat
                        </span>
                        <span className="text-[11px] text-on-surface-variant">Kec. Naman Teran</span>
                      </td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-primary font-bold">#1</td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-on-surface">#2</td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-primary font-bold">#1</td>
                      <td className="py-3 px-2 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-tech-code-sm font-bold">
                          3 / 3
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-tech-code-sm text-[11px] font-bold border border-secondary/30">
                          ⭐ Prioritas Kokoh
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-high/40 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-bold font-tech-code-md text-tech-code-md text-on-surface block">
                          RUAS-KR-12: Tigapanah
                        </span>
                        <span className="text-[11px] text-on-surface-variant">Kec. Tigapanah</span>
                      </td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-on-surface">#2</td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-primary font-bold">#1</td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-on-surface">#3</td>
                      <td className="py-3 px-2 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-tech-code-sm font-bold">
                          3 / 3
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-tech-code-sm text-[11px] font-bold border border-secondary/30">
                          ⭐ Prioritas Kokoh
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-high/40 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-bold font-tech-code-md text-tech-code-md text-on-surface block">
                          RUAS-KR-01: Kabanjahe – Singa
                        </span>
                        <span className="text-[11px] text-on-surface-variant">Kec. Tigapanah</span>
                      </td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-on-surface">#3</td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-on-surface">#4</td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-on-surface">#2</td>
                      <td className="py-3 px-2 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-tech-code-sm font-bold">
                          2 / 3
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-tech-code-sm text-[11px] font-bold border border-secondary/30">
                          ⭐ Prioritas Kokoh
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-high/40 transition-colors bg-tertiary/5">
                      <td className="py-3 px-3">
                        <span className="font-bold font-tech-code-md text-tech-code-md text-on-surface block">
                          RUAS-KR-23: Payung – Batukarang
                        </span>
                        <span className="text-[11px] text-on-surface-variant">Kec. Payung</span>
                      </td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-on-surface-variant">#6</td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-on-surface-variant">#7</td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-tertiary font-bold">#4</td>
                      <td className="py-3 px-2 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-tertiary/20 text-tertiary font-tech-code-sm font-bold">
                          1 / 3
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary/15 text-tertiary font-tech-code-sm text-[11px] font-bold border border-tertiary/30">
                          ⚠️ Sensitif (Bencana)
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-high/40 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-bold font-tech-code-md text-tech-code-md text-on-surface block">
                          RUAS-KR-15: Barusjahe – Serdang
                        </span>
                        <span className="text-[11px] text-on-surface-variant">Kec. Barusjahe</span>
                      </td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-on-surface-variant">#7</td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-on-surface font-semibold">#6</td>
                      <td className="py-3 px-2 text-center font-tech-code-md text-on-surface-variant">#7</td>
                      <td className="py-3 px-2 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-tech-code-sm font-bold">
                          0 / 3
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="text-[11px] font-tech-code-sm text-outline">Kelas III Stabil</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
