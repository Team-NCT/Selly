import { Neon } from "@/components/common";
import style from "./TabItem.module.scss";

export type TabItemProps = {
  value: string;
  isChecked: boolean;
};

const TabItem = ({ value = "profile", isChecked = false }: TabItemProps) => {
  return (
    <label className={style.opt}>
      <input
        className={style.radio}
        name="profileTab"
        type="radio"
        value={value}
        defaultChecked={isChecked}></input>
      <Neon color="muscat" positionH="top" positionW="right">
        {value}
      </Neon>
    </label>
  );
};

export default TabItem;
