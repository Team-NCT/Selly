import { SignBoxProps } from "./SignBox.types";
import style from "./SignBox.module.scss";
import { Neon, Button } from "@/components";

const SignBox = ({ title, desc, idx, isActive, signFunction, goNext }: SignBoxProps) => {
  const onClickHandler = () => {
    signFunction();
    goNext(idx);
  };

  return (
    <div className={style.sign_box}>
      <div className={isActive ? style.sign_box_idx_active : style.sign_box_idx}>{idx}</div>
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
          <Button size="fillContainer" onClick={onClickHandler}>
            서명하기
          </Button>
        )}
      </div>
    </div>
  );
};
export default SignBox;
