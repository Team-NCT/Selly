import style from "./Home.module.scss";
import { ArtistRanking, ArtRanking } from "@/components/home";

function Home() {
  return (
    <div className={style.home}>
      <main>
        <ArtRanking />
        <ArtistRanking />
      </main>
    </div>
  );
}

export default Home;
