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
