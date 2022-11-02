import { Neon } from "@/components/common";
import styles from "./Image.module.scss";
import { ImageInput } from "@/components/common";

const Image = () => {
  return (
    <>
      <h2 className={styles.form_title}>
        <Neon color="lilac" positionH="top" positionW="left" horizontal={2} width={30}>
          Upload Image
        </Neon>
        <caption className={styles.caption_danger}>*</caption>
      </h2>
    </>
  );
};

export default Image;
