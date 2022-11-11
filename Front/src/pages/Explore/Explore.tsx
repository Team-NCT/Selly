import { DescCardList } from "@/components/common";
import { CategorySection } from "@/components/home/Category";
import { args } from "./dummy";

const Explore = () => {
  return (
    <main>
      <CategorySection />
      <DescCardList {...args} />
    </main>
  );
};

export default Explore;
