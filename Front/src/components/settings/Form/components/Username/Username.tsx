import { TextInput, Label } from "@/components/common";
import { checkNumEngKor, checkBadWord, checkValueLength } from "@/helpers/utils/checkLanguage";
import { selectAccount } from "@/store/loginSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setNickname, selectProfileData } from "@/store/profileDataSlice";
import { setUsernameStatus } from "@/store/profileStatusSlice";
import { useEffect, useState } from "react";
import style from "./Username.module.scss";

const Username = () => {
  const { account } = useAppSelector(selectAccount);
  const [status, setStatus] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  const { profileData } = useAppSelector(selectProfileData);

  const changeUsername = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    dispatch(setNickname(form.value));
  };

  useEffect(() => {
    const debounce = setTimeout(async () => {
      setStatus(false);
      if (account.nickname === profileData.nickname) {
        setError("닉네임이 중복되었습니다.");
      } else if (!checkNumEngKor(profileData.nickname)) {
        setError("한글, 영어, 숫자의 조합만 가능합니다.");
      } else if (!checkBadWord(profileData.nickname)) {
        setError("비속어가 포함되어 있습니다.");
      } else if (!checkValueLength(profileData.nickname.trim(), 2)) {
        setError("닉네임은 최소 2글자입니다.");
      } else {
        setStatus(true);
      }
      dispatch(setUsernameStatus(status && !!profileData.nickname));
    }, 200);

    return () => {
      clearTimeout(debounce);
    };
  }, [profileData.nickname, status, dispatch, account]);

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
      {profileData.nickname ? "" : <span className={style.caption_danger}>*</span>}
      <TextInput
        handleInputChange={changeUsername}
        id="username"
        maxLength={12}
        status={status}
        value={profileData.nickname}
        errorMessage={error}
        placeHolder="닉네임을 입력해 주세요."
      />
    </section>
  );
};

export default Username;
