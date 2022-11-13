import { ExploreCardList } from "@/components/explore";
import { CategorySection } from "@/components/home/Category";

const Explore = () => {
  return (
    <main>
      <CategorySection />
      <ExploreCardList category="all" />
    </main>
  );
};

export default Explore;
