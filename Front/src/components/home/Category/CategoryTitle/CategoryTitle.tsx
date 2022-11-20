import { Neon } from "@/components/common";
import style from "./CategoryTitle.module.scss";

const CategoryTitle = () => {
  return (
    <header className={style.title}>
      <Neon color="ocean" positionH="top" positionW="right">
        NFT
      </Neon>
      &nbsp;
      <Neon color="muscat" positionH="bottom" positionW="right">
        Category
      </Neon>
    </header>
  );
};

export default CategoryTitle;
