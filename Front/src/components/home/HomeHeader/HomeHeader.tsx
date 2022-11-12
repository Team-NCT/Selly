import style from "./HomeHeader.module.scss";
import smilingFaceHeart_eyes from "@/assets/images/emojis/smilingFaceHeart-eyes.png";
import smilingFaceHearts from "@/assets/images/emojis/smilingFaceHearts.png";
import sparklingHeart from "@/assets/images/emojis/sparklingHeart.png";
import palette from "@/assets/images/emojis/palette.png";
import { WalletIcon } from "@/components/icon";
import { NavLink } from "react-router-dom";
import { useLogin } from "@/hooks";

const HomeHeader = () => {
  const [login] = useLogin();

  return (
    <header className={style.header}>
      <section className={style.leftSection}>
        <span className={style.title}>NFT, ArtTech and Mint</span>
        <div className={style.introduction}>
          <span>내가 그린 그림을</span>
          <span>조각 투자를 통해 수익 창출</span>
        </div>
        <div className={style.buttonSection}>
          <button className={style.wallet} onClick={login}>
            <span>지갑 연결하기</span>
            <div className={style.wallet_icon}>
              <WalletIcon color="white" />
            </div>
          </button>
          <NavLink to="/explore" className={style.expore}>
            탐색하기
          </NavLink>
        </div>
      </section>
      <section className={style.rightSection}>
        <img
          src={smilingFaceHeart_eyes}
          alt="smilingFaceHeart-eyes"
          className={style.smilingFaceHeart_eyes}
        />
        <img src={smilingFaceHearts} alt="smilingFaceHeart" className={style.smilingFaceHearts} />
        <img src={sparklingHeart} alt="sparklingHeart" className={style.sparklingHeart} />
        <img src={palette} alt="palette" className={style.palette} />
      </section>
    </header>
  );
};

export default HomeHeader;
