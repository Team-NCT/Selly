import { useState, useCallback } from "react";
import style from "./TransactionAuction.module.scss";
import { TransactionAuctionProps } from "./TransactionAuction.types";
import { Button, NumberInput } from "@/components/common";
import { useInputState } from "@/hooks";
import { isNumber, numberinRange } from "@/helpers/utils/numberValidation";

const TransactionAuction = ({
  lowPrice,
  bidPrice,
  auctionStatus,
  auctionEndTime,
}: TransactionAuctionProps) => {
  //* 유효성 검사 함수
  const checkInputValidation = useCallback((value: string) => {
    return value;
  }, []);

  const [value, handleInputChange] = useInputState("", checkInputValidation);
  const [inputStatus, setInputStatus] = useState(true);
  const [errorMessage, seterrorMessage] = useState("");

  const args = {
    value,
    handleValueChange: handleInputChange,
    status: inputStatus,
    errorMessage: errorMessage,
    min: bidPrice > lowPrice ? bidPrice : lowPrice,
  };

  return (
    <form className={style.NFT_detail_transction_auction}>
      <section className={style.NFT_detail_transaction_description}>
        <p>
          지분을 <strong>50%</strong>이상 소유하고 있으면, 경매를 <strong>등록</strong>할 수
          있습니다. &nbsp;
        </p>
        <p>
          경매를 등록 시, <strong>최소 경매 시작 가격</strong>을 입력 해야 합니다.
        </p>
        <p>
          경매가 종료되면, 조각 소유자들에게 소유 지분 만큼 경매 금액이 <strong>배분</strong>됩니다.
        </p>
      </section>
      <section className={style.NFT_detail_transaction_price}>
        <div className={style.NFT_detail_transaction_price_content}>
          <p>최소 경매 시작 가격</p>
          <p>
            <strong>{lowPrice}</strong> ETH
          </p>
        </div>
        <div className={style.NFT_detail_transaction_price_description}>
          {/* 경매 종료 시간이 없을 때 (입찰이 아직 시작이 안되었을 때) */}
          {!auctionEndTime && (
            <>
              <p>누군가가 경매 최소 시작가를 입찰하면 </p>
              <p>
                경매가 시작되고 <strong>3일 동안 </strong>
                진행됩니다.
              </p>
            </>
          )}

          {/* 경매 종료 시간이 있을 때 (입찰이 시작되었을 때) */}
          {auctionEndTime && (
            <>
              <p>누군가가 경매 최소 시작가를 입찰하면 </p>
              <p>
                경매가 시작되고 <strong>3일 동안 </strong>
                진행됩니다.
              </p>
            </>
          )}
        </div>
      </section>
      <section className={style.NFT_detail_transaction_input}>
        {/* 최소 경매 시작 가격이 없을 때 (경매가 등록되지 않았을 때) */}
        {!lowPrice && (
          <>
            <label htmlFor="auction-register"> 경매 최소 시작가</label>
            <NumberInput
              id="auction-register"
              placeHolder="최소 경매 시작 가격을 입력하세요"
              {...args}
            />
          </>
        )}

        {/* 경매 시작 가격이 있을 때 (경매가 등록되었을 때) */}
        {lowPrice && (
          <>
            <label htmlFor="auction-bid"> 경매 입찰가</label>
            <NumberInput id="auction-bid" placeHolder="입찰가를 입력하세요" {...args} />
          </>
        )}
      </section>

      {/* 조각 보유 지분이 50%이상이면 경매 취소 버튼이 보인다.  */}
      <section
        className={`${style.NFT_detail_transaction_button} ${style[`status-${auctionStatus}`]}`}>
        <Button bg="primary" size="fillContainer">
          경매 참여하기
        </Button>
        <Button
          bg="blackberry"
          color="outline"
          size="fillContainer"
          type="button"
          hidden={!auctionStatus}>
          경매 취소
        </Button>
      </section>
    </form>
  );
};

export default TransactionAuction;
