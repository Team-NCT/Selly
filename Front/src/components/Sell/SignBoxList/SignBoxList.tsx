import { SignBoxListProps } from "./SignBoxList.types";
import style from "./SignBoxList.module.scss";
import { SignBox } from "@/components";
import { useState } from "react";

const SelectCardList = ({ data }: SignBoxListProps) => {
  const [activeBoxIdx, setActiveBoxIdx] = useState(-1);

  return (
    <ul className={style.box_list}>
      {data.map((item, idx) => (
        <SignBox
          key={idx}
          title={item.title}
          desc={item.desc}
          idx={idx + 1}
          isActive={activeBoxIdx===idx}
        />
      ))}
    </ul>
  );
};
export default SelectCardList;
