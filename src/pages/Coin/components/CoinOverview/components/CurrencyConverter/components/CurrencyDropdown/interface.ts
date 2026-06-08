export interface CurrencyDropdownProps {
  currencyOption: string;
  currencies: string[] | undefined;
  onChange: (value: string) => void;
}
