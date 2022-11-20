import { Neon } from "@/components/common";
import style from "./Header.module.scss";

const Header = () => {
  return (
    <header className={style.header}>
      <Neon color="muscat" positionH="top" positionW="right" width={45} vertical={1} horizontal={5}>
        <span className={style.title}>Settings</span>
      </Neon>
      <span className={style.caption_danger}>*</span>필수 항목
    </header>
  );
};

export default Header;
