import { useState } from "react";
import ArtistRankingList from "./ArtistRankingList/ArtistRankingList";
import { arg1 } from "./dummy";
import Header from "./Header/Header";
import SelectButton from "./SelectButton/SelectButton";
import style from "./ArtistRanking.module.scss";
import ArtistRankingTitle from "./ArtistRankingTitle/ArtistRankingTitle";

const ArtistRanking = () => {
  const [isTotal, setIsTotal] = useState(true);
  return (
    <div className={style.ranking_container}>
      <Header />
      <SelectButton setIsTotal={setIsTotal} />
      <ArtistRankingTitle />
      <ArtistRankingList {...arg1} />
    </div>
  );
};

export default ArtistRanking;
