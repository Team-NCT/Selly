import { Button, ImageInput, Label } from "@/components/common";
import { useCallback, useState } from "react";
import {
  checkImageExtension,
  encodeFileToBase64,
  checkImageSize,
} from "@/helpers/utils/fileValidation";
import { OpenAlertArg, useAlert } from "@/hooks/useAlert";
import style from "./BannerImg.module.scss";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/helpers/utils/cropImage";

const BannerImg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [croppedArea, setCroppedArea] = useState();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    setCroppedImage(croppedArea);
  }, []);
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  //* 알럿
  const { openAlertModal } = useAlert();

  //* 파일 최대 용량
  const limit = 100;

  //* 미리보기 이미지 url
  const [imageUrl, setImageUrl] = useState("");

  //* 이미지 file
  const [imageFile, setImageFile] = useState<File>();

  //* 이미지 파일이 업로드될 때 실행되는 함수
  const handleInputChange = useCallback(
    (file: File) => {
      setIsOpen(true);
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

      //* 정상적인 이미지 파일을 state에 저장한다.
      setImageFile(file);
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
          imageUrl={croppedImage}
          limit={10}
          styles="square"
        />
        <img src={croppedImage} alt="" />
      </div>
      <dialog open={isOpen} className={style.dialog}>
        <div className={style.crop}>
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={24 / 5}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className={style.controls}>
          <Button
            onClick={(event) => {
              event.preventDefault();
              setIsOpen(false);
              showCroppedImage();
            }}>
            닫기
          </Button>
        </div>
      </dialog>
    </section>
  );
};

export default BannerImg;
