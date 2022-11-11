export interface SearchUserType {
  userId: number;
  nickname: string;
  img: string;
  certification: boolean;
}

export interface SearchArticleType {
  articleId: number;
  articleName: string;
  articleImgUrl: string;
  recentMarketPrice: number | null;
}

export interface SearchResultType {
  user: SearchUserType[];
  article: SearchArticleType[];
}
