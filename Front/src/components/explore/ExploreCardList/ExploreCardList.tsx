// import { useLazyFetchNFTListQuery } from "@/api/server/exploreAPI/exploreAPI";
import { DescCardList, SelectBox } from "@/components/common";
import React, { useCallback } from "react";
import { ExploreCardProps } from "./ExploreCardList.types";
import style from "./ExploreCardList.module.scss";

const ExploreCardList = (props: ExploreCardProps) => {
  //* 정렬 기준 선택 selectBox
  const SortBy = ["등록일 순", "등록일 역순", "판매일 순", "판매일 역순", "낮은 가격", "높은 가격"];
  const onChange = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    console.log(form.value);
  };
  // const [fetchNFTList] = useLazyFetchNFTListQuery();
  // const requestExplore = useCallback(
  //   async (keyword:string)
  // )
  return (
    <section className={style.container}>
      <div className={style.select_container}>
        <div className={style.select_box}>
          <SelectBox
            list={SortBy}
            category={"정렬"}
            defaultValue="등록일 순"
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      {/* <DescCardList /> */}
    </section>
  );
};

export default ExploreCardList;
