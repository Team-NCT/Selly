import { ExploreCardList } from "@/components/explore";
import CategoryHeader from "@/components/explore/CategoryHeader/CategoryHeader";
import ExploreSelectBox from "@/components/explore/ExploreSelectBox/ExploreSelectBox";
import { useParams, useSearchParams } from "react-router-dom";
import style from "./Explore.module.scss";

const Category = () => {
  //* /explore/category?sort=asc|desc&order=sell|trade|price
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");

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
