import React from 'react';

export default function NodeThumbnail({ nodeId, title, coords, isHovered }) {
  const renderGraphic = () => {
    switch (nodeId) {
      case 'node-01': // Technosomatic Architecture (Isometric spatial structure)
        return (
          <g stroke="#111111" strokeWidth="1.2" fill="none" transform="translate(150, 75)">
            <polygon points="0,-35 70,5 0,45 -70,5" stroke="#D4D4D8" strokeDasharray="2,2" />
            <polygon points="0,-65 65,-25 0,15 -65,-25" fill="#FFFFFF" fillOpacity="0.95" stroke="#111111" strokeWidth="1.5" />
            <line x1="-65" y1="-25" x2="-65" y2="5" stroke="#111111" />
            <line x1="65" y1="-25" x2="65" y2="5" stroke="#111111" />
            <line x1="0" y1="15" x2="0" y2="45" stroke="#111111" />
            <circle cx="0" cy="-65" r="2.5" fill="#111111" />
            <circle cx="65" cy="-25" r="2.5" fill="#111111" />
            <circle cx="0" cy="15" r="2.5" fill="#111111" />
            <circle cx="-65" cy="-25" r="2.5" fill="#111111" />
            <line x1="0" y1="-65" x2="0" y2="-75" stroke="#111111" strokeWidth="1.5" />
            <circle cx="0" cy="-75" r="3.5" fill="#111111" />
          </g>
        );

      case 'node-02': // Generative Space / Rendered (3D wireframe mesh)
        return (
          <g stroke="#111111" strokeWidth="1.2" fill="none" transform="translate(150, 75)">
            <polygon points="0,-50 45,-25 45,25 0,50 -45,25 -45,-25" stroke="#111111" fill="#FFFFFF" />
            <line x1="0" y1="-50" x2="0" y2="50" stroke="#111111" strokeDasharray="2,2" />
            <line x1="-45" y1="-25" x2="45" y2="25" stroke="#111111" />
            <line x1="-45" y1="25" x2="45" y2="-25" stroke="#111111" />
            <polygon points="0,-25 22,-12 22,12 0,25 -22,12 -22,-12" fill="#111111" fillOpacity="0.06" stroke="#111111" strokeWidth="1" />
            <circle cx="0" cy="0" r="3" fill="#111111" />
          </g>
        );

      case 'node-03': // Bio-Substrate / NUDE (Neuromuscular waveform)
        return (
          <g stroke="#111111" strokeWidth="1.3" fill="none" transform="translate(150, 75)">
            <path d="M-110,0 L-50,0 L-35,-35 L-20,40 L-5,-50 L10,30 L25,-15 L40,0 L110,0" stroke="#111111" strokeWidth="1.5" />
            <path d="M-110,-15 Q-55,-40 0,-15 T110,-15" stroke="#A1A1AA" strokeDasharray="3,3" />
            <path d="M-110,15 Q-55,40 0,15 T110,15" stroke="#A1A1AA" strokeDasharray="3,3" />
            <circle cx="-5" cy="-50" r="3.5" fill="#111111" />
          </g>
        );

      case 'node-04': // Spatial Telemetry / Holoscene (Cascading data columns)
        return (
          <g fill="#111111" transform="translate(150, 75)">
            {[-80, -50, -20, 10, 40, 70].map((x, i) => {
              const h = [30, 60, 45, 75, 50, 65][i];
              return (
                <g key={i}>
                  <line x1={x} y1="-40" x2={x} y2="40" stroke="#E4E4E7" strokeWidth="1" />
                  <rect x={x - 4} y={-h / 2} width="8" height={h} fill="#111111" rx="1" fillOpacity={i % 2 === 0 ? 0.9 : 0.4} />
                  <circle cx={x} cy={-h / 2 - 4} r="1.5" fill="#111111" />
                </g>
              );
            })}
            <line x1="-100" y1="0" x2="100" y2="0" stroke="#111111" strokeWidth="1" strokeDasharray="4,4" />
          </g>
        );

      case 'node-05': // Physical Interface / Technosomatic Real (Circuit schematic)
        return (
          <g stroke="#111111" strokeWidth="1.2" fill="none" transform="translate(150, 75)">
            <rect x="-70" y="-35" width="140" height="70" stroke="#111111" strokeWidth="1.5" rx="2" fill="#FAFAFA" />
            <line x1="-100" y1="-15" x2="-70" y2="-15" stroke="#111111" />
            <line x1="-100" y1="15" x2="-70" y2="15" stroke="#111111" />
            <line x1="70" y1="0" x2="100" y2="0" stroke="#111111" />
            <circle cx="-40" cy="0" r="8" stroke="#111111" />
            <circle cx="0" cy="0" r="12" stroke="#111111" fill="#FFFFFF" />
            <circle cx="40" cy="0" r="8" stroke="#111111" />
            <line x1="-32" y1="0" x2="-12" y2="0" stroke="#111111" />
            <line x1="12" y1="0" x2="32" y2="0" stroke="#111111" />
            <circle cx="0" cy="0" r="4" fill="#111111" />
          </g>
        );

      case 'node-06': // Cybernetic Loops / The Loop of Being (Ouroboros / Infinity loop)
        return (
          <g stroke="#111111" strokeWidth="1.3" fill="none" transform="translate(150, 75)">
            <path d="M-50,0 C-50,-30 0,-30 0,0 C0,30 50,30 50,0 C50,-30 0,-30 0,0 C0,30 -50,30 -50,0 Z" stroke="#111111" strokeWidth="1.8" fill="none" />
            <circle cx="-50" cy="0" r="4" fill="#111111" />
            <circle cx="50" cy="0" r="4" fill="#111111" />
            <circle cx="0" cy="0" r="3" fill="#111111" />
            <polygon points="-25,-18 -20,-15 -25,-12" fill="#111111" />
            <polygon points="25,18 20,15 25,12" fill="#111111" />
          </g>
        );

      case 'node-07': // Essays / Technosomatic Writings (Editorial monograph grid)
        return (
          <g stroke="#111111" strokeWidth="1" fill="none" transform="translate(150, 75)">
            <rect x="-75" y="-45" width="150" height="90" stroke="#111111" strokeWidth="1.4" fill="#FFFFFF" />
            <line x1="-60" y1="-30" x2="-20" y2="-30" stroke="#111111" strokeWidth="2" />
            <line x1="-60" y1="-20" x2="-10" y2="-20" stroke="#A1A1AA" />
            <line x1="-60" y1="-10" x2="-10" y2="-10" stroke="#A1A1AA" />
            <line x1="-60" y1="0" x2="-10" y2="0" stroke="#A1A1AA" />
            <line x1="-60" y1="10" x2="-25" y2="10" stroke="#A1A1AA" />

            <line x1="10" y1="-30" x2="60" y2="-30" stroke="#A1A1AA" />
            <line x1="10" y1="-20" x2="60" y2="-20" stroke="#A1A1AA" />
            <line x1="10" y1="-10" x2="60" y2="-10" stroke="#A1A1AA" />
            <line x1="10" y1="0" x2="60" y2="0" stroke="#A1A1AA" />
            <line x1="10" y1="10" x2="45" y2="10" stroke="#A1A1AA" />

            <line x1="0" y1="-40" x2="0" y2="40" stroke="#E4E4E7" strokeDasharray="2,2" />
            <circle cx="-60" cy="28" r="3" fill="#111111" />
          </g>
        );

      default:
        return (
          <circle cx="150" cy="75" r="20" stroke="#111111" strokeWidth="1.5" fill="none" />
        );
    }
  };

  return (
    <div className="relative w-full h-[140px] bg-[#FAFAFA] overflow-hidden border border-[#111111] select-none rounded-lg">
      <svg className="w-full h-full block" viewBox="0 0 300 150">
        <defs>
          <pattern id={`thumb-grid-${nodeId}`} width="15" height="15" patternUnits="userSpaceOnUse">
            <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#ECECEE" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="300" height="150" fill={`url(#thumb-grid-${nodeId})`} />

        {/* Technical Corner Crosshairs */}
        <g stroke="#111111" strokeWidth="1" opacity="0.4">
          <line x1="8" y1="8" x2="16" y2="8" />
          <line x1="8" y1="8" x2="8" y2="16" />
          <line x1="292" y1="8" x2="284" y2="8" />
          <line x1="292" y1="8" x2="292" y2="16" />
          <line x1="8" y1="142" x2="16" y2="142" />
          <line x1="8" y1="142" x2="8" y2="134" />
          <line x1="292" y1="142" x2="284" y2="142" />
          <line x1="292" y1="142" x2="292" y2="134" />
        </g>

        {/* Node Vector Diagram */}
        {renderGraphic()}

        {/* Top-left coordinate watermark */}
        <text x="14" y="20" fontFamily="'Fira Code', monospace" fontSize="8" fill="#71717A" fontWeight="600">
          VECTOR [{coords.x}, {coords.y}]
        </text>

        {/* Top-right status */}
        <text x="286" y="20" fontFamily="'Fira Code', monospace" fontSize="8" fill="#111111" textAnchor="end" fontWeight="700">
          LIVE // 2026
        </text>
      </svg>

      {/* Hover scanner line */}
      <div 
        className={`absolute inset-x-0 h-[1.5px] bg-black/40 transition-all duration-700 pointer-events-none ${
          isHovered ? 'top-full opacity-100' : 'top-0 opacity-0'
        }`}
      />
    </div>
  );
}
