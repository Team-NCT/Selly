import style from "./Category.module.scss";
import CategorySection from "./CategorySection/CategorySection";
import CategoryTitle from "./CategoryTitle/CategoryTitle";

const Category = () => {
  return (
    <section className={style.section}>
      <CategoryTitle />
      <CategorySection />
    </section>
  );
};

export default Category;
