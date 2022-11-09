export interface CategoryType {
  category: "all" | "analog" | "digital" | "photography";
}

export interface CardProps {
  articleId: number;
  articleName: string;
  articleImgUrl: string;
  recentMarketPrice: number;
  rateChange: number;
}
