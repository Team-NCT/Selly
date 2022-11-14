import { CardList } from "@/components/common";
import { useFetchForSaleDataQuery } from "@/api/server/userAPI";
import { useParams } from "react-router-dom";

const ForSale = () => {
  const params = useParams();
  const response = useFetchForSaleDataQuery(Number(params.id));

  //TODO 추후 변수명 통일 예정
  const arr = response.data ? response.data : [];
  const data = [];
  for (const element of arr) {
    const card = {
      id: element.articleId,
      title: element.articleName,
      url: element.articleImgUrl,
    };
    data.push(card);
  }

  return <CardList data={data} />;
};

export default ForSale;
