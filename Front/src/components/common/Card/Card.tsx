import { CardProps } from "./Card.types";
import style from "./Card.module.scss";

const Card = ({ url, title, supply }: CardProps) => {
  return (
    <section className={style.card}>
      <figure>
        <img src={url} alt={title}></img>
      </figure>
      <div>
        <h1>{title}</h1>
        <h2>collectable supply: {supply}</h2>
      </div>
    </section>
  );
};

export default Card;
