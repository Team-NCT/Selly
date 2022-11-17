import style from "./Category.module.scss";
import { RadioList } from "@/components/common";
import { CategoryProps } from "./Category.types";

const CATEGORY_LIST = ["Digital", "Analog", "Photography"];

const Category = ({ value, changeHandler }: CategoryProps) => {
  return (
    <div className={style.category}>
      <h2 className={style.category_label}>카테고리</h2>
      <RadioList
        list={CATEGORY_LIST}
        category="category"
        defaultValue={value}
        onChange={changeHandler}
      />
    </div>
  );
};

export default Category;
