import { CardProps } from "./Card.types";
import style from "./Card.module.scss";

const Card = ({ url, title, supply, clickHandler }: CardProps) => {
  return (
    <section className={style.card} role="presentation" onClick={clickHandler}>
      <figure>
        <img src={url} alt={title}></img>
      </figure>
      <div>
        <h1>{title}</h1>
        {supply && <h2>남은 조각: {supply} 개</h2>}
      </div>
    </section>
  );
};

export default Card;
