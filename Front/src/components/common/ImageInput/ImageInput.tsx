import { ChangeEvent } from "react";
import { ImageInputProps } from "./ImageInput.types";
import style from "./ImageInput.module.scss";

const ImageInput = ({
  id,
  limit,
  handleImageFile,
  styles = "square",
  imageUrl = "",
}: ImageInputProps) => {
  const handleInputChange = (event: ChangeEvent) => {
    const file = (event.target as HTMLInputElement).files![0];
    //* validation: 업로드한 파일이 없는 경우 리턴
    if (!file) return;

    handleImageFile(file);
  };
  return (
    <label htmlFor={id} className={style.input_image_label}>
      {/* 이미지가 있을 때 */}
      {imageUrl && <img src={imageUrl} alt={id} className={style[`input_image_${styles}`]}></img>}

      {/* 이미지가 없을 때 */}
      {!imageUrl && (
        <div className={style[`input_image_${styles}`]}>
          <span className="material-icons-outlined">add_photo_alternate</span>
          <span className={style.input_image_desc}> GIF, JPG, JPEG, PNG, WEBP</span>
          <span className={style.input_image_desc}>파일 크기: 최대 {limit} MB</span>
        </div>
      )}

      {/* input */}
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={(event) => handleInputChange(event)}
        hidden
      />
    </label>
  );
};

export default ImageInput;
