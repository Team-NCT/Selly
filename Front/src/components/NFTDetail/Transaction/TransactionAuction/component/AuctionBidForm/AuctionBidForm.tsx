import { useState } from "react";
import style from "./AuctionBidForm.module.scss";
import { Button, NumberInput } from "@/components/common";
import { AuctionBidFormProps } from "./AuctionBidForm.types";
import { useInputState } from "@/hooks";

const AuctionBidForm = ({ auctionEndTime, auctionStatus, bidPrice }: AuctionBidFormProps) => {
  const [value, handleInputChange] = useInputState();
  const [inputStatus, setInputStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <section className={style.NFT_detail_transaction_price}>
        <div className={style.NFT_detail_transaction_price_content}>
          <p>현재 입찰 가격</p>
          <p>
            <strong>{bidPrice}</strong> ETH
          </p>
        </div>
        <div className={style.NFT_detail_transaction_price_description}>
          <p>
            <strong>2022년 10월 22일 23시 59분</strong>에
          </p>
          <p> 경매가 종료됩니다.</p>
        </div>
      </section>
      <form className={style.NFT_detail_transaction_form}>
        <div className={style.NFT_detail_transaction_input}>
          <label htmlFor="auction-bid"> 경매 입찰가</label>
          <NumberInput
            id="auction-bid"
            value={value}
            min={bidPrice}
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
