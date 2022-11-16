import style from "./Bookmark.module.scss";
import { CardList, Spinner } from "@/components/common";
import { useFetchBookmarkDataQuery } from "@/api/server/bookmarkAPI";
import { useParams } from "react-router-dom";

const Bookmark = () => {
  const params = useParams();
  const { data, isError, isSuccess } = useFetchBookmarkDataQuery(Number(params.id));

  return (
    <section className={style.bookmark_section}>
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

export default Bookmark;
