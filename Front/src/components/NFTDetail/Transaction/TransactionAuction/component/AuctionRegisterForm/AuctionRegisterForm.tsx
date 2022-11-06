import { useState, useCallback } from "react";
import style from "./AuctionRegisterForm.module.scss";
import { AuctionRegisterFormProps } from "./AuctionRegisterForm.types";
import { Button, NumberInput } from "@/components/common";
import { useInputState } from "@/hooks";
import { fPointCheck } from "@/helpers/utils/numberValidation";

const AuctionRegisterForm = ({ auctionStatus }: AuctionRegisterFormProps) => {
  const checkInputValidation = useCallback((value: string) => {
    setInputStatus(true);

    if (Number(value) <= 0) {
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
  }, []);

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
            <strong>설정 안됨</strong>
          </p>
        </div>
        <div className={style.NFT_detail_transaction_price_description}>
          <p>경매 최소 시작가를 입찰하면, </p>
          <p>
            경매가 시작되고 <strong>3일 동안 </strong>
            진행됩니다.
          </p>
        </div>
      </section>
      <form className={style.NFT_detail_transaction_form}>
        <div className={style.NFT_detail_transaction_input}>
          <label htmlFor="auction-register"> 경매 최소 시작가</label>
          <div>
            <NumberInput
              id="auction-register"
              value={value}
              handleValueChange={handleInputChange}
              status={inputStatus}
              errorMessage={errorMessage}
              disabled={!auctionStatus}
            />
          </div>
        </div>
        <Button bg="primary" size="fillContainer" disabled={buttonStatus}>
          경매 시작하기
        </Button>
      </form>
    </>
  );
};

export default AuctionRegisterForm;
