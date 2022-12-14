import { ImageInput, Label } from "@/components/common";
import { useCallback, useState } from "react";
import { useAppSelector } from "@/hooks/useStore";
import { selectProfileData } from "@/store/profileDataSlice";
import {
  checkImageExtension,
  encodeFileToBase64,
  checkImageSize,
} from "@/helpers/utils/fileValidation";
import { OpenAlertArg, useAlert } from "@/hooks/useAlert";
import style from "./BannerImg.module.scss";
import bannerImage from "@/assets/images/banner.jpg";

const BannerImg = () => {
  //* 알럿
  const { openAlertModal } = useAlert();

  //* 파일 최대 용량
  const limit = 100;

  const [imageUrl, setImageUrl] = useState("");
  const { banner } = useAppSelector(selectProfileData);
  const imageUrlData = imageUrl ? imageUrl : banner === "default" ? bannerImage : banner;

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
    },
    [openAlertModal]
  );

  return (
    <section className={style.section}>
      <Label
        color="lilac"
        positionH="top"
        positionW="left"
        horizontal={2}
        width={50}
        id="create-image">
        <span className={style.labelText}>Banner</span>
      </Label>
      <div
        style={{
          fontSize: "0px",
          width: "132px",
        }}>
        <ImageInput
          handleInputChange={handleInputChange}
          id="banner-img"
          imageUrl={imageUrlData}
          limit={10}
          styles="square"
        />
      </div>
    </section>
  );
};

export default BannerImg;
