import { useState } from "react";
import style from "./SignBox.module.scss";
import { SignBoxProps } from "./SignBox.types";
import { Neon, Button } from "@/components";

const SignBox = ({ title, desc, idx, isActive, signFunction, goNext }: SignBoxProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [signable, setSignable] = useState(true);
  const [buttonText, setButtonText] = useState("서명하기");

  const onClickHandler = () => {
    setSignable(false);
    setButtonText("서명 중");
    signFunction().then((res) => {
      if (res) {
        setIsCompleted(true);
        goNext(idx);
      } else {
        setButtonText("서명하기");
        setSignable(true);
        alert("블록체인 통신 상태 ERROR");
        console.error("블록체인 통신 상태 ERROR");
      }
    });
  };

  return (
    <div className={style.sign_box}>
      <div className={isActive || isCompleted ? style.sign_box_idx_active : style.sign_box_idx}>
        {idx}
      </div>
      <div className={style.sign_box_section}>
        <h1 className={style.sign_box_title}>
          <Neon
            color="muscat"
            positionH="top"
            positionW="right"
            width={isActive ? 60 : 0}
            height={70}
            horizontal={4}>
            {title}
          </Neon>
        </h1>
        <p className={style.sign_box_desc}>{desc}</p>
        {isActive && (
          <Button size="fillContainer" onClick={onClickHandler} disabled={!signable}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};
export default SignBox;
