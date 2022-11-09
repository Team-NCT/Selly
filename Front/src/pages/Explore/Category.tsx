import CategoryHeader from "@/components/explore/CategoryHeader/CategoryHeader";
import { useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();
  return (
    <main>
      <CategoryHeader category={category as string} />
    </main>
  );
};

export default Category;
