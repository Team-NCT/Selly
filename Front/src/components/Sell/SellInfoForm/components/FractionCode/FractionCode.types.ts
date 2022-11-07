export interface FractionCodeProps {
  value: string;
  changeHandler: React.FormEventHandler<Element>;
  setIsCodeTrue: (a: boolean) => void;
}
