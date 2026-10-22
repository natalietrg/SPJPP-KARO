import React, { useState, useEffect } from 'react';
import {
  INITIAL_ROADS,
  INITIAL_AUDIT_LOGS,
  CORRIDORS_DATA,
  RoadSegment,
  AuditLogItem,
  UserRole,
} from './data/mockData';
import { Sidebar, ScreenId } from './components/Sidebar';
import { Header } from './components/Header';
import { SearchModal } from './components/modals/SearchModal';
import { RoadDetailDrawer } from './components/modals/RoadDetailDrawer';
import { RulesAndEngineModal } from './components/modals/RulesAndEngineModal';
import { UploadCsvModal } from './components/modals/UploadCsvModal';
import { RequestOpdDataModal } from './components/modals/RequestOpdDataModal';

// Screens
import { Screen01TabelInduk } from './components/screens/Screen01TabelInduk';
import { Screen02PetaKoridor } from './components/screens/Screen02PetaKoridor';
import { Screen03IndeksPrioritas } from './components/screens/Screen03IndeksPrioritas';
import { Screen03bRisikoAkses } from './components/screens/Screen03bRisikoAkses';
import { Screen05SkTim } from './components/screens/Screen05SkTim';
import { Screen06RkpdAnggaran } from './components/screens/Screen06RkpdAnggaran';
import { Screen07PilotDampak } from './components/screens/Screen07PilotDampak';
import { Screen90Hari } from './components/screens/Screen90Hari';
import { ScreenKpiHeatmap } from './components/screens/ScreenKpiHeatmap';
import { ScreenLogAudit } from './components/screens/ScreenLogAudit';
import { ScreenPortalPublik } from './components/screens/ScreenPortalPublik';

const SCREEN_TITLES: Record<ScreenId, string> = {
  'tabel-induk-ruas': '01. Tabel Induk Ruas (D.1)',
  'peta-koridor-pertanian': '02. Peta Koridor (D.2)',
  'indeks-prioritas-6-kriteria': '03. Indeks Prioritas 6 Kriteria (M.1)',
  'penilaian-risiko-akses': '03b. Penilaian Risiko Akses (M.2)',
  'uji-sensitivitas-bobot': '04. Uji Sensitivitas Bobot (M.3)',
  'sk-tim-publikasi': '05. SK Tim & Publikasi (K.1, K.2)',
  'integrasi-rkpd-anggaran': '06. Integrasi RKPD & Usulan (P.1, P.2)',
  'pilot-sebelum-sesudah': '07. Pilot Sebelum-Sesudah (P.3)',
  'panel-keputusan-90-hari': 'Panel Keputusan 90 Hari',
  'dasbor-kpi-risiko': 'Dasbor KPI & Risiko 5x5',
  'log-audit': 'Log Audit & Integritas',
  'portal-transparansi-publik': 'Portal Transparansi Publik',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('tabel-induk-ruas');
  const [activeRole, setActiveRole] = useState<UserRole>('DPUTR');
  const [roads, setRoads] = useState<RoadSegment[]>(INITIAL_ROADS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>('koridor-01');

  // Modals & Drawers
  const [selectedRoadForDrawer, setSelectedRoadForDrawer] = useState<RoadSegment | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [rulesMode, setRulesMode] = useState<'rules' | 'roadmap'>('rules');
  const [isUploadCsvOpen, setIsUploadCsvOpen] = useState<boolean>(false);
  const [isRequestOpdOpen, setIsRequestOpdOpen] = useState<boolean>(false);
  const [, setOpdTargetRoad] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global Keyboard listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectRoad = (road: RoadSegment) => {
    setSelectedRoadForDrawer(road);
  };

  const handleOpenOpdRequest = (roadName?: string) => {
    setOpdTargetRoad(roadName || '');
    setIsRequestOpdOpen(true);
  };

  const handleOpdSubmitted = (targetOpd: string, parameter: string, roadCode: string) => {
    const newLog: AuditLogItem = {
      id: `LOG-2026-00${auditLogs.length + 1}`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB',
      actor: activeRole === 'DPUTR' ? 'Ir. Hendra Tarigan' : activeRole === 'Bappeda' ? 'Drs. Terang Ginting' : 'Masyarakat Tani',
      role: `${activeRole} Karo`,
      action: 'PERMOHONAN_DATA_OPD',
      category: 'Verifikasi',
      hash: `SHA256: ${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      details: `Permohonan verifikasi lapangan diajukan ke ${targetOpd} untuk ${roadCode}: ${parameter}.`,
    };
    setAuditLogs([newLog, ...auditLogs]);
    showToast(`Permohonan verifikasi lapangan berhasil dikirim ke ${targetOpd}`);
  };

  const handleRoadsImported = (newRoads: RoadSegment[]) => {
    setRoads((prev) => [...newRoads, ...prev]);
    const newLog: AuditLogItem = {
      id: `LOG-2026-00${auditLogs.length + 1}`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB',
      actor: 'Ir. Hendra Tarigan',
      role: 'Kabid Bina Marga DPUTR',
      action: 'IMPOR_CSV_RUAS',
      category: 'Data Primer',
      hash: `SHA256: ${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      details: `Berhasil mengimpor ${newRoads.length} ruas jalan baru ke basis data inventarisasi daerah SPJPP-Karo.`,
    };
    setAuditLogs([newLog, ...auditLogs]);
    showToast(`${newRoads.length} ruas jalan berhasil ditambahkan ke basis data`);
  };

  const handleExportLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `SPJPP_Karo_Audit_Log_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Log audit berhasil diunduh dalam format JSON');
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased selection:bg-primary selection:text-on-primary min-h-screen">
      {/* SIDEBAR COMPONENT */}
      <Sidebar
        activeScreen={currentScreen}
        onSelectScreen={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeRole={activeRole}
        onSelectRole={(role) => {
          setActiveRole(role);
          if (role === 'Publik') {
            setCurrentScreen('portal-transparansi-publik');
          }
          showToast(`Mode peran dialihkan ke: ${role}`);
        }}
        logCount={auditLogs.length}
      />

      {/* MAIN CONTENT AREA */}
      <div className="pl-[280px]">
        {/* HEADER COMPONENT */}
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onSelectScreen={setCurrentScreen}
          activeScreenTitle={SCREEN_TITLES[currentScreen] || ''}
          activeRole={activeRole}
          logCount={auditLogs.length}
        />

        {/* VIEWPORT CANVAS */}
        <main className="relative pt-[96px] min-h-screen bg-surface px-space-lg py-space-lg">
          {/* Subtle Ambient Geomatic Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.08),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(78,222,163,0.05),transparent_50%)] pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-[1440px] mx-auto pb-16">
            {/* SCREEN 01: TABEL INDUK RUAS (D.1) */}
            {currentScreen === 'tabel-induk-ruas' && (
              <Screen01TabelInduk
                roads={roads}
                onSelectRoad={handleSelectRoad}
                onOpenRules={(mode) => {
                  setRulesMode(mode);
                  setIsRulesOpen(true);
                }}
                onOpenUploadCsv={() => setIsUploadCsvOpen(true)}
                onOpenRequestOpd={() => handleOpenOpdRequest()}
                onNavigateScreen={setCurrentScreen}
              />
            )}

            {/* SCREEN 02: PETA KORIDOR PERTANIAN (D.2) */}
            {currentScreen === 'peta-koridor-pertanian' && (
              <Screen02PetaKoridor
                corridors={CORRIDORS_DATA}
                selectedCorridorId={selectedCorridorId}
                onSelectCorridorId={setSelectedCorridorId}
                onNavigateScreen={setCurrentScreen}
              />
            )}

            {/* SCREEN 03: INDEKS PRIORITAS 6 KRITERIA (M.1) */}
            {currentScreen === 'indeks-prioritas-6-kriteria' && (
              <Screen03IndeksPrioritas
                roads={roads}
                onSelectRoad={handleSelectRoad}
                onNavigate={(path) => setCurrentScreen(path as ScreenId)}
                onOpenRules={() => {
                  setRulesMode('rules');
                  setIsRulesOpen(true);
                }}
              />
            )}

            {/* SCREEN 03b: PENILAIAN RISIKO AKSES (M.2) */}
            {currentScreen === 'penilaian-risiko-akses' && (
              <Screen03bRisikoAkses
                roads={roads}
                initialTab="m2"
                onSelectRoad={handleSelectRoad}
                onNavigate={(path) => setCurrentScreen(path as ScreenId)}
                onRequestOpd={handleOpenOpdRequest}
              />
            )}

            {/* SCREEN 04: UJI SENSITIVITAS BOBOT (M.3) */}
            {currentScreen === 'uji-sensitivitas-bobot' && (
              <Screen03bRisikoAkses
                roads={roads}
                initialTab="m3"
                onSelectRoad={handleSelectRoad}
                onNavigate={(path) => setCurrentScreen(path as ScreenId)}
                onRequestOpd={handleOpenOpdRequest}
              />
            )}

            {/* SCREEN 05: SK TIM & PUBLIKASI (K.1, K.2) */}
            {currentScreen === 'sk-tim-publikasi' && (
              <Screen05SkTim
                onNavigate={(path) => setCurrentScreen(path as ScreenId)}
                onRequestPleno={() => {
                  showToast('Jadwal Sidang Pleno disepakati pada 28 Oktober 2026 di Ruang Rapat Bappeda');
                }}
              />
            )}

            {/* SCREEN 06: INTEGRASI RKPD & ANGGARAN (P.1, P.2) */}
            {currentScreen === 'integrasi-rkpd-anggaran' && (
              <Screen06RkpdAnggaran
                roads={roads}
                onSelectRoad={handleSelectRoad}
                onNavigate={(path) => setCurrentScreen(path as ScreenId)}
              />
            )}

            {/* SCREEN 07: PILOT SEBELUM-SESUDAH (P.3) */}
            {currentScreen === 'pilot-sebelum-sesudah' && <Screen07PilotDampak />}

            {/* EXECUTIVE SCREENS */}
            {currentScreen === 'panel-keputusan-90-hari' && (
              <Screen90Hari onNavigate={(path) => setCurrentScreen(path as ScreenId)} />
            )}

            {currentScreen === 'dasbor-kpi-risiko' && (
              <ScreenKpiHeatmap roads={roads} onSelectRoad={handleSelectRoad} />
            )}

            {currentScreen === 'log-audit' && (
              <ScreenLogAudit logs={auditLogs} onExportLogs={handleExportLogs} />
            )}

            {currentScreen === 'portal-transparansi-publik' && (
              <ScreenPortalPublik
                roads={roads}
                onSelectRoad={handleSelectRoad}
                onOpenRules={() => {
                  setRulesMode('rules');
                  setIsRulesOpen(true);
                }}
              />
            )}
          </div>
        </main>
      </div>

      {/* TOAST POPUP NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-surface-container-high/95 text-on-surface border border-primary/50 shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-fade-in font-body-sm text-sm">
          <span className="material-symbols-outlined text-primary text-xl">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODALS */}
      {/* 1. Global Search Modal (Ctrl + K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        roads={roads}
        corridors={CORRIDORS_DATA}
        onSelectRoad={handleSelectRoad}
        onSelectScreen={setCurrentScreen}
      />

      {/* 2. Road Detail Inspection Drawer */}
      <RoadDetailDrawer
        road={selectedRoadForDrawer}
        onClose={() => setSelectedRoadForDrawer(null)}
        onGoToGis={() => setCurrentScreen('peta-koridor-pertanian')}
        onGoToCriteria={() => setCurrentScreen('indeks-prioritas-6-kriteria')}
      />

      {/* 3. Rules & Engine / Methodology Modal */}
      <RulesAndEngineModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
        mode={rulesMode}
      />

      {/* 4. CSV Import Modal */}
      <UploadCsvModal
        isOpen={isUploadCsvOpen}
        onClose={() => setIsUploadCsvOpen(false)}
        onImportRoads={handleRoadsImported}
      />

      {/* 5. Request OPD Ground Check Form Modal */}
      <RequestOpdDataModal
        isOpen={isRequestOpdOpen}
        onClose={() => setIsRequestOpdOpen(false)}
        onSubmitRequest={handleOpdSubmitted}
      />
    </div>
  );
}
