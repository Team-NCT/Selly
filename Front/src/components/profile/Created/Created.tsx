import style from "./Created.module.scss";
import { CardList, Spinner } from "@/components/common";
import { useFetchCreatedDataQuery } from "@/api/server/userAPI";
import { useParams } from "react-router-dom";

const Created = () => {
  const params = useParams();
  const { data, isError, isSuccess } = useFetchCreatedDataQuery(Number(params.id));

  return (
    <section className={style.created_section}>
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

export default Created;
