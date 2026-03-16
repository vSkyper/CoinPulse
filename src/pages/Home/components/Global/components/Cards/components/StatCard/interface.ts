export interface CardConfig {
  key: string;
  value: string;
  fullValue?: string | number;
  mobileValue?: string;
  label: string;
  color: string;
  percentage?: {
    value: string;
    change: number;
  };
  timeout: number;
}

export interface StatCardProps {
  config: CardConfig;
  toggle: boolean;
  isMobile: boolean;
  className?: string;
}
