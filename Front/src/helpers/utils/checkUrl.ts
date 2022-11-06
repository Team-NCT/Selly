//* url 형식인지 체크( http, https를 포함하는 형식)
export const checkUrl = (strUrl: string) => {
  const expUrl = /^http[s]?:\/\/([\S]{3,})/i;
  return expUrl.test(strUrl);
};
