import style from "./ForSale.module.scss";
import { CardList, Spinner } from "@/components/common";
import { useFetchForSaleDataQuery } from "@/api/server/NFTTransactionAPI";
import { useParams } from "react-router-dom";

const ForSale = () => {
  const params = useParams();
  const { data, isError, isSuccess } = useFetchForSaleDataQuery(Number(params.id));

  return (
    <section className={style.forsale_section}>
      {isSuccess ? (
        data.length !== 0 ? (
          <CardList data={data} />
        ) : (
          <div className={style.nft_none}>
            <p>현재 즐겨찾기 중인 NFT가 없습니다</p>
            <p>(っ °Д °;)っ</p>
          </div>
        )
      ) : (
        <div className={style.spinner}>
          <Spinner />
        </div>
      )}
    </section>
  );
};

export default ForSale;
