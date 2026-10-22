// Data models and mock database for SPJPP-Karo Executive Intelligence

export type UserRole = 'DPUTR' | 'Bappeda' | 'Publik';

export interface RoadSegment {
  id: string; // e.g., KR-01-BRS
  code: string;
  name: string;
  kecamatan: string;
  lengthKm: number;
  widthM: number;
  jurisdiction: 'Kabupaten' | 'Desa / Poros' | 'Provinsi' | 'Nasional';
  technicalCondition: 'Baik' | 'Sedang' | 'Rusak Ringan' | 'Rusak Berat';
  surveyDate: string;
  startEndCoords: string;
  drainage: string;
  lastHistory: string;
  completenessPercent: number;
  hasMissingData?: boolean;
  missingDataNotes?: string;
  corridorId?: string;
  corridor?: string;
  commodity?: string;
  estimatedCost?: string;
  
  // 6 Criteria normalized scores (0.00 - 1.00)
  criteria: {
    c: number; // Kondisi Teknis
    p: number; // Kepentingan Produksi
    a: number; // Akses Pasar
    b: number; // Penerima Manfaat
    r: number; // Risiko Akses
    m: number; // Pemeliharaan / DED
  };
  cNorm?: number;
  pNorm?: number;
  aNorm?: number;
  bNorm?: number;
  rNorm?: number;
  mNorm?: number;
  score?: number;
  kelas?: 'Kelas I' | 'Kelas II' | 'Kelas III';
  stability?: 'Kokoh' | 'Sensitif' | 'Stabil';

  compositeScore: number;
  priorityClass: 'Kelas I' | 'Kelas II' | 'Kelas III';
  isRobust: boolean; // ⭐ Kokoh
  hasRiskFlag: boolean; // 🚩 R > 0.70
  riskFlagDetail?: string;

  // 4 Risk Components (M.2)
  riskDetails?: {
    hazard: number;
    hazardLabel: string;
    exposure: number;
    exposureLabel: string;
    vulnerability: number;
    vulnerabilityLabel: string;
    consequence: number;
    consequenceLabel: string;
    totalRiskScore: number;
    totalRiskTier: 'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah';
  };
}

export type RoadItem = RoadSegment;

export interface Corridor {
  id: string; // koridor-01
  number: string;
  name: string;
  subTitle: string;
  lengthKm: number;
  roadCount: number;
  priorityScore: number;
  priorityRank: number;
  priorityClass: 'Kelas I' | 'Kelas II' | 'Kelas III';
  urgencyLabel: string;
  urgencyPercent: number;
  hortiProductionKw: number;
  commodities: { name: string; percent: number; color: string }[];
  travelTimeMinutes: number;
  idealTimeMinutes: number;
  delayMinutes: number;
  speedLimit: string;
  altRoutesAvailable: boolean;
  altRouteNotes: string;
  beneficiariesCount: number;
  beneficiariesLabel: string;
  imageUrls: { url: string; caption: string }[];
  methodologyNote: string;
  colorHex: string;
}

export const INITIAL_ROADS: RoadSegment[] = [
  {
    id: 'KR-01-BRS',
    code: 'RUAS-KR-01',
    name: 'Jl. Koridor Pasar Roga - Gurusinga',
    kecamatan: 'Berastagi',
    lengthKm: 4.20,
    widthM: 4.50,
    jurisdiction: 'Kabupaten',
    technicalCondition: 'Rusak Berat',
    surveyDate: '14/11/2025',
    startEndCoords: '3.1842°N, 98.5081°E → 3.1950°N, 98.5204°E',
    drainage: 'Tanpa Saluran (40%)',
    lastHistory: 'Pemeliharaan 2019',
    completenessPercent: 100,
    corridorId: 'koridor-01',
    criteria: { c: 0.92, p: 0.94, a: 0.82, b: 0.88, r: 0.85, m: 0.78 },
    compositeScore: 0.887,
    priorityClass: 'Kelas I',
    isRobust: true,
    hasRiskFlag: true,
    riskFlagDetail: 'Tebing rawan longsoran & saluran tanpa talud penahan lahar dingin',
    riskDetails: {
      hazard: 0.82,
      hazardLabel: 'Tinggi (Slope > 30°)',
      exposure: 0.90,
      exposureLabel: '780 T/bln Sayuran',
      vulnerability: 0.75,
      vulnerabilityLabel: 'Tanpa Talud',
      consequence: 0.95,
      consequenceLabel: 'Isolasi Mutlak Pasar Roga',
      totalRiskScore: 0.865,
      totalRiskTier: 'Kritis'
    }
  },
  {
    id: 'KR-02-SPE',
    code: 'RUAS-KR-04',
    name: 'Jl. Sentra Hortikultura Raya - Simpang Empat',
    kecamatan: 'Simpang Empat',
    lengthKm: 6.80,
    widthM: 4.00,
    jurisdiction: 'Kabupaten',
    technicalCondition: 'Rusak Ringan',
    surveyDate: '03/12/2025',
    startEndCoords: '3.1705°N, 98.4410°E → 3.1912°N, 98.4682°E',
    drainage: 'Sebagian Rusak',
    lastHistory: 'Lapen 2021',
    completenessPercent: 100,
    corridorId: 'koridor-01',
    criteria: { c: 0.88, p: 0.91, a: 0.85, b: 0.76, r: 0.74, m: 0.70 },
    compositeScore: 0.835,
    priorityClass: 'Kelas I',
    isRobust: true,
    hasRiskFlag: true,
    riskFlagDetail: 'Rawan abu vulkanik Sinabung dan penurunan agregat',
    riskDetails: {
      hazard: 0.78,
      hazardLabel: 'Tinggi (Abu Vulkanik)',
      exposure: 0.88,
      exposureLabel: '920 T/bln Kubis/Wortel',
      vulnerability: 0.70,
      vulnerabilityLabel: 'Agregat Lepas',
      consequence: 0.88,
      consequenceLabel: 'Pemberhentian Truk Muatan',
      totalRiskScore: 0.812,
      totalRiskTier: 'Kritis'
    }
  },
  {
    id: 'KR-03-TPN',
    code: 'RUAS-KR-12',
    name: 'Jl. Akses Ladang Kubis Tigapanah - Sukarame',
    kecamatan: 'Tigapanah',
    lengthKm: 5.10,
    widthM: 3.50,
    jurisdiction: 'Desa / Poros',
    technicalCondition: 'Rusak Berat',
    surveyDate: '20/01/2026',
    startEndCoords: '3.1550°N, 98.5320°E → ⚠️ Belum ada GPS akhir',
    drainage: 'Alami / Erosi',
    lastHistory: 'Belum Pernah Ditangani',
    completenessPercent: 83,
    hasMissingData: true,
    missingDataNotes: 'Belum ada data GPS akhir koordinat ujung segmen Sukarame',
    corridorId: 'koridor-02',
    criteria: { c: 0.85, p: 0.80, a: 0.89, b: 0.82, r: 0.62, m: 0.72 },
    compositeScore: 0.796,
    priorityClass: 'Kelas I',
    isRobust: true,
    hasRiskFlag: false,
    riskDetails: {
      hazard: 0.50,
      hazardLabel: 'Sedang (Lereng Rendah)',
      exposure: 0.80,
      exposureLabel: '650 T/bln Kubis',
      vulnerability: 0.85,
      vulnerabilityLabel: 'Badan Tanah Lunak',
      consequence: 0.70,
      consequenceLabel: 'Detour 14 km via Poros',
      totalRiskScore: 0.710,
      totalRiskTier: 'Tinggi'
    }
  },
  {
    id: 'KR-04-KBJ',
    code: 'RUAS-KR-02',
    name: 'Jl. Lingkar Luar Terminal Agribisnis Kabanjahe',
    kecamatan: 'Kabanjahe',
    lengthKm: 3.40,
    widthM: 6.00,
    jurisdiction: 'Kabupaten',
    technicalCondition: 'Sedang',
    surveyDate: '08/10/2025',
    startEndCoords: '3.1780°N, 98.4901°E → 3.1620°N, 98.4812°E',
    drainage: 'Saluran Permanen',
    lastHistory: 'Overlay Hotmix 2022',
    completenessPercent: 100,
    corridorId: 'koridor-02',
    criteria: { c: 0.65, p: 0.80, a: 0.78, b: 0.85, r: 0.45, m: 0.68 },
    compositeScore: 0.702,
    priorityClass: 'Kelas II',
    isRobust: false,
    hasRiskFlag: false,
    riskDetails: {
      hazard: 0.30,
      hazardLabel: 'Rendah (Dataran)',
      exposure: 0.85,
      exposureLabel: '1.200 T/bln Campuran',
      vulnerability: 0.40,
      vulnerabilityLabel: 'Aspal Mantap',
      consequence: 0.45,
      consequenceLabel: 'Banyak Jalur Alternatif',
      totalRiskScore: 0.485,
      totalRiskTier: 'Rendah'
    }
  },
  {
    id: 'KR-05-MNT',
    code: 'RUAS-KR-14',
    name: 'Jl. Sentra Jeruk Munte - Sarinembah',
    kecamatan: 'Munte',
    lengthKm: 8.30,
    widthM: 3.80,
    jurisdiction: 'Kabupaten',
    technicalCondition: 'Rusak Berat',
    surveyDate: '12/01/2026',
    startEndCoords: '3.0911°N, 98.4112°E → 3.0645°N, 98.3905°E',
    drainage: 'Tersumbat / Erosi',
    lastHistory: '⚠️ Belum ada data buku arsip DPUTR',
    completenessPercent: 75,
    hasMissingData: true,
    missingDataNotes: 'Belum ada data buku arsip DPUTR riwayat pekerjaan penanganan',
    corridorId: 'koridor-03',
    criteria: { c: 0.72, p: 0.84, a: 0.71, b: 0.70, r: 0.73, m: 0.65 },
    compositeScore: 0.742,
    priorityClass: 'Kelas II',
    isRobust: false,
    hasRiskFlag: true,
    riskFlagDetail: 'Jembatan Wai Lau Bengap tergerus & rawan runtuh',
    riskDetails: {
      hazard: 0.65,
      hazardLabel: 'Sedang (Aliran Sungai)',
      exposure: 0.75,
      exposureLabel: '580 T/bln Jeruk & Jagung',
      vulnerability: 0.82,
      vulnerabilityLabel: 'Pilar Jembatan Retak',
      consequence: 0.84,
      consequenceLabel: 'Memutus suplai ke Deliserdang',
      totalRiskScore: 0.765,
      totalRiskTier: 'Tinggi'
    }
  },
  {
    id: 'KR-06-DLR',
    code: 'RUAS-KR-08',
    name: 'Jl. Koridor Agrowisata & Sayur Dolat Rayat',
    kecamatan: 'Dolat Rayat',
    lengthKm: 3.90,
    widthM: 4.50,
    jurisdiction: 'Kabupaten',
    technicalCondition: 'Baik',
    surveyDate: '17/12/2025',
    startEndCoords: '3.2011°N, 98.5410°E → 3.2205°N, 98.5524°E',
    drainage: 'Permanen 100%',
    lastHistory: 'Peningkatan 2023',
    completenessPercent: 100,
    corridorId: 'koridor-05',
    criteria: { c: 0.55, p: 0.78, a: 0.74, b: 0.68, r: 0.59, m: 0.71 },
    compositeScore: 0.672,
    priorityClass: 'Kelas II',
    isRobust: false,
    hasRiskFlag: false,
    riskDetails: {
      hazard: 0.40,
      hazardLabel: 'Sedang',
      exposure: 0.60,
      exposureLabel: '400 T/bln Sayur & Wisata',
      vulnerability: 0.25,
      vulnerabilityLabel: 'Drainase Sangat Baik',
      consequence: 0.50,
      consequenceLabel: 'Ada Jalur Desa',
      totalRiskScore: 0.420,
      totalRiskTier: 'Rendah'
    }
  },
  {
    id: 'KR-07-MRK',
    code: 'RUAS-KR-19',
    name: 'Jl. Penghubung Produksi Merek - Tongging',
    kecamatan: 'Merek',
    lengthKm: 7.50,
    widthM: 4.00,
    jurisdiction: 'Kabupaten',
    technicalCondition: 'Rusak Ringan',
    surveyDate: '05/01/2026',
    startEndCoords: '2.9812°N, 98.5140°E → 2.8945°N, 98.5280°E',
    drainage: 'Sebagian Rusak',
    lastHistory: 'Rehabilitasi 2020',
    completenessPercent: 100,
    corridorId: 'koridor-04',
    criteria: { c: 0.69, p: 0.78, a: 0.75, b: 0.68, r: 0.59, m: 0.71 },
    compositeScore: 0.708,
    priorityClass: 'Kelas II',
    isRobust: false,
    hasRiskFlag: false,
    riskDetails: {
      hazard: 0.55,
      hazardLabel: 'Sedang (Lereng Kaldera)',
      exposure: 0.62,
      exposureLabel: '480 T/bln Bawang & Kopi',
      vulnerability: 0.50,
      vulnerabilityLabel: 'Talud Parsial',
      consequence: 0.55,
      consequenceLabel: 'Detour 18 km',
      totalRiskScore: 0.555,
      totalRiskTier: 'Sedang'
    }
  },
  {
    id: 'KR-08-BRS',
    code: 'RUAS-KR-15',
    name: 'Jl. Rintisan Kantong Kentang Barusjahe',
    kecamatan: 'Barusjahe',
    lengthKm: 4.60,
    widthM: 3.00,
    jurisdiction: 'Desa / Poros',
    technicalCondition: 'Rusak Berat',
    surveyDate: '19/01/2026',
    startEndCoords: '3.1510°N, 98.5802°E → 3.1680°N, 98.6010°E',
    drainage: '⚠️ Belum ada survei drainase',
    lastHistory: 'Belum Pernah Ditangani',
    completenessPercent: 83,
    hasMissingData: true,
    missingDataNotes: 'Belum ada survei dimensi & kelayakan drainase lapangan',
    corridorId: 'koridor-05',
    criteria: { c: 0.54, p: 0.62, a: 0.58, b: 0.55, r: 0.42, m: 0.51 },
    compositeScore: 0.548,
    priorityClass: 'Kelas III',
    isRobust: false,
    hasRiskFlag: false,
    riskDetails: {
      hazard: 0.35,
      hazardLabel: 'Rendah',
      exposure: 0.55,
      exposureLabel: '380 T/bln Kentang',
      vulnerability: 0.60,
      vulnerabilityLabel: 'Jalan Tanah Kerikil',
      consequence: 0.40,
      consequenceLabel: 'Detour Sedang',
      totalRiskScore: 0.465,
      totalRiskTier: 'Rendah'
    }
  },
  {
    id: 'KR-09-PAY',
    code: 'RUAS-KR-23',
    name: 'Jl. Akses Hortikultura Payung - Batukarang',
    kecamatan: 'Payung',
    lengthKm: 5.40,
    widthM: 4.00,
    jurisdiction: 'Kabupaten',
    technicalCondition: 'Rusak Berat',
    surveyDate: '11/01/2026',
    startEndCoords: '3.1205°N, 98.3411°E → 3.1042°N, 98.3180°E',
    drainage: 'Rusak Total Akibat Lahar',
    lastHistory: 'Tanggap Darurat 2021',
    completenessPercent: 100,
    corridorId: 'koridor-01',
    criteria: { c: 0.65, p: 0.71, a: 0.60, b: 0.64, r: 0.72, m: 0.58 },
    compositeScore: 0.661,
    priorityClass: 'Kelas II',
    isRobust: false,
    hasRiskFlag: true,
    riskFlagDetail: 'Zona aliran lahar hujan Sinabung, jembatan gorong-gorong tersumbat endapan',
    riskDetails: {
      hazard: 0.85,
      hazardLabel: 'Sangat Tinggi (Lahar)',
      exposure: 0.70,
      exposureLabel: '510 T/bln Cabai & Jeruk',
      vulnerability: 0.80,
      vulnerabilityLabel: 'Gorong-gorong Amblas',
      consequence: 0.80,
      consequenceLabel: 'Akses Terputus total ke Payung',
      totalRiskScore: 0.785,
      totalRiskTier: 'Tinggi'
    }
  }
];

// Populate default convenience accessors
INITIAL_ROADS.forEach((r) => {
  r.cNorm = r.cNorm ?? r.criteria.c;
  r.pNorm = r.pNorm ?? r.criteria.p;
  r.aNorm = r.aNorm ?? r.criteria.a;
  r.bNorm = r.bNorm ?? r.criteria.b;
  r.rNorm = r.rNorm ?? r.criteria.r;
  r.mNorm = r.mNorm ?? r.criteria.m;
  r.score = r.score ?? r.compositeScore;
  r.kelas = r.kelas ?? r.priorityClass;
  r.stability = r.stability ?? (r.isRobust ? 'Kokoh' : 'Sensitif');
  r.commodity = r.commodity ?? 'Hortikultura & Sayur';
  r.corridor = r.corridor ?? 'Koridor I - Sayur & Cabai Kabanjahe';
  r.estimatedCost = r.estimatedCost ?? 'Rp 3,82 Miliar';
});

export const CORRIDORS_DATA: Corridor[] = [
  {
    id: 'koridor-01',
    number: '01',
    name: 'Koridor 01: Simpang Empat - Berastagi',
    subTitle: 'Koridor Agribisnis Sayur Mayur Kaki Sinabung',
    lengthKm: 18.4,
    roadCount: 7,
    priorityScore: 0.842,
    priorityRank: 1,
    priorityClass: 'Kelas I',
    urgencyLabel: 'Sangat Mendesak (Kelas I)',
    urgencyPercent: 84.2,
    hortiProductionKw: 842600,
    commodities: [
      { name: 'Wortel', percent: 38, color: '#ffb95f' },
      { name: 'Tomat', percent: 34, color: '#ffb4ab' },
      { name: 'Kubis / Kol', percent: 28, color: '#4edea3' }
    ],
    travelTimeMinutes: 42,
    idealTimeMinutes: 25,
    delayMinutes: 17,
    speedLimit: '< 20 km/jam',
    altRoutesAvailable: false,
    altRouteNotes: 'Risiko isolasi total bagi sentra pertanian kaki Sinabung jika jembatan gantung atau segmen lereng amblas tertimbun material vulkanik.',
    beneficiariesCount: 18450,
    beneficiariesLabel: 'Petani, Poktan & Logistik (Terdata Tanpa Ganda)',
    imageUrls: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKAFma6OcK2aLTllilolNxxYghThaYxOCquTpthHeGST0LvpKW6-h6VIkL62NUG0dbY0NhM9ohev48dYPDT7BHCozfW3f4xTLratEGCaDs2GzywamKoPDZZidqn4B3x5Jq0PnHa5b7xM5TX4zeTivMMQffN3cwiV71a-jaG-zjDmaehVjeRM2fGS8nJ83V6l7pRGgxe7KlJFlQGKy8PfmDLcbdcrflMlfvIXaWCAvTYGESbuMQPMNc0g',
        caption: 'Sentra Kaki Sinabung'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOwIMLP1ZdSQp1vYcrSuBhdyWm32i5q9ngDC-p61RFJknebiVnAZobto4ohiZ9LwOxg5GqUS18jdpRndSkFCGXk_n3VCnGH4evwi7KNUKBcZNrxHWpHJxzCJaoUlbJyyzjHIRttfv_4v8_GUNXTc2GdSRbEw_ZZ7x-MJ_6hL-Y62AXq4DxvmjZf4-L1b2zHswOG9vHSPJ1nRdJvfmPUd0m0Ck3miXN_TaeHubkV2SPRwqCPbTcXdmSIA',
        caption: 'Segmen Rawan Rusak KM 11'
      }
    ],
    methodologyNote: 'Data produksi BPS tersedia hingga tingkat kecamatan; dialokasikan ke koridor menurut koordinat titik lokasi sentra perkebunan aktual, bukan asumsi subjektif.',
    colorHex: '#f43f5e'
  },
  {
    id: 'koridor-02',
    number: '02',
    name: 'Koridor 02: Tigapanah - Kabanjahe',
    subTitle: 'Koridor Sub-Terminal Jagung Hibrida & Jeruk Manis',
    lengthKm: 14.2,
    roadCount: 5,
    priorityScore: 0.765,
    priorityRank: 2,
    priorityClass: 'Kelas II',
    urgencyLabel: 'Prioritas Sedang (Kelas II)',
    urgencyPercent: 76.5,
    hortiProductionKw: 620400,
    commodities: [
      { name: 'Jagung Hibrida', percent: 45, color: '#ffb95f' },
      { name: 'Jeruk Manis', percent: 35, color: '#f59e0b' },
      { name: 'Cabai Merah', percent: 20, color: '#f43f5e' }
    ],
    travelTimeMinutes: 34,
    idealTimeMinutes: 20,
    delayMinutes: 14,
    speedLimit: '< 25 km/jam',
    altRoutesAvailable: true,
    altRouteNotes: 'Ada jalur pintas poros desa Sukarame namun sempit untuk truk Fuso 8 ton.',
    beneficiariesCount: 14200,
    beneficiariesLabel: 'Petani Jagung & Pedagang Pengumpul',
    imageUrls: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiV87WXCCnkLFDknJI9ld6wYlGIwCpwnfqhL7u9DpRJ41aPb1DJMFpefTiJr2ead0oFK9isI5y3DQ77ScrZ6mSkVBXb4vcriHrEwNnyUqq2QZkhEGjg-o_cZufrx2doO2xvPA48910RYwwfYslmK32CRg03NqhUnD6e72ZvQl_rqFvfw636BVGmuhvGoquhv3IcXT5S4EfRug3DriQGmIqU6lXSlDC9hLmNiCWNDp6GY48OoiqXt5kww',
        caption: 'Simpul Muat Tigapanah'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTBMWORZ6ERN8niu-grXJAtcs50FjVJ4ciFrjdGJMSRD38RWwzniA1l9V38314yJENwWrO9-fRroAMlJTJ5CgmgXgQy2RDpdnIoCAVc5Mttk_ENa8b_KjH4v-HedfwmFfkrda1Ci3sDH87zYNvInpCNbD86KGiv76mPxxVQ9D0J_h16kfq2L_ihmsd1Hlsl9wBJ8Kurd3yratj4ajqObZc27K41LqEpZTpp3_AJZcUUk6eiEqfv1S6WA',
        caption: 'Akses Sukarame'
      }
    ],
    methodologyNote: 'Koneksi sentra jagung pakan ternak menuju jalur distribusi Medan dan Pematang Siantar.',
    colorHex: '#f59e0b'
  },
  {
    id: 'koridor-03',
    number: '03',
    name: 'Koridor 03: Munte - Sukarame',
    subTitle: 'Koridor Hortikultura & Perkebunan Padi Lereng Barat',
    lengthKm: 16.5,
    roadCount: 4,
    priorityScore: 0.720,
    priorityRank: 3,
    priorityClass: 'Kelas II',
    urgencyLabel: 'Prioritas Sedang (Kelas II)',
    urgencyPercent: 72.0,
    hortiProductionKw: 495000,
    commodities: [
      { name: 'Jeruk Manis', percent: 50, color: '#f59e0b' },
      { name: 'Padi Sawah', percent: 30, color: '#4edea3' },
      { name: 'Kopi Robusta', percent: 20, color: '#ffb95f' }
    ],
    travelTimeMinutes: 38,
    idealTimeMinutes: 22,
    delayMinutes: 16,
    speedLimit: '< 25 km/jam',
    altRoutesAvailable: true,
    altRouteNotes: 'Rute memutar via Kabanjahe menambah jarak 22 km jika jembatan Lau Bengap terputus.',
    beneficiariesCount: 9800,
    beneficiariesLabel: 'Gapoktan Munte & Petani Jeruk',
    imageUrls: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiV87WXCCnkLFDknJI9ld6wYlGIwCpwnfqhL7u9DpRJ41aPb1DJMFpefTiJr2ead0oFK9isI5y3DQ77ScrZ6mSkVBXb4vcriHrEwNnyUqq2QZkhEGjg-o_cZufrx2doO2xvPA48910RYwwfYslmK32CRg03NqhUnD6e72ZvQl_rqFvfw636BVGmuhvGoquhv3IcXT5S4EfRug3DriQGmIqU6lXSlDC9hLmNiCWNDp6GY48OoiqXt5kww',
        caption: 'Kondisi Lereng Munte'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOwIMLP1ZdSQp1vYcrSuBhdyWm32i5q9ngDC-p61RFJknebiVnAZobto4ohiZ9LwOxg5GqUS18jdpRndSkFCGXk_n3VCnGH4evwi7KNUKBcZNrxHWpHJxzCJaoUlbJyyzjHIRttfv_4v8_GUNXTc2GdSRbEw_ZZ7x-MJ_6hL-Y62AXq4DxvmjZf4-L1b2zHswOG9vHSPJ1nRdJvfmPUd0m0Ck3miXN_TaeHubkV2SPRwqCPbTcXdmSIA',
        caption: 'Jembatan Lau Bengap'
      }
    ],
    methodologyNote: 'Penyangga lumbung pangan padi dan jeruk manis untuk kebutuhan pasar lokal Karo dan Dairi.',
    colorHex: '#f59e0b'
  },
  {
    id: 'koridor-04',
    number: '04',
    name: 'Koridor 04: Merek - Tongging',
    subTitle: 'Koridor Agrowisata & Bawang Merah Tepian Danau Toba',
    lengthKm: 12.8,
    roadCount: 3,
    priorityScore: 0.490,
    priorityRank: 5,
    priorityClass: 'Kelas III',
    urgencyLabel: 'Pemeliharaan Rutin (Kelas III)',
    urgencyPercent: 49.0,
    hortiProductionKw: 310000,
    commodities: [
      { name: 'Bawang Merah', percent: 40, color: '#f43f5e' },
      { name: 'Kopi Arabika', percent: 35, color: '#ffb95f' },
      { name: 'Mangga & Sayur', percent: 25, color: '#4edea3' }
    ],
    travelTimeMinutes: 28,
    idealTimeMinutes: 20,
    delayMinutes: 8,
    speedLimit: '< 35 km/jam',
    altRoutesAvailable: true,
    altRouteNotes: 'Tersedia rute lingkar kaldera Toba beraspal hotmix dalam kondisi mantap.',
    beneficiariesCount: 7600,
    beneficiariesLabel: 'Petani Bawang & Pelaku Agrowisata',
    imageUrls: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTBMWORZ6ERN8niu-grXJAtcs50FjVJ4ciFrjdGJMSRD38RWwzniA1l9V38314yJENwWrO9-fRroAMlJTJ5CgmgXgQy2RDpdnIoCAVc5Mttk_ENa8b_KjH4v-HedfwmFfkrda1Ci3sDH87zYNvInpCNbD86KGiv76mPxxVQ9D0J_h16kfq2L_ihmsd1Hlsl9wBJ8Kurd3yratj4ajqObZc27K41LqEpZTpp3_AJZcUUk6eiEqfv1S6WA',
        caption: 'Tepian Kaldera Danau Toba'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKAFma6OcK2aLTllilolNxxYghThaYxOCquTpthHeGST0LvpKW6-h6VIkL62NUG0dbY0NhM9ohev48dYPDT7BHCozfW3f4xTLratEGCaDs2GzywamKoPDZZidqn4B3x5Jq0PnHa5b7xM5TX4zeTivMMQffN3cwiV71a-jaG-zjDmaehVjeRM2fGS8nJ83V6l7pRGgxe7KlJFlQGKy8PfmDLcbdcrflMlfvIXaWCAvTYGESbuMQPMNc0g',
        caption: 'Jalan Mantap Merek'
      }
    ],
    methodologyNote: 'Ruas berstatus mantap, difokuskan pada pembersihan bahu jalan dan drainase tebing.',
    colorHex: '#10b981'
  },
  {
    id: 'koridor-05',
    number: '05',
    name: 'Koridor 05: Barusjahe - Dolat Rayat',
    subTitle: 'Koridor Sentra Kentang & Sayur Mayur Kaki Sibayak',
    lengthKm: 15.6,
    roadCount: 6,
    priorityScore: 0.815,
    priorityRank: 2,
    priorityClass: 'Kelas I',
    urgencyLabel: 'Prioritas Kritis (Kelas I)',
    urgencyPercent: 81.5,
    hortiProductionKw: 580000,
    commodities: [
      { name: 'Kentang Granola', percent: 45, color: '#ffb95f' },
      { name: 'Daun Bawang & Seledri', percent: 30, color: '#4edea3' },
      { name: 'Kol Ungu', percent: 25, color: '#acedff' }
    ],
    travelTimeMinutes: 40,
    idealTimeMinutes: 24,
    delayMinutes: 16,
    speedLimit: '< 20 km/jam',
    altRoutesAvailable: false,
    altRouteNotes: 'Segmen lereng batuan rapuh kaki Sibayak sering amblas jika curah hujan melebihi 150 mm/hari.',
    beneficiariesCount: 12800,
    beneficiariesLabel: 'Petani Kentang & Eksportir Sayur Segar',
    imageUrls: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOwIMLP1ZdSQp1vYcrSuBhdyWm32i5q9ngDC-p61RFJknebiVnAZobto4ohiZ9LwOxg5GqUS18jdpRndSkFCGXk_n3VCnGH4evwi7KNUKBcZNrxHWpHJxzCJaoUlbJyyzjHIRttfv_4v8_GUNXTc2GdSRbEw_ZZ7x-MJ_6hL-Y62AXq4DxvmjZf4-L1b2zHswOG9vHSPJ1nRdJvfmPUd0m0Ck3miXN_TaeHubkV2SPRwqCPbTcXdmSIA',
        caption: 'Lereng Batuan Sibayak'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKAFma6OcK2aLTllilolNxxYghThaYxOCquTpthHeGST0LvpKW6-h6VIkL62NUG0dbY0NhM9ohev48dYPDT7BHCozfW3f4xTLratEGCaDs2GzywamKoPDZZidqn4B3x5Jq0PnHa5b7xM5TX4zeTivMMQffN3cwiV71a-jaG-zjDmaehVjeRM2fGS8nJ83V6l7pRGgxe7KlJFlQGKy8PfmDLcbdcrflMlfvIXaWCAvTYGESbuMQPMNc0g',
        caption: 'Sentra Kentang Barusjahe'
      }
    ],
    methodologyNote: 'Penyuplai kentang industri olahan ke Sumatera Utara dan Riau via jalur pintas Barusjahe-Deli Serdang.',
    colorHex: '#f43f5e'
  }
];

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  category: 'Bobot' | 'Verifikasi' | 'SK Bupati' | 'Data Primer' | 'Integritas';
  hash: string;
  details: string;
  detail?: string;
}

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'LOG-2026-0028',
    timestamp: '21/10/2026 19:42:10 WIB',
    actor: 'Ir. Hendra Tarigan',
    role: 'Kabid Bina Marga DPUTR',
    action: 'Verifikasi Ground-Check Segmen KM 03+200 Simpang Katepul',
    category: 'Verifikasi',
    hash: 'SHA256: 8f4b1e7c90a12d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e',
    details: 'Status amblas divalidasi ke data atribut primer D.1. Mengunci nilai risiko keterputusan 0.95.'
  },
  {
    id: 'LOG-2026-0027',
    timestamp: '21/10/2026 14:15:30 WIB',
    actor: 'Dra. Maria br Ginting',
    role: 'Kepala Bidang Bappeda Karo',
    action: 'Pengesahan Integrasi Hasil Pemeringkatan ke Pra-RKPD TA 2027',
    category: 'SK Bupati',
    hash: 'SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    details: 'Mendaftarkan 9 ruas Kelas I sebagai daftar prioritas definitif DAK Tematik Pertanian.'
  },
  {
    id: 'LOG-2026-0026',
    timestamp: '20/10/2026 11:08:45 WIB',
    actor: 'Tim Teknis BPBD Karo',
    role: 'Pusdalops BPBD',
    action: 'Pemberian Bendera Risiko (Flag-01) Ruas Suka - Ndeskati',
    category: 'Integritas',
    hash: 'SHA256: 7d1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a',
    details: 'Penilaian creeping soil pada tebing utara. Ketiadaan rute alternatif mewajibkan mitigasi bronjong.'
  },
  {
    id: 'LOG-2026-0025',
    timestamp: '19/10/2026 09:30:00 WIB',
    actor: 'Sistem SPJPP Kriptografis',
    role: 'Enforcement Engine',
    action: 'Penguncian Vektor Bobot Notulen No. 02/BA-BOBOT/SPJPP/2026',
    category: 'Bobot',
    hash: 'SHA256: 9f2a4b8c1d5e7f0a3b6c9e2d5f8a1c4b7e0d3a6c9f2b5e8a1d4c7f0b3e6a9d2c',
    details: 'Bobot C (0.25), P (0.25), A (0.15), B (0.10), R (0.15), M (0.10) terkunci otomatis sebelum data mentah diunggah.'
  },
  {
    id: 'LOG-2026-0024',
    timestamp: '18/10/2026 16:55:12 WIB',
    actor: 'Dinas Pertanian Karo',
    role: 'Admin Data Agribisnis',
    action: 'Sinkronisasi Angka Produksi 3 Komoditas BPS 2025',
    category: 'Data Primer',
    hash: 'SHA256: 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    details: 'Input volume kuintal: Wortel (1.980.200 kw), Tomat (1.785.400 kw), Kubis (1.497.299 kw).'
  }
];
