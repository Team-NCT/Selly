import style from "./Home.module.scss";
import { ArtistRanking, ArtRanking, HomeHeader, Category } from "@/components/home";

function Home() {
  return (
    <div className={style.home}>
      <main>
        <HomeHeader />
        <ArtRanking />
        <ArtistRanking />
        <Category />
      </main>
    </div>
  );
}

export default Home;
