import { FormEvent, useState, useReducer, ChangeEvent, useEffect } from "react";
import { Modal, Label, NumberInput, Button } from "@/components/common";
import { useAppDispatch } from "@/hooks";
import { closeSell } from "@/store/modalSlice";
import style from "./TransactionFractionsSell.module.scss";
import { fPointCheck } from "@/helpers/utils/numberValidation";
import { numberAddComma } from "@/helpers/utils/numberConversion";
import { inputAction, inputType } from "./TransactionFractionsSell.types";
import {
  useFetchOwnedNFTCountQuery,
  useRegisterSellNFTFractionMutation,
} from "@/api/server/NFTTransactionAPI";
import { TransactionFractionsBuyProps } from "../";

const sellReducer = (state: inputType, action: inputAction) => {
  switch (action.type) {
    case "MAX_ERROR":
      return {
        value: action.payload,
        status: false,
        errorMessage: "보유 수량 보다 많습니다",
        buttonStatus: true,
      };
    case "ZERO_ERROR":
      return {
        value: action.payload,
        status: false,
        errorMessage: "0보다 큰 값을 입력해주세요",
        buttonStatus: true,
      };
    case "DECIMAL_ERROR":
      return {
        value: action.payload,
        status: false,
        errorMessage: "소수점은 입력할 수 없습니다",
        buttonStatus: true,
      };
    case "DECIMAL_FOUR_ERROR":
      return {
        value: action.payload,
        status: false,
        errorMessage: "소수점은 4자리까지 입력 할 수 있습니다",
        buttonStatus: true,
      };
    case "NORMAL":
      return { value: action.payload, status: true, errorMessage: "", buttonStatus: false };
    case "RESET":
      return { ...state, status: true, value: action.payload };
  }
};

const initialState: inputType = {
  value: "",
  errorMessage: "",
  buttonStatus: true,
  status: true,
};

const TransactionFractionsSell = ({ address, articleId, userId }: TransactionFractionsBuyProps) => {
  const dispatch = useAppDispatch();
  const [registerSellNFTFraction] = useRegisterSellNFTFractionMutation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [countState, dispatchCount] = useReducer(sellReducer, initialState);
  const [priceState, dispatchPrice] = useReducer(sellReducer, initialState);
  const [ownNFT, setOwnNFT] = useState(0);
  const { data, isSuccess } = useFetchOwnedNFTCountQuery({
    articleId,
    userId: userId ? userId : NaN,
  });

  useEffect(() => {
    if (!isSuccess) return;
    setOwnNFT(data);
  }, [isSuccess, data]);

  //* 개수 인풋 유효성 검사
  const handleCountInputChange = (event: ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    const numValue = Number(value);
    dispatchCount({ type: "RESET", payload: value });
    if (numValue <= 0) {
      return dispatchCount({ type: "ZERO_ERROR", payload: value });
    }
    if (!(numValue <= ownNFT)) {
      return dispatchCount({ type: "MAX_ERROR", payload: value });
    }

    if (!fPointCheck(value, 0)) {
      return dispatchCount({ type: "DECIMAL_ERROR", payload: value });
    }

    if (priceState.status) {
      setTotalPrice(numValue * Number(priceState.value));
    }
    return dispatchCount({ type: "NORMAL", payload: value });
  };

  //* 가격 인풋 유효성 검사
  const handlePriceInputChange = (event: ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    const numValue = Number(value);
    dispatchPrice({ type: "RESET", payload: value });
    if (numValue <= 0) {
      return dispatchPrice({ type: "ZERO_ERROR", payload: value });
    }

    if (!fPointCheck(value, 4)) {
      return dispatchPrice({ type: "DECIMAL_FOUR_ERROR", payload: value });
    }

    if (countState.status) {
      setTotalPrice(numValue * Number(countState.value));
    }
    return dispatchPrice({ type: "NORMAL", payload: value });
  };

  //TODO_JK: NFT Detail 데이터 fetch API 연결 후 로직 구현 (전송 로직)
  const handlerFormSumbit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = {};
    // await registerSellNFTFraction(payload);
  };

  return (
    <Modal close={() => dispatch(closeSell())}>
      <form className={style.NFT_detail_sell} onSubmit={handlerFormSumbit}>
        <h1>조각 판매</h1>
        <section className={style.NFT_detail_sell_input}>
          <div className={style.NFT_detail_sell_input_count}>
            <Label id="sell-fraction" color="lilac150" positionH="bottom" positionW="right">
              판매 개수
            </Label>
            <span className={style.NFT_detail_sell_input_description}>
              판매 가능한 개수: {numberAddComma(ownNFT)} 개
            </span>
            <div>
              <NumberInput
                id="sell-fraction"
                value={countState.value}
                status={countState.status}
                errorMessage={countState.errorMessage}
                handleValueChange={handleCountInputChange}
              />
            </div>
          </div>
          <div className={style.NFT_detail_sell_input_price}>
            <Label id="sell-fraction" color="lilac150" positionH="bottom" positionW="right">
              조각당 가격
            </Label>
            <div>
              <NumberInput
                id="sell-fraction"
                value={priceState.value}
                status={priceState.status}
                errorMessage={priceState.errorMessage}
                handleValueChange={handlePriceInputChange}
              />
            </div>
          </div>
        </section>
        <div className={style.NFT_detail_sell_price}>
          <p>
            예상 수익: 약 &nbsp;
            {fPointCheck(totalPrice.toString(), 4) ? totalPrice : totalPrice.toFixed(4)} ETH{" "}
          </p>
        </div>
        <Button
          size="fillContainer"
          disabled={!(!countState.buttonStatus && !priceState.buttonStatus)}>
          조각 판매하기
        </Button>
      </form>
    </Modal>
  );
};

export default TransactionFractionsSell;
