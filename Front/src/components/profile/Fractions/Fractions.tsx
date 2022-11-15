import { DescCardList, CardList } from "@/components/common";
import { useFetchFractionsDataQuery } from "@/api/server/userAPI";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";

const Fractions = () => {
  const params = useParams();
  const response = useFetchFractionsDataQuery(Number(params.id));
  const { userId } = useAppSelector(selectAccount);
  const arr = response.data ? response.data : [];

  const fractionsData2 = [];

  if (params.id !== userId) {
    for (const element of arr) {
      const card = {
        id: element.articleId,
        title: element.articleName,
        url: element.articleImgUrl,
      };
      fractionsData2.push(card);
    }
  }
  return Number(params.id) === userId ? (
    <DescCardList data={arr} />
  ) : (
    <CardList data={fractionsData2} />
  );
};

export default Fractions;
