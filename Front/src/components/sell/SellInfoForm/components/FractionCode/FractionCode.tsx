import style from "./FractionCode.module.scss";
import { Label, TextInput } from "@/components/common";
import { FractionCodeProps } from "./FractionCode.types";
import { useState, useEffect } from "react";
import { checkEnglish } from "@/helpers/utils/checkLanguage";

const FractionCode = ({ value, changeHandler, setIsCodeTrue }: FractionCodeProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);

  useEffect(() => {
    if (!value) {
      setStatus(true);
      setIsCodeTrue(false);
      return;
    }
    if (!checkEnglish.test(value)) {
      setErrorMessage("알파벳만 가능합니다.");
      setStatus(false);
      setIsCodeTrue(false);
    } else {
      setStatus(true);
      setIsCodeTrue(true);
    }
  }, [value]);

  return (
    <div>
      <h2 className={style.fraction_code_label}>
        <Label color="lilac" positionH="bottom" positionW="right" id="fraction-code">
          조각 코드
        </Label>
      </h2>
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
