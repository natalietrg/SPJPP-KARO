import React, { useState, useEffect } from 'react';
import { ScreenId, UserRole } from './Sidebar';

interface HeaderProps {
  onOpenSearch: () => void;
  onSelectScreen: (screen: ScreenId) => void;
  activeScreenTitle: string;
  activeRole: UserRole;
  logCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onSelectScreen,
  activeScreenTitle,
  activeRole,
  logCount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Peringatan Geoteknik Tahura KM 54',
      time: '15 menit lalu',
      desc: 'Sensor pergerakan lereng mendeteksi rayapan 1.4 cm pascahujan lebat.',
      type: 'critical',
    },
    {
      id: 2,
      title: 'Verifikasi Atribut D.1 Selesai',
      time: '1 jam lalu',
      desc: 'DPUTR merampungkan survei 6 ruas di koridor Simpang Empat.',
      type: 'info',
    },
    {
      id: 3,
      title: 'Sinkronisasi Angka BPS 2025',
      time: '4 jam lalu',
      desc: 'Angka produksi wortel dan tomat telah di-refresh ke sistem skor M.1.',
      type: 'success',
    },
  ];

  // Speech guidance
  const speakCurrentScreen = () => {
    if (!('speechSynthesis' in window)) {
      alert('Fitur suara tidak didukung pada browser ini.');
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const narration = `Anda berada pada ${activeScreenTitle}. Sistem SPJPP Karo mengintegrasikan data inventarisasi jalan dengan produksi komoditas hortikultura dan mitigasi risiko bencana Gunung Sinabung dan Sibayak.`;
    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Keyboard shortcut Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  return (
    <header className="fixed top-0 left-[280px] right-0 z-40 bg-surface-container-lowest/80 backdrop-blur-2xl border-b border-outline-variant/20 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.6)]">
      {/* Top Banner Status Bar */}
      <div className="w-full bg-surface-container-low/90 px-space-lg py-1 border-b border-outline-variant/20 flex items-center justify-between text-tech-code-sm font-tech-code-sm">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-tertiary font-bold shrink-0">⚠️ MODE DEMO:</span>
          <span className="text-on-surface-variant truncate">
            Data simulasi teknokratis DPUTR/BPS Kab. Karo. Parameter kosong ditandai
          </span>
          <span className="hidden sm:inline px-1.5 py-0.2 rounded bg-tertiary/10 text-tertiary text-[10px] border border-tertiary/20 shrink-0">
            Belum ada data
          </span>
        </div>
        <div className="flex items-center gap-2 text-primary shrink-0 pl-2">
          <span className="font-label-caps text-label-caps uppercase">
            Kabupaten Karo • TA 2025/2026
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="h-[64px] px-space-lg flex items-center justify-between gap-space-md">
        {/* Search Input Trigger */}
        <div className="flex items-center gap-space-md flex-1 max-w-xl">
          <div className="relative w-full cursor-pointer" onClick={onOpenSearch}>
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
              search
            </span>
            <input
              readOnly
              className="w-full h-10 pl-10 pr-12 rounded-lg bg-surface-container-low/80 border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
              placeholder="Cari ruas jalan, sentra komoditas, kecamatan, koridor... (Ctrl + K)"
              type="text"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/30 text-[10px] font-tech-code-sm text-outline">
              Ctrl K
            </span>
          </div>
        </div>

        {/* Right Tools & Status Indicators */}
        <div className="flex items-center gap-space-sm">
          {/* Real-time Connection Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-tech-code-sm text-tech-code-sm text-secondary font-semibold">
              Data Terhubung (Sinkron: 24 ms)
            </span>
          </div>

          {/* Locked Weights Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high border border-outline-variant/40">
            <span className="material-symbols-outlined text-sm text-tertiary">lock</span>
            <span className="font-tech-code-sm text-[11px] text-on-surface-variant">
              Bobot Terkunci Sesuai SK
            </span>
          </div>

          {/* Portal Publik Link */}
          <button
            onClick={() => onSelectScreen('portal-transparansi-publik')}
            className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm border border-outline-variant/30 transition-all cursor-pointer"
          >
            Portal Publik
          </button>

          {/* Audit Log Link */}
          <button
            onClick={() => onSelectScreen('log-audit')}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm border border-outline-variant/30 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">history_edu</span>
            <span>Log ({logCount})</span>
          </button>

          {/* Voice Assistant Audio Guide */}
          <button
            onClick={speakCurrentScreen}
            className={`p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/30 transition-all cursor-pointer ${
              speaking ? 'text-primary ring-1 ring-primary animate-pulse' : 'text-on-surface-variant hover:text-on-surface'
            }`}
            title="Panduan Suara Asisten"
          >
            <span className="material-symbols-outlined text-lg leading-none">
              {speaking ? 'volume_up' : 'volume_mute'}
            </span>
          </button>

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-outline-variant/30 transition-all cursor-pointer"
              title="Pemberitahuan Sistem"
            >
              <span className="material-symbols-outlined text-lg leading-none">
                notifications
              </span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
            </button>

            {/* Notification Popover Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 rounded-xl bg-surface-container-low/95 backdrop-blur-2xl border border-outline-variant/30 shadow-2xl p-3 z-50 flex flex-col gap-2">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                  <span className="font-label-caps text-label-caps uppercase text-primary font-bold">
                    Pemberitahuan Sistem
                  </span>
                  <span className="font-tech-code-sm text-[10px] text-secondary">
                    3 Baru
                  </span>
                </div>
                <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high transition-colors flex flex-col gap-1 cursor-pointer"
                      onClick={() => {
                        setShowNotifications(false);
                        onSelectScreen('penilaian-risiko-akses');
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-tech-code-sm text-xs font-bold text-on-surface">
                          {n.title}
                        </span>
                        <span className="text-[10px] font-tech-code-sm text-on-surface-variant">
                          {n.time}
                        </span>
                      </div>
                      <p className="font-body-sm text-[11px] text-on-surface-variant leading-snug">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onSelectScreen('log-audit');
                  }}
                  className="w-full py-1.5 text-center text-xs text-primary font-tech-code-sm hover:underline pt-1 border-t border-outline-variant/20 cursor-pointer"
                >
                  Buka Log Lengkap ➔
                </button>
              </div>
            )}
          </div>

          {/* User profile picture */}
          <div className="flex items-center gap-2 pl-space-xs border-l border-outline-variant/30">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/40"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8MFdGW4w1xAxRI7Nkr9XTt5NMpxg6Wml81RASl4-UL9QnTtK4AZmRzb2NJSGoWsEP1miQEsTJi_h7Gu6a4OWTv3AY38NzOoKXMjbvAztjdl4lNP3-CPqmEPjBJDfIzov6R11P5L615YezohMSo00MhNi-Gqjsy4vttUxifHB5GMwMxJ70verC0AmfwKhx0Kzk-jYq7R3ME-WmRSVNd6j4h2F7IcwU1cOlhCZjm7dSHQT8FhKgi6ZD_A"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
