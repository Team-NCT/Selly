import style from "./Follow.module.scss";
import { Link } from "react-router-dom";
import { FollowProps } from "./Follow.types";
import { selectAccount } from "@/store/loginSlice";
import { ProfileImage, Button } from "@/components/common";
import { closeFollow } from "@/store/modalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { EthereumIcon } from "@/components/icon";
import { useFollowMutation, useUnFollowMutation } from "@/api/server/userAPI";

const Follow = ({ data }: FollowProps) => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(selectAccount);

  const [follow] = useFollowMutation();
  const [unFollow] = useUnFollowMutation();

  const followOnclickHandler = async () => {
    if (!userId) {
      return;
    }
    await follow({ followerId: data.userId, followingId: userId });
  };

  const unFollowOnClickHandler = async () => {
    if (!userId) return;
    await unFollow({ followerId: data.userId, followingId: userId });
  };

  return (
    <li className={style.follow_article}>
      <Link to={`/profile/${data.userId}`} onClick={() => dispatch(closeFollow())}>
        <div className={style.user_info}>
          <ProfileImage
            size="xxs"
            profileStyle="square"
            url={data.image}
            certification={data.certification}
          />
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
        {!!Number(userId) &&
          data.userId !== Number(userId) &&
          (data?.myFollowing ? (
            <Button
              bg="blackberry"
              color="outline"
              onClick={unFollowOnClickHandler}
              size="fillContainer">
              UnFollow
            </Button>
          ) : (
            <Button onClick={followOnclickHandler} size="fillContainer">
              Follow
            </Button>
          ))}
      </div>
    </li>
  );
};

export default Follow;
