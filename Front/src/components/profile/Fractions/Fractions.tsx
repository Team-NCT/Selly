import { DescCardList, CardList } from "@/components/common";
import { useFetchFractionsDataQuery } from "@/api/server/NFTTransactionAPI";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";

const Fractions = () => {
  const params = useParams();
  const response = useFetchFractionsDataQuery(Number(params.id));
  const { userId } = useAppSelector(selectAccount);
  const arr = response.data ? response.data : [];

  return Number(params.id) === userId ? <DescCardList data={arr} /> : <CardList data={arr} />;
};

export default Fractions;
