import { useState } from "react";
import style from "./FollowModal.module.scss";
import { Modal } from "@/components/common";
import { LeftArrowIcon } from "@/components/icon";
import { TabType, FollowModalProps } from "./FollowModal.types";
import { useAppDispatch } from "@/hooks";
import { closeFollow } from "@/store/modalSlice";
import { Follow } from ".";
import { useFetchUserFollowerQuery, useFetchUserFollowingQuery } from "@/api/server/userAPI";

const FollowModal = ({ type, nickname, profilePageId }: FollowModalProps) => {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<TabType>(type);
  const followersData = useFetchUserFollowerQuery(profilePageId);
  const follwingData = useFetchUserFollowingQuery(profilePageId);

  const tabClickHandler = (tab: TabType) => {
    setTab(tab);
  };

  return (
    <Modal close={() => dispatch(closeFollow())}>
      <section className={style.follow_modal}>
        <h1 className={style.header}>
          <button onClick={() => dispatch(closeFollow())}>
            <LeftArrowIcon />
          </button>
          <p>{nickname}</p>
        </h1>
        <section className={`${style.follow_tab} ${style[`follow_tab_${tab}`]}`}>
          <button className={style.followers_tab} onClick={() => tabClickHandler("FOLLOWER")}>
            Followers
          </button>
          <button className={style.following_tab} onClick={() => tabClickHandler("FOLLOWING")}>
            Following
          </button>
        </section>
        <ul className={style.follow_user_section}>
          {tab === "FOLLOWER" &&
            followersData.data?.map((item, idx) => <Follow key={idx} data={item} />)}
          {tab === "FOLLOWING" &&
            follwingData.data?.map((item, idx) => <Follow key={idx} data={item} />)}
        </ul>
      </section>
    </Modal>
  );
};

export default FollowModal;
