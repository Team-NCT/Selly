import { Neon } from "@/components/common";
import { CategoryHeaderProps } from "./CategoryHeader.types";
import styles from "./CategoryHeader.module.scss";

const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  let title = "";
  switch (category) {
    case "all":
      title = "ALL NFTs";
      break;
    case "digital":
      title = "Digital";
      break;
    case "analog":
      title = "Analog";
      break;
    case "photography":
      title = "Photography";
      break;
  }
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
          {title}
        </Neon>
      </div>
    </header>
  );
};

export default CategoryHeader;
