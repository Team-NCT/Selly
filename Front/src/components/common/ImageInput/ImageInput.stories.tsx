import { useState, useCallback } from "react";
import { Meta, Story } from "@storybook/react";
import ImageInput from "./ImageInput";
import { ImageInputProps, ImageInputStyleType } from "./ImageInput.types";
import {
  checkImageExtension,
  encodeFileToBase64,
  checkImageSize,
} from "@/helpers/utils/fileValidation";

export default {
  title: "Common/Input/ImageInput",
  component: ImageInput,
  parameters: {
    componentSubtitle: "이미지 인풋: 부모의 너비, 폰트 사이즈에 크기가 수정된다.",
  },
  argTypes: {
    styles: {
      options: ImageInputStyleType,
      control: "radio",
    },
  },
} as Meta;

export const Default: Story<ImageInputProps> = (args) => {
  //* 미리보기 이미지 url
  const [imageUrl, setImageUrl] = useState("");

  //* 이미지 file
  const [imageFile, setImageFile] = useState<File>();

  //* 용량 제한
  const limit = 5;

  const handleInputChange = useCallback((file: File) => {
    //* validation: 업로드 파일 확장자 체크
    if (!checkImageExtension(file.name)) {
      //! 에러 알럿
      return;
    }

    //* validation: 이미지 용량 체크
    if (!checkImageSize({ limit, fileSize: file.size })) {
      //! 에러 알럿
      return;
    }

    //* 업로드 파일 미리보기
    encodeFileToBase64(file).then((res) => setImageUrl(res));

    //* 정상적인 이미지 파일을 state에 저장한다.
    setImageFile(file);
  }, []);

  return (
    <div style={{ width: "240px", fontSize: "64px" }}>
      <ImageInput {...args} imageUrl={imageUrl} handleInputChange={handleInputChange} />
    </div>
  );
};

Default.args = {
  id: "image-input",
  limit: 5,
  styles: "square",
};
