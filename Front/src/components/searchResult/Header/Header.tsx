import style from "./Header.module.scss";
import { HeaderProps } from "./Header.types";
import { Neon } from "@/components/common";

const Header = ({ keyword }: HeaderProps) => {
  return (
    <header className={style.search_result_header}>
      <Neon positionH="bottom" positionW="right" color="lilac" width={50} height={50}>
        <h1>Search</h1>
      </Neon>
      <h2>{keyword}</h2>
    </header>
  );
};

export default Header;
