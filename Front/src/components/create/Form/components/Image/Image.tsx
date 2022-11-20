import styles from "./Image.module.scss";
import style_form from "../../Form.module.scss";
import { Label, ImageInput } from "@/components/common";
import { useCallback, useEffect, useState } from "react";
import {
  checkImageExtension,
  encodeFileToBase64,
  checkImageSize,
} from "@/helpers/utils/fileValidation";
import { OpenAlertArg, useAlert } from "@/hooks/useAlert";
import { ImageProps } from "../../Form.types";

const Image = ({ setIsImageTrue }: ImageProps) => {
  const [isTrue, setIsTrue] = useState<boolean>(false);
  useEffect(() => {
    setIsImageTrue(isTrue);
  }, [isTrue, setIsImageTrue]);
  //* 알럿
  const { openAlertModal } = useAlert();

  //* 파일 최대 용량
  const limit = 100;

  //* 미리보기 이미지 url
  const [imageUrl, setImageUrl] = useState("");

  //* 이미지 파일이 업로드될 때 실행되는 함수
  const handleInputChange = useCallback(
    (file: File) => {
      //* validation: 업로드 파일 확장자 체크
      if (!checkImageExtension(file.name)) {
        //! 에러 알럿
        const data: OpenAlertArg = {
          content: "파일의 확장자를 확인해주세요.",
          style: "error",
          icon: true,
        };
        openAlertModal(data);
        return;
      }

      //* validation: 이미지 용량 체크
      if (!checkImageSize({ limit, fileSize: file.size })) {
        //! 에러 알럿
        const data: OpenAlertArg = {
          content: "파일의 용량이 너무 큽니다.",
          style: "error",
          icon: true,
        };
        openAlertModal(data);
        return;
      }

      //* 업로드 파일 미리보기
      encodeFileToBase64(file).then((res) => setImageUrl(res));
      setIsTrue(true);
    },
    [openAlertModal]
  );

  return (
    <div className={style_form.form_item}>
      <div className={style_form.form_margin}>
        <Label
          color="lilac"
          positionH="top"
          positionW="left"
          horizontal={2}
          width={30}
          id="create-image">
          <h2 className={style_form.form_title}>Upload Image</h2>
        </Label>
        <span className={styles.caption_danger}>*</span>
      </div>
      <article className={styles.image_input}>
        <ImageInput
          id="create-image"
          limit={10}
          handleInputChange={handleInputChange}
          imageUrl={imageUrl}
        />
      </article>
    </div>
  );
};

export default Image;
