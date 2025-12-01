const COINGECKO_API_URL = 'https://www.coingecko.com/en/api';
const COINGECKO_BADGE_URL = '/CGAPI-Lockup@2x-1.png';

export default function CoinGeckoBadge() {
  return (
    <a
      href={COINGECKO_API_URL}
      target='_blank'
      rel='noopener noreferrer'
      className='group relative flex items-center justify-center p-1 sm:p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/20 overflow-hidden'
    >
      <div className='absolute inset-0 bg-linear-to-tr from-(--brand-blue)/0 via-(--brand-blue)/0 to-(--brand-blue)/0 group-hover:via-(--brand-blue)/5 transition-all duration-500' />
      <img
        alt='CoinGecko'
        src={COINGECKO_BADGE_URL}
        className='h-4 sm:h-5 w-auto opacity-40 group-hover:opacity-100 transition-all duration-300 filter'
      />
    </a>
  );
}
