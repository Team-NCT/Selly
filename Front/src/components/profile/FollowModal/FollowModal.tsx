import { useState } from "react";
import style from "./FollowModal.module.scss";
import { Modal } from "@/components/common";
import { LeftArrowIcon } from "@/components/icon";
import { TabType, FollowModalProps } from "./FollowModal.types";
import { useAppDispatch } from "@/hooks";
import { closeFollow } from "@/store/modalSlice";
import { Follow } from ".";

const FOLLOWERS_DUMMY = [
  {
    userId: 1,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "김김작가작가작가작가작가",
    myFollowing: false,
  },
  {
    userId: 2,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "김김작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 3,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "김김작가작가작가작가작가",
    myFollowing: false,
  },
  {
    userId: 4,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "김김작가작가작가작가작가",
    myFollowing: false,
  },
  {
    userId: 5,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "김김작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 6,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "김김작가작가작가작가작가",
    myFollowing: false,
  },
  {
    userId: 7,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "김김작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 8,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "김김작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 9,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "김김작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 10,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "김김작가작가작가작가작가",
    myFollowing: true,
  },
];

const FOLLOWING_DUMMY = [
  {
    userId: 1,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "이이작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 2,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "이이작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 3,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "이이작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 4,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "이이작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 5,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "이이작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 6,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "이이작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 7,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "이이작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 8,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "이이작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 9,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "이이작가작가작가작가작가",
    myFollowing: true,
  },
  {
    userId: 10,
    wallet: "0x5e8a95271c72D133F8c0464085B55E9de5286A73",
    image:
      "https://w.namu.la/s/6d37d2792f61b69511edc288e16598d0722ff0407af67089c0004ddeda7ad7b9bdc0b2e4880db9548efe21f2082a4c34545902a67aaa00eafce75c7f89fcdcb8eeae5357f92572f0758218fb6961e1f7b7e989a1abd448bfc6001607f77bba8a",
    nickname: "이이작가작가작가작가작가",
    myFollowing: true,
  },
];

const FollowModal = ({ type }: FollowModalProps) => {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<TabType>(type);

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
          <p>김김작가작가작가작가작가</p>
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
            FOLLOWERS_DUMMY.map((item, idx) => <Follow key={idx} data={item} />)}
          {tab === "FOLLOWING" &&
            FOLLOWING_DUMMY.map((item, idx) => <Follow key={idx} data={item} />)}
        </ul>
      </section>
    </Modal>
  );
};

export default FollowModal;
