import style from "./FractionPrice.module.scss";
import { Label, NumberInput } from "@/components/common";
import { FractionPriceProps } from "./FractionPrice.types";
import { useState, useEffect } from "react";
import { isNumber, numberinRange, fPointCheck } from "@/helpers/utils/numberValidation";

const FractionPrice = ({ value, changeHandler, setIsPriceTrue }: FractionPriceProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);

  useEffect(() => {
    if (!value) return;
    if (!isNumber(value) || !numberinRange(99999, 0, value) || !fPointCheck(value, 4)) {
      setErrorMessage("소수점은 4자리까지 입력하실 수 있습니다.");
      setStatus(false);
      setIsPriceTrue(false);
    } else {
      setStatus(true);
      setIsPriceTrue(true);
    }
  }, [value]);

  return (
    <div>
      <h2 className={style.fraction_price_label}>
        <Label color="marmalade" positionH="bottom" positionW="right" id="fraction-price">
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
        step={1}
        placeHolder="0.0"
      />
    </div>
  );
};

export default FractionPrice;