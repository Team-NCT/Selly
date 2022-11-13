import { FormEvent, useState, useCallback } from "react";
import { Modal, Label, NumberInput, Button } from "@/components/common";
import { useInputState, useAppSelector, useAppDispatch } from "@/hooks";
import { selectFraction } from "@/store/fractionSlice";
import { closeBuy } from "@/store/modalSlice";
import style from "./TransactionFractionsBuy.module.scss";
import { fPointCheck } from "@/helpers/utils/numberValidation";
import { useSellNFTFractionMutation } from "@/api/server/NFTTransactionAPI";
import { TransactionFractionsBuyProps } from "./TransactionFractionsBuy.types";
import { sendPayableTransaction } from "@/api/blockchain/sendTransaction";

const TransactionFractionsBuy = ({ articleId, userId, address }: TransactionFractionsBuyProps) => {
  const dispatch = useAppDispatch();
  const { pieceCnt, tradePrice, saleContractAddress, sellerId } = useAppSelector(selectFraction);
  const [sellNFTFraction] = useSellNFTFractionMutation();

  //* 유효성 검사
  const checkInputValidation = useCallback(
    (value: string) => {
      setInputStatus(true);
      if (Number(value) <= 0) {
        setInputStatus(false);
        setErrorMessage("0보다 큰 값을 입력해주세요");
        setButtonStatus(true);
        return value;
      }
      if (!(Number(value) <= pieceCnt)) {
        setInputStatus(false);
        setErrorMessage("구매할 수 없는 수량입니다");
        setButtonStatus(true);
        return value;
      }

      if (!fPointCheck(value, 0)) {
        setInputStatus(false);
        setErrorMessage("소수점은 입력할 수 없습니다");
        setButtonStatus(true);
        return value;
      }

      setTotalPrice(Number(value) * tradePrice);
      setButtonStatus(false);
      return value;
    },
    [pieceCnt, tradePrice]
  );
  const [value, handleInputChange] = useInputState("", checkInputValidation);
  const [inputStatus, setInputStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonStatus, setButtonStatus] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  //* 구매 요청 함수
  const handlerFormSumbit = async (event: FormEvent) => {
    event.preventDefault();
    if (!userId || !address) return;
    const payload = {
      buyerId: userId,
      wallet: address,
      articleId,
      sellerId,
      pieceCnt,
      tradePrice,
      saleContractAddress,
    };

    try {
      const response = await sellNFTFraction(payload).unwrap();
      const data = await sendPayableTransaction(response);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal close={() => dispatch(closeBuy())}>
      <form className={style.NFT_detail_buy} onSubmit={handlerFormSumbit}>
        <h1>조각 구매</h1>
        <section className={style.NFT_detail_buy_input}>
          <Label id="buy-fraction" color="lilac150" positionH="bottom" positionW="right">
            구매 조각 개수
          </Label>
          <p className={style.NFT_detail_buy_input_description}>
            구매할 수 있는 조각 개수: {pieceCnt} 개
          </p>
          <p className={style.NFT_detail_buy_input_description}>
            선택된 조각 가격: {tradePrice} ETH
          </p>
          <div>
            <NumberInput
              id="buy-fraction"
              value={value}
              status={inputStatus}
              errorMessage={errorMessage}
              handleValueChange={handleInputChange}
            />
          </div>
        </section>
        <div className={style.NFT_detail_buy_price}>
          <p>지불 금액(가스비 제외): </p>
          <p>
            약 {fPointCheck(totalPrice.toString(), 4) ? totalPrice : totalPrice.toFixed(4)} ETH{" "}
          </p>
        </div>
        <Button size="fillContainer" disabled={buttonStatus}>
          조각 구매하기
        </Button>
      </form>
    </Modal>
  );
};

export default TransactionFractionsBuy;
