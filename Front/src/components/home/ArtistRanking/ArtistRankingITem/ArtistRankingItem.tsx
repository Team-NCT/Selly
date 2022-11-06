import { ArtistRankingProps } from "./AritstRankingItem.type";
import style from "./ArtistRankingItem.module.scss";
import { ProfileImage } from "@/components/common";

const ArtistRankingItem = (props: ArtistRankingProps) => {
  return (
    <section className={style.item_container}>
      <div className={style.item_rank}>{props.rank}</div>
      <div className={style.item_artist_image}>
        <ProfileImage size="xs" profileStyle="square" url={props.image} />
      </div>
      <div className={style.item_artist_info}>
        <span className={style.item_artist_nickname}>{props.nickname}</span>
        {props.isAuth && <span>✓</span>}
        <div className={style.item_artist_wallet}>{props.wallet}</div>
      </div>

      <div className={style.item_artist_follwer}>{props.followerCnt}</div>
      <div className={style.item_artist_NFT}>{props.NFTCnt}</div>
    </section>
  );
};

export default ArtistRankingItem;
