import style from "./Home.module.scss";
import { ArtistRanking, ArtRanking, HomeHeader } from "@/components/home";

function Home() {
  return (
    <div className={style.home}>
      <main>
        <HomeHeader />
        <ArtRanking />
        <ArtistRanking />
      </main>
    </div>
  );
}

export default Home;
