import { useState } from "react";
import ArtistRankingList from "./ArtistRankingList/ArtistRankingList";
import { arg1 } from "./dummy";
import Header from "./Header/Header";
import SelectButton from "./SelectButton/SelectButton";
import style from "./ArtistRanking.module.scss";

const ArtistRanking = () => {
  const [isTotal, setIsTotal] = useState(true);
  return (
    <div className={style.ranking_container}>
      <Header />
      <SelectButton setIsTotal={setIsTotal} />
      <ArtistRankingList {...arg1}></ArtistRankingList>
    </div>
  );
};

export default ArtistRanking;
