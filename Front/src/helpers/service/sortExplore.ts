import {
  ExploreSelectBoxType,
  SortByType,
} from "@/components/explore/ExploreCardList/ExploreCardList.types";

/**
 * @description: explore 페이지에서 selectBox의 정렬 기준을 선택하면
 * @ API의 params를 반환한다.
 */
export const selectToParams = (props: ExploreSelectBoxType): SortByType => {
  switch (props) {
    case "등록일 순":
      return { sort: "desc", order: "sellRegist" };
    case "등록일 역순":
      return { sort: "asc", order: "sellRegist" };
    case "낮은 가격":
      return { sort: "asc", order: "price" };
    case "높은 가격":
      return { sort: "desc", order: "price" };
  }
  return { sort: "desc", order: "sellRegist" };
};

/**
 * @description: explore 페이지에서 selectBox의 정렬 기준을 선택하면
 * @ API의 params를 반환한다.
 */
export const paramsToSelect = ({ sort, order }: SortByType): ExploreSelectBoxType => {
  if (sort === "desc" && order === "sellRegist") return "등록일 순";
  if (sort === "asc" && order === "sellRegist") return "등록일 역순";
  if (sort === "asc" && order === "price") return "낮은 가격";
  if (sort === "desc" && order === "price") return "높은 가격";
  return "등록일 순";
};
