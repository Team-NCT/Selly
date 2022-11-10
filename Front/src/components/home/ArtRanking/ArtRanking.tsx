import style from "./ArtRanking.module.scss";
import { dummyData } from "./dummy";
import { Carousel, Header } from "./";

const ArtRanking = () => {
  return (
    <section className={style.home_art}>
      <Header />
      <Carousel data={dummyData} />
    </section>
  );
};

export default ArtRanking;
