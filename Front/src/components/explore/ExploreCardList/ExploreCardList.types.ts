export type ExploreSelectBoxType =
  | "등록일 순"
  | "등록일 역순"
  | "거래일 순"
  | "거래일 역순"
  | "낮은 가격"
  | "높은 가격";

export interface ExploreParamsType {
  category: string;
  sort: string;
  order: string;
}

export interface SortByType {
  sort: string;
  order: string;
}
