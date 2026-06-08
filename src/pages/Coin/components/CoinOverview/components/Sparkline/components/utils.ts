import { format } from 'date-fns';

export const getTickFormat = (days: string, value: string): string => {
  switch (days) {
    case '1':
      return format(new Date(value), 'hh:mm a');
    case 'max':
      return format(new Date(value), 'yyyy');
    default:
      return format(new Date(value), 'MMM d');
  }
};
