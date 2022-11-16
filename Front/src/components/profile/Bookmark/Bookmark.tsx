import { CardList } from "@/components/common";
import { useFetchBookmarkDataQuery } from "@/api/server/bookmarkAPI";
import { useParams } from "react-router-dom";

const Bookmark = () => {
  const params = useParams();
  const response = useFetchBookmarkDataQuery(Number(params.id));
  const arr = response.data ? response.data : [];

  return <CardList data={arr} />;
};

export default Bookmark;
