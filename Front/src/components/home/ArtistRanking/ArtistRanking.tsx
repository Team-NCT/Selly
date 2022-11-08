import { useState } from "react";
import ArtistRankingList from "./ArtistRankingList/ArtistRankingList";
import { arg1 } from "./dummy";
import Header from "./Header/Header";
import SelectButton from "./SelectButton/SelectButton";
import style from "./ArtistRanking.module.scss";

const ArtistRanking = () => {
  const [isTrending, setIsTrending] = useState(true);
  return (
    <div className={style.ranking_container}>
      <Header />
      <SelectButton setIsTrending={setIsTrending} />
      <ArtistRankingList {...arg1}></ArtistRankingList>
    </div>
  );
};

export default ArtistRanking;
