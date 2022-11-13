import { ExploreCardList, ExploreSelectBox, CategoryHeader } from "@/components/explore";
import { useParams, useSearchParams } from "react-router-dom";
import style from "./Explore.module.scss";

const Category = () => {
  //* /explore/category?sort=asc|desc&order=sell|trade|price
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  let sort = searchParams.get("sort");
  if (sort === null) {
    sort = "desc";
  }
  let order = searchParams.get("order");
  if (order === null) {
    order = "sellRegist";
  }

  return (
    <main className={style.container}>
      <CategoryHeader category={category as string} />
      <ExploreSelectBox
        category={category as string}
        sort={sort as string}
        order={order as string}
      />
      <ExploreCardList
        category={category as string}
        sort={sort as string}
        order={order as string}
      />
    </main>
  );
};

export default Category;
