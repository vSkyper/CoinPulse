import { type ReactNode } from 'react';

export interface ChipLinkProps {
  href: string;
  children: ReactNode;
  left?: ReactNode;
  className?: string;
}
