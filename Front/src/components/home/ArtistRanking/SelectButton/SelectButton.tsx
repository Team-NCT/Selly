import { Neon } from "@/components/common";
import { useEffect, useState } from "react";
import { SelectButtonProps } from "./SelectButton.types";
import style from "./SelectButton.module.scss";

const SelectButton = (props: SelectButtonProps) => {
  //* 현재 trending이 선택되었는지의 여부
  const [isTrending, setIsTrending] = useState(true);
  useEffect(() => {
    props.setIsTrending(isTrending);
  }, [isTrending, props]);

  return (
    <div className={style.selct_container}>
      <button onClick={() => setIsTrending(true)}>
        {isTrending ? (
          <Neon color="lilac" positionH="bottom" positionW="right">
            <span className={style.item_active}>Trending</span>
          </Neon>
        ) : (
          <span className={style.item_inactive}>Trending</span>
        )}
      </button>
      <button onClick={() => setIsTrending(false)}>
        {isTrending ? (
          <span className={style.item_inactive}>Total</span>
        ) : (
          <Neon color="lilac" positionH="bottom" positionW="right">
            <span className={style.item_active}>Total</span>
          </Neon>
        )}
      </button>
    </div>
  );
};

export default SelectButton;
