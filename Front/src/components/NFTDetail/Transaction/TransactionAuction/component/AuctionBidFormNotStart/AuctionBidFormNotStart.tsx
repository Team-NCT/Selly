import { useState } from "react";
import style from "./AuctionBidFormNotStart.module.scss";
import { AuctionBidFormNotStartProps } from "./AuctionBidFormNotStart.types";
import { Button, NumberInput } from "@/components/common";
import { useInputState } from "@/hooks";

const AuctionBidForm = ({ auctionStatus, lowPrice }: AuctionBidFormNotStartProps) => {
  const [value, handleInputChange] = useInputState();
  const [inputStatus, setInputStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <>
      <section className={style.NFT_detail_transaction_price}>
        <div className={style.NFT_detail_transaction_price_content}>
          <p>최소 경매 시작 가격</p>
          <p>
            <strong>{lowPrice}</strong> ETH
          </p>
        </div>
        <div className={style.NFT_detail_transaction_price_description}>
          <p>누군가가 경매 최소 시작가를 입찰하면 </p>
          <p>
            경매가 시작되고 <strong>3일 동안 </strong>
            진행됩니다.
          </p>
        </div>
      </section>
      <form className={style.NFT_detail_transaction_form}>
        <div className={style.NFT_detail_transaction_input}>
          <label htmlFor="auction-bid"> 경매 입찰가</label>
          <NumberInput
            id="auction-bid"
            value={value}
            min={lowPrice}
            handleValueChange={handleInputChange}
            status={inputStatus}
            errorMessage={errorMessage}
          />
        </div>
        <div
          className={`${style.NFT_detail_transaction_button} ${style[`status-${auctionStatus}`]}`}>
          <Button bg="primary" size="fillContainer">
            입찰 하기
          </Button>
          <Button bg="disabled" size="fillContainer" type="button" hidden={!auctionStatus}>
            경매 취소
          </Button>
        </div>
      </form>
    </>
  );
};

export default AuctionBidForm;
