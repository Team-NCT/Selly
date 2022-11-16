import { TextInput, Label } from "@/components/common";
import { checkBadWord, checkValueLength } from "@/helpers/utils/checkLanguage";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { setIntroduction, selectProfileData } from "@/store/profileDataSlice";
import { setBioStatus } from "@/store/profileStatusSlice";

import { useEffect, useState } from "react";
import style from "./Bio.module.scss";

const Bio = () => {
  const [status, setStatus] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  const { introduction } = useAppSelector(selectProfileData);

  const changeBio = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    dispatch(setIntroduction(form.value));
  };

  useEffect(() => {
    const debounce = setTimeout(async () => {
      setStatus(false);
      if (!checkBadWord(introduction)) {
        setError("비속어가 포함되어 있습니다.");
      } else if (!checkValueLength(introduction.trim(), 5)) {
        setError("5글자 이상 입력헤 주세요");
      } else {
        setStatus(true);
      }
      dispatch(setBioStatus(status && !!introduction));
    }, 200);

    return () => {
      clearTimeout(debounce);
    };
  }, [introduction, status, dispatch]);

  return (
    <section className={style.section}>
      <Label
        color="ocean"
        height={60}
        horizontal={10}
        id="Bio"
        positionH="bottom"
        positionW="right"
        vertical={10}
        width={90}>
        <span className={style.text}>Bio</span>
      </Label>
      {introduction ? "" : <span className={style.caption_danger}>*</span>}
      <TextInput
        handleInputChange={changeBio}
        id="Bio"
        maxLength={100}
        status={status}
        value={introduction}
        errorMessage={error}
        placeHolder="한 줄 소개를 입력해 주세요."
      />
    </section>
  );
};

export default Bio;
