import { NFTDetailHeader } from "@/components";

const NFTDetail = () => {
  const args = {
    title: "좀비와 함께 춤을좀비와 함께 춤을좀비와 함께 춤을좀비와 함께 춤을",
    imageUrl:
      "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    favoriteStatus: true,
    url: "https://www.naver.com",
    id: 1,
  };
  return (
    <>
      <NFTDetailHeader {...args} />
      <main></main>
    </>
  );
};

export default NFTDetail;
