import ArtistRankingItem from "../ArtistRankingItem/ArtistRankingItem";
import { ArtistRankingListProps } from "./ArtistRankingList.types";
import style from "./ArtistRankingList.module.scss";

const ArtistRankingList = ({ artistRankingList }: ArtistRankingListProps) => {
  return (
    <div className={style.artist_ranking_list}>
      {artistRankingList.map((artistRank, idx) => (
        <div key={idx + 1} className={style.artist_ranking_item}>
          <ArtistRankingItem {...artistRank} rank={idx + 1} />
        </div>
      ))}
    </div>
  );
};

export default ArtistRankingList;
