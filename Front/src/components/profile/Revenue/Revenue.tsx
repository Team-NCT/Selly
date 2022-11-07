import style from "./Revenue.module.scss";

const Revenue = () => {
  const initialData = {
    totalAssets: "24.0012",
    principal: "16.0000",
    revenue: "7.6821",
    yield: "31.5",
    profit: true,
  };

  return (
    <section className={style.section}>
      <div className={style.column}>
        <div>
          <div className={style.tile}>총자산</div>
          <div className={style.content}>{initialData.totalAssets}ETH</div>
        </div>
        <div>
          <div className={style.tile}>투자 원금</div>
          <div className={style.content}> {initialData.principal}ETH</div>
        </div>
        <div>
          <div className={style.tile}>총 손익</div>
          <div className={style.content}>
            <span className={initialData.profit ? style.plus : style.minus}>
              + {initialData.revenue}
            </span>{" "}
            ETH
          </div>
        </div>
        <div>
          <div className={style.tile}>수익률</div>
          <div className={style.content}>
            <span className={initialData.profit ? style.plus : style.minus}>
              + {initialData.yield}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Revenue;
