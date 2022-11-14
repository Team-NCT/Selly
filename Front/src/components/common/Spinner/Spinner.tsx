import style from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={style.loading}>
      <div className={style.loading_ring}></div>
    </div>
  );
};

export default Spinner;
