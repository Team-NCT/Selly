import { LabelProps } from "./Label.types";
import { Neon } from "@/components/common";
import style from "./Label.module.scss";

const Label = (props: React.PropsWithChildren<LabelProps>) => {
  const { id, ...NeonProps } = props;
  return (
    <label htmlFor={id} className={style.input_label}>
      <Neon {...NeonProps}>{props.children}</Neon>
    </label>
  );
};

export default Label;
