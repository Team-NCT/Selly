import { useCheckUserNickNameQuery } from "@/api/server/userAPI";
import { TextInput, Label } from "@/components/common";
import { checkNumEngKor, checkBadWord, checkValueLength } from "@/helpers/utils/checkLanguage";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { selectProfileData } from "@/store/profileDataSlice";
import { setUsernameStatus } from "@/store/profileStatusSlice";
import { useEffect, useState } from "react";
import style from "./Username.module.scss";

const Username = () => {
  const [status, setStatus] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const dispatch = useAppDispatch();
  const { nickname } = useAppSelector(selectProfileData);
  const fetchName = username ? (username === nickname ? "_" : username) : "_";
  const checkNickname = useCheckUserNickNameQuery(fetchName);
  const isChecked = checkNickname.error?.data || "";

  const changeUsername = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    setUsername(form.value);
  };

  useEffect(() => {
    const debounce = setTimeout(async () => {
      setStatus(false);
      if (isChecked === "중복된 닉네임입니다.") {
        setError("닉네임이 중복되었습니다.");
      } else if (!checkNumEngKor(username)) {
        setError("한글, 영어, 숫자의 조합만 가능합니다.");
      } else if (!checkBadWord(username)) {
        setError("비속어가 포함되어 있습니다.");
      } else if (!checkValueLength(username.trim(), 2)) {
        setError("닉네임은 최소 2글자입니다.");
      } else {
        setStatus(true);
      }
      dispatch(setUsernameStatus(status && !!username));
    }, 200);

    return () => {
      clearTimeout(debounce);
    };
  }, [username, status, dispatch, isChecked]);

  useEffect(() => {
    setUsername(nickname);
  }, [setUsername, nickname]);

  return (
    <section className={style.section}>
      <Label
        color="ocean"
        height={60}
        horizontal={2}
        id="username"
        positionH="bottom"
        positionW="right"
        vertical={10}
        width={25}>
        <span className={style.text}>Username</span>
      </Label>
      {username ? "" : <span className={style.caption_danger}>*</span>}
      <TextInput
        handleInputChange={changeUsername}
        id="username"
        maxLength={12}
        status={status}
        value={username}
        errorMessage={error}
        placeHolder="닉네임을 입력해 주세요."
      />
    </section>
  );
};

export default Username;
