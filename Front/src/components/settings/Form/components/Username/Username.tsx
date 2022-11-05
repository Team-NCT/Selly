import { TextInput, Label } from "@/components/common";
import { checkNumEngKor } from "@/helpers/utils/checkLanguage";
import { useInputState } from "@/hooks";
import { useEffect, useState } from "react";
import style from "./Username.module.scss";

const Username = () => {
  const [username, setUsername] = useInputState();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [staus, setStaus] = useState<boolean>(true);

  useEffect(() => {
    if (!checkNumEngKor(username)) {
      setErrorMessage("한글, 영어, 숫자의 조합만 가능합니다.");
      setStaus(false);
    } else {
      setStaus(true);
    }
  }, [username]);

  return (
    <section className={style.section}>
      <Label
        color="ocean"
        height={60}
        horizontal={5}
        id="username"
        positionH="bottom"
        positionW="right"
        vertical={10}
        width={25}>
        <span className={style.text}>Username</span>
      </Label>
      <TextInput
        handleInputChange={setUsername}
        id="username"
        maxLength={12}
        status={staus}
        value={username}
        errorMessage={errorMessage}
        placeHolder="닉네임을 입력해 주세요."
      />
    </section>
  );
};

export default Username;
