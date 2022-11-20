export interface requestDataType {
  articleId: number;
  userId: number;
}

export interface bookmarkResponseType {
  userId: number;
  articleId: number;
  bookMarkRegistTime: string;
}

export interface cancleBookmarkReponseType {
  code: number;
  message: string;
}

export interface DescCardType {
  articleId: number;
  articleName: string;
  articleImgUrl: string;
  recentMarketPrice: number;
  articleMargin: number;
  pieceCnt: number;
}
