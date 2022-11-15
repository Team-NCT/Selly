import { SignBoxListProps } from "./SignBoxList.types";
import style from "./SignBoxList.module.scss";
import { SignBox } from "@/components/sell";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { resetSignData, setF_NFTCA, setF_NFTSaleCA } from "@/store/signDataSlice";
import { resetSellInfo } from "@/store/sellInfoSlice";
import { resetNFTValue } from "@/store/selectNFTSlice";
import { useNavigate } from "react-router-dom";

const SelectCardList = ({ data }: SignBoxListProps) => {
  const [activeBoxIdx, setActiveBoxIdx] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goNext = (idx: number) => {
    setActiveBoxIdx(idx);
    // 모든 서명이 끝났을 때, 판매 정보 reset
    if (idx === 4) {
      dispatch(resetSignData());
      dispatch(resetSellInfo());
      dispatch(resetNFTValue());
      navigate("/");
    }
  };

  const setF_NFT = (value: string) => {
    dispatch(setF_NFTCA(value));
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
          setValue={idx === 0 ? setF_NFT : undefined}
        />
      ))}
    </ul>
  );
};
export default SelectCardList;
