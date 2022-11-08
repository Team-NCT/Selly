import { SearchResultType } from "@/types/search.type";

export interface SearchResultProps {
  /**
   * 검색 여부
   */
  status: boolean;

  /**
   * 검색 결과
   */
  result: SearchResultType;
}
