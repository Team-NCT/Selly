import { TextInput, Label } from "@/components/common";
import { checkLanguage } from "@/helpers/utils/checkLanguage";
import { useInputState } from "@/hooks";
import { useEffect, useState } from "react";

const Username = () => {
  const [username, setUsername] = useInputState();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [staus, setStaus] = useState<boolean>(true);

  useEffect(() => {
    if (!checkLanguage(username)) {
      setErrorMessage("한글, 영어, 숫자의 조합만 가능합니다.");
      setStaus(false);
    } else {
      setStaus(true);
    }
  }, [username]);

  return (
    <>
      <Label
        color="ocean"
        height={60}
        horizontal={5}
        id="username"
        positionH="bottom"
        positionW="right"
        vertical={10}
        width={25}>
        Username
      </Label>
      <TextInput
        handleInputChange={setUsername}
        id="username"
        maxLength={12}
        status={staus}
        value={username}
        errorMessage={errorMessage}
        placeHolder="닉네임을 입력해 주세요"
      />
    </>
  );
};

export default Username;
