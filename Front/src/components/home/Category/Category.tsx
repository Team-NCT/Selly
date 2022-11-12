import style from "./Category.module.scss";
import huggingFace from "@/assets/images/emojis/huggingFace.png";
import heartRibbon from "@/assets/images/emojis/heartRibbon.png";
import kissingCat from "@/assets/images/emojis/kissingCat.png";
import smilingFaceHearts from "@/assets/images/emojis/smilingFaceHearts.png";
import phone from "@/assets/images/emojis/phone.png";
import lightBulb from "@/assets/images/emojis/lightBulb.png";
import palette from "@/assets/images/emojis/palette.png";
import ribbon from "@/assets/images/emojis/ribbon.png";
import paintbrush from "@/assets/images/emojis/paintbrush.png";
import sailboat from "@/assets/images/emojis/sailboat.png";
import camera from "@/assets/images/emojis/camera.png";
import camping from "@/assets/images/emojis/camping.png";
import { Neon } from "@/components/common";

const Category = () => {
  return (
    <section className={style.section}>
      <div className={style.title}>
        <Neon positionH="bottom" positionW="right" color="marmalade100">
          Category
        </Neon>
      </div>
      <div className={style.cardSection}>
        <div className={`${style.card} ${style.all}`}>
          <img src={huggingFace} alt="huggingFace" className={style.huggingFace} />
          <img src={heartRibbon} alt="heartRibbon" className={style.heartRibbon} />
          <img src={kissingCat} alt="kissingCat" className={style.kissingCat} />
          <div className={style.card_bottom}>
            <span className={style.card_bottom_text}>All</span>
          </div>
        </div>
        <div className={`${style.card} ${style.digital}`}>
          <img
            src={smilingFaceHearts}
            alt="smilingFaceHearts"
            className={style.smilingFaceHearts}
          />
          <img src={phone} alt="phone" className={style.phone} />
          <img src={lightBulb} alt="lightBulb" className={style.lightBulb} />
          <div className={style.card_bottom}>
            <span className={style.card_bottom_text}>Digital</span>
          </div>
        </div>
        <div className={`${style.card} ${style.analog}`}>
          <img src={palette} alt="palette" className={style.palette} />
          <img src={ribbon} alt="ribbon" className={style.ribbon} />
          <img src={paintbrush} alt="paintbrush" className={style.paintbrush} />
          <div className={style.card_bottom}>
            <span className={style.card_bottom_text}>Analog</span>
          </div>
        </div>
        <div className={`${style.card} ${style.photography}`}>
          <img src={sailboat} alt="sailboat" className={style.sailboat} />
          <img src={camera} alt="camera" className={style.camera} />
          <img src={camping} alt="camping" className={style.camping} />
          <div className={style.card_bottom}>
            <span className={style.card_bottom_text}>Photography</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;