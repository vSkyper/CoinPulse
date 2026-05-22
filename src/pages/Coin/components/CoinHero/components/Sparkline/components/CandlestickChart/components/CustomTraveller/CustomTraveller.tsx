import type { CustomTravellerProps } from './interface';

export default function CustomTraveller({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
}: CustomTravellerProps) {
  const centerY = height / 2;

  return (
    <g
      transform={`translate(${x},${y})`}
      className="cursor-ew-resize group outline-none custom-traveller-group"
    >
      {/* Left Traveller Background (Rounded Left, Square Right) */}
      <path
        className="traveller-left-bg transition-all duration-300 group-hover:fill-[rgba(167,139,250,1)]"
        d={`M 8 0 L ${width} 0 L ${width} ${height} L 8 ${height} A 8 8 0 0 1 0 ${height - 8} L 0 8 A 8 8 0 0 1 8 0 Z`}
        fill="var(--color-brand-violet)"
      />
      <path
        className="traveller-left-stroke pointer-events-none"
        d={`M 8 0 L ${width} 0 L ${width} ${height} L 8 ${height} A 8 8 0 0 1 0 ${height - 8} L 0 8 A 8 8 0 0 1 8 0 Z`}
        fill="transparent"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth={1}
      />

      {/* Right Traveller Background (Square Left, Rounded Right) */}
      <path
        className="traveller-right-bg transition-all duration-300 group-hover:fill-[rgba(167,139,250,1)]"
        d={`M 0 0 L ${width - 8} 0 A 8 8 0 0 1 ${width} 8 L ${width} ${height - 8} A 8 8 0 0 1 ${width - 8} ${height} L 0 ${height} Z`}
        fill="var(--color-brand-violet)"
      />
      <path
        className="traveller-right-stroke pointer-events-none"
        d={`M 0 0 L ${width - 8} 0 A 8 8 0 0 1 ${width} 8 L ${width} ${height - 8} A 8 8 0 0 1 ${width - 8} ${height} L 0 ${height} Z`}
        fill="transparent"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth={1}
      />

      <line
        x1={width / 2 - 1.5}
        y1={centerY - 4}
        x2={width / 2 - 1.5}
        y2={centerY + 4}
        stroke="#ffffff"
        strokeWidth={1.5}
        strokeLinecap="round"
        className="pointer-events-none opacity-80"
      />
      <line
        x1={width / 2 + 1.5}
        y1={centerY - 4}
        x2={width / 2 + 1.5}
        y2={centerY + 4}
        stroke="#ffffff"
        strokeWidth={1.5}
        strokeLinecap="round"
        className="pointer-events-none opacity-80"
      />
    </g>
  );
}
