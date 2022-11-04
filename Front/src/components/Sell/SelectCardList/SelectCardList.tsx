import { SelectCardListProps } from "./SelectCardList.types";
import style from "./SelectCardList.module.scss";
import { SelectCard } from "@/components";
import { useState } from "react";

const SelectCardList = ({ data, setNFTValue }: SelectCardListProps) => {
  const [selectedNum, setSelectedNum] = useState(-1);

  //TODO_YK: 인자로 받을 setNFTValue 함수로 idx뿐만 아니라 받아온 NFT 데이터를 넣어주기
  const setValue = (idx: number) => {
    setSelectedNum(idx);
    //setNFTValue
  };

  return (
    <ul className={style.card_list}>
      {data.map((item, idx) => (
        <SelectCard
          key={idx}
          url={item.url}
          title={item.title}
          idx={idx}
          isSelected={idx === selectedNum}
          setValue={setValue}
        />
      ))}
    </ul>
  );
};
export default SelectCardList;
