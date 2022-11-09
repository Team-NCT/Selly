import style from "./Home.module.scss";
import ArtistRanking from "@/components/home/ArtistRanking/ArtistRanking";
import { HomeHeader } from "@/components/home";

function Home() {
  return (
    <div className={style.home}>
      <main>
        <HomeHeader />
        <ArtistRanking />
      </main>
    </div>
  );
}

export default Home;
