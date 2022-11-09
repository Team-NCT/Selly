import { Neon } from "@/components/common";
import { CategoryHeaderProps } from "./CategoryHeader.types";
import styles from "./CategoryHeader.module.scss";

const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.header_title}>
        <Neon
          color="ocean"
          positionH="top"
          positionW="right"
          width={70}
          vertical={1}
          horizontal={2}>
          {category}
        </Neon>
      </div>
    </header>
  );
};

export default CategoryHeader;
