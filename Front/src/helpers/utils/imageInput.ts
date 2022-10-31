/**
 * @ description: 파일 업로드시, 확장자가 이미지인지 확인합니다.
 * @ 이미지이면 true를 반환합니다.
 */
export const checkImageExtension = (fileName: string): boolean => {
  const imageExtensions = ["gif", "jpg", "jpeg", "png", "bmp", "apng", "webp", "avif"];
  const extension = fileName.substring(fileName.lastIndexOf(".") + 1).toLocaleLowerCase();
  const result = imageExtensions.some((item) => item === extension);

  return result;
};

/**
 * @ description: 파일 업로드시, 정해진 파일 용량 이하인지 확인합니다.
 * @ 이하이면 true를 반환합니다.
 */
export const checkImageSize = (fileData: { limit: number; fileSize: number }): boolean => {
  const { limit, fileSize } = fileData;
  const limitSize = limit * 1024 * 1024;

  return fileSize <= limitSize;
};

/**
 * @ description: 파일 업로드시, 미리보기를 위한 imageSrc를 반환합니다.
 */
export const encodeFileToBase64 = (file: File): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  const imageSrc = new Promise<string>((resolve) => {
    reader.onload = () => {
      resolve(<string>reader.result);
    };
  });

  return imageSrc;
};
