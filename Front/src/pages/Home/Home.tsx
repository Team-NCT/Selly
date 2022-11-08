import style from "./Home.module.scss";
import ArtistRanking from "@/components/home/ArtistRanking/ArtistRanking";

function Home() {
  return (
    <div className={style.home}>
      <ArtistRanking />
    </div>
  );
}

export default Home;
