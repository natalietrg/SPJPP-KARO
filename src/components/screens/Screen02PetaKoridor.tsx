import React, { useState } from 'react';
import { Corridor } from '../../data/mockData';
import { ScreenId } from '../Sidebar';

interface Screen02PetaKoridorProps {
  corridors: Corridor[];
  selectedCorridorId: string;
  onSelectCorridorId: (id: string) => void;
  onNavigateScreen: (screen: ScreenId) => void;
}

export const Screen02PetaKoridor: React.FC<Screen02PetaKoridorProps> = ({
  corridors,
  selectedCorridorId,
  onSelectCorridorId,
  onNavigateScreen,
}) => {
  // Layer toggles
  const [showRoadQuality, setShowRoadQuality] = useState(true);
  const [showHazardLayer, setShowHazardLayer] = useState(true);
  const [showSentraLayer, setShowSentraLayer] = useState(true);
  const [showPoktanLayer, setShowPoktanLayer] = useState(true);

  // Map zoom and position simulation
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [compassAngle, setCompassAngle] = useState(0);

  // Active corridor data
  const activeCorridor =
    corridors.find((c) => c.id === selectedCorridorId) || corridors[0];

  const handleExportGeoJson = () => {
    const geojson = {
      type: 'FeatureCollection',
      name: 'SPJPP_Karo_Koridor_Agribisnis',
      crs: {
        type: 'name',
        properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
      },
      features: corridors.map((c) => ({
        type: 'Feature',
        properties: {
          id: c.id,
          name: c.name,
          lengthKm: c.lengthKm,
          priorityScore: c.priorityScore,
          priorityClass: c.priorityClass,
          productionKw: c.hortiProductionKw,
          beneficiaries: c.beneficiariesCount,
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [98.441, 3.1705],
            [98.4812, 3.162],
            [98.5081, 3.1842],
            [98.5204, 3.195],
          ],
        },
      })),
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], {
      type: 'application/geo+json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Koridor_Pertanian_Karo_EPSG4326_${activeCorridor.id}.geojson`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col w-full gap-space-md text-on-surface">
      {/* SUBHEADER / CONTEXT STRIP */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm bg-surface-container-low/90 backdrop-blur-xl p-space-md rounded-xl shadow-lg">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-space-xs mb-1 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary font-tech-code-sm text-tech-code-sm font-bold uppercase tracking-wider">
              Pilar Data D.2
            </span>
            <span className="text-on-surface-variant font-tech-code-sm text-tech-code-sm">
              /
            </span>
            <span className="font-tech-code-sm text-tech-code-sm text-on-surface uppercase font-semibold">
              Modul 02 - Peta Koridor Pertanian (Sentra ke Pasar)
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-tech-code-sm text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
              Geospasial Aktif
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-1">
            Pemetaan spasial keterhubungan sentra produksi hortikultura dataran
            tinggi Karo menuju Pasar Induk Lau Cih Medan &amp; Pasar Roga
            Berastagi.
          </p>
        </div>

        {/* Quick Action Toolset */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high rounded-lg text-on-surface-variant font-tech-code-sm text-tech-code-sm">
            <span className="material-symbols-outlined text-sm text-primary">
              satellite_alt
            </span>
            <span>EPSG:4326 (WGS84)</span>
          </div>
          <button
            onClick={() => {
              setShowHazardLayer(!showHazardLayer);
              setShowRoadQuality(!showRoadQuality);
            }}
            className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-body-sm font-body-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-base">layers</span>
            <span>Filter Spasial</span>
          </button>
          <button
            onClick={handleExportGeoJson}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-container to-surface-tint text-on-primary font-headline-md text-tech-code-sm font-bold shadow-[0_0_18px_rgba(6,182,212,0.35)] hover:shadow-[0_0_24px_rgba(6,182,212,0.55)] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">
              download_for_offline
            </span>
            <span>Ekspor GeoJSON</span>
          </button>
        </div>
      </div>

      {/* MAIN 2-PANEL LAYOUT (Bento 8 Cols GIS + 4 Cols Deep Inspection) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        {/* LEFT / CENTER: GIS MISSION CONTROL CANVAS (8 COLUMNS) */}
        <div className="lg:col-span-8 flex flex-col gap-space-sm relative">
          {/* Map Viewport Container */}
          <div className="relative w-full h-[620px] rounded-xl overflow-hidden bg-surface-container-lowest shadow-2xl flex flex-col justify-between p-space-md select-none group border border-outline-variant/30">
            {/* Live GIS Geospatial Vector Background Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <svg
                className="w-full h-full object-cover opacity-90 transition-transform duration-500"
                style={{ transform: `scale(${zoomLevel})` }}
                fill="none"
                viewBox="0 0 1000 700"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    height="40"
                    id="gisGrid"
                    patternUnits="userSpaceOnUse"
                    width="40"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="rgba(76, 215, 246, 0.05)"
                      strokeWidth="0.8"
                    ></path>
                    <circle cx="0" cy="0" fill="rgba(76, 215, 246, 0.2)" r="0.8"></circle>
                  </pattern>

                  {/* Glowing Filters */}
                  <filter height="140%" id="glowRed" width="140%" x="-20%" y="-20%">
                    <feGaussianBlur result="blur" stdDeviation="4"></feGaussianBlur>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
                  </filter>
                  <filter height="140%" id="glowAmber" width="140%" x="-20%" y="-20%">
                    <feGaussianBlur result="blur" stdDeviation="3.5"></feGaussianBlur>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
                  </filter>
                  <filter height="140%" id="glowGreen" width="140%" x="-20%" y="-20%">
                    <feGaussianBlur result="blur" stdDeviation="2.5"></feGaussianBlur>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
                  </filter>
                  <radialGradient cx="50%" cy="50%" id="sinabungGradient" r="50%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.22"></stop>
                    <stop offset="40%" stopColor="#ffb95f" stopOpacity="0.08"></stop>
                    <stop offset="100%" stopColor="#0c1225" stopOpacity="0"></stop>
                  </radialGradient>
                  <radialGradient cx="50%" cy="50%" id="sibayakGradient" r="50%">
                    <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.18"></stop>
                    <stop offset="60%" stopColor="#0c1225" stopOpacity="0"></stop>
                  </radialGradient>
                </defs>

                {/* Base Grid Canvas */}
                <rect fill="#070d20" height="700" width="1000"></rect>
                <rect fill="url(#gisGrid)" height="700" width="1000"></rect>

                {/* Topography: Sinabung Massif */}
                {showHazardLayer && (
                  <g>
                    <ellipse
                      cx="280"
                      cy="390"
                      fill="url(#sinabungGradient)"
                      rx="190"
                      ry="140"
                    ></ellipse>
                    <path
                      d="M 280 280 C 340 280 390 320 390 380 C 390 440 330 480 270 480 C 200 480 170 430 170 380 C 170 330 220 280 280 280 Z"
                      opacity="0.6"
                      stroke="#3d494c"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M 280 310 C 320 310 360 340 360 380 C 360 420 315 450 275 450 C 225 450 205 415 205 380 C 205 345 240 310 280 310 Z"
                      opacity="0.4"
                      stroke="#f43f5e"
                      strokeWidth="0.8"
                    ></path>
                    <circle cx="280" cy="380" fill="#f43f5e" opacity="0.35" r="8"></circle>
                    <circle cx="280" cy="380" fill="#ffb4ab" r="3"></circle>
                    <text
                      fill="#ffdad6"
                      fontFamily="JetBrains Mono"
                      fontSize="10"
                      letterSpacing="1"
                      x="294"
                      y="384"
                    >
                      GUNUNG SINABUNG (2.460 m)
                    </text>
                    <text fill="#f43f5e" fontFamily="Inter" fontSize="8.5" x="294" y="396">
                      Zona Rawan Bencana Vulkanik &amp; Longsor
                    </text>
                  </g>
                )}

                {/* Topography: Sibayak Massif */}
                <ellipse
                  cx="680"
                  cy="180"
                  fill="url(#sibayakGradient)"
                  rx="140"
                  ry="110"
                ></ellipse>
                <path
                  d="M 680 100 C 740 100 780 135 780 180 C 780 225 730 260 670 260 C 610 260 580 225 580 180 C 580 135 620 100 680 100 Z"
                  opacity="0.5"
                  stroke="#3d494c"
                  strokeDasharray="2 3"
                  strokeWidth="0.8"
                ></path>
                <circle cx="680" cy="180" fill="#4cd7f6" r="3"></circle>
                <text
                  fill="#acedff"
                  fontFamily="JetBrains Mono"
                  fontSize="10"
                  letterSpacing="1"
                  x="695"
                  y="184"
                >
                  GUNUNG SIBAYAK (2.212 m)
                </text>

                {/* Lake Toba Rim */}
                <path
                  d="M 850 620 C 810 590 870 520 940 500 C 970 490 990 495 1000 500 L 1000 700 L 820 700 Z"
                  fill="#0c1225"
                  opacity="0.8"
                  stroke="#00424f"
                  strokeWidth="1.5"
                ></path>
                <text
                  fill="#06b6d4"
                  fontFamily="JetBrains Mono"
                  fontSize="9"
                  letterSpacing="1"
                  x="890"
                  y="580"
                >
                  KORIDOR DANAU TOBA
                </text>

                {/* Arterial Road to Medan */}
                <path
                  d="M 590 220 Q 640 120 730 20"
                  opacity="0.4"
                  stroke="#869397"
                  strokeLinecap="round"
                  strokeWidth="4"
                ></path>
                <path
                  d="M 590 220 Q 640 120 730 20"
                  opacity="0.75"
                  stroke="#dce1fc"
                  strokeDasharray="8 6"
                  strokeWidth="1.5"
                ></path>
                <text
                  fill="#dce1fc"
                  fontFamily="JetBrains Mono"
                  fontSize="10"
                  fontWeight="600"
                  transform="rotate(-36, 690, 50)"
                  x="690"
                  y="50"
                >
                  JALUR NASIONAL MEDAN - LAU CIH ↗
                </text>

                {/* CORRIDOR 01 */}
                <g
                  className="cursor-pointer transition-all hover:opacity-100"
                  opacity={selectedCorridorId === 'koridor-01' ? 1 : 0.55}
                  onClick={() => onSelectCorridorId('koridor-01')}
                >
                  <path
                    d="M 330 380 Q 420 330 480 310 T 590 220"
                    filter="url(#glowRed)"
                    opacity="0.22"
                    stroke="#f43f5e"
                    strokeLinecap="round"
                    strokeWidth="12"
                  ></path>
                  <path
                    d="M 330 380 Q 420 330 480 310 T 590 220"
                    filter="url(#glowRed)"
                    stroke="#f43f5e"
                    strokeLinecap="round"
                    strokeWidth="5"
                  ></path>
                  <path
                    d="M 330 380 Q 420 330 480 310 T 590 220"
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeWidth="2"
                  ></path>
                  <circle cx="440" cy="325" fill="#f43f5e" r="4.5">
                    <animate
                      attributeName="opacity"
                      dur="1.8s"
                      repeatCount="indefinite"
                      values="1;0.2;1"
                    ></animate>
                  </circle>
                </g>

                {/* CORRIDOR 02 */}
                <g
                  className="cursor-pointer transition-all"
                  opacity={selectedCorridorId === 'koridor-02' ? 1 : 0.55}
                  onClick={() => onSelectCorridorId('koridor-02')}
                >
                  <path
                    d="M 520 420 Q 610 390 690 370"
                    filter="url(#glowAmber)"
                    opacity="0.2"
                    stroke="#f59e0b"
                    strokeLinecap="round"
                    strokeWidth="8"
                  ></path>
                  <path
                    d="M 520 420 Q 610 390 690 370"
                    filter="url(#glowAmber)"
                    stroke="#f59e0b"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  ></path>
                  <path
                    d="M 520 420 Q 610 390 690 370"
                    stroke="#fffbeb"
                    strokeDasharray="6 4"
                    strokeWidth="1.2"
                  ></path>
                </g>

                {/* CORRIDOR 03 */}
                <g
                  className="cursor-pointer transition-all"
                  opacity={selectedCorridorId === 'koridor-03' ? 1 : 0.55}
                  onClick={() => onSelectCorridorId('koridor-03')}
                >
                  <path
                    d="M 380 570 Q 450 510 520 420"
                    filter="url(#glowAmber)"
                    opacity="0.85"
                    stroke="#f59e0b"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  ></path>
                </g>

                {/* CORRIDOR 04 */}
                <g
                  className="cursor-pointer transition-all"
                  opacity={selectedCorridorId === 'koridor-04' ? 1 : 0.55}
                  onClick={() => onSelectCorridorId('koridor-04')}
                >
                  <path
                    d="M 690 370 Q 770 460 840 520"
                    filter="url(#glowGreen)"
                    opacity="0.85"
                    stroke="#10b981"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  ></path>
                </g>

                {/* CORRIDOR 05 */}
                <g
                  className="cursor-pointer transition-all"
                  opacity={selectedCorridorId === 'koridor-05' ? 1 : 0.55}
                  onClick={() => onSelectCorridorId('koridor-05')}
                >
                  <path
                    d="M 590 220 Q 670 260 740 280"
                    filter="url(#glowRed)"
                    opacity="0.9"
                    stroke="#f43f5e"
                    strokeLinecap="round"
                    strokeWidth="4"
                  ></path>
                </g>

                {/* Feeder roads */}
                <path
                  d="M 330 380 L 260 360 M 330 380 L 310 440 M 480 310 L 460 250 M 520 420 L 510 490"
                  opacity="0.7"
                  stroke="#3d494c"
                  strokeDasharray="2 3"
                  strokeWidth="1.2"
                ></path>

                {/* SPATIAL NODES */}
                {/* Simpang Empat */}
                {showSentraLayer && (
                  <g
                    transform="translate(330, 380)"
                    className="cursor-pointer"
                    onClick={() => onSelectCorridorId('koridor-01')}
                  >
                    <circle fill="#f43f5e" opacity="0.2" r="14"></circle>
                    <circle
                      fill="#070d20"
                      r="6"
                      stroke="#f43f5e"
                      strokeWidth="2.5"
                    ></circle>
                    <circle fill="#f43f5e" r="2.5"></circle>
                    <text
                      fill="#ffffff"
                      fontFamily="Plus Jakarta Sans"
                      fontSize="11"
                      fontWeight="700"
                      x="12"
                      y="-8"
                    >
                      Simpang Empat
                    </text>
                    <text
                      fill="#bcc9cd"
                      fontFamily="JetBrains Mono"
                      fontSize="9"
                      x="12"
                      y="4"
                    >
                      Sentra Hortikultura Sinabung
                    </text>
                  </g>
                )}

                {/* Berastagi Pasar Roga */}
                <g
                  transform="translate(590, 220)"
                  className="cursor-pointer"
                  onClick={() => onSelectCorridorId('koridor-01')}
                >
                  <circle fill="#4cd7f6" opacity="0.18" r="20"></circle>
                  <circle
                    fill="#070d20"
                    r="9"
                    stroke="#4cd7f6"
                    strokeWidth="3"
                  ></circle>
                  <circle fill="#4cd7f6" r="4"></circle>
                  <polygon
                    fill="#ffb95f"
                    points="0,-16 4,-9 11,-9 6,-4 8,3 0,-1 -8,3 -6,-4 -11,-9 -4,-9"
                    transform="scale(0.6) translate(0, -32)"
                  ></polygon>
                  <text
                    fill="#4cd7f6"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="12"
                    fontWeight="800"
                    x="14"
                    y="-7"
                  >
                    BERASTAGI
                  </text>
                  <text
                    fill="#f59e0b"
                    fontFamily="JetBrains Mono"
                    fontSize="9.5"
                    fontWeight="600"
                    x="14"
                    y="6"
                  >
                    Pasar Buah &amp; Sayur Roga
                  </text>
                </g>

                {/* Kabanjahe */}
                <g
                  transform="translate(520, 420)"
                  className="cursor-pointer"
                  onClick={() => onSelectCorridorId('koridor-02')}
                >
                  <circle fill="#acedff" opacity="0.15" r="16"></circle>
                  <circle
                    fill="#070d20"
                    r="8"
                    stroke="#acedff"
                    strokeWidth="2.5"
                  ></circle>
                  <circle fill="#acedff" r="3.5"></circle>
                  <text
                    fill="#dce1fc"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="11.5"
                    fontWeight="700"
                    x="12"
                    y="-6"
                  >
                    KABANJAHE
                  </text>
                  <text
                    fill="#bcc9cd"
                    fontFamily="JetBrains Mono"
                    fontSize="9"
                    x="12"
                    y="6"
                  >
                    Pusat Distribusi Selatan
                  </text>
                </g>

                {/* Tigapanah */}
                <g
                  transform="translate(690, 370)"
                  className="cursor-pointer"
                  onClick={() => onSelectCorridorId('koridor-02')}
                >
                  <circle
                    fill="#070d20"
                    r="6"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  ></circle>
                  <circle fill="#f59e0b" r="2.5"></circle>
                  <text
                    fill="#ffddb8"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="10.5"
                    fontWeight="600"
                    x="10"
                    y="-4"
                  >
                    Tigapanah
                  </text>
                  <text
                    fill="#869397"
                    fontFamily="JetBrains Mono"
                    fontSize="8.5"
                    x="10"
                    y="7"
                  >
                    Sub-Terminal Jagung &amp; Jeruk
                  </text>
                </g>

                {/* Barusjahe */}
                <g
                  transform="translate(740, 280)"
                  className="cursor-pointer"
                  onClick={() => onSelectCorridorId('koridor-05')}
                >
                  <circle
                    fill="#070d20"
                    r="5.5"
                    stroke="#4edea3"
                    strokeWidth="2"
                  ></circle>
                  <circle fill="#4edea3" r="2"></circle>
                  <text
                    fill="#dce1fc"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="10"
                    fontWeight="600"
                    x="10"
                    y="2"
                  >
                    Barusjahe
                  </text>
                </g>

                {/* Munte */}
                <g
                  transform="translate(380, 570)"
                  className="cursor-pointer"
                  onClick={() => onSelectCorridorId('koridor-03')}
                >
                  <circle
                    fill="#070d20"
                    r="5"
                    stroke="#869397"
                    strokeWidth="2"
                  ></circle>
                  <circle fill="#869397" r="2"></circle>
                  <text
                    fill="#bcc9cd"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="9.5"
                    x="10"
                    y="3"
                  >
                    Munte
                  </text>
                </g>

                {/* Merek / Tongging */}
                <g
                  transform="translate(840, 520)"
                  className="cursor-pointer"
                  onClick={() => onSelectCorridorId('koridor-04')}
                >
                  <circle
                    fill="#070d20"
                    r="5.5"
                    stroke="#10b981"
                    strokeWidth="2"
                  ></circle>
                  <circle fill="#10b981" r="2"></circle>
                  <text
                    fill="#dce1fc"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="10"
                    x="10"
                    y="3"
                  >
                    Merek - Tongging
                  </text>
                </g>

                {/* Active Corridor Floating Indicator */}
                <g transform="translate(435, 275)">
                  <rect
                    fill="#151b2e"
                    filter="url(#glowRed)"
                    height="24"
                    rx="6"
                    stroke="#f43f5e"
                    strokeWidth="1.2"
                    width="140"
                    x="-10"
                    y="-12"
                  ></rect>
                  <text
                    fill="#ffb4ab"
                    fontFamily="JetBrains Mono"
                    fontSize="8.5"
                    fontWeight="700"
                    x="6"
                    y="3.5"
                  >
                    {activeCorridor.name.split(':')[0].toUpperCase()} ({activeCorridor.lengthKm} KM)
                  </text>
                  <circle cx="-1" cy="0" fill="#f43f5e" r="3"></circle>
                </g>
              </svg>
            </div>

            {/* TOP BAR: COORDINATES, SCALE, COMPASS & STATUS HUD */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-2 bg-surface-container-lowest/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-tech-code-sm text-tech-code-sm text-primary font-bold">
                  3.1834° N, 98.5089° E
                </span>
                <span className="text-outline text-xs">|</span>
                <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">
                  Datum WGS84
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-[10px] font-tech-code-sm text-on-surface">
                  Skala 1:50.000
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-[10px] font-tech-code-sm text-secondary font-bold">
                  Zoom: {zoomLevel.toFixed(1)}x
                </span>
              </div>

              {/* Compass & Zoom Map Controls */}
              <div className="flex items-center gap-1.5 bg-surface-container-lowest/85 backdrop-blur-md p-1 rounded-lg border border-white/5">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
                  className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer"
                  title="Perbesar Peta"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.15))}
                  className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer"
                  title="Perkecil Peta"
                >
                  <span className="material-symbols-outlined text-lg">remove</span>
                </button>
                <button
                  onClick={() => {
                    setZoomLevel(1.0);
                    setCompassAngle(0);
                  }}
                  className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-high hover:text-primary transition-colors cursor-pointer"
                  title="Reset Pandangan Awal"
                >
                  <span className="material-symbols-outlined text-lg">crop_free</span>
                </button>
                <div className="w-px h-5 bg-outline-variant/40 mx-0.5"></div>
                {/* Compass Rose */}
                <div
                  onClick={() => setCompassAngle((a) => (a + 90) % 360)}
                  className="w-8 h-8 rounded flex flex-col items-center justify-center bg-surface-container-low text-primary relative cursor-pointer"
                  title="Arah Utara Geografis"
                >
                  <span className="font-tech-code-sm text-[9px] font-bold leading-none">
                    N
                  </span>
                  <span
                    className="material-symbols-outlined text-sm leading-none -mt-0.5 text-error transition-transform"
                    style={{ transform: `rotate(${compassAngle}deg)` }}
                  >
                    navigation
                  </span>
                </div>
              </div>
            </div>

            {/* MID-LEFT: INTERACTIVE OVERLAY TOGGLES */}
            <div className="relative z-20 self-start max-w-xs flex flex-col gap-1.5 bg-surface-container-lowest/90 backdrop-blur-xl p-3 rounded-xl border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-outline">
                  Layer Geospasial DPUTR
                </span>
                <span className="font-tech-code-sm text-[10px] text-primary">
                  {[showRoadQuality, showHazardLayer, showSentraLayer, showPoktanLayer].filter(Boolean).length}/4 Aktif
                </span>
              </div>

              {/* Toggle 1: Kemantapan */}
              <label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-high cursor-pointer transition-colors group/item">
                <div className="flex items-center gap-2">
                  <input
                    checked={showRoadQuality}
                    onChange={(e) => setShowRoadQuality(e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-surface border-outline-variant text-primary focus:ring-0 cursor-pointer"
                    type="checkbox"
                  />
                  <span className="font-body-sm text-xs text-on-surface group-hover/item:text-primary transition-colors">
                    Kemantapan Jalan (DPUTR)
                  </span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              </label>

              {/* Toggle 2: Rawan Bencana */}
              <label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-high cursor-pointer transition-colors group/item">
                <div className="flex items-center gap-2">
                  <input
                    checked={showHazardLayer}
                    onChange={(e) => setShowHazardLayer(e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-surface border-outline-variant text-error focus:ring-0 cursor-pointer"
                    type="checkbox"
                  />
                  <span className="font-body-sm text-xs text-on-surface group-hover/item:text-error transition-colors">
                    Rawan Bencana &amp; Longsor
                  </span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
              </label>

              {/* Toggle 3: Sentra Hortikultura */}
              <label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-high cursor-pointer transition-colors group/item">
                <div className="flex items-center gap-2">
                  <input
                    checked={showSentraLayer}
                    onChange={(e) => setShowSentraLayer(e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-surface border-outline-variant text-primary focus:ring-0 cursor-pointer"
                    type="checkbox"
                  />
                  <span className="font-body-sm text-xs text-on-surface group-hover/item:text-primary transition-colors">
                    Sentra Hortikultura (BPS)
                  </span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              </label>

              {/* Toggle 4: Kelompok Petani */}
              <label className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low/70 hover:bg-surface-container-high cursor-pointer transition-colors group/item">
                <div className="flex items-center gap-2">
                  <input
                    checked={showPoktanLayer}
                    onChange={(e) => setShowPoktanLayer(e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-surface border-outline-variant text-tertiary focus:ring-0 cursor-pointer"
                    type="checkbox"
                  />
                  <span className="font-body-sm text-xs text-on-surface group-hover/item:text-tertiary transition-colors">
                    Penerima Manfaat Kelompok
                  </span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
              </label>
            </div>

            {/* BOTTOM-RIGHT: PRIORITY ROUTE LEGEND BOX */}
            <div className="relative z-20 self-end bg-surface-container-lowest/90 backdrop-blur-xl p-3.5 rounded-xl border border-white/10 shadow-2xl w-72">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-outline">
                  Legenda Kelas Prioritas Ruas
                </span>
                <span className="material-symbols-outlined text-sm text-on-surface-variant">
                  info
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-1.5 rounded-full bg-[#f43f5e] shadow-[0_0_8px_#f43f5e]"></div>
                    <span className="font-body-sm text-xs text-on-surface font-semibold">
                      Kelas I
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-error-container/30 text-[#f43f5e] font-tech-code-sm text-[10px] font-bold">
                    Kritis / Sangat Mendesak
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]"></div>
                    <span className="font-body-sm text-xs text-on-surface">
                      Kelas II
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-tertiary-container/20 text-[#f59e0b] font-tech-code-sm text-[10px]">
                    Prioritas Sedang
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]"></div>
                    <span className="font-body-sm text-xs text-on-surface">
                      Kelas III
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-secondary-container/20 text-[#10b981] font-tech-code-sm text-[10px]">
                    Pemeliharaan Rutin
                  </span>
                </div>
                <div className="pt-2 border-t border-outline-variant/30 grid grid-cols-2 gap-2 text-[10.5px] font-tech-code-sm text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary ring-2 ring-primary/30"></span>
                    <span>Sentra Produksi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-tertiary ring-2 ring-tertiary/30"></span>
                    <span>Pasar Distribusi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM CONTROL BAR: DIRECT ROUTE CHIP SELECTOR & ACTIVE FLOATING CARD */}
          <div className="flex flex-col gap-2 bg-surface-container-low/95 p-space-md rounded-xl shadow-xl border border-outline-variant/20">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">
                  alt_route
                </span>
                <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest font-bold">
                  Arahkan Peta ke Koridor Utama
                </span>
              </div>
              <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">
                Total {corridors.length} Koridor Agribisnis Terdaftar
              </span>
            </div>

            {/* Chips Row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
              {corridors.map((c) => {
                const isActive = c.id === selectedCorridorId;
                return (
                  <button
                    key={c.id}
                    onClick={() => onSelectCorridorId(c.id)}
                    className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-lg font-tech-code-sm text-tech-code-sm transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-container to-surface-container-high text-on-surface font-bold shadow-[0_0_15px_rgba(6,182,212,0.35)] ring-1 ring-primary'
                        : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        c.priorityClass === 'Kelas I'
                          ? 'bg-error animate-ping'
                          : c.priorityClass === 'Kelas II'
                          ? 'bg-tertiary'
                          : 'bg-secondary'
                      }`}
                    ></span>
                    <span>{c.name}</span>
                    {isActive && (
                      <span className="px-1.5 py-0.2 rounded bg-error-container/80 text-white text-[10px]">
                        AKTIF
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Corridor Summary Banner */}
            <div className="mt-1 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-high/60 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-error-container/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-error text-xl">
                    crisis_alert
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-headline-md text-tech-code-lg font-bold text-on-surface">
                      {activeCorridor.subTitle}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-error-container/40 text-error font-tech-code-sm text-[10.5px] font-bold">
                      {activeCorridor.priorityClass} ({activeCorridor.urgencyLabel})
                    </span>
                  </div>
                  <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant">
                    Panjang Koridor: {activeCorridor.lengthKm} km • {activeCorridor.roadCount} Ruas Terhubung • Akses Kritis Menuju Pasar Roga &amp; Lau Cih
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onNavigateScreen('tabel-induk-ruas')}
                  className="px-3.5 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-body-sm text-body-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  <span>Lihat Ruas Terhubung</span>
                </button>
                <button
                  onClick={() => onNavigateScreen('indeks-prioritas-6-kriteria')}
                  className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-md text-tech-code-sm font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Tindak Penilaian 6 Kriteria</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: DEDICATED CORRIDOR INSPECTION & PRODUCTION BREAKDOWN (4 COLUMNS) */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          {/* MASTER INSPECTION CARD */}
          <div className="bg-surface-container-low/90 backdrop-blur-xl p-space-lg rounded-xl shadow-2xl flex flex-col gap-space-md border border-outline-variant/30">
            {/* Header & Priority Index Score */}
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
              <div>
                <span className="font-label-caps text-label-caps uppercase text-primary tracking-wider">
                  Metode M.1 • Multikriteria
                </span>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-0.5">
                  Indeks Prioritas Koridor
                </h2>
              </div>
              <span className="px-2 py-1 rounded bg-error-container/30 text-error font-tech-code-sm text-tech-code-sm font-bold">
                RANK #{activeCorridor.priorityRank.toString().padStart(2, '0')}
              </span>
            </div>

            {/* Priority Index Gauge */}
            <div className="flex flex-col gap-2 bg-surface-container-lowest/80 p-space-md rounded-xl">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-display-lg text-display-lg font-extrabold text-primary tracking-tight leading-none">
                    {activeCorridor.priorityScore.toFixed(3)}
                  </span>
                  <span className="font-tech-code-sm text-tech-code-sm text-on-surface-variant font-medium">
                    / 1.000 Skala Bobot
                  </span>
                </div>
                <span className="font-tech-code-sm text-[11px] text-secondary font-semibold">
                  {activeCorridor.urgencyLabel}
                </span>
              </div>
              {/* Composite Multi-Spectrum Gradient Bar */}
              <div className="w-full h-3 rounded-full bg-surface-container-high overflow-hidden p-0.5 flex items-center">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-[#f43f5e] transition-all duration-700"
                  style={{ width: `${activeCorridor.urgencyPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between font-tech-code-sm text-[10px] text-on-surface-variant/80">
                <span>Rendah (0.000)</span>
                <span>Ambang Penanganan DPUTR: 0.650</span>
                <span>Kritis (1.000)</span>
              </div>
            </div>

            {/* COMPREHENSIVE CORRIDOR METRICS STACK */}
            <div className="flex flex-col gap-3">
              <span className="font-label-caps text-label-caps uppercase text-outline tracking-wider">
                Matriks Bukti Lapangan &amp; Dampak Ekonomi
              </span>

              {/* Metric 1: Produksi Dilayani */}
              <div className="p-3 rounded-xl bg-surface-container-high/40 flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg">
                      local_florist
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Produksi Hortikultura Dilayani
                    </span>
                  </div>
                  <span className="font-tech-code-md text-tech-code-md text-on-surface font-bold">
                    {activeCorridor.hortiProductionKw.toLocaleString('id-ID')}{' '}
                    <span className="text-xs font-normal text-on-surface-variant">
                      kw/thn
                    </span>
                  </span>
                </div>
                {/* Commodity breakdown pills */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {activeCorridor.commodities.map((comm, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-container-lowest/70 p-1.5 rounded text-center"
                    >
                      <span className="block font-tech-code-sm text-[10px] text-on-surface-variant truncate">
                        {comm.name}
                      </span>
                      <span
                        className="block font-tech-code-sm text-tech-code-sm font-bold"
                        style={{ color: comm.color }}
                      >
                        {comm.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric 2: Waktu Tempuh & Penundaan */}
              <div className="p-3 rounded-xl bg-surface-container-high/40 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-lg">
                      timer
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Waktu Tempuh ke Pasar Roga
                    </span>
                  </div>
                  <span className="font-tech-code-md text-tech-code-md text-tertiary font-bold">
                    {activeCorridor.travelTimeMinutes} Menit
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-tech-code-sm">
                  <span className="text-on-surface-variant">
                    Waktu Ideal (Kondisi Mantap):
                  </span>
                  <span className="text-on-surface">
                    {activeCorridor.idealTimeMinutes} Menit
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-error-container/20 text-error text-[11px] font-tech-code-sm">
                  <span className="material-symbols-outlined text-xs">
                    trending_up
                  </span>
                  <span>
                    Terjadi keterlambatan +{activeCorridor.delayMinutes} Menit akibat
                    segmen rusak parah
                  </span>
                </div>
              </div>

              {/* Metric 3: Ketersediaan Rute Alternatif */}
              <div
                className={`p-3 rounded-xl flex flex-col gap-1.5 ${
                  !activeCorridor.altRoutesAvailable
                    ? 'bg-error-container/15'
                    : 'bg-surface-container-high/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-lg ${
                        !activeCorridor.altRoutesAvailable
                          ? 'text-error'
                          : 'text-secondary'
                      }`}
                    >
                      {!activeCorridor.altRoutesAvailable ? 'warning' : 'alt_route'}
                    </span>
                    <span
                      className={`font-body-sm text-body-sm font-semibold ${
                        !activeCorridor.altRoutesAvailable
                          ? 'text-error'
                          : 'text-on-surface'
                      }`}
                    >
                      Ketersediaan Rute Alternatif
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded font-tech-code-sm text-[10px] font-bold uppercase tracking-wider ${
                      !activeCorridor.altRoutesAvailable
                        ? 'bg-error text-on-error'
                        : 'bg-secondary/20 text-secondary'
                    }`}
                  >
                    {!activeCorridor.altRoutesAvailable ? 'TIDAK ADA' : 'TERSEDIA'}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-[11.5px] leading-snug text-on-surface-variant">
                  {activeCorridor.altRouteNotes}
                </p>
              </div>

              {/* Metric 4: Penerima Manfaat */}
              <div className="p-3 rounded-xl bg-surface-container-high/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">
                    groups
                  </span>
                  <div>
                    <span className="block font-body-sm text-body-sm text-on-surface">
                      Penerima Manfaat Langsung
                    </span>
                    <span className="block font-tech-code-sm text-[10.5px] text-on-surface-variant">
                      Petani, Poktan &amp; Logistik
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-headline-md text-headline-md font-bold text-on-surface">
                    {activeCorridor.beneficiariesCount.toLocaleString('id-ID')}
                  </span>
                  <span className="block font-tech-code-sm text-[10px] text-secondary">
                    Terdata Tanpa Ganda
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => onNavigateScreen('integrasi-rkpd-anggaran')}
                className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-primary-container to-surface-tint text-on-primary font-headline-md text-tech-code-md font-bold shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">policy</span>
                <span>Ajukan sebagai Koridor Kelas I RKPD</span>
              </button>
              <button
                onClick={() => onNavigateScreen('indeks-prioritas-6-kriteria')}
                className="w-full py-2.5 px-4 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-body-sm text-body-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base text-primary">
                  radar
                </span>
                <span>Lihat Radar 6 Kriteria Koridor Ini</span>
              </button>
            </div>

            {/* OFFICIAL METHODOLOGY FOOTNOTE */}
            <div className="bg-surface-container-lowest/60 p-3 rounded-xl flex items-start gap-2 text-on-surface-variant font-tech-code-sm text-[11px] leading-relaxed">
              <span className="material-symbols-outlined text-primary text-sm shrink-0 mt-0.5">
                verified_user
              </span>
              <p>
                <strong className="text-on-surface font-semibold">
                  Catatan Metodologi:
                </strong>{' '}
                {activeCorridor.methodologyNote}
              </p>
            </div>
          </div>

          {/* SECONDARY PHOTO-RICH CONTEXT CARD */}
          <div className="bg-surface-container-low/90 backdrop-blur-xl p-space-md rounded-xl shadow-xl flex flex-col gap-space-sm border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps uppercase text-outline tracking-wider">
                Dokumentasi Survei Lapangan DPUTR
              </span>
              <span className="font-tech-code-sm text-[10.5px] text-secondary">
                Update 12 Jam Lalu
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {activeCorridor.imageUrls.map((img, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden h-28 group/img">
                  <img
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    alt={img.caption}
                    src={img.url}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                  <span className="absolute bottom-1.5 left-2 font-tech-code-sm text-[10px] text-white font-medium truncate">
                    {img.caption}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] font-tech-code-sm text-on-surface-variant">
              <span>Survei Drone &amp; GPS Odometer: Tim DPUTR</span>
              <span className="text-primary font-bold">Terverifikasi Lapangan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
