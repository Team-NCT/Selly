import { Neon } from "@/components/common";
import style from "./CategoryTitle.module.scss";

const CategoryTitle = () => {
  return (
    <div className={style.title}>
      <Neon positionH="bottom" positionW="right" color="marmalade100">
        Category
      </Neon>
    </div>
  );
};

export default CategoryTitle;
