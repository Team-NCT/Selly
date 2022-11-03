import { TextInput, Label } from "@/components/common";
import { checkLanguage } from "@/helpers/utils/checkLanguage";
import { useInputState } from "@/hooks";
import { useEffect, useState } from "react";

const Bio = () => {
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
        horizontal={10}
        id="Bio"
        positionH="bottom"
        positionW="right"
        vertical={10}
        width={90}>
        Bio
      </Label>
      <TextInput
        handleInputChange={setUsername}
        id="Bio"
        maxLength={100}
        status={staus}
        value={username}
        errorMessage={errorMessage}
        placeHolder="간단한 소개를 입력해주세요"
      />
    </>
  );
};

export default Bio;
