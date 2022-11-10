export interface FractionNumProps {
  value: string;
  changeHandler: React.FormEventHandler<Element>;
  setIsNumTrue: (a: boolean) => void;
}
