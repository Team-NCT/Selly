import { DescCardList, CardList } from "@/components/common";
import { useFetchFractionsDataQuery } from "@/api/server/userAPI";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useStore";
import { selectAccount } from "@/store/loginSlice";

//TODO Fractions API와 연결 예정
const FractionsData = [
  {
    articleId: 0,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
    pieceCnt: 120,
  },
  {
    articleId: 1,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
    pieceCnt: 120,
  },
  {
    articleId: 2,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
    pieceCnt: 120,
  },
  {
    articleId: 3,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
    pieceCnt: 120,
  },
  {
    articleId: 4,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
    pieceCnt: 120,
  },
  {
    articleId: 5,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
    pieceCnt: 120,
  },
  {
    articleId: 6,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
    pieceCnt: 120,
  },
];

const Fractions = () => {
  const params = useParams();
  const response = useFetchFractionsDataQuery(Number(params.id));
  const { userId } = useAppSelector(selectAccount);
  const arr = response.data ? response.data : [];
  const fractionsData = [];
  const fractionsData2 = [];

  if (params.id === userId) {
    for (const element of arr) {
      const card = {
        articleId: element.articleId,
        articleImgUrl: element.articleImgUrl,
        articleName: element.articleName,
        rateChange: Number(element.articleMargin),
        recentMarketPrice: element.recentMarketPrice,
        pieceCnt: element.pieceCnt,
      };
      fractionsData.push(card);
    }
  } else {
    for (const element of arr) {
      const card = {
        id: element.articleId,
        title: element.articleName,
        url: element.articleImgUrl,
      };
      fractionsData2.push(card);
    }
  }
  return params.id === userId ? (
    <DescCardList data={fractionsData} />
  ) : (
    <CardList data={fractionsData2} />
  );
};

export default Fractions;
