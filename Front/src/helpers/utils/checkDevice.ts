//@ 모바일 환경인지 확인하는 함수
export const isMobileWeb = () => {
  if (
    navigator.userAgent.match(/ipad|iphone/i) !== null ||
    navigator.userAgent.match(/Android/i) !== null
  ) {
    return true;
  }
  return false;
};
