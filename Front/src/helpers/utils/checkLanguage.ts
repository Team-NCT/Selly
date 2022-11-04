//* 숫자 체크
export const checkNumber = /[0-9]/;

//* 영어 체크
export const checkEnglish = /[a-zA-Z]/;

//* 한글 체크
export const checkHangul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

//* 특문 체크
export const checkSpc = /[~!@#$%^&*()_+|<>?:{} ]/;

//* 숫자, 영어, 한글 체크
export const checkNEH = /^[ㄱ-ㅎ|가-힣|A-Z|a-z|0-9|]*$/;

//* 숫자, 영어, 한글 체크
export const checkNumEngKor = (text: string) => {
  if (!checkNEH.test(text)) {
    return false;
  }

  return true;
};
