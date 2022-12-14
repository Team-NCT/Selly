import { SelectCardListProps } from "./SelectCardList.types";
import style from "./SelectCardList.module.scss";
import { SelectCard } from "@/components/sell";
import { useState } from "react";
import { setNFTValue, resetNFTValue } from "@/store/selectNFTSlice";
import { useAppDispatch } from "@/hooks";

const SelectCardList = ({ data, defaultSelectedIdx = -1 }: SelectCardListProps) => {
  const [selectedNum, setSelectedNum] = useState(defaultSelectedIdx);
  const dispatch = useAppDispatch();

  const setValue = (idx: number) => {
    setSelectedNum(idx);
    if (idx < 0) {
      dispatch(resetNFTValue());
    } else {
      dispatch(
        setNFTValue({
          CA: data[idx].CA,
          tokenId: data[idx].tokenId,
          metaDataUrl: data[idx].metaDataUrl,
          articleName: data[idx].articleName,
          articleImgUrl: data[idx].articleImgUrl,
          selectIdx: idx,
        })
      );
    }
  };

  return (
    <ul className={style.card_list}>
      {data.map((item, idx) => (
        <SelectCard
          key={idx}
          url={item.articleImgUrl}
          title={item.articleName}
          idx={idx}
          isSelected={idx === selectedNum}
          setValue={setValue}
        />
      ))}
    </ul>
  );
};
export default SelectCardList;
