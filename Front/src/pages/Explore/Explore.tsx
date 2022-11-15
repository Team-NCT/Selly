import { ExploreCardList, ExploreSelectBox } from "@/components/explore";
import { CategorySection } from "@/components/home/Category";
import style from "./Explore.module.scss";

const Explore = () => {
  return (
    <main className={style.container}>
      <CategorySection />
      <ExploreSelectBox category="all" sort="asc" order="sellRegist" />
      <ExploreCardList category="all" sort="asc" order="sellRegist" />
    </main>
  );
};

export default Explore;
