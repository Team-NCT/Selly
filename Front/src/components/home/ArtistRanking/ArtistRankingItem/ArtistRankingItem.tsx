import { ArtistRankingProps } from "./AritstRankingItem.type";
import style from "./ArtistRankingItem.module.scss";
import { ProfileImage } from "@/components/common";
import { Link } from "react-router-dom";

const ArtistRankingItem = (props: ArtistRankingProps) => {
  return (
    <Link to="/profile" className={style.item_container}>
      <div className={style.item_artist_section}>
        <div className={style.item_rank}>{props.rank}</div>
        <div className={style.item_artist}>
          <ProfileImage size="xs" profileStyle="square" url={props.image} />
          <div className={style.item_artist_info}>
            <span className={style.item_artist_nickname}>{props.nickname}</span>
            {props.isAuth && <span>✓</span>}
            <div className={style.item_artist_wallet}>{props.wallet}</div>
          </div>
        </div>
      </div>
      <div className={style.item_cnt_section}>
        <div className={style.item_artist_cnt}>{props.followerCnt}</div>
        <div className={style.item_artist_cnt}>{props.NFTCnt}</div>
      </div>
    </Link>
  );
};

export default ArtistRankingItem;
