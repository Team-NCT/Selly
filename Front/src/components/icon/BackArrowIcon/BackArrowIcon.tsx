import { useNavigate } from "react-router-dom";
import style from "./BackArrowIcon.module.scss";

const BackArrowIcon = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      <span className={style.back_arrow_icon}></span>
    </button>
  );
};

export default BackArrowIcon;
