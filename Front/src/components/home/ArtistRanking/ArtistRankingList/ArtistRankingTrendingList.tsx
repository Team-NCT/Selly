import { useFetchArtistTrendingRankingDataQuery } from "@/api/server/userAPI";
import { Spinner } from "@/components/common";
import ArtistRankingItem from "../ArtistRankingItem/ArtistRankingItem";
import style from "./ArtistRankingList.module.scss";

const ArtistRankingTrendingList = () => {
  const { data } = useFetchArtistTrendingRankingDataQuery();
  console.log({ data });
  return (
    <>
      {!data ? (
        <div className={style.loading}>
          <Spinner />
          Loading...
        </div>
      ) : data?.length === 0 ? (
        <div className={style.no_data}>현재 Trending Top 10 작가가 없어요</div>
      ) : (
        <div className={style.artist_ranking_list}>
          {data.map((artistRank, idx) => (
            <div key={idx + 1} className={style.artist_ranking_item}>
              <ArtistRankingItem {...artistRank} rank={idx + 1} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ArtistRankingTrendingList;
