import { ArtistRankingProps } from "./AritstRankingItem.type";
import style from "./ArtistRankingItem.module.scss";
import { ProfileImage } from "@/components/common";
import { Link } from "react-router-dom";
import { EthereumIcon } from "@/components/icon";

const ArtistRankingItem = (props: ArtistRankingProps) => {
  return (
    <Link to={`/profile/${props.userId}`} className={style.item_container}>
      <div className={style.item_artist_section}>
        <div className={style.item_rank}>{props.rank}</div>
        <div className={style.item_artist}>
          <ProfileImage
            size="xs"
            profileStyle="square"
            url={props.image}
            certification={props.certification}
          />
          <div className={style.item_artist_info}>
            <div className={style.item_artist_line}>
              <div className={style.item_artist_nickname}>{props.nickname}</div>
            </div>
            <div className={style.item_artist_wallet}>
              <EthereumIcon />
              <div className={style.item_artist_wallet_address}>{props.wallet}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.item_cnt_section}>
        <div className={style.item_artist_cnt}>{props.followerCnt}</div>
        <div className={style.item_artist_cnt}>{props.nftCnt}</div>
      </div>
    </Link>
  );
};

export default ArtistRankingItem;
