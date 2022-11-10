import style from "./Header.module.scss";
import { Neon } from "@/components/common";

const Header = () => {
  return (
    <header className={style.home_art_header}>
      NFT
      <Neon color="ocean" positionH="top" positionW="right">
        Article
      </Neon>
      <Neon color="muscat" positionH="bottom" positionW="right">
        Top 10
      </Neon>
    </header>
  );
};

export default Header;
