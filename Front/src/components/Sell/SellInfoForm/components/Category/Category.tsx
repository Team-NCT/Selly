import style from "./Category.module.scss";
import { RadioList, Label } from "@/components/common";
import { CategoryProps } from "./Category.types";

const CATEGORY_LIST = ["Digital", "Analog", "Photography"];

const Category = ({ value, changeHandler }: CategoryProps) => {
  return (
    <div className={style.category}>
      <h2 className={style.category_label}>
        <Label color="muscat100" positionH="bottom" positionW="right" id="fraction-price">
          카테고리
        </Label>
      </h2>
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
