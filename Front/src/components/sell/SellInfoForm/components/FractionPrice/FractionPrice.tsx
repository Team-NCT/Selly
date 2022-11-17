import style from "./FractionPrice.module.scss";
import { Label, NumberInput } from "@/components/common";
import { FractionPriceProps } from "./FractionPrice.types";
import { useState, useEffect } from "react";
import { isNumber, numberinRange, fPointCheck } from "@/helpers/utils/numberValidation";

const FractionPrice = ({ value, changeHandler, setIsPriceTrue }: FractionPriceProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);

  useEffect(() => {
    if (!value) {
      setStatus(true);
      setIsPriceTrue(false);
      return;
    }
    if (!isNumber(value) || Number(value) > Number.MAX_SAFE_INTEGER) {
      setErrorMessage("입력 가능한 값이 초과되었습니다.");
      setStatus(false);
      setIsPriceTrue(false);
      return;
    }
    if (!isNumber(value) || !numberinRange(Number.MAX_SAFE_INTEGER, -1, value)) {
      setErrorMessage("0보다 큰 값을 입력해주세요");
      setStatus(false);
      setIsPriceTrue(false);
      return;
    }
    if (!fPointCheck(value, 4)) {
      setErrorMessage("소수점은 4자리까지 입력 할 수 있습니다");
      setStatus(false);
      setIsPriceTrue(false);
      return;
    }
    setStatus(true);
    setIsPriceTrue(true);
  }, [value]);

  return (
    <div className={style.fraction_price}>
      <h2 className={style.fraction_price_label}>
        <Label
          color="sherbet"
          positionH="bottom"
          positionW="right"
          id="fraction-price"
          width={46}
          horizontal={8}>
          조각 당 가격
        </Label>
      </h2>
      <NumberInput
        id="fraction-price"
        value={value}
        handleValueChange={changeHandler}
        name="price"
        status={status}
        errorMessage={errorMessage}
        placeHolder="0.0"
      />
    </div>
  );
};

export default FractionPrice;
