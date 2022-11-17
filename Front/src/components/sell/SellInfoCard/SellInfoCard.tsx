import { useState } from "react";
import style from "./SellInfoCard.module.scss";
import { Button } from "@/components/common";
import { selectSellInfo } from "@/store/sellInfoSlice";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { openConfirm } from "@/store/modalSlice";
import { EthereumIcon } from "@/components/icon";
import { selectNFTValue } from "@/store/selectNFTSlice";
import sellyIcon from "@/assets/images/sellyLogo.svg";

const SellInfoCard = () => {
  const [errorStatus, setErrorStatus] = useState(true);

  const dispatch = useAppDispatch();
  const sellInfo = useAppSelector(selectSellInfo);
  const NFTValue = useAppSelector(selectNFTValue);

  const editHandler = () => {
    dispatch(openConfirm());
  };

  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = sellyIcon;
    setErrorStatus(false);
  };

  return (
    <article className={style.sell_info_card}>
      <h1>Selected NFT</h1>
      <div className={style.content}>
        <img
          src={!NFTValue.articleImgUrl ? sellyIcon : NFTValue.articleImgUrl}
          alt={NFTValue.articleName}
          onError={handleImgError}
          className={!NFTValue.articleImgUrl || !errorStatus ? style.error_image : ""}
        />
        <div className={style.sell_info}>
          <h2>
            카테고리
            <span>{sellInfo.category}</span>
          </h2>
          <h2>
            조각 코드
            <span>{sellInfo.code}</span>
          </h2>
          <h2>
            조각 개수
            <span>
              {sellInfo.num} <strong>개</strong>
            </span>
          </h2>
          <h2>
            조각 당 가격
            <span>
              {sellInfo.price} <strong>ETH</strong>
            </span>
          </h2>
          <h2>
            <div className={style.total_price_title}>
              <EthereumIcon />
              <p>총 가격</p>
            </div>
            <span>
              {+(Number(sellInfo.num) * Number(sellInfo.price)).toFixed(4)} <strong>ETH</strong>
            </span>
          </h2>
        </div>
      </div>
      <Button size="fillContainer" bg="blackberry" color="white" onClick={editHandler}>
        EDIT
      </Button>
    </article>
  );
};

export default SellInfoCard;
