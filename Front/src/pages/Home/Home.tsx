import style from "./Home.module.scss";
import ArtistRanking from "@/components/home/ArtistRanking/ArtistRanking";

function Home() {
  return (
    <div className={style.home}>
      <main>
        <ArtistRanking />
      </main>
    </div>
  );
}

export default Home;
