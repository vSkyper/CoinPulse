import { FilterFn } from '@tanstack/react-table';

export const PAGINATION_CONFIG = {
  pageSize: 50,
  pageSizeOptions: [50, 100],
} as const;

export const STRING_OPERATORS = [
  'contains',
  'equals',
  'startsWith',
  'endsWith',
];
export const NUMBER_OPERATORS = ['=', '>', '<', '>=', '<=', '!='];
export const TREND_OPERATORS = ['up', 'down'];

export const PERCENTAGE_COLUMNS = [
  'price_change_percentage_1h_in_currency',
  'price_change_percentage_24h_in_currency',
  'price_change_percentage_7d_in_currency',
];

export const getOperatorsForColumn = (columnId: string) => {
  if (PERCENTAGE_COLUMNS.includes(columnId)) {
    return [...NUMBER_OPERATORS, ...TREND_OPERATORS];
  }

  switch (columnId) {
    case 'name':
    case 'symbol':
      return STRING_OPERATORS;
    case 'current_price':
    case 'total_volume':
    case 'market_cap':
      return NUMBER_OPERATORS;
    case 'sparkline_in_7d':
      return TREND_OPERATORS;
    default:
      return STRING_OPERATORS;
  }
};

export const customFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  const rowValue = row.getValue(columnId);
  const { operator, value } = filterValue || {};

  if (!operator) return true;

  // Handle Trend Operators (up/down)
  if (TREND_OPERATORS.includes(operator)) {
    // For sparkline, we look at 7d change
    const targetValue =
      columnId === 'sparkline_in_7d'
        ? row.getValue('price_change_percentage_7d_in_currency')
        : rowValue;

    const numValue = Number(targetValue);
    if (isNaN(numValue)) return false;

    return operator === 'up' ? numValue >= 0 : numValue < 0;
  }

  if (value === undefined || value === '') return true;

  if (rowValue == null) return false;

  // Handle numeric comparisons
  if (NUMBER_OPERATORS.includes(operator)) {
    let numRowValue = Number(rowValue);
    const numValue = Number(value);

    // For percentage columns, use absolute value to match the displayed number (which is unsigned)
    if (PERCENTAGE_COLUMNS.includes(columnId)) {
      numRowValue = Math.abs(numRowValue);
      // Round to 2 decimal places to match display
      numRowValue = Number(numRowValue.toFixed(2));
    } else if (columnId === 'current_price') {
      // Round to 8 decimal places to match display max precision
      numRowValue = Number(numRowValue.toFixed(8));
    } else if (['total_volume', 'market_cap'].includes(columnId)) {
      // Round to 2 decimal places just in case
      numRowValue = Number(numRowValue.toFixed(2));
    }

    if (!isNaN(numRowValue) && !isNaN(numValue)) {
      const epsilon = 0.001; // Tolerance for floating point comparison
      switch (operator) {
        case '=':
          return Math.abs(numRowValue - numValue) < epsilon;
        case '>':
          return numRowValue > numValue + epsilon;
        case '<':
          return numRowValue < numValue - epsilon;
        case '>=':
          return numRowValue >= numValue - epsilon;
        case '<=':
          return numRowValue <= numValue + epsilon;
        case '!=':
          return Math.abs(numRowValue - numValue) >= epsilon;
      }
    }
    return false;
  }

  // Handle string comparisons (including numbers treated as strings for contains/startsWith/etc)
  const strRowValue = String(rowValue).toLowerCase();
  const strValue = String(value).toLowerCase();

  switch (operator) {
    case 'contains':
      return strRowValue.includes(strValue);
    case 'equals':
      return strRowValue === strValue;
    case 'startsWith':
      return strRowValue.startsWith(strValue);
    case 'endsWith':
      return strRowValue.endsWith(strValue);
    default:
      return true;
  }
};
