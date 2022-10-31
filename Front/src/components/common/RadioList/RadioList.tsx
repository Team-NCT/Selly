import { RadioListProps } from "./RadioList.types";
import style from "./RadioList.module.scss";
import { Radio } from "@/components/common";
import React from "react";

const RadioList = ({ list, category, bg = "primary", onChange }: RadioListProps) => {
  return (
    <ul className={style.radioList} onChange={onChange}>
      {list.map((item) => (
        <Radio key={item} value={item} category={category} bg={bg} />
      ))}
    </ul>
  );
};

export default RadioList;
