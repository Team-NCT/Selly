import { TextInput, Label } from "@/components/common";
import { checkBadWord, checkValueLength } from "@/helpers/utils/checkLanguage";
import { useInputState } from "@/hooks";
import { useAppDispatch } from "@/hooks/useStore";
import { setBioStatus } from "@/store/profileStatusSlice";

import { useEffect, useState } from "react";
import style from "./Bio.module.scss";

export interface initialProps {
  initialBio: string;
}

const Bio = ({ initialBio }: initialProps) => {
  const [bio, setBio] = useInputState(initialBio);
  const [status, setStatus] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const debounce = setTimeout(async () => {
      setStatus(false);
      if (!checkBadWord(bio)) {
        setError("비속어가 포함되어 있습니다.");
      } else if (!checkValueLength(bio.trim(), 5)) {
        setError("5글자 이상 입력헤 주세요");
      } else {
        setStatus(true);
      }
      dispatch(setBioStatus(status && !!bio));
    }, 200);

    return () => {
      clearTimeout(debounce);
    };
  }, [bio, status, dispatch]);

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
      {bio ? "" : <span className={style.caption_danger}>*</span>}
      <TextInput
        handleInputChange={setBio}
        id="Bio"
        maxLength={100}
        status={status}
        value={bio}
        errorMessage={error}
        placeHolder="한 줄 소개를 입력해 주세요."
      />
    </section>
  );
};

export default Bio;
