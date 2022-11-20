import style from "./ArtistRankingTitle.module.scss";

const ArtistRankingTitle = () => {
  return (
    <div className={style.title_container}>
      <ul className={style.title_section}>
        <li className={style.title_artist}>Artist</li>
        <div className={style.title_cnt}>
          <li className={style.title_cnt_item}>Follow</li>
          <li className={style.title_cnt_item}>NFTs</li>
        </div>
      </ul>
      <ul className={`${style.title_section} ${style.section_display}`}>
        <li className={style.title_artist}>Artist</li>
        <div className={style.title_cnt}>
          <li className={style.title_cnt_item}>Follow</li>
          <li className={style.title_cnt_item}>NFTs</li>
        </div>
      </ul>
    </div>
  );
};

export default ArtistRankingTitle;
