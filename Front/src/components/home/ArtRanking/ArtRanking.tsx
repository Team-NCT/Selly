import style from "./ArtRanking.module.scss";
import { Carousel, Header } from "./";
import { useFetchNFTRankingQuery } from "@/api/server/rankingAPI";

const ArtRanking = () => {
  const { data, isSuccess } = useFetchNFTRankingQuery();
  if (isSuccess)
    return (
      <section className={style.home_art}>
        <Header />
        <Carousel data={data} />
      </section>
    );

  return <></>;
};

export default ArtRanking;
