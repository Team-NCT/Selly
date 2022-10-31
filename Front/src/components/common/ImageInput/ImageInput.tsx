import { ChangeEvent, useState } from "react";
import { ImageInputProps } from "./ImageInput.types";
import style from "./ImageInput.module.scss";
import {
  checkImageExtension,
  encodeFileToBase64,
  checkImageSize,
} from "@/helpers/utils/imageInput";
import { useAlert, OpenAlertArg } from "@/hooks/useAlert";

const ImageInput = ({ id, limit, url = "" }: ImageInputProps) => {
  const [imageUrl, setImageUrl] = useState(url);
  const { openAlertModal } = useAlert();

  const imageInputChangeHandler = (event: ChangeEvent) => {
    const file = (event.target as HTMLInputElement).files![0];

    //* 업로드한 파일이 없는 경우 리턴
    if (!file) return;

    //* 업로드 파일 확장자 체크
    if (!checkImageExtension(file.name)) {
      const payload: OpenAlertArg = {
        content: "gif, jpg, jpeg, png, bmp, apng, webp, avif 파일만 업로드가 가능합니다.",
        style: "error",
        icon: true,
      };
      openAlertModal(payload);
      return;
    }

    //* 이미지 용량 체크
    if (!checkImageSize({ limit, fileSize: file.size })) {
      const payload: OpenAlertArg = {
        content: `${limit}mb을 초과하여 업로드할 수 없습니다.`,
        style: "error",
        icon: true,
      };
      openAlertModal(payload);
      return;
    }

    //* 업로드 파일 미리보기
    encodeFileToBase64(file).then((res) => setImageUrl(res));
  };

  return (
    <label htmlFor={id} className={style.input_image_label}>
      {/* 이미지가 있을 때 */}
      {imageUrl && <img src={imageUrl} alt={id}></img>}

      {/* 이미지가 없을 때 */}
      {!imageUrl && (
        <div>
          <span className="material-icons-outlined">add_photo_alternate</span>
        </div>
      )}

      {/* input */}
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={(event) => imageInputChangeHandler(event)}
        hidden
      />
    </label>
  );
};

export default ImageInput;
