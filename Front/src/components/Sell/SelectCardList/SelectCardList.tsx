import { SelectCardListProps } from "./SelectCardList.types";
import style from "./SelectCardList.module.scss";
import { SelectCard } from "@/components/Sell";
import { useState } from "react";
import { setNFTValue, resetNFTValue, SelectNFTState } from "@/store/selectNFTSlice";
import { useAppDispatch } from "@/hooks";

const SelectCardList = ({ data }: SelectCardListProps) => {
  const [selectedNum, setSelectedNum] = useState(-1);
  const dispatch = useAppDispatch();

  //TODO_YK: NFT정보 가져와서 CA 같은 다른 정보들도 rest로 넣어주기
  const setValue = (idx: number) => {
    setSelectedNum(idx);
    if (idx < 0) {
      dispatch(resetNFTValue());
    } else {
      dispatch(
        setNFTValue({
          CA: data[idx].contract.address,
          tokenId: data[idx].tokenId,
          metaDataUrl: data[idx].tokenUri.raw,
          articleName: data[idx].title,
          articleUrl: data[idx].rawMetadata.image,
        })
      );
    }
  };

  return (
    <ul className={style.card_list}>
      {data.map((item, idx) => (
        <SelectCard
          key={idx}
          url={item.rawMetadata.image}
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
