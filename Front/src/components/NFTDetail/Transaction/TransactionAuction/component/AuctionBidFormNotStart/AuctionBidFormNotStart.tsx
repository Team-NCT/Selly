import { useState, useCallback } from "react";
import style from "./AuctionBidFormNotStart.module.scss";
import { AuctionBidFormNotStartProps } from "./AuctionBidFormNotStart.types";
import { Button, NumberInput } from "@/components/common";
import { useInputState } from "@/hooks";
import { fPointCheck } from "@/helpers/utils/numberValidation";

const AuctionBidForm = ({ auctionStatus, lowPrice }: AuctionBidFormNotStartProps) => {
  const checkInputValidation = useCallback(
    (value: string) => {
      setInputStatus(true);

      if (Number(value) < lowPrice) {
        setInputStatus(false);
        setErrorMessage("최소 경매 시작 금액 이상을 입력해주세요");
        setButtonStatus(true);
        return value;
      }

      if (!fPointCheck(value, 4)) {
        setInputStatus(false);
        setErrorMessage("소수점은 4자리까지 입력 할 수 있습니다");
        setButtonStatus(true);
        return value;
      }

      setButtonStatus(false);
      return value;
    },
    [lowPrice]
  );

  const [value, handleInputChange] = useInputState("", checkInputValidation);
  const [inputStatus, setInputStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonStatus, setButtonStatus] = useState(true);
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
          <div>
            <NumberInput
              id="auction-bid"
              value={value}
              min={lowPrice}
              handleValueChange={handleInputChange}
              status={inputStatus}
              errorMessage={errorMessage}
            />
          </div>
        </div>
        <div
          className={`${style.NFT_detail_transaction_button} ${style[`status-${auctionStatus}`]}`}>
          <Button bg="primary" size="fillContainer" disabled={buttonStatus}>
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
