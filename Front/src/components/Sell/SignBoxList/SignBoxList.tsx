import { SignBoxListProps } from "./SignBoxList.types";
import style from "./SignBoxList.module.scss";
import { SignBox } from "@/components";
import { useState } from "react";

const SelectCardList = ({ data }: SignBoxListProps) => {
  const [activeBoxIdx, setActiveBoxIdx] = useState(0);

  const goNext = (idx: number) => {
    setActiveBoxIdx(idx);
    // TODO_YK: 모든 서명이 끝났을 때, 작품 판매 등록 API 실행 로직 추가
  };

  return (
    <ul className={style.box_list}>
      {data.map((item, idx) => (
        <SignBox
          key={idx}
          title={item.title}
          desc={item.desc}
          idx={idx + 1}
          isActive={activeBoxIdx === idx}
          signFunction={item.signFunction}
          goNext={goNext}
        />
      ))}
    </ul>
  );
};
export default SelectCardList;
