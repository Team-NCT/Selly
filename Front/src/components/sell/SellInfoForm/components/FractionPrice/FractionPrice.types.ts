export interface FractionPriceProps {
  value: string;
  changeHandler: React.FormEventHandler<Element>;
  setIsPriceTrue: (a: boolean) => void;
}
