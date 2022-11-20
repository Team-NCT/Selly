import { SelectBox } from "@/components/common";
import { useState } from "react";
import { ExploreSelectBoxType } from "../ExploreCardList/ExploreCardList.types";
import style from "./ExploreSelectBox.module.scss";
import { selectToParams, paramsToSelect } from "@/helpers/service/sortExplore";
import { useNavigate } from "react-router-dom";
import { ExploreSelectBoxProps } from "./ExploreSelectBox.types";

const ExploreSelectBox = ({
  category,
  sort = "asc",
  order = "sellRegist",
}: ExploreSelectBoxProps) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<ExploreSelectBoxType>(
    paramsToSelect({ sort, order })
  );

  console.log(selectedTab);

  //* 정렬 기준 선택 selectBox
  const SortBy = ["등록일 순", "등록일 역순", "낮은 가격", "높은 가격"];
  const onChange = (event: React.FormEvent) => {
    const form = event.target as HTMLFormElement;
    setSelectedTab(form.value);
    const { sort, order } = selectToParams(form.value);
    navigate(`/explore/${category}?sort=${sort}&order=${order}`);
  };

  return (
    <div className={style.select_container}>
      <div className={style.select_box}>
        <SelectBox
          list={SortBy}
          category="정렬"
          defaultValue={selectedTab}
          onChange={(e) => onChange(e)}
        />
      </div>
    </div>
  );
};

export default ExploreSelectBox;
