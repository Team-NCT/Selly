import { SellInfoFormProps } from "./SellInfoForm.types";
import style from "./SellInfoForm.module.scss";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/common";
import { FractionCode, FractionNum, FractionPrice, Category } from "./components";
import { setSellInfo, SellInfoState, selectSellInfo } from "@/store/sellInfoSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectNFTValue } from "@/store/selectNFTSlice";
import { isNumber } from "@/helpers/utils/numberValidation";

const SellInfoForm = ({ changeStep }: SellInfoFormProps) => {
  const dispatch = useAppDispatch();
  const NFTValue = useAppSelector(selectNFTValue);
  const sellInfo = useAppSelector(selectSellInfo);

  //* 유효성 검사를 모두 통과하면 Continue 버튼이 활성화된다.
  const [isCodeTrue, setIsCodeTrue] = useState<boolean>(false);
  const [isNumTrue, setIsNumTrue] = useState<boolean>(false);
  const [isPriceTrue, setIsPriceTrue] = useState<boolean>(false);
  const [submittable, setSubmittable] = useState(false);
  const [values, setValues] = useState<SellInfoState>(sellInfo);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // TODO_YK: 각 인풋폼의 유효성 검사 정확히 만들기

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event: React.FormEvent, values: SellInfoState) => {
    event.preventDefault();
    dispatch(setSellInfo(values));
    changeStep("SIGN");
  };

  //TODO_YK 유효성 검사 제대로 만들기
  //* 3가지 유효성 검사를 모두 통과 + 카드가 선택되면 Continue 활성화
  useEffect(() => {
    if (isCodeTrue && isNumTrue && isPriceTrue && NFTValue.CA) {
      setSubmittable(true);
    } else {
      setSubmittable(false);
    }
  }, [isCodeTrue, isNumTrue, isPriceTrue, NFTValue]);

  // TODO_YK: 총 가격 연산 식 제대로 만들기
  useEffect(() => {
    if (isNumber(values.num) && isNumber(values.price)) {
      setTotalPrice(Number(values.num) * Number(values.price));
      return;
    }
    setTotalPrice(0);
  }, [values.num, values.price]);

  return (
    <article>
      <form
        id="sell-info-form"
        className={style.sell_info_form}
        onSubmit={(e) => submitHandler(e, values)}>
        <Category value={values.category} changeHandler={changeHandler} />
        <FractionCode
          value={values.code}
          changeHandler={changeHandler}
          setIsCodeTrue={setIsCodeTrue}
        />
        <FractionNum value={values.num} changeHandler={changeHandler} setIsNumTrue={setIsNumTrue} />
        <FractionPrice
          value={values.price}
          changeHandler={changeHandler}
          setIsPriceTrue={setIsPriceTrue}
        />
        <div className={style.total_price}>
          <p>총 가격</p>
          <p>{values.num * values.price} ETH</p>
          <p>{totalPrice} ETH</p>
        </div>
        <Button size="fillContainer" disabled={!submittable}>
          Continue
        </Button>
      </form>
    </article>
  );
};
export default SellInfoForm;
