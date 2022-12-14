import { Neon } from "@/components/common";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_title}>
        <Neon
          color="muscat"
          positionH="top"
          positionW="right"
          width={70}
          vertical={1}
          horizontal={2}>
          Create
        </Neon>
        <span className={styles.header_span}>NFT</span>
      </div>
      <span className={styles.header_caption}>
        <span className={styles.caption_danger}>*</span>필수 항목
      </span>
    </header>
  );
};

export default Header;
