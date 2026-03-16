import { ReactNode, ChangeEvent } from 'react';

export interface CurrencyInputProps {
  label: string;
  symbol: string;
  value: string;
  image?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
}
