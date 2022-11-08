import style from "./ArtistRankingTitle.module.scss";

const ArtistRankingTitle = () => {
  return (
    <div className={style.title_container}>
      <ul className={style.title_section}>
        <li className={style.title_rank}></li>
        <li>Artist</li>
        <li>Follower</li>
        <li>NFTs</li>
      </ul>
      <ul className={`${style.title_section} ${style.section_display}`}>
        <li className={style.title_rank}></li>
        <li>Artist</li>
        <li>Follower</li>
        <li>NFTs</li>
      </ul>
    </div>
  );
};

export default ArtistRankingTitle;
