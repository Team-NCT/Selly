import style from "./Revenue.module.scss";
import { useFetchRevenueDataQuery } from "@/api/server/userAPI";

const Revenue = () => {
  const { data } = useFetchRevenueDataQuery();
  console.log(data);

  const myMargin = Number(data?.margin.toFixed(4));
  const myMarginnRate =
    data?.marginRate === "NaN" ? 0 : Number(Number(data?.marginRate).toFixed(2));

  return (
    <section className={style.section}>
      <div className={style.column}>
        <div>
          <div className={style.tile}>총 자산</div>
          <div className={style.content}>{data?.totalAssetValue.toFixed(4)} ETH</div>
        </div>
        <div>
          <div className={style.tile}>투자 원금</div>
          <div className={style.content}>{data?.principal.toFixed(4)} ETH</div>
        </div>
        <div>
          <div className={style.tile}>총 손익</div>
          <div className={style.content}>
            {myMargin === 0 && <span>-</span>}
            {myMargin > 0 && <span className={style.plus}>+{myMargin} ETH</span>}
            {myMargin < 0 && <span className={style.minus}>{myMargin} ETH</span>}
          </div>
        </div>
        <div className={style.rate}>
          <div className={style.tile}>수익률</div>
          <div className={style.content}>
            {myMarginnRate === 0 && <span>-</span>}
            {myMarginnRate > 0 && <span className={style.plus}>+{myMarginnRate}%</span>}
            {myMarginnRate < 0 && <span className={style.minus}>{myMarginnRate}%</span>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Revenue;
