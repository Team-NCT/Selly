import { CardList } from "@/components/common";
import { useFetchForSaleDataQuery } from "@/api/server/userAPI";
import { useParams } from "react-router-dom";

const ForSale = () => {
  const params = useParams();
  const response = useFetchForSaleDataQuery(Number(params.id));
  const arr = response.data ? response.data : [];

  return <CardList data={arr} />;
};

export default ForSale;
