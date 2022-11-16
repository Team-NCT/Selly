import style from "./FractionNum.module.scss";
import { Label, NumberInput } from "@/components/common";
import { FractionNumProps } from "./FractionNum.types";
import { useEffect, useState } from "react";
import { isNumber, numberinRange, fPointCheck } from "@/helpers/utils/numberValidation";

const FractionNum = ({ value, changeHandler, setIsNumTrue }: FractionNumProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);

  useEffect(() => {
    if (!value) {
      setStatus(true);
      setIsNumTrue(false);
      return;
    }
    if (!isNumber(value) || !numberinRange(10001, 1, value)) {
      setErrorMessage("2와 10000 사이의 값을 입력해주세요");
      setStatus(false);
      setIsNumTrue(false);
      return;
    }
    if (!fPointCheck(value, 0)) {
      setErrorMessage("소수점은 입력할 수 없습니다");
      setStatus(false);
      setIsNumTrue(false);
      return;
    }
    setStatus(true);
    setIsNumTrue(true);
  }, [value]);

  return (
    <div className={style.fraction_num}>
      <h2 className={style.fraction_num_label}>
        <Label color="lilac" positionH="bottom" positionW="right" id="fraction-num">
          조각 개수
        </Label>
      </h2>
      <NumberInput
        id="fraction-num"
        value={value}
        handleValueChange={changeHandler}
        name="num"
        status={status}
        errorMessage={errorMessage}
        max={10000}
        min={2}
        step={1}
        placeHolder="10000"
      />
    </div>
  );
};

export default FractionNum;
