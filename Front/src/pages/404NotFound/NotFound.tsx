import { Link } from "react-router-dom";
import style from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <main className={style.container}>
      <header>
        <Link to="/" className={style.link_container}>
          메인페이지로 이동하기
        </Link>
      </header>
      <section className={style.error_container}>
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
    </main>
  );
};

export default NotFound;
