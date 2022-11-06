import { SellInfoFormProps } from "./SellInfoForm.types";
import style from "./SellInfoForm.module.scss";
import React, { useState } from "react";
import { Button } from "@/components";
import { FractionCode, FractionNum, FractionPrice, Category } from "./components";
import { setSellInfo, SellInfoState } from "@/store/sellInfoSlice";
import { useAppDispatch } from "@/hooks";

const SellInfoForm = ({ step, changeStep }: SellInfoFormProps) => {
  const [submittable, setSubmittable] = useState(true);
  const [values, setValues] = useState<SellInfoState>({
    category: "Digital",
    code: "",
    num: "",
    price: "",
  });

  const dispatch = useAppDispatch();
  // TODO_YK: 각 인풋폼의 유효성 검사 정확히 만들기
  // TODO_YK: 카드 선택 + 유효성 검사 만족시 버튼 disabled false로 만드는 로직 추가하기
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

  const editHandler = (event: React.MouseEvent) => {
    // submit 이벤트 방지
    event.preventDefault();
    changeStep("SELECT");
  };

  // TODO_YK: 총 가격 연산 식 제대로 만들기
  return (
    <article>
      <form
        id="sell-info-form"
        className={style.sell_info_form}
        onSubmit={(e) => submitHandler(e, values)}>
        <Category value={values.category} changeHandler={changeHandler} />
        <FractionCode value={values.code} changeHandler={changeHandler} />
        <FractionNum value={values.num} changeHandler={changeHandler} />
        <FractionPrice value={values.price} changeHandler={changeHandler} />
        <h2 className={style.total_price}>
          <p>총 가격</p>
          <p>{values.num * values.price} ETH</p>
        </h2>
        {step === "SELECT" && (
          <Button size="fillContainer" disabled={!submittable}>
            Continue
          </Button>
        )}
        {step === "SIGN" && (
          <Button size="fillContainer" onClick={editHandler}>
            EDIT
          </Button>
        )}
      </form>
    </article>
  );
};
export default SellInfoForm;
