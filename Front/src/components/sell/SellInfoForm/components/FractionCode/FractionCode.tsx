import style from "./FractionCode.module.scss";
import { TextInput } from "@/components/common";
import { FractionCodeProps } from "./FractionCode.types";
import { useState, useEffect } from "react";
import { checkNumEng } from "@/helpers/utils/checkLanguage";

const FractionCode = ({ value, changeHandler, setIsCodeTrue }: FractionCodeProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);

  useEffect(() => {
    if (!value) {
      setStatus(true);
      setIsCodeTrue(false);
      return;
    }
    if (!checkNumEng(value)) {
      setErrorMessage("영문자와 숫자만 입력해주세요");
      setStatus(false);
      setIsCodeTrue(false);
      return;
    }
    setStatus(true);
    setIsCodeTrue(true);
  }, [value]);

  return (
    <div className={style.fraction_code}>
      <h2 className={style.fraction_code_label}>조각 이름</h2>
      <TextInput
        id="fraction-code"
        value={value}
        handleInputChange={changeHandler}
        name="code"
        maxLength={20}
        minLength={1}
        status={status}
        errorMessage={errorMessage}
        placeHolder="e.g SSF"
      />
    </div>
  );
};

export default FractionCode;
