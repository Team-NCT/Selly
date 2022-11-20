import { Neon } from "@/components/common";
import { useEffect, useState } from "react";
import { SelectButtonProps } from "./SelectButton.types";
import style from "./SelectButton.module.scss";

const SelectButton = (props: SelectButtonProps) => {
  //* 현재 total이 선택되었는지의 여부
  const [isTotal, setIsTotal] = useState(true);
  useEffect(() => {
    props.setIsTotal(isTotal);
  }, [isTotal, props]);

  return (
    <div className={style.selct_container}>
      <button onClick={() => setIsTotal(true)}>
        {isTotal ? (
          <Neon color="lilac" positionH="bottom" positionW="right">
            <span className={style.item_active}>Trend</span>
          </Neon>
        ) : (
          <span className={style.item_inactive}>Trend</span>
        )}
      </button>
      <button onClick={() => setIsTotal(false)}>
        {isTotal ? (
          <span className={style.item_inactive}>Follow</span>
        ) : (
          <Neon color="lilac" positionH="bottom" positionW="right">
            <span className={style.item_active}>Follow</span>
          </Neon>
        )}
      </button>
    </div>
  );
};

export default SelectButton;
