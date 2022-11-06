import { useState, useCallback } from "react";
import style from "./AuctionBidForm.module.scss";
import { Button, NumberInput } from "@/components/common";
import { AuctionBidFormProps } from "./AuctionBidForm.types";
import { useInputState } from "@/hooks";
import { fPointCheck } from "@/helpers/utils/numberValidation";

const AuctionBidForm = ({ auctionEndTime, auctionStatus, bidPrice }: AuctionBidFormProps) => {
  const checkInputValidation = useCallback(
    (value: string) => {
      setInputStatus(true);

      if (Number(value) <= bidPrice) {
        setInputStatus(false);
        setErrorMessage("현재 입찰 가격보다 큰 금액을 입력해주세요");
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
    [bidPrice]
  );
  const [value, handleInputChange] = useInputState("", checkInputValidation);
  const [inputStatus, setInputStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonStatus, setButtonStatus] = useState(true);

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
          <div>
            <NumberInput
              id="auction-bid"
              value={value}
              min={bidPrice}
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
