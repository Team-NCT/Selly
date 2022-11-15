import { useState } from "react";
import Header from "./Header/Header";
import SelectButton from "./SelectButton/SelectButton";
import style from "./ArtistRanking.module.scss";
import ArtistRankingTitle from "./ArtistRankingTitle/ArtistRankingTitle";
import { ArtistRankingTotalList, ArtistRankingTrendingList } from "./ArtistRankingList";

const ArtistRanking = () => {
  const [isTotal, setIsTotal] = useState(true);
  return (
    <div className={style.ranking_container}>
      <Header />
      <SelectButton setIsTotal={setIsTotal} />
      <ArtistRankingTitle />
      {isTotal ? <ArtistRankingTotalList /> : <ArtistRankingTrendingList />}
    </div>
  );
};

export default ArtistRanking;
