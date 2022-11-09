import CategoryHeader from "@/components/explore/CategoryHeader/CategoryHeader";
import { useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();
  let title = "";
  switch (category) {
    case "all":
      title = "ALL NFTs";
      break;
    case "digital":
      title = "Digital";
      break;
    case "analog":
      title = "Analog";
      break;
    case "photography":
      title = "Photography";
      break;
  }
  return (
    <main>
      <CategoryHeader category={title} />
    </main>
  );
};

export default Category;
