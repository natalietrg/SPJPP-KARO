import React from 'react';

export type ScreenId =
  | 'tabel-induk-ruas'
  | 'peta-koridor-pertanian'
  | 'indeks-prioritas-6-kriteria'
  | 'penilaian-risiko-akses'
  | 'uji-sensitivitas-bobot'
  | 'sk-tim-publikasi'
  | 'integrasi-rkpd-anggaran'
  | 'pilot-sebelum-sesudah'
  | 'panel-keputusan-90-hari'
  | 'dasbor-kpi-risiko'
  | 'log-audit'
  | 'portal-transparansi-publik';

export type UserRole = 'DPUTR' | 'Bappeda' | 'Publik';

interface SidebarProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  logCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  onSelectScreen,
  activeRole,
  onSelectRole,
  logCount,
}) => {
  // Profiles based on role
  const profileDetails = {
    DPUTR: {
      name: 'Ir. Hendra Tarigan',
      title: 'Kabid Bina Marga DPUTR',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD8MFdGW4w1xAxRI7Nkr9XTt5NMpxg6Wml81RASl4-UL9QnTtK4AZmRzb2NJSGoWsEP1miQEsTJi_h7Gu6a4OWTv3AY38NzOoKXMjbvAztjdl4lNP3-CPqmEPjBJDfIzov6R11P5L615YezohMSo00MhNi-Gqjsy4vttUxifHB5GMwMxJ70verC0AmfwKhx0Kzk-jYq7R3ME-WmRSVNd6j4h2F7IcwU1cOlhCZjm7dSHQT8FhKgi6ZD_A',
    },
    Bappeda: {
      name: 'Dra. Maria br Ginting',
      title: 'Kabid Litbang Bappeda',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    Publik: {
      name: 'Masyarakat & Poktan Karo',
      title: 'Akses Terbuka Publik',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  };

  const currentProfile = profileDetails[activeRole];

  const primarySteps = [
    {
      id: 'tabel-induk-ruas' as ScreenId,
      code: '01. Tabel Induk Ruas (D.1)',
      tag: 'DATA',
      sub: 'Pilar Data | Inventarisasi Daerah',
      tagColor: 'text-primary',
    },
    {
      id: 'peta-koridor-pertanian' as ScreenId,
      code: '02. Peta Koridor (D.2)',
      tag: 'GIS',
      sub: 'Pilar Data | Spasial Komoditas',
      tagColor: 'text-primary',
    },
    {
      id: 'indeks-prioritas-6-kriteria' as ScreenId,
      code: '03. Indeks Prioritas 6 Kriteria',
      tag: 'METODE',
      sub: 'M.1 | Pembobotan Multikriteria Kab',
      tagColor: 'text-secondary',
    },
    {
      id: 'penilaian-risiko-akses' as ScreenId,
      code: '03b. Penilaian Risiko Akses',
      tag: 'BPBD',
      sub: 'M.2 | Kerentanan Bencana & Isolasi',
      tagColor: 'text-error',
      tagBg: 'bg-error-container/30',
    },
    {
      id: 'uji-sensitivitas-bobot' as ScreenId,
      code: '04. Uji Sensitivitas Bobot',
      tag: 'PANEL',
      sub: 'M.3 | Simulasi Robustness Keputusan',
      tagColor: 'text-tertiary',
    },
    {
      id: 'sk-tim-publikasi' as ScreenId,
      code: '05. SK Tim & Publikasi',
      tag: 'BUPATI',
      sub: 'K.1, K.2 | Legalitas & Legitimasi',
      tagColor: 'text-primary',
    },
    {
      id: 'integrasi-rkpd-anggaran' as ScreenId,
      code: '06. Integrasi RKPD & Usulan',
      tag: 'APBD',
      sub: 'P.1, P.2 | Pusat & DAK Tematik',
      tagColor: 'text-secondary',
    },
    {
      id: 'pilot-sebelum-sesudah' as ScreenId,
      code: '07. Pilot Sebelum-Sesudah',
      tag: 'EVALUASI',
      sub: 'P.3 | Dampak Produksi Komoditas',
      tagColor: 'text-tertiary',
    },
  ];

  const executiveSteps = [
    {
      id: 'panel-keputusan-90-hari' as ScreenId,
      name: 'Panel Keputusan 90 Hari',
      tag: 'EKSEKUTIF',
      tagColor: 'text-primary',
    },
    {
      id: 'dasbor-kpi-risiko' as ScreenId,
      name: 'Dasbor KPI & Risiko 5x5',
      tag: 'HEATMAP',
      tagColor: 'text-error',
    },
    {
      id: 'log-audit' as ScreenId,
      name: 'Log Audit & Integritas',
      tag: `${logCount} LOG`,
      tagColor: 'text-outline',
    },
    {
      id: 'portal-transparansi-publik' as ScreenId,
      name: 'Portal Transparansi Publik',
      tag: 'OPEN',
      tagColor: 'text-secondary',
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-surface-container-lowest/95 backdrop-blur-2xl z-50 flex flex-col justify-between overflow-y-auto shadow-[0_4px_24px_rgba(0,0,0,0.8)] border-r border-outline-variant/20">
      <div className="flex flex-col">
        {/* Logo and Brand */}
        <div className="p-space-md border-b border-outline-variant/30 bg-surface-container-low/60">
          <div className="flex items-center gap-space-sm mb-1.5 cursor-pointer" onClick={() => onSelectScreen('tabel-induk-ruas')}>
            <img
              alt="Logo SPJPP-Karo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UpzvtaQQraHXdLSF8QnyuGeT4xKiJSAdmC2QiAoeDvQs6XCSkN0-5umQQ0adD21nj-llsYMqvJs68kbP_lBbG3mQRNorzE5-4tc_JorBYzJUClYp7PhQPzt_EEa8lCD9TReojH1fWJoUad584hz-p4IaVLQ9QE8k3fG15JmNRVv7rL2LXnGAA4p5YBxqrOunz0HmCDd3M5pcMS3FA82GFj5r8Fcl7I3JB3Er_OB4GMrxQ3jQLfPjtVqVKv"
            />
            <span className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface">
              SPJPP
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/40 font-tech-code-sm text-tech-code-sm uppercase font-bold tracking-wider">
              KARO
            </span>
          </div>
          <p className="font-tech-code-sm text-tech-code-sm text-on-surface-variant leading-tight">
            Prioritas Jalan Berbasis Manfaat &amp; Risiko
          </p>
        </div>

        {/* Section 1 Header */}
        <div className="px-space-md pt-space-md pb-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps uppercase text-primary tracking-wider">
              Alur Perjalanan Prioritas
            </span>
            <span className="font-tech-code-sm text-tech-code-sm text-secondary">
              01-07
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant/80 text-[11px] leading-tight mt-0.5">
            Satu Rangkaian dari Data ke Anggaran
          </p>
        </div>

        {/* Navigation Links: 01 - 07 */}
        <nav className="flex flex-col gap-1 px-space-sm py-space-xs">
          {primarySteps.map((step) => {
            const isActive = activeScreen === step.id;
            return (
              <button
                key={step.id}
                onClick={() => onSelectScreen(step.id)}
                className={`text-left flex flex-col p-2.5 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-container to-surface-container-high text-on-surface font-bold shadow-[0_0_15px_rgba(6,182,212,0.35)] ring-1 ring-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-tech-code-md text-tech-code-md truncate pr-1">
                    {step.code}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded font-tech-code-sm text-[10px] shrink-0 ${
                      step.tagBg || 'bg-surface-container-high'
                    } ${step.tagColor}`}
                  >
                    {step.tag}
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant/70 mt-0.5 truncate">
                  {step.sub}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Section 2 Header */}
        <div className="px-space-md pt-space-sm pb-space-xs">
          <span className="font-label-caps text-label-caps uppercase text-outline tracking-wider">
            Modul Eksekutif &amp; Kontrol
          </span>
        </div>

        {/* Navigation Links: Executive */}
        <nav className="flex flex-col gap-1 px-space-sm pb-space-md">
          {executiveSteps.map((mod) => {
            const isActive = activeScreen === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => onSelectScreen(mod.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all font-body-sm text-body-sm cursor-pointer ${
                  isActive
                    ? 'bg-surface-container-high text-on-surface font-semibold ring-1 ring-outline-variant/40'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="truncate pr-1">{mod.name}</span>
                <span className={`font-tech-code-sm text-[10px] shrink-0 ${mod.tagColor}`}>
                  {mod.tag}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Role Switcher & Profile in Sidebar Footer */}
      <div className="p-space-sm bg-surface-container-lowest/90 border-t border-outline-variant/30 flex flex-col gap-space-sm">
        {/* Role Active Simulator */}
        <div className="bg-surface-container-low/80 p-2 rounded-xl">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="font-label-caps text-[10px] text-outline uppercase tracking-wider">
              Simulasi Peran Aktif
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse"></span>
          </div>
          <div className="grid grid-cols-3 gap-1 bg-surface-container-lowest p-1 rounded-lg">
            {(['DPUTR', 'Bappeda', 'Publik'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => onSelectRole(r)}
                className={`py-1 text-[10px] font-tech-code-sm rounded transition-all cursor-pointer ${
                  activeRole === r
                    ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* User Card */}
        <div className="p-2.5 rounded-xl bg-surface-container-low/70 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/40"
                src={currentProfile.avatar}
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-secondary ring-1 ring-surface-container-lowest"></span>
            </div>
            <div className="min-w-0">
              <p className="font-body-sm text-[12px] font-bold text-on-surface truncate">
                {currentProfile.name}
              </p>
              <p className="font-tech-code-sm text-[10px] text-on-surface-variant truncate">
                {currentProfile.title}
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectRole(activeRole === 'DPUTR' ? 'Bappeda' : 'DPUTR')}
            className="p-1.5 rounded-lg hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
            title="Ganti Sesi Pengguna"
          >
            <span className="material-symbols-outlined text-base leading-none">
              swap_horiz
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
