import style from "./CategorySection.module.scss";
import huggingFace from "@/assets/images/emojis/huggingFace.webp";
import heartRibbon from "@/assets/images/emojis/heartRibbon.webp";
import kissingCat from "@/assets/images/emojis/kissingCat.webp";
import smilingFaceHearts from "@/assets/images/emojis/smilingFaceHearts.webp";
import phone from "@/assets/images/emojis/phone.webp";
import lightBulb from "@/assets/images/emojis/lightBulb.webp";
import palette from "@/assets/images/emojis/palette.webp";
import ribbon from "@/assets/images/emojis/ribbon.webp";
import paintbrush from "@/assets/images/emojis/paintbrush.webp";
import sailboat from "@/assets/images/emojis/sailboat.webp";
import camera from "@/assets/images/emojis/camera.webp";
import camping from "@/assets/images/emojis/camping.webp";
import { NavLink } from "react-router-dom";

const CategorySection = () => {
  return (
    <div className={style.cardSection}>
      <NavLink to="/explore/all" className={`${style.card} ${style.all}`}>
        <img src={huggingFace} alt="huggingFace" className={style.huggingFace} />
        <img src={heartRibbon} alt="heartRibbon" className={style.heartRibbon} />
        <img src={kissingCat} alt="kissingCat" className={style.kissingCat} />
        <div className={style.card_bottom}>
          <span className={style.card_bottom_text}>All</span>
        </div>
      </NavLink>{" "}
      <NavLink to="/explore/digital" className={`${style.card} ${style.digital}`}>
        <img src={smilingFaceHearts} alt="smilingFaceHearts" className={style.smilingFaceHearts} />
        <img src={phone} alt="phone" className={style.phone} />
        <img src={lightBulb} alt="lightBulb" className={style.lightBulb} />
        <div className={style.card_bottom}>
          <span className={style.card_bottom_text}>Digital</span>
        </div>
      </NavLink>
      <NavLink to="/explore/analog" className={`${style.card} ${style.analog}`}>
        <img src={palette} alt="palette" className={style.palette} />
        <img src={ribbon} alt="ribbon" className={style.ribbon} />
        <img src={paintbrush} alt="paintbrush" className={style.paintbrush} />
        <div className={style.card_bottom}>
          <span className={style.card_bottom_text}>Analog</span>
        </div>
      </NavLink>
      <NavLink to="/explore/photography" className={`${style.card} ${style.photography}`}>
        <img src={sailboat} alt="sailboat" className={style.sailboat} />
        <img src={camera} alt="camera" className={style.camera} />
        <img src={camping} alt="camping" className={style.camping} />
        <div className={style.card_bottom}>
          <span className={style.card_bottom_text}>Photography</span>
        </div>
      </NavLink>
    </div>
  );
};

export default CategorySection;
