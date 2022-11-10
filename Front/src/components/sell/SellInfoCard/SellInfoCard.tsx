import style from "./SellInfoCard.module.scss";
import { Button, Neon } from "@/components/common";
import { selectSellInfo } from "@/store/sellInfoSlice";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { openConfirm } from "@/store/modalSlice";

const SellInfoCard = () => {
  const dispatch = useAppDispatch();
  const sellInfo = useAppSelector(selectSellInfo);

  const editHandler = () => {
    dispatch(openConfirm());
  };

  return (
    <article className={style.sell_info_card}>
      <h2>
        <Neon color="lilac" positionH="bottom" positionW="right">
          카테고리
        </Neon>
        <span>{sellInfo.category}</span>
      </h2>
      <h2>
        <Neon color="lilac" positionH="bottom" positionW="right">
          조각 코드
        </Neon>
        <span>{sellInfo.code}</span>
      </h2>
      <h2>
        <Neon color="lilac" positionH="bottom" positionW="right">
          조각 개수
        </Neon>
        <span>{sellInfo.num}</span>
      </h2>
      <h2>
        <Neon color="lilac" positionH="bottom" positionW="right">
          조각 당 가격
        </Neon>
        <span>{sellInfo.price}</span>
      </h2>
      <h2>
        <Neon color="lilac" positionH="bottom" positionW="right">
          총 가격
        </Neon>
        <span>{Number(sellInfo.num) * Number(sellInfo.price)} ETH</span>
      </h2>
      <Button size="fillContainer" onClick={editHandler}>
        EDIT
      </Button>
    </article>
  );
};

export default SellInfoCard;
