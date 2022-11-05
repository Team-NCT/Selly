import { useState } from "react";
import style from "./AuctionRegisterForm.module.scss";
import { AuctionRegisterFormProps } from "./AuctionRegisterForm.types";
import { Button, NumberInput } from "@/components/common";
import { useInputState } from "@/hooks";

const AuctionRegisterForm = ({ auctionStatus }: AuctionRegisterFormProps) => {
  const [value, handleInputChange] = useInputState();
  const [inputStatus, setInputStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
          <NumberInput
            id="auction-register"
            value={value}
            handleValueChange={handleInputChange}
            status={inputStatus}
            errorMessage={errorMessage}
            disabled={!auctionStatus}
          />
        </div>
        <Button bg="primary" size="fillContainer">
          경매 시작하기
        </Button>
      </form>
    </>
  );
};

export default AuctionRegisterForm;
