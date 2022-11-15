import { CardList } from "@/components/common";
import { useFetchCreatedDataQuery } from "@/api/server/userAPI";
import { useParams } from "react-router-dom";

const Created = () => {
  const params = useParams();
  const response = useFetchCreatedDataQuery(Number(params.id));
  const arr = response.data ? response.data : [];

  return <CardList data={arr} />;
};

export default Created;
