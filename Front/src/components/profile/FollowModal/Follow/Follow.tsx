import style from "./Follow.module.scss";
import { Link } from "react-router-dom";
import { FollowProps } from "./Follow.types";
import { ProfileImage, Button } from "@/components/common";
import { closeFollow } from "@/store/modalSlice";
import { useAppDispatch } from "@/hooks";
import { EthereumIcon } from "@/components/icon";

const Follow = ({ data }: FollowProps) => {
  const dispatch = useAppDispatch();

  return (
    <li className={style.follow_article}>
      <Link to={`/profile/${data.userId}`} onClick={() => dispatch(closeFollow())}>
        <div className={style.user_info}>
          <ProfileImage size="xxs" profileStyle="square" url={data.image} />
          <div className={style.user_text_info}>
            <div className={style.nickname}>{data.nickname}</div>
            <div className={style.wallet}>
              <EthereumIcon />
              <p className={style.wallet_address}>{data.wallet}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className={style.button_section}>
        {data.myFollowing ? (
          <Button
            bg="blackberry"
            color="outline"
            onClick={() => console.log("언팔")}
            size="fillContainer">
            Following
          </Button>
        ) : (
          <Button onClick={() => console.log("팔로")} size="fillContainer">
            Follow
          </Button>
        )}
      </div>
    </li>
  );
};

export default Follow;
