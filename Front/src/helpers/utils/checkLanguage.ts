//* 숫자 체크
export const checkNumber = /[0-9]/;

//* 영어 체크
export const checkEnglish = /[a-zA-Z]/;

//* 한글 체크
export const checkHangul = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //한글

//* 숫자, 영어, 한글 체크
export const checkLanguage = (text: string) => {
  if (!checkNumber.test(text) && !checkEnglish.test(text) && !checkHangul.test(text) && text) {
    return false;
  }

  return true;
};
