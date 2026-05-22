import type { CustomCandlestickProps } from './interface';

export default function CustomCandlestick({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  payload,
}: CustomCandlestickProps) {
  if (!payload) return null;

  const { open, close, high, low } = payload;

  // Prevent division by zero
  const valueRange = high - low;
  const ratio = valueRange > 0 ? height / valueRange : 0;

  // Calculate pixel coordinates for open and close
  // y is the pixel coordinate for the 'high' value (top of the wick)
  const openY = y + (high - open) * ratio;
  const closeY = y + (high - close) * ratio;

  const isBullish = close > open;
  // Green for bullish (closing higher), Red for bearish (closing lower or flat)
  const color = isBullish ? 'var(--color-brand-positive)' : 'var(--color-brand-negative)';

  const bodyY = Math.min(openY, closeY);
  const bodyHeight = Math.max(Math.abs(openY - closeY), 1); // Minimum 1px height

  // Center of the bar
  const centerX = x + width / 2;

  return (
    <g>
      {/* Wicks (High to Low) */}
      <line
        x1={centerX}
        y1={y}
        x2={centerX}
        y2={y + height}
        stroke={color}
        strokeWidth={1.5}
      />
      {/* Body (Open to Close) */}
      <rect
        x={x}
        y={bodyY}
        width={width}
        height={bodyHeight}
        fill={isBullish ? 'transparent' : color}
        stroke={color}
        strokeWidth={1.5}
      />
    </g>
  );
}
