import React from "react";
import { SelectCard, SelectCardList } from "@/components";

function Sell() {
  return <SelectCardList data={[ItemProps, ItemProps]}/>;
}

export default Sell;

const ItemProps = {
  url: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  title: "좀비와 함께 춤을",
};