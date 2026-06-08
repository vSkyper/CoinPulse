import type { CoinInfoProps } from './interface';

export default function CoinInfo({ name, symbol, image, marketCapRank }: CoinInfoProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {/* Coin Image */}
      <div className="relative w-10! h-10! sm:w-14! sm:h-14! rounded-xl sm:rounded-2xl shadow-highlight-neutral border border-white/5 bg-white/2 p-1 sm:p-2">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full rounded-xl sm:rounded-2xl object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-xl sm:rounded-2xl bg-white/5" />
        )}
      </div>

      {/* Coin Info */}
      <div className="flex flex-col gap-0.5 sm:gap-1">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tighter leading-none drop-shadow-text-lg">
            {name}
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-2">
          <span className="text-[0.6rem] sm:text-[0.65rem] font-bold text-white/60 uppercase tracking-widest bg-white/2 px-1.5 sm:px-2 py-0.5 rounded-md border border-white/5 transition-colors">
            {symbol}
          </span>

          {marketCapRank && (
            <span className="text-[0.6rem] sm:text-[0.65rem] font-bold rounded-md px-2 py-0.5 bg-brand-violet/10 border border-brand-violet/20 text-brand-violet tracking-wide shadow-glow-primary">
              #{marketCapRank}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
