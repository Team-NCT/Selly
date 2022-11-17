import style from "./Revenue.module.scss";
import { useFetchRevenueDataQuery } from "@/api/server/userAPI";

const Revenue = () => {
  const { data } = useFetchRevenueDataQuery("");

  return (
    <section className={style.section}>
      <div className={style.column}>
        <div>
          <div className={style.tile}>총 자산</div>
          <div className={style.content}>{data?.totalAssetValue} ETH</div>
        </div>
        <div>
          <div className={style.tile}>투자 원금</div>
          <div className={style.content}> {data?.principal} ETH</div>
        </div>
        <div>
          <div className={style.tile}>총 손익</div>
          <div className={style.content}>
            {data?.margin && data.margin >= 0 && (
              <span className={style.plus}> +{data?.margin}</span>
            )}
            {data?.margin && data.margin < 0 && (
              <span className={style.plus}> -{data?.margin}</span>
            )}{" "}
            ETH
          </div>
        </div>
        <div>
          <div className={style.tile}>수익률</div>
          <div className={style.content}>
            {data?.marginRate && data.marginRate >= 0 && (
              <span className={style.plus}> +{data?.marginRate.toFixed(2)}%</span>
            )}
            {data?.marginRate && data.marginRate < 0 && (
              <span className={style.plus}> -{data?.marginRate.toFixed(2)}%</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Revenue;
