import { DescCardList } from "@/components/common";

//TODO Fractions API와 연결 예정
const FractionsData = [
  {
    articleId: 0,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
  },
  {
    articleId: 1,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
  },
  {
    articleId: 2,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
  },
  {
    articleId: 3,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
  },
  {
    articleId: 4,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
  },
  {
    articleId: 5,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
  },
  {
    articleId: 6,
    articleImgUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    articleName: "좀비와 함께 춤을",
    rateChange: 20.2525,
    recentMarketPrice: 12.0025,
  },
];

const Fractions = () => {
  return <DescCardList data={FractionsData} />;
};

export default Fractions;
