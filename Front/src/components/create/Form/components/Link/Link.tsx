import { Label, TextInput } from "@/components/common";
import { useInputState } from "@/hooks";
import style from "./Link.module.scss";
import form_style from "../../Form.module.scss";
import { useEffect, useState } from "react";
import { checkUrl } from "@/helpers/utils/checkUrl";
import { LinkProps } from "../../Form.types";

const Link = ({ setIsLinkTrue }: LinkProps) => {
  const [value, handleInputChange] = useInputState();
  //* value가 빈 값이거나 url형식이 맞다면 true, 형식이 맞지 않다면 false
  const [isTrue, setIsTrue] = useState<boolean>(true);
  useEffect(() => {
    const debounce = setTimeout(async () => {
      setIsTrue(false);
      if (value.trim().length === 0) {
        setIsTrue(true);
      } else {
        setIsTrue(checkUrl(value));
      }
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [value]);
  useEffect(() => {
    setIsLinkTrue(isTrue);
  }, [isTrue, setIsLinkTrue]);
  return (
    <div className={form_style.form_item}>
      <Label
        color="marmalade"
        positionH="bottom"
        positionW="right"
        id="create-link"
        width={25}
        horizontal={5}>
        <h2 className={form_style.form_title}>External Link</h2>
      </Label>
      <TextInput
        id="create-link"
        value={value}
        handleInputChange={handleInputChange}
        maxLength={100}
        status={isTrue}
        placeHolder="해당 작품에 연결하고 싶은 사이트 링크를 입력해주세요."
        errorMessage="Link는 http:// 혹은 https://로 시작해야 합니다."></TextInput>
      <p className={style.input_desc}>최대 100글자까지 입력 가능합니다.</p>
    </div>
  );
};

export default Link;
