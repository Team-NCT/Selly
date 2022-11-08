import { Neon } from "@/components/common";
import style from "./Header.module.scss";

const Header = () => {
  return (
    <div className={style.header}>
      NFT
      <Neon color="ocean" positionH="top" positionW="right">
        Artists
      </Neon>
      <Neon color="muscat" positionH="bottom" positionW="right">
        Top 10
      </Neon>
    </div>
  );
};

export default Header;
