import style from "./Fractions.module.scss";
import { DescCardList, CardList, Spinner } from "@/components/common";
import { useFetchFractionsDataQuery } from "@/api/server/NFTTransactionAPI";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";

const Fractions = () => {
  const params = useParams();
  const { data, isError, isSuccess } = useFetchFractionsDataQuery(Number(params.id));
  const { userId } = useAppSelector(selectAccount);

  return (
    <section className={style.fractions_section}>
      {isSuccess ? (
        data.length !== 0 ? (
          Number(params.id) === userId ? (
            <DescCardList data={data} />
          ) : (
            <CardList data={data} />
          )
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

export default Fractions;
