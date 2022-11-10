import { SearchArticleType, SearchUserType } from "@/types/search.type";

/**
 * @description: 예술품 이름 길이 기준으로 배열을 정렬한다.
 */
export const sortSearchArticleResult = (array: SearchArticleType[]): SearchArticleType[] => {
  const sortedArray = [...array];
  sortedArray.sort((a, b) => {
    return a.articleName.length - b.articleName.length;
  });
  return sortedArray;
};

/**
 * @description: 유저 이름 길이 기준으로 배열을 정렬한다.
 */
export const sortSearchUserResult = (array: SearchUserType[]): SearchUserType[] => {
  const sortedArray = [...array];
  sortedArray.sort((a, b) => {
    return a.nickname.length - b.nickname.length;
  });

  return sortedArray;
};
