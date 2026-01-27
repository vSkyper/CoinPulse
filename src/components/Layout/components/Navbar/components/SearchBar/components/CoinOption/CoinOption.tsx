import { CoinOptionProps } from './interface';

export default function CoinOption({ coin, isFocused }: CoinOptionProps) {
  const imageUrl = 'image' in coin ? coin.image : undefined;
  const currentPrice = 'current_price' in coin ? coin.current_price : undefined;
  const priceChange =
    'price_change_percentage_24h' in coin
      ? coin.price_change_percentage_24h
      : undefined;

  const isPositive = (priceChange || 0) >= 0;

  return (
    <div
      className={`flex items-center justify-between px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-xl transition-all duration-200 ${
        isFocused ? 'bg-white/5' : 'bg-transparent'
      }`}
    >
      <div className='flex items-center gap-2 sm:gap-2.5 min-w-0'>
        {/* Coin Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={coin.name}
            className='w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full object-cover bg-white/10'
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        {/* Name and Symbol */}
        <div className='flex flex-col min-w-0'>
          <span
            className={`font-semibold text-[11px] sm:text-[13px] truncate transition-colors duration-200 ${
              isFocused ? 'text-white' : 'text-zinc-200'
            }`}
          >
            {coin.name}
          </span>
          <span className='text-[9px] sm:text-[11px] font-medium text-zinc-500 uppercase tracking-tight'>
            {coin.symbol}
          </span>
        </div>
      </div>

      {currentPrice !== undefined && priceChange !== undefined && (
        <div className='flex flex-col items-end gap-0'>
          {/* Price */}
          <span className='text-[11px] sm:text-[13px] font-medium text-white'>
            $
            {currentPrice.toLocaleString('en-US', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </span>

          {/* 24h Change */}
          <div
            className={`flex items-center gap-0.5 text-[9px] sm:text-[11px] font-medium ${
              isPositive ? 'text-brand-positive' : 'text-brand-negative'
            }`}
          >
            {isPositive ? '+' : ''}
            {priceChange?.toFixed(2)}%
          </div>
        </div>
      )}
    </div>
  );
}
